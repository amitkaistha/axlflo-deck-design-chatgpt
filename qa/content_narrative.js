"use strict";

const fs = require("fs");
const path = require("path");

const manifestPath = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, "..", "output", "shift_to_scale_from_fresh_json_manifest.json");

function pass(msg) { return `  ✓  ${msg}`; }
function warn(msg) { return `  ⚠  ${msg}`; }
function fail(msg) { return `  ✗  ${msg}`; }

if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const slides = manifest.slides || [];
const output = [];
const failures = [];
const warnings = [];

if (slides.length > 0) output.push(pass(`Slide manifest available: ${slides.length} slides`));
else failures.push(fail("Slide manifest has no slides"));

const labels = slides.map(s => s.label || "");
const hasHook = labels.some(label => /question|messi|strategy|hook/i.test(label));
const hasProof = labels.some(label => /proof|veda|built|architecture|case/i.test(label));
const hasPath = labels.some(label => /path|roadmap|months|weeks/i.test(label));
const hasCTA = labels.some(label => /build|before you buy|adoption/i.test(label)) || slides.some(s => s.type === "ctaClosing");

hasHook ? output.push(pass("Narrative hook detected")) : warnings.push(warn("Narrative hook not obvious from slide labels"));
hasProof ? output.push(pass("Proof layer detected")) : warnings.push(warn("Proof layer not obvious from slide labels"));
hasPath ? output.push(pass("Path/roadmap layer detected")) : warnings.push(warn("Path/roadmap layer not obvious from slide labels"));
hasCTA ? output.push(pass("Commercial CTA detected")) : warnings.push(warn("Commercial CTA not obvious from slide labels"));

slides.forEach(slide => {
  const label = slide.label || "";
  if (label.length > 92) warnings.push(warn(`Slide ${slide.num}: long title (${label.length} chars)`));
  if (/lorem ipsum|placeholder|todo/i.test(label)) failures.push(fail(`Slide ${slide.num}: placeholder text in title`));
});

console.log("\n" + "═".repeat(68));
console.log("  CONTENT / NARRATIVE QA");
console.log(`  Manifest: ${path.basename(manifestPath)}`);
console.log("═".repeat(68));
console.log(`\n  RESULTS: ${output.length} passed · ${warnings.length} warnings · ${failures.length} failed\n`);
if (output.length) output.forEach(line => console.log(line));
if (warnings.length) {
  console.log("\n  WARNINGS");
  warnings.forEach(line => console.log(line));
}
if (failures.length) {
  console.log("\n  FAILED");
  failures.forEach(line => console.log(line));
}
console.log("\n" + "═".repeat(68) + "\n");
process.exit(failures.length ? 1 : 0);

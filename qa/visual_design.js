"use strict";

const fs = require("fs");
const path = require("path");

const manifestPath = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, "..", "output", "shift_to_scale_from_fresh_json_manifest.json");
const BRAIN_LED_TYPES = new Set(["sectionDivider", "conceptMap", "flowRisk", "stack", "truthGap", "flywheel", "agenticSystem"]);
const GENERIC_TYPES = new Set(["storyCards", "insightColumns", "insightGrid", "frameworkRows"]);
const CONCEPT_WORDS = /truth|question|shift|system|architecture|proof|agentic|mess|platform|model|operating/i;

if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const slides = manifest.slides || [];
const passes = [];
const warnings = [];
const recommendations = [];
const failures = [];

function pass(msg) { passes.push(`  ✓  ${msg}`); }
function warn(msg) { warnings.push(`  ⚠  ${msg}`); }
function recommend(msg) { recommendations.push(`  →  ${msg}`); }

const types = slides.map(s => s.type);
const uniqueTypes = new Set(types);
uniqueTypes.size >= Math.min(5, slides.length)
  ? pass(`Visual variety: ${uniqueTypes.size} render patterns across ${slides.length} slides`)
  : warn(`Visual variety may be narrow: ${uniqueTypes.size} render patterns across ${slides.length} slides`);

for (let idx = 1; idx < slides.length; idx++) {
  const prev = slides[idx - 1];
  const curr = slides[idx];
  if (prev.type === curr.type && !prev.allow_visual_repeat && !curr.allow_visual_repeat) {
    failures.push(`  ✗  Slides ${prev.num}-${curr.num}: repeated ${curr.type} without explicit approval`);
  }
}

slides.forEach(slide => {
  const label = slide.label || "";
  if (!slide.visual_anchor) warn(`Slide ${slide.num}: missing visual_anchor in manifest`);
  if (slide.density === "high" && GENERIC_TYPES.has(slide.type) && CONCEPT_WORDS.test(label)) {
    recommend(`Slide ${slide.num}: key concept appears to use ${slide.type}; consider a brain-led custom metaphor if the idea feels flattened.`);
  }
  if (BRAIN_LED_TYPES.has(slide.type)) {
    pass(`Slide ${slide.num}: brain-led/concept-capable renderer present (${slide.type})`);
  }
});

if (recommendations.length === 0) {
  pass("Brain-led concept slide scan: no obvious flattened thesis slide detected");
}

console.log("\n" + "═".repeat(68));
console.log("  VISUAL / DESIGN QA");
console.log(`  Manifest: ${path.basename(manifestPath)}`);
console.log("═".repeat(68));
console.log(`\n  RESULTS: ${passes.length} passed · ${warnings.length} warnings · ${recommendations.length} recommendations · ${failures.length} failed\n`);
passes.forEach(line => console.log(line));
if (warnings.length) {
  console.log("\n  WARNINGS");
  warnings.forEach(line => console.log(line));
}
if (recommendations.length) {
  console.log("\n  BRAIN-LED CONCEPT RECOMMENDATIONS");
  recommendations.forEach(line => console.log(line));
}
if (failures.length) {
  console.log("\n  FAILED");
  failures.forEach(line => console.log(line));
}
console.log("\n" + "═".repeat(68) + "\n");
process.exit(failures.length ? 1 : 0);

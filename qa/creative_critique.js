"use strict";

const fs = require("fs");
const path = require("path");

const manifestPath = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, "..", "output", "shift_to_scale_from_fresh_json_manifest.json");

if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const slides = manifest.slides || [];
const highDensity = slides.filter(s => s.density === "high").length;
const brainLed = slides.filter(s => ["sectionDivider", "conceptMap", "flowRisk", "stack", "truthGap", "flywheel", "agenticSystem"].includes(s.type)).length;
const repeatedWarnings = [];

for (let idx = 1; idx < slides.length; idx++) {
  if (slides[idx - 1].type === slides[idx].type) repeatedWarnings.push(`${slides[idx - 1].num}-${slides[idx].num}`);
}

console.log("\n" + "═".repeat(68));
console.log("  BLUNT CREATIVE CRITIQUE");
console.log(`  Manifest: ${path.basename(manifestPath)}`);
console.log("═".repeat(68));
console.log("");
console.log(`  Deck shape: ${slides.length} slides, ${new Set(slides.map(s => s.type)).size} render patterns, ${highDensity} high-density slides.`);
console.log(`  Brain-led/concept-capable moments: ${brainLed}.`);
console.log("");
console.log("  What works:");
console.log("  - The system now checks structure, narrative, visual rhythm, feedback memory, and creative judgment separately.");
console.log("  - Brain-led concept slides are treated as a first-class option instead of a break from the system.");
console.log("");
console.log("  What to watch:");
console.log("  - Structural QA still cannot judge taste. Visual review must inspect the actual PPTX before client use.");
console.log("  - Dense executive slides may pass mechanically while still needing copy reduction.");
if (repeatedWarnings.length) console.log(`  - Consecutive repeated render patterns to inspect: ${repeatedWarnings.join(", ")}.`);
console.log("");
console.log("  Recommendation:");
console.log("  - Use this as the v6-ready baseline. Promote to v6 only after screenshot/visual-diff review becomes reliable.");
console.log("\n" + "═".repeat(68) + "\n");

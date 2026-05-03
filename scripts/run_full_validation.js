"use strict";

const { spawnSync } = require("child_process");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const target = process.argv[2] || "shift-json";

const targets = {
  "shift-json": {
    build: ["node", ["decks/shift-to-scale-json/build_from_json.js"]],
    pptx: "output/shift_to_scale_from_fresh_json.pptx",
    manifest: "output/shift_to_scale_from_fresh_json_manifest.json"
  }
};

function run(label, command, args, env = {}) {
  console.log(`\n[${label}] ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    env: { ...process.env, ...env },
    stdio: "inherit"
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

const selected = targets[target];
if (!selected) {
  console.error(`Unknown validation target: ${target}`);
  process.exit(1);
}

run("build", selected.build[0], selected.build[1]);
run("golden fixtures", "node", ["scripts/validate_golden_fixtures.js"]);
run("structural qa", "node", ["qa/qa.js", selected.pptx, selected.manifest]);
run("content narrative qa", "node", ["qa/content_narrative.js", selected.manifest]);
run("visual design qa", "node", ["qa/visual_design.js", selected.manifest]);
run("feedback regression qa", "node", ["qa/feedback_regression.js", selected.pptx, selected.manifest]);
run("creative critique", "node", ["qa/creative_critique.js", selected.manifest]);

console.log("\nFull validation complete.");

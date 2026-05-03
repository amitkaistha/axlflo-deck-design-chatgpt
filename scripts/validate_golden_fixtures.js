"use strict";

const path = require("path");
const { validateDeckFiles, formatValidationReport } = require("../lib/deckValidation");

const repoRoot = path.resolve(__dirname, "..");
const fixtures = [
  { name: "simple deck", dir: "fixtures/golden/simple-deck", shouldPass: true },
  { name: "dense executive deck", dir: "fixtures/golden/dense-executive-deck", shouldPass: true },
  { name: "card-heavy deck", dir: "fixtures/golden/card-heavy-deck", shouldPass: true },
  { name: "concept/metaphor slide", dir: "fixtures/golden/concept-metaphor-slide", shouldPass: true },
  { name: "malformed JSON deck", dir: "fixtures/golden/malformed-json-deck", shouldPass: false }
];

let failures = 0;

fixtures.forEach(fixture => {
  const contentPath = path.join(repoRoot, fixture.dir, "content.json");
  const layoutPath = path.join(repoRoot, fixture.dir, "layout.plan.json");
  const result = validateDeckFiles(contentPath, layoutPath);
  console.log("\n" + formatValidationReport(result, fixture.name));
  if (fixture.shouldPass && !result.ok) {
    console.error(`Fixture expected to pass but failed: ${fixture.name}`);
    failures += 1;
  }
  if (!fixture.shouldPass && result.ok) {
    console.error(`Fixture expected to fail but passed: ${fixture.name}`);
    failures += 1;
  }
});

if (failures) {
  console.error(`\nGolden fixture validation failed: ${failures}`);
  process.exit(1);
}

console.log("\nGolden fixture validation passed.");

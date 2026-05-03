"use strict";

const path = require("path");
const { formatValidationReport, validateDeckFiles } = require("../lib/deckValidation");

const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : null;
const layoutPlanPath = process.argv[3] ? path.resolve(process.argv[3]) : null;

if (!inputPath) {
  console.error("Usage: node scripts/validate_deck_json.js <content.json> [layout.plan.json]");
  process.exit(1);
}

try {
  const result = validateDeckFiles(inputPath, layoutPlanPath);
  console.log(formatValidationReport(result, path.basename(inputPath)));
  process.exit(result.ok ? 0 : 1);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

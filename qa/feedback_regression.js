"use strict";

const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

const pptxPath = process.argv[2] ? path.resolve(process.argv[2]) : null;
const manifestPath = process.argv[3] ? path.resolve(process.argv[3]) : null;

const LEGAL_TEXT = "SHIFT to Scale™ is a proprietary framework";
const LEGAL_TEXT_ASCII = "SHIFT to Scale is a proprietary framework";
const CREAM = "F5EDD6";

function failUsage() {
  console.log("Usage: node qa/feedback_regression.js <deck.pptx> <manifest.json>");
  process.exit(1);
}

function getSlideNumber(entryName) {
  const m = entryName.match(/slide(\d+)\.xml$/);
  return m ? Number(m[1]) : null;
}

function decodeXmlText(xml) {
  return xml
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function main() {
  if (!pptxPath || !manifestPath) failUsage();
  if (!fs.existsSync(pptxPath)) throw new Error(`PPTX not found: ${pptxPath}`);
  if (!fs.existsSync(manifestPath)) throw new Error(`Manifest not found: ${manifestPath}`);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const expectedSlides = manifest.expectedSlides || manifest.slide_count || (manifest.slides || []).length;
  const disclaimerSlide = (manifest.slides || []).find(s => s.type === "disclaimer" || /disclaimer/i.test(s.label || ""));
  const disclaimerNum = disclaimerSlide ? disclaimerSlide.num : expectedSlides;
  const zip = new AdmZip(pptxPath);
  const entries = zip.getEntries()
    .filter(e => /^ppt\/slides\/slide\d+\.xml$/.test(e.entryName))
    .sort((a, b) => getSlideNumber(a.entryName) - getSlideNumber(b.entryName));

  const passes = [];
  const fails = [];
  const pass = msg => passes.push(`  ✓  ${msg}`);
  const fail = msg => fails.push(`  ✗  ${msg}`);

  if (entries.length === expectedSlides) {
    pass(`Slide count available for feedback regression: ${entries.length}`);
  } else {
    fail(`Slide count mismatch before feedback regression: found ${entries.length}, expected ${expectedSlides}`);
  }

  let legalSeenOutsideDisclaimer = false;
  let legalSeenOnDisclaimer = false;
  let duplicateCream = false;

  for (const entry of entries) {
    const num = getSlideNumber(entry.entryName);
    const xml = zip.readAsText(entry);
    const text = decodeXmlText(xml);
    const creamCount = (xml.match(new RegExp(CREAM, "g")) || []).length;
    const hasLegal = text.includes(LEGAL_TEXT) || text.includes(LEGAL_TEXT_ASCII);

    if (creamCount > 1) {
      duplicateCream = true;
      fail(`AFL-FB-003 slide ${num}: has ${creamCount} cream #${CREAM} fills; expected at most 1`);
    }

    if (hasLegal && num !== disclaimerNum) {
      legalSeenOutsideDisclaimer = true;
      fail(`AFL-FB-002 slide ${num}: legal/framework footer appears outside disclaimer slide ${disclaimerNum}`);
    }

    if (hasLegal && num === disclaimerNum) {
      legalSeenOnDisclaimer = true;
    }
  }

  if (!duplicateCream) pass("AFL-FB-003: no slide has more than one cream quote/takeaway box");
  if (!legalSeenOutsideDisclaimer) pass("AFL-FB-002: legal/framework text absent from normal slides");
  if (legalSeenOnDisclaimer) pass(`AFL-FB-002: legal/framework text present on disclaimer slide ${disclaimerNum}`);
  else fail(`AFL-FB-002: legal/framework text missing from disclaimer slide ${disclaimerNum}`);

  const feedbackPath = path.join(path.dirname(__dirname), "docs", "FEEDBACK_LOOP.md");
  if (fs.existsSync(feedbackPath)) {
    const feedback = fs.readFileSync(feedbackPath, "utf8");
    ["AFL-FB-001", "AFL-FB-002", "AFL-FB-003", "AFL-FB-004"].forEach(id => {
      feedback.includes(id)
        ? pass(`${id}: present in approved feedback register`)
        : fail(`${id}: missing from approved feedback register`);
    });
  } else {
    fail("docs/FEEDBACK_LOOP.md not found");
  }

  console.log("\n" + "═".repeat(68));
  console.log("  FEEDBACK REGRESSION CHECKER");
  console.log(`  File:     ${path.basename(pptxPath)}`);
  console.log(`  Manifest: ${path.basename(manifestPath)}`);
  console.log("═".repeat(68));
  console.log(`\n  RESULTS: ${passes.length} passed · ${fails.length} failed\n`);
  if (passes.length) {
    console.log("─".repeat(68));
    console.log("  PASSED");
    console.log("─".repeat(68));
    passes.forEach(p => console.log(p));
  }
  if (fails.length) {
    console.log("\n" + "─".repeat(68));
    console.log("  FAILED");
    console.log("─".repeat(68));
    fails.forEach(f => console.log(f));
  }
  console.log("\n" + "═".repeat(68));
  console.log(fails.length ? "  ✗  FEEDBACK REGRESSION FAILED" : "  ✓  FEEDBACK REGRESSION PASSED");
  console.log("═".repeat(68) + "\n");

  process.exit(fails.length ? 1 : 0);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}

"use strict";

// ═════════════════════════════════════════════════════════════════════════════
// qa.js — AxlFlo Deck Structural QA Checker
//
// MANIFEST: Read automatically from [deck]_manifest.json written by the
// build script. No hardcoded slide list — add a slide to the build script
// and it appears here automatically.
//
// HOW TO RUN:
//   node qa.js deck.pptx manifest.json
//   (Both args are passed automatically by the build script)
//
// CHECKS PER SLIDE:
//   Presence:  gradient bar, gold footer, card navy, dark bg, cream CTA,
//              coral accent, indigo blue, closing coral strength
//   Absence:   coral on white slides (wrong CTA type)
//   Font:      Segoe UI only
//
// EXIT CODES:  0 = all checks passed | 1 = one or more failures
// ═════════════════════════════════════════════════════════════════════════════

const AdmZip = require("adm-zip");
const fs     = require("fs");
const path   = require("path");

const _v           = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "version.json"), "utf8"));
const SPEC_VERSION = _v.specVersion;

const COL = {
  inkNavy:    "0D1137",
  cardNavy:   "172058",
  fieryCoral: "EA4E43",
  cream:      "F5EDD6",
  mustardGold:"E89923",
  indigoBlue: "4626BD",
  white:      "FFFFFF",
};

const FORBIDDEN_FONTS = ["Arial", "Calibri", "Times New Roman", "Helvetica"];

function runQA(pptxPath, manifestPath) {
  const D = "═".repeat(68);
  const d = "─".repeat(68);

  console.log("\n" + D);
  console.log("  QA CHECKER  —  AxlFlo Deck Design System v" + SPEC_VERSION);
  console.log("  File:     " + path.basename(pptxPath));
  console.log("  Manifest: " + path.basename(manifestPath));
  console.log(D);

  if (!fs.existsSync(pptxPath)) {
    console.log("\n  ✗  PPTX not found: " + pptxPath); process.exit(1);
  }
  if (!fs.existsSync(manifestPath)) {
    console.log("\n  ✗  Manifest not found: " + manifestPath);
    console.log("     Run the build script first — it generates the manifest automatically.");
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const zip      = new AdmZip(pptxPath);
  const passes = [], fails = [], warns = [];

  const pass = m => passes.push("  ✓  " + m);
  const fail = m => fails.push("  ✗  " + m);
  const warn = m => warns.push("  ⚠  " + m);

  // ── Slide count ─────────────────────────────────────────────────────────────
  const slideEntries = zip.getEntries().map(e => e.entryName)
    .filter(e => e.match(/^ppt\/slides\/slide\d+\.xml$/));
  const expectedSlides = manifest.expectedSlides || manifest.slide_count || (manifest.slides || []).length;
  slideEntries.length === expectedSlides
    ? pass(`Slide count: ${slideEntries.length} (expected ${expectedSlides})`)
    : fail(`Slide count: found ${slideEntries.length}, expected ${expectedSlides}`);

  if (manifest.visual_diversity?.max_consecutive_same_render === 1) {
    const checkedSlides = (manifest.slides || []).filter(slide => !slide.visual_diversity_exempt);
    for (let idx = 1; idx < checkedSlides.length; idx++) {
      const prev = checkedSlides[idx - 1];
      const curr = checkedSlides[idx];
      const repeated = prev.type === curr.type;
      const approved = Boolean(prev.allow_visual_repeat || curr.allow_visual_repeat);
      if (repeated && !approved) {
        fail(`Visual diversity: slides ${prev.num}-${curr.num} repeat [${curr.type}] without approval`);
      } else if (repeated && approved) {
        pass(`Visual diversity: slides ${prev.num}-${curr.num} repeat [${curr.type}] with approval`);
      }
    }
    pass("Visual diversity rule active: no unapproved consecutive repeated render patterns");
  }

  // ── Per-slide checks ────────────────────────────────────────────────────────
  (manifest.slides || []).forEach(slide => {
    const xml  = zip.readAsText(`ppt/slides/slide${slide.num}.xml`);
    if (!xml) { fail(`Slide ${slide.num}: XML not found`); return; }
    const tag  = `Slide ${slide.num} [${slide.type}] ${slide.label}`;
    const has  = col => xml.includes(col);
    const imgs = (xml.match(/r:embed="rId\d+"/g) || []).length;

    // Gradient bar — presence/absence per slide type
    slide.gradientBar
      ? (imgs >= 1
          ? pass(`${tag}: gradient bar present`)
          : fail(`${tag}: gradient bar MISSING`))
      : (imgs === 0
          ? pass(`${tag}: no gradient bar (correct for ${slide.type})`)
          : fail(`${tag}: gradient bar must be ABSENT on ${slide.type} slides`));

    // Font purity — Segoe UI only
    const fonts    = (xml.match(/<a:latin typeface="([^"]+)"/g) || []);
    const badFonts = fonts
      .filter(f => !f.includes("Segoe UI") && !f.includes("+mj") && !f.includes("+mn"))
      .filter(f => FORBIDDEN_FONTS.some(b => f.includes(b)));
    badFonts.length === 0
      ? pass(`${tag}: font purity OK`)
      : fail(`${tag}: forbidden font — ${badFonts.join(", ")}`);

    // Gold footer — every slide
    has(COL.mustardGold)
      ? pass(`${tag}: gold footer present`)
      : fail(`${tag}: gold footer MISSING`);

    // Dark background on dark slides
    if (slide.bg === "dark")
      has(COL.inkNavy)
        ? pass(`${tag}: dark background present`)
        : fail(`${tag}: ink navy MISSING on dark slide`);

    // Card navy on dark content slides (not T or X — those have no cards)
    if (slide.bg === "dark" && slide.type !== "T" && slide.type !== "X")
      has(COL.cardNavy)
        ? pass(`${tag}: card navy present`)
        : warn(`${tag}: card navy not found`);

    // Cream CTA on white slides
    if (slide.bg === "white")
      has(COL.cream)
        ? pass(`${tag}: cream CTA present`)
        : warn(`${tag}: cream not found — expected on white slides`);

    // Coral accent on dark content slides
    if (slide.bg === "dark" && slide.type !== "T")
      has(COL.fieryCoral)
        ? pass(`${tag}: coral accent present`)
        : warn(`${tag}: coral not found`);

    // Closing slide — coral must appear ≥3 times (subtitle + separator + CTA)
    if (slide.type === "X") {
      const n = (xml.match(new RegExp(COL.fieryCoral, "g")) || []).length;
      n >= 3
        ? pass(`${tag}: closing coral strong (${n} refs)`)
        : n > 0
          ? warn(`${tag}: coral present but only ${n} ref(s) — expected ≥3`)
          : fail(`${tag}: closing coral MISSING entirely`);
    }

    // Indigo on content slides
    if (slide.type !== "T" && slide.type !== "X")
      has(COL.indigoBlue)
        ? pass(`${tag}: indigo blue present`)
        : warn(`${tag}: indigo blue not found`);

    if (xml.match(/<a:(?:ext|off)\b[^>]*(?:cx|cy|x|y)="-/))
      fail(`${tag}: unsafe negative OOXML coordinate detected`);

    if (slide.density === "high") {
      const textRuns = (xml.match(/<a:t>/g) || []).length;
      textRuns > 45
        ? warn(`${tag}: high text run count (${textRuns}) — check density visually`)
        : pass(`${tag}: density check OK`);
    }

    // ── CONSISTENCY CHECKS ─────────────────────────────────────────────────

    // Closing slide punchline: must use mustard gold (D21), not coral
    if (slide.type === "X") {
      const goldRefs = (xml.match(new RegExp(COL.mustardGold, "g")) || []).length;
      goldRefs >= 2
        ? pass(`${tag}: gold punchline present (${goldRefs} refs — footer + punchline)`)
        : goldRefs === 1
          ? fail(`${tag}: gold appears only once — punchline should also be gold #${COL.mustardGold} (D21)`)
          : fail(`${tag}: mustard gold MISSING on closing slide`);
    }

    // Comparison slide: coral header must have white text (D18/D23)
    if (slide.type === "C" && slide.bg === "dark") {
      has(COL.white)
        ? pass(`${tag}: white text present on comparison slide`)
        : fail(`${tag}: white text MISSING — dark fill headers need white text (D18)`);
    }

    // Gradient bar width — note: cannot check px dimensions via XML,
    // but we can check the image is present (structural proxy)
    // Full dimension check deferred to Fix 4 coordinate validation.

    // ABSENCE: coral on white slides — NOTE: cannot distinguish CTA fill from badge
    // stripe at XML colour-scan level. SEQ[3]/SEQ[5] legitimately use coral as the
    // last stripe colour on white slides (F, A). Full check requires coordinate
    // parsing (Fix 4). Promoted to warning only for slide types with no badge sequences.
    if (slide.bg === "white" && slide.type === "C")
      has(COL.fieryCoral)
        ? warn(`${tag}: coral on white comparison slide — verify CTA is cream not coral`)
        : pass(`${tag}: coral correctly absent on white comparison slide`);
  });

  const numberLed = (manifest.slides || []).filter(s => s.number_led).length;
  const ratio = manifest.slides?.length ? numberLed / manifest.slides.length : 0;
  if (numberLed > 0) {
    ratio <= 0.30
      ? pass(`Number-led rhythm: ${numberLed}/${manifest.slides.length} slides`)
      : warn(`Number-led rhythm: ${numberLed}/${manifest.slides.length} slides — verify numbers are not overused`);
  }

  // ── Results ─────────────────────────────────────────────────────────────────
  console.log(`\n  RESULTS: ${passes.length} passed · ${warns.length} warnings · ${fails.length} failed\n`);
  if (passes.length) {
    console.log(d); console.log("  PASSED"); console.log(d);
    passes.forEach(p => console.log(p));
  }
  if (warns.length) {
    console.log("\n" + d); console.log("  WARNINGS  (non-blocking)");
    console.log(d); warns.forEach(w => console.log(w));
  }
  if (fails.length) {
    console.log("\n" + d); console.log("  FAILED");
    console.log(d); fails.forEach(f => console.log(f));
  }

  console.log("\n" + D);
  if (fails.length === 0 && warns.length === 0)
    console.log("  ✓  ALL CHECKS PASSED — deck is structurally clean");
  else if (fails.length === 0)
    console.log("  ⚠  PASSED WITH WARNINGS — review before sharing");
  else
    console.log("  ✗  " + fails.length + " CHECK(S) FAILED — review before sharing");
  console.log(D + "\n");

  process.exit(fails.length > 0 ? 1 : 0);
}

const pptxPath     = process.argv[2] ? path.resolve(process.argv[2]) : null;
const manifestPath = process.argv[3] ? path.resolve(process.argv[3]) : null;

if (!pptxPath || !manifestPath) {
  console.log("Usage: node qa.js <deck.pptx> <manifest.json>");
  process.exit(1);
}

runQA(pptxPath, manifestPath);

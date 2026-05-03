"use strict";

const fs = require("fs");
const path = require("path");
const {
  APPROVED_VARIANTS,
  EXPERIMENTAL_VARIANTS,
  allowedVariantsForSlide,
  getRendererForSlide,
  getSlideSpec,
  isKnownRenderer
} = require("./slideRegistry");

function loadCreativeDeckSchema() {
  const schemaPath = path.join(__dirname, "..", "schema", "axlflo.creative-deck.schema.json");
  if (!fs.existsSync(schemaPath)) return null;
  return readJson(schemaPath);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    throw new Error(`Invalid JSON in ${filePath}: ${err.message}`);
  }
}

function present(value) {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && value !== "";
}

function validateDeckObject(deckJson, options = {}) {
  const errors = [];
  const warnings = [];
  const layoutPlan = options.layoutPlan || { slides: [] };
  const schema = options.schema || loadCreativeDeckSchema();
  const deckRequired = schema?.properties?.deck?.required || ["id", "title", "brand"];
  const slideRequired = schema?.$defs?.slide?.required || ["type", "title"];
  const allowedTypes = schema?.$defs?.slide?.properties?.type?.enum || [];
  const planBySlide = new Map((layoutPlan.slides || []).map(plan => [plan.slide, plan]));

  if (!deckJson || typeof deckJson !== "object") {
    errors.push("Deck JSON must be an object.");
    return { ok: false, errors, warnings };
  }

  if (!deckJson.deck || typeof deckJson.deck !== "object") {
    errors.push("Missing required object: deck.");
  } else {
    deckRequired.forEach(field => {
      if (!present(deckJson.deck[field])) errors.push(`Missing required deck.${field}.`);
    });
  }

  if (!Array.isArray(deckJson.slides) || deckJson.slides.length === 0) {
    errors.push("Missing required non-empty array: slides.");
    return { ok: false, errors, warnings };
  }

  deckJson.slides.forEach((slide, idx) => {
    const num = idx + 1;
    if (!slide || typeof slide !== "object") {
      errors.push(`Slide ${num}: must be an object.`);
      return;
    }

    slideRequired.forEach(field => {
      if (!present(slide[field])) errors.push(`Slide ${num}: missing required field ${field}.`);
    });
    if (slide.type && allowedTypes.length && !allowedTypes.includes(slide.type)) {
      errors.push(`Slide ${num}: type "${slide.type}" is not allowed by creative deck schema.`);
    }

    const spec = getSlideSpec(slide.type);
    if (!spec) {
      errors.push(`Slide ${num}: unknown slide type "${slide.type}".`);
      return;
    }

    spec.required.forEach(field => {
      if (!present(slide[field])) errors.push(`Slide ${num} [${slide.type}]: missing required field ${field}.`);
    });

    const plan = planBySlide.get(num) || {};
    const renderer = getRendererForSlide(slide, plan);
    if (!renderer || !isKnownRenderer(renderer)) {
      errors.push(`Slide ${num} [${slide.type}]: unknown renderer "${plan.render_as || slide.render_as || spec.renderer}".`);
    }

    if (plan.render_as && !isKnownRenderer(plan.render_as)) {
      errors.push(`Layout slide ${num}: unknown render_as "${plan.render_as}".`);
    }

    const variant = plan.visual_variant || slide.visual_variant;
    if (variant) {
      const known = APPROVED_VARIANTS.includes(variant) || EXPERIMENTAL_VARIANTS.includes(variant);
      if (!known) errors.push(`Slide ${num}: unknown visual_variant "${variant}".`);
      const allowed = allowedVariantsForSlide(slide.type);
      if (known && !allowed.includes(variant) && !EXPERIMENTAL_VARIANTS.includes(variant)) {
        warnings.push(`Slide ${num}: visual_variant "${variant}" is known but unusual for slide type "${slide.type}".`);
      }
      if (EXPERIMENTAL_VARIANTS.includes(variant) && !plan.visual_approval) {
        warnings.push(`Slide ${num}: experimental visual_variant "${variant}" needs visual approval before client-facing use.`);
      }
    }
  });

  return { ok: errors.length === 0, errors, warnings };
}

function validateDeckFiles(inputPath, layoutPlanPath = null) {
  const deckJson = readJson(inputPath);
  const layoutPlan = layoutPlanPath && fs.existsSync(layoutPlanPath)
    ? readJson(layoutPlanPath)
    : { principles: [], slides: [] };
  const result = validateDeckObject(deckJson, { layoutPlan });
  return { deckJson, layoutPlan, ...result };
}

function formatValidationReport(result, label = "Deck JSON") {
  const lines = [`${label} validation ${result.ok ? "passed" : "failed"}.`];
  result.errors.forEach(err => lines.push(`ERROR: ${err}`));
  result.warnings.forEach(warn => lines.push(`WARN: ${warn}`));
  return lines.join("\n");
}

module.exports = {
  formatValidationReport,
  readJson,
  validateDeckFiles,
  validateDeckObject
};

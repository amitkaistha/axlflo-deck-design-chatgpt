"use strict";

const APPROVED_VARIANTS = [
  "cinematic_cover",
  "evidence_dashboard",
  "thesis_triptych",
  "instrument_panel",
  "framework_map",
  "metrics_proof_grid",
  "journey_map",
  "sprint_roadmap",
  "layered_operating_system",
  "strategic_upside_grid",
  "credentials_proof",
  "architecture_board",
  "meta_engine_process",
  "translation_matrix",
  "outcome_ladder",
  "commercial_cta_packages",
  "use_case_deep_dive",
  "disclaimer_appendix",
  "brain_led_concept"
];

const EXPERIMENTAL_VARIANTS = [
  "numberLed",
  "spectrum",
  "curve",
  "flowRisk",
  "courtroom",
  "stack",
  "truthGap",
  "flywheel"
];

const SHARED = ["type", "title"];

const REGISTRY = {
  cover: {
    renderer: "title",
    required: [...SHARED, "subtitle", "tagline"],
    approvedVisualVariants: ["cinematic_cover"]
  },
  hook: {
    renderer: "storyCards",
    required: [...SHARED, "section", "body", "quote", "cards"],
    approvedVisualVariants: ["thesis_triptych", "cinematic_cover", "brain_led_concept"]
  },
  cards: {
    renderer: "storyCards",
    required: [...SHARED, "section", "cards"],
    approvedVisualVariants: [
      "thesis_triptych",
      "evidence_dashboard",
      "metrics_proof_grid",
      "strategic_upside_grid",
      "credentials_proof",
      "outcome_ladder",
      "meta_engine_process",
      "brain_led_concept"
    ]
  },
  insight: {
    renderer: "insightColumns",
    required: [...SHARED, "section", "body", "cards"],
    approvedVisualVariants: ["thesis_triptych", "translation_matrix", "outcome_ladder", "brain_led_concept"]
  },
  table: {
    renderer: "frameworkRows",
    required: [...SHARED, "section", "columns", "rows"],
    approvedVisualVariants: ["framework_map", "instrument_panel", "metrics_proof_grid"]
  },
  section: {
    renderer: "sectionDivider",
    required: [...SHARED, "section", "body"],
    approvedVisualVariants: ["cinematic_cover", "credentials_proof", "brain_led_concept"]
  },
  architecture: {
    renderer: "systemArchitecture",
    required: [...SHARED, "section", "files"],
    approvedVisualVariants: ["architecture_board", "layered_operating_system"]
  },
  mapping: {
    renderer: "frameworkRows",
    required: [...SHARED, "section", "rows"],
    approvedVisualVariants: ["framework_map", "translation_matrix"]
  },
  roadmap: {
    renderer: "roadmapPhases",
    required: [...SHARED, "section", "phases"],
    approvedVisualVariants: ["journey_map", "sprint_roadmap"]
  },
  cta: {
    renderer: "ctaClosing",
    required: [...SHARED, "body", "engagements", "contact"],
    approvedVisualVariants: ["commercial_cta_packages"]
  },
  disclaimer: {
    renderer: "disclaimer",
    required: [...SHARED, "body"],
    approvedVisualVariants: ["disclaimer_appendix"]
  }
};

const RENDERER_ALIASES = {
  title: "title",
  storyCards: "storyCards",
  insightColumns: "insightColumns",
  insightGrid: "insightGrid",
  frameworkRows: "frameworkRows",
  sectionDivider: "sectionDivider",
  processCycle: "processCycle",
  systemArchitecture: "systemArchitecture",
  conceptMap: "conceptMap",
  numberLed: "numberLed",
  spectrum: "spectrum",
  curve: "curve",
  flowRisk: "flowRisk",
  courtroom: "courtroom",
  stack: "stack",
  truthGap: "truthGap",
  flywheel: "flywheel",
  roadmapPhases: "roadmapPhases",
  numberProofCards: "numberProofCards",
  ctaClosing: "ctaClosing",
  cover: "title",
  hook: "storyCards",
  cards: "storyCards",
  insight: "insightColumns",
  table: "frameworkRows",
  section: "sectionDivider",
  architecture: "systemArchitecture",
  mapping: "frameworkRows",
  conceptMap: "conceptMap",
  roadmap: "roadmapPhases",
  cta: "ctaClosing",
  disclaimer: "disclaimer"
};

function getSlideSpec(type) {
  return REGISTRY[type] || null;
}

function getRendererForSlide(slide, layoutPlan = {}) {
  const requested = layoutPlan.render_as || slide.render_as || getSlideSpec(slide.type)?.renderer || slide.type;
  return RENDERER_ALIASES[requested] || null;
}

function allowedVariantsForSlide(type) {
  return getSlideSpec(type)?.approvedVisualVariants || APPROVED_VARIANTS;
}

function isKnownRenderer(renderer) {
  return Boolean(RENDERER_ALIASES[renderer]);
}

module.exports = {
  APPROVED_VARIANTS,
  EXPERIMENTAL_VARIANTS,
  REGISTRY,
  RENDERER_ALIASES,
  allowedVariantsForSlide,
  getRendererForSlide,
  getSlideSpec,
  isKnownRenderer
};

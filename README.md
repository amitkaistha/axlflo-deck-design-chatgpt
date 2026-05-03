# AxlFlo Deck System — v5.10

Versioned PowerPoint deck generation. pptxgenjs + engine layer + QA.

## Mandatory deck build workflow
Every deck build must run the full enforcement workflow:

1. Build from the source layer (JSON, markdown, or custom script).
2. Validate deck JSON before rendering.
3. Run structural QA.
4. Run content/narrative QA.
5. Run visual/design QA.
6. Run feedback regression QA.
7. Report blunt post-build critique: what works, what needs fixing, and recommended next pass.

Structural QA is necessary, but not sufficient. A deck is not done until the creative critique is complete.

## Feedback reinforcement loop
After every reviewed deck iteration, capture feedback in `docs/FEEDBACK_LOOP.md` and classify each item:

- **Fix now:** deck-specific issue to patch immediately.
- **Promote to rule:** reusable design/process improvement, only after Amit approves.
- **Watchlist:** useful observation, not yet stable enough to become a rule.
- **Reject:** intentionally not adopted, with reason.

Approved reusable feedback becomes part of the spec, checklist, renderer, QA, or slide catalogue. Each later build must check that approved feedback did not regress.

## Visual variant catalogue
Future decks should select from the approved premium visual vocabulary in [docs/VISUAL_VARIANT_CATALOGUE.md](docs/VISUAL_VARIANT_CATALOGUE.md) and [schema/axlflo.visual-variants.json](schema/axlflo.visual-variants.json). Visual variety is mandatory, but visual quality beats novelty; experimental variants require approval before client-facing use.

## Input enrichment
Raw text should not be converted directly into slides. First convert it into an enriched argument brief using [docs/INPUT_ENRICHMENT_WORKFLOW.md](docs/INPUT_ENRICHMENT_WORKFLOW.md) and [schema/axlflo.enriched-brief.schema.json](schema/axlflo.enriched-brief.schema.json).

## Changelog
System version changes are summarized in [CHANGELOG.md](CHANGELOG.md). Detailed design deltas remain in `skill/SKILL_merged.md`.

## Feature log
Proposed and experimental improvements are tracked in [FEATURE_LOG.md](FEATURE_LOG.md). Features are promoted only after quality gates pass and Amit approves the change.

## Quick start
```bash
npm install
npm run build
npm run qa
npm run qa:feedback-regression
```

## Slide styles → SLIDE_CATALOGUE.md
## Design rules → skill/SKILL_merged.md
## Revert to baseline → baselines/v5.4/

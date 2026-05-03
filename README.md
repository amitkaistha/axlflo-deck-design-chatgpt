# AxlFlo Deck System — v5.8

Versioned PowerPoint deck generation. pptxgenjs + engine layer + QA.

## Mandatory deck build workflow
Every deck build must run the full five-step workflow:

1. Build from the source layer (JSON, markdown, or custom script).
2. Run structural QA.
3. Run content/narrative QA.
4. Run visual/design QA.
5. Report blunt post-build critique: what works, what needs fixing, and recommended next pass.

Structural QA is necessary, but not sufficient. A deck is not done until the creative critique is complete.

## Feedback reinforcement loop
After every reviewed deck iteration, capture feedback in `docs/FEEDBACK_LOOP.md` and classify each item:

- **Fix now:** deck-specific issue to patch immediately.
- **Promote to rule:** reusable design/process improvement, only after Amit approves.
- **Watchlist:** useful observation, not yet stable enough to become a rule.
- **Reject:** intentionally not adopted, with reason.

Approved reusable feedback becomes part of the spec, checklist, renderer, QA, or slide catalogue. Each later build must check that approved feedback did not regress.

## Input enrichment
Raw text should not be converted directly into slides. First convert it into an enriched argument brief using [docs/INPUT_ENRICHMENT_WORKFLOW.md](docs/INPUT_ENRICHMENT_WORKFLOW.md) and [schema/axlflo.enriched-brief.schema.json](schema/axlflo.enriched-brief.schema.json).

## Changelog
System version changes are summarized in [CHANGELOG.md](CHANGELOG.md). Detailed design deltas remain in `skill/SKILL_merged.md`.

## Feature log
Proposed and experimental improvements are tracked in [FEATURE_LOG.md](FEATURE_LOG.md). Features are promoted only after quality gates pass and Amit approves the change.

## Quick start
```bash
npm install
node decks/process-first/build.js
# Output: output/process_first.pptx
```

## Slide styles → SLIDE_CATALOGUE.md
## Design rules → skill/SKILL_merged.md
## Revert to baseline → baselines/v5.4/

# AxlFlo Deck System Feature Log

Purpose: track proposed system improvements without letting experimentation degrade output quality.

This is not the changelog. The changelog records what changed. This file records what we might change, why it matters, how risky it is, and what evidence is required before promotion.

## Feature Status

- **proposed:** Good idea, not yet designed.
- **approved:** Amit approved the concept.
- **in_progress:** Being implemented.
- **trial:** Implemented behind a limited workflow or manual check.
- **promoted:** Stable enough to become part of the standard system.
- **deferred:** Good idea, not now.
- **rejected:** Intentionally not adopted.

## Quality Gate

No feature may be promoted unless it satisfies all relevant gates:

- Structural QA passes with 0 failures.
- Existing approved feedback does not regress.
- Output quality is equal or better on at least one real deck.
- The feature has a clear rollback path.
- The feature is documented in the right durable place: spec, README, changelog, feedback loop, QA, renderer, or schema.

## Active Feature Backlog

| ID | Feature | Status | Risk | Why It Matters | Quality Gate | Next Step |
|---|---|---|---|---|---|---|
| AFL-FEAT-001 | Executable feedback regression checks | trial | low | Turns approved feedback into repeatable tests instead of manual memory. | Script catches legal-footer repeats, duplicate cream boxes, and missing feedback checks without false failures. | Trial `qa/feedback_regression.js` on the SHIFT JSON deck before promotion. |
| AFL-FEAT-002 | Agentic Decision Records | proposed | low | Captures why system-level decisions were made, not just what changed. | New ADR template exists and at least one real decision is logged. | Add `docs/adr/` with template and first ADR. |
| AFL-FEAT-003 | Visual QA checklist artifact per build | proposed | medium | Makes creative review inspectable and repeatable. | Each deck build emits a short markdown review file with content QA, visual QA, critique, and next-pass recommendations. | Add `output/*_review.md` convention. |
| AFL-FEAT-004 | Slide strategy layer before rendering | proposed | medium | Increases creative autonomy by deciding each slide's job before layout. | Strategy file improves at least one deck without increasing templated sameness or text density. | Add optional `strategy.plan.json` schema. |
| AFL-FEAT-005 | Golden fixture decks | proposed | medium | Prevents renderer changes from breaking known slide patterns. | Build fixtures for quote, architecture, roadmap, CTA, and cards; compare manifest and key XML checks. | Create `fixtures/` with minimal JSON decks. |
| AFL-FEAT-006 | Autonomy contract | proposed | low | Defines what the agent may change freely, what needs approval, and what is locked. | Contract is short, clear, and referenced before system-level changes. | Add section to creative system doc. |
| AFL-FEAT-007 | Content/narrative QA rubric | proposed | low | Converts subjective critique into consistent scoring. | Rubric rates clarity, CXO stakes, self-explanation, tension, proof, and CTA. | Add rubric to `docs/AXLFLO_CREATIVE_SYSTEM.md`. |
| AFL-FEAT-008 | Visual diff or screenshot review workflow | deferred | high | Would catch visual defects better than XML checks. | Needs reliable local rendering and image comparison without slowing every build. | Revisit after lower-risk QA features mature. |

## Promotion Rules

1. Prefer low-risk documentation/process features first.
2. Add executable checks before adding more renderer complexity.
3. Trial medium-risk creative features on one deck before making them global.
4. Do not promote anything that reduces deck distinctiveness, increases text density, or forces every slide into the same layout.
5. Every promoted feature must add a changelog entry.

## Current Recommendation

Prioritize in this order:

1. `AFL-FEAT-001` executable feedback regression checks.
2. `AFL-FEAT-003` visual QA checklist artifact per build.
3. `AFL-FEAT-007` content/narrative QA rubric.
4. `AFL-FEAT-006` autonomy contract.
5. `AFL-FEAT-004` slide strategy layer.

This sequence improves reliability before increasing creative autonomy.

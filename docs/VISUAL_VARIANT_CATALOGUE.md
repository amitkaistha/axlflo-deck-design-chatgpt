# AxlFlo Visual Variant Catalogue

Purpose: preserve premium deck variety without letting future builds invent weak visual novelty.

This catalogue is the approved visual vocabulary learned from the reference decks:

- `2. SHIFT_to_SCALE_AxlFlo_v3.0.pptx`
- `4. SHIFT_System_Behind_Star_v2.pptx`

Rule of thumb: visual variety is mandatory, but visual quality beats novelty. Prefer these proven variants before creating a new renderer.

## Variant Selection Rules

1. Do not use the same visual pattern on 2+ consecutive slides unless the layout plan explicitly approves the repeat.
2. Match the visual pattern to the narrative job of the slide.
3. Use new experimental variants only after visual approval.
4. A slide should have one dominant visual idea: number, framework, journey, architecture, proof, contrast, or CTA.
5. Icons should clarify meaning, not decorate empty cards.

## Approved Variants

| ID | Name | Narrative Role | Best For | Proven Reference |
|---|---|---|---|---|
| `cinematic_cover` | Cinematic Cover | Open with brand and tension | Title, major section open, premium thesis | SHIFT v3 slide 1; System Behind Star slide 1 |
| `evidence_dashboard` | Evidence Dashboard | Prove urgency with numbers | Adoption problem, market data, survey proof | SHIFT v3 slide 2; System Behind Star slide 4 |
| `thesis_triptych` | Thesis Triptych | Explain three-part truth | Problem framing, amplifier logic, failure modes | SHIFT v3 slide 3; System Behind Star slides 3 and 5 |
| `instrument_panel` | Instrument / Assessment Panel | Show gap, score, or operating diagnosis | Adoption gap, maturity scan, before/after assessment | SHIFT v3 slide 4 |
| `framework_map` | Framework Map | Introduce a methodology and outcome logic | SHIFT to SCALE, pillar systems, operating model | SHIFT v3 slide 5; System Behind Star slide 8 |
| `metrics_proof_grid` | Metrics Proof Grid | Show measured impact without a wall of text | Productivity proof, case metrics, adoption evidence | SHIFT v3 slide 6 |
| `journey_map` | Journey Map | Show destination-state transformation | 12-month vision, future-state path | SHIFT v3 slide 7 |
| `sprint_roadmap` | Sprint Roadmap | Convert strategy into phased delivery | 21-week sprint, activation plan, implementation roadmap | SHIFT v3 slide 8; System Behind Star slide 14 |
| `layered_operating_system` | Layered Operating System | Show stack/layers of capability | Copilot agents, workflow layers, enterprise AI OS | SHIFT v3 slide 9 |
| `strategic_upside_grid` | Strategic Upside Grid | Show commercial/ecosystem upside | Customer Zero, board upside, platform advantage | SHIFT v3 slide 10 |
| `credentials_proof` | Credentials Proof | Establish credibility with case evidence | Proven-in-field, founder track record, result blocks | SHIFT v3 slides 11-12 |
| `architecture_board` | Architecture Board | Show a governed system with boundaries | Files, roles, rules, QA, versioned components | System Behind Star slide 10 |
| `meta_engine_process` | Meta Engine Process | Show how the deck/system was built | Agentic engineering, feedback loops, governed generation | System Behind Star slide 11 |
| `translation_matrix` | Translation Matrix | Translate one discipline into another | Software engineering -> agentic engineering -> payoff | System Behind Star slide 12 |
| `outcome_ladder` | Outcome Ladder | Show compounding effect from individual to system | Star player to team capability, capability lift | System Behind Star slide 13 |
| `commercial_cta_packages` | Commercial CTA Packages | Convert argument into buying path | Offers, discovery session, pilot, scale programme | System Behind Star slide 15 |
| `use_case_deep_dive` | Use Case Deep Dive | Make a use case tangible by role | HR, ITES/BPO, functional role adoption | SHIFT v3 slides 15-16 |
| `disclaimer_appendix` | Disclaimer / Appendix | Legal and usage notes | Proprietary statement, source notes, appendices | Both reference decks |

## Intent Mapping

Use this mapping before selecting a renderer.

| Slide Intent | Preferred Variants |
|---|---|
| Hook / opening provocation | `cinematic_cover`, `thesis_triptych`, `evidence_dashboard` |
| Problem size / urgency | `evidence_dashboard`, `metrics_proof_grid` |
| Core truth / thesis | `thesis_triptych`, `outcome_ladder` |
| Gap / readiness / assessment | `instrument_panel`, `evidence_dashboard` |
| Framework introduction | `framework_map`, `translation_matrix` |
| Methodology delivery path | `sprint_roadmap`, `journey_map` |
| Architecture / system proof | `architecture_board`, `layered_operating_system` |
| Case study / credibility | `credentials_proof`, `meta_engine_process` |
| Translation across concepts | `translation_matrix`, `framework_map` |
| Role-specific use case | `use_case_deep_dive` |
| CTA / sales motion | `commercial_cta_packages`, `sprint_roadmap` |
| Legal / notes | `disclaimer_appendix` |

## Renderer Status

Approved renderer family currently includes:

- `title`
- `storyCards`
- `insightColumns`
- `frameworkRows`
- `sectionDivider`
- `processCycle`
- `systemArchitecture`
- `conceptMap`
- `insightGrid`
- `roadmapPhases`
- `numberProofCards`
- `ctaClosing`
- `disclaimer`

Experimental renderer family:

- `numberLed`
- `spectrum`
- `curve`
- `flowRisk`
- `courtroom`
- `stack`
- `truthGap`
- `flywheel`

Experimental variants should not be used in client-facing decks until visually approved or rebuilt to match the premium reference vocabulary.

## Build Guidance

The layout plan should include a `visual_variant` for each slide, even when `render_as` uses an existing renderer. Example:

```json
{
  "slide": 4,
  "render_as": "storyCards",
  "visual_variant": "thesis_triptych",
  "creative_intent": "Frame AI as an amplifier, not an equalizer.",
  "visual_anchor": "three icon-led proof cards"
}
```

`render_as` tells the engine how to draw. `visual_variant` tells the agent why this slide deserves that composition.

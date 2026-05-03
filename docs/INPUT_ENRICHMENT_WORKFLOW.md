# AxlFlo Input Enrichment Workflow

Core rule:

> Do not convert text directly into slides. Convert text into a structured argument first.

This workflow turns raw user input into an enriched brief JSON file that preserves intent, audience, proof, assumptions, and visual opportunities before any renderable deck JSON is created.

## Pipeline

```text
Raw input
→ intake questions
→ enriched brief JSON
→ structured argument
→ slide strategy JSON
→ render JSON + layout plan
→ PPTX
→ QA + critique + feedback loop
```

The enriched brief follows [schema/axlflo.enriched-brief.schema.json](../schema/axlflo.enriched-brief.schema.json).

## Intake Questions

Ask only what is needed. Prefer 5-7 questions. If the user has already answered a question in the raw input, infer it and list it as an assumption instead of asking again.

Default questions:

1. **Who is the audience?**  
   Example: CXO, board, business unit leader, sales prospect, internal team.

2. **What decision stage is this for?**  
   Example: awareness, strategic alignment, budget approval, proposal close, internal readiness.

3. **How should it feel?**  
   Example: provocative, sober, premium, practical, urgent, visionary, diagnostic.

4. **How many slides should it roughly be?**  
   Example: 5-7, 10-12, 15-20, or "use judgment."

5. **How will it be consumed?**  
   Example: sent by email, live presentation, leave-behind, workshop, board pre-read.

6. **What action should the reader take?**  
   Example: book a discovery call, approve a sprint, align on a roadmap, fund a programme.

7. **What proof level is required?**  
   Example: conceptual only, case study, data-backed, ROI model, technical architecture.

Optional questions when relevant:

- What must be included?
- What must be avoided?
- Should it be provocative or conservative?
- Are there legal, compliance, or confidentiality constraints?
- Are there named examples, clients, or case studies we can use?

## The Eight Argument Questions

The enriched brief must answer these before slide strategy begins:

1. **What is the story?**  
   The reader journey from current belief to new belief.

2. **What is the tension?**  
   The uncomfortable truth that creates urgency.

3. **What is the shift?**  
   The change in thinking the deck must create.

4. **What needs proof?**  
   Claims that require evidence, examples, case study, architecture, or numbers.

5. **What should become a number slide?**  
   Anything involving scale, sequence, magnitude, adoption gap, ROI, timeline, or proof.

6. **What should become an architecture/system visual?**  
   Anything involving components, governance, flow, roles, file structures, operating models, or feedback loops.

7. **What should be the CTA?**  
   The commercial or behavioural action the reader should take next.

8. **What should be the memorable line?**  
   The sentence the reader should remember after closing the deck.

## Enrichment Rules

- Preserve source metadata. Do not flatten source files into anonymous content.
- Separate facts, claims, proof, assumptions, and open questions.
- Capture the intended audience and delivery context before choosing slide types.
- Identify visual opportunities before creating slides.
- Surface assumptions explicitly.
- Ask for approval before using sensitive claims, named client examples, pricing, legal language, or public case-study framing.
- If raw input is messy, preserve ambiguity in `open_questions`; do not silently resolve important uncertainty.

## Output Artifacts

For a full deck build, the agent should produce or update:

1. `enriched.brief.json` - follows the enriched brief schema.
2. `strategy.plan.json` - slide-by-slide story and visual strategy.
3. `content.json` - renderable deck content.
4. `layout.plan.json` - render instructions and guardrails.
5. PPTX + manifest.
6. QA and critique summary.

## Quality Bar

The enriched brief is good when another agent could read it and understand:

- who the deck is for,
- what it is trying to change in the reader's mind,
- what proof is needed,
- what visual forms are implied,
- what the CTA is,
- what assumptions were made,
- and what questions remain unresolved.

# Multi-Project Brain Architecture

This vault started as the CitaLink first-customer brain. It should now work as a reusable operating system for more projects.

## Design Goal

One brain, many projects, many AI collaborators.

The vault should answer four questions for any project:

1. What is the objective?
2. What is the current truth?
3. What should the next agent do?
4. What context can be safely shared with another AI?

## Folder Model

Use this structure for every project:

```text
Projects/
  project-slug/
    00-Project-Index.md
    01-Strategy/
    02-Research/
    03-Assets/
    04-Pipeline/
    05-Meetings/
    06-Delivery/
    07-Decisions/
    08-External-AI/
```

The current CitaLink materials remain in the root brain folders for continuity. New projects should use `Projects/project-slug/`.

## Project Contract

Every project must define:

- `objective`: the outcome the project exists to produce.
- `owner`: human accountable for decisions.
- `status`: active, paused, shipped, archived.
- `north_star_metric`: the metric that proves progress.
- `current_next_action`: one concrete next step.
- `safe_context_level`: public, internal, confidential, restricted.
- `external_ai_allowed`: yes or no.

## Shared Brain Layers

Use root folders for reusable operating knowledge:

- `00-System`: architecture, rules, provider profiles, handoff protocol.
- `02-Agents`: reusable agent roles and meeting format.
- `03-Lead-Machine`: reusable acquisition patterns.
- `06-Audits-Demos`: reusable audit and proposal templates.
- `10-External-AI`: AI handoff templates, context packs, inbox, outbox.

## Context Levels

| Level | Meaning | External AI rule |
| --- | --- | --- |
| public | Safe to share publicly | Can be shared with any approved AI |
| internal | Business context, no secrets | Can be shared after review |
| confidential | Strategy, leads, account notes | Share only with explicit approval |
| restricted | Secrets, credentials, patient/customer data | Never share |

## Operating Rule

Before sending context to Kimi, GLM, or any other AI:

1. Pick a project.
2. Pick a mission.
3. Generate a context pack.
4. Review the pack manually.
5. Remove secrets, private data, and unnecessary account details.
6. Send only the minimum needed context.

## Migration Path

For CitaLink, keep the current structure but expose it through a project registry entry:

- Project slug: `citalink`
- Current objective: win first appointment recovery pilot.
- Active mission: book one audit with a dental or aesthetic clinic.
- Export profile: `first-customer`

Future projects should not copy the whole CitaLink vault. They should copy the project template and link back to shared system notes.

# AI Interoperability Protocol

Use this protocol when another AI needs to work with the brain.

## Principle

External AIs should receive a task-specific context pack, not raw vault access.

This protects strategy, leads, credentials, and personal data while still making the brain useful to Kimi, GLM, Claude, ChatGPT, local models, or future agents.

## Standard Handoff Packet

Every packet should include:

1. Project summary.
2. Current objective.
3. Current next action.
4. Relevant source notes.
5. Constraints and guardrails.
6. Expected output format.
7. Forbidden actions.
8. Return path: where the answer should be saved in Obsidian.

## External AI Roles

| Role | Best use | Output |
| --- | --- | --- |
| strategist | Positioning, tradeoffs, market angle | Decision memo |
| critic | Find weak assumptions and risks | Risk list |
| researcher | Summarize public sources | Research note |
| copywriter | Draft outbound, landing copy, scripts | Copy variants |
| product_architect | Convert pain into workflows | Workflow spec |
| code_reviewer | Review implementation details | Findings |

## Handoff Rules

- Never send API keys, `.env`, credentials, raw customer data, patient data, or private contact data.
- Never send full lead lists unless explicitly approved.
- Prefer summaries and selected excerpts over entire directories.
- Ask for structured output that can be pasted back into Obsidian.
- Mark every AI-generated answer as unverified until reviewed by a human or Codex.

## Output Contract

Ask external AIs to return:

```md
# External AI Response

provider:
model:
role:
project:
mission:
date:

## Answer

## Assumptions

## Risks

## Suggested Obsidian Updates

## Follow-Up Questions
```

## Inbox/Outbox Workflow

1. Put generated context packs in `10-External-AI/Context-Packs/`.
2. Put prompts sent to other AIs in `10-External-AI/Outbox/`.
3. Put responses from other AIs in `10-External-AI/Inbox/`.
4. Summarize accepted decisions into the relevant project notes.
5. Keep rejected or stale suggestions in the inbox with a note explaining why.

## Provider Independence

The brain should not depend on one model provider. Provider-specific details live in [[Provider-Profiles]].

The durable interface is the handoff packet, not the API vendor.

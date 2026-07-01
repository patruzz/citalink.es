# External AI Provider Readme

This folder is the bridge between Obsidian and other AI systems.

## Workflow

1. Generate a context pack with `tools/citalink-ai-context-pack.mjs`.
2. Review the pack manually.
3. Paste it into Kimi, GLM, or another approved AI.
4. Save the exact prompt in `Outbox/`.
5. Save the response in `Inbox/`.
6. Promote only reviewed decisions back into project notes.

## Current Supported Profiles

- Kimi / Moonshot: see [[../00-System/Provider-Profiles#Kimi / Moonshot]]
- GLM / Z.AI: see [[../00-System/Provider-Profiles#GLM / Z.AI]]

## Generate Context Packs

From the repo root:

```bash
node tools/citalink-ai-context-pack.mjs --profile citalink-first-customer --provider kimi
node tools/citalink-ai-context-pack.mjs --profile citalink-first-customer --provider glm
```

Outputs:

- `10-External-AI/Context-Packs/*-context-pack.md`
- `10-External-AI/Context-Packs/*-context-pack.json`

The script does not call external APIs. It only creates local files for review.

## Safety

Do not put API keys, `.env` files, raw CRM data, patient data, or private lead data in this folder.

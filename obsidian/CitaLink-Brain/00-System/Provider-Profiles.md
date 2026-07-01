# Provider Profiles

This note tracks how external AIs can receive context from the brain.

Do not store API keys in Obsidian. Use environment variables or the provider dashboard.

## Kimi / Moonshot

- Provider: Moonshot AI / Kimi.
- API style: OpenAI-compatible chat completions.
- Base URL: `https://api.moonshot.ai/v1`.
- Typical environment variable: `MOONSHOT_API_KEY`.
- Example model from docs: `kimi-k2.6`.
- Best brain use: long-context critique, coding review, Chinese/English research, alternative strategy.
- Official quickstart: https://platform.kimi.ai/docs/guide/start-using-kimi-api

Node client shape:

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: "https://api.moonshot.ai/v1",
});
```

## GLM / Z.AI

- Provider: Z.AI / GLM.
- API style: OpenAI-compatible chat completions plus native Z.AI APIs.
- Base URL: `https://api.z.ai/api/paas/v4/`.
- Typical environment variable: `ZAI_API_KEY`.
- Example model from docs: `glm-5.2`.
- Best brain use: coding tasks, structured reasoning, research critique, alternative product workflow.
- Official API introduction: https://docs.z.ai/api-reference/introduction

Node client shape:

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.ZAI_API_KEY,
  baseURL: "https://api.z.ai/api/paas/v4/",
});
```

## Generic OpenAI-Compatible Provider

Use this profile for providers that expose OpenAI-compatible chat completions.

Required fields:

- `baseURL`
- `apiKeyEnv`
- `model`
- `contextPolicy`
- `allowedProjects`

## Provider Decision Rule

Use Kimi when:

- Long context matters.
- You want a second strategic/coding opinion.
- The prompt can be shared as an internal or public context pack.

Use GLM when:

- You want coding, structured reasoning, or an alternative agentic workflow view.
- The prompt can be shared as an internal or public context pack.

Do not use either provider when:

- The context contains secrets, patient/customer personal data, private lead lists, or unreviewed confidential strategy.

#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

const outputDir = 'obsidian/CitaLink-Brain/10-External-AI/Context-Packs';

const providers = {
  kimi: {
    provider: 'Kimi / Moonshot',
    apiKeyEnv: 'MOONSHOT_API_KEY',
    baseURL: 'https://api.moonshot.ai/v1',
    model: 'kimi-k2.6',
    docs: 'https://platform.kimi.ai/docs/guide/start-using-kimi-api',
  },
  glm: {
    provider: 'GLM / Z.AI',
    apiKeyEnv: 'ZAI_API_KEY',
    baseURL: 'https://api.z.ai/api/paas/v4/',
    model: 'glm-5.2',
    docs: 'https://docs.z.ai/api-reference/introduction',
  },
  generic: {
    provider: 'Generic external AI',
    apiKeyEnv: '',
    baseURL: '',
    model: '',
    docs: '',
  },
};

const profiles = {
  'citalink-first-customer': {
    project: 'citalink',
    mission: 'book-first-15-minute-audit',
    role: 'strategist',
    safeContextLevel: 'confidential-review-required',
    allowedProviders: ['kimi', 'glm', 'generic'],
    objective: 'Get one dental or aesthetic clinic to accept a 15-minute CitaLink appointment leakage audit.',
    currentNextAction: 'Call Perez Belmonte, AHOA, and Clinica Pardinas, then log every touch in Obsidian.',
    expectedOutput: [
      'A sharper 48-hour execution memo.',
      'Risks or weak assumptions in the outreach plan.',
      'Three concrete improvements to the audit-to-pilot conversion path.',
      'Obsidian-ready updates only, with no request for private data.',
    ],
    sourceFiles: [
      'obsidian/CitaLink-Brain/00-Index.md',
      'obsidian/CitaLink-Brain/00-System/AI-Interoperability-Protocol.md',
      'obsidian/CitaLink-Brain/00-System/Provider-Profiles.md',
      'obsidian/CitaLink-Brain/01-Strategy/First-Customer-Plan.md',
      'obsidian/CitaLink-Brain/03-Lead-Machine/Compliance-Outreach-Guardrails.md',
      'obsidian/CitaLink-Brain/03-Lead-Machine/Outreach-Batch-2026-07-01.md',
      'obsidian/CitaLink-Brain/06-Audits-Demos/First-Audit-48h-Sprint.md',
      'obsidian/CitaLink-Brain/06-Audits-Demos/Microaudits/Perez-Belmonte-Microaudit.md',
      'obsidian/CitaLink-Brain/06-Audits-Demos/Microaudits/AHOA-Microaudit.md',
      'obsidian/CitaLink-Brain/06-Audits-Demos/Microaudits/Pardinas-Microaudit.md',
    ],
  },
};

const args = process.argv.slice(2);

const getArg = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
};

const shouldShowHelp = args.includes('--help') || args.includes('-h');

const printHelp = () => {
  console.log(`Usage:
  node tools/citalink-ai-context-pack.mjs --profile citalink-first-customer --provider kimi
  node tools/citalink-ai-context-pack.mjs --profile citalink-first-customer --provider glm

Options:
  --profile   Context profile to export. Default: citalink-first-customer
  --provider  Target provider: kimi, glm, generic. Default: generic
  --help      Show this help text
`);
};

const readSourceFiles = (sourceFiles) => sourceFiles.map((filePath) => {
  const absolutePath = resolve(filePath);

  if (!existsSync(absolutePath)) {
    throw new Error(`Missing source file: ${filePath}`);
  }

  return {
    path: filePath,
    relativePath: relative(process.cwd(), absolutePath).replaceAll('\\', '/'),
    content: readFileSync(absolutePath, 'utf8').trim(),
  };
});

const toMarkdown = ({ profileKey, profile, providerKey, provider, sources }) => {
  const providerLines = [
    `provider_key: ${providerKey}`,
    `provider: ${provider.provider}`,
    `model: ${provider.model || 'manual-choice'}`,
    `base_url: ${provider.baseURL || 'manual-choice'}`,
    `api_key_env: ${provider.apiKeyEnv || 'not-included'}`,
    `docs: ${provider.docs || 'not-included'}`,
  ];

  return [
    '# External AI Context Pack',
    '',
    '```yaml',
    `profile: ${profileKey}`,
    `project: ${profile.project}`,
    `mission: ${profile.mission}`,
    `role: ${profile.role}`,
    `safe_context_level: ${profile.safeContextLevel}`,
    'status: review_required_before_external_use',
    ...providerLines,
    '```',
    '',
    '## Review Gate',
    '',
    'This pack is generated for human review before any external AI use. Remove anything that should not leave the local workspace.',
    '',
    'Do not send secrets, API keys, patient data, raw CRM exports, private phone numbers, or unrevised lead lists.',
    '',
    '## Objective',
    '',
    profile.objective,
    '',
    '## Current Next Action',
    '',
    profile.currentNextAction,
    '',
    '## Expected Output',
    '',
    ...profile.expectedOutput.map((item) => `- ${item}`),
    '',
    '## External AI Prompt',
    '',
    'You are an external AI collaborator. Use only the context below. Return structured Markdown with these sections: Answer, Assumptions, Risks, Suggested Obsidian Updates, Follow-Up Questions.',
    '',
    'Do not ask for secrets or private data. Treat all market and account facts as unverified until a human checks them.',
    '',
    '## Source Notes',
    '',
    ...sources.flatMap((source) => [
      `### ${source.relativePath}`,
      '',
      '```md',
      source.content,
      '```',
      '',
    ]),
  ].join('\n');
};

const toManifest = ({ profileKey, profile, providerKey, provider, sources }) => ({
  profile: profileKey,
  project: profile.project,
  mission: profile.mission,
  role: profile.role,
  safeContextLevel: profile.safeContextLevel,
  status: 'review_required_before_external_use',
  providerKey,
  provider,
  sourceFiles: sources.map((source) => source.relativePath),
  generatedAt: new Date().toISOString(),
});

const writeContextPack = ({ profileKey, providerKey, markdown, manifest }) => {
  const outputBase = resolve(outputDir, `${profileKey}-${providerKey}-context-pack`);
  const markdownPath = `${outputBase}.md`;
  const manifestPath = `${outputBase}.json`;

  mkdirSync(dirname(markdownPath), { recursive: true });
  writeFileSync(markdownPath, `${markdown}\n`, 'utf8');
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  return { markdownPath, manifestPath };
};

const main = () => {
  if (shouldShowHelp) {
    printHelp();
    return;
  }

  const profileKey = getArg('profile', 'citalink-first-customer');
  const providerKey = getArg('provider', 'generic');
  const profile = profiles[profileKey];
  const provider = providers[providerKey];

  if (!profile) {
    throw new Error(`Unknown profile: ${profileKey}. Available: ${Object.keys(profiles).join(', ')}`);
  }

  if (!provider) {
    throw new Error(`Unknown provider: ${providerKey}. Available: ${Object.keys(providers).join(', ')}`);
  }

  if (!profile.allowedProviders.includes(providerKey)) {
    throw new Error(`Provider ${providerKey} is not allowed for profile ${profileKey}`);
  }

  const sources = readSourceFiles(profile.sourceFiles);
  const packInput = { profileKey, profile, providerKey, provider, sources };
  const markdown = toMarkdown(packInput);
  const manifest = toManifest(packInput);
  const { markdownPath, manifestPath } = writeContextPack({ profileKey, providerKey, markdown, manifest });

  console.log(`Wrote ${markdownPath}`);
  console.log(`Wrote ${manifestPath}`);
  console.log('Review the Markdown pack before sending anything to an external AI.');
};

main();

import { existsSync, readFileSync } from 'node:fs';

const rootDir = process.cwd();

const loadEnvFile = (fileName) => {
  const filePath = `${rootDir}/${fileName}`;
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (!process.env[key]) {
      process.env[key] = rest.join('=').trim();
    }
  }
};

loadEnvFile('.env.local');
loadEnvFile('.env');

const voiceBaseUrl = (process.env.VOICE_AGENT_BASE_URL || 'http://127.0.0.1:8787').replace(/\/+$/, '');
const pocketBaseUrl = (process.env.CITALINK_API_BASE_URL || 'http://127.0.0.1:8090').replace(/\/+$/, '');
const serviceSecret = process.env.CITALINK_SERVICE_SECRET || '';

const requestJson = async (baseUrl, path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, options);
  const data = await response.json().catch(() => ({}));
  return { response, data };
};

const check = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const run = async () => {
  check(serviceSecret, 'CITALINK_SERVICE_SECRET debe estar configurado para probar la integracion PocketBase + voz.');

  const backendHealth = await requestJson(pocketBaseUrl, '/api/citalink/voice/health');
  check(backendHealth.response.ok, `PocketBase voice health failed with ${backendHealth.response.status}`);
  check(backendHealth.data.ok === true, 'PocketBase voice health did not return ok=true');
  check(backendHealth.data.serviceSecretConfigured === true, 'PocketBase no tiene CITALINK_SERVICE_SECRET configurado.');

  const voiceHealth = await requestJson(voiceBaseUrl, '/health');
  check(voiceHealth.response.ok, `Voice agent health failed with ${voiceHealth.response.status}`);
  check(voiceHealth.data.ok === true, 'Voice agent health did not return ok=true');

  const dryRun = await requestJson(voiceBaseUrl, '/api/citalink/voice/calls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-citalink-service-secret': serviceSecret,
    },
    body: JSON.stringify({
      to: '+34910000000',
      contactName: 'Smoke Lead',
      legalBasis: 'consent',
      objective: 'Prueba tecnica de persistencia de llamada CitaLink.',
      dryRun: true,
    }),
  });

  check(dryRun.response.ok, `Voice dry-run failed with ${dryRun.response.status}`);
  check(dryRun.data.ok === true, 'Voice dry-run did not return ok=true');
  check(dryRun.data.pocketBaseSync === 'ok', `PocketBase sync should be ok, got ${dryRun.data.pocketBaseSync || 'missing'}`);

  console.log(JSON.stringify({
    ok: true,
    voiceBaseUrl,
    pocketBaseUrl,
    callSessionId: dryRun.data.callSessionId,
    pocketBaseSync: dryRun.data.pocketBaseSync,
    twilioConfigured: voiceHealth.data.twilioConfigured === true,
    openaiConfigured: voiceHealth.data.openaiConfigured === true,
  }, null, 2));
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

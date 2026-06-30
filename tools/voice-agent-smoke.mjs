const baseUrl = process.env.VOICE_AGENT_BASE_URL || 'http://127.0.0.1:8787';

const requestText = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  return { response, text };
};

const requestJson = async (path, options = {}) => {
  const { response, text } = await requestText(path, options);
  let data = {};
  try {
    data = JSON.parse(text);
  } catch (error) {
    data = {};
  }
  return { response, data, text };
};

const check = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const run = async () => {
  const health = await requestJson('/health');
  check(health.response.ok, `Voice health failed with ${health.response.status}`);
  check(health.data.ok === true, 'Voice health did not return ok=true');

  const dryRunCall = await requestJson('/api/citalink/voice/calls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dryRun: true,
      to: '+34600000000',
      contactName: 'Smoke Lead',
      objective: 'Validar interes y proponer demo.',
      legalBasis: 'inbound_request',
    }),
  });
  check(dryRunCall.response.ok, `Dry-run call failed with ${dryRunCall.response.status}`);
  check(dryRunCall.data.dryRun === true, 'Dry-run call did not return dryRun=true');

  const invalidLegalBasis = await requestJson('/api/citalink/voice/calls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dryRun: true,
      to: '+34600000000',
      objective: 'Validar interes.',
      legalBasis: 'cold_unapproved',
    }),
  });
  check(invalidLegalBasis.response.status === 422, 'Invalid legalBasis should return 422');

  const blocked = await requestJson('/api/citalink/voice/calls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dryRun: true,
      to: '+34600000000',
      objective: 'Validar interes.',
      legalBasis: 'inbound_request',
      doNotContact: true,
    }),
  });
  check(blocked.response.status === 409, 'doNotContact should return 409');

  const twiml = await requestText('/twilio/voice?callSessionId=smoke&contactName=Smoke');
  check(twiml.response.ok, `TwiML failed with ${twiml.response.status}`);
  check(twiml.text.includes('<Connect>') && twiml.text.includes('<Stream'), 'TwiML should include Connect Stream');

  console.log(JSON.stringify({
    ok: true,
    baseUrl,
    twilioConfigured: health.data.twilioConfigured === true,
    openaiConfigured: health.data.openaiConfigured === true,
  }, null, 2));
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

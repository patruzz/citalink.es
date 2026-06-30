const baseUrl = process.env.CITALINK_API_BASE_URL || 'http://127.0.0.1:8090';

const requestJson = async (path, options = {}) => {
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
  const health = await requestJson('/api/citalink/health');
  check(health.response.ok, `Healthcheck failed with ${health.response.status}`);
  check(health.data.ok === true, 'Healthcheck did not return ok=true');

  const collections = health.data.collections || {};
  for (const name of ['demoRequests', 'agentActions', 'stripeCheckoutSessions', 'stripeCustomers', 'contacts', 'callSessions', 'emailMessages']) {
    check(collections[name] === true, `Missing collection: ${name}`);
  }

  const invalidCheckout = await requestJson('/api/citalink/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan: 'invalid' }),
  });
  check(invalidCheckout.response.status === 400, 'Invalid plan should return 400');

  const starterCheckout = await requestJson('/api/citalink/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan: 'starter' }),
  });
  check(
    [200, 503].includes(starterCheckout.response.status),
    `Starter checkout should return 200 or 503, got ${starterCheckout.response.status}`
  );

  const demoRequest = await requestJson('/api/collections/demoRequests/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Smoke Lead',
      company: 'Smoke Co',
      email: 'smoke@example.com',
      phone: '600000000',
      sector: 'B2B',
      monthlyLeads: 50,
      mainChannel: 'email',
      message: 'Quiero una demo',
      consent: true,
    }),
  });
  check(demoRequest.response.ok, `Demo request failed with ${demoRequest.response.status}`);
  check(
    ['sent', 'smtp_missing', 'failed'].includes(demoRequest.data.notificationStatus),
    `Unexpected demo notificationStatus: ${demoRequest.data.notificationStatus}`
  );

  console.log(JSON.stringify({
    ok: true,
    baseUrl,
    smtpConfigured: health.data.env?.smtpConfigured === true,
    stripeConfigured: health.data.env?.stripeConfigured === true,
  }, null, 2));
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

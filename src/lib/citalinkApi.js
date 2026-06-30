const normalizeBaseUrl = (value) => String(value || '').replace(/\/+$/, '');

export const CITALINK_API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_POCKETBASE_URL || '/hcgi/platform'
);

export const createStripeCheckoutSession = async (plan) => {
  const response = await fetch(`${CITALINK_API_BASE_URL}/api/citalink/stripe/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'No se pudo iniciar el pago.');
  }

  if (!payload.url) {
    throw new Error('Stripe no devolvió una URL de pago.');
  }

  return payload;
};

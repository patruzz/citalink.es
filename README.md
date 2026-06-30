# CitaLink

Frontend React/Vite compatible with Hostinger deployment. The primary conversion path is `/precios`, where the browser asks the backend for a Stripe Checkout Session and then redirects to Stripe.

## Hostinger

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

`npm run build` executes `vite build --configLoader native`.

The full PocketBase backend version is preserved in the `codex/fullstack-pocketbase` branch.

## Stripe

- Frontend endpoint base: `VITE_POCKETBASE_URL || '/hcgi/platform'`
- Checkout route: `POST /api/citalink/stripe/checkout`
- Webhook route: `POST /api/citalink/stripe/webhook`
- Required backend variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_STARTER_MONTHLY`, `STRIPE_PRICE_GROWTH_MONTHLY`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_SETUP`

No Stripe secret key or Price ID should be exposed in `src/` or the production bundle.

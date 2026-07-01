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
- Backend healthcheck: `GET /api/citalink/health`
- SMTP test route: `POST /api/citalink/smtp/test` with `x-citalink-webhook-secret`
- Required backend variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_STARTER_MONTHLY`, `STRIPE_PRICE_GROWTH_MONTHLY`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_SETUP`

No Stripe secret key or Price ID should be exposed in `src/` or the production bundle.

## Backend Local

```sh
npm run backend:dev
npm run backend:smoke
```

The PocketBase backend lives in the local `backend/` folder and is ignored from `main` so Hostinger can keep deploying the static frontend cleanly.

## Voice Agent Local

```sh
npm run voice:dev
npm run voice:smoke
```

The voice agent exposes Twilio call creation, TwiML, status callbacks, and a Media Streams WebSocket bridge for OpenAI Realtime. Without Twilio credentials it runs in dry-run mode.

To test PocketBase persistence, run PocketBase and the voice agent with the same `CITALINK_SERVICE_SECRET`, then:

```sh
npm run voice:integration-smoke
```

The local runtime hook is `backend/pb_hooks/voice-agent-ingest.pb.js`. A tracked copy lives in `ops/pocketbase/pb_hooks/voice-agent-ingest.pb.js` because `backend/` stays ignored on `main` for Hostinger.

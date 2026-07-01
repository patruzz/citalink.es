# CitaLink deployment checklist

## Rama Hostinger

La rama `main` es una app React/Vite en raiz para despliegue en Hostinger.

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

La version fullstack con PocketBase, hooks y migraciones queda preservada en la rama `codex/fullstack-pocketbase`.

## Precios actuales (Julio 2026)

| Plan | Precio |
|---|---|
| Starter | 29€/mes |
| Growth | 79€/mes (recomendado) |
| Pro | 179€/mes |
| Setup | 99€ (pago único) |

## Variables fullstack

```env
CONTACT_EMAIL=pat@citalink.es
APP_PUBLIC_URL=https://citalink.es
SMTP_FROM=pat@citalink.es
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=pat@citalink.es
SMTP_PASS=<password-del-buzon>
SMTP_TLS=true
SMTP_AUTH_METHOD=PLAIN
PB_ENCRYPTION_KEY=<clave-produccion>
OPENAI_API_KEY=<clave-openai>
EMAIL_WEBHOOK_SECRET=<secreto-largo>
STRIPE_SECRET_KEY=<stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<stripe-webhook-secret>
STRIPE_PRICE_STARTER_MONTHLY=<price-starter-mensual>
STRIPE_PRICE_GROWTH_MONTHLY=<price-growth-mensual>
STRIPE_PRICE_PRO_MONTHLY=<price-pro-mensual>
STRIPE_PRICE_SETUP=<price-setup-unico>
CITALINK_SERVICE_SECRET=<secreto-compartido-backend-voice>
CITALINK_API_BASE_URL=https://api.citalink.es
CITALINK_POCKETBASE_SYNC=true
VOICE_AGENT_PUBLIC_URL=https://voice.citalink.es
OPENAI_REALTIME_MODEL=gpt-4o-realtime-preview
TWILIO_ACCOUNT_SID=<twilio-account-sid>
TWILIO_AUTH_TOKEN=<twilio-auth-token>
TWILIO_PHONE_NUMBER=<numero-twilio-e164>
TWILIO_WEBHOOK_BASE_URL=https://voice.citalink.es
TWILIO_SIGNATURE_DISABLED=false
```

## Backend local

Arrancar y validar PocketBase local con la `PB_ENCRYPTION_KEY` real:

```sh
npm run backend:dev
npm run backend:smoke
```

Por defecto el script local usa `backend/pb_data_dev` y `backend/pb_migrations_dev` para no tocar `backend/pb_data`.
El healthcheck operativo es `GET /api/citalink/health`.

## Validacion de demo

- Confirmar `GET /api/citalink/health`.
- Enviar formulario `/demo`.
- Confirmar que se crea `demoRequests`.
- Confirmar email interno en `pat@citalink.es`.
- Confirmar email al prospecto.
- Confirmar que una solicitud con "baja" crea `doNotContact`.

## Validacion de Inbox IA

- Enviar webhook de prueba a `POST /api/citalink/email/inbound`.
- Confirmar `emailConversations`.
- Confirmar `agentActions`.
- Confirmar que marketing queda `requiresApproval=true` y `approved=false`.

## Validacion de Stripe directo

- En `/precios`, pulsar "Comprar ahora" en Starter, Growth y Pro.
- Confirmar que el navegador redirige a Stripe Checkout.
- Confirmar que Checkout contiene una linea mensual y una linea de setup unico.
- Probar cancelacion y confirmar vuelta a `/precios?payment=cancelled`.
- Probar compra test y confirmar vuelta a `/dashboard?payment=success&session_id=...`.
- Confirmar que el webhook crea o actualiza `stripeCheckoutSessions` y `stripeCustomers`.
- Confirmar que se crea una accion de onboarding en `agentActions`.
- Confirmar que `pat@citalink.es` recibe aviso interno si SMTP esta configurado.
- Confirmar que firmas invalidas en `/api/citalink/stripe/webhook` devuelven error.

## Validacion de llamadas IA

- Arrancar PocketBase con `npm run backend:dev`.
- Arrancar el servidor de voz con `npm run voice:dev`.
- Confirmar `GET /api/citalink/voice/health`.
- Ejecutar `npm run voice:smoke`.
- Ejecutar `npm run voice:integration-smoke` y confirmar `pocketBaseSync=ok`.
- En Twilio, configurar el webhook de voz publico a `/twilio/voice`.
- Confirmar que `POST /twilio/status` actualiza `callSessions`.
- Confirmar que cada llamada final crea una accion pendiente en `agentActions`.
- No lanzar llamadas reales sin base legal, horario permitido y lista `doNotContact` revisada.

## Bloqueos conocidos

- Sin `SMTP_PASS`, el sistema guarda leads pero marca `smtp_missing`.
- Sin variables de Stripe, `/precios` muestra error util y no expone claves.
- Sin `PB_ENCRYPTION_KEY`, no se pueden migrar ni probar los datos reales cifrados.
- Sin `CITALINK_SERVICE_SECRET`, el servidor de voz funciona en local pero PocketBase rechaza la ingesta operativa.
- El despliegue final debe hacerse desde Hostinger/Horizons si no hay API de deploy disponible.

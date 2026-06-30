# CitaLink deployment checklist

## Rama Hostinger

La rama `main` es una app React/Vite en raiz para despliegue en Hostinger.

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

La version fullstack con PocketBase, hooks y migraciones queda preservada en la rama `codex/fullstack-pocketbase`.

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

## Bloqueos conocidos

- Sin `SMTP_PASS`, el sistema guarda leads pero marca `smtp_missing`.
- Sin variables de Stripe, `/precios` muestra error util y no expone claves.
- Sin `PB_ENCRYPTION_KEY`, no se pueden migrar ni probar los datos reales cifrados.
- El despliegue final debe hacerse desde Hostinger/Horizons si no hay API de deploy disponible.

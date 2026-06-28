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
```

## Migraciones

Solo aplican a la rama `codex/fullstack-pocketbase`. Ejecutar en produccion con la `PB_ENCRYPTION_KEY` real:

```sh
npm run migrations:up --prefix apps/pocketbase
```

## Validacion de demo

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

## Bloqueos conocidos

- Sin `SMTP_PASS`, el sistema guarda leads pero marca `smtp_missing`.
- Sin `PB_ENCRYPTION_KEY`, no se pueden migrar ni probar los datos reales cifrados.
- El despliegue final debe hacerse desde Hostinger/Horizons si no hay API de deploy disponible.

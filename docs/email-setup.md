# CitaLink email setup

## Buzon principal

- Contacto operativo: `pat@citalink.es`
- Mailbox confirmado en Hostinger Mail: `pat@citalink.es`
- El backend no guarda credenciales en el frontend ni en el bundle.

## Variables requeridas

Configura estas variables en el entorno de PocketBase/Hostinger:

```env
CONTACT_EMAIL=pat@citalink.es
SMTP_FROM=pat@citalink.es
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=pat@citalink.es
SMTP_PASS=<password-del-buzon-o-app-password>
SMTP_TLS=true
SMTP_AUTH_METHOD=PLAIN
```

Estos valores corresponden al SMTP de Hostinger que usa SSL directo en el puerto `465`.

Builder Mailer tambien queda soportado como alternativa:

```env
BUILDER_MAILER_API_URL=
BUILDER_MAILER_API_KEY=
BUILDER_MAILER_SENDER_ADDRESS=pat@citalink.es
EMAIL_WEBHOOK_SECRET=<secreto-largo-para-webhooks>
```

## Comportamiento esperado

- Sin SMTP ni Builder Mailer: la demo se guarda y `notificationStatus` queda como `smtp_missing`.
- Con SMTP/Builder Mailer correcto: se envia aviso interno a `pat@citalink.es` y confirmacion al prospecto.
- Si el envio falla: la demo se mantiene guardada y `notificationStatus` queda como `failed`.
- Si el contacto pide baja/no contacto: queda como `blocked` y se crea entrada en `doNotContact`.

## Inbound email

El endpoint interno para webhooks de correo es:

```text
POST /api/citalink/email/inbound
Header: x-citalink-webhook-secret: <EMAIL_WEBHOOK_SECRET>
```

Payload minimo:

```json
{
  "fromEmail": "cliente@example.com",
  "toEmail": "pat@citalink.es",
  "subject": "Quiero una demo",
  "body": "Me interesa conocer precios",
  "messageId": "hostinger-message-id"
}
```

El webhook crea:

- `emailConversations`
- `agentActions`
- `doNotContact` si detecta baja/no contactar

## Secuencias comerciales V1

- Inbound demo: responder con agradecimiento, confirmar contexto y proponer dos franjas de reunion.
- Prospeccion B2B: solo generar borrador si `legalBasis` y `audienceSource` estan documentados.
- Llamada: presentarse, explicar motivo, preguntar si acepta continuar y registrar baja si no quiere contacto.

## Compliance

- Email comercial: no enviar comunicaciones comerciales no solicitadas sin autorizacion previa o relacion contractual aplicable. Referencia: BOE Ley 34/2002, articulo 21: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- Llamadas comerciales: no realizar llamadas no deseadas sin consentimiento u otra base legitima aplicable. Referencia: BOE Ley 11/2022, articulo 66: https://www.boe.es/buscar/act.php?id=BOE-A-2022-10757
- Toda campana de marketing queda `requiresApproval=true` y `approved=false` por defecto.

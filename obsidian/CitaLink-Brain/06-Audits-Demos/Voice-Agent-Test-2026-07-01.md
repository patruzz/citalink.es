# Voice Agent Test - 2026-07-01

Objective: test CitaLink outbound voice product and audit-call script with Patrick's phone.

## Test Request

- Recipient: Patrick personal phone, masked as `+34 668 *** 365`.
- Intent: product and script test.
- Legal basis used in product request: `inbound_request`.
- Objective sent to product: "Probar el producto CitaLink y validar el guion de auditoria de fuga de citas en una llamada real."

## Result

The voice agent server started successfully and accepted the outbound call request.

```json
{
  "ok": true,
  "dryRun": true,
  "callSessionId": "call_1782927075636_f9621f6e",
  "status": "queued_dry_run",
  "twilioConfigured": false,
  "openaiConfigured": true,
  "pocketBaseSync": "skipped"
}
```

## Interpretation

- Product endpoint works locally.
- OpenAI key is configured.
- Twilio is not configured locally, so the call cannot ring yet.
- PocketBase sync is disabled for this local test.

## Required To Make The Phone Ring

Configure these variables before retrying a real call:

```env
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
VOICE_AGENT_PUBLIC_URL=
TWILIO_WEBHOOK_BASE_URL=
```

`VOICE_AGENT_PUBLIC_URL` / `TWILIO_WEBHOOK_BASE_URL` must be a public HTTPS URL that Twilio can reach, such as the deployed voice service or a temporary tunnel for local testing.

## Retest Command Shape

When Twilio is configured, call:

```http
POST /api/citalink/voice/calls
{
  "to": "+34668579365",
  "contactName": "Patrick",
  "objective": "Probar el producto CitaLink y validar el guion de auditoria de fuga de citas en una llamada real.",
  "legalBasis": "inbound_request",
  "dryRun": false
}
```

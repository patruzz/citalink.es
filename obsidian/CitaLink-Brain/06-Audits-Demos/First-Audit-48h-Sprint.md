# First Audit 48h Sprint

Objective: book one 15-minute appointment leakage audit. Do not sell CitaLink yet.

## Priority Accounts

1. [[Microaudits/Perez-Belmonte-Microaudit]]
2. [[Microaudits/AHOA-Microaudit]]
3. [[Microaudits/Pardinas-Microaudit]]

## Rule Of Engagement

- Start by phone central where possible.
- Ask for the person responsible for reception, operations, or first-visit conversion.
- Use email or corporate form only after confirming it is an appropriate business channel.
- Do not use cold WhatsApp.
- Do not ask for patient data, recordings, screenshots, CRM exports, calendars, or clinical details.
- Log every touch in [[../03-Lead-Machine/Outreach-Batch-2026-07-01]].

## 48h Sequence

### Hour 0-2: Prep

- Recheck official website and public contact channel.
- Open the account microaudit.
- Choose the one public observation that makes the outreach specific.
- Keep the ask simple: 15-minute audit, five operational leakage points.

### Hour 2-6: First Phone Attempt

Call the phone central.

Script:

> Hola, soy Patrick de CitaLink. Con quien podria hablar sobre recepcion, operaciones o gestion de primeras visitas?
>
> El motivo es concreto: estamos ayudando a clinicas dentales a detectar citas que se pierden entre llamadas, WhatsApp, formularios y seguimiento manual. No llamo para pedir datos de pacientes ni acceso a nada.
>
> He visto vuestra clinica y me parece que puede haber margen en el tramo solicitud -> cita confirmada, especialmente cuando entran primeras valoraciones por varios canales.
>
> Lo que propongo es una mini auditoria de 15 minutos: revisamos a alto nivel como entra una solicitud, como se responde, como se confirma y donde suele quedarse gente sin seguimiento. Despues os devuelvo 5 puntos concretos de mejora.
>
> Tiene sentido agendarlo esta semana con la persona que lleva recepcion o primeras visitas?

If they ask price:

> Nada para esta primera auditoria. Si vemos margen real, ya os diria que piloto tendria sentido.

If reception filters:

> Perfecto. Puedo enviarle un diagnostico breve de 5 puntos a la persona adecuada? Si no encaja, no vuelvo a insistir.

### Hour 6-24: Manual Written Follow-Up If Appropriate

Send a message only if:

- Reception provided the email/contact.
- The website has a general corporate form.
- The email is generic or clearly business-facing.

Do not send if:

- The only option is WhatsApp.
- The only form is for patients, appointments, emergencies, or clinical questions.
- The clinic said no.

### Hour 24-48: Second Phone Attempt

Use phone only. Do not send a second written follow-up yet.

Script:

> Hola, soy Patrick de CitaLink. Ayer intente localizar a la persona que coordina recepcion o primeras visitas. Solo queria confirmar si tiene sentido enviarle un diagnostico breve sobre el flujo solicitud -> cita confirmada. Si no procede, lo dejo anotado y no vuelvo a insistir.

## Outcomes

### If They Say Yes

- Offer two concrete slots.
- Book 15 minutes.
- Prepare five hypotheses from the matching microaudit.
- Ask only for process-level and aggregate metrics.

Response:

> Perfecto, lo preparo. Te encaja manana a las 10:30 o a las 12:00?

### If They Say Not Now

Response:

> Entendido. Tiene sentido que lo retome en 4-6 semanas?

Then:

- If they give a time window, record it.
- If not, close for at least 30 days.

### If They Say No Interest

Response:

> Gracias, lo dejo anotado y no vuelvo a contactar.

Then:

- Mark DNC.
- Do not follow up.

## Obsidian Logging

In [[../03-Lead-Machine/Outreach-Batch-2026-07-01]], add one row per touch:

```md
| 2026-07-01 | Clinica Dental Perez Belmonte | Phone central | Patrick | Connected - asked for ops contact | Send audit email if permitted | No |
```

In the account note, add:

```md
## Activity

- 2026-07-01 10:15 - Phone - Hable con recepcion. Piden enviar email a direccion. Next: enviar microdiagnostico antes de las 12:00.
```

Status values:

- contacted
- permission_to_send
- audit_requested
- audit_booked
- not_now
- closed_lost
- dnc

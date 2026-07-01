# External AI Context Pack

```yaml
profile: citalink-first-customer
project: citalink
mission: book-first-15-minute-audit
role: strategist
safe_context_level: confidential-review-required
status: review_required_before_external_use
provider_key: kimi
provider: Kimi / Moonshot
model: kimi-k2.6
base_url: https://api.moonshot.ai/v1
api_key_env: MOONSHOT_API_KEY
docs: https://platform.kimi.ai/docs/guide/start-using-kimi-api
```

## Review Gate

This pack is generated for human review before any external AI use. Remove anything that should not leave the local workspace.

Do not send secrets, API keys, patient data, raw CRM exports, private phone numbers, or unrevised lead lists.

## Objective

Get one dental or aesthetic clinic to accept a 15-minute CitaLink appointment leakage audit.

## Current Next Action

Call Perez Belmonte, AHOA, and Clinica Pardinas, then log every touch in Obsidian.

## Expected Output

- A sharper 48-hour execution memo.
- Risks or weak assumptions in the outreach plan.
- Three concrete improvements to the audit-to-pilot conversion path.
- Obsidian-ready updates only, with no request for private data.

## External AI Prompt

You are an external AI collaborator. Use only the context below. Return structured Markdown with these sections: Answer, Assumptions, Risks, Suggested Obsidian Updates, Follow-Up Questions.

Do not ask for secrets or private data. Treat all market and account facts as unverified until a human checks them.

## Source Notes

### obsidian/CitaLink-Brain/00-Index.md

```md
# CitaLink Brain

This is the Obsidian-compatible project brain for CitaLink.

## North Star

Get the first CitaLink customer by selling a narrow appointment recovery pilot to an appointment-heavy business.

## Current Positioning

CitaLink recovers lost appointments for businesses that sell through booked meetings.

Use this wording before mentioning AI:

> Recuperamos citas que hoy se pierden entre llamadas, WhatsApp, formularios y seguimientos manuales.

## Core Maps

- [[00-System/Multi-Project-Brain-Architecture]]
- [[00-System/AI-Interoperability-Protocol]]
- [[00-System/Provider-Profiles]]
- [[00-System/Project-Registry]]
- [[01-Strategy/First-Customer-Plan]]
- [[02-Agents/Agent-Team]]
- [[02-ICP/ICP-Clinicas-Dentales]]
- [[02-ICP/ICP-Clinicas-Esteticas]]
- [[02-ICP/Pain-Signals]]
- [[03-Lead-Machine/Lead-Scoring]]
- [[03-Lead-Machine/Lead-Schema]]
- [[03-Lead-Machine/Lead-Gen-Bot-Adaptation]]
- [[03-Lead-Machine/Outreach-Playbook]]
- [[03-Lead-Machine/Compliance-Outreach-Guardrails]]
- [[03-Lead-Machine/Outreach-Batch-2026-07-01]]
- [[04-Pipeline/First-Client-Pipeline]]
- [[04-Pipeline/Real-Account-Batch-2026-07-01]]
- [[04-Pipeline/Lead-Shortlist]]
- [[06-Audits-Demos/Audit-Template]]
- [[06-Audits-Demos/Pilot-Proposal-Template]]
- [[06-Audits-Demos/First-Audit-48h-Sprint]]
- [[06-Audits-Demos/Microaudits/Perez-Belmonte-Microaudit]]
- [[06-Audits-Demos/Microaudits/AHOA-Microaudit]]
- [[06-Audits-Demos/Microaudits/Pardinas-Microaudit]]
- [[10-External-AI/Provider-Readme]]
- [[10-External-AI/External-AI-Handoff-Template]]
- [[05-Meetings/Agent-War-Room]]
- [[05-Meetings/2026-07-01-Agent-Council]]
- [[05-Meetings/2026-07-01-Real-Account-Review]]
- [[05-Meetings/2026-07-01-Outreach-Council]]

## Weekly Scoreboard

| Metric | Target |
| --- | ---: |
| New qualified accounts researched | 50 |
| Tier A accounts selected | 10 |
| Personalized outreach sent | 20 |
| Conversations started | 5 |
| Audits booked | 2 |
| Pilot proposed | 1 |

## Rules

- Sell the audit before selling the platform.
- Use clinic, dental, aesthetics, real estate, and professional-service language instead of generic SaaS language.
- Measure leakage: response time, missed calls, abandoned forms, no-shows, reprogramming.
- Keep the first pilot painfully narrow.
- Write every real customer learning back into this vault.
- Share only reviewed context packs with external AIs.
```

### obsidian/CitaLink-Brain/00-System/AI-Interoperability-Protocol.md

```md
# AI Interoperability Protocol

Use this protocol when another AI needs to work with the brain.

## Principle

External AIs should receive a task-specific context pack, not raw vault access.

This protects strategy, leads, credentials, and personal data while still making the brain useful to Kimi, GLM, Claude, ChatGPT, local models, or future agents.

## Standard Handoff Packet

Every packet should include:

1. Project summary.
2. Current objective.
3. Current next action.
4. Relevant source notes.
5. Constraints and guardrails.
6. Expected output format.
7. Forbidden actions.
8. Return path: where the answer should be saved in Obsidian.

## External AI Roles

| Role | Best use | Output |
| --- | --- | --- |
| strategist | Positioning, tradeoffs, market angle | Decision memo |
| critic | Find weak assumptions and risks | Risk list |
| researcher | Summarize public sources | Research note |
| copywriter | Draft outbound, landing copy, scripts | Copy variants |
| product_architect | Convert pain into workflows | Workflow spec |
| code_reviewer | Review implementation details | Findings |

## Handoff Rules

- Never send API keys, `.env`, credentials, raw customer data, patient data, or private contact data.
- Never send full lead lists unless explicitly approved.
- Prefer summaries and selected excerpts over entire directories.
- Ask for structured output that can be pasted back into Obsidian.
- Mark every AI-generated answer as unverified until reviewed by a human or Codex.

## Output Contract

Ask external AIs to return:

```md
# External AI Response

provider:
model:
role:
project:
mission:
date:

## Answer

## Assumptions

## Risks

## Suggested Obsidian Updates

## Follow-Up Questions
```

## Inbox/Outbox Workflow

1. Put generated context packs in `10-External-AI/Context-Packs/`.
2. Put prompts sent to other AIs in `10-External-AI/Outbox/`.
3. Put responses from other AIs in `10-External-AI/Inbox/`.
4. Summarize accepted decisions into the relevant project notes.
5. Keep rejected or stale suggestions in the inbox with a note explaining why.

## Provider Independence

The brain should not depend on one model provider. Provider-specific details live in [[Provider-Profiles]].

The durable interface is the handoff packet, not the API vendor.
```

### obsidian/CitaLink-Brain/00-System/Provider-Profiles.md

```md
# Provider Profiles

This note tracks how external AIs can receive context from the brain.

Do not store API keys in Obsidian. Use environment variables or the provider dashboard.

## Kimi / Moonshot

- Provider: Moonshot AI / Kimi.
- API style: OpenAI-compatible chat completions.
- Base URL: `https://api.moonshot.ai/v1`.
- Typical environment variable: `MOONSHOT_API_KEY`.
- Example model from docs: `kimi-k2.6`.
- Best brain use: long-context critique, coding review, Chinese/English research, alternative strategy.
- Official quickstart: https://platform.kimi.ai/docs/guide/start-using-kimi-api

Node client shape:

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: "https://api.moonshot.ai/v1",
});
```

## GLM / Z.AI

- Provider: Z.AI / GLM.
- API style: OpenAI-compatible chat completions plus native Z.AI APIs.
- Base URL: `https://api.z.ai/api/paas/v4/`.
- Typical environment variable: `ZAI_API_KEY`.
- Example model from docs: `glm-5.2`.
- Best brain use: coding tasks, structured reasoning, research critique, alternative product workflow.
- Official API introduction: https://docs.z.ai/api-reference/introduction

Node client shape:

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.ZAI_API_KEY,
  baseURL: "https://api.z.ai/api/paas/v4/",
});
```

## Generic OpenAI-Compatible Provider

Use this profile for providers that expose OpenAI-compatible chat completions.

Required fields:

- `baseURL`
- `apiKeyEnv`
- `model`
- `contextPolicy`
- `allowedProjects`

## Provider Decision Rule

Use Kimi when:

- Long context matters.
- You want a second strategic/coding opinion.
- The prompt can be shared as an internal or public context pack.

Use GLM when:

- You want coding, structured reasoning, or an alternative agentic workflow view.
- The prompt can be shared as an internal or public context pack.

Do not use either provider when:

- The context contains secrets, patient/customer personal data, private lead lists, or unreviewed confidential strategy.
```

### obsidian/CitaLink-Brain/01-Strategy/First-Customer-Plan.md

```md
# First Customer Plan

## ICP Wedge

Start with dental, aesthetics, private clinics, and wellness businesses in Spain that:

- Depend on booked consultations or valuations.
- Receive requests by phone, WhatsApp, Instagram, web forms, or email.
- Advertise actively, which makes missed response expensive.
- Have visible appointment CTAs on the website.
- Have more than one professional or location, but are still owner-led enough to decide quickly.

## Pilot Offer

Name:

> Auditoria + piloto de recuperacion de citas en 30 dias

Promise:

> Detectamos donde se pierden consultas, automatizamos un flujo concreto y medimos citas recuperadas sin cambiar tu CRM ni tu agenda principal.

Scope:

- One lead source.
- One calendar or booking workflow.
- One message sequence.
- One human approval queue.
- One dashboard of response time, booked appointments, and recovered opportunities.

Price hypothesis:

- Setup: 299-499 EUR for early adopters.
- Monthly pilot: 149-249 EUR.
- Success expansion after proof: Growth plan.

## 7 Day Sprint

### Day 1

- Build a list of 50 target accounts.
- Score them with [[../03-Lead-Machine/Lead-Scoring]].
- Pick 10 Tier A accounts.

### Day 2

- Research each Tier A account manually.
- Capture channels, appointment CTAs, likely leakage, and decision maker.
- Create account notes in [[../04-Pipeline/First-Client-Pipeline]].

### Day 3

- Send 10 highly personalized messages.
- Use the "leakage observation" opening, not generic AI claims.

### Day 4

- Follow up with a useful diagnostic angle.
- Offer a 15-minute appointment leakage audit.

### Day 5

- Run audit calls.
- Ask for numbers: monthly requests, missed calls, response SLA, no-shows, average appointment value.

### Day 6

- Send one-page pilot proposal to the strongest account.
- Include workflow, timeline, price, and success metrics.

### Day 7

- Close pilot start date or learn the blocker.
- Update objections and improve the outreach playbook.

## First Pilot Success Metrics

- First response under 60 seconds for the selected channel.
- At least 10 qualified conversations captured.
- At least 3 booked or recovered appointments.
- Every opt-out or "not interested" captured.
- One testimonial quote or measurable case note.
```

### obsidian/CitaLink-Brain/03-Lead-Machine/Compliance-Outreach-Guardrails.md

```md
# Compliance Outreach Guardrails

Use this note before any real outreach. It is a practical checklist, not legal advice.

## Principle

CitaLink outreach must be manual, B2B, minimal, and reversible.

The first touch should request permission to send or discuss a brief operational diagnosis. It should not feel like a mass commercial campaign.

## Approved First-Touch Channels

| Channel | Risk | Use |
| --- | --- | --- |
| Phone central | Lower | Ask for the right operations/reception contact and permission to send a short diagnosis. |
| Corporate form | Medium | Use only if it is a general business contact form. Do not use patient, appointment, emergency, or clinical forms. |
| Generic corporate email | Medium/high | Use only when public, manual, individualized, and with opt-out. |
| WhatsApp | High | Do not use cold. Use only after opt-in or if the clinic replies there. |

## First-Touch Permission Script

Hola, soy Patrick de CitaLink. Estamos ayudando a clinicas a detectar citas que se pierden por llamadas no atendidas, WhatsApp, formularios o seguimiento manual.

He visto vuestra clinica y creo que podria haber margen operativo. Tiene sentido que os envie un diagnostico breve de 5 puntos? Si no procede, no vuelvo a contactar.

## Data Not To Request Before Consent

- Patient names, phone numbers, emails, photos, histories, treatments, prescriptions, budgets, recordings, chats, screenshots, CRM exports, calendars, or WhatsApp Business access.
- Any health data, clinical detail, pathology, diagnosis, or appointment-level record.
- Any personal data from patients or staff that is not necessary for a first business conversation.

## Data That Can Be Discussed In An Audit

- Approximate monthly appointment requests.
- Approximate missed calls or unanswered inquiries.
- Reception hours and current channels.
- How appointments are confirmed or rescheduled.
- Approximate no-show rate.
- Approximate value of an attended appointment, without patient-level data.

## Opt-Out Language

Email:

> Si no eres la persona adecuada o prefieres que no vuelva a contactar, responde con "baja" y lo elimino.

Form:

> Si no procede, ignorad este mensaje y no volvere a insistir por este canal.

WhatsApp, only after opt-in:

> Responde STOP y no volveremos a escribirte por WhatsApp.

## Automation Limits

- No scraping masivo.
- No automated cold multichannel sequences.
- No cold WhatsApp.
- No AI-sent messages without human review.
- Maximum prudent sequence: one manual first touch plus one manual follow-up after 5-7 days.
- Keep a do-not-contact list.

## Sources To Recheck

- LOPDGDD art. 19: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- LSSI art. 21: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- RGPD arts. 6, 9, 14 and 21: https://www.boe.es/doue/2016/119/L00001-00088.pdf
- WhatsApp Business Policy: https://business.whatsapp.com/policy
```

### obsidian/CitaLink-Brain/03-Lead-Machine/Outreach-Batch-2026-07-01.md

```md
# Outreach Batch - 2026-07-01

This is the first manual outreach pack for the real-account batch.

## Rule Of Engagement

- Send manually.
- Prefer phone central or corporate form before email.
- Do not use WhatsApp cold.
- Send only one follow-up after 5-7 days.
- Stop immediately on any negative reply or opt-out.
- Offer an audit, not an automated deployment.

## Execution Plan

Use [[../06-Audits-Demos/First-Audit-48h-Sprint]] for the first 48 hours.

Before contacting the first three accounts, open their microaudits:

1. [[../06-Audits-Demos/Microaudits/Perez-Belmonte-Microaudit]]
2. [[../06-Audits-Demos/Microaudits/AHOA-Microaudit]]
3. [[../06-Audits-Demos/Microaudits/Pardinas-Microaudit]]

## Global Phone Opener

Hola, soy Patrick de CitaLink. Estamos ayudando a clinicas a detectar citas que se pierden entre llamadas, WhatsApp, formularios y seguimiento manual.

He visto vuestra clinica y queria preguntar quien lleva operaciones, recepcion o conversion de citas. Tiene sentido que le envie un diagnostico breve de 5 puntos? Si no procede, no vuelvo a insistir.

## Account Messages

### Clinica Dental Perez Belmonte

- Account note: [[../04-Pipeline/Accounts/Clinica Dental Perez Belmonte]]
- Microaudit: [[../06-Audits-Demos/Microaudits/Perez-Belmonte-Microaudit]]
- Preferred channel: phone central or corporate form. Email only if it is clearly corporate.
- Subject: Primera valoracion gratuita sin fugas de agenda
- Opening: He visto que ofreceis primera valoracion gratuita y que las citas os entran por telefono, WhatsApp y formulario.
- Pain angle: Mucho interes inicial, varios canales y riesgo de que primeras valoraciones se enfrien antes de confirmar hueco.

First touch:

> Hola equipo de Perez Belmonte,
>
> he visto que ofreceis primera valoracion gratuita y que las citas os entran por telefono, WhatsApp y formulario.
>
> En clinicas con ese volumen de primera intencion suele haber una fuga silenciosa: personas con interes real que tardan en recibir respuesta, no terminan de elegir hueco o quedan sin seguimiento.
>
> Estoy montando CitaLink para ayudar a recuperar ese tramo: respuesta rapida, cualificacion, propuesta de cita y recordatorios, con revision humana.
>
> Tiene sentido que os envie un diagnostico breve de 5 puntos sobre el flujo solicitud -> cita confirmada?
>
> Si no eres la persona adecuada o prefieres que no vuelva a contactar, responde con "baja" y lo elimino.

Follow-up after 5-7 days:

> Hola, lo retomo solo una vez por si tiene sentido revisar 3 puntos rapidos del flujo primera valoracion -> cita confirmada.
>
> Si ahora no procede, no vuelvo a insistir.

### Clinica Dental AHOA

- Account note: [[../04-Pipeline/Accounts/Clinica Dental AHOA]]
- Microaudit: [[../06-Audits-Demos/Microaudits/AHOA-Microaudit]]
- Preferred channel: phone central, corporate form, or generic corporate email.
- Subject: Recuperar primeras visitas de implantologia en AHOA
- Opening: He visto que trabajais primeras visitas, implantologia avanzada y varios canales de entrada: reserva online, telefono, email y WhatsApp.
- Pain angle: Los casos de implantes comparan varias clinicas; cualquier demora entre interes web y cita confirmada puede costar un caso de alto valor.

First touch:

> Hola equipo de AHOA,
>
> he visto que trabajais primeras visitas, implantologia avanzada y varios canales de entrada: reserva online, telefono, email y WhatsApp.
>
> En tratamientos de alto valor, la velocidad entre "pide tu primera visita" y cita confirmada suele marcar si el paciente sigue con vosotros o compara alternativas.
>
> CitaLink ayuda a responder rapido, cualificar la consulta, proponer siguiente paso y dejarlo registrado para recepcion.
>
> Os puedo enviar una auditoria breve del recorrido "Pide tu 1a visita" -> cita confirmada?
>
> Si no eres la persona adecuada o prefieres que no vuelva a contactar, responde con "baja" y lo elimino.

Follow-up after 5-7 days:

> Hola, cierro el hilo por mi parte. Solo queria saber si os encaja revisar si se pierden primeras visitas por velocidad de respuesta o seguimiento.
>
> Si no procede, no vuelvo a insistir.

### Clinica Pardinas

- Account note: [[../04-Pipeline/Accounts/Clinica Pardinas]]
- Microaudit: [[../06-Audits-Demos/Microaudits/Pardinas-Microaudit]]
- Preferred channel: phone central, corporate form, or generic corporate email.
- Subject: Consulta online, WhatsApp y cita presencial mejor conectados
- Opening: He visto que combinan consulta online, WhatsApp, cita presencial y mucho contenido educativo alrededor de tratamientos dentales.
- Pain angle: Tanta entrada de demanda crea un problema de clasificacion: quien solo pregunta, quien esta listo para cita y quien necesita seguimiento.

First touch:

> Hola equipo de Clinica Pardinas,
>
> he visto que combinan consulta online, WhatsApp, cita presencial y mucho contenido educativo alrededor de tratamientos dentales.
>
> Ese ecosistema es potente, pero tambien crea un reto: clasificar rapido quien solo pregunta, quien esta listo para cita y quien necesita seguimiento para no enfriarse.
>
> Estoy trabajando en CitaLink, un sistema para recuperar solicitudes que ya llegan por esos canales pero no siempre terminan en cita confirmada.
>
> Os preparo un mapa rapido de fuga entre consulta online, WhatsApp y agenda?
>
> Si no eres la persona adecuada o prefieres que no vuelva a contactar, responde con "baja" y lo elimino.

Follow-up after 5-7 days:

> Hola, escribo una ultima vez por si quereis detectar que solicitudes merecen seguimiento antes de que se enfrien.
>
> Si no procede, no vuelvo a insistir.

### Clinica Dra Garrigos

- Account note: [[../04-Pipeline/Accounts/Clinica Dra Garrigos]]
- Preferred channel: phone central or corporate form. Do not use WhatsApp cold.
- Subject: Mas valoraciones confirmadas desde WhatsApp
- Opening: He visto que vuestro "Pedir cita" empuja a WhatsApp y que trabajais tratamientos donde la primera valoracion pesa mucho.
- Pain angle: En estetica, muchas consultas llegan con dudas de precio, timing o tratamiento; si no se cualifican rapido, se enfrian.

First touch:

> Hola equipo de la Dra. Garrigos,
>
> he visto que vuestro "Pedir cita" empuja a WhatsApp y que trabajais tratamientos donde la primera valoracion pesa mucho.
>
> En estetica, muchas consultas llegan con dudas de precio, timing o tratamiento. Si no se cualifican rapido, se enfrian o quedan repartidas entre mensajes.
>
> CitaLink ayuda a ordenar ese primer tramo: respuesta rapida, preguntas de cualificacion, propuesta de siguiente paso y recordatorio, siempre con revision humana.
>
> Os puedo enviar un diagnostico breve para estimar que valoraciones podrian recuperarse desde el flujo web/WhatsApp?
>
> Si no eres la persona adecuada o prefieres que no vuelva a contactar, responde con "baja" y lo elimino.

Follow-up after 5-7 days:

> Hola, lo retomo una sola vez por si os interesa revisar el flujo web/WhatsApp -> valoracion sin anadir carga a recepcion.
>
> Si no procede, no vuelvo a insistir.

### Sculpture Clinic

- Account note: [[../04-Pipeline/Accounts/Sculpture Clinic]]
- Preferred channel: corporate email or general business form.
- Subject: Convertir mas consultas web/social en valoraciones
- Opening: He visto que recibis consultas por formulario y redes para tratamientos esteticos de alto valor.
- Pain angle: Los leads de formulario o social suelen necesitar respuesta rapida, cualificacion y siguiente paso claro para no perder intencion.

First touch:

> Hola equipo de Sculpture Clinic,
>
> he visto que recibis consultas por formulario y redes para tratamientos esteticos de alto valor.
>
> En ese tipo de flujo, la fuga suele estar entre "tengo interes" y "tengo una valoracion confirmada": respuesta, cualificacion, siguiente paso y seguimiento.
>
> Estoy trabajando en CitaLink para recuperar solicitudes que llegan por web o social y no terminan en cita por falta de respuesta rapida o trazabilidad.
>
> Os preparo una auditoria corta del flujo formulario/redes -> valoracion confirmada?
>
> Si no eres la persona adecuada o prefieres que no vuelva a contactar, responde con "baja" y lo elimino.

Follow-up after 5-7 days:

> Hola, cierro el hilo con una pregunta rapida: tiene sentido revisar donde se quedan paradas las solicitudes antes de llegar a agenda?
>
> Si no procede, no vuelvo a insistir.

### Clinica Dental Bayona

- Account note: [[../04-Pipeline/Accounts/Clinica Dental Bayona]]
- Preferred channel: phone central or generic corporate email.
- Subject: Dos sedes, WhatsApp y primeras visitas mejor coordinadas
- Opening: He visto que trabajais con dos sedes en Pamplona, WhatsApp y tratamientos como periodoncia, implantes y ortodoncia.
- Pain angle: Con varias sedes y canales, parte del esfuerzo esta en enrutar bien cada solicitud y evitar ida y vuelta manual.

First touch:

> Hola equipo de Clinica Bayona,
>
> he visto que trabajais con dos sedes en Pamplona, WhatsApp y tratamientos como periodoncia, implantes y ortodoncia.
>
> Con varias sedes y canales, una parte importante del trabajo es enrutar cada solicitud, entender el motivo de la visita y evitar ida y vuelta manual antes de confirmar cita.
>
> CitaLink puede ayudar a que cada solicitud quede clasificada, respondida y encaminada hacia agenda sin cargar mas a recepcion.
>
> Tiene sentido revisar en 15 minutos donde se pierden mas primeras visitas o reprogramaciones?
>
> Si no eres la persona adecuada o prefieres que no vuelva a contactar, responde con "baja" y lo elimino.

Follow-up after 5-7 days:

> Hola, lo retomo una ultima vez por si os encaja revisar como clasificar y encaminar solicitudes sin cargar mas a recepcion.
>
> Si no procede, no vuelvo a insistir.

## Send Log

Use this table after manual outreach.

| Date | Account | Channel | Contacted by | Outcome | Next action | DNC |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |
```

### obsidian/CitaLink-Brain/06-Audits-Demos/First-Audit-48h-Sprint.md

```md
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
```

### obsidian/CitaLink-Brain/06-Audits-Demos/Microaudits/Perez-Belmonte-Microaudit.md

```md
# Perez Belmonte Microaudit

Account: [[../../04-Pipeline/Accounts/Clinica Dental Perez Belmonte]]

Source to recheck before outreach: https://www.perezbelmonte.com/

## Public Observations

- The clinic promotes a free first valuation.
- The site presents appointment requests through phone, WhatsApp, and form.
- Services include high-intent dental areas such as implants, orthodontics, aesthetics, pediatric dentistry, and conscious sedation.
- The clinic appears to have broad opening hours, which can increase reception and follow-up complexity.

## Leakage Hypothesis

The free first valuation can create many requests with mixed intent. The likely leakage point is between "I am interested" and "I have a confirmed appointment": missed calls, WhatsApp requests without follow-up, forms answered late, or people who never choose a time.

## Audit Questions

1. How many first valuation requests arrive each week by phone, WhatsApp, and form?
2. Which channel usually waits longest for first response?
3. What happens when someone requests an appointment outside reception hours?
4. Is there one shared record that prevents duplicate handling across WhatsApp, calls, and forms?
5. How many requests remain pending response or pending time selection at the end of a typical week?

## Minimum Pilot Workflow

1. Review 20-30 recent requests using only channel, time, general reason, and status. Do not collect patient identifiers.
2. Classify each request as urgent, first valuation, high-value treatment, or information request.
3. Create a response and next-action rule for each category.
4. Add manual follow-up at 24h and 72h when a person has not confirmed.
5. Measure requests that become confirmed appointments.

## Success Metric

Increase confirmed first valuations from incoming requests.

Pilot target: recover 3-5 additional appointments in 30 days or reduce average first response time under 15 minutes during operating hours.

## Outreach Hook

> He visto que ofreceis primera valoracion gratuita y que las citas os entran por telefono, WhatsApp y formulario. Me gustaria enviaros un diagnostico breve de 5 puntos sobre donde se puede estar perdiendo gente entre solicitud y cita confirmada.
```

### obsidian/CitaLink-Brain/06-Audits-Demos/Microaudits/AHOA-Microaudit.md

```md
# AHOA Microaudit

Account: [[../../04-Pipeline/Accounts/Clinica Dental AHOA]]

Source to recheck before outreach: https://ahoa.es/

## Public Observations

- The clinic has a visible first-visit CTA.
- Public channels include online visit request, phone, email, contact form, and WhatsApp link.
- The positioning emphasizes implantology, aesthetics, orthodontics, and advanced dental work.
- First-visit demand is commercially meaningful because treatment planning happens after the initial evaluation.

## Leakage Hypothesis

Implantology and advanced dental cases are comparison-heavy. If a person requests a first visit online, calls, or writes and does not receive a clear next step quickly, they may book with another clinic before reaching evaluation.

## Audit Questions

1. What percentage of first-visit requests becomes a booked appointment?
2. How long do forms and emails usually wait before first response?
3. How are implantology requests prioritized against general questions?
4. What happens when someone receives a proposed time but does not answer?
5. Is there a specific follow-up for price, financing, duration, or treatment-plan questions?

## Minimum Pilot Workflow

1. Map the route from "Pide tu 1a visita" across web, phone, email, form, and WhatsApp.
2. Separate incoming requests by intent: implants, aesthetics, orthodontics, urgency, general information.
3. Define a priority rule for implantology and first-visit requests.
4. Prepare manual sequence: fast response, proposed slot, reminder, closure.
5. Review unbooked first-visit requests weekly and reactivate those still warm.

## Success Metric

Increase confirmed first visits, especially for implantology.

Pilot target: improve request -> confirmed appointment conversion by 10-15% in 30 days using aggregate counts only.

## Outreach Hook

> He visto que trabajais primeras visitas e implantologia avanzada con varios canales de entrada. Me gustaria enviaros una auditoria breve del recorrido "Pide tu 1a visita" -> cita confirmada.
```

### obsidian/CitaLink-Brain/06-Audits-Demos/Microaudits/Pardinas-Microaudit.md

```md
# Clinica Pardinas Microaudit

Account: [[../../04-Pipeline/Accounts/Clinica Pardinas]]

Source to recheck before outreach: https://clinicapardinas.com/es/

## Public Observations

- The clinic combines phone, email, WhatsApp, online consultation, and in-person appointment routes.
- The brand has strong educational demand through Dentalk and broad dental specialty coverage.
- Public channels likely attract varied intent: ready-to-book patients, people researching treatment options, and information requests.

## Leakage Hypothesis

The likely leakage point is classification and next action. Online consultation, WhatsApp, and in-person appointment routes can diverge unless every request receives a clear state: book appointment, send information, schedule follow-up, or close.

## Audit Questions

1. What is the internal difference between online consultation and in-person appointment?
2. Who decides when an online consultation should become a call or in-person appointment?
3. How many online consultations remain without a next step each week?
4. Are implants, orthodontics, aesthetics, and general questions routed differently?
5. Which channel creates the most requests that never reach the agenda?

## Minimum Pilot Workflow

1. Review the routes for online consultation, WhatsApp, phone, and in-person appointment.
2. Create operational tags: ready for appointment, needs orientation, second opinion, future follow-up.
3. Define when an online consultation should move to call or in-person appointment.
4. Add manual follow-up at 48h for requests without next step.
5. Review open consultations weekly and either reactivate or close them.

## Success Metric

Reduce open requests with no next action.

Pilot target: 90% of incoming consultations receive a clear state within 24h: appointment proposed, information sent, follow-up scheduled, or closed.

## Outreach Hook

> He visto que combinan consulta online, WhatsApp y cita presencial. Me gustaria enviaros un mapa rapido de fuga entre consulta online, WhatsApp y agenda.
```


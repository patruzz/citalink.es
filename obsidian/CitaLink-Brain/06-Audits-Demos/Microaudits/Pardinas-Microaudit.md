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

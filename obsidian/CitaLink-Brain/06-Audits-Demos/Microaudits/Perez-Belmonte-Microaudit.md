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

# Lead Scoring

This scoring model adapts the `patruzz/lead-gen-bot` pattern to CitaLink.

## Score Fields

| Field | Points | Evidence |
| --- | ---: | --- |
| Appointment-heavy business | 0-20 | Calls to book, consultations, visits, valuations |
| Visible inbound channels | 0-15 | Phone, WhatsApp, forms, Instagram, email |
| Response leakage risk | 0-20 | Multiple channels, no instant booking, out-of-hours demand |
| Value per appointment | 0-15 | High-ticket treatment, property visit, legal consult |
| Decision maker reachable | 0-10 | Owner, clinic director, sales manager visible |
| Speed to pilot | 0-10 | Simple workflow, one location, one calendar |
| Strategic logo value | 0-10 | Good vertical proof, testimonial potential |

Maximum: 100.

## Tiers

- Tier A: 80-100. Personal research and direct outreach.
- Tier B: 60-79. Use semi-personalized outreach.
- Tier C: 40-59. Keep for later nurture.
- Reject: below 40.

## Qualification Notes

Capture:

- Sector and niche.
- Website.
- Primary CTA.
- Channels.
- Suspected leakage.
- Best first workflow.
- Message angle.
- Next action.

## Compliance Guardrails

- Prefer inbound/public business contacts.
- Do not scrape private personal data.
- Respect opt-outs immediately.
- Avoid automated high-volume messaging before legal basis is clear.
- Keep human review for first messages.

# Lead-Gen-Bot Adaptation

Source inspiration: `patruzz/lead-gen-bot`.

## What We Keep

- Lead discovery as a repeatable batch process.
- Enrichment before outreach.
- Scoring before prioritization.
- CSV output for review, import, or handoff.
- Simple local script that can run without a complex backend.

## What Changes For CitaLink

The original demo generates generic B2B leads. CitaLink needs appointment-recovery leads.

So the scoring model changes from generic role/company fit to:

- Appointment-heavy business.
- Visible inbound channels.
- Response leakage risk.
- Value per attended appointment.
- Decision maker reachability.
- Speed to pilot.
- Strategic proof value.

## Current Local Tool

Run:

```powershell
node tools/citalink-first-client-leads.mjs
```

Outputs:

- `obsidian/CitaLink-Brain/03-Lead-Machine/first-client-leads.csv`
- `obsidian/CitaLink-Brain/04-Pipeline/Lead-Shortlist.md`

## Next Upgrade

Turn the script from segment scoring into real account scoring:

1. Create `obsidian/CitaLink-Brain/03-Lead-Machine/raw-accounts.csv`.
2. Add real clinic accounts with public business data.
3. Score each account using [[Lead-Scoring]].
4. Generate account notes from [[../04-Pipeline/Accounts/_Account-Template]].
5. Move Tier A accounts into daily outreach.

## Guardrail

The tool must not pretend synthetic leads are real prospects. Synthetic segment rows are for prioritization only. Real outreach requires manual account research and public business contact details.

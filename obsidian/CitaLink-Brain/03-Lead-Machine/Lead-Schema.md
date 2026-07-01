# Lead Schema

This schema is the CitaLink version of the `lead-gen-bot` CSV output.

## CSV Columns

```csv
account_id,company,sector,city,website,decision_maker,email,phone,linkedin,instagram,lead_source,appointment_type,channels,fit_score,pain_score,reachability_score,timing_score,strategic_score,total_score,tier,status,next_action,last_touch,notes
```

## Status Values

- raw
- enriched
- scored
- qualified_A
- qualified_B
- contacted_1
- contacted_2
- replied
- audit_booked
- audit_done
- demo_booked
- pilot_proposed
- pilot_won
- pilot_lost
- do_not_contact

## Required For Tier A

- Website or public profile.
- At least one public business contact channel.
- Appointment-heavy service.
- Leakage hypothesis.
- Message angle.
- Next action.

## Obsidian Account Note

Every Tier A account should receive its own note in `04-Pipeline/Accounts/`.

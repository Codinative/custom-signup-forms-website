---
name: time-log
description: How to record phase and sub-phase timings for the website rebuild in docs/TIME-LOG.md (global phases Development → Testing → Deployment and their sub-phases, plus per-agent durations). Use at every phase or sub-phase start and end, and when summarising where time went.
---

# Time log

- File: `docs/TIME-LOG.md`. Times are PKT from `date "+%H:%M"`. Never estimate a timestamp after the fact.
- At a sub-phase start, add the row with its Start time. At its end, fill in End, Duration (wall-clock) and Notes.
- Parallel agents: record the wall-clock of the whole batch, and in the per-agent table each agent's own duration (from its task notification, `duration_ms`). Agent-minutes ÷ wall-minutes = the parallel speed-up.
- Notes must say what took longer than estimated and why (waiting on a user answer, a design ambiguity, a rebuild loop, a tooling failure). This is what the user reviews to change strategy.
- Waiting on the user is its own row type ("⏸ waiting for user"). It is excluded from active time but shown in the total.
- When a global phase ends, update the Summary table: estimate vs actual, and the variance.

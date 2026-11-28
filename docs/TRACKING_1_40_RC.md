# Fase Tracking 1.40 RC — no publication yet

Original engine remains default; general and nominal-role calibrated modes are opt-in. Support refinement remains explicitly experimental. Collective coordination disabled. All neural/prediction diagnostics are read-only.

## 1.39 expanded audit
Three new seeds, five modes, 30 simulated seconds per run, 450 simulated seconds in total. All runs finite, rollback passed, no shadow errors. Kinematic/space indices (lower better):
- original: 1.6177 / 0.0958; 80 passes; 1 shots; 0 support changes; 0 coordination opportunities.
- global: 0.5760 / 0.0681; 69 passes; 0 shots; 0 support changes; 0 coordination opportunities.
- roles: 0.5828 / 0.0605; 60 passes; 0 shots; 0 support changes; 0 coordination opportunities.
- support: 0.5838 / 0.0634; 68 passes; 0 shots; 7 support changes; 0 coordination opportunities.
- coord: 0.5828 / 0.0605; 60 passes; 0 shots; 0 support changes; 0 coordination opportunities.
These are unpaired exploratory simulations against training quantiles; not scientific validation. The calibrated modes generated zero shots during this sample. The role mode is spatially closer but slightly worse in kinematics than general mode. No active tactical predictor is warranted yet.

## 1.40 RC
UI clearly marks experimental modes. Deterministic baseline parity: 4 scenarios, 52 checkpoints, original vs RC (observer off/on); passed. Browser smoke script and CI workflow added; browser results pending at creation. Chromium desktop and mobile viewport do not represent physical iOS Safari performance. Do not merge until browser tests pass and tactical event production has been evaluated in longer matched scenarios. No independent DFL/expert validation yet.

## Next gates
1. Browser smoke and real device check.
2. Longer and scenario-conditioned shots, possession and transitions; investigate insufficient shooting.
3. Ball forecast, interception, recipient and pitch control stay in observation until phase-specific evidence permits bounded tactical influence.

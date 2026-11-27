# Fase Tracking × Fase Manager — 1.36 experimental

Base: Fase Manager 0.148, blob 474c0f28d14d19d6bcf9b26b287142b0543fe769. Branch only; main unchanged.

## Use
Open index.html in this branch with a browser/server serving the repository files. Open the Fase Tracking panel. The default engine is unchanged. **Iniciar prueba libre calibrada** resets the current situation, enters free mode, and caps simulated movement/arrival calculations using experimental profiles (8.5 m/s, 4 m/s² acceleration, 5 m/s² braking, converted conservatively using the larger axis scale). **Prueba calibrada + apoyos** additionally tests a lateral adjustment of up to 1.5 internal units to already assigned supports, subject to perceived risk, spacing and geometry constraints. This option is experimental and not recommended as a default. **Volver al motor original**, restart, or guided mode restore the original profiles. The Ridge and ball predictor remain observational, never used to force player actions. No data sent by the observer.

## Evidence
Calibration reference: quantiles from 4 DFL training matches; all 7 processed locally. Three 12s seeded scenarios selected a candidate; three different 15s scenarios assessed it. A log-ratio discrepancy of 16 quantiles (speed, acceleration, speed gain, braking) was 1.567 original versus 0.573 calibrated. Spatial discrepancy (width/depth by possession and distance to ball) worsened from 0.0697 to 0.0973. The optional support test made 3 adjustments, not enough to validate tactical utility. All labels are geometric proxies; no expert ground truth. The comparison is with simulated ground-control states, not matched game situations. No causal or scientific claims.

## Reproduce
- node tests/tracking-shadow.mjs (requires git history containing original blob)
- node tests/tracking-calibration.mjs (requires shadow blob)
- node tests/tracking-hybrid.mjs
Tests run the game's JavaScript with a mocked DOM and seeded randomness; no real browser or mobile performance certification.

## Remaining gates
Real browser smoke and performance; longer fixtures, possessions/score states/roles; match-independent DFL and expert validation. Phase-space diagnostic contrasts existing functional labels with radial proxy, does not replace functional model. General off-ball movement, neural control, and active ball/interception policy remain pending. Do not merge into main or enable default until evidence and manual testing are sufficient.

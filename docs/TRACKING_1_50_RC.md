# Fase Tracking 1.50 RC — experimental candidate, not stable release

Main remains at 0.148. Branch tracking-hybrid-1-40-rc contains 1.50 RC. Original motor is default. The general and nominal-role locomotion calibrations remain optional; prior lateral support experiment also optional. The 1.37 coordination, 1.44 spatial steering, 1.45 receiver arbitration and 1.46 progression/shot experiments remain locked in the interface.

## 1.46–1.50
- 1.46: eight synthetic checks, 9 seeded 20s runs (180s). No actual candidate carry triggered and no shot window; no active release. 47 passes per configuration, 7 turnovers, 139 decisions, 21 final-third decisions, one box decision. The off-ball attack remains a separate open problem.
- 1.47: phase-space transition diagnostic, 227 frames, 4,994 player observations. 73 complementary pairs out of 212 pair frames, 9 crowded. Existing functional labels, not expert truth. No new coordination steering.
- 1.48: 37 real sequences, 925 frames across seven previously inspected DFL matches; compare only radial bins and transition rates. Test exploratory 7 clips/175 frames. Real 5.82/25.51/68.68%, simulated 7.77/30.58/61.65%. Radial change rate 2.06% vs 2.00% (different context/ball-state selection); not proof of functional equivalence.
- 1.49: local export of best validation neural variant from 1.23 (no_possession_s42). 140 windows, 2685 predictions; max JS/PyTorch discrepancy 2.561e-6 m. Held-out exploratory error 0.5659m vs Ridge 0.5382m. Load provided modelo_neuronal_1_49.json from the local package in the Tracking panel, then enable observer. Weights not bundled in public repository. No data transmitted, no player orders. Integrated zero-weight fixture 132 comparisons, zero difference vs constant velocity, no observer errors. Trained-weight runtime performance and model utility in game not established.
- 1.50: 4 deterministic original-vs-candidate scenarios, 52 checkpoints, exact parity observer on/off. New Chromium smoke test with file import and unload. CI status pending when candidate prepared.

## Release gates
No merge into main. New browser run required, including mobile viewport (not physical iOS). Need long scenario-conditioned attack trials, matched real sequences and independent matches, expert labels from 1.24, and evidence that any active predictor improves decisions without degrading collective shape. Do not describe the neural architecture as full ST-GNN; it is fixed graph aggregation + temporal MLP. Do not use learned global tracking features to give players omniscient access. F11 only. 

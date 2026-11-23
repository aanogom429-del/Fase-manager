# Verificación causal de selección de pase · 0.149 · 23/11/2026

## Problema observado
La bonificación táctica +2 de la versión candidata 0.149 supera pruebas unitarias y regresiones, pero no modificó las 8 secuencias autónomas de comparación respecto de 0.148. Antes de promoverla a `main`, debe demostrarse que puede cambiar una **decisión efectiva** sin forzar un pase inseguro.

## Ensayo incorporado
`tests/mid_choice_ablation.cjs` compara 160 situaciones emparejadas (2 equipos × 2 pivotes × 5 diferencias longitudinales de un receptor alternativo × 2 alturas laterales × 4 semillas). En cada situación se evalúa el mismo motor 0.149 con bonificación +2 y bonificación neutralizada 0, conservando la misma semilla y geometría. Se instrumenta `kickTo` para observar intención seleccionada, no solo el resultado de `midfielderPassPreference`.

Se emplean situaciones artificiales de competencia entre el mediapunta y otro receptor, con oposición alejada; **no es validación de partido** ni de eficacia de la recepción. El ensayo registra cambios totales, cambios a favor y en contra del mediapunta y eventos sin acción detectada, sin imponer a priori una victoria de la regla.

El workflow de `.github/workflows/mid-pass-0149.yml` incluye la ablación en CI, mantiene las regresiones y el contraste autónomo con 0.148, y exporta resultados JSON. Si la comparación da cero diferencias, no se declara impacto demostrado ni se aumenta arbitrariamente la bonificación. Si existen diferencias, el paso siguiente será contrastar si las nuevas intenciones se convierten en pases ejecutados y recepciones, y si empeoran la elección de alternativas.

## Estado
Actualización de **instrumentación** de la candidata 0.149 en PR #3; no modifica `index.html`, no autoriza fusionar `main`, no cierra MP3/MP11.

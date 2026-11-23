# Resultado ejecutado y verificado · 23/11/2026

GitHub Actions **45110210742**: `success`; prueba `mid_choice_ablation.cjs` y cinco regresiones, junto al contraste autónomo con 0.148, superadas. El test compara **160 pares de decisiones**, sin modificar aleatoriedad, orientación inicial ni geometría entre los dos brazos del par; el único factor intervenido es el bonus +2.

| Indicador de elección inmediata | Recuento |
|---|---:|
| Pares evaluados | 160 |
| Pares con acción/destinatario distinto | **44** |
| Cambios hacia el mediapunta | **44** |
| Cambios desde el mediapunta a otra acción | **0** |
| Decisiones sin acción instrumentada | 0 |

En los 44 casos alterados, la variante sin bonus seleccionaba otro receptor; la variante con bonus seleccionó al mediapunta. El resultado demuestra **impacto causal en la selección de intención de pase** dentro de los escenarios artificiales; **NO** prueba recepción exitosa ni mayor rendimiento general. El ensayo emplea compañeros candidatos próximos a empate, rivales alejados, cuatro semillas y posiciones diseñadas. No confundir 44/160 con una frecuencia representativa de partido.

La batería autónoma anterior de ocho escenas sigue sin diferencias entre 0.148 y 0.149: sin apertura, 4 pases/recepciones en ambas; con apertura, 3 en ambas. Por tanto hay efecto en decisiones próximas al empate pero todavía **no se ha observado un beneficio colectivo** en las escenas autónomas disponibles.

**Próximo criterio**: seguir la ejecución física de los 44 cambios de intención (giro corporal, pase completado/interceptado, tiempo hasta receptor, pérdida y línea de progresión), con variantes de oposición cercana y alternativa libre, comparando con/sin bonus bajo condiciones iniciales equivalentes. Mantener 0.149 en PR #3 borrador hasta demostrar seguridad y utilidad en juego más amplio.

---

# Verificación causal de selección de pase · 0.149 · 23/11/2026

## Problema observado
La bonificación táctica +2 de la versión candidata 0.149 supera pruebas unitarias y regresiones, pero no modificó las 8 secuencias autónomas de comparación respecto de 0.148. Antes de promoverla a `main`, debe demostrarse que puede cambiar una **decisión efectiva** sin forzar un pase inseguro.

## Ensayo incorporado
`tests/mid_choice_ablation.cjs` compara 160 situaciones emparejadas (2 equipos × 2 pivotes × 5 diferencias longitudinales de un receptor alternativo × 2 alturas laterales × 4 semillas). En cada situación se evalúa el mismo motor 0.149 con bonificación +2 y bonificación neutralizada 0, conservando la misma semilla y geometría. Se instrumenta `kickTo` para observar intención seleccionada, no solo el resultado de `midfielderPassPreference`.

Se emplean situaciones artificiales de competencia entre el mediapunta y otro receptor, con oposición alejada; **no es validación de partido** ni de eficacia de la recepción. El ensayo registra cambios totales, cambios a favor y en contra del mediapunta y eventos sin acción detectada, sin imponer a priori una victoria de la regla.

El workflow de `.github/workflows/mid-pass-0149.yml` incluye la ablación en CI, mantiene las regresiones y el contraste autónomo con 0.148, y exporta resultados JSON. Si la comparación da cero diferencias, no se declara impacto demostrado ni se aumenta arbitrariamente la bonificación. Si existen diferencias, el paso siguiente será contrastar si las nuevas intenciones se convierten en pases ejecutados y recepciones, y si empeoran la elección de alternativas.

## Estado
Actualización de **instrumentación** de la candidata 0.149 en PR #3; no modifica `index.html`, no autoriza fusionar `main`, no cierra MP3/MP11.

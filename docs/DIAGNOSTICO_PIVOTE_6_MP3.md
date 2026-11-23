# MP3 — Diagnóstico de decisiones del pivote 6 (23/11/2026)

## Evidencia verificada
Repositorio `aanogom429-del/Fase-manager`. Base `main@14ed39d`, motor 0.148 inalterado. Rama de investigación `codex/fase-manager-mp3-temporal-audit`.
GitHub Actions run **45108837889**: trabajo `temporal-audit` terminado en **success**. Se ejecutaron `tests/mid_decision_diagnostic.cjs`, `mid_fixed_horizon.cjs`, comprobaciones de integridad del JSON y cinco regresiones dirigidas.

El diagnóstico **no interviene** en `chooseAction`: instrumenta por sustitución en la copia de prueba el momento en que el pivote llega a la rutina decisional; registra recepción del recuerdo sobre el mediapunta, riesgo percibido de línea y espacio. Se compara la misma semilla y geometría de partida con regla activa/inactiva.

## Resultado por escenario

| Equipo / pivote | Variante | Evaluaciones de decisión | Mediapunta percibido | Ventana viable observada* | Línea bloqueada | Espacio insuficiente | Pases dirigidos y recibidos |
|---|---|---:|---:|---:|---:|---:|---:|
| Azul / 5 | Sin regla | 16 | 16 | 0 | 11 | 12 | 1 |
| Azul / 5 | Con regla | 10 | 10 | 1 | 7 | 5 | 1 |
| **Azul / 6** | **Sin regla** | **11** | **11** | **2** | **5** | **5** | **1** |
| **Azul / 6** | **Con regla** | **10** | **10** | **2** | **5** | **4** | **0** |
| Rojo / 5 | Sin regla | 12 | 12 | 1 | 9 | 5 | 2 |
| Rojo / 5 | Con regla | 12 | 12 | 1 | 9 | 5 | 2 |
| Rojo / 6 | Sin regla | 15 | 15 | 0 | 15 | 9 | 0 |
| Rojo / 6 | Con regla | 15 | 15 | 0 | 15 | 9 | 0 |

*Viable en este **proxy** = mediapunta en memoria del pasador, línea con riesgo <=3, espacio >=5 y no fuera de juego; no certifica ángulo corporal, anticipación del pase, política de conservación ni ausencia de alternativas superiores. Los contadores de línea bloqueada y espacio insuficiente pueden coincidir en la misma evaluación.

## Diagnóstico contrastado
- En azul/pivote 6, **hay 2 evaluaciones de oportunidad proxy en las dos variantes**, y el mediapunta es percibido en todas las llamadas a `chooseAction`. Por tanto, el pase que desaparece **no puede atribuirse únicamente a que el pivote dejó de ver al mediapunta** ni a que el proxy nunca ofreció una salida. Es necesario revisar prioridades/competencia de pase, geometría y tiempo de llegada.
- La variante activa cambia la trayectoria y el estado colectivo; no es un experimento de un único factor instantáneo. Un pase menos no implica necesariamente un error de la política.
- La nueva regla genera **3 recepciones vs. 4** en esta muestra controlada. No se debe forzar un pase al mediapunta ni incrementar indiscriminadamente la persistencia.
- El proxy de oportunidad y la decisión real del poseedor son mediciones distintas; la muestra es demasiado pequeña para concluir mejora o perjuicio general.

## Próximo incremento funcional condicionado
Instrumentar en `chooseAction` **la posición relativa del mediapunta entre las alternativas de pase** (best/progress/safety) y la acción finalmente ejecutada, manteniendo la aleatoriedad y sin modificarla; separar pérdida por (a) selección de otra opción, (b) decisión de conducir, (c) espera/cambio de poseedor y (d) desajuste entre destino previsto y receptor observado. Si hay evidencia específica de pérdida evitable, ensayar una corrección de coordinación *preparación del receptor ↔ decisión del pasador* limitada a 4-2-3-1, con contracasos y evaluación de recepciones y conservación. No fusionar reglas experimentales sin evidencia.

MP3/MP11 siguen abiertos. `main` y la aplicación 0.148 no cambiaron.

# 0.149 — Comparación con oposición cercana · 23/11/2026

## Antecedentes
La prueba anterior de 32 pares distinguía intención, golpeo y primer contacto, pero mantenía a los rivales lejos de la acción. Se verificaron 16 cambios de receptor sin ninguna intervención rival, lo cual no evidencia mejora táctica.

## Nuevo incremento de evaluación
Se incorpora `tests/mid_pass_opposition_0149.cjs` y su etapa CI en `.github/workflows/mid-pass-0149.yml`. El ensayo compara la regla +2 con su ablación, manteniendo el mismo estado y semilla dentro de cada pareja. Hay 48 parejas (2 equipos × 2 pivotes × 2 diferencias longitudinales × 1 separación lateral × 2 semillas × 3 contextos de oposición), seguidas durante 2,5 s.

Los tres contextos son: defensor cerca del mediapunta (receiver), defensor cerca de la línea pivote–mediapunta (lane), y defensor próximo al receptor alternativo (alternative). Los demás rivales se separan para aislar mecanismos. La oposición sigue siendo reactiva durante la simulación, no una marca congelada. El ensayo registra la elección inicial, golpeo ejecutado, primer contacto con el pase, si ese contacto fue rival, y equipo poseedor al finalizar el horizonte.

## Limitaciones y criterio de decisión
Una geometría de entrenamiento simplificada **no representa** frecuencia de juego real; el defensor comienza colocado de forma artificial y la puntuación del pase no se considera calibrada científicamente. El primer contacto no equivale por sí mismo a control estable, y tener el balón al final de 2,5 s no acredita progresión o ventaja táctica. Un pase sin primer contacto no se cuenta automáticamente como pérdida. Los resultados de cada contexto y la variación con/sin preferencia se conservan separadamente.

La nueva batería es una **prueba de riesgo**, no una garantía de que +2 mejore la eficiencia. Si muestra más intercepciones o pérdida de posesión, habrá que diagnosticar los casos y valorar anulación contextual del bonus sin forzar pases. Si no muestra diferencias, ampliar variabilidad y calidad de oposición sin inventar éxitos.

No cambia `index.html`, no fusiona PR #3 y `main` continúa en 0.148. MP3 y MP11 permanecen abiertos.

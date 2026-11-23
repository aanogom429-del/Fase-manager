# Resultados de oposición cercana corregida · 23/11/2026

**Ejecución verificable**: GitHub Actions `45261378767`, trabajo `137996717943`, resultado **SUCCESS** (código con marcador de campo, no portero). La prueba de 48 pares, sus comprobaciones contables, cinco regresiones y la comparación 0.148/0.149 completaron sin fallos. No usar la ejecución anterior con portero desplazado como referencia deportiva.

| Contexto, 16 parejas cada uno | Cambios por bonus +2 | Pase al mediapunta sin/con bonus | Primer contacto del destinatario sin/con bonus | Primer contacto rival sin/con bonus | Sin primer contacto identificado sin/con bonus | Posesión del equipo al final sin/con bonus |
|---|---:|---:|---:|---:|---:|---:|
| Marcador cerca del mediapunta | 0 | 0 / 0 | 8 / 8 | 8 / 8 | 0 / 0 | 4 / 4 |
| Marcador sobre línea de pase | 0 | 0 / 0 | 0 / 0 | 8 / 8 | 8 / 8 | 4 / 4 |
| Marcador cerca de la alternativa | 0 | 16 / 16 | 16 / 16 | 0 / 0 | 0 / 0 | 7 / 7 |
| **Total** | **0 / 48** | **16 / 16** | **24 / 24** | **16 / 16** | **8 / 8** | **15 / 15** |

La última columna mide exclusivamente quién figura como poseedor al acabar el horizonte de 2,5 s; no identifica siempre el desenlace final de una jugada. Un primer contacto no significa conservar el balón; en línea bloqueada hubo ocho casos sin contacto identificado al terminar la ventana, **no ocho pérdidas confirmadas**.

**Diagnóstico**: en estos tres escenarios con rival de campo cerca, la preferencia 0.149 **no cambió ninguna decisión respecto a su ablación**. Parece quedar restringida por los filtros de riesgo, espacio y alternativas; por tanto no hay evidencia de empeoramiento causado por la bonificación en estas 48 parejas, pero **tampoco beneficio**. La oposición sí afecta a los desenlaces: se detectan 16 primeras intervenciones rivales por brazo entre las 48 escenas. Estos casos ayudan a controlar que la física no garantiza recepción al destinatario.

La ablación favorable de 160 casos con rivales alejados sigue mostrando 44 cambios hacia el mediapunta; el contraste autónomo 0.148–0.149 sigue con idénticas recepciones en las ocho escenas previas. Aún falta situar defensas intermedias en las que la preferencia cambie una decisión y el pase sea físicamente disputado, así como medir ventajas y consecuencias defensivas. **La actualización 0.149 permanece experimental**; no fusionar PR #3 automáticamente ni cerrar MP3/MP11.

---

## Corrección de fixture antes de aceptación

La primera edición del escenario seleccionaba equivocadamente el primer oponente activo, que podía ser el portero. **Se corrigió** en el commit `f8fb4af`: el defensor próximo debe ser un centrocampista rival de campo y la prueba exige explícitamente ese rol. Cualquier resultado de la ejecución anterior `45260999265` es exploratorio y **no puede utilizarse como validación** del comportamiento de campo. La verificación que cuenta es la ejecución asociada al commit corregido. Este hallazgo refuerza la auditoría de coherencia de roles y escenarios antes de atribuir eficacia deportiva.

---

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

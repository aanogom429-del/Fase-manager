# Resultados de ejecución verificados · 23/11/2026

GitHub Actions **45238420236**, trabajo **137916215191**, terminó **SUCCESS**. El nuevo test `tests/mid_pass_outcome_0149.cjs` ejecutó **32 pares** con/sin bonificación +2, ambos equipos y pivotes, dos distancias relativas de la alternativa, dos amplitudes y dos semillas; se siguió físicamente hasta 2,5 segundos después de la intención. También pasaron la ablación de 160 pares, las regresiones y la comparación autónoma 0.148/0.149.

| Medida | Sin bonificación | Con bonificación |
|---|---:|---:|
| Pares con elección diferente (comunes) | 16/32 | 16/32 |
| Intenciones dirigidas al mediapunta (32) | 8 | 24 |
| Pases realmente liberados (32) | 32 | 32 |
| Primer contacto del receptor pretendido (32) | 32 | 32 |
| Primer contacto rival registrado (32) | 0 | 0 |
| Pases sin primer contacto identificado (32) | 0 | 0 |

Entre los **16 pares con destinatario cambiado**, la variante sin bonificación eligió otro receptor y la activada eligió al mediapunta. Los **16 pases se ejecutaron y el primer contacto correspondió al destinatario elegido** en ambos brazos.

**Límite determinante:** la oposición de este fixture está alejada de las conexiones. Por eso el 100 % de contactos **no demuestra mayor eficacia, seguridad en presión ni un aumento de la conservación colectiva**; se verifica que el cambio de decisión se materializa sin fallo técnico en estos contracasos simples. La prueba usa `capture` como primer contacto y no mide explícitamente si el balón permanece controlado varios segundos ni si la jugada mejora una ventaja.

En la comparación autónoma más compleja se mantienen exactamente los mismos recuentos entre 0.148 y 0.149 (4/3 recepciones sin/con apertura, respectivamente). Por tanto no procede declarar la nueva regla superior ni fusionarla automáticamente. **Siguiente prueba prioritaria:** variar rivales cercanos a trayectoria y destino, con oposición reactiva, y medir controles, intercepciones, continuidad y pérdidas a igualdad de contexto; comprobar los casos donde elegir al mediapunta desplaza otra salida posiblemente mejor.

---

# 0.149 — Resultado físico de las intenciones de pase (23/11/2026)

## Motivación
La regla contextual +2 de `midfielderPassPreference` cambia la elección inmediata en 44 de 160 escenarios controlados de casi empate, pero no alteró las ocho secuencias autónomas generales de la comparación inicial. Se necesita comprobar qué ocurre **después** de la elección.

## Nuevo incremento verificable
`tests/mid_pass_outcome_0149.cjs` instrumenta, sin cambiar el motor, los tres eventos diferenciados:
1. Primera intención de `kickTo` (puede requerir perfilación).
2. Primer golpeo real registrado por `releaseKick` (puede cancelarse).
3. Primer contacto `capture` con el pase identificado por origen y tiempo.

Compara 32 pares espejo: dos equipos, dos pivotes, dos diferencias de profundidad, dos separaciones laterales y dos semillas. Cada pareja conserva semilla y posiciones iniciales, neutralizando únicamente la bonificación +2. Se observa evolución física durante 2,5 segundos; se comprueba que las coordenadas permanezcan finitas. La prueba registra intención, ejecución, receptor, primera intervención rival y casos no resueltos. Los resultados se publican en el artefacto de CI.

**Límites**: son escenarios sintéticos controlados y rivales alejados, no una muestra de fútbol real. Un primer contacto es distinto de una recepción controlada que conserva la posesión; una intervención rival no es necesariamente una pérdida definitiva. No se validan aquí la utilidad posicional, el equilibrio tras pérdida ni las probabilidades de éxito en partidos completos.

La ejecución de CI es el criterio previo a aceptar el ensayo. No se modifica `index.html` ni se integra esta rama en `main`. MP3/MP11 siguen abiertos.

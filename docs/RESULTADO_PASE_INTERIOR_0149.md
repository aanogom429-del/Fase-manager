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

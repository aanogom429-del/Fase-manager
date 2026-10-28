# 0.91 — Selección por llegada y continuidad

Se ordenan candidatos con arrivalTime: demora de reacción, orientación, velocidad, aceleración y movimiento actual. Se conserva al sustituto vigente si su estimación no supera en más de 0,6 s la mejor alternativa. Margen heurístico no calibrado. Mantiene radio máximo 24, línea adyacente, exclusiones de apoyo/seguridad/órdenes y activación/retorno 0.90. No añade estado persistente ni información rival oculta.

PASS: line_arrival (casos espejo: más lejano pero más rápido, continuidad ante diferencia pequeña, sustitución ante ventaja clara, prioridades), line_chain, line_structure, line_collective y line_autonomous. Cinco entradas, no batería completa ni Safari real.

Comparación autónoma con 0.90, mismas ocho situaciones de 20 s: muestras con cobertura 906→948; observaciones jugador-paso de salida sin sustituto 2183→2162. No son huecos distintos ni porcentaje de éxito. Hay contracaso: 4-4-2 inicio rojo empeora 533→544 salidas sin sustituto; 3-5-2 inicio azul mejora 239→207. Las otras seis situaciones conservan esos contadores. Cambia también un tiro (4-4-2 rojo, 1→0), sin demostrar utilidad superior.

El incremento cambia una decisión concreta del motor, pero no resuelve la falta de candidatos ni garantiza menos espacio vacío. Falta medir llegada física/tiempo de hueco, exposición tras pérdida y alternativas de reserva con nuevos escenarios. Se mantienen los siete bloques abiertos de la auditoría.

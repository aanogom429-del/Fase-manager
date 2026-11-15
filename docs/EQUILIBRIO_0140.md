# 0.140 · Equilibrio a distinta profundidad de los apoyos

Los dos jugadores asignados al equilibrio dejan de buscar escalones tan próximos al poseedor. En iniciación/reorganización sus referencias pasan de 8/13 a 14/20 unidades por detrás; en estructura estable, de 12/18 a 18/24. Se conservan separación lateral, límites del campo y fuera de juego, demora individual, movimiento físico, dos puestos de apoyo y prioridad de órdenes dibujadas. Las distancias son parámetros de diseño, no estándares universales del fútbol. Cerca de la propia línea de fondo los límites reducen el espacio disponible.

## Contraste reproducible

Doce simulaciones por variante: 30 segundos cada una, poseedor inicial azul/rojo y semillas 73, 101, 211, 307, 509 y 617. Comparación con 0.139, incluyendo su giro y recepción nuevos. Se muestrea cada medio segundo solo cuando hay poseedor y no hay reanudación. Los denominadores varían con el desarrollo de cada simulación.

| Indicador | 0.139 | 0.140 |
|---|---:|---:|
| Muestras con poseedor | 488 | 510 |
| Más de tres compañeros a menos de 12 del dueño | 59 (12,1 %) | 50 (9,8 %) |
| Parejas a menos de 6, acumuladas | 791 | 701 |
| Parejas próximas por muestra | 1,62 | 1,37 |
| Muestras con anchura menor de 30 | 0 | 8 |
| Pases registrados | 376 | 365 |
| Cambios de posesión | 63 | 68 |

La mejora espacial es parcial. No mejora todos los casos: rojo/73 pasa de 0/42 a 9/47 muestras agrupadas. Las semillas adicionales 509/617, evaluadas después del diseño, reducen el agregado de 22/171 a 18/162 y las parejas de 274 a 204; rojo/617 empeora. No son una validación independiente ni partidos reales. Aumenta la frecuencia de bloque estrecho y ligeramente los cambios de posesión en el total; no se afirma una mejora general del rendimiento o de la conservación.

Datos completos: `data/equilibrium-spacing-140.json`. Reproducción: `SEEDS=73,101,211,307,509,617 node tests/equilibrium_spacing_audit.cjs index.html`. Para la base, usar el index.html del commit 1db7b7981554e6db2efd586daab49ea5904ab734. El ensayo no modifica el motor.

## Alternativa descartada

Se probó buscar desplazamientos longitudinales ±6 cuando toda la franja lateral seguía ocupada, preservando apoyos, órdenes, equilibrio y fuera de juego. La prueba controlada reducía solapamientos, pero las primeras cuatro simulaciones elevaron las muestras agrupadas de 8/158 a 23/167. En ocho, 37/317 a 48/319. No se integra. Parche reproducible en `docs/experiments/depth-search-rejected-140.patch`; resultados en el mismo JSON.

## Comprobaciones

Pasan 13 programas: balance_distance, structural_supports, crowded_shape, local_support_space, space_search, offball_arrow_lifecycle, continuity, formation_selection, attack_space, run_spacing, onside_recovery, null_support_focus y space_turning. El test structural_supports adapta la expectativa de profundidad al cambio intencionado. El nuevo test cubre ambos equipos y cuatro sistemas, equilibrio en iniciación y posesión estable, ausencia de teletransporte y prioridad de órdenes dibujadas.

No se ha repetido toda la batería histórica ni probado Safari/iPhone en esta versión. No se cierran los hitos A1–A7. Siguiente foco: evitar que ganar profundidad reduzca la amplitud de los jugadores alejados, y comprobar las salidas útiles tras recepción en el caso rojo/73.

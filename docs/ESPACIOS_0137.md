# 0.137: búsqueda de corredores libres

El reparto final solo examinaba el destino original y desplazamientos laterales de 6 y 12 unidades. Cuando todos esos corredores estaban ocupados, aceptaba solapamientos aunque hubiera espacio más lejos. Ahora también examina 18 y 24 unidades a ambos lados, con los mismos costes de distancia, oposición percibida y proximidad entre compañeros. Conserva profundidad, límites del campo, prioridades y destinos bloqueados. Cambia el destino; el desplazamiento sigue siendo físico, sin teletransporte.

La prueba space_search falla en 0.136 y pasa con el cambio, en ambos equipos. Pasan asimismo local_support_space, crowded_shape, support_perception, structural_supports, teammate_spacing_perception, offball_spacing_perception, onside_recovery, run_spacing y continuity.

## Resultados y límites

Muestras con más de tres compañeros a menos de 12 unidades del dueño, cada medio segundo, durante 30 segundos, excluyendo vuelo sin dueño y reanudación:

| Semillas / equipos iniciales | 0.136 | 0.137 |
|---|---:|---:|
| 73 y 101, ambos equipos | 26/167 (15.6%) | 21/174 (12.1%) |
| 211 y 307, ambos equipos | 25/168 (14.9%) | 17/157 (10.8%) |
| Total | 51/335 (15.2%) | 38/331 (11.5%) |

Parejas próximas acumuladas: 565→533. Cambios de posesión: 39→51; no demuestra mejor conservación. El caso inicial azul/73 empeora de 2/41 a 7/42 muestras agrupadas. El rojo/73 mejora de 13/40 a 6/43. La mejora espacial es parcial y no universal. Los denominadores dependen de las posesiones; escenarios sintéticos reutilizados, sin validación estadística independiente ni partido real.

Se descartaron dos cambios durante el vuelo (anticipar toda la estructura al receptor y mantener solo la penalización local alrededor del destino): aumentaron la agrupación del bloque principal. No están en el motor publicado. Datos en data/space-search-137.json.

Pendiente: conservar salidas de pase útiles al abrir los corredores y contrastar concentraciones tras recepción. El motor táctico y los hitos A1–A7 siguen abiertos. No presentar esta versión como solución completa.

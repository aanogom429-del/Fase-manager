# Opciones de pase y equilibrio tras pérdida · 0.48

Se incorpora una medición reproducible de simulación libre para comparar 0.47 y 0.48. No cambia la conducta del motor. Dos semillas de aleatoriedad distintas (17 y 73), 30 segundos a 60 Hz por versión. El entorno ahora permite configurar la semilla de Math.random; cambiar únicamente trialSeed no variaba la simulación libre. Los valores publicados corresponden a la configuración corregida.

## Opciones disponibles

| Indicador | 0.47 | 0.48 |
|---|---:|---:|
| Tiempo observado con balón controlado y juego activo (s) | 43,50 | 42,63 |
| Opciones geométricas medias, ponderadas por tiempo | 3,03 | 3,49 |
| Tiempo controlado sin opción geométrica | 5,94 % | 2,15 % |
| Cambios de poseedor a equipo contrario | 19 | 21 |

Un candidato es un compañero de campo a 3–30 m, sin rival a menos de 2 m del tramo interior (8–95 %) de la línea. Se convierten las coordenadas a 105 × 68 m. No contempla fuera de juego, percepción, trayectoria temporal, perfilación ni calidad de recepción: son opciones geométricas, no pases seguros o necesariamente ejecutables. Las muestras excluyen reanudaciones y partido detenido. Las dos versiones producen situaciones diferentes conforme avanza el partido; compartir semilla no garantiza igualdad de contextos posteriores.

Por semilla, las opciones medias son 3,244→3,349 y 2,838→3,639. El tiempo sin opciones baja en ambas. Es evidencia sintética descriptiva, sin inferencia estadística ni validación real de calidad táctica.

## Tras pérdida

| Momento | Casos 0.47 / 0.48 | Jugadores detrás del balón, media 0.47 / 0.48 | Distancia del más cercano (m), media 0.47 / 0.48 |
|---|---|---|---|
| Pérdida | 19 / 21 | 8,00 / 7,76 | 3,27 / 2,49 |
| +2 s | 9 / 7 | 6,33 / 7,00 | 4,67 / 4,94 |
| +5 s | 1 / 1 | 5 / 5 | 2,33 / 3,63 |

Se excluyen porteros y expulsados. Una pérdida se infiere al cambiar el equipo del poseedor, aunque haya vuelo intermedio. La identidad previa se reinicia en una reanudación. Cada seguimiento termina si recupera el equipo, se interrumpe el juego o finaliza la observación. Por eso las muestras de 0, 2 y 5 s tienen tamaños y composición distintos: no representan la evolución del mismo conjunto completo y tienen sesgo de supervivencia.

Estar detrás del balón no demuestra proteger pases o portería; acercarse no prueba una presión eficaz. Las pérdidas aumentan en el total de estas ejecuciones y los indicadores defensivos son mixtos. No se concluye mejora defensiva. No se ajustan parámetros para favorecer estos resultados.

## Verificación y límites

Pruebas de línea abierta/bloqueada, exclusión del portero y simetría del equilibrio; prueba de amplitud contextual conservada. Informes y snapshots permiten repetir el experimento:

```sh
node tests/tactical_utility.cjs
node scripts/measure_tactical_utility.cjs
```

Salida: data/tactical-utility-v048.json, con cada pérdida, muestras, motivo de cierre, exposición y métricas por semilla. Son cuatro ejecuciones de 30 s; la mayor racha de tiempo controlado es de 6,82 s, excluyendo vuelos. No prueba posesiones largas de forma suficiente.

## Siguiente prioridad

Construir situaciones controladas de pérdida desde ambos lados y alturas, fijando el contexto para comparar respuestas completas de 0–5 s. Medir protección de líneas y llegada rival además de contar jugadores. Ampliar también la evaluación de opciones con fuera de juego y tiempos de intercepción. A1/A2/A7 siguen parciales; el motor permanece 0.48.

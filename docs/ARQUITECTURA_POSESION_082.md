# Arquitectura de posesión 0.82

Primera base implementada: 4-3-3 para ambos equipos, espejada. No hay todavía selector de varios sistemas; 4-2-3-1 y 3-2-5 requieren asignación de puestos, persistencia y pruebas propias. No se cambian puestos mediante una etiqueta visual.

Problema: attackOrigin conservaba la geometría de la recuperación. Si esa geometría estaba desorganizada, la referencia de posesión la perpetuaba. La nueva capa recupera ocupación por puesto, sin sustituir apoyos cercanos, receptor previsto ni órdenes explícitas.

| Unidad | Referencia longitudinal respecto al balón | Anchura base |
|---|---|---|
| Laterales | -22 | 9 / 55 |
| Centrales | -26 | 24 / 40 |
| Interiores | -8 | 20 / 44 |
| Medio central | -14 | 32 |
| Extremos | +12 | 10 / 54 |
| Punta | +16 | 32 |
| Dos jugadores asignados al equilibrio | -12 / -18 | balón ±10 |

Unidades del campo lógico 100 ×64, no metros medidos. Desplazamiento lateral del bloque: 18% del desplazamiento del balón respecto al centro. Límites del campo y fuera de juego siguen aplicándose. Los dos apoyos conservan su lectura local; los demás reconstruyen estructura. Tras 3 s de posesión, el peso estructural crece durante 8 s. Solo cambian destinos: velocidad, giro, reacción y aceleración siguen limitando la llegada. No garantiza tener dos apoyos accesibles inmediatamente después de recuperar ni que todos los corredores estén libres. La separación perceptiva posterior puede ajustar la altura lateral.

Contraste disponible: se leyeron data/support-diagnosis.json, data/heights-comparison.json y data/metrica-game2-event-reference.json. Son diagnósticos históricos sobre ventanas Metrica; documentan cambios frecuentes de funciones y errores de posición, pero NO permiten deducir un 4-3-3 universal. No se entrenó ni ajustó esta versión con un partido, ni se reejecutó el contraste de tracking. Parámetros de diseño provisionales. Próximo contraste necesario: duración/estabilidad de posesiones, distancias entre líneas, apoyos accesibles al recibir, pérdidas y contragolpes en datos reservados y simulación libre.

Prueba nueva: reconstrucción desde equipo colapsado, ambos sentidos, dos destinos de seguridad escalonados, anchura y varias alturas, ausencia de teletransporte, movimiento real y restauración. No equivale a validación táctica general. Las expulsiones no redistribuyen todavía automáticamente los puestos vacantes. Siete bloques abiertos; investigación 0.53.1 excluida.

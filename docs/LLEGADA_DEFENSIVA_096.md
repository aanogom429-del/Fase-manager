# Llegada física de relevos — motor 0.96

Ejecutar `node tests/defensive_arrival.cjs`. Instrumentación de la copia de prueba de defensiveBlockTargets, sin cambiar el motor publicado. Cuatro sistemas, ambos equipos con posesión inicial, semillas 301/302 (distintas del contraste 101/102), 20 s por escenario, 60 pasos/s. La distancia se observa al calcular el destino, antes del movimiento del paso.

Mide distancias reales jugador-destino, no solo existencia del campo defSlotFor. Un episodio es una asignación continua jugador→puesto. Al no observarla en un paso termina el episodio, incluida ausencia del bloque por reanudación/estado del balón. No se diagnostica aquí la causa concreta de finalización ni se considera automáticamente fallo. Umbral de llegada <=3 unidades del campo del motor, no metros calibrados.

| Sistema / posesión inicial | Pasos con relevo | Distancia media | Episodios | Episodios con llegada observada |
|---|---:|---:|---:|---:|
| 4-2-3-1 / rojo | 14 | 10,262 | 1 | 0 |
| 3-5-2 / azul | 17 | 17,506 | 1 | 0 |
| Otros seis escenarios | 0 | No aplicable | 0 | 0 |

31 observaciones de enlace, dos episodios de aproximadamente 0,233 y 0,283 s. Ninguno abierto al finalizar la ventana. No se observó llegada dentro de esos episodios. No significa que todo relevo sea imposible o que se concediera gol: la muestra activó muy pocas compensaciones y termina su seguimiento al cambiar la asignación. Tampoco mide todavía respuesta prescrita a centros/pase atrás.

PASS técnico: instrumentación reproduce escenarios con distancias finitas y al menos un relevo. **No es PASS de eficacia táctica.** La cobertura física no queda validada. Resultado adverso conservado, sin relajar umbrales ni modificar versión para aparentar progreso.

Próximo paso acotado: registrar causa de liberación (cambio de presionante, referencia ocupada por destino, distancia, orden o fin de posesión) y comparar duración de asignación con tiempo estimado de llegada. Después ajustar únicamente la interrupción injustificada, con pruebas de no persistir tras una pérdida ni retirar prioridades. Motor permanece 0.96.

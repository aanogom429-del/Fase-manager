# Continuidad del pasador — evaluación corregida 0.124

7 de noviembre de 2026. Motor 250efd8fe1c10ef4c45a3cecf591cd52bcf44957. Este informe sustituye el ensayo anterior: se había mantenido el modo guiado, que restringe las decisiones automáticas. Sus cifras no permitían concluir nada sobre la elección libre del segundo pase.

## Método corregido

node tests/return_support_dynamic.cjs activa enterFreeMode antes del escenario y exige que chooseAction se ejecute. Son 16 parejas con/sin la bonificación de apoyo: dos equipos, cuatro semillas, con/sin rival inicialmente cercano, tres segundos por simulación a 120 pasos/s. Primer pase ordenado, contactos y decisiones posteriores resueltos por el motor. Se registra además vuelo directo del primer receptor al pasador, separado de cualquier recuperación posterior de posesión. Datos corregidos en data/return-support-124.json; el historial Git conserva los anteriores.

| Medida | Sin bonificación | Con bonificación |
|---|---:|---:|
| Primer receptor controla | 16/16 | 16/16 |
| Recuperación del balón por el pasador | 0/16 | 0/16 |
| Devolución directa ejecutada por el receptor | 0/16 | 0/16 |
| Llamadas a decisión autónoma | 304 | 304 |
| Pasos con compañero poseedor tras recepción | 4364 | 4364 |
| Pasos anteriores con pasador como apoyo | 4264 | 4264 |
| Pasos anteriores con retorno percibido disponible | 3284 | 3284 |

Cero parejas difieren en estas medidas. Son muestras temporales correlacionadas, no miles de casos independientes. La disponibilidad se lee desde el pasador; no acredita conocimiento del poseedor. Las llamadas a chooseAction pueden terminar esperando control/golpeo y no equivalen a 304 pases.

Una traza exploratoria del azul con rival y semilla 73 termina con el #10 dando continuidad al #3 (contador de dos pases); acredita continuidad hacia otro compañero, no superioridad táctica de esa elección. No hay fundamento para forzar una devolución ni aumentar la bonificación. Esta muestra tampoco demuestra beneficio dinámico de la preferencia. Motor sin cambios, 0.124. Próximo trabajo: comparar el valor percibido de cada alternativa en la decisión del primer receptor y probar la devolución cuando sea la única salida segura, frente al contracaso de progresión mejor. Sin barrido global nuevo ni cierre de hitos.

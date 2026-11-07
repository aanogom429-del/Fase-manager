# Continuidad del pasador — evaluación dinámica 0.124

7 de noviembre de 2026. Motor 250efd8fe1c10ef4c45a3cecf591cd52bcf44957, blob 9db905edae2b972a8affdbc0293b4239ffe566c8. Despliegue público verificado en esta sesión.

Ensayo reproducible: node tests/return_support_dynamic.cjs. 16 parejas: ambos equipos, cuatro semillas (11,37,73,101), con/sin rival inicialmente próximo al corredor. Cada pareja activa/desactiva únicamente la bonificación del pasador. Tres segundos a 120 pasos por segundo, jugadores y oposición reactivos, primer pase ordenado mediante kickTo, capturas posteriores resueltas por update sin forzarlas. Datos en data/return-support-124.json.

| Medida agregada | Sin bonificación | Con bonificación |
|---|---:|---:|
| Primer receptor controla | 16/16 | 16/16 |
| Pasador recupera posesión tras recepción | 0/16 | 0/16 |
| Pasos con compañero en posesión tras recepción | 4744 | 4744 |
| Pasos anteriores con pasador asignado como apoyo | 4585 | 4585 |
| Pasos anteriores con retorno corto, espacio y línea percibidos disponibles | 3488 | 3488 |

Cero parejas difieren en estas medidas. Los pasos son muestras temporales correlacionadas, no casos independientes. La medida de retorno cuenta recuperar posesión, no demuestra por sí sola que proceda de una devolución directa. La disponibilidad se mide desde la percepción del pasador, no desde la del poseedor: no implica que el receptor esté viéndolo ni vaya a elegirlo.

Conclusión acotada: no se demuestra beneficio dinámico de la bonificación en esta muestra. No se modifica ni se aumenta por ello. La preferencia de 0.124 continúa integrada, con sus pruebas funcionales y límites documentados. No hay nueva versión de motor en esta entrega. El siguiente diagnóstico debe comparar percepción/orientación del poseedor, destinos y selección del segundo pase; no asumir que no devolver sea siempre un error, pues puede existir progresión mejor. Ampliar después a secuencias y duraciones distintas. Sin barrido global nuevo ni cierre de hitos.

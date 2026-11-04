# 0.118 · Altura de los interiores en iniciación

Con dos jugadores de equilibrio asignados, se conserva una referencia adelantada para un centrocampista que ya ofrece profundidad y tiene una línea de pase de bajo riesgo según su percepción. El movimiento sigue la referencia de su puesto en el eje lateral. El ajuste longitudinal queda limitado a 16 unidades por delante del balón. Se excluyen apoyos ya seleccionados, relevos y jugadores con responsabilidades de amplitud u órdenes.

## Ensayo

Se ejecutó tests/interior_outlet.cjs sobre el motor 0.117 y el nuevo en dos sentidos de ataque, semillas 73, 101 y 502, durante 180 fotogramas por secuencia. Se contaron fotogramas con al menos un interior a más de 8 unidades por delante del poseedor, dentro de 30 unidades y con un margen percibido de pase superior a 2,5. Para la salida de seguridad se aplicaron los mismos criterios de distancia y margen a compañeros de campo situados detrás. Es una aproximación geométrica; no equivale a que el pase se elija o complete.

| Equipo y semilla | Posesión propia 0.117 → 0.118 | Interior y seguridad simultáneos | Salida de seguridad |
|---|---:|---:|---:|
| Azul, cada una de las tres semillas | 180 → 180 | 68 → 69 | 180 → 180 |
| Rojo, 73 | 124 → 146 | 40 → 41 | 116 → 146 |
| Rojo, 101 | 116 → 146 | 40 → 41 | 90 → 146 |
| Rojo, 502 | 121 → 146 | 40 → 41 | 92 → 146 |

Mantener toda la altura inicial en vez de limitarla a 16 redujo el resultado azul de 68 a 60 fotogramas simultáneos. Se descartó esa alternativa. En rojo aumenta el tiempo absoluto con ambos pases pero disminuye la proporción sobre los fotogramas propios. No hay evidencia de mejora general en progresión. Las doce regresiones dirigidas y la nueva prueba pasan. No se repitió el barrido global. La expectativa histórica de que ambos interiores conserven x=75 sigue abierta, sin relajar sus aserciones.
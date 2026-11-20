# Comparación controlada de la conexión interior · 20 de noviembre de 2026

Motor 0.147 sin modificaciones. Nuevo ensayo tests/mid_sequence_comparison.cjs: cuatro escenarios con regla activa y los mismos cuatro con attackingMidConnection anulada, semilla 73. Ocho segundos de elección autónoma y seguimiento del vuelo pendiente hasta desenlace (límite adicional cuatro segundos). Instrumentación de golpeo y captura dentro del motor del ensayo, sin alterar código publicado. Conserva autor del pase, receptor y tiempo. mid_connection y pivot_stagger pasan.

| Equipo / pivote inicial | Recepciones regla desactivada | Recepciones regla activa |
|---|---:|---:|
| Azul / índice 5 | 1 | 1 |
| Azul / índice 6 | 1 | 0 |
| Rojo / índice 5 | 2 | 2 |
| Rojo / índice 6 | 0 | 0 |

El pase azul activo de 17,883 s llega a 18,383 s: estaba censurado por el corte anterior en 18 s, no fallido. Los dos pases rojos llegan exactamente en los mismos instantes con y sin regla. La secuencia roja no prueba beneficio causal de la regla. Además, parte de los pases al mediapunta proviene de otros roles: consultar from en los datos, no equiparar toda recepción del mediapunta a pase del pivote.

Total cuatro recepciones sin regla frente a tres con ella; no muestra mejora en estos escenarios. Muestra pequeña y horizontes de continuación desiguales: no extrapolar a rendimiento general ni usar continuations como comparación justa cuando la recepción ocurre al final. No hay vuelos dirigidos al mediapunta sin desenlace en la muestra.

Próximo: revisar persistencia y evaluación del destino del mediapunta dentro de la planificación colectiva; medir tiempo de conexión disponible y recepción con horizonte posterior uniforme antes de modificar prioridades de pase. No forzar una conexión por puesto. MP3 sigue parcial, concentración y MP2 abiertos. No nueva versión del motor por esta entrega de medición.

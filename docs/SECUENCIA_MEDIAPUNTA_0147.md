# Secuencia autónoma pivote–mediapunta · 0.147

19 de noviembre de 2026. Añadido tests/mid_sequence_audit.cjs. Cuatro escenarios de ocho segundos, semilla 73, 4-2-3-1, ambos equipos y ambos pivotes. Configuración inicial controlada; a partir de ella update ejecuta elección, desplazamiento, pase y recepción sin ordenar pases ni capturar receptores artificialmente. La llamada inicial a capture solo establece al poseedor de la situación.

Resultados reproducibles en data/mid-sequence-147.json:

| Equipo / pivote (índice) | Activaciones | Pases al mediapunta | Recepciones | Pases posteriores del mediapunta |
|---|---:|---:|---:|---:|
| Azul / 5 | 15 | 1 | 0 | 0 |
| Azul / 6 | 15 | 0 | 0 | 0 |
| Rojo / 5 | 19 | 2 | 2 | 1 |
| Rojo / 6 | 19 | 0 | 0 | 0 |

Las activaciones son evaluaciones de la regla, no jugadas independientes. Las dos recepciones rojas están confirmadas al terminar vuelos dirigidos al mediapunta. El caso azul no registra desenlace del pase dentro del seguimiento: no clasificarlo como fallo o intercepción. Cero cambios de posesión en las cuatro ventanas; no demuestra conservación general.

La cadena autónoma existe en un caso, pero no queda validada de forma general ni se atribuye causalmente a esta regla sin comparación con una versión anterior. No imponer pases al mediapunta para obtener un resultado deseado. Las pruebas mid_connection y pivot_stagger también pasan. El motor permanece en 0.147: esta entrega añade medición reproducible, sin modificación de comportamiento.

Próximo: completar el seguimiento de vuelos pendientes más allá del corte temporal y comparar con la regla desactivada; revisar selección y utilidad de la conexión antes de extenderla. MP3 y pendientes de MP2 siguen abiertos.

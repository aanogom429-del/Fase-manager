# Contraste autónomo 0.90

Reproducción: `node tests/line_autonomous.cjs`. Ocho escenarios de 20 segundos, cuatro sistemas seleccionados por los controles reales para ambos equipos, dos posesiones iniciales y semillas 101/102. Se ejecuta update a 60 pasos/s: acciones, oposición, pases, tiros y reanudaciones del motor. No es reproducción de tracking real ni prueba de navegador.

PASS: posiciones finitas, referencias de compensación a compañeros válidos y sin vacantes duplicadas. 9600 muestras de estado, 36 cambios de equipo propietario del balón/vuelo y 906 muestras con al menos un relevo. El contador de cambios no equivale a recuperaciones: incluye transiciones relacionadas con reanudaciones.

| Sistema | Inicio azul: muestras con relevo / salidas sin sustituto | Inicio rojo: muestras con relevo / salidas sin sustituto |
|---|---:|---:|
| 4-3-3 | 19 / 222 | 68 / 265 |
| 4-2-3-1 | 91 / 199 | 2 / 96 |
| 4-4-2 | 98 / 331 | 509 / 533 |
| 3-5-2 | 82 / 239 | 37 / 298 |

Una salida sin sustituto se cuenta por jugador y paso cuando lineExitAt tiene al menos un segundo y ningún jugador referencia su id. Son 2183 observaciones jugador-paso, no 2183 huecos distintos ni medida geométrica de espacio vacío. Las 906 muestras con relevo son pasos, no eventos independientes. No puede compararse ambos contadores como una tasa de éxito.

Resultado adverso relevante: tener referencias válidas no garantiza suficientes compensaciones en juego autónomo. Pendiente clasificar por qué no hay sustituto (apoyo, seguridad, orden, distancia o línea), comprobar la ocupación física y auditar liberación exactamente en pérdidas. No se aflojan restricciones sin ese diagnóstico. El motor permanece en 0.90; este incremento aporta prueba reproducible, no mejora de conducta.

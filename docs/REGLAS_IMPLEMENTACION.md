# Reglas de Juego 2026/27 en FASE MANAGER

Fuente normativa: PDF «Reglas de Juego 2026_27_paginas dobles.pdf» aportado por el usuario el 14 de octubre de 2026. Se consultan especialmente las páginas impresas 105–109, 111, 117–120, 139, 153–159 y 161–163. No se redistribuye el PDF. Esta matriz describe el alcance del prototipo 0.22, no una implementación completa de las reglas.

## Fuera de juego en 0.22

La posición se registra al golpeo simulado del compañero: mitad rival, por delante del balón y del penúltimo adversario, contando al portero como cualquier adversario. Estar a la misma altura no es posición de fuera de juego. El modelo usa el centro puntual de cada jugador y del balón: no reproduce cabeza, tronco, pies ni la exclusión anatómica de brazos/manos. No es una determinación milimétrica.

La posición adelantada no detiene el juego. Se sanciona cuando el jugador registrado toca/recibe el balón según el contacto que modela el motor. La sanción no cambia si los defensores retroceden durante el pase; un receptor inicialmente habilitado puede correr más allá de la línea. El libre indirecto se concede donde interviene, incluso si ha regresado a su propio campo. Las distancias incluyen la salida de adversarios del área penal cuando el equipo defensor ejecuta un libre desde su propia área.

Recepciones directas de banda, meta y esquina están exentas. El siguiente pase ya genera una nueva referencia; centro y libres no tienen esa exención. Una posesión controlada rival cancela la fase anterior. Esto no se debe confundir con desvíos, rebotes o salvadas con rechazo: esos contactos todavía no están modelados y no se anuncia soporte para ellos. Tampoco se sancionan aún obstrucciones visuales, disputas o interferencias sin contacto con el balón. Estas situaciones requieren representar la conducta, no inferir una infracción de la mera proximidad.

La referencia queda congelada durante el vuelo y sobrevive a la pausa y al cambio de modo. Un reinicio borra fase y contadores; comparar una decisión restaura su estado reglamentario. El panel muestra el instante del golpeo y de la intervención. La línea magenta es una ayuda explicativa, no un sistema VAR.

Antes del pase, los destinos de apoyo/desmarque intentan quedar 0,7 m por detrás de la referencia, con las demoras de reacción existentes. Ese margen y la penalización de −18 en la valoración automática de un pase a un jugador adelantado son parámetros provisionales, no datos medidos. No se corrige la posición del jugador instantáneamente ni se recorta el destino del balón. Después del golpeo se permite correr más allá de la línea. El usuario conserva la posibilidad de elegir un pase arriesgado; la interfaz avisa sin deshabilitarlo.

## Comportamientos implementados en 0.21

- Balón fuera únicamente cuando cruza por completo una línea. Radio físico provisional de 0,11 m, separado del icono visual ampliado. El cruce se interpola dentro del paso físico y se considera la primera línea atravesada.
- Banda para el contrario del último equipo que tocó el balón, desde el lugar de salida.
- Meta tras último toque atacante y esquina tras último toque defensor, salvo gol válido o excepción por gol directo de una reanudación.
- Gol entre postes (7,32 m) y por debajo del travesaño (2,44 m), seguido de saque de centro del equipo que lo recibió. Un tiro desviado ya no entrega automáticamente la posesión al portero.
- Balón detenido durante la preparación; ejecutor y adversarios se desplazan hasta posiciones permitidas. Banda: distancia rival de 2 m. Meta: rivales fuera del área penal. Esquina: separación conservadora que supera 9,15 m desde el cuadrante. Centro: jugadores salvo ejecutor en campo propio y rivales fuera de 9,15 m.
- Meta desde el área de meta; esquina en el cuadrante cercano; centro desde el punto central. Ejecución automática hacia un compañero: no se confunde la pausa del usuario con pérdida deliberada de tiempo.
- No hay gol directo de banda ni de libre indirecto. Si entra directamente en la propia portería en las reanudaciones modeladas se concede esquina rival. El control por cualquier otro jugador termina esa restricción.
- El segundo toque del ejecutor antes de otro jugador genera libre indirecto rival; si la infracción sucede en el área de meta rival, se aplica el lugar especial de ejecución sobre su línea paralela a la meta.
- Pausa y cambio de modo conservan la reanudación pendiente y las posiciones. En modo guiado se reanuda hasta un control antes de ofrecer la decisión siguiente. Repetir una decisión restaura sus restricciones vigentes.

Las técnicas corporales del saque no están animadas ni arbitradas. No se generan saques deliberadamente incorrectos o demoras injustificadas. Los rivales se colocan legalmente antes de ejecutar; aún no se modela su desobediencia. El libre indirecto solo se origina por segundo toque en esta etapa. No hay detección anatómica de manos ni agarres del portero.

## Matriz de alcance y secuencia de trabajo

| Reglas | Estado | Siguiente trabajo |
|---|---|---|
| 1–2: campo y balón | Geometría de referencia y radio físico; iconos ampliados | Colisiones con postes/travesaño, altura y volumen completos |
| 3–4: jugadores y equipamiento | 11 por equipo, sin sustituciones o expulsiones | Plantilla, cambios, inferioridades y equipamiento |
| 5–6: equipo arbitral | Resolución automática de salidas y reanudaciones | Registro de infracciones, ventaja y procedimientos; no hay árbitro físico ni VAR |
| 7: duración | Cronómetro de simulación | Periodos, descanso, tiempo añadido y finalización |
| 8: inicio y reanudación | Centro tras gol o reinicio libre | Inicio reglamentario completo, sorteo y balón a tierra |
| 9–10: juego y gol | Cruce completo, gol y excepciones de saques modelados | Contacto arbitral, agente externo y desempates |
| 11: fuera de juego | Posición al golpeo, intervención por toque/recepción, excepciones directas y libre indirecto | Interferencias sin tocar, rebotes/salvadas, partes corporales y salidas/reentradas |
| 12: faltas y conducta | Recuperaciones simplificadas sin faltas | Contacto, manos, ventaja, sanciones y control del portero; no equiparar proximidad a falta |
| 13–14: libres y penal | Indirecto por segundo toque; penal pendiente | Directos/indirectos contextuales, barreras, penaltis e infracciones de ejecución |
| 15–17: banda/meta/esquina | Concesión, colocación, distancia y restricciones principales | Técnica corporal, obstrucción, cuentas atrás y sanciones; ocho segundos del portero al modelar manos |

El documento 2026/27 incluye cuentas atrás para demoras injustificadas en banda y meta, y remite a su protocolo. No se aplica una sanción automática a cualquier preparación que dure cinco segundos: primero se necesita modelar la demora y la señal arbitral correspondiente. Tampoco se sancionan ocho segundos al portero mientras el motor no represente control con manos.

## Observación y validación

Se añaden dos ventanas fijas de Metrica Sample Game 2: banda 26,88–36,88 s y córner 418,52–428,52 s. La orientación original Home hacia la izquierda se gira 180° en jugadores, balón y eventos para mantener la orientación común del visor. Se conservan identificadores, fotogramas, tiempos y ausencias de datos. Procedencia: https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_2.

En los nueve jugadores de campo con posiciones en ambos extremos, el desplazamiento longitudinal medio es −14,58 m tras la banda y −15,53 m tras el córner. Son ventanas posteriores a reanudaciones que incluyen la evolución del juego, no instrucciones de retroceder siempre ni patrones representativos. Hay 46/53 y 31/53 muestras completas respectivamente; no se completan las ausencias. Los ejemplos no ajustan parámetros ni demuestran aprendizaje.

Reproducción: descargar los tres CSV originales de Sample Game 2 y ejecutar `python scripts/observe_restarts.py --directory <carpeta_csv> --out data/metrica-analysis.json` después de generar la muestra de Game 1. El proceso sustituye sus dos clips por identidad, sin duplicarlos. El contraste defensivo controlado anterior sigue usando únicamente sus cuatro ventanas de Game 1.

En 0.22 se revisan también los 28 pases anotados de estas diez ventanas: 26 tienen posiciones completas y siete de esos instantes presentan algún compañero geométricamente adelantado. No son siete infracciones: no se ha evaluado anatomía, participación ni excepciones de reanudación. El visor muestra esa distinción y no completa los dos instantes incompletos. Informe reproducible: `node tests/offside_reference.cjs` genera data/offside-reference-v022.json. No se añadieron partidos nuevos en esta versión ni se ajustaron los parámetros a estos ejemplos.

Pruebas: `node tests/offside.cjs`, `node tests/offside_reference.cjs`, `node tests/laws.cjs`, continuidad, contraste defensivo y tracking. La prueba libre de 90 s con tres semillas verifica funcionamiento, no tasas reales de goles, errores o reanudaciones. Próxima prioridad: faltas con criterios explícitos de contacto, ventaja y sanción; completar casos pendientes de la Regla 11 al incorporar sus conductas físicas, y observar transiciones prolongadas. Después integrar estas situaciones en el futuro entrenamiento, todavía sin aprendizaje implementado.

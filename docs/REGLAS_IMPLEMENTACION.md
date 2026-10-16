# Reglas de Juego 2026/27 en FASE MANAGER

## Disciplina e inferioridad en 0.25

Actualización del alcance histórico descrito más abajo: se añaden tarjetas por ataque prometedor y ocasión manifiesta de gol únicamente en las entradas imprudentes ya representadas. Clasificador provisional por control, dirección prevista hacia delante, distancia y defensores en un corredor. No equivale a un dictamen arbitral validado ni infiere infracciones de una coordenada aislada. Ataque prometedor: amarilla fuera del área si no se concreta la ventaja. Ocasión manifiesta: roja fuera del área, amarilla al conceder penalti por la disputa del balón modelada. No extender esta reducción a agarres, empujones o manos no representados.

Segunda amarilla expulsa; la ficha sale de todas las interacciones físicas y de las referencias del motor. Se conservan identidades para el historial y para restaurar decisiones. Los roles defensivos se asignan entre los que quedan; no se afirma una reorganización óptima. El mínimo de siete se comprueba tras expulsar: por debajo, el juego se interrumpe sin resultado administrativo. Tarjetas y efectivos sobreviven a pausa, modos y goles, y se restauran al comparar. Reiniciar limpia el estado.

Se detiene conservadoramente el juego en los casos clasificados como ocasión manifiesta. La ventaja por ataque prometedor exime esa amarilla al concretarse; al volver a la falta se aplica. No se generan aún temeridad, fuerza excesiva, reiteración, protestas, sanciones diferidas, expulsión del portero o sustituciones. Por tanto, no hay cobertura disciplinaria completa.

Pruebas: `node tests/discipline.cjs`, más faltas, ventaja, fuera de juego, reanudaciones y continuidad. Regresión `data/runtime-regression-v025.json`; no estima tasas reales. No se añadieron partidos para calibrar este clasificador. Referencias consultadas el 16-10-2026: https://www.theifab.com/laws/latest/the-players/ (3.1) y https://www.theifab.com/laws/latest/fouls-and-misconduct/ (12).

## Ventaja en 0.24

Actualización del alcance descrito para 0.23 más abajo: en ciertas entradas imprudentes fuera del área, el motor permite continuar y observa si se materializa un beneficio. No basta conservar la posesión. Se confirma mediante progresión controlada con espacio, oportunidad de tiro sin presión inmediata o gol. Si antes se pierde el balón, sale del campo, se incurre en fuera de juego al recibir o vence la ventana sin beneficio, se concede el libre en el lugar de la primera falta sin rebobinar el tiempo. La ventaja ya concretada no se revoca por un fallo posterior.

Ventana de 2,5 s, inicio desde 60 unidades de avance, espacio proyectado 5 m, progresión 3 m, separación rival 2 m y tiro desde un máximo de 25 m longitudinales y 18 m laterales: umbrales provisionales del prototipo, no prescripciones IFAB. Se conserva el estado al pausar o comparar. Una segunda falta prioriza el penalti o el punto más avanzado, aproximación espacial pendiente de valoración táctica más completa. Los penaltis iniciales siguen señalándose inmediatamente.

Pendiente: ventaja en el área y en reanudaciones, lesiones, sanciones diferidas, ataques prometedores, ocasiones manifiestas y otras circunstancias disciplinarias. Se mantiene el alcance de entradas imprudentes simplificadas; no es arbitraje completo. Fuente: Regla 5.3 IFAB 2026/27, https://www.theifab.com/laws/latest/the-referee/, consultada el 16-10-2026. IFAB indica beneficio inmediato o en unos segundos, no un plazo universal de 2,5 s.

Verificación: `node tests/advantage.cjs`, más continuidad, faltas, fuera de juego y reanudaciones. `data/runtime-regression-v024.json` documenta funcionamiento libre, no validación de frecuencias. No se incorporaron nuevos partidos ni se calibró este modelo con decisiones arbitrales reales.

Fuente normativa: PDF «Reglas de Juego 2026_27_paginas dobles.pdf» aportado por el usuario el 14 de octubre de 2026. Se consultan especialmente las páginas impresas 105–109, 111, 117–120, 139, 153–159 y 161–163. No se redistribuye el PDF. Esta matriz describe el alcance del prototipo 0.23, no una implementación completa de las reglas.

## Entradas, contacto y penaltis en 0.23

Primer modelo de entrada baja: una disputa explícita puede resolver en recuperación legal, intento fallido sin contacto o entrada tardía con contacto imprudente. La falta requiere el episodio de entrada, fallo de sincronización y contacto simplificado (centros a un máximo de 1,2 m); no basta estar cerca. No hay anatomía, fuerza ni lesiones. El umbral de fallo 0,14 (0,24 frente a protección) y el intervalo entre intentos de 0,65 s son hipótesis sin calibración.

Se detiene el juego y se concede libre directo en el punto del contacto, o penalti si está dentro del área propia del infractor, incluidas las líneas. Los penaltis se ejecutan automáticamente desde 11 m, con guardameta en la línea de meta y los demás jugadores fuera del área, detrás del punto y a 9,15 m. El balón se lanza hacia delante, con dispersión provisional y resultado resuelto por el vuelo, intervención rival o cruce de la meta. No se garantiza gol ni una tasa de acierto realista. Los directos se ejecutan como pase automático y admiten gol directo; se mantiene la restricción de segundo toque.

El registro de faltas conserva autor, lugar, instante y reanudación; se mantiene al pausar/cambiar de modo, se restaura al comparar y se borra al reiniciar. No hay ventaja, barrera organizada, infracciones de ejecución del penalti, temeridad, fuerza excesiva ni sanciones disciplinarias. Una entrada imprudente también puede requerir tarjeta por ataque prometedor, ocasión manifiesta o reiteración: estas circunstancias NO están arbitradas todavía; no se afirma que toda entrada imprudente quede reglamentariamente exenta de tarjeta.

Referencia complementaria: IFAB 2026/27, Reglas 12 y 14, consultadas el 16-10-2026:
- https://www.theifab.com/laws/latest/fouls-and-misconduct/
- https://www.theifab.com/laws/latest/the-penalty-kick/

Pruebas: `node tests/fouls.cjs`, reglas, fuera de juego y continuidad. La regresión de tres semillas y 90 s no produjo faltas: las situaciones controladas verifican la ejecución, no una frecuencia naturalista. Informe `data/runtime-regression-v023.json`. No se han observado nuevos partidos para calibrar el contacto en esta actualización.

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
| 12: faltas y conducta | Entrada imprudente simplificada, libre directo/penalti y registro | Otras faltas, manos, ventaja, sanciones y control del portero; no equiparar proximidad a falta |
| 13–14: libres y penal | Indirecto por segundo toque/fuera de juego; directo por contacto y penalti automático | Barreras, decisiones del ejecutor e infracciones de ejecución |
| 15–17: banda/meta/esquina | Concesión, colocación, distancia y restricciones principales | Técnica corporal, obstrucción, cuentas atrás y sanciones; ocho segundos del portero al modelar manos |

El documento 2026/27 incluye cuentas atrás para demoras injustificadas en banda y meta, y remite a su protocolo. No se aplica una sanción automática a cualquier preparación que dure cinco segundos: primero se necesita modelar la demora y la señal arbitral correspondiente. Tampoco se sancionan ocho segundos al portero mientras el motor no represente control con manos.

## Observación y validación

Se añaden dos ventanas fijas de Metrica Sample Game 2: banda 26,88–36,88 s y córner 418,52–428,52 s. La orientación original Home hacia la izquierda se gira 180° en jugadores, balón y eventos para mantener la orientación común del visor. Se conservan identificadores, fotogramas, tiempos y ausencias de datos. Procedencia: https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_2.

En los nueve jugadores de campo con posiciones en ambos extremos, el desplazamiento longitudinal medio es −14,58 m tras la banda y −15,53 m tras el córner. Son ventanas posteriores a reanudaciones que incluyen la evolución del juego, no instrucciones de retroceder siempre ni patrones representativos. Hay 46/53 y 31/53 muestras completas respectivamente; no se completan las ausencias. Los ejemplos no ajustan parámetros ni demuestran aprendizaje.

Reproducción: descargar los tres CSV originales de Sample Game 2 y ejecutar `python scripts/observe_restarts.py --directory <carpeta_csv> --out data/metrica-analysis.json` después de generar la muestra de Game 1. El proceso sustituye sus dos clips por identidad, sin duplicarlos. El contraste defensivo controlado anterior sigue usando únicamente sus cuatro ventanas de Game 1.

En 0.22 se revisan también los 28 pases anotados de estas diez ventanas: 26 tienen posiciones completas y siete de esos instantes presentan algún compañero geométricamente adelantado. No son siete infracciones: no se ha evaluado anatomía, participación ni excepciones de reanudación. El visor muestra esa distinción y no completa los dos instantes incompletos. Informe reproducible: `node tests/offside_reference.cjs` genera data/offside-reference-v022.json. No se añadieron partidos nuevos en esta versión ni se ajustaron los parámetros a estos ejemplos.

Pruebas: `node tests/offside.cjs`, `node tests/offside_reference.cjs`, `node tests/laws.cjs`, continuidad, contraste defensivo y tracking. La prueba libre de 90 s con tres semillas verifica funcionamiento, no tasas reales de goles, errores o reanudaciones. Próxima prioridad: faltas con criterios explícitos de contacto, ventaja y sanción; completar casos pendientes de la Regla 11 al incorporar sus conductas físicas, y observar transiciones prolongadas. Después integrar estas situaciones en el futuro entrenamiento, todavía sin aprendizaje implementado.

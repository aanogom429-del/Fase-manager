# 0.53.1 — Control experimental de relevo con percepción y demora

21-10-2026. Continuación de `68f84a7`. **El protocolo se implementa y prueba como control de investigación; no se incorpora al motor.** La aplicación conserva exactamente el contenido de e28, main no se modifica y no se inicia 0.54. Las comprobaciones técnicas pasan, pero no aparece utilidad táctica dinámica suficiente para aceptar esta alternativa.

## Hipótesis y alcance

La auditoría de relevo anterior encontraba una posibilidad local favorable y varios costes de aproximación; no modelaba la solicitud ni el acuerdo. El nuevo control comprueba si ese relevo sigue disponible después de percibir, responder y ejecutar cada intervención. No se supone que dos lecturas disponibles equivalgan a un acuerdo instantáneo.

`scripts/evaluate_delayed_relay.cjs` genera una fuente experimental desde el fixture e28 inmutable. Añade procesamiento individual de mensajes dentro del ciclo normal de lectura y observación de señales después de calcular todos los destinos, antes de mover a los jugadores. Esta separación evita acreditar una respuesta en el mismo paso por el orden del array.

El control se ejecuta en el harness Node y solo en modo libre. No es una nueva aplicación publicada ni una función disponible en la interfaz. No se modifican física de desplazamiento/contacto, remates, portero, arbitraje ni acciones ofensivas para favorecer el intercambio.

## Protocolo probado

1. El primer defensor ve al poseedor, puede ganar protección de tiro y solicita el relevo a una cobertura visible. **Continúa con su destino previo** mientras espera.
2. El destinatario tiene que ver la señal. El tiempo mínimo de reacción comienza en su primera observación, no en el envío. Acepta únicamente en una lectura propia disponible, con el poseedor y el compañero visibles, si su aproximación conserva sus corredores y pases conocidos y no empeora el acceso estimado frente al movimiento observado del emisor.
3. La aceptación compromete temporalmente la aproximación del destinatario y envía un acuse. No cambia instantáneamente al emisor.
4. El emisor observa el acuse, espera su reacción y lectura propias y exige ver movimiento real del compañero hacia el balón. Recalcula acceso, protección y pases antes de cambiar su destino.
5. Caducidad, poseedor visible diferente, pérdida de visión, coste local, órdenes explícitas y cancelaciones pueden impedir o terminar el acuerdo. Después de declinar un acuse no se reinicia inmediatamente otra solicitud durante la vigencia del compromiso cancelado.

Los plazos se derivan de los tiempos individuales: la caducidad usa dos veces la suma de las reacciones del par. No se ajustan radios, márgenes ni plazos para eliminar un gol. La caducidad puede registrarse después de su instante nominal, cuando el actor vuelve a leer; el mensaje ya no puede aceptarse después de expirar.

Cada jugador usa su propia memoria de rivales. Los mensajes no comparten posiciones de rivales ocultos, sus planes ni decisiones futuras. El control tampoco consulta `decision`, semilla futura o destino del vuelo para anticipar una acción. La estimación del compañero usa posición, orientación y velocidad visibles y sus capacidades conocidas del equipo; nunca su destino privado ni su próximo instante de lectura.

La aproximación puede ser presión o temporización según la inferioridad percibida localmente. **Un acuse de aproximación no demuestra presión eficaz ni garantiza disputar.** La extrapolación visible y `arrivalTime` siguen siendo aproximaciones. La percepción conserva el cono visual existente, sin oclusión completa ni mirada independiente. Permanecen limitaciones de los planes base y de sus asignaciones centrales; no se proclama resuelta toda su información global.

## Pruebas incrementales y regresión

Antes de modificar los controles se ejecutan presión, revisión y procedencia de la reanudación: pasan. La nueva entrada `tests/delayed_defensive_relay.cjs` comprueba en ambos equipos solicitud, aceptación y activación, reacción desde señal observada, movimiento físico observado, ausencia de sorteos, independencia de intenciones privadas ajenas, lectura pendiente, visión, órdenes, cambio de poseedor, caducidad, cancelación y guardado/restauración sin residuos.

La prueba de señal no observada falló con el primer borrador: este descontaba reacción desde el envío aunque el destinatario no hubiera visto al emisor. Se corrigió con un instante de primera observación individual y pasó. Otra comprobación detectó que un emisor podía cancelar y volver a solicitar en la misma lectura; se conserva la espera durante la vigencia cancelada. Las fuentes evaluadas corresponden al control corregido.

La activación favorable de la unidad usa un estado controlado y avanza físicamente al compañero con `advancePlayer`; **no equivale a una secuencia autónoma favorable ni demuestra transferencia al juego completo**. En la simulación real siguen aplicándose las lecturas almacenadas de cada actor.

Verificación nueva, en copias aisladas para que las pruebas históricas no sobrescriban los informes del repositorio:

| Conjunto | Resultado | Qué valida |
|---|---:|---|
| Repositorio con motor e28 inalterado: 58 CommonJS y un archivo Python con tres casos | 59/59 entradas PASS | Regresión completa actual, incluida la nueva prueba del control |
| Copia con index experimental: continuidad, fuera de juego/referencia, faltas, ventaja, disciplina, aceleración, giro, recepción, anticipación, juego aéreo, destinos y funciones/coordinación defensivas | 14/14 PASS | Comprobaciones específicas sobre el control generado |

La segunda comprobación **no se presenta como una batería completa sobre el control**. Algunas pruebas históricas cargan fixtures declarados, como ya consta en continuidad. Se contrastan los hashes de los 59 archivos ejecutados con los actuales y el hash del motor experimental con la fuente realmente evaluada. Las configuraciones diagnósticas y sus verificadores se contrastan adicionalmente mediante sus ejecuciones CLI. No se atribuye una prueba visual nueva a esta sesión.

## Evaluación dinámica final

Los informes conservados contienen 76 ejecuciones nuevas del control en el protocolo existente, 32 ejecuciones nuevas de ocho diagnósticos contextuales × cuatro fuentes, ocho de dos diagnósticos de orientación × cuatro fuentes y dos reejecuciones pasivas para separar los motivos de rechazo. Son **118 ejecuciones de evaluación conservadas**, excluidas simulaciones internas de pruebas y borradores exploratorios.

Las 228 referencias de 0.52/0.53/e28 de la comparación principal se reutilizan del informe previamente ejecutado y verificado; no se anuncian como nuevas. Solo se usan tras comprobar hashes de fuente, simulador y configuración. Nunca se entregan sus resultados al jugador. Los diez diagnósticos nuevos sí ejecutan de nuevo las cuatro fuentes.

### Situaciones existentes

En las 76 situaciones, ambos equipos, orientaciones y perfiles ya descritos, **no se envía ninguna solicitud**. El control coincide exactamente con e28 en contadores, métricas y hash de posiciones iniciales/finales. Esto demuestra ausencia de efecto en esa muestra, no eficacia de un relevo activo.

| Indicador agregado | 0.52 | 0.53 | e28 | Control demorado |
|---|---:|---:|---:|---:|
| Goles concedidos | 28 | 26 | 32 | 32 |
| Tiros concedidos | 74 | 85 | 77 | 77 |
| Intercepciones, incluidas paradas | 56 | 70 | 58 | 58 |
| Recuperaciones por entrada | 12 | 7 | 8 | 8 |
| Control rival, s | 135,75 | 150,90 | 144,10 | 144,10 |
| Ventana potencial de ocasión, s | 35,40 | 39,15 | 33,55 | 33,55 |
| Acceso medio estimado, s | 0,805 | 0,835 | 0,813 | 0,813 |
| Exposición con portero, s equivalentes | 45,029 | 44,543 | 45,314 | 45,314 |
| Opciones de pase × tiempo | 176,55 | 180,85 | 184,70 | 184,70 |
| Tiempo en rango de tentativa, s | 18,20 | 19,80 | 20,05 | 20,05 |

Se mantienen los límites del observador: ventanas geométricas, no xG; exposición no anatómica; llegada aproximada al radio 2,8 para decidir y 1,65 en el indicador común; recuperaciones por entrada no son todas las capturas de balón suelto. No se acepta la variante por pasar pruebas ni por conservar un marcador.

### Diagnósticos que sí envían señales

Se añaden ocho estados: ambos equipos × pase/libre × receptor cercano (23;28) o alejado (30;52), con ayuda en (8;40), o su rotación. Se conservan funciones previas de presión/cobertura. Se usan semillas 2909/4603 según pase/libre, comunes entre contextos. La distancia del receptor alejado al balón inicial supera el radio 14 del recuento local existente; se valida esa geometría sin cambiar el radio del motor. Solo se colocan jugadores antes de la captura inicial.

Se añaden dos diagnósticos de cobertura del mecanismo: poseedor inicialmente orientado en sentido opuesto a la portería, receptor en (0;60), semilla 6503, ambos equipos. El ataque gira y decide con su IA existente. **No se impone una espera ni se comunica una futura decisión al defensor.** Todos son exploratorios construidos, no una reserva de aceptación.

En los diez diagnósticos aparecen seis solicitudes: dos quedan obsoletas al cambiar el poseedor y dos son rechazadas por guardas locales; también se registran cinco caducidades. Los contadores se solapan por solicitud. No hay ninguna aceptación ni activación dinámica. Los resultados del control vuelven a coincidir con e28; los mensajes no deben confundirse con relevos realizados.

| Grupo diagnóstico | Configuraciones | Goles 0.52 / 0.53 / e28 / control |
|---|---:|---|
| Contexto cercano/alejado | 8 | 4 / 3 / 3 / 3 |
| Orientación y búsqueda | 2 | 1 / 0 / 1 / 1 |

No se agregan estos marcadores a los de las 76 situaciones para vender una mejora. El control no ha cambiado ninguna trayectoria de juego en las 86 configuraciones finales.

## Por qué se rechazan las dos solicitudes locales

Dos sondas pasivas conservan exactamente el desenlace y las métricas del control y separan los motivos. En los dos casos el receptor ve la solicitud y la evalúa a 0,458 s, sin enfriamiento de contacto y sin abrir un pase conocido. Su nuevo recorrido mejoraría el acceso estimado después del horizonte común, pero perdería el corredor central que ya protegía:

| Diagnóstico | Acceso propio tras horizonte 0,45 s | Acceso del compañero observado tras el mismo horizonte | Vuelo de tiro central inmediato | Horizonte + acceso propio |
|---|---:|---:|---:|---:|
| Receptor alejado | 0,276 s | 0,391 s | 0,405 s | 0,726 s |
| Orientación/búsqueda | 0,306 s | 0,423 s | 0,411 s | 0,756 s |

La mejora de aproximación de unos 0,115 s no equivale a disputar antes del tiro inmediato. El rayo central pasa de protegido a no protegido según la integración física. Mientras el destinatario espera transferir su cobertura, el emisor continúa con su plan hasta recibir el acuse: no existe un relevo mágico que llene el hueco en el mismo instante.

Esto ofrece una explicación espacial y temporal de esos vetos, **no demuestra que conservar todo corredor sea siempre óptimo**. La guarda sigue siendo conservadora y no valora una utilidad conjunta general entre tiro, pase, conducción y posesión futura. Tampoco se acredita aquí su conducta activa ante todos los contextos colectivos. Acortar plazos solo para lograr una activación no resolvería esa limitación.

## Dictamen

- **Demostrado técnicamente:** reacción desde observación propia, fases no instantáneas, intenciones privadas ajenas irrelevantes en las pruebas, restauración reproducible y comprobaciones específicas de reglas/continuidad.
- **Sin mejora dinámica demostrada:** no hay acuerdos activos en las configuraciones finales. Igualdad de resultados de un control inactivo no prueba que un relevo activo sea neutral o beneficioso.
- **Limitaciones y efectos pendientes:** una aceptación provisional podría mover al destinatario antes de que el emisor confirme; mensajes/cancelaciones pueden quedar obsoletos. No se generaliza seguridad a esas situaciones porque no se ejecutó un acuerdo completo autónomo en la muestra. La aproximación estimada tampoco garantiza presión efectiva.

Se descarta incorporar este protocolo a index.html. Se conservan código experimental, pruebas, datos y procedencia. **0.53.1 sigue abierta y no se integra en main.** El problema que queda es seleccionar un intercambio funcional que compense sus costes y pueda ejecutarse con la información disponible; añadir comunicación por sí sola no ha resuelto la selección. No se inicia 0.54.

## Reproducción

```bash
node tests/delayed_defensive_relay.cjs
node scripts/evaluate_delayed_relay.cjs /tmp/delayed-relay-v0531.json full
node scripts/evaluate_delayed_relay.cjs --diagnostics /tmp/delayed-relay-diagnostics.json
node scripts/evaluate_delayed_relay.cjs --scans /tmp/delayed-relay-scans.json
node scripts/evaluate_delayed_relay.cjs --verify /tmp/delayed-relay-v0531.json /tmp/delayed-relay-diagnostics.json /tmp/delayed-relay-scans.json
node scripts/evaluate_delayed_relay.cjs --costs /tmp/delayed-relay-costs.json
```

La sonda de costes contrasta sus dos reejecuciones con los diagnósticos versionados. Datos: `data/delayed-relay-v0531.json`, `delayed-relay-diagnostics.json`, `delayed-relay-scans.json`, `delayed-relay-costs.json` y `delayed-relay-regression.json`. Cada fuente y configuración queda identificada por hashes. Se mantienen los informes anteriores y la referencia e28.

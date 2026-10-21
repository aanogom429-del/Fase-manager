# 0.53.1 — Viabilidad de relevo entre protección y aproximación

21-10-2026. Continuación de `12d33d7`, sin modificar index.html, integrar en main ni iniciar 0.54. **Se ejecuta el siguiente paso de investigación: contrastar un relevo de funciones, antes de convertirlo en una política.** No se demuestra aún una mejora táctica ni se da por terminada 0.53.1.

## Qué se compara

El instrumento pasivo `scripts/survey_defensive_relay.cjs` reproduce la elección de presionante/cobertura de la base, incluida su histéresis. No supone que el jugador etiquetado como presionante vaya a ejecutar siempre una presión: su plan puede ser temporizar. La prueba confronta la asignación reconstruida con la función real.

Se consideran el presionante y la cobertura que escogería el motor en ese estado. Se observa al equipo que defiende en cada instante, también después de cambios de posesión; el equipo de la configuración identifica al defensor inicial y no necesariamente al par de una muestra posterior. Para formular una propuesta deben ver al poseedor y verse entre sí. Se compara el par actual con una hipótesis: el primero ocupa una proyección de tiro y el segundo ejecuta su propio plan de primera intervención. No se ordena ni aplica ese intercambio. La referencia incluye la protección que ya selecciona `contextualDefense`, además de presión/temporización; se corrigió esa referencia durante la revisión para no exagerar una ganancia frente a la base real.

- Cobertura de tres corredores rasos mediante `projectedShotGuard`: movimiento integrado del jugador, velocidad, aceleración, giro, frenada, enfriamiento y lectura pendiente. Remate inmediato a 48 unidades/s, sin preparación inventada.
- Aproximación después de un horizonte común, el mayor ciclo de lectura de los dos jugadores. Se informa el cambio del tiempo estimado al radio de tentativa 2,8; una llegada estimada no garantiza entrada ni recuperación.
- Conservación de los corredores que protegía el par y ganancia de al menos uno adicional. No se supone que un tercer compañero sustituya automáticamente una cobertura perdida. Si un destino abre un pase, se continúan examinando los restantes; se corrigió ese recorrido durante la revisión y se repitió el contraste completo.
- Conservación de las líneas de pase que el par protegía ante rivales recordados recientemente por alguno de sus miembros. Es una comprobación conjunta del observador, **no una memoria compartida entregada a los jugadores**.
- Disponibilidad de lectura de cada actor. Se distinguen una propuesta con ambos disponibles, una pendiente y una que gana cobertura a costa de aproximación. No se descartan a priori todos los intercambios con coste: se cuantifican para evitar ocultarlos con un filtro demasiado conservador.

La propuesta no consulta trayectorias futuras del balón ni futuras elecciones rivales. Cada proyección física conserva la intención pendiente del propio actor; no se usa la intención privada de un rival. Permanecen limitaciones de los planes originales, incluidos algunos recuentos globales de compañeros. Visibilidad mutua no equivale a comunicación, aceptación ni acuerdo instantáneo.

## Pruebas incrementales

Antes del instrumento se reejecutan `finishing_pressure.cjs`, `finishing_revision.cjs` y `finishing_resume_evidence.cjs`: pasan. La última comprueba la procedencia y hashes de la recuperación anterior; no sustituye una ejecución nueva de toda la batería.

La nueva entrada `tests/defensive_relay_survey.cjs` comprueba:

1. Pureza de la consulta: no altera posiciones, intenciones, recuerdos ni semilla.
2. Identidad de la elección reconstruida con `defensiveOrder`, en ambos equipos.
3. Rechazo de la propuesta si no hay visibilidad mutua del par y el poseedor.
4. Contracaso constructivo espejo: poseedor (20;40), defensor (7;34,5), cobertura (8;40), roles previos de presión/cobertura, ambos orientados hacia +x, o la rotación completa de 180°. Sin un segundo rival próximo percibido, la hipótesis cubre tres corredores frente a dos del par anterior y reduce el acceso estimado de 1,089 a 0,811 s. **Es una posibilidad local, no una mejora dinámica demostrada.**
5. Una lectura pendiente no cuenta como acuerdo inmediatamente ejecutable.
6. Con un receptor rival percibido en (23;28), manteniendo las posiciones del par, la base temporiza ante inferioridad y ya cubre los tres corredores: desaparece la ganancia del relevo. La relación con las amenazas cambia la conducta adecuada; no basta conservar la misma geometría del par.
7. Cuatro parejas frescas con observador activado/desactivado: igualdad de contadores, métricas y hashes de estados. Incluyen los dos casos adversos anteriores.
8. Integridad de los 76 contrastes pasivos y de ocho situaciones diagnósticas nuevas.

El motor permanece idéntico a e28. En este paso no se repite la batería completa recuperada de 55 entradas: se conserva su evidencia en `data/regression-resume-v0531.json`, se comprueba que sus archivos y motor siguen intactos y se ejecutan las pruebas específicas indicadas. Tampoco se afirma haber probado visualmente el navegador de nuevo. Las reglas IFAB y las funciones del motor no se cambian.

## Resultado en las 76 situaciones existentes

Se ejecutan de nuevo las 76 situaciones con el instrumento, a 120 Hz. Se contrastan todos sus resultados con la referencia e28 verificada: **coincidencia exacta en contadores, métricas y hashes de estado inicial/final en 76/76**. El informe conserva 69.668 consultas; son pasos de simulación, no jugadas independientes. Solo se consulta cuando update alcanza la fase de movimiento; las reanudaciones que retornan antes no producen una consulta.

| Primera condición que termina la consulta | Pasos |
|---|---:|
| Fuera de zona de tiro | 36.315 |
| Sin poseedor, incluido vuelo | 22.010 |
| Sin visibilidad mutua requerida | 5.795 |
| Sin posición local de tiro entre las proyecciones examinadas | 5.088 |
| Sin ganancia de cobertura del par que conserve corredores y pases | 460 |
| Propuesta con ganancia | 0 |

Estos contadores dependen del orden de los filtros. No son causas independientes ni prueban que cada situación sea imposible de resolver de otra manera. Los informes no contienen un contracaso dinámico que active el veto de pase conjunto: no se considera validado para una política. El muestreo de destinos conserva las proyecciones de la base; no explora todos los movimientos, compañeros ni maniobras colectivas posibles. Que no haya una oportunidad bajo este criterio no justifica forzar un intercambio.

## Ocho situaciones diagnósticas adicionales

Para comprobar si la muestra anterior oculta la hipótesis se añaden ocho estados de posesión: ambos equipos × pase/libre × cobertura inicial en x=8 o x=10, y=40, o su espejo; semillas 2017/3011. Cada semilla está ligada a una posición de la ayuda; no se aísla causalmente el efecto de esa posición. Se conservan explícitamente las funciones previas de presión/cobertura para contrastar su persistencia. La recolocación ocurre únicamente antes de la captura inicial del ensayo. No se interviene durante la posesión.

Se ejecutan **16 simulaciones**, una con observador y otra sin él por situación; cada pareja coincide exactamente. Son escenarios diagnósticos construidos desde la prueba local, **no un contraste reservado de aceptación**. Ni los roles, ni las posiciones, ni los resultados de estos ensayos se transfieren al motor.

En conjunto producen 4.879 consultas. Solo aparece una secuencia con ganancia hipotética de cobertura: escenario con defensor inicial 1, libre, ayuda x=8 y semilla 2017; la propuesta corresponde al equipo 0 después de un cambio de posesión, entre 4,900 y 4,958 s, ocho pasos consecutivos de una misma secuencia. El par pasa de cubrir uno a dos corredores y no pierde el que cubría. Sin embargo:

- El acceso estimado empeora entre **1,784 y 1,790 s**. En el primer paso pasa de 0,628 a 2,417 s.
- En siete de los ocho pasos hay lecturas pendientes; en uno están disponibles. Disponibilidad no demuestra acuerdo de los actores.
- El plan del posible relevo es «Temporizar ante inferioridad percibida», no una presión confirmada. Cambiar una etiqueta de función no la convertiría en presión real.

No se ejecuta esta hipótesis: no puede atribuirse un cambio de goles, tiros o recuperaciones a un intercambio que no se aplicó. **El coste es una estimación del predictor, no un perjuicio dinámico demostrado.** Los marcadores de los ensayos son los de la base inalterada.

El contracaso unitario favorable tampoco se transfiere automáticamente al estado completo. En la instantánea inicial del ensayo con receptor, la base temporiza ante inferioridad percibida y sus recorridos ya cubren los tres corredores. Esto explica por qué el beneficio de la construcción local no basta para reclamar una funcionalidad útil.

## Decisión y límite del paso

Se conserva el instrumento, las pruebas y la evidencia; **no se incorpora un relevo automático al motor**. La investigación aporta un contracaso favorable reproducible, su contrario contextual y una secuencia dinámica con coste cuantificado. No aporta una selección de intercambios suficientemente consistente para aceptar 0.53.1.

La valoración siguiente deberá distinguir beneficio inmediato de tiro, coste real de presión/temporización y conservación de pases, y validar la solicitud/aceptación del relevo con la demora y percepción de cada jugador. No se supondrá un acuerdo instantáneo porque el observador conozca dos planes. Cualquier política resultante necesitará contraste dinámico y reserva nueva tras fijarla. A2/A4/A7 siguen abiertos; no se avanza a 0.54.

## Reproducción

```bash
node scripts/survey_defensive_relay.cjs /tmp/defensive-relay-survey.json
node scripts/survey_defensive_relay.cjs --verify /tmp/defensive-relay-survey.json
node scripts/survey_defensive_relay.cjs --snapshots /tmp/defensive-relay-snapshots.json
node tests/defensive_relay_survey.cjs
```

Informes versionados: `data/defensive-relay-survey.json`, `data/defensive-relay-snapshots.json` y `data/defensive-relay-verification.json`. Incluyen fuente base, fuente instrumentada, receta de colocación, simulador, estados compactados y muestras de propuestas/costes. El validador comprueba las 76 equivalencias y los metadatos; el generador de instantáneas exige igualdad de cada pareja observador/base antes de guardar.

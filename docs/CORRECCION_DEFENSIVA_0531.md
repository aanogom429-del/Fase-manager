# Corrección defensiva y protocolo de evaluación 0.53.1

Base solicitada: `main@82c6c02`. Comparadores inmutables: `tests/fixtures/engine-v052.html` y `engine-v053.html`. Primera selección `bedf99f` descartada tras los contrastes ampliados. Motor correctivo conservador fijado en `3f189c9` antes de consultar 16 condiciones nuevas de confirmación. Se atiende la [auditoría 0.53](AUDITORIA_TACTICA_053.md); no se inicia 0.54. A2/A4/A6/A7 continúan abiertos.

**Dictamen: propuesta no aceptada para `main`.** Las 55 entradas automatizadas y la comprobación Chromium pasan, pero 76 contrastes no demuestran una mejora táctica suficientemente consistente. El candidato concede 32 goles frente a 26 en 0.53 y 28 en 0.52. Frente a 0.52, ningún caso reduce goles y cuatro los aumentan. No se publica una versión 0.53.1 aceptada; se conserva el trabajo en una rama de evaluación, sin iniciar 0.54.

## Cambios y razones

1. **Montaje del ensayo.** `evaluate_finishing_v0531.cjs` recoloca el portero defensor y actualiza `hx/hy/sx/sy`. La misma condición inicial se aplica a las tres versiones. No se modifica `movement` del portero, su distribución, contacto ni anticipación. El evaluador 0.53 y su informe se conservan como históricos, explícitamente identificados con el defecto auditado. Sus pruebas cargan ahora la instantánea 0.53, no un motor actual que ya no corresponde a ese informe.
2. **Tiempo de tiro.** Se elimina la supuesta espera `.18 + giro/turnRate`: `kickTo` puede lanzar inmediatamente. El motor final solo estima ese tiro ejecutable ahora. El control que añadía un lanzamiento durante la próxima lectura no aporta diferencias en los 22 contrastes de desarrollo y se retira; no se conserva por añadir posibilidades. El horizonte individual de lectura sigue sirviendo para comparar el movimiento y acceso del propio defensor, sin retrasar al atacante. No se lee `decision`, su próxima acción ni sorteos futuros. La disponibilidad angular de `chooseAction` no equivale a una espera obligatoria de la ejecución guiada.
3. **Intercepción.** `projectedShotGuard` integra una copia con `advancePlayer`, aceleración vectorial, frenada, velocidad, giro y pasos de 1/120 s. Comprueba cada segmento recorrido por un balón raso a 48 unidades/s, con radio 1,65 y enfriamiento de contacto. La proyección final sobre un rayo ya no equivale a alcanzar el balón cuando pasa. Se respeta la intención propia pendiente; una lectura inicial, vencida o inválida se aplica como en `movement`, sin añadir otra demora ficticia.
4. **Alternativas.** Se compara el plan previo de presión/temporización/cobertura con varios destinos protectores y tres corredores de tiro inmediato. Solo se acepta ganancia de corredores accesibles sin perder los que ya cubría el plan. Se conserva el acceso próximo al radio de tentativa (2,8), y se veta perder la disputa accesible durante el siguiente ciclo. Además, sin relevo de presión confirmado, el jugador asignado a presionar no acepta aumentar su tiempo estimado de acceso al balón: una ganancia geométrica, incluso inmediata, no basta para cancelar esa función. La cobertura sí puede proteger mientras se mantiene el presionante. Este criterio conservador puede perder bloqueos; no equivale a demostrar que presionar sea siempre mejor. También se veta abrir un pase percibido que el plan previo conservaba y que no tiene ayuda visible. Se elige por ganancia, no por el primer rayo ni por una puntuación fija de 30. La puntuación `20 + ganancia` sigue siendo una prioridad heurística del selector de coberturas, no utilidad calibrada.
5. **Percepción y continuidad.** El poseedor debe ser visible; las amenazas de pase proceden de la memoria propia vigente. La ayuda se estima por posición y velocidad vistas, sin leer su destino privado. Se mantienen las órdenes explícitas y la demora de intención; no se añaden relevos mágicos, invalidaciones instantáneas por un pase futuro ni cambios ofensivos para favorecer la defensa. El conocimiento global ya usado por capas anteriores —identidad del poseedor, funciones y algunos recuentos de compañeros— permanece como limitación.

No se cambian `arrivalTime` general, elección ofensiva, física real de movimiento/contacto, arbitraje, reglas IFAB ni comportamiento general del portero. La mejora de accesibilidad se circunscribe al predictor de protección; no implica resolver toda anticipación de vuelo del motor.

## Verificación incremental

- Antes de cambios: 50/50 entradas automatizadas, incluidas tres pruebas Python.
- Nuevo montaje: igualdad de contadores y posiciones finales con observador activado/desactivado; reproducción exacta del protocolo defectuoso anterior en cuatro casos; ambos anclajes corregidos mantienen la coordenada longitudinal durante el primer segundo. El adverso de 0.53 sigue concediendo gol con portero corregido.
- Predictor: 144 confrontaciones con `update` real, ambos equipos, tres orientaciones, tres velocidades laterales, dos aceleraciones y cuatro posiciones. Coinciden 60 contactos y 84 ausencias de contacto. Las variables físicas cambian trayectorias ejecutadas; no se exige que cada cambio altere el desenlace binario. Se comprueba ausencia de efectos sobre estado/semilla.
- Política actual: casos espejo de protección útil, trayectoria previa que ya bloquea, acceso a disputa, apertura de pase, memoria caducada, rival oculto, orden explícita y estados de la demora. La protección no se elimina: conserva contracasos en los que aporta acceso al corredor.
- Se contrastó añadir la hipótesis de tiro posterior frente a usar solo el tiro inmediato: los 22 contrastes de desarrollo son idénticos tras conservar la función del presionante. Se retira esa hipótesis del motor final. Su control reproducible se guarda en `finishing-v0531-control.json`; no se usan condiciones de confirmación para construirlo.
- Se rechazó la primera selección con dos horizontes: en los ocho casos de ayuda pasó de 0 goles (ambos históricos) a 5, con más tiros, más opciones de pase y pérdida de presión. Se conserva su fixture y las 60 configuraciones completas en `finishing-v0531-rejected.json`. Una excepción que permitía sacrificar acceso por ganancia inmediata tampoco corrigió consistentemente ese grupo; no se incorpora.
- La corrección posterior impone conservación del acceso del presionante sin relevo confirmado. La prueba nueva `finishing_pressure.cjs` falla con el candidato rechazado y pasa con la corrección, conserva opciones protectoras y comprueba 64 alternativas espejo. En el contraste inicial de 22 configuraciones, los ocho casos con ayuda dejan de mostrar el perjuicio sistemático; se mantienen pérdidas frente a 0.53 en otros casos. No se retocan tiempos, radios ni umbrales de gol para suprimir un caso.
- Los 16 escenarios originalmente reservados ya se habían observado al descartar la primera selección. Se conservan como contraste, y se añaden otras 16 condiciones de confirmación con semillas nuevas; el motor se fija antes de ejecutarlas.

## Protocolo corregido

76 configuraciones × tres motores = **228 simulaciones**, sin contar reejecuciones de pruebas o trazas. Actualización 120 Hz, observación geométrica 20 Hz. Todos evolucionan libremente después de inicializar; únicamente los grupos declarados prescriben el primer golpeo.

| Grupo | Configuraciones | Condiciones |
|---|---:|---|
| Orientación | 24 | Ambos equipos, pase/libre, semillas 101/202, orientación del poseedor 0°/90°/180° respecto a la original |
| Tiro | 12 | Ambos equipos, tiro inmediato/demorado/central, semillas 101/202 |
| Ayuda | 8 | Ambos equipos, pase/101 y libre/202, ayuda parada o con velocidad lateral inicial |
| Reserva inicial, ya expuesta | 16 | Ambos equipos, pase/libre, semillas 307/809, bloque próximo con varias amenazas, capacidades ×0,8/×1,2, giro/velocidad distintos, 12 s |
| Confirmación nueva | 16 | Ambos equipos, pase/libre, semillas 1009/1601, ayuda inicialmente en movimiento, capacidades ×0,9/×1,1, orientaciones opuestas, 12 s |

Los tres primeros grupos duran seis segundos. Los dos grupos de 12 s cambian varias condiciones simultáneamente: comprueban transferencia acotada, no aíslan causalmente cada factor. La confirmación nueva no se usa para ajustar el motor después de observar sus resultados. Orientaciones son condiciones iniciales: el jugador puede girar después. Las semillas comunes dejan de garantizar sorteos equivalentes tras una bifurcación.

### Indicadores

Se registran goles y tiros del ataque original, pases, intercepciones, paradas, recuperaciones por entrada, tiempo controlando, mayor tramo continuo de posesión (incluye vuelo propio), acceso estimado al radio 1,65, tiempo en rango de tentativa 2,8 con enfriamiento cero, siete rayos de exposición con/sin portero, cobertura doble y opciones de pase. Se separan contactos reales y geometría potencial. Las recuperaciones se informan por tipo de contacto; no se asignan a un equipo capturas de balón suelto sin vuelo/poseedor rival previo en este observador. El acceso agregado usa el `arrivalTime` aproximado común a las tres versiones; no se presenta como prueba física de intercepción. Los campos heredados globales `shots/passes/turnovers` y `firstShotOutcome` no sustituyen los eventos filtrados por equipo de `metrics`; el último es un desenlace auxiliar grueso del primer remate global y no se usa para puntuar la defensa.

Una ventana potencial requiere zona longitudinal ≤25/lateral ≤17, portería visible para el poseedor, recepción completada, acceso defensor no inmediato y al menos 3/7 rayos libres incluyendo portero. Ya no supone el giro/preparación ficticios. Episodios son entradas a esa condición sin histéresis, no ocasiones independientes ni xG. Opciones de pase no garantizan recepción ni habilitación IFAB. Exposición ignora altura, anatomía y rebotes. El observador puede consultar el estado real para describirlo, pero nunca lo entrega a la decisión del jugador.

Para evitar interpretar un gol temprano como una mejora por reducir el tiempo de peligro, se informan también fracciones durante posesión/zona peligrosa y tiros por segundo de control. Menos exposición acumulada, por sí sola, no demuestra mejor defensa. Cambios de intención incluyen ajustes de destino de todo el equipo y no equivalen a oscilaciones tácticas.

## Resultados

Comparación final: 76 configuraciones, 228 resultados. 108 simulaciones nuevas y 120 resultados históricos reutilizados con hashes/configuración idénticos; las 76 simulaciones del motor actual son nuevas.

| Indicador agregado | 0.52 | 0.53 | 0.53.1 |
|---|---:|---:|---:|
| Goles concedidos | 28 | 26 | 32 |
| Tiros concedidos | 74 | 85 | 77 |
| Intercepciones (incluye paradas) | 56 | 70 | 58 |
| Paradas de tiro del portero | 3 | 3 | 2 |
| Recuperaciones por entrada | 12 | 7 | 8 |
| Control atacante (s) | 135.750 | 150.900 | 144.100 |
| Zona peligrosa (s) | 86.200 | 90.200 | 85.550 |
| Ventanas potenciales (s) | 35.400 | 39.150 | 33.550 |
| Episodios potenciales | 52 | 85 | 49 |
| Acceso medio a radio 1,65 (s) | 0.805 | 0.835 | 0.813 |
| Tiempo en rango de tentativa (s) | 18.200 | 19.800 | 20.050 |
| Opciones de pase × tiempo (opción·s) | 176.550 | 180.850 | 184.700 |
| Exposición con portero (s equivalentes) | 45.029 | 44.543 | 45.314 |
| Exposición sin portero (s equivalentes) | 48.007 | 49.921 | 46.436 |
| Cobertura doble (s equivalentes) | 9.286 | 10.086 | 12.321 |
| Mayor tramo de posesión, media por configuración (s) | 1.673 | 1.815 | 1.786 |
| Protección aplicada (pasos-jugador) | 0 | 3694 | 2666 |

Los grupos de 12 s aportan más tiempo de observación; estos totales describen la muestra, no partidos ni una estimación de riesgo poblacional.

| Tasa condicionada | 0.52 | 0.53 | 0.53.1 |
|---|---:|---:|---:|
| Tiros por segundo de control | 0.545 | 0.563 | 0.534 |
| Ventana potencial / tiempo peligroso | 0.411 | 0.434 | 0.392 |
| Exposición / tiempo peligroso | 0.522 | 0.494 | 0.530 |
| Rango de tentativa / control | 0.134 | 0.131 | 0.139 |
| Opciones medias de pase en peligro | 2.048 | 2.005 | 2.159 |

| Grupo (configuraciones) | Goles 0.52 / 0.53 / 0.53.1 | Tiros | Ventanas potenciales (s) | Exposición con portero (s eq.) |
|---|---|---|---|---|
| Orientación (24) | 9 / 6 / 9 | 19 / 27 / 19 | 10.800 / 13.900 / 10.800 | 14.264 / 13.986 / 14.264 |
| Tiro prescrito (12) | 3 / 0 / 3 | 17 / 15 / 17 | 0.600 / 1.650 / 0.600 | 2.436 / 2.971 / 2.436 |
| Ayuda (8) | 0 / 0 / 0 | 4 / 5 / 4 | 6.600 / 6.500 / 4.400 | 6.993 / 5.686 / 3.736 |
| Reserva inicial, ya expuesta (16) | 6 / 7 / 8 | 18 / 19 / 18 | 7.800 / 7.800 / 8.000 | 8.564 / 9.464 / 11.764 |
| Confirmación nueva (16) | 10 / 13 / 12 | 16 / 19 / 19 | 9.600 / 9.300 / 9.750 | 12.771 / 12.436 / 13.114 |

| Comparación de goles pareada | Menos | Igual | Más |
|---|---:|---:|---:|
| Todas frente a 0.52 | 0 | 72 | 4 |
| Todas frente a 0.53 | 3 | 64 | 9 |
| Confirmación frente a 0.52 | 0 | 14 | 2 |
| Confirmación frente a 0.53 | 1 | 15 | 0 |

### Interpretación y decisión

- **Demostrado:** montaje coherente del portero, equivalencia del observador, coincidencia de 144 contactos/ausencias con ejecución real, conservación local del acceso del presionante y memoria/órdenes, con regresiones técnicas completas. Son mejoras de coherencia y del instrumento, no una demostración de mejor defensa.
- **Neutral:** añadir un tiro futuro no cambia desenlaces ni métricas en los 22 contrastes de desarrollo; se retira. La confirmación nueva registra un caso con menos goles y 15 iguales frente a 0.53, pero dos peores y 14 iguales frente a 0.52. No se usa ese grupo para nuevos ajustes.
- **Mixto:** frente a 0.53 bajan tiros (85→77), ventanas potenciales (39,15→33,55 s) y control rival (150,90→144,10 s), y suben presión/doble cobertura. La exposición condicionada aumenta aproximadamente 0,494→0,530; las opciones de pase acumuladas suben 180,85→184,70 opción·s. Las tasas de ventanas bajan, pero no prueban por sí solas evitar ocasiones ejecutables.
- **Perjudicial:** goles 26→32, intercepciones 70→58 y pérdida de bloqueos presentes en 0.53. Frente a 0.52, goles 28→32 y entradas recuperadoras 12→8. La conservación de acceso estimado no garantiza presión efectiva, coordinación posterior ni una mejor secuencia.

Por estas razones no se integra la selección candidata en main, aun con pruebas verdes. Tampoco se presentan las variantes como nuevas funcionalidades aceptadas. La siguiente investigación debe separar coordinación/relevo y reacción a la recepción de la geometría de un solo corredor; conservar los contracasos y evitar ajustar para borrar un gol concreto. No se inicia 0.54.

## Casos y efectos secundarios

**Adverso auditado, equipo 1/pase/101.** Con anclaje corregido, 0.52/0.53/0.53.1 conceden respectivamente 0/1/0 goles. La correctiva conserva inicialmente la temporización hacia (85;24), en lugar de imponer el destino protector (92,455;30,539). A 1,825 s el receptor mantiene conducción, como en 0.52; el defensor recupera mediante entrada legal a 2,350 s. No se obtiene el cero modificando un umbral de gol ni el portero: en esta secuencia la nueva comparación conserva el plan que la protección anterior reemplazaba. Los contadores de azar antes de la elección están registrados; tras bifurcaciones no se presume igualdad de sorteos.

**Pérdida conservada, equipo 0/pase/202.** 0.52/0.53/0.53.1 conceden 1/0/1. El tiro se produce a 0,925 s en las tres versiones; en 0.53 el defensor intercepta a 1,150 s, y en la correctiva no. La ruta inicial vuelve a aproximarse como 0.52. Se conserva y documenta este perjuicio; no se retocan umbrales para recuperarlo. Acertar mejor la accesibilidad de una hipótesis no garantiza situarse mejor ante el tiro efectivamente elegido más tarde.

Las trazas completas de ambos casos, con eventos y muestras de posiciones/intenciones, están en `data/finishing-v0531-traces.json`. El primer caso no demuestra por sí solo superioridad; el segundo impide concluir que toda reducción de protección sea deseable.

## Alcance y límites de aceptación

Se comprueba una corrección de coherencia temporal, predicción de contacto y fiabilidad del ensayo, con comparación explícita de costes locales. No se equipara esa comprobación con superioridad en goles. La evaluación de utilidad se mantiene experimental. No se declara resuelta la defensa colectiva, el relevo de presión, el portero, la recepción futura ni la validación científica del marco. La selección exige conservación local de corredores, pero no optimiza toda la posesión; ayudas extrapoladas pueden cambiar de función después. Se conservan resultados neutrales y perjudiciales.

La etapa A continúa; B comercial y C iOS siguen pendientes. No se inicia 0.54.

## Reproducción

Desde la raíz, Node 24.19.0 y Python 3.12.14:

```bash
node scripts/evaluate_finishing_v0531.cjs
node scripts/evaluate_finishing_v0531.cjs --two-horizon-control
node scripts/evaluate_finishing_v0531.cjs --traces
node scripts/evaluate_finishing_v0531.cjs --rejected
failed=0
for test in tests/*.cjs; do node "$test" || failed=1; done
python3 -B tests/tracking.py || failed=1
exit "$failed"
```

El evaluador reutiliza 120 resultados históricos solo tras comprobar identidad del código de simulación/observación, hashes de motor y configuración exacta; el motor actual se ejecuta siempre de nuevo. `FASE_EVALUATION_FRESH=1 node scripts/evaluate_finishing_v0531.cjs` fuerza las 228 ejecuciones nuevas. La identidad del observador y simulador con el primer ensayo se comprobó contra Git; una prueba exige recalcular cachés con hash inválido y conservar resultados.

Los informes guardan SHA-256 de cada fuente evaluada y cada configuración/resultados, incluidos casos desfavorables. `finishing_dynamic.cjs` y `finishing_protection.cjs` conservan expectativas históricas de 0.53; `finishing_trajectory.cjs`, `finishing_revision.cjs`, `finishing_pressure.cjs` y `finishing_comparison.cjs` comprueban el motor actual, además de las regresiones generales. Algunas pruebas antiguas vuelven a escribir informes históricos; comprobar `git status` al terminar. La comprobación Chromium ejercita elección guiada, modo libre, velocidad ×4, pausa, SVG finito y visor de referencias; no sustituye pruebas Safari/iPhone.

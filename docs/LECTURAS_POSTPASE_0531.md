# 0.53.1 — Información y margen físico en las lecturas posteriores al pase

22-10-2026. Base inicial local `992d771`, árbol limpio antes de trabajar. Antes de publicar se detectan y preservan mediante avance rápido los commits remotos `1eb24a6` y `07ee3a7`; no modifican el motor ni las dependencias comunes del observador. Se consulta la continuidad y la auditoría táctica. No se cambia index.html, main ni las reglas; no se acepta 0.53.1 ni se inicia 0.54.

## Pregunta y método

El intercambio inicial anterior demostraba contribuciones causales opuestas. Este paso pregunta cuándo puede actualizar normalmente su intención el defensor, qué balón/rivales puede observar entonces y qué posibilidades físicas aparecen en ese estado. **No introduce otra intervención ni una política.**

Se ejecutan 16 simulaciones nuevas: las ocho configuraciones expuestas (ambos equipos, pase/libre, semillas 101/202, orientación original) en 0.53 y e28. Todas reproducen métricas y hashes inicial/final de sus referencias verificadas. Se conservan los eventos completos y muestras ordinarias; el nuevo registro se limita a las lecturas efectivamente almacenadas del defensor #6 hasta tres segundos. Consultas anidadas que no se almacenan no cuentan como lecturas.

La observación del balón ocurre al comienzo de movement, antes de calcular destinos y mover; la consulta física se hace justo antes de guardar la intención normal. Cada actor tiene un registro externo de posiciones visibles consecutivas, sin escribir en el jugador ni compartirlo con otros. Una pérdida de visión borra esa secuencia; se requieren dos muestras próximas para estimar velocidad. Se conservan por separado su memoria propia de rivales, su estado físico, destino previo, espera pendiente y destino realmente elegido.

La hipótesis de contacto extrapola **velocidad y altura observadas constantes**, durante como máximo un ciclo propio. Para cada punto temporal integra una copia propia con la misma aceleración, frenada, orientación y espera pendiente, y comprueba radio 1,65 y enfriamiento. No usa el destino, duración, altura futura o receptor programados del vuelo. Una coincidencia no garantiza contacto real: el balón podría ser controlado o cambiar de altura antes. La ausencia solo descarta estas proyecciones y destinos muestreados, no todas las maniobras posibles.

Si hay poseedor rival visible y balón visible, se examinan tres rayos hipotéticos de tiro inmediato a velocidad 48. Se comparan destino elegido, destino anterior, aproximación al balón y tres proyecciones sobre los rayos, con integración física común de e28 en las dos versiones. Los seis destinos se mantienen fijos en su hipótesis; no se simulan futuras lecturas ni decisiones del rival. No se añade preparación rival. El tiro hipotético tampoco certifica que el poseedor vaya a rematar o haya terminado de controlar: es una amenaza de referencia, no la siguiente acción predicha.

Los datos objetivos del observador —posesión real, tipo de vuelo y número de pases/tiros ya registrados— están en otro bloque. Solo sirven para clasificar los informes, nunca entran en las hipótesis locales. Los contadores distinguen un pase y una lectura posteriores en el **mismo paso**, evitando decidir su orden por una comparación estricta de tiempos iguales.

## Ventanas observadas

En las ocho simulaciones con pase prescrito se repite este calendario real:

| Evento | Tiempo del motor | Estado |
|---|---:|---|
| Pase inicial | 0,350 s | Sale el balón |
| Primera lectura posterior | 0,375 s | Balón en vuelo y visible |
| Vencimiento de esa intención | 0,735 s | Sigue la demora ordinaria |
| Siguiente lectura normal | 0,741667 s | Receptor en posesión y visible |
| Vencimiento de esa intención | 1,101667 s | No se cancela para reaccionar a un remate |

En la primera lectura ya hay dos observaciones visibles del balón; la velocidad estimada tiene módulo 35 y dirección distinta según la dispersión. Las ocho proyecciones de contacto durante el siguiente ciclo devuelven null. **Esto no invalida preparar una postura útil sin interceptar el pase.** Tampoco permite acortar el ciclo o usar la recepción futura como dato conocido.

Los dos motores eligen exactamente el mismo destino a 0,375 s para cada configuración. Por ejemplo, equipo 0/pase/202: (17,029;38,863), frente al balón observado (19,029;38,863), con velocidad estimada (13,910;−32,117). El receptor rival también figura en la memoria propia. El destino normal sigue la zona actual del balón, aunque este se está desplazando hacia otra zona; eso identifica una hipótesis de preparación para estudiar, no demuestra que perseguir esa extrapolación sea mejor.

A 0,741667 s vuelven a coincidir los destinos elegidos de cada pareja: en aquel caso, (18,148;30,730). La postura acumulada sigue siendo distinta. El predictor común encuentra un rayo inmediato accesible bajo el destino de 0.53 y ninguno bajo el de e28; ninguno de los otros cinco destinos e28 examinados gana un rayo en ese instante. Este patrón aparece en **las cuatro configuraciones de pase**, no solo en el bloqueo perdido.

Por tanto, no sirve como selector universal: en equipo 1/pase/101 la 0.53 conserva aquella posibilidad local, pero después concede el gol; e28 recupera sin conceder tiro. En equipo 1/pase/202 ambas conceden gol. Un rayo accesible en una hipótesis instantánea no equivale a protección completa, ni a la trayectoria del remate que finalmente se ejecutará.

En los casos pase/202, el tiro real sale a 0,925 s: hay aproximadamente 0,183 s desde la lectura con receptor visible y 0,177 s de intención todavía pendiente al rematar. La próxima lectura normal es posterior al lanzamiento. Estos intervalos son **análisis retrospectivo del observador**, no información disponible para programar una intervención. El ensayo no prueba que corregir en 0,742 s sea imposible: los rayos se lanzan desde la posición actual, no desde una futura postura rival, y la búsqueda de destinos no es exhaustiva.

Los ocho ensayos libres conservan su función de contrario/pasividad: su primer tiro ocurre a 0,400 o 0,417 s, sin un pase previo. Solo una fuente registra un pase posterior a 4,283 s, fuera de la ventana de lecturas de tres segundos. No se inventa para ellos una primera lectura posterior al pase ni se agregan como ocho oportunidades defensivas observadas de ese tipo.

## Resultados colectivos y límites

El observador no cambia goles, tiros, recuperaciones, acceso, exposición, opciones de pase ni continuidad. En estas ocho configuraciones por motor se reproducen los agregados previos: 0.53, 2 goles/11 tiros; e28, 3/7. No constituyen otra comparación general con 0.52 ni una mejora de motor. Las referencias amplias 0.52/0.53/e28 siguen conservadas y no se presentan como ejecuciones nuevas.

La información disponible a 0,375 s abre una oportunidad temporal de examinar preparación durante el pase, pero no prueba una conducta útil. Permanecen los costes de abandonar presión/temporización, abrir pases y prolongar posesión. Las posiciones de memoria no incluyen por sí solas un modelo completo de recepción ni su elección posterior. La percepción base conserva su cono amplio, ausencia de oclusión y alcance no limitado por distancia.

El motor histórico utiliza además `anticipateFlight(p,f)`, que consulta la trayectoria programada del vuelo. Se mantiene intacto para preservar la base; **no se atribuye a todo el motor una independencia de esos datos que no tiene**. Las nuevas hipótesis locales no llaman a esa función y sus pruebas de independencia no certifican toda la arquitectura existente. El destino normal registrado es una salida del motor histórico, no una garantía de selección íntegramente local.

## Verificación y reproducción

Antes del observador pasan presión, revisión y evidencia de la primera intención. La nueva entrada `tests/post_pass_reads.cjs` se ejecuta primero sin informes y después con ellos: cuatro replays de un segundo, ambas versiones/equipos, conservan el checkpoint completo y firma de vuelo/balón; las copias físicas no cambian semilla ni memoria; se conserva espera pendiente; la pérdida visual elimina observación; cambiar posiciones/intenciones privadas ajenas o destino/duración/loft programados no cambia la hipótesis local con la misma observación. Los 16 resultados se contrastan tras simular, no se hereda un PASS por leer el informe anterior.

Regresión nueva completa del estado inicial con el observador: **63/63 entradas PASS** en copia aislada (62 CommonJS y Python con tres casos). Tras recuperar el avance remoto, se ejecutan sus dos entradas nuevas en otra copia: replay real CommonJS y análisis Python con cinco casos, ambas PASS. Se contrastan los hashes de las 63 pruebas anteriores, motor y receta con los archivos actuales. Son **65 entradas distintas verificadas incrementalmente**, no una única reejecución completa de 65. Salidas, tiempos, hashes y alcance: `data/post-pass-reads-regression.json` y `data/post-pass-reads-integration.json`.

Datos: `data/post-pass-reads-v0531.json.gz`, `data/post-pass-reads-summary.json`. Se registran y verifican hashes de fuentes originales, fuentes instrumentadas, receta y simulador. No hay pruebas visuales nuevas en Safari/iOS. Las proyecciones físicas comunes mantienen el contraste previo con update real; este estudio no demuestra contactos nuevos ejecutados ni mejora táctica.

```bash
node tests/post_pass_reads.cjs --unit
node scripts/audit_post_pass_reads.cjs /tmp/post-pass-reads.json.gz
node scripts/audit_post_pass_reads.cjs --verify /tmp/post-pass-reads.json.gz
node tests/post_pass_reads.cjs
```

## Decisión y siguiente experimento

No se incorpora un selector. Se descarta justificar una intervención por «ya ve la dirección del pase» o «tiene un rayo más» sin medir lo que pierde colectivamente. Tampoco se concluye imposibilidad a partir de null o seis destinos.

Se conserva la prioridad colectiva vigente de `07ee3a7`: contrastar destinos y anclajes del grupo restante del replay real durante presión/contención/retroceso, con los casos opuestos. Esta auditoría cierra el análisis sintético pendiente, sin desplazar esa línea.

Experimento sintético complementario posible, si se retoma esta vía: contrastar, **en una lectura normal durante movimiento de balón observado y sin poseedor confirmado visible**, seguir su posición actual frente a un destino derivado de su velocidad visible y un horizonte propio. Debe definir cómo reconocer esa situación con información local (sin consultar flight, su receptor o destino oculto), preservar plazos, revalidar presión y pases, y comparar ambos contrarios y los libres. Primero controlar una única intención como diagnóstico; solo después valorar una política. No proyectar el balón indefinidamente después de una recepción observada ni ajustar el horizonte para evitar un gol concreto. Cualquier aceptación posterior requerirá nuevas situaciones reservadas.

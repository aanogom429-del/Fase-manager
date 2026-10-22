# Reanudación y contraste de la corrección 0.53.1

## Actualización 22-10-2026 — Replay defensivo real completado

Se ejecuta el [replay defensivo controlado](REPLAY_DEFENSIVO_REAL_0531.md), con poseedor actual anotado, ataque/ball/porteros impuestos y diez defensores libres. 48 ejecuciones de ocho casos, tres motores y dos orientaciones hipotéticas; ocho pilotos reproducidos. Referencias observada, estática y velocidad inicial. Se excluye posesión propia y se mantiene demora/movimiento del motor; no se cuentan goles ni recuperaciones de una secuencia impuesta. Las tres versiones superan la referencia estática en 3/8 casos y la inercial en 2/8 en semejanza posicional. Mayor discrepancia de e28 en el grupo restante; esa semejanza no demuestra eficacia. Cuatro entradas específicas pasan, incluida simetría/procedencia/impositores. Próximo paso: contrastar anclaje tras pérdida, arrastre por balón, referencia rival y recuperación de profundidad de esos jugadores, conservando contrarios y oposición reactiva para candidatos. Esta prioridad sucede al análisis real; sin cambios de motor/main, sin aceptación 0.53.1 y sin 0.54.
## Actualización 22-10-2026 — Contraste real solicitado

El usuario redirige la investigación hacia los partidos Metrica ya disponibles y pide relacionarlos con presión, temporización, contención, retroceso y protección de la zona de finalización. Se completa el [análisis real de ocho secuencias](DEFENSA_REAL_PRINCIPIOS_0531.md), con cuatro transiciones Game 1 y los cuatro primeros tiros Game 2, sin selección por resultado. Se conservan contracasos, ausencias, sensibilidad de los rayos y una figura de posiciones reales. Cinco pruebas del análisis pasan; no se modifica el motor. Próxima tarea: preparar replay defensivo con ataque impuesto por tracking, defensores libres, control estático y defensa observada, antes de retocar selección. Estas secuencias son desarrollo, no reserva nueva. 0.53.1 sigue sin aceptar; no se inicia 0.54. Los siguientes apartados conservan la cronología anterior.


Fecha: 21-10-2026. **La 0.53.1 sigue sin aceptarse para main.** Se recupera y verifica el trabajo de `e28d784`, se investigan dos controles nuevos y se descartan para el motor por resultados perjudiciales o mixtos. No se inicia 0.54. La aplicación `index.html` permanece idéntica a e28; no se publica una nueva versión en GitHub.

## Estado encontrado y preservación

Antes de escribir archivos se inspeccionaron estado, ramas, referencias, historial y diferencias. El árbol estaba limpio en `codex/fase-manager-0.53.1-evaluation@e28d7848431305c2a449b402c18000399314cd53`. No había modificaciones pendientes que trasladar. `git ls-remote` confirmó la referencia publicada y `main@82c6c021a510433472e12157a4ec363667ea9000`. La continuación se separó en la rama local `codex/fase-manager-0.53.1-resume`, conservando la anterior.

Se consultaron PROJECT_CONTEXT.md, ROADMAP.md, DEVELOPMENT_LOG.md y la auditoría completa `docs/AUDITORIA_TACTICA_053.md`. La auditoría observa d440066; entre ese commit y main@82c6c02 solo cambian documentación y registro, no el motor.

Los cinco commits adicionales de e28 frente a main contienen:

| Commit | Contenido recuperado |
|---|---|
| 40d4dbc | Instantánea 0.53 y montaje de evaluación con anclaje correcto del portero |
| bedf99f | Predictor físico y primera selección, posteriormente rechazada |
| 59b3f3e | Conservación del acceso del presionante; variante rechazada preservada |
| 3f189c9 | Selección conservadora de tiro inmediato y validación de caché |
| e28d784 | Informes y continuidad: candidato rechazado para main |

La diferencia abarca 21 archivos: motor candidato, evaluadores, pruebas, fixtures, informes JSON y documentación. Los archivos de pruebas e informes **sí existían** y estaban versionados. Eso no acreditaba su ejecución en esta sesión.

La aplicación recuperada corrige el predictor temporal y físico, pero su política no supera el criterio táctico. Su conservación estricta del acceso del presionante evita algunas renuncias costosas y también pierde bloqueos útiles. El portero solo se recoloca coherentemente en el evaluador; no cambia su política general. Las reglas IFAB, el ataque y la física de contacto no se modifican aquí.

## Verificación nueva de los archivos recuperados

Se ejecutaron desde una copia aislada los **54 archivos CommonJS y el archivo Python con tres casos**: 55 entradas, cero fallos. No se heredó el estado PASS de los informes anteriores. La copia permite que las pruebas históricas que regeneran datos no sobrescriban los informes del árbol de trabajo.

`data/regression-resume-v0531.json` conserva comando/archivo, salida de proceso, duración disponible y SHA-256 de cada archivo ejecutado. Se contrastaron esos archivos con el repositorio. Node v24.19.0 y Python 3.12.14. Esta regresión comprueba el candidato e28, incluidas continuidad, interfaces simuladas, decisiones, movimiento, percepción, contactos, reanudaciones, fuera de juego, faltas, ventaja y sanciones. Algunas pruebas históricas de protección cargan explícitamente el fixture 0.53: no se presentan como validación de la política actual.

Se añaden y ejecutan dos entradas: `finishing_observed_control.cjs` para el control experimental y `finishing_resume_evidence.cjs` para procedencia y contraste. Son **55 entradas recuperadas más dos nuevas**, ejecutadas incrementalmente; no una supuesta ejecución anterior de 57 pruebas. El motor no cambia entre ambas fases. No se revalida visualmente Safari/iPhone ni se atribuye a esta sesión la prueba Chromium histórica.

## Experimentos acotados

Los controles se generan con transformaciones verificadas de `tests/fixtures/engine-v0531-e28.html`, copia exacta del motor recuperado. El generador falla si cambia su hash o los puntos de inserción. Se conserva incluso la línea vacía final de la instantánea; es la única advertencia de espacios de esta entrega y no se recorta para mantener identidad con el blob original. Se conservan en `scripts/evaluate_finishing_resume.cjs`, sin aplicarlos a index.html.

### Acceso a presión limitado al tiempo del tiro: perjudicial, descartado

Se sustituye únicamente la conservación incondicional del acceso estimado del presionante por un veto condicionado a comparar el acceso estimado después del siguiente ciclo propio con el tiempo de vuelo del remate inmediato. La referencia temporal deriva de distancia/48, no del desenlace del caso adverso. Es una relajación exploratoria, no una demostración de llegada antes del tiro ni un descarte de toda política con horizonte finito. Se mantienen el resto del predictor, veto de pase y condiciones de disputa.

En 16 situaciones de desarrollo, encaja **6 goles frente a 3 de e28, 2 de 0.53 y 3 de 0.52**. En los ocho casos con ayuda encaja 3 frente a 0 de las tres referencias. Además, falla el contracaso existente de `finishing_pressure.cjs`: permite perder aproximación sin relevo confirmado. Se detiene esta variante tras ese grupo; no se la presenta como evaluada en las 76 situaciones ni se retocan umbrales para rescatarla.

Interpretación: que el presionante no alcance el balón antes de un tiro inmediato no vuelve irrelevante su aproximación cuando el rival conserva o pasa. Proteger tiene consecuencias sobre la continuidad de la posesión y la función que queda sin ejecutar.

### Intercepción de un tiro ya observado: resultado mixto, descartado

Se ensaya una respuesta tras dos observaciones consecutivas del balón visible. Estima velocidad por diferencias de posiciones observadas e integra copias del defensor con el movimiento existente: aceleración, velocidad, orientación, frenada, enfriamiento y demora de intención. Examina doce puntos hasta la salida del campo o 0,8 s. Es muestreo finito, no un solucionador exhaustivo.

No consulta destino, duración, receptor privado ni una acción futura. Se usa altura actual observada, no el parámetro de altura futura del vuelo. Una prueba nueva detectó ese acceso al parámetro futuro en el primer borrador; falló antes de corregirlo y pasó después. La evaluación que se conserva corresponde a la fuente corregida. Pérdida de visión invalida la lectura; una imagen aislada no entrega velocidad. Órdenes explícitas y lectura pendiente conservan prioridad. No se modifica al portero. Persisten las limitaciones perceptivas y de coordinación central de la base, incluida la clasificación existente del vuelo y su equipo.

En 144 combinaciones de dos equipos, tres orientaciones, tres velocidades laterales, dos aceleraciones y cuatro posiciones, propone 48 contactos: los 48 se ejecutan con `update` real al mantener el destino pronosticado. En 96 combinaciones no propone destino; **no se demuestra que interceptar sea físicamente imposible**. Se comprueban pureza del predictor, metadatos privados irrelevantes, enfriamiento, visión, altura actual, órdenes, demora y restauración sin observaciones residuales. Esta prueba valida contactos propuestos, no la utilidad táctica ni toda la política autónoma.

En las 76 situaciones dinámicas obtiene los mismos goles y tiros que e28. Hay dos recuperaciones por entrada adicionales, pero dos intercepciones distintas de parada de tiro menos y dos paradas más; aumentan opciones de pase, ocasiones potenciales y exposición. No es una mejora consistente. No se incorpora por el mero hecho de ofrecer otra conducta.

## Comparación nueva sin caché

Se ejecutan **320 simulaciones nuevas**, sin reutilizar resultados: 76 × (0.52, 0.53, e28 y tiro observado), más las 16 del control de presión. Ocho reejecuciones adicionales producen las trazas adversas. Las 228 ejecuciones de las tres referencias coinciden exactamente con el informe recuperado en contadores, métricas y hashes del estado inicial/final. No se confunde verificación de hashes con ejecución: se realizan ambas.

Protocolo sin cambios: 120 Hz, observación pasiva 20 Hz, ambos equipos, orientaciones 0°/90°/180°, pase/libre, tiros inmediatos/demorados/centrales, ayuda parada/móvil, perfiles físicos distintos y posesiones de 6/12 s. Se conserva el anclaje correcto del portero para todos. Los grupos de reserva/confirmación ya estaban expuestos: esta reanudación es exploratoria y de replicación, **no un nuevo contraste reservado**. No se usa para declarar generalización.

| Indicador agregado | 0.52 | 0.53 | e28 | Tiro observado |
|---|---:|---:|---:|---:|
| Goles concedidos | 28 | 26 | 32 | 32 |
| Tiros concedidos | 74 | 85 | 77 | 77 |
| Intercepciones, incluidas paradas | 56 | 70 | 58 | 58 |
| Paradas de tiro | 3 | 3 | 2 | 4 |
| Recuperaciones por entrada | 12 | 7 | 8 | 10 |
| Control rival, s | 135,75 | 150,90 | 144,10 | 144,55 |
| Zona peligrosa, s | 86,20 | 90,20 | 85,55 | 86,50 |
| Ocasión potencial, s | 35,40 | 39,15 | 33,55 | 34,85 |
| Acceso medio estimado, s | 0,805 | 0,835 | 0,813 | 0,803 |
| Exposición con portero, s equivalentes | 45,029 | 44,543 | 45,314 | 46,771 |
| Exposición / tiempo peligroso | 52,24 % | 49,38 % | 52,97 % | 54,07 % |
| Opciones de pase × tiempo | 176,55 | 180,85 | 184,70 | 189,80 |
| Tiempo en rango de tentativa, s | 18,20 | 19,80 | 20,05 | 20,70 |
| Suma del mayor tramo rival continuo por caso, s | 127,183 | 137,933 | 135,725 | 135,358 |

El acceso medio usa el `arrivalTime` aproximado común; no es una prueba física de intercepción. Las ocasiones son ventanas geométricas, no xG. Exposición y pases son indicadores funcionales simplificados; las tasas evitan aceptar una integral menor solo porque un gol corta antes la posesión. Recuperaciones por entrada no incluyen todas las capturas de balón suelto: permanece esa limitación del observador histórico. Las variaciones del número de paradas proceden de secuencias diferentes, sin cambiar la política del portero.

Frente a 0.53, e28 mejora el marcador en 3 situaciones, iguala 64 y empeora 9; frente a 0.52 iguala 72 y empeora 4. El control observado iguala los goles de e28 en las 76, pero sus efectos colectivos son mixtos. Ninguna de estas cifras equivale a partidos independientes ni validación externa.

## Casos adversos reejecutados

**Equipo 1, pase/101:** 0.52 concede 0, 0.53 concede 1 y e28/control observado conceden 0. En 0.53 se reproduce la decisión de pasar a 1,825 s y la cadena posterior, incluido el remate de 3,583 s. En 0.52/e28 se reproduce la recuperación legal a 2,350 s. El portero tiene el anclaje corregido en todos los casos. Evitar este gol no basta para aceptar e28: se conservan sus otros perjuicios.

**Equipo 0, pase/202:** 0.53 intercepta el remate a 1,150 s; 0.52/e28/control observado encajan. Antes del remate de 0,925 s, a 0,900 s, el defensor de 0.53 está en (10,094;34,306); el de e28 en (12,230;36,631). Comparten en ese instante el destino (18,148;30,730), pero arrastran posiciones y velocidades distintas por las lecturas anteriores. A 1,150 s el defensor de e28 está en (13,697;35,535), lejos del segmento que cruza cerca de (12,036;32,132). La respuesta posterior al tiro no compensa ese estado previo con la demora y capacidades existentes. No se elimina la demora ni se recoloca al jugador para obtener un bloqueo.

`data/finishing-resume-traces.json` conserva ocho listas completas de eventos y ventanas temporales de posiciones/intenciones de los cuatro jugadores principales. La prueba de evidencia comprueba que trazar no altera las métricas del caso completo.

## Reproducción y continuidad

```bash
node scripts/evaluate_finishing_resume.cjs v052 /tmp/fase-resume-v052.json
node scripts/evaluate_finishing_resume.cjs v053 /tmp/fase-resume-v053.json
node scripts/evaluate_finishing_resume.cjs e28 /tmp/fase-resume-e28.json
node scripts/evaluate_finishing_resume.cjs observed /tmp/fase-resume-observed.json
node scripts/evaluate_finishing_resume.cjs finitePressure /tmp/fase-resume-finitePressure.json
node scripts/evaluate_finishing_resume.cjs --collect /tmp /tmp/finishing-resume-reproduced.json
node scripts/evaluate_finishing_resume.cjs --traces /tmp/finishing-resume-traces-reproduced.json
node tests/finishing_observed_control.cjs
node tests/finishing_resume_evidence.cjs
```

Los informes incluyen hashes de motores, receta y simulador; las posiciones iniciales/finales de cada simulación se representan mediante SHA-256 para compactar el contraste. El informe original con coordenadas completas se conserva intacto.

**Demostrado:** archivos recuperados, regresión nueva, montaje corregido, reproducción exacta de datos y casos, precisión de los contactos propuestos bajo destino fijo. **Mixto:** respuesta al tiro observado, sin mejora de goles/tiros y con costes colectivos. **Perjudicial:** relajar presión sin relevo; también persisten los perjuicios del candidato e28. **Pendiente para aceptar 0.53.1:** una selección defensiva que conserve bloqueos útiles y continuidad de presión/pases, con coordinación perceptivamente justificable y posterior contraste reservado nuevo. A2/A4/A6/A7 siguen abiertos; no se da por terminada la corrección ni se promueve a main.

## Continuación: destinos intermedios

Nueva investigación desde `953855d`: [destinos intermedios](DESTINOS_INTERMEDIOS_0531.md). Manteniendo los vetos de presión, disputa y pases, el control amplía los destinos sin modificar index.html. En 64 decisiones espejo ofrece seis elecciones protectoras frente a cuatro; en 76 simulaciones nuevas conserva exactamente las métricas de e28 (32 goles/77 tiros concedidos), con un único hash final distinto. Cuatro trazas nuevas confirman que pase/202 sigue perdiendo el bloqueo de 0.53. No se incorpora por falta de utilidad dinámica demostrada; las referencias 0.52/0.53/e28 son reutilizadas con procedencia comprobada. No se inicia 0.54.

## Continuación: preparación espacial

Auditoría posterior: [preparación espacial previa al tiro](PREPARACION_ESPACIAL_0531.md). Dieciséis simulaciones pasivas nuevas (ocho configuraciones × 0.53/e28) reproducen exactamente resultados históricos. La primera diferencia muestreada aparece a 0,05 s; en pase/202 la aproximación e28 ya es distinta desde la consulta inicial y pierde un rayo futuro a 0,10833 s, con intención pendiente. Pero la misma señal aparece en casos favorables y neutros: no basta para seleccionar protección. Se conserva el contrario equipo 1/pase/101. Pasan tres entradas previas y una nueva de pasividad/procedencia; no se reejecuta toda la batería. Sin cambios de motor ni main, 0.53.1 sigue sin aceptar y no se inicia 0.54.

## Continuación: intervención inicial

Intervención posterior: [primera intención defensiva](INTENCION_INICIAL_0531.md). 48 simulaciones nuevas (ocho configuraciones × dos motores × base/mismo destino/intercambio) aíslan un único destino almacenado, conservando plazos y movimiento físico. Los 32 controles sin cambio reproducen sus referencias. Intercambiar el primer destino invierte en ambos sentidos pase/202 del equipo 0 y pase/101 del equipo 1, pero añade un gol en libre/101 del equipo 1. No hay elección inicial consistentemente mejor; los prefijos muestreados antes del pase son iguales entre semillas. No se incorpora una regla retrospectiva. Próximo análisis: primera lectura ordinaria posterior al pase, información visible y tiempo físico restante, manteniendo contrarios y demoras. Motor y main intactos; no se inicia 0.54.

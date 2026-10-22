# 0.53.1 — Intervención causal sobre la primera intención defensiva

22-10-2026. Continuación de `ce9aaf0`, recuperado mediante avance rápido desde GitHub, sin cambios locales pendientes. Se consultan contexto, hoja de ruta, registro, auditoría táctica e informes posteriores. Motor e28 intacto, main en `82c6c02`; no se acepta 0.53.1 ni se inicia 0.54.

## Pregunta y protocolo

¿Puede cambiar el desenlace alterar únicamente el primer destino almacenado del defensor #6, manteniendo el motor posterior de cada versión? Se usan las ocho configuraciones expuestas de preparación espacial: dos equipos, pase/libre y semillas 101/202, con la orientación original y portero correctamente anclado. Son controles explicativos sintéticos, no una reserva de aceptación ni partidos independientes.

Para cada configuración y motor (0.53/e28) se ejecutan tres variantes nuevas: observador sin sustitución, sustitución por el mismo destino y sustitución por el destino inicial de la otra versión. **48 simulaciones nuevas**; 32 sin cambio efectivo y 16 intervenciones. El destino donante procede de la primera intención ejecutada, todavía almacenada en la muestra histórica de 0,05 s, no de una propuesta protectora posiblemente anidada. Se comprueba que coincide exactamente con el destino original al almacenarse a 1/120 s en la nueva ejecución donante.

La sustitución afecta a una sola asignación de `intentX/intentY`, antes de mover. No recoloca jugadores, modifica velocidades, capacidades, orientación o plazos, ni impone destinos después del primer ciclo. El vencimiento sigue en 0,36833 s, con reacción individual de 0,36 s desde la lectura a 0,00833 s. Después vuelven a decidir con su versión normal; recepciones y disputas conservan sus prioridades. Los demás actores continúan con su motor habitual. El pasador inicial mantiene el pase prescrito a 0,35 s cuando corresponde; el modo libre conserva sus decisiones autónomas.

**No es una política perceptiva nueva.** El harness prescribe un destino contrafactual inicial para explicar causalidad; no da a un jugador resultados futuros, una semilla para elegir ni posiciones ocultas. No se inserta esa elección externa en index.html. Las llamadas al azar no se añaden ni manipulan, pero pueden divergir después de cambiar las acciones y la geometría: compartir semilla no garantiza compartir todos los sorteos posteriores.

## Resultados y contrarios

Goles concedidos; «intercambio» significa cambiar solo aquella primera intención dentro del motor indicado.

| Equipo / situación / semilla | 0.53 base | 0.53 intercambio | e28 base | e28 intercambio |
|---|---:|---:|---:|---:|
| 0 / pase / 101 | 0 | 0 | 0 | 0 |
| 0 / pase / 202 | 0 | 1 | 1 | 0 |
| 0 / libre / 101 | 0 | 0 | 0 | 0 |
| 0 / libre / 202 | 0 | 0 | 1 | 0 |
| 1 / pase / 101 | 1 | 0 | 0 | 1 |
| 1 / pase / 202 | 1 | 1 | 1 | 1 |
| 1 / libre / 101 | 0 | 0 | 0 | 1 |
| 1 / libre / 202 | 0 | 0 | 0 | 0 |

Los 32 controles sin cambio reproducen íntegramente las métricas y hashes inicial/final históricos; las parejas base/mismo destino también conservan todos los eventos y muestras nuevos. Las 16 intervenciones tienen su primera diferencia muestreada a 0,05 s. En las muestras de los cuatro protagonistas y métricas hasta vencer la intención, todas coinciden con la otra versión donante. No se afirma identidad del estado interno completo entre versiones ni del partido posterior.

**Contribución causal demostrada en estos controles:** basta intercambiar el primer destino para invertir, en ambos sentidos, los desenlaces contrarios de equipo 0/pase/202 y equipo 1/pase/101. No es solo una correlación de dos partidos distintos: el resto del código de cada motor se conserva en cada intervención. Esto no demuestra que sea la única intervención capaz de cambiar esos goles ni elimina la mediación de decisiones posteriores.

En equipo 0/pase/202, dar a e28 el primer destino protector cambia gol por control defensivo: las intercepciones pasan de 0 a 2 y el tiempo en rango de tentativa de 0 a 0,30 s. Sin embargo, durante el primer ciclo empeora la llegada media estimada (1,644 → 1,844 s) y aumenta la fracción geométrica abierta media (0,143 → 0,245); los pases disponibles medios siguen en 1 y no hay tentativa cercana en ese prefijo. Por tanto, «más protección» como etiqueta no describe mejor bloqueo inmediato: la postura acumulada resulta útil para una trayectoria posterior.

En equipo 1/pase/101 sucede lo contrario: dar a e28 el primer destino protector pierde una recuperación por entrada, añade un tiro y un gol; el tiempo en rango de tentativa pasa de 0,35 a 0 s y las opciones de pase × tiempo de 1,85 a 2,50. El intercambio inverso en 0.53 recupera aquella entrada y evita el tiro. Se mantienen los cambios de continuidad ofensiva y los efectos sobre las líneas de pase; no se resume todo como «más cerca del balón es mejor».

El contrario nuevo equipo 1/libre/101 conserva el perjuicio: e28 pasa de 0 a 1 gol y de 1 a 3 tiros con la primera protección; exposición geométrica integrada con portero 0,05 → 0,25 y ventana potencial 0 → 0,30 s. En equipo 0/libre/202 se evita el gol, pero la exposición aumenta 0,05 → 1,257 y la secuencia ofensiva cambia: tampoco es una mejora uniforme por evitar ese gol.

En las ocho configuraciones, 0.53 base/intercambio suma 2/2 goles y 11/9 tiros; e28 suma 3/3 goles y 7/13 tiros. Estos agregados pequeños no eligen una política. El intercambio es un diagnóstico dependiente de una versión donante, no un candidato que deba competir como versión 0.53.1.

## Qué no puede seleccionar una decisión inicial

Las doce comparaciones entre semillas 101/202 de pase (dos equipos × dos motores × tres variantes) tienen las mismas muestras antes de 0,35 s. Una inicialización y un movimiento observable iguales pueden desembocar en beneficios opuestos tras la dispersión del pase y las decisiones posteriores. No se permite decidir retrospectivamente «proteger para esta semilla y aproximarse para aquella». Este ensayo tampoco demuestra que toda información perceptiva útil sea idéntica: la comparación conserva cuatro protagonistas y métricas, no todos los recuerdos privados.

Los promedios del prefijo usan solo muestras con poseedor y métricas disponibles; no incluyen vuelos sin poseedor. Las métricas son las del observador previo: ventanas geométricas, no xG; llegada estimada, no recuperación garantizada; exposición sin anatomía; las intercepciones incluyen paradas. `attackSeconds` cuenta muestras con poseedor, no todo el tiempo de vuelo rival. `protectionSteps` y `intentChanges` conservan etiquetas de la receta original y no se usan para atribuir una función a un destino sustituido. `firstEventDifference` señala el tiempo del primer evento de la base diferente por índice, no el menor tiempo simétrico de divergencia; para el comienzo físico se usa la primera muestra distinta.

## Pruebas y procedencia

Antes de escribir el control pasan presión, revisión y preparación espacial. Una invocación inicial usó por error el nombre inexistente `finishing_review.cjs`; se corrigió a `finishing_revision.cjs`, que pasó. No fue un fallo del motor.

La nueva entrada `tests/initial_intent.cjs` comprueba, para ambos equipos y motores, cuatro replays sin intervención con igualdad del checkpoint completo, incluyendo memorias, intenciones y semilla; una sola sustitución, vencimiento individual intacto, desplazamiento físico sin teletransporte y renovación normal posterior. Se ejecutó primero sin exigir los informes aún inexistentes. Después verifica su procedencia, configuración, eventos y resumen. También pasa la prueba física previa de trayectoria (60 contactos y 84 ausencias frente a update real). No se presenta una nueva prueba visual Safari/iOS.

Regresión nueva completa en copia aislada: **62/62 entradas PASS** (61 CommonJS y un archivo Python con tres casos). Se conservan salidas, códigos, tiempos y SHA256 de cada archivo en `data/initial-intent-regression.json`; los hashes se contrastan con los archivos actuales. La fuente de producción sigue siendo e28: esto no equivale a una batería completa sobre un motor sustituido permanentemente por el control. Las pruebas históricas conservan sus fixtures declarados.

Datos completos comprimidos sin pérdida: `data/initial-intent-v0531.json.gz`; resumen reproducible: `data/initial-intent-summary.json`. Cada fila conserva fuente original e instrumentada por SHA256, intervención, resultado, eventos y muestras. Se verifican también receta, simulador y archivo histórico donante. Las 16 referencias antiguas se contrastan con ejecuciones nuevas y no se vuelven a contar como simulaciones adicionales.

## Decisión y siguiente investigación

No se incorpora ninguna regla al motor. La primera intención sí es una palanca causal en estos casos, pero ninguna de las dos elecciones iniciales ofrece una ventaja consistente. No procede restaurar toda la heurística 0.53, relajar presión ni usar una pérdida de cobertura futura como disparador automático.

El siguiente problema acotado es comprobar qué oportunidad de actualización existe **en la primera lectura ordinaria posterior al pase**: qué trayectoria del balón/receptor puede percibir realmente cada defensor, qué intención sigue pendiente y si aún queda tiempo físico para corregir acceso y bloqueo. Debe comparar ambos contrarios y los neutrales sin cancelar demoras ni conocer el destino final del pase. Si no existe una señal discriminante ejecutable, conservar el resultado negativo y no inventar un selector retrospectivo. Una futura política fijada requerirá situaciones nuevas reservadas; estas ocho ya están expuestas.

```bash
node tests/initial_intent.cjs --unit
node scripts/evaluate_initial_intent.cjs /tmp/initial-intent.json.gz
node scripts/evaluate_initial_intent.cjs --verify /tmp/initial-intent.json.gz
node tests/initial_intent.cjs
```

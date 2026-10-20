# Protección de la zona de finalización — 0.53

Base de integración: `13c0330cc6abad294e0cc1552abb64b4bd71e46d`; motor anterior 0.52 (`a19f743`). Se conserva el modelo defensivo previo y todas las reglas y acciones existentes. No se inicia la 0.54.

## Mecanismo

`contextualDefensePlan` conserva el cuerpo del anterior `contextualDefense`. El nuevo `contextualDefense` obtiene ese plan y aplica `protectFinishingLine` únicamente si el movimiento expone un corredor de tiro que el defensor puede conservar. La cobertura mantiene un valor finito para la selección de funciones de `defensiveOrder`; el resto de sus criterios y la persistencia permanecen.

La lectura considera al poseedor visible, balón, portería propia, orientación del atacante, velocidad observada, desplazamiento del defensor (giro, aceleración, frenada, demora e intención ya almacenada), tiempo aproximado de tiro y ayudas vistas. Los receptores potenciales siguen influyendo mediante la capa anterior de líneas de pase; esta primera protección no predice una cadena pase→receptor→tiro.

Se comparan tres rayos rasos hacia el centro y dos puntos interiores de portería. En dos horizontes cortos se extrapola el origen desde la velocidad visible del poseedor. Si el defensor ocupa un corredor, su plan lo deja descubierto y un destino de conservación mantiene cobertura estimada, se elige ese destino salvo respaldo visible disponible. El predictor trabaja sobre copias y no consume azar ni cambia el estado.

Resultados posibles: las decisiones previas de presión/temporización/cobertura siguen operativas; se añaden **Proteger línea de tiro** para el primer defensor y **Mantener cobertura de tiro** para el segundo. Ambas aparecen en el inspector de destinos y en la procedencia de la intención aplicada. No se modifican las prioridades de órdenes explícitas, recepción y disputa.

## Parámetros y restricciones

Hipótesis de diseño no calibradas:

- Amenaza a un máximo longitudinal de 25 unidades de la meta propia y 17 laterales desde el centro.
- Preparación estimada: 0,18 s más giro hacia portería a la velocidad angular del atacante; no intervenir si supera 0,8 s.
- Horizontes: preparación y preparación +0,35 s, limitado a 0,9 s.
- Rayos a y=32 y ±2,5 (con inversión simétrica por equipo); velocidad supuesta del tiro 48, coherente con `kickTo`.
- Corredor interior 8–95 % y separación inferior a 1,55 unidades, menor que el radio de contacto rival de 1,65.
- Acceso al balón en un máximo de `max(0,35 s, preparación)` conserva la política anterior.
- Solo funciones de primer defensor/cobertura. No se reescribe todo el bloque ni se modifica el portero.

Los compañeros con orden o función de presionante y el portero no se consideran respaldo garantizado. La ayuda debe ser visible y ocupar/conservar el corredor por su posición y velocidad observadas. No se lee su destino privado para conceder ayuda. La futura reacción del compañero no está garantizada.

## Percepción y coherencia del marco

Si el poseedor queda fuera del campo angular del defensor, la nueva valoración no consulta su orientación/velocidad oculta. Se usa visión directa; no se inventa memoria cinemática. Los recuerdos de rivales y las líneas percibidas de la 0.52 siguen funcionando. Permanecen globales la posesión/posición del balón, identidad de equipos y parte de la asignación de funciones anterior.

La protección responde a accesibilidad, orientación, tiempo y relación con compañeros: no añade círculos rígidos al marco de espacios de fase. Sigue siendo una aproximación parcial. No implementa resonancia empática ni aprendizaje.

## Verificación incremental

1. Casos de decisión y contrarios en `tests/finishing_protection.cjs`, reflejados para ambos equipos: proteger, mantener cobertura, destino ya seguro, respaldo disponible/ocupado/en movimiento, orientación contraria, rival oculto, acceso inmediato, atacante lejano/lateral y órdenes del entrenador. Comparación completa de `savePosition` antes/después del predictor para detectar mutaciones o consumo de azar.
2. Regresiones defensivas 0.49–0.52, continuidad, órdenes y disciplina antes de la batería completa.
3. Evaluación dinámica reproducible `node scripts/evaluate_finishing_v053.cjs`; resultado en `data/finishing-v053.json` con SHA-256 de los dos motores.
4. `tests/finishing_dynamic.cjs` verifica los hashes, el inventario de 20 parejas y reproduce un caso autónomo favorable y un caso adverso con pase.
5. Batería completa de regresión; resultado final en DEVELOPMENT_LOG.md.

Los primeros fallos de construcción de la prueba específica fueron supuestos incorrectos del test: se esperaba conservación de cobertura en una geometría donde el destino anterior ya conservaba el corredor y se escogió un supuesto «seguro» que exponía otro rayo. Se corrigieron las geometrías y se añadió el contracaso de destino que realmente conserva el corredor; no se eliminaron expectativas de la batería histórica.

## Evaluación dinámica y límites

20 parejas 0.52/0.53: cinco escenarios, ambos equipos y semillas 101/202, seis segundos por simulación a 1/120 s. En las tres sondas de tiro se prescribe solo el momento/destino del primer lanzamiento; la sonda de pase prescribe un pase y continúa con decisiones reactivas; la libre deja todas las decisiones autónomas. Después de inicializar no se imponen posiciones: ambos equipos se desplazan, el balón vuela, hay contactos, cambios de posesión, goles y reanudaciones. Portero deliberadamente descentrado. Son situaciones sintéticas ejecutadas con el motor, no tracking de partidos reales.

Las semillas emparejan cada versión dentro del mismo equipo; no garantizan resultados idénticos entre equipos por el orden de jugadores y del consumo de azar. Una modificación cambia encuentros y decisiones posteriores; las diferencias no prueban que una sola línea protegida explique todos los goles posteriores.

Limitaciones: tres rayos no cubren toda la portería; tiro raso, sin rebotes ni efecto; extrapolación lineal del atacante y ayuda; preparación heurística, no lectura del temporizador decisional real. El tiempo de paso del tiro por el defensor se estima sobre su proyección inicial: no es una solución exacta de intercepción móvil. La visión no incluye oclusiones. La protección se recalcula con balón controlado; tras el golpeo actúan las reglas anteriores de movimiento y contacto. No se garantiza bloqueo. Sin validación estadística, calibración externa ni prueba visual Safari/iPhone. A2/A4/A7 continúan abiertos.

## Resultados observados

En goles concedidos: **3 parejas mejoran, 16 empatan y 1 empeora**. No se seleccionaron solo los casos favorables. Todas las sondas de tiro inmediato/diferido/central terminan el primer tiro con control defensivo en ambas versiones: no hay mejora demostrada de ese desenlace.

| Equipo defensor | Escenario | Semilla | Goles 0.52 → 0.53 | Intención protectora aplicada (pasos-jugador) |
|---|---|---:|---|---:|
| 0 | delayed | 101 | 0 → 0 | 44 |
| 0 | delayed | 202 | 0 → 0 | 44 |
| 0 | immediate | 101 | 0 → 0 | 0 |
| 0 | immediate | 202 | 0 → 0 | 0 |
| 0 | central | 101 | 0 → 0 | 40 |
| 0 | central | 202 | 0 → 0 | 40 |
| 0 | pass | 101 | 0 → 0 | 44 |
| 0 | pass | 202 | 1 → 0 | 44 |
| 0 | free | 101 | 0 → 0 | 44 |
| 0 | free | 202 | 1 → 0 | 79 |
| 1 | delayed | 101 | 0 → 0 | 44 |
| 1 | delayed | 202 | 0 → 0 | 44 |
| 1 | immediate | 101 | 0 → 0 | 57 |
| 1 | immediate | 202 | 0 → 0 | 0 |
| 1 | central | 101 | 0 → 0 | 69 |
| 1 | central | 202 | 0 → 0 | 40 |
| 1 | pass | 101 | 0 → 1 | 88 |
| 1 | pass | 202 | 1 → 1 | 44 |
| 1 | free | 101 | 0 → 0 | 99 |
| 1 | free | 202 | 1 → 0 | 44 |

Caso adverso conservado: defensor equipo 1, pase, semilla 101, 0→1 goles. Caso favorable autónomo: defensor equipo 0, libre, semilla 202, 1→0. Ambos se vuelven a ejecutar en la prueba dinámica. El caso sin cambio equipo 1/pase/202 conserva un gol en ambas versiones. `protectionSamples` acredita intención aplicada, no cantidad de tiros bloqueados. Los pasos se cuentan a 1/120 s y pueden sumar más de un jugador.

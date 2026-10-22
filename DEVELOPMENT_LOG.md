# Fase Manager — Registro de desarrollo y recuperación
## 22-10-2026 — Defensa real y cinco funciones defensivas

Petición explícita del usuario: analizar Metrica y relacionar presión, temporización, contención, retroceso y protección de zona de finalización. Se conserva el estado local limpio `ce940b8`, equivalente al remoto `ce9aaf0`, antes de añadir archivos. No se modifica index.html.

- Cuatro transiciones existentes de Game 1 y los cuatro primeros tiros cronológicos de la primera parte Game 2; no sustituidos por calidad o desenlace. CSV completos locales recuperados y sus hashes diferenciados de los recortes anteriores. La orientación se comprueba con porteros y se expresa en metros, portería propia x=0 para ambos equipos.
- Ocho secuencias: 820/918 frames completos (114/114 transición y 706/804 tiros). Los 604/604 frames previos/simultáneos al tiro son completos; las ausencias posteriores permanecen explícitas. No se interpola ni se infiere perfil corporal/altura/comunicación.
- Presión compatible con balón alejándose 10,43 m y bloque acortándose 5,63 m; contención compatible con ocho jugadores del lado de portería y balón sin progresión neta; contrario con balón avanzando 25,39 m y bloque desplazándose 3,09 m hacia delante. Retroceso de 19,14 m insuficiente frente a avance del balón de 43,21 m. No se atribuye causalidad exclusiva a estos indicadores.
- En un gol, defensor a 0,67 m, nueve defensores en la zona central descriptiva pero solo uno del lado de portería. Bloqueo real con cero rayos al radio 1 m y tres al radio 2 m: se conserva la sensibilidad, sin ajustar para acertar la etiqueta. Una parada o tiro fuera tampoco se transforman en bloqueos ficticios.
- Cinco pruebas nuevas pasan: simetría, ausencia sin interpolación/puentes, movimiento del balón separado de aproximación propia, geometría y procedencia/regeneración de métricas y contracasos. La revisión corrigió el contador previo al tiro que incluía ausencias posteriores; se regenera antes de verificar. No se anuncia batería completa nueva del motor.
- Figura exacta de tracking generada y revisada visualmente. Fuentes formativas primarias FIFA/FA contextualizan los principios; la correspondencia con las cinco funciones es interpretación operativa del proyecto.

Informe: [DEFENSA_REAL_PRINCIPIOS_0531.md](docs/DEFENSA_REAL_PRINCIPIOS_0531.md). Datos completos comprimidos, scripts de análisis/figura y prueba preservados. Siguiente paso: replay defensivo controlado, no otro ajuste sintético inmediato. Main/motor sin cambios; 0.53.1 sigue sin aceptar, no se inicia 0.54.


Sincronización: se conserva íntegro el avance remoto `992d771` de primera intención, encontrado después de preparar esta entrega local. Se incorporan los nuevos documentos por adición; no se sobrescriben sus experimentos, pruebas o resultados.

## 22-10-2026 — Primera intención: causalidad y efectos opuestos

Intervención posterior: [primera intención defensiva](docs/INTENCION_INICIAL_0531.md). 48 simulaciones nuevas (ocho configuraciones × dos motores × base/mismo destino/intercambio) aíslan un único destino almacenado, conservando plazos y movimiento físico. Los 32 controles sin cambio reproducen sus referencias. Intercambiar el primer destino invierte en ambos sentidos pase/202 del equipo 0 y pase/101 del equipo 1, pero añade un gol en libre/101 del equipo 1. No hay elección inicial consistentemente mejor; los prefijos muestreados antes del pase son iguales entre semillas. No se incorpora una regla retrospectiva. Regresión nueva completa en copia aislada: **62/62 entradas PASS**, con hashes actuales contrastados. Próximo análisis: primera lectura ordinaria posterior al pase, información visible y tiempo físico restante, manteniendo contrarios y demoras. Motor y main intactos; no se inicia 0.54.

## 21-10-2026 — Preparación espacial: divergencia temprana y señal insuficiente

Auditoría posterior: [preparación espacial previa al tiro](docs/PREPARACION_ESPACIAL_0531.md). Dieciséis simulaciones pasivas nuevas (ocho configuraciones × 0.53/e28) reproducen exactamente resultados históricos. La primera diferencia muestreada aparece a 0,05 s; en pase/202 la aproximación e28 ya es distinta desde la consulta inicial y pierde un rayo futuro a 0,10833 s, con intención pendiente. Pero la misma señal aparece en casos favorables y neutros: no basta para seleccionar protección. Se conserva el contrario equipo 1/pase/101. Pasan tres entradas previas y una nueva de pasividad/procedencia; no se reejecuta toda la batería. Sin cambios de motor ni main, 0.53.1 sigue sin aceptar y no se inicia 0.54.

## 21-10-2026 — Destinos intermedios: sin mejora dinámica

Nueva investigación desde `953855d`: [destinos intermedios](docs/DESTINOS_INTERMEDIOS_0531.md). Manteniendo los vetos de presión, disputa y pases, el control amplía los destinos sin modificar index.html. En 64 decisiones espejo ofrece seis elecciones protectoras frente a cuatro; en 76 simulaciones nuevas conserva exactamente las métricas de e28 (32 goles/77 tiros concedidos), con un único hash final distinto. Cuatro trazas nuevas confirman que pase/202 sigue perdiendo el bloqueo de 0.53. No se incorpora por falta de utilidad dinámica demostrada; las referencias 0.52/0.53/e28 son reutilizadas con procedencia comprobada. No se inicia 0.54.

Pruebas incrementales: tres sobre la base, siete sobre copia experimental y nueva prueba espejo de pureza, ganancia de corredores y conservación de acceso/disputa. Informes y fuente experimental preservados; main e index.html sin cambios.

Regresión nueva completa de la base sin modificar, ejecutada en copia aislada: **59/59 entradas PASS** (58 CommonJS y Python con tres casos), con hashes de archivos y motor comprobados. La nueva entrada de destinos intermedios pasa aparte tras generar los informes: **60 entradas verificadas incrementalmente**, no una batería completa de 60 sobre la fuente experimental. Las siete comprobaciones experimentales se registran por separado. No se realiza una prueba visual nueva en Safari/iOS.

## 21-10-2026 — Control experimental de relevo demorado: sin incorporación

Desde `68f84a7`, árbol limpio y motor e28 preservado. Se implementan mensajes locales de solicitud, aceptación, cancelación y caducidad; cada respuesta espera percepción y lectura propias, y el emisor no deja su plan antes de ver una aproximación real. El código queda en un generador de control Node, fuera de index.html.

- Antes: presión, revisión y evidencia pasan. La prueba nueva detecta reacción acreditada antes de ver una señal y un reintento inmediato tras cancelar; se corrigen antes de la evaluación final. Se prueban ambos equipos, intenciones ajenas irrelevantes, lectura pendiente, visión, órdenes, poseedor diferente, caducidad, cancelación, semilla y checkpoint/restauración.
- Regresión completa nueva en copia aislada: 59/59 entradas PASS (58 CommonJS y Python con tres casos). Copia con fuente experimental: 14/14 comprobaciones específicas de continuidad, física y reglas PASS. No se presenta esa segunda comprobación como una batería completa del control.
- Comparación final: 76 ejecuciones nuevas del control; referencias 0.52/0.53/e28 reutilizadas de su informe previamente ejecutado y verificado, con hashes/configuración coincidentes. Cero solicitudes y resultados exactos de e28: 32 goles frente a 26/28 de 0.53/0.52.
- Diez diagnósticos exploratorios nuevos: 40 ejecuciones frescas entre las cuatro fuentes. Seis solicitudes, cero aceptaciones/activaciones. Mensajes obsoletos, caducidad y dos vetos locales; no se cuenta un envío como funcionalidad útil.
- Dos reejecuciones pasivas separan el coste: mejorar acceso unos 0,115 s deja el rayo central sin cubrir; tiro inmediato tarda 0,405/0,411 s frente a horizonte + acceso de 0,726/0,756 s. No hay beneficio demostrado de añadir el protocolo ni una demostración general de utilidad de esos vetos.

Se conserva el control y su procedencia; no se incorpora al motor ni se publica o integra en main. Queda pendiente seleccionar intercambios ejecutables con costes justificados, no solo añadir mensajes. No se inicia 0.54. Informe, reproducción y límites: [RELEVO_DEMORADO_0531.md](docs/RELEVO_DEMORADO_0531.md).

## 21-10-2026 — Siguiente paso: contraste de relevo defensivo, sin nueva política

Desde `12d33d7`, con árbol limpio, se investiga intercambiar protección del tiro y primera aproximación entre dos jugadores que se ven y ven al poseedor. Se mantiene index.html idéntico a e28 y no se publica ni integra en main.

- Pasan antes del instrumento las pruebas de presión, revisión y evidencia de la reanudación.
- Nuevo instrumento pasivo: compara asignación real con histéresis, cobertura física de corredores, aproximación, pases recordados y disponibilidad de lectura. Cuantifica costes sin descartar a priori todo intercambio que pierda aproximación. No comparte memorias ni aplica propuestas al motor.
- Nueva prueba espejo: oportunidad local de tres corredores frente a dos, con mejor acceso estimado; al añadir un receptor percibido, la base temporiza y ya cubre los tres. Lectura pendiente y visibilidad limitan el acuerdo. Cuatro parejas nuevas observador activado/desactivado sin diferencias.
- 76 ejecuciones instrumentadas: igualdad exacta con e28 en métricas y hashes de estados; 69.668 consultas, ninguna propuesta con ganancia bajo los criterios examinados.
- Ocho estados diagnósticos × observador/base = 16 ejecuciones nuevas, idénticas por pareja. Una secuencia de ocho pasos gana un corredor, pero añade entre 1,784 y 1,790 s de acceso estimado; siete pasos tienen lecturas pendientes. No es un perjuicio dinámico probado porque no se ejecuta el intercambio.
- Se conserva la batería completa verificada anteriormente; no se afirma haber vuelto a ejecutar todas sus entradas en este paso sin cambios del motor. Resultados específicos, hashes y comandos en `data/defensive-relay-verification.json`.

No se incorpora una regla de relevo automático. El siguiente problema sigue siendo seleccionar y acordar un intercambio útil con información individual y demora real; 0.53.1 permanece sin aceptar. No se inicia 0.54. Informe y reproducción: [RELEVO_DEFENSIVO_0531.md](docs/RELEVO_DEFENSIVO_0531.md).

## 21-10-2026 — Reanudación verificada de e28; dos controles descartados

Se inspeccionó y preservó el árbol limpio de `e28d784`; main publicado sigue en `82c6c02`. Los cinco commits adicionales contienen código, pruebas e informes de una propuesta rechazada, no una 0.53.1 aceptada. Se consultaron los tres documentos de continuidad y la auditoría completa. Se continuó en la rama local `codex/fase-manager-0.53.1-resume`, sin sobrescribir la rama de evaluación.

- Recuperación comprobada: 54 CommonJS y un archivo Python con tres casos, todos versionados. Reejecución fresca en copia aislada: 55 entradas, cero fallos; hashes y resultados por archivo en `data/regression-resume-v0531.json`. No se dieron por verificadas las pruebas del trabajo anterior.
- Comparación fresca sin caché: 76 casos × cuatro fuentes, más 16 casos de un control perjudicial: 320 simulaciones. Las 228 de 0.52/0.53/e28 reproducen exactamente contadores, métricas y hashes de estados históricos. Ocho reejecuciones adicionales generan las trazas adversas, sin cambiar resultados.
- Control de conservación de presión solo dentro del tiempo del tiro: falla el contracaso de presión existente y encaja 6 frente a 3 goles de e28 en 16 casos; descartado sin retocar umbrales.
- Control de tiro ya observado: 144 combinaciones, 48 contactos propuestos comprobados con update real; 96 sin propuesta no equivalen a imposibilidad física. Pruebas de percepción, metadatos privados, demora, órdenes, altura, enfriamiento y restauración. Una nueva prueba falló al detectar dependencia de altura futura del vuelo; se eliminó y pasó antes de la evaluación final. En 76 casos: mismos 32 goles/77 tiros que e28, dos entradas adicionales, más exposición y pases disponibles. Se descarta por resultado mixto.
- Dos entradas nuevas ejecutadas: `finishing_observed_control.cjs` y `finishing_resume_evidence.cjs`. La regresión recuperada y las pruebas adicionales se ejecutaron incrementalmente; el motor permanece idéntico a e28. No se afirma que se haya repetido la validación visual histórica.

No se integra en main ni se publica una nueva versión: e28 sigue concediendo 32 goles frente a 26/28 de 0.53/0.52. Se preservan fixture exacto, recetas, informes y trazas. No se inicia 0.54. Informe y reproducción: [REANUDACION_0531.md](docs/REANUDACION_0531.md).

## 20-10-2026 — Propuesta correctiva 0.53.1 evaluada; NO integrada en main

Base solicitada y comprobada en GitHub: `82c6c021a510433472e12157a4ec363667ea9000`. Motor candidato fijado en `3f189c9` antes de consultar las nuevas condiciones de confirmación. Rama de conservación: `codex/fase-manager-0.53.1-evaluation`. **No se acepta la propuesta para main**: pasan las verificaciones técnicas, pero no hay mejora táctica suficientemente consistente. No se inicia 0.54.

Informe: [CORRECCION_DEFENSIVA_0531.md](docs/CORRECCION_DEFENSIVA_0531.md). Datos completos y procedencia: `data/finishing-v0531.json`, `finishing-v0531-control.json`, `finishing-v0531-rejected.json`, `finishing-v0531-traces.json` y `regression-v0531.json`.

### Cambios investigados

- Portero: se corrige el montaje del ensayo (`hx/hy/sx/sy` coherentes con su posición). La política general del portero permanece idéntica. Se conservan evaluador/informe 0.53 defectuosos como históricos y su fuente exacta en un fixture.
- Predictor: remate ejecutable inmediato, sin preparación angular ficticia. Movimiento copiado con aceleración vectorial, velocidad, frenada, orientación y demora propia; comprobación del segmento de balón a 120 Hz con radio real de contacto. No se cambia la física real ni la ejecución ofensiva para favorecer a la defensa.
- Decisión: comparación de corredores, pases percibidos y acceso; el presionante sin relevo confirmado no acepta perder acceso estimado para cubrir un rayo. Se mantienen percepción limitada, órdenes y memoria. El control de tiro posterior fue neutral en 22 situaciones y se retira del motor propuesto.
- Una primera selección con dos horizontes (`bedf99f`) concedió cinco goles en los ocho casos con ayuda, frente a cero en 0.52 y 0.53. Se rechaza y conserva con sus 60 configuraciones y fuente. Permitir sacrificar acceso ante ganancia inmediata tampoco solucionó consistentemente ese grupo. No se ajustaron umbrales para borrar un gol.

### Pruebas antes y después

- Base: 50/50 entradas PASS, incluidas las tres pruebas Python.
- Primera selección: 53 entradas técnicas PASS, posteriormente rechazada por la evaluación táctica; un conjunto de pruebas verde no constituyó aceptación.
- Selección conservadora previa a simplificar: 54 entradas PASS; comparación documental adicional ejecutada tras generar datos. Se mantuvo el motor fijo antes de evaluar el grupo nuevo.
- Candidato final: **55/55 entradas PASS** (54 CommonJS y una entrada Python con tres casos), cero fallos finales. La comprobación del informe se ejecutó después de regenerarlo y forma parte del total. Resultado por archivo y versiones Node 24.19.0 / Python 3.12.14 en `data/regression-v0531.json`.
- Oráculo físico: 144 confrontaciones con `update` real; 60 contactos, 84 ausencias, cero discrepancias. Ambos equipos, orientaciones, velocidades y aceleraciones. La prueba de función de presión reproduce el fallo previo y pasa con la corrección; 64 alternativas espejo y opciones protectoras conservadas.
- Observación: igualdad de contadores/posiciones con observador desactivado, equivalencia del protocolo histórico, anclajes corregidos en ambos equipos, hashes y límites de métricas, seis reejecuciones adversas y trazas que preservan la simulación. Cachés inválidas se recalculan y producen los mismos resultados.
- Chromium: decisión guiada, modo libre, velocidad ×4, reloj avanzando, pausa, SVG finito y panel de referencia; sin errores JavaScript ni mensaje de error del motor. Sin prueba Safari/iPhone.
- `movement`, `update`, decisiones ofensivas y código IFAB permanecen idénticos al texto de la base; las regresiones de reglas, reanudaciones, disciplina, ventaja y continuidad pasan.

### Resultado y decisión de integración

76 configuraciones × tres motores = 228 resultados comparables. Se ejecutan de nuevo 108 simulaciones (las 76 del candidato y 32 de comparadores en condiciones nuevas); se reutilizan 120 resultados históricos con código, hashes y configuración idénticos. Un modo permite forzar las 228 nuevas. Los datos originales de la primera selección se habían obtenido ejecutando sus 180 simulaciones. Los grupos incluyen ambos equipos, tres orientaciones iniciales, tiros/pases reales, ayudas, 16 condiciones de reserva inicial y otras 16 de confirmación con semillas 1009/1601 y posesiones de 12 s.

- Goles 0.52 / 0.53 / candidato: **28 / 26 / 32**. Frente a 0.52: 0 configuraciones favorables en goles, 72 neutrales y 4 perjudiciales. Frente a 0.53: 3 favorables, 64 neutrales y 9 perjudiciales.
- Frente a 0.53 bajan tiros 85→77 y ventanas potenciales 39,15→33,55 s; mejoran algunos indicadores de acceso/presión y doble cobertura. Empeoran intercepciones 70→58, opciones de pase acumuladas 180,85→184,70 opción·s y exposición condicionada aproximadamente 0,494→0,530. No se interpreta una reducción de tiempo de peligro tras un gol como mejora por sí sola.
- El adverso auditado equipo 1/pase/101 pasa 1→0 y recupera por entrada a 2,350 s, pero el caso equipo 0/pase/202 conserva el perjuicio 0→1. Ambos se registran con la secuencia completa, sin atribuir toda divergencia posterior a los mismos sorteos.
- La confirmación nueva no se usa para retocar el código: un caso mejora en goles frente a 0.53 y 15 empatan; frente a 0.52, dos empeoran y 14 empatan.

La corrección del ensayo y del cálculo de contacto queda demostrada en su alcance. La combinación de decisiones no supera la aceptación táctica pedida. Por eso no se integra 0.53.1 en main ni se presentan las variantes como funcionalidades aceptadas. Se conserva una propuesta reproducible para revisar coordinación/relevo y reacción ante recepción antes de volver a intentar una correctiva. A2/A4/A6/A7 siguen abiertos; B comercial y C iOS pendientes.

---


## 20-10-2026 — Auditoría táctica de 0.53 (solo documentación)

Referencia de motor: `d440066319ad18c5ebbe6cbd0ebe0e7bdc62488b`, comprobada en `main`. Informe: [AUDITORIA_TACTICA_053.md](docs/AUDITORIA_TACTICA_053.md). No se modifica el motor, el evaluador ni las pruebas; no se implementa 0.54.

- Caso adverso equipo 1/pase/101 reproducido: 0→1. Reconstrucción de posiciones, intenciones, pases, recuperación, tiro y portero. A 1,825 s, con los mismos sorteos hasta la bifurcación, la distancia percibida 4,047→3,797 cruza el umbral de conducción y favorece el pase; no es simplemente pérdida continua de presión.
- Error demostrado del ensayo anterior: `hx` del portero queda lejos de su posición inicial y lo hace abandonar la meta. Corregir solo ese anclaje en el ensayo no elimina el caso adverso. Con ayuda cercana parada o en movimiento, el caso termina 0→0.
- 40 parejas distintas / 80 simulaciones de seis segundos: 24 de orientación, ocho con anclaje del portero corregido y ocho con ayuda. Observación temporal externa; igualdad de ocho parejas originales en los contadores y desenlaces. Repeticiones adicionales para trazar azar y acceso, sin contarlas como nuevas parejas.
- Grupo de orientación: goles 10→6, pero tiros concedidos 19→26 y ventanas potenciales de ocasión 9,00→15,50 s. Intercepciones 4→14 y entradas recuperadoras 6→2. Son métricas sintéticas, no xG ni validación general. Detalle, controles y código de reproducción en el informe.
- No se demuestra que proteger impida una entrada segura: persisten lecturas antiguas y la disputa sigue activa. Se identifica desajuste entre preparación angular supuesta y ejecución instantánea del tiro, además de límites de cobertura conjunta.
- Recomendación: revisar/corregir de forma acotada la 0.53 y el protocolo antes de pasar al siguiente bloque; no revertir todo ni ajustar para un único gol. A4/A7 siguen abiertos, B/C pendientes. No se vuelve a ejecutar toda la batería histórica: el motor permanece idéntico y el 50/50 anterior no se presenta como resultado nuevo.

---

## 20-10-2026 — Versión 0.53: protección de finalización

Base: `main@13c0330cc6abad294e0cc1552abb64b4bd71e46d`, motor previo 0.52 (`a19f743`). El hash del commit de esta versión se obtiene con `git log -1 -- index.html`; no se inserta su propio hash dentro del contenido del commit.

Implementado: capa de protección sobre el plan defensivo 0.52, con tres corredores de tiro raso, preparación angular del poseedor visible, extrapolación corta de su movimiento, desplazamiento estimado del defensor y ayuda visible disponible. Distingue proteger tiro/mantener cobertura sin sustituir presión, temporización ni defensa de líneas de pase. No se han cambiado física de contacto, acciones ofensivas, reglas ni tests históricos. Informe: [PROTECCION_FINALIZACION_053.md](docs/PROTECCION_FINALIZACION_053.md).

### Verificación incremental y resultados

- Regresiones defensivas específicas, continuidad, órdenes y disciplina verificadas antes de integrar.
- **50/50 archivos automatizados PASS: 48 anteriores + 2 nuevos** (49 CommonJS y una entrada Python con tres casos). Node.js v24.19.0, Python 3.12.14. Cero fallos finales, errores de entorno o timeouts. Batería secuencial con límite preventivo de 240 s por archivo; prueba dinámica adicional ejecutada y registrada por separado. Los 48 archivos anteriores se conservaron sin cambios.
- Prueba específica: ambos equipos, ayuda libre/comprometida/en movimiento, visión limitada, orientación, trayectoria observada, acceso inmediato y amenaza fuera del rango. Predictor sin mutaciones, comprobado contra el estado guardado completo. Los fallos iniciales de dos supuestos del nuevo test y su corrección se describen en el informe; no eran regresiones del motor anterior.
- Evaluación dinámica: 20 parejas, 40 simulaciones de seis segundos. Todos los jugadores se mueven con el motor; tiros/pases reales, decisiones reactivas y casos autónomos. Se cuentan intenciones protectoras realmente aplicadas mediante el inspector pasivo. Los hashes del informe identifican los motores evaluados.
- **Goles concedidos: 3 parejas mejoran, 16 empatan, 1 empeora.** Caso adverso: equipo defensor 1, pase, semilla 101, 0→1. Caso favorable autónomo: equipo defensor 0, libre, semilla 202, 1→0. Ambos se reprodujeron automáticamente. Las sondas de tiro controlado no mejoran el desenlace del primer tiro (control defensivo en ambas versiones). No se afirma mejora general ni validación científica.
- No se ejecutó prueba visual en Safari/iPhone. Los reportes de versiones congeladas siguen siendo históricos.

### Pendientes y alcance de la entrega

A continúa en desarrollo; A4/A7 no se cierran. Ampliar dentro del bloque la predicción de intervención, investigar el contracaso adverso, receptor potencial y ayuda futura, y contrastar datos externos. Tres rayos rasos, preparación heurística y proyección inicial del punto de paso no equivalen a intercepción física exacta. La valoración nueva solo opera con poseedor visible y balón controlado; tras el tiro sigue el movimiento/contacto anterior. No hay oclusión completa, resonancia empática ni aprendizaje. B comercial y C iOS pendientes. **No se inicia 0.54.**

### Inventario final de pruebas 0.53

| Entrada | Resultado | Duración (s) |
|---|---|---:|
| `tests/acceleration.cjs` | PASS | 0.14 |
| `tests/advantage.cjs` | PASS | 0.54 |
| `tests/aerial_play.cjs` | PASS | 1.77 |
| `tests/anticipation_first_touch.cjs` | PASS | 0.40 |
| `tests/attack_interactions.cjs` | PASS | 37.41 |
| `tests/attack_origin.cjs` | PASS | 0.41 |
| `tests/attacking_heights.cjs` | PASS | 0.21 |
| `tests/audit_continuity.cjs` | PASS | 2.31 |
| `tests/audit_windows.cjs` | PASS | 1.37 |
| `tests/contextual_defense.cjs` | PASS | 0.10 |
| `tests/contextual_supports.cjs` | PASS | 33.96 |
| `tests/contextual_width.cjs` | PASS | 0.16 |
| `tests/continuity.cjs` | PASS | 17.01 |
| `tests/defense.cjs` | PASS | 0.13 |
| `tests/defense_origin.cjs` | PASS | 0.17 |
| `tests/defense_replay.cjs` | PASS | 1.90 |
| `tests/defensive_coordination.cjs` | PASS | 0.11 |
| `tests/defensive_roles.cjs` | PASS | 0.19 |
| `tests/destination_trace.cjs` | PASS | 7.68 |
| `tests/discipline.cjs` | PASS | 0.52 |
| `tests/finishing_dynamic.cjs` | PASS | 11.64 |
| `tests/finishing_protection.cjs` | PASS | 0.15 |
| `tests/fouls.cjs` | PASS | 2.60 |
| `tests/game2.cjs` | PASS | 2.20 |
| `tests/heights_report.cjs` | PASS | 0.09 |
| `tests/individual_capabilities.cjs` | PASS | 0.14 |
| `tests/laws.cjs` | PASS | 3.68 |
| `tests/lead_pass.cjs` | PASS | 0.12 |
| `tests/offball.cjs` | PASS | 1.13 |
| `tests/offside.cjs` | PASS | 0.78 |
| `tests/offside_reference.cjs` | PASS | 0.10 |
| `tests/opponent_perception.cjs` | PASS | 0.21 |
| `tests/orientation.cjs` | PASS | 32.12 |
| `tests/owner_holdout.cjs` | PASS | 4.97 |
| `tests/perceptual_memory.cjs` | PASS | 0.26 |
| `tests/player_roles.cjs` | PASS | 15.17 |
| `tests/pressure_exposure.cjs` | PASS | 0.10 |
| `tests/reception.cjs` | PASS | 0.71 |
| `tests/relational_width.cjs` | PASS | 0.15 |
| `tests/simultaneous_threats.cjs` | PASS | 0.13 |
| `tests/support_assignment_perception.cjs` | PASS | 0.11 |
| `tests/support_destination_diagnosis.cjs` | PASS | 9.16 |
| `tests/support_diagnosis.cjs` | PASS | 14.69 |
| `tests/support_holdout.cjs` | PASS | 12.22 |
| `tests/support_perception.cjs` | PASS | 0.10 |
| `tests/support_persistence.cjs` | PASS | 0.25 |
| `tests/support_stability.cjs` | PASS | 9.43 |
| `tests/tactical_utility.cjs` | PASS | 0.06 |
| `tests/tracking.py` | PASS | 0.05 |
| `tests/turn_movement.cjs` | PASS | 0.12 |

La prueba específica de protección también se repitió después de reforzar la comprobación de inmutabilidad. Los tiempos dependen de la carga del entorno y no son un benchmark del videojuego.

---

Las secciones siguientes describen la recuperación histórica de 0.52.


## 20-10-2026 — Consolidación documental de 0.52

Repositorio `aanogom429-del/Fase-manager`, rama `main`. Base del motor y padre previsto de este commit documental: **a19f7435c22896d15e22f4d1a00033ac87c58cea**, 19-10-2026 21:38:58 UTC (23:38:58 Europe/Madrid). Mensaje: `Implement 0.52 pressure exposure and perceived local inferiority`.

El identificador de esta consolidación se consulta en `git log -1 -- PROJECT_CONTEXT.md ROADMAP.md DEVELOPMENT_LOG.md`: un documento no puede contener el hash de su propio commit sin cambiarlo. Se distingue ese commit documental del último commit que modifica el motor, indicado arriba.

Alcance: ejecutar las entradas automatizadas disponibles, registrar resultados y crear tres documentos raíz. No corregir motor, modificar pruebas ni iniciar la 0.53. Se preservan `docs/`, datos e instantáneas. No se importa ningún borrador no verificado de conversaciones anteriores.

## Historial relevante

| Versión / etapa | Commit representativo | Avance y límite |
|---|---|---|
| Base, octubre 2026 | `817c438` | Inicio del repositorio. |
| Corrección inicial | `5eb3c75` | Corrige acceso a poseedor nulo tras pases/tiros; incidencia histórica, no declarada reproducida en 0.52. |
| Decisiones guiadas | `fe91341`, `0856399` | Primera situación e integración de decisiones encadenadas. |
| Ataque y técnicas | `1dca2b6`, `9241136`, `7512ec4` | Técnicas contextuales, apoyos móviles, amplitud, profundidad y progresión. |
| 0.11–0.12 | `8b84a5b`, `b2423b5` | Espacios relacionales, contornos, continuidad y visor de tracking. |
| 0.13–0.14 | historial 14-10-2026 | Eventos de referencia, medidas y ajuste provisional; no calibración general. |
| 0.20–0.25 | docs/REGLAS_IMPLEMENTACION.md | Reanudaciones, fuera de juego, contacto, ventaja y disciplina en etapas; alcance reglamentario parcial. |
| 0.26–0.34 | docs/HOJA_DE_RUTA.md | Órdenes/coordinación, contrastes, referencias de posesión, roles, equilibrio y persistencia de apoyos. |
| Auditoría y 0.35 | `ef17476`, `57a685d`, `5b263c3` | Matriz de cobertura, apoyos contextuales y validación acotada. |
| 0.36 | `3b06482` | Orientación y percepción angular. |
| 0.37 | `0be1b1e` | Preparación de recepción rasa según orientación. |
| 0.38 | `1200c34`, `a9a8c03` | Anticipación y primer toque A→B→A/C; repetición sin carrera obligatoria. |
| 0.39 | `4200150` | Pase guiado al espacio con encuentro anticipado. |
| 0.40–0.41 | `3eca2f1`, `e46602b` | Recuerdos caducables y oposición percibida. |
| 0.42 | `35ee962` | Coste de giro en desplazamiento/llegada. |
| 0.43–0.45 | `e5f8b1a` | Aceleración/frenada, capacidades y memoria individual. |
| 0.46 | `bbc0e9d` | Apoyos percibidos, cabeceos/despejes y envío largo del portero. |
| 0.47 | `9cb0b6c`, `3ddb6e7`, `18d9d30` | Asignación perceptiva de apoyos y diagnósticos de referencia/destino. |
| 0.48 | `ea5bc91`, `3d56c90`, `1686f67` | Amplitud contextual, utilidad geométrica y pérdidas controladas. |
| 0.49 | `220641c` | Presión/temporización y cobertura contextual. |
| 0.50 | `5468bec` | Cobertura según amenaza y ayuda disponible. |
| 0.51 | `66589c6` | Amenazas simultáneas y conservación de líneas sin respaldo. |
| **0.52** | **`a19f743`** | Exposición de líneas de pase al presionar e inferioridad local percibida. |
| **0.53** | **Sin commit de implementación** | **Pendiente: protección de finalización y líneas de tiro expuestas. No iniciada en esta consolidación.** |

Los mensajes de commits identifican avances históricos; su presencia no acredita por sí sola pruebas satisfactorias. El resultado de la recuperación se documenta a continuación.

## Incidencias y límites conocidos

- Documentación acumulativa: `docs/HOJA_DE_RUTA.md` conserva referencias antiguas a 0.48 y prioridades reemplazadas. En `docs/REGLAS_IMPLEMENTACION.md` las entradas antiguas niegan mecanismos añadidos después (ventaja/tarjetas). Se conservan como historial; usar código 0.52 y los documentos raíz para el estado actual.
- Las seis comparaciones defensivas documentadas no acreditan mejora general; geometría de líneas no garantiza interceptación. 0.52 prueba destinos, no el resultado completo de jugadas con rival reactivo.
- Percepción sin balón parcialmente global; no hay atención/oclusión completas, resonancia empática suficiente, fatiga ni aprendizaje persistente.
- Reglamentación, portero, técnica aérea y ciclo adaptativo incompletos. Son pendientes de alcance, no fallos de ejecución demostrados por sí mismos.
- Los informes históricos reproducidos con fixtures 0.34/0.35/0.47 no validan automáticamente la 0.52. Mantener la separación entre regresión del motor actual y reproducibilidad de análisis pasados.
- La clonación inicialmente tardó en responder, pero finalmente se completó y HEAD coincidió con la base. No se atribuye esa demora al motor.

## Siguiente tarea y estado de la hoja de ruta

Tras esta consolidación, **la siguiente funcionalidad es 0.53**, protección de zona de finalización e identificación de líneas de tiro expuestas durante presión defensiva, con contracasos y jugadas ejecutadas. Criterios detallados en ROADMAP.md. No se ha programado.

**A en desarrollo:** A0 completado como auditoría; A1/A2/A4/A5/A6 parciales; A3 pendiente de modelo completo; A7 en curso sin cierre integral. Entrenamiento con retención/transferencia pendiente después del núcleo. **B pendiente:** videojuego comercial. **C pendiente:** adaptación iOS y publicación. Sin porcentaje de finalización ni cierre científico del marco.

## Ejecución automatizada de recuperación — 20-10-2026

Base exacta: `a19f7435c22896d15e22f4d1a00033ac87c58cea`. Entorno Linux, Node.js **v24.19.0**, Python **3.12.14**. Ejecución secuencial desde la raíz: `node tests/<archivo>.cjs` para cada uno de los 47 archivos CommonJS y `python tests/tracking.py`. Límite preventivo de 180 s por archivo.

**Resultado: 48/48 archivos PASS; 0 fallos de aserción, 0 errores de entorno y 0 timeouts.** La entrada Python contiene tres casos unittest. El total 48 cuenta archivos ejecutables, no aserciones individuales. No se cambiaron pruebas ni motor para obtener el resultado.

Cobertura: continuidad de posesión/vuelo/pausa/repetición/modos; decisiones y apoyos, defensa contextual y 0.52; orientación, aceleración, capacidades y recuerdos; acciones rasas/aéreas y primer toque; reanudaciones, fuera de juego, faltas, ventaja y disciplina; tracking y reproducción de informes históricos. Las pruebas de orientación incluyen simulación libre con semillas. No se ejecutaron pruebas visuales en navegador/iOS ni se certifica realismo de un partido completo.

Los informes basados en fixtures conservan su versión histórica; no se contabilizan como validación empírica nueva de 0.52. Dos pruebas escriben informes (`defense.cjs`, `offside_reference.cjs`): la comparación SHA-256 de los 160 archivos preexistentes antes/después y `git diff` confirman contenido idéntico. El commit documental no incluye informes regenerados, cachés ni logs temporales.

No se han detectado errores reproducidos en esta batería. Las lagunas funcionales y de validación descritas arriba permanecen abiertas.

### Inventario de resultados

| Entrada | Resultado | Duración (s) |
|---|---|---:|
| `tests/acceleration.cjs` | PASS | 0.20 |
| `tests/advantage.cjs` | PASS | 0.62 |
| `tests/aerial_play.cjs` | PASS | 1.91 |
| `tests/anticipation_first_touch.cjs` | PASS | 0.50 |
| `tests/attack_interactions.cjs` | PASS | 40.77 |
| `tests/attack_origin.cjs` | PASS | 0.59 |
| `tests/attacking_heights.cjs` | PASS | 0.22 |
| `tests/audit_continuity.cjs` | PASS | 2.67 |
| `tests/audit_windows.cjs` | PASS | 1.46 |
| `tests/contextual_defense.cjs` | PASS | 0.11 |
| `tests/contextual_supports.cjs` | PASS | 35.31 |
| `tests/contextual_width.cjs` | PASS | 0.15 |
| `tests/continuity.cjs` | PASS | 19.68 |
| `tests/defense.cjs` | PASS | 0.12 |
| `tests/defense_origin.cjs` | PASS | 0.18 |
| `tests/defense_replay.cjs` | PASS | 1.89 |
| `tests/defensive_coordination.cjs` | PASS | 0.11 |
| `tests/defensive_roles.cjs` | PASS | 0.20 |
| `tests/destination_trace.cjs` | PASS | 8.19 |
| `tests/discipline.cjs` | PASS | 0.51 |
| `tests/fouls.cjs` | PASS | 2.51 |
| `tests/game2.cjs` | PASS | 2.09 |
| `tests/heights_report.cjs` | PASS | 0.10 |
| `tests/individual_capabilities.cjs` | PASS | 0.15 |
| `tests/laws.cjs` | PASS | 3.39 |
| `tests/lead_pass.cjs` | PASS | 0.12 |
| `tests/offball.cjs` | PASS | 1.16 |
| `tests/offside.cjs` | PASS | 0.75 |
| `tests/offside_reference.cjs` | PASS | 0.10 |
| `tests/opponent_perception.cjs` | PASS | 0.21 |
| `tests/orientation.cjs` | PASS | 31.53 |
| `tests/owner_holdout.cjs` | PASS | 5.22 |
| `tests/perceptual_memory.cjs` | PASS | 0.28 |
| `tests/player_roles.cjs` | PASS | 14.70 |
| `tests/pressure_exposure.cjs` | PASS | 0.09 |
| `tests/reception.cjs` | PASS | 0.68 |
| `tests/relational_width.cjs` | PASS | 0.14 |
| `tests/simultaneous_threats.cjs` | PASS | 0.12 |
| `tests/support_assignment_perception.cjs` | PASS | 0.10 |
| `tests/support_destination_diagnosis.cjs` | PASS | 8.82 |
| `tests/support_diagnosis.cjs` | PASS | 12.62 |
| `tests/support_holdout.cjs` | PASS | 9.49 |
| `tests/support_perception.cjs` | PASS | 0.11 |
| `tests/support_persistence.cjs` | PASS | 0.24 |
| `tests/support_stability.cjs` | PASS | 9.25 |
| `tests/tactical_utility.cjs` | PASS | 0.06 |
| `tests/tracking.py` | PASS | 0.06 |
| `tests/turn_movement.cjs` | PASS | 0.14 |

### Reproducción

En una copia del commit de motor, con Node y Python disponibles, ejecutar todas las entradas conservando los códigos de salida:

```bash
failed=0
for test in tests/*.cjs; do
  node "$test" || failed=1
done
python tests/tracking.py || failed=1
exit "$failed"
```

Algunos scripts de `scripts/` son importadores/evaluadores y no entradas de pruebas; pueden requerir CSV externos o sobrescribir informes. No se ejecutaron indiscriminadamente. Las pruebas que los importan sí ejercitan sus funciones.

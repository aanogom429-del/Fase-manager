# Fase Manager — Contexto permanente del proyecto

Actualizado: 22-10-2026. Motor publicado: **0.53**, `main@82c6c02`. Referencia recuperada: `e28d784`, propuesta 0.53.1 **NO integrada**. Rama de investigación publicada: `codex/fase-manager-0.53.1-resume`. No se inicia 0.54.

Informe vigente de reanudación: [REANUDACION_0531.md](docs/REANUDACION_0531.md); informe anterior conservado: [CORRECCION_DEFENSIVA_0531.md](docs/CORRECCION_DEFENSIVA_0531.md). Antes de modificar archivos se comprobó que e28 y main existían en GitHub y que no había trabajo pendiente. Se localizaron y reejecutaron los 54 CommonJS y el archivo Python con tres casos: **55 entradas sin fallos**, sin heredar el PASS anterior. Dos pruebas adicionales verifican el nuevo control y su evidencia.

Se repiten sin caché las 76 situaciones para 0.52/0.53/e28 y un control de tiro observado; más 16 situaciones de otro control: **320 simulaciones nuevas** y ocho trazas adversas adicionales. Las 228 ejecuciones históricas coinciden exactamente con los informes recuperados. e28 mantiene 32 goles frente a 26/28 de 0.53/0.52. El tiro observado conserva goles/tiros, pero aumenta exposición y opciones de pase; relajar conservación de presión encaja 6 frente a 3 goles en 16 casos. Ambos controles quedan fuera del motor. `index.html` permanece idéntico a e28; no se integra ni publica una 0.53.1 inconsistente. Siguen pendientes selección y coordinación defensivas con evidencia suficiente.

Siguiente paso ejecutado: [viabilidad del relevo defensivo](docs/RELEVO_DEFENSIVO_0531.md). Se instrumentan pasivamente las 76 situaciones: sus resultados siguen idénticos a e28 y no aparece una propuesta que gane cobertura bajo los criterios examinados. Ocho situaciones diagnósticas nuevas añaden 16 simulaciones pareadas; aparece una secuencia con ganancia y coste estimado de acceso de unos 1,79 s. Una prueba espejo conserva una oportunidad local favorable y su contrario al percibir otro rival. No se implementa un intercambio automático sin validar su utilidad y acuerdo perceptivo. Verificación específica y límites en `data/defensive-relay-verification.json`.

Paso posterior ejecutado: [control de relevo demorado](docs/RELEVO_DEMORADO_0531.md). Se implementa fuera del motor y se prueba solicitud/aceptación/activación con tiempos propios desde la primera señal vista y sin leer intenciones privadas ajenas. Regresión nueva completa del repositorio: **59/59 entradas PASS** (58 CommonJS y un archivo Python con tres casos); comprobación aparte de 14 entradas sobre la fuente experimental: 14/14 PASS. En las 76 situaciones no envía solicitudes; diez diagnósticos nuevos envían seis pero no aceptan ni activan relevos. Las métricas siguen idénticas a e28. Dos sondas muestran que aproximarse antes todavía dejaría un rayo central sin cobertura antes del contacto posible. Se conserva el experimento y se descarta incorporarlo; 0.53.1 sigue sin aceptar, sin cambios en index.html ni main.


Nueva investigación desde `953855d`: [destinos intermedios](docs/DESTINOS_INTERMEDIOS_0531.md). Manteniendo los vetos de presión, disputa y pases, el control amplía los destinos sin modificar index.html. En 64 decisiones espejo ofrece seis elecciones protectoras frente a cuatro; en 76 simulaciones nuevas conserva exactamente las métricas de e28 (32 goles/77 tiros concedidos), con un único hash final distinto. Cuatro trazas nuevas confirman que pase/202 sigue perdiendo el bloqueo de 0.53. Verificación nueva: 59 entradas de la base más la nueva prueba incremental pasan; siete comprobaciones específicas experimentales pasan aparte. No se incorpora por falta de utilidad dinámica demostrada; las referencias 0.52/0.53/e28 son reutilizadas con procedencia comprobada. No se inicia 0.54.

Auditoría posterior: [preparación espacial previa al tiro](docs/PREPARACION_ESPACIAL_0531.md). Dieciséis simulaciones pasivas nuevas (ocho configuraciones × 0.53/e28) reproducen exactamente resultados históricos. La primera diferencia muestreada aparece a 0,05 s; en pase/202 la aproximación e28 ya es distinta desde la consulta inicial y pierde un rayo futuro a 0,10833 s, con intención pendiente. Pero la misma señal aparece en casos favorables y neutros: no basta para seleccionar protección. Se conserva el contrario equipo 1/pase/101. Pasan tres entradas previas y una nueva de pasividad/procedencia; no se reejecuta toda la batería. Sin cambios de motor ni main, 0.53.1 sigue sin aceptar y no se inicia 0.54.

Intervención posterior: [primera intención defensiva](docs/INTENCION_INICIAL_0531.md). 48 simulaciones nuevas (ocho configuraciones × dos motores × base/mismo destino/intercambio) aíslan un único destino almacenado, conservando plazos y movimiento físico. Los 32 controles sin cambio reproducen sus referencias. Intercambiar el primer destino invierte en ambos sentidos pase/202 del equipo 0 y pase/101 del equipo 1, pero añade un gol en libre/101 del equipo 1. No hay elección inicial consistentemente mejor; los prefijos muestreados antes del pase son iguales entre semillas. No se incorpora una regla retrospectiva. Regresión nueva completa en copia aislada: **62/62 entradas PASS**, con hashes actuales contrastados. Próximo análisis: primera lectura ordinaria posterior al pase, información visible y tiempo físico restante, manteniendo contrarios y demoras. Motor y main intactos; no se inicia 0.54.

## Objetivos y continuidad
Actualización 22-10-2026 por petición del usuario: [defensa real y principios](docs/DEFENSA_REAL_PRINCIPIOS_0531.md). Se analizan cuatro transiciones Game 1 y los cuatro primeros tiros Game 2, sin escoger por desenlace. Ocho secuencias, 820/918 frames completos; los 604 frames previos/simultáneos al tiro son completos. Se operacionalizan presión, temporización, contención, retroceso y protección de finalización como funciones compatibles. Se conservan un gol con defensor a 0,67 m y un bloqueo que contradice el radio geométrico de 1 m. Cinco pruebas del análisis pasan; no es validación nueva del motor. Prioridad siguiente: replay defensivo con ataque impuesto por tracking, defensores libres y referencias separadas; las ventanas examinadas son desarrollo, no reserva. La investigación causal sintética previa queda documentada, pero esta petición redirige el trabajo al contraste real. Motor/main intactos; 0.53.1 no aceptada, sin 0.54.


Videojuego de simulación futbolística basado en los espacios de fase de Paco Seirul·lo, el comportamiento colectivo y las decisiones individuales. Permite observar situaciones, intervenir como entrenador, comparar decisiones y continuar la simulación. Se conserva la secuencia **A) motor táctico y deportivo; B) videojuego comercial; C) adaptación a iOS**.

El código existente es la base del desarrollo: no reiniciar el proyecto, sustituirlo por un prototipo anterior ni sobrescribir funcionalidades. El posible borrador 0.53 mencionado en una conversación anterior no está acreditado como código integrado. La 0.53 actual se desarrolla y verifica desde esa base; no se importa aquel borrador.

Fuentes: código del commit indicado, historial Git y documentación de `docs/`. Los mensajes de conversación no sustituyen estas evidencias. Para estado vigente consultar [ROADMAP.md](ROADMAP.md); para resultados de pruebas e incidencias consultar [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md). Los documentos anteriores se conservan: sus entradas antiguas describen versiones históricas, aunque utilicen la palabra «vigente».

## Arquitectura

- `index.html`: aplicación monolítica con HTML, CSS, SVG y JavaScript sin framework. Incluye interfaz, estado, decisiones, física simplificada, arbitraje y visor de referencia.
- Simulación en navegador con `requestAnimationFrame` y acumulador a pasos de 1/120 s; movimiento acelerado integrado por subpasos. Campo lógico 100×64; parámetros de diseño no equivalen automáticamente a magnitudes calibradas de futbolistas reales.
- Estado en memoria: jugadores, orientación, velocidad, capacidades, recuerdos, posesión, vuelo, acción técnica, órdenes, reloj, marcador, faltas, ventaja y reanudaciones. Guardado/restauración de decisiones y semilla reproducible en modo guiado; modo libre usa azar.
- `data/`: referencias y resultados históricos más informes pareados, trazas y regresiones de 0.53.1; conservar procedencia y hashes.
- `docs/`: continuidad, protección 0.53, auditoría y corrección 0.53.1 con resultados y limitaciones.
- `scripts/`: herramientas Python/Node de importación, diagnóstico y comparación; `evaluate_finishing_v0531.cjs` reproduce comparación del candidato, control de tiro posterior descartado y trazas adversas.
- `tests/`: 61 entradas CommonJS y dos entradas Python (tres casos de tracking y cinco de análisis defensivo real); once instantáneas HTML (incluida una selección correctiva rechazada) en `tests/fixtures/`. Las pruebas específicas históricas 0.53 cargan su fixture; trayectoria, revisión y comparación comprueban la correctiva actual.
- `README.md`: descripción mínima. Antes de esta consolidación había 160 archivos versionados.

No hay proyecto nativo iOS, Capacitor, servidor de partidas, base de datos ni manifiesto `package.json` en esta base. Las pruebas Node usan `node:vm` y un DOM simulado; no equivalen a pruebas visuales en Safari/iPhone.

## Fundamentos y espacios de fase

El enfoque del proyecto es sistémico: las conductas dependen de las relaciones entre balón, compañeros, rivales y posibilidades de acción. La implementación es una operacionalización exploratoria, no una validación científica completa de la teoría.

| Criterio | Representación y límite |
|---|---|
| Zona del balón y ubicación | Posiciones, posesión y geometría; parte del conocimiento colectivo sigue siendo global. |
| Perfilación | Orientación corporal, giro limitado, filtro angular y coste en desplazamiento/recepción; sin mirada independiente ni oclusión completa. |
| Trayectorias | Velocidad, aceleración, frenada, vuelo, llegada aproximada y anticipación rasa; predictores simplificados. |
| Individualidad | Velocidad, precisión, reacción, aceleración, frenada, giro y duración de memoria; perfiles ilustrativos, sin cubrir las ocho áreas. |
| Relaciones y resonancia empática | Persistencia y coordinación básica de funciones; sin modelo suficiente de resonancia, comunicación o ajuste recíproco. |

`phaseRelations` clasifica interacción, apoyo mutuo y cooperación mediante acceso, conexión y cobertura. `phaseContour` dibuja envolventes convexas redondeadas: no representa todavía un campo completo de accesibilidad. No confundir clasificación visual con una política decisional completa. Ventajas numéricas, posicionales, cualitativas y dinámicas y el ciclo adaptativo conservan cobertura parcial.

## Comportamiento colectivo

`attackingTargets` y `selectAttackSupports` asignan dos apoyos persistentes, con valoración desde oposición percibida, amplitud contextual progresiva, profundidad, equilibrio y ocupación de remate. Hay anclajes de posesión y límites tácticos de fuera de juego; persiste coordinación central y acceso a datos globales.

`defensiveOrder`, `contextualDefense` y `defendingTarget` asignan presionante/cobertura, estiman llegada y ayuda disponible y consideran líneas percibidas y amenazas simultáneas. La 0.52 puede temporizar si presionar abandona una línea de pase sin respaldo o ante inferioridad local percibida; mantiene presión con acceso inmediato. La 0.53 añadió protección de corredores rasos; la 0.53.1 sustituye su preparación ficticia por tiro ejecutable inmediato, integra movimiento y contacto de vuelo y compara los costes de abandonar presión/pases. Solo usa información visible o memoria propia vigente; mantiene órdenes y demora. Informes históricos en [PROTECCION_FINALIZACION_053.md](docs/PROTECCION_FINALIZACION_053.md) y corrección en [CORRECCION_DEFENSIVA_0531.md](docs/CORRECCION_DEFENSIVA_0531.md).

Las órdenes guiadas sin balón incluyen apoyo, equilibrio, amplitud, profundidad, mantener posición, cobertura, presión y repliegue. Tienen demora, duración y prioridades; se cancelan según posesión y disponibilidad. Las transiciones limpian referencias ofensivas/defensivas y registran pérdidas. No constituyen todavía un ciclo adaptativo completo.

## Decisiones y acciones individuales

`chooseAction` puntúa pases y conducción y aplica condiciones/probabilidades para tiro, centro, despeje o envío del portero. Usa recuerdos de compañeros/rivales con caducidad e incertidumbre. La ejecución física y el arbitraje consultan el estado real. Los futbolistas **no aprenden de la práctica**: no hay entrenamiento de modelos ni mejora persistente.

Implementaciones acotadas: pase raso/elevado, pase al espacio guiado, paredes A→B→A y continuidad hacia C, primer toque condicionado con alternativa de control, preparación de recepción rasa por orientación, conducción, regate/finta guiados, protección/giro, tiro, centro, cabeceo y despeje raso/aéreo. `passExecution` introduce dispersión por distancia, presión y precisión. Una acción seleccionada no garantiza éxito.

Portero: posición básica, intervención sobre vuelos/remates, salida corta/larga y distribución aérea. No hay control explícito con manos, volea desde manos, salto individual ni repertorio completo de portero. El control orientado en movimiento, controles aéreos específicos, voleas, fatiga y contacto corporal detallado siguen pendientes.

## Reglas implementadas y límites

Se describe código existente, no una certificación arbitral ni una revisión normativa independiente.

| Área | Implementación acotada | Pendiente |
|---|---|---|
| Balón fuera/gol | Cruce completo y restricciones de gol directo de reanudaciones | Colisiones completas con postes/travesaño, agentes externos |
| Reanudaciones | Banda, meta, esquina, centro, directos, indirectos y penalti; colocación/distancias y segundo toque | Técnica corporal, desobediencia, demoras e infracciones detalladas |
| Fuera de juego | Registro al golpeo, sanción al tocar/recibir y exenciones directas de banda/meta/esquina | Interferencia sin toque, anatomía, rebotes/salvadas y otras excepciones |
| Contacto | Entrada baja legal, fallida o imprudente; directo/penalti | Manos, agarres, fuerza excesiva y demás conductas |
| Ventaja | Ventana provisional, beneficio observado y retorno a la falta | Ventaja en área, sanciones diferidas y situaciones más amplias |
| Disciplina | Ataque prometedor/ocasión manifiesta simplificados, amarillas, roja, segunda amarilla y mínimo de siete | Cobertura disciplinaria completa, sustituciones y expulsión de portero |
| Partido | Reloj, marcador y centro tras gol | Periodos, descanso, añadido, final reglamentario, balón a tierra y desempates |

Consultar [REGLAS_IMPLEMENTACION.md](docs/REGLAS_IMPLEMENTACION.md): sus secciones superiores actualizan las inferiores. Por ejemplo, los apartados históricos que niegan ventaja/tarjetas no describen la 0.52.

## Estado y evidencia

La etapa A está abierta; la propuesta 0.53.1 queda sin integrar por resultados tácticos insuficientemente consistentes. La propuesta 0.53.1 aporta coherencia temporal y comparación física comprobadas, pero no garantiza mejor resultado defensivo. Compara 76 configuraciones/228 simulaciones con 0.52 y 0.53, ambos equipos, orientaciones, ayudas y 16 condiciones de reserva inicial y otras 16 de confirmación de 12 s. El adverso auditado vuelve a 0 goles, pero se conserva, entre otros, el perjuicio equipo 0/pase/202 (0.53→0.53.1: 0→1). Los resultados agregados, tasas condicionadas, casos neutros, contrarios y límites figuran en el informe vigente. No son partidos independientes, xG ni validación externa. Permanecen las limitaciones de portero, conocimiento global de algunas capas, predicción general de vuelo y coordinación. Regresiones y comprobación Chromium se documentan en DEVELOPMENT_LOG.md; no se ha probado Safari/iOS.

Referencias de continuidad: [matriz](docs/MATRIZ_COBERTURA_TACTICA.md), [cierre del motor](docs/CIERRE_MOTOR_TACTICO.md), [hoja histórica](docs/HOJA_DE_RUTA.md), [avance 0.52](docs/PRESION_EXPOSICION_052.md).

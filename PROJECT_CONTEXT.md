# Fase Manager — Contexto permanente del proyecto

Actualizado: 20-10-2026. Motor actual: **0.53**, repositorio `aanogom429-del/Fase-manager`, rama `main`, commit anterior de motor `a19f7435c22896d15e22f4d1a00033ac87c58cea` (19-10-2026 21:38:58 UTC). La referencia anterior identifica el motor 0.52; el padre de la entrega 0.53 es `13c0330cc6abad294e0cc1552abb64b4bd71e46d`. La 0.53 se implementa de forma acotada según el informe enlazado, sin iniciar 0.54.

## Objetivos y continuidad

Videojuego de simulación futbolística basado en los espacios de fase de Paco Seirul·lo, el comportamiento colectivo y las decisiones individuales. Permite observar situaciones, intervenir como entrenador, comparar decisiones y continuar la simulación. Se conserva la secuencia **A) motor táctico y deportivo; B) videojuego comercial; C) adaptación a iOS**.

El código existente es la base del desarrollo: no reiniciar el proyecto, sustituirlo por un prototipo anterior ni sobrescribir funcionalidades. El posible borrador 0.53 mencionado en una conversación anterior no está acreditado como código integrado. La 0.53 actual se desarrolla y verifica desde esa base; no se importa aquel borrador.

Fuentes: código del commit indicado, historial Git y documentación de `docs/`. Los mensajes de conversación no sustituyen estas evidencias. Para estado vigente consultar [ROADMAP.md](ROADMAP.md); para resultados de pruebas e incidencias consultar [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md). Los documentos anteriores se conservan: sus entradas antiguas describen versiones históricas, aunque utilicen la palabra «vigente».

## Arquitectura

- `index.html`: aplicación monolítica con HTML, CSS, SVG y JavaScript sin framework. Incluye interfaz, estado, decisiones, física simplificada, arbitraje y visor de referencia.
- Simulación en navegador con `requestAnimationFrame` y acumulador a pasos de 1/120 s; movimiento acelerado integrado por subpasos. Campo lógico 100×64; parámetros de diseño no equivalen automáticamente a magnitudes calibradas de futbolistas reales.
- Estado en memoria: jugadores, orientación, velocidad, capacidades, recuerdos, posesión, vuelo, acción técnica, órdenes, reloj, marcador, faltas, ventaja y reanudaciones. Guardado/restauración de decisiones y semilla reproducible en modo guiado; modo libre usa azar.
- `data/`: 58 JSON de referencias, diagnósticos y resultados históricos.
- `docs/`: 15 documentos anteriores y el informe de protección de finalización 0.53.
- `scripts/`: 31 herramientas Python/Node para importación, diagnóstico y comparación.
- `tests/`: 49 entradas CommonJS y una entrada Python; ocho instantáneas HTML en `tests/fixtures/`.
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

`defensiveOrder`, `contextualDefense` y `defendingTarget` asignan presionante/cobertura, estiman llegada y ayuda disponible y consideran líneas percibidas y amenazas simultáneas. La 0.52 puede temporizar si presionar abandona una línea de pase sin respaldo o ante inferioridad local percibida; mantiene presión con acceso inmediato. La 0.53 añade protección de corredores rasos ante poseedor visible y conservación de cobertura, considerando orientación, movimiento y ayuda visible. Informe y contracasos en [PROTECCION_FINALIZACION_053.md](docs/PROTECCION_FINALIZACION_053.md).

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

La etapa A está abierta. La comparación dinámica 0.53 añade evidencia sintética acotada (3 parejas favorables, 16 sin cambio en goles y 1 adversa), no validación general. Existen pruebas funcionales, regresiones e informes con tracking de Metrica; reproducirlos no demuestra realismo general ni aprendizaje. Las ventanas históricas reutilizadas no son una reserva independiente. Las pruebas de la 0.52 aíslan destinos; la mejora defensiva general con rival reactivo no está demostrada. Resultado de la ejecución de recuperación y límites detallados en DEVELOPMENT_LOG.md.

Referencias de continuidad: [matriz](docs/MATRIZ_COBERTURA_TACTICA.md), [cierre del motor](docs/CIERRE_MOTOR_TACTICO.md), [hoja histórica](docs/HOJA_DE_RUTA.md), [avance 0.52](docs/PRESION_EXPOSICION_052.md).

# Fase Manager — Contexto permanente del proyecto

## Estado 0.57

Sobre 0.56: selección automática de pases y centros descarta receptores percibidos en fuera de juego. El motor conserva percepción limitada, conducción y exploración cuando no hay salida. No garantiza evitar todos los fueras de juego ni cambia la sanción reglamentaria o las decisiones manuales. Flujo autorizado: publicar rama y actualizar main tras pruebas; enlace de juego https://aanogom429-del.github.io/Fase-manager/. No continuar despliegues en Sites como vía habitual.

## Estado 0.56

Base: 0.55 corregida (simulación directa y guardado plegado). Mejora de apoyo: otra altura cuando la salida lateral sigue tapada, con información percibida y margen mínimo de utilidad. Ver ROADMAP.md y tests/support_escape.cjs. No modifica la política defensiva ni cierra A. Los guardados previos conservan su formato, pero sus resultados pueden cambiar al evolucionar el motor. Usuario autoriza publicar el proyecto en GitHub; conservar main y las ramas de investigación.

## Corrección: prioridad simulación

El usuario no considera prioritario guardar decisiones. Se priorizan simulación y motor táctico; guardado plegado como herramienta opcional. El botón superior estaba desactivado en choose/review guiados: ahora Simular partido entra en modo libre desde la posición actual; después pausa/reanuda. Se conserva la parada reglamentaria. PASS simulation_entry.cjs y continuity.cjs. Publicación GitHub de 0.55 bloqueada por revisión automática; código local conservado.

## 23-10-2026 — 0.55: comparación de decisiones

Incremento de estadísticas y experiencia del entrenador (B) sobre 0.54. La tabla conserva los últimos ocho intentos terminados desde una misma situación: intención, órdenes sin balón, duración simulada, posesión final, desplazamiento longitudinal del balón, tiros totales de ambos equipos y goles azul/rojo. «Comparar otra decisión» conserva la tabla y restaura el punto de partida. Continuar, reiniciar, cambiar de modo o recuperar un guardado limpia la comparación. Importar un archivo solo escribe un espacio: no limpia la comparación hasta recuperarlo.

Los intentos pueden terminar tras duraciones distintas. Avance positivo significa hacia portería roja; no equivale a una puntuación táctica ni a un ranking. Los resultados no se guardan ni exportan; los guardados 0.54 siguen siendo compatibles. Motor táctico sin modificaciones; A2/A4/A7 siguen abiertos y 0.53.1 permanece aparcada.

Publicación de prueba: se actualiza el Site existente, conservando su URL y acceso privado. La URL contiene 054 por continuidad, pero el encabezado muestra la versión vigente. GitHub: rama `codex/fase-manager-0.55`, sin modificar main.


## 23-10-2026 — 0.54: situaciones portátiles

Entrega independiente solicitada por el usuario para avanzar la hoja de ruta. Parte de `63e5d82` (tres guardados locales) y conserva la investigación 0.53.1 aparcada. Añade exportación JSON de la decisión guiada actual y carga de archivos en uno de los tres espacios. La carga no modifica la jugada en pantalla; Recuperar decisión la restaura pausada. Conserva el formato de los guardados anteriores y la semilla reproducible.

Se comprueban tamaño, versión, integridad y estructura antes de escribir; se rechazan claves peligrosas y cadenas con marcado HTML. El espacio de destino se fija antes de leer el archivo. Un error de lectura, validación o almacenamiento no sustituye el guardado anterior. El checksum detecta corrupción accidental, no autentica al autor de un archivo.

Alcance: avance de persistencia de B; motor táctico 0.53 sin cambios. A2/A4/A7 y las demás lagunas tácticas siguen abiertas. No se declara cerrada la etapa A ni validada la defensa 0.53.1. Las menciones inferiores a «no iniciar 0.54» son históricas y quedan sustituidas por esta entrega. Descarga y selector de archivos pendientes de comprobación real en Safari/iPhone; pruebas Node con DOM simulado.


## 23-10-2026 — Prioridad vigente: entregas acotadas y guardado de decisiones

Por instrucción del usuario se cierra la ronda abierta de investigación: **0.53.1 queda aparcada, no aceptada para main**. No se exige resolverla para avanzar en tareas independientes. Las prioridades históricas de continuar indefinidamente 0.53.1 quedan sustituidas por esta decisión; A4/A7 siguen abiertos.

Recuperación verificada: `main@82c6c02`, remoto de investigación `5ecf9ed` y local `5d610b1`. Se reúnen las dos líneas en `d172bd5` (rama `codex/fase-manager-0.53.1-preserved`), conservando ambos informes, pruebas y datos. Los cambios pendientes de otras carpetas no se tocan. La mejora independiente parte deliberadamente de la 0.53 estable en `codex/fase-manager-decision-storage`; no incorpora la política defensiva rechazada ni borra su investigación.

Entrega: tres espacios locales para guardar una decisión pausada del modo guiado y recuperarla tras cerrar/abrir la aplicación. Conserva posiciones, memoria perceptiva, órdenes, marcador, reloj, disciplina, selección técnica y semilla; se recupera pausada. Se bloquea guardar durante ejecución, balón libre, reanudaciones y modo libre. Se informa de espacios vacíos, datos incompatibles/dañados y almacenamiento bloqueado/lleno. No hay sincronización entre dispositivos, importación externa, autoguardado ni partidas completas en vuelo.

Es un adelanto acotado de persistencia de B autorizado al desbloquear tareas independientes; no declara terminada A ni el videojuego comercial. Motor táctico sin cambios respecto a 0.53. El siguiente incremento debe elegir un requisito independiente y terminar en una función comprobable, con regresiones pertinentes; no reiniciar una investigación defensiva abierta sin un objetivo acotado.


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

# Fase Manager — Registro de desarrollo y recuperación

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

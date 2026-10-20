# Fase Manager — Registro de desarrollo y recuperación

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

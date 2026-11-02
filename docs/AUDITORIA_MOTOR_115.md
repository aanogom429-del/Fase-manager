# Auditoría del motor y del cambio diagonal — 2 de noviembre de 2026

Base: 0.114, main 577fecd01a951f75308b45f9a779a8cd6dbcb00d. Barrido en copia aislada del commit, para que las pruebas que regeneran datos no modifiquen el proyecto. 110 programas CommonJS + 3 Python; cinco procesos concurrentes, límite 45 s por programa. Se cuentan archivos, no aserciones individuales. Después se repitieron pruebas dirigidas; no hubo un segundo barrido completo de la 0.115.

## Resultado del barrido inicial

85 PASS, 24 FAIL y 4 LIMIT. Los LIMIT no son fallos demostrados ni aprobados. No se corrigieron expectativas tácticas solo para que pasasen. Tres diagnósticos tenían preparaciones incompatibles con el motor actual: dos buscaban un fragmento que ya no existía y los ensayos que iniciaban vuelos prescritos debían perfilar al pasador. Tras reparar la instrumentación, cross_cutback_relays, defensive_arrival y cutback_protection pasan. Los otros dos fallos reproducidos y resueltos, fouls y discipline, revelaron una reanudación prematura al girar: ahora la situación de saque se mantiene hasta el golpeo real. Ambas pruebas originales pasan sin relajar las distancias ni suprimir el giro.

Quedan 19 fallos del barrido por investigar y 4 ejecuciones sin concluir. No confundir 24 fallos de pruebas con 24 defectos independientes. Algunas pruebas leen el vuelo inmediato cuando puede haber giro pendiente; otras exigen mensajes, alturas o etiquetas de fases anteriores. No se presume que todo sea obsoleto: hay señales relevantes sobre movimientos, disponibilidad de pases y recuperación de posición.

**Fallos abiertos:** attacking_heights.cjs, automatic_lead_pass.cjs, cross_selection.cjs, line_structure.cjs, offball.cjs, offball_spacing_perception.cjs, onside_decisions.cjs, onside_recovery.cjs, organizing_memory.cjs, organizing_possession.cjs, organizing_progression.cjs, perceptual_memory.cjs, player_roles.cjs, possession_shape.cjs, progressive_outlet.cjs, reception.cjs, safe_outlet.cjs, shot_selection.cjs, teammate_spacing_perception.cjs.

**Sin concluir:** attack_interactions.cjs, contextual_supports.cjs, line_autonomous.cjs, orientation.cjs.

**PASS iniciales:** acceleration.cjs, advantage.cjs, aerial_play.cjs, anticipation_first_touch.cjs, area_block.cjs, attack_origin.cjs, attack_space.cjs, audit_continuity.cjs, audit_windows.cjs, block_phase.cjs, block_stability.cjs, body_profile.cjs, buildup_circulation.cjs, containment_perception.cjs, containment_reference.cjs, contextual_defense.cjs, contextual_width.cjs, continuity.cjs, decision_comparison.cjs, decision_portable.cjs, decision_storage.cjs, decision_storage_edges.cjs, defense.cjs, defense_origin.cjs, defense_replay.cjs, defensive_block.cjs, defensive_chain.cjs, defensive_coordination.cjs, defensive_relay.cjs, defensive_roles.cjs, destination_trace.cjs, finishing_dynamic.cjs, finishing_protection.cjs, formation_selection.cjs, game2.cjs, game3_structure.py, game_phases.cjs, heights_report.cjs, hybrid_defense.cjs, individual_capabilities.cjs, keeper_catch.cjs, keeper_distribution.cjs, keeper_long_target.cjs, keeper_window.cjs, kick_orientation.cjs, lateral_carry.cjs, laws.cjs, lead_pass.cjs, line_arrival.cjs, line_chain.cjs, line_collective.cjs, moving_reception.cjs, offside.cjs, offside_reference.cjs, open_reception.cjs, opponent_perception.cjs, outlet_grade.cjs, owner_holdout.cjs, pressure_exposure.cjs, receiving_reference.cjs, recovery_outlet.cjs, recovery_reorder.cjs, relational_width.cjs, run_spacing.cjs, short_carry.cjs, simulation_entry.cjs, simultaneous_threats.cjs, skillcorner_returns.py, space_functions.cjs, spacing_confidence.cjs, spacing_possession.cjs, structural_supports.cjs, support_assignment_perception.cjs, support_destination_diagnosis.cjs, support_diagnosis.cjs, support_escape.cjs, support_holdout.cjs, support_perception.cjs, support_persistence.cjs, support_stability.cjs, tactical_utility.cjs, tracking.py, turn_movement.cjs, zonal_centre.cjs, zonal_handoff.cjs.

## Diagonales: movimiento real de la defensa

Nuevo ensayo tests/diagonal_arrival.cjs, dos equipos × dos bandas × dos semillas. Mismo arranque en cada pareja, pase diagonal elevado real, desplazamiento autónomo a partir del golpeo. Variante solo en el ensayo: anticipar lateralmente la trayectoria tras observarla, con proyección limitada; no anticipar profundidad ni romper líneas. Medida principal: distancia real del defensor de campo más próximo al receptor al terminar el vuelo. Segunda medida: desplazamiento medio lateral de los defensores hacia el lado de llegada.

| Defensa / banda invertida | Semillas | Distancia antes → después (unidades de campo) |
|---|---|---|
| Azul / no | 401; 502 | 14,08 → 12,52; 13,95 → 12,36 |
| Azul / sí | 401; 502 | 18,32 → 18,42; 18,00 → 18,05 |
| Roja / no | 401; 502 | 14,28 → 12,84; 14,43 → 12,81 |
| Roja / sí | 401; 502 | 17,78 → 17,98; 18,06 → 18,10 |

Basculación media mayor en 8/8; acceso al receptor mejora en 4 y empeora en 4. Los ocho receptores controlan en ambas variantes. En estos escenarios el bloque se desplaza, pero **no llega a disputar la recepción**. La variante no se incorpora al motor publicado. Las geometrías y puestos no son una muestra representativa de partidos; no se infiere eficacia general.

## Estado por área y orden de trabajo

| Área | Evidencia favorable | Riesgo abierto |
|---|---|---|
| Estructura y espacios de fase | Pasan espacios funcionales, separación física y apoyos estructurales | Fallan alturas, anchura y compensación en escenarios anteriores. Distinguir expectativa de destino de espacio realmente accesible. |
| Ataque y conservación | Pasan recuperación/descarga, circulación, perfiles y salidas del portero | Fallos en pase disponible, memoria, conducción y selección de remate. Comparar pase preparado, pase ejecutado y decisión equivocada. |
| Defensa y transición | Pasan relevo zonal, marcaje mixto, bloque/área y protección contextual | Diagonal y acceso físico al receptor; el diagnóstico autónomo muestra relevos que duran poco. Las trampas en banda aún no están integradas como mecanismo colectivo probado. |
| Técnica y reglas | Cobertura de varias reanudaciones, fuera de juego, juego aéreo y portero | Se corrigió giro durante saque; quedan pruebas de recepción y decisiones sobre habilitación. No equivale a implementación completa del reglamento. |
| Jugabilidad y validación | Pasan entrada a simulación, continuidad, pausa, reintento y almacenamiento en entorno de pruebas | No verificado visualmente en Safari/iPhone en esta auditoría. Los tres tests Python pasan, pero eso no valida científicamente el realismo. |

**Prioridad inmediata:** 1) reproducir fallos de anchura, compensación y líneas de pase con trazas, empezando por possession_shape, line_structure y offball_spacing_perception; 2) clasificar los fallos de decisión y ejecución restantes, y repetir los cuatro casos largos con presupuesto propio; 3) validar acceso físico del defensor del lado débil y cobertura del carril interior antes de añadir trampas en banda. Los siete bloques de la hoja de ruta siguen abiertos; no hay base para una fecha o porcentaje de finalización.

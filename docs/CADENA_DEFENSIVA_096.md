# 0.96 — Compensar la vacante secundaria

Validación: PASS en defensive_chain, defensive_relay, defensive_block, area_block, finishing_dynamic, continuity, offball, decision_storage y simulation_entry. Nueve entradas seleccionadas, no batería completa ni Safari/iOS real. git diff --check sin incidencias.

Extiende 0.95: después de asignar un medio al puesto del presionante de última línea, considera la referencia nominal que deja ese medio. Un jugador de línea avanzada puede cubrirla con las mismas reglas: no presionante/cobertura, sin orden comprometida, radio <=18, selección por arrivalTime y retención con margen 0,6 s. Si otro destino ya cubre la referencia (<5), no añade relevo.

Cada enlace avanza exactamente una línea de origen: defensa←medio←ataque. Máximo dos enlaces, sin ciclos ni jugadores duplicados. No cubre la vacante final de ataque. Reutiliza defSlotFor, sin nuevos campos persistentes, conserva la limpieza y restauración de 0.95. Si termina la salida original se libera toda la cadena; si solo falla el segundo candidato se conserva el primer relevo.

Prueba defensive_chain: cuatro sistemas × dos equipos, dos referencias únicas, orden acíclico, prioridad de órdenes, distancia, mantenimiento del primer enlace, recuperación del segundo, liberación completa, no teleport ni cambio de rol. Parámetros heurísticos; asignar destino no demuestra ocupación física ni mejora de seguridad frente a centros. Pendiente contrastar llegada real y vacantes finales con oposición y situaciones de pase atrás. Siete bloques siguen abiertos.

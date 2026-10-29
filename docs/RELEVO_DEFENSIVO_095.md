# 0.95 — Relevar al defensor que presiona

Validación: PASS en defensive_relay, defensive_block, area_block, finishing_dynamic, continuity, offball, decision_storage y simulation_entry. Ocho entradas seleccionadas, no batería completa ni Safari/iOS. git diff --check sin incidencias.

defensiveBlockTargets calcula también referencias nominales para presionante y cobertura. Si el presionante pertenece a última línea, está a >4 unidades de su referencia y su destino a >6, se considera una salida. Si otro destino ya está a <5 de esa referencia no se añade sustituto.

Elige un jugador de línea media entre los no asignados a presión/cobertura, sin orden comprometida y a <=18 unidades. Menor arrivalTime; conserva incumbente si su llegada está a <=0,6 s del mejor. Lo dirige al puesto abandonado, no al balón. Campo primitivo defSlotFor incluido por los snapshots existentes y limpiado junto a defDuty en pérdidas/reinicios y al recuperar posesión. El relevo se libera cuando deja de cumplirse la salida/elegibilidad; no cambia dorsal ni rol. Parámetros heurísticos, no calibrados con tracking.

Límites: una sola vacante, solo presionante de última línea; no cubre todavía el puesto del medio que baja ni garantiza llegada física a tiempo. Las funciones de presión/cobertura pueden cambiar; la reserva por destino no equivale a ocupación actual. No incorpora referencias rivales ocultas. Pendientes: vacante secundaria, exposición a centros/pase atrás y aglomeración física sostenida. No cierra los siete bloques.

defensive_relay verifica cuatro sistemas × dos sentidos, destino del lado propio, un sustituto, no teleport, exclusión por distancia, órdenes y cobertura, y liberación al terminar la función. Pruebas previas de bloque/área continúan verificando casos sin salida de un defensor. Reproducir con Node; no es una prueba de navegador real.

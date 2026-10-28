# 0.92 — No compartir destinos ofensivos

Validación adicional: simulation_entry y continuity PASS (entrada/salida de modos, pausa, reintento y continuidad). Siete entradas seleccionadas en total; no batería completa ni Safari/iOS real.

Después de calcular destinos individuales, distributeAttackSpace coordina su distribución. Reserva poseedor, recepción prevista, órdenes activas y pared. Procesa seguridad, compensaciones, apoyos y restantes puestos en ese orden; desempate estable por id. Evalúa desplazamientos laterales 0, ±6, ±12, sin cambiar profundidad, con coste de proximidad a destinos reservados (<6), desplazamiento desde referencia y pérdida de espacio frente a oposición percibida. Traza visible: «Ocupación racional · espacio propio».

No consulta rivales ocultos, aunque la coordinación de destinos de compañeros es colectiva/global, como la asignación estructural existente. Mantiene límite longitudinal de fuera de juego, profundidades de seguridad, sistemas y prioridades explícitas. No teletransporta: persisten reacción, aceleración y orientación. No cambia defensa.

Principio implementado de forma aproximada: separa espacios de destino, no prohíbe asociaciones cercanas ni cruces. Radio 6 y offsets son heurísticos. No garantiza separación absoluta: destinos protegidos pueden coincidir y el espacio disponible/las presiones pueden limitar alternativas. Correcciones laterales pueden alterar carriles hasta 12 unidades; no hay aún optimización conjunta de toda la red, separación temporal ni choque físico.

Pruebas: attack_space (seis fixtures de bandas/centro y ambos equipos, prioridad de reserva, profundidad, no teleport; ocho fixtures integrados por sistema), line_structure, formation_selection, offball y line_autonomous PASS. En los ocho fixtures integrados, parejas de destinos a <5,99 unidades pasan de 4 a 0 frente al mismo motor sin la distribución. No son posiciones reales durante partido.

Contraste autónomo de ocho situaciones de 20 s: posiciones finitas y referencias únicas. Resultados tácticos mixtos; 3-5-2 inicio azul aumenta observaciones de salidas sin sustituto 207→487 y rojo 298→409 respecto a 0.91. No atribuir mejora global al descenso de coincidencias de destinos. Pendientes: medir proximidad física sostenida, estabilidad de carriles y red de pase/seguridad en nuevas posesiones prolongadas. Siete bloques de auditoría abiertos.

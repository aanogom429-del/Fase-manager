# 0.93 — Líneas defensivas coordinadas

Validación adicional: finishing_dynamic PASS (reproducción histórica, movimiento determinista del motor actual y pase prescrito). Diez entradas seleccionadas en total; no batería completa ni prueba real de Safari/iOS.

Petición: bascular como bloque, repartir zonas y evitar que varios jugadores persigan el balón. Se conserva defensiveOrder (un presionante y una cobertura estables). defensiveBlockTargets integra en movement una referencia compartida para los demás, usando el sistema seleccionado y las tres líneas funcionales existentes.

En coordenadas desde portería propia: línea avanzada clamp(profundidad del balón − 8, 12, 88), intervalo entre líneas min(8,(altura avanzada−3)/2). La lectura individual previa ajusta profundidad como máximo ±1,5. Anchura de carriles del sistema comprimida a 75%, desplazamiento lateral común de 25% del balón respecto al centro. Conserva variantes de carriles por sistema; esta agrupación aproxima tres líneas incluso en 4-2-3-1. Parámetros heurísticos, no aprendidos de tracking.

Presión/protección de tiro y pase conservan la política contextual. Si el destino de cobertura cae a menos de 5 unidades del balón se desplaza al lado propio y a un lado lateral. Órdenes, intercepción de vuelo, recepción, disputa y portero conservan prioridad. Sin balón controlado/en vuelo (balón suelto) se mantiene la conducta anterior. Movimiento físico y demoras permanecen: no se imponen posiciones instantáneas.

Límites: no asegura separación de trayectorias ni de posiciones actuales; presionante/cobertura pueden atravesar zonas de compañeros. Las órdenes pueden romper el bloque. Cerca de portería propia se comprime y las referencias avanzadas pueden quedar por delante del balón: falta contextualizar defensa de área/última línea y compensar el puesto abandonado por quien presiona. No es marcaje zonal completo ni defensa superior demostrada; los ajustes perceptivos individuales quedan acotados, no eliminados.

Pruebas: defensive_block (4 sistemas ×2 equipos, basculación común, ancho de línea longitudinal <=3, separación lateral entre puestos >=6, un presionante/cobertura, no teleport e integración en movement); containment_reference, contextual_defense, finishing_protection, pressure_exposure, line_autonomous, continuity, offball y simulation_entry. PASS en las nueve entradas. Pruebas unitarias de defensa previa validan esa política, no por sí solas todos los destinos finales. Ocho simulaciones autónomas de 20 s conservan coordenadas finitas y referencias válidas; resultados tácticos mixtos, sin inferir mejora a partir de recuentos ofensivos.

Siguiente validación: medir aglomeración física sostenida, distancias interlíneas y exposición de área tras pérdida con nuevos escenarios. Los siete bloques de auditoría permanecen abiertos.

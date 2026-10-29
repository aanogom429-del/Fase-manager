# 0.94 — Última línea y lado débil

Validación: PASS en area_block, defensive_block, finishing_protection, finishing_dynamic, continuity y simulation_entry. Seis entradas seleccionadas; no batería completa ni Safari/iOS real. La prueba dinámica confirma reproducibilidad y ejecución, no superioridad defensiva.

Sobre 0.93, la última línea (salvo presionante/cobertura) cierra progresivamente anchura y reduce desplazamiento hacia la banda cuando el balón está cerca de su portería. Mezcla clamp((30−profundidad)/15,0,1): ancho 0,75→0,55 y seguimiento lateral 0,25→0,15. Mantiene carriles relativos del sistema y zonas diferenciadas. Limita además su destino longitudinal a profundidad del balón−2, con mínimo interior 2. No fuerza a todas las líneas a meterse detrás de un balón pegado a la línea de fondo.

Parámetros heurísticos. Mantiene presión, cobertura, líneas superiores, órdenes, movimientos físicos y prioridades inmediatas. No añade marcaje de receptores del centro, asignación de postes ni cobertura del puesto del presionante. No garantiza impedir remate ni mejora defensiva general.

area_block prueba cuatro sistemas × dos equipos × dos bandas: centro del bloque menos arrastrado, menor anchura alrededor de ese centro, zonas separadas >7 unidades, margen longitudinal y continuidad en umbral. La primera comprobación exigía erróneamente que cada puesto individual se acercase al centro exacto del campo; se corrigió para comprobar centro y anchura compartidos (un puesto que estaba exactamente centrado puede desplazarse ligeramente al recomponer la línea).

Pendientes: distancias físicas y exposición a centros/pase atrás con oposición nueva, evitar aglomeración sostenida y compensar al defensor que sale. No se cierran los siete bloques de auditoría.

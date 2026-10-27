# 0.87 — Referencias de línea y compensación temporal

Cada puesto conserva su referencia del sistema y una agrupación funcional: defensa (offset <=−20), medio (<=5), ataque (>5), portero excluido. El 4-2-3-1 conserva sus alturas internas; estas tres agrupaciones no lo convierten en tres líneas planas.

Si un defensor o medio que actúa como poseedor/receptor, apoyo o bajo orden de profundidad está más de 8 unidades adelantado a su referencia durante al menos 1 s, se busca un sustituto de la línea inmediatamente posterior a no más de 24 unidades de la vacante. Prioridad al sustituto ya asignado. Cada candidato cubre una sola vacante; se excluyen portero, receptor, apoyos, seguridades, jugadores con órdenes y otras salidas confirmadas. No se cambian dorsal ni rol original.

El destino estructural del sustituto pasa a la referencia del puesto vacante, con la mezcla progresiva y física existentes. Cuando termina la función de avance o se vuelve cerca del puesto, la compensación se desactiva y cada jugador recupera su referencia. No hay teletransporte ni regreso instantáneo. Las trazas muestran «Compensar línea» y «Retorno a referencia».

Límites: coordinación colectiva global, sin inferencia de intención real; parámetros heurísticos, no aprendidos de SkillCorner. Solo arquitectura con balón; no genera por sí misma nuevos desdoblamientos, no completa permutas permanentes ni compensaciones en cadena, y no garantiza que la vacante esté cubierta antes de la salida. La salida del sustituto puede dejar otro espacio: falta evaluar el equilibrio colectivo. Apoyos y seguridades siguen teniendo prioridad sobre esta regla. No es un detector de líneas en tracking real.

Pruebas: line_structure cubre cuatro sistemas y ambos sentidos, espera, sustitución entre líneas, movimiento físico, prioridades, retorno y restauración. Incluye integración en attackingTargets aislando la selección de apoyos; el caso rojo inicialmente falló por una banda no reflejada en la fixture y se corrigió su simetría. El resto de regresiones se ejecuta sin esa instrumentación. No validación Safari/iOS ni de partido completo. El fallo preexistente de decision_storage sigue pendiente.

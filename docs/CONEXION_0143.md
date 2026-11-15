# 0.143 · Conexión de pase antes de cambiar de carril

La preferencia de complementariedad de 0.142 verificaba que el destino estuviese libre, pero no que el pase desde el poseedor pudiera atravesar el espacio intermedio. Un defensor podía bloquear esa conexión sin estar cerca del destino.

Ahora el lateral/carrilero necesita una observación del poseedor del mismo equipo de hace como máximo 0,25 s. Valora la línea desde esa posición observada hasta la alternativa con su propia memoria de oposición; si el riesgo percibido supera 3, descarta la preferencia. Sin poseedor conocido o durante vuelo sin dueño no activa esta regla. No consulta posiciones ocultas ni presupone quién recibirá.

El inspector indica si se descarta por falta de observación reciente del poseedor o conexión bloqueada. Permanecen las restricciones de espacio, orientación, compañeros, equilibrio, apoyos y órdenes de 0.142. Al descartar se utiliza el reparto anterior; no se congela al jugador ni se garantiza que otros motivos tácticos nunca lo conduzcan a otra posición. El filtro se aplica a esta preferencia concreta, no a todas las decisiones del motor. Tampoco garantiza éxito del pase, elección del poseedor o utilidad temporal del apoyo.

## Pruebas

flank_connection reproduce en cuatro reflejos de equipo/lado un destino libre con pase bloqueado y salida actual disponible. Falla en 0.142 y pasa en 0.143. Comprueba conexión abierta, oposición recordada, poseedor desactualizado/ausente y que cambiar coordenadas reales no observadas no altere la lectura. flank_complement incluye ahora al poseedor en la memoria de los casos favorables.

Pasan seis programas: flank_connection, flank_complement, continuity, offball_arrow_lifecycle, positional_matrix y null_support_focus. No barrido global, Safari ni validación con partido real. Datos comparativos de cuatro simulaciones de 30 s por variante en data/flank-connection-143.json. Los umbrales y la muestra son diagnósticos, no estándares futbolísticos.

Siguiente foco: estabilidad de la función entre observaciones, llegada efectiva y posibilidad real de recibir tras cambiar el balón de sector. Concentración general y matriz completa siguen pendientes.

Resultado agregado: en ambas variantes, 174 muestras con poseedor, 20 agrupadas, 204 observaciones de parejas próximas, una muestra estrecha y 14 cambios de posesión. Pases122→123. No demuestra mejora global de separación.

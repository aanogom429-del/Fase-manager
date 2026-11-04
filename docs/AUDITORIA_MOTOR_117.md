# Auditoría global de Fase Manager 0.117

4 de noviembre de 2026. Motor publicado en c31799e07bb9f7638e8710bb9c6e761e73bf13ec. Se ejecutaron los 111 programas CommonJS y los dos programas Python presentes en tests de ese commit. La auditoría histórica incluía skillcorner_returns.py, ausente del árbol examinado.

## Resultados

Primer barrido en una copia del commit, seis procesos y límite de 300 segundos por programa: 93 aprobados, 14 fallidos y 6 sin concluir. Se repitieron los seis con dos procesos simultáneos y límite de 900 segundos: pasaron orientation, line_autonomous, attack_interactions, contextual_supports, defensive_arrival y finishing_dynamic.

La prueba progressive_outlet asumía vuelo inmediato. En el caso del pase profundo el motor completó el giro y dirigió el pase al dorsal 10 tras diez fotogramas en ambos sentidos. Con la línea profunda tapada eligió al dorsal 8. El commit f8b31daf corrige el ensayo y pasa sus casos de línea abierta, cerrada, marca y receptor fuera de visión. Resultado acumulado tras las repeticiones: **100 aprobados, 13 fallidos, 0 sin concluir**. El motor es el mismo y no se repitieron los restantes programas tras editar únicamente esa prueba.

## Fallos que siguen abiertos

attacking_heights, automatic_lead_pass, cross_selection, offball, onside_decisions, organizing_memory, organizing_progression, organizing_possession, perceptual_memory, player_roles, reception, safe_outlet, shot_selection.

## Prioridad táctica

En attacking_heights, con el balón en x=50 y los interiores en x=75, el reparto de puestos del 4-3-3 fija destinos longitudinales normalizados de 49,65 y 53,55 para los dorsales 7 y 8. La traza es simétrica en ambos equipos. El ajuste aparece en la arquitectura por puesto, después del límite de equilibrio. Antes de modificar el motor, medir en juego autónomo si el retorno conserva una opción progresiva accesible y mantiene un apoyo de seguridad. Las pruebas que leen un vuelo nulo o exigen un texto exacto deben investigarse por separado. No se obtuvo una validación visual en Safari/iPhone.
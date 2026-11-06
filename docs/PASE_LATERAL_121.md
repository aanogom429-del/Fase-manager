# Fase Manager 0.121 — Pases a apoyos en movimiento

6 de noviembre de 2026. Base: 719e00a25490386fd38b7fc5c2b38a63c489f5e9 (motor 0.120). Motor 0.121: 1bf3d0ccb8a468921cd499ee177fdfb6f548bb42, blob 85ad981d5fcb13804097fa34a34367aee7206b97. Prueba: ec2d9b5ea84076bbef636bc79a622d8135b16ee2.

## Mejora de comportamiento

La selección automática anticipaba únicamente desplazamientos con avance longitudinal superior a 0.5 unidades. Un compañero observado corriendo lateralmente recibía el pase dirigido a su posición actual, aunque el modelo de encuentro ya permitía calcular una posición adelantada sobre su recorrido.

Ahora también se admite anticipación lateral superior a 0.5 unidades si no supone retroceso longitudinal. Se reutiliza leadPassTarget: velocidad observada constante, horizonte máximo provisional de 1.2 s, límites del campo y comprobación de alcance. Se conservan visibilidad actual del receptor y destino, alcance del pase entre 5 y 42 unidades, control de riesgo de línea y presión respecto al pase a los pies, y fuera de juego en la posición del receptor. Las velocidades ocultas no se extrapolan. El pase puede seguir fallando por dispersión técnica o cambios posteriores de movimiento.

No se ha introducido una nueva prioridad absoluta de pase: cambia el destino candidato dentro de la selección existente. El umbral lateral reutiliza la escala provisional ya usada para avance; no es una calibración científica.

## Evidencia y contracasos

La prueba anterior automatic_lead_pass fallaba por exigir el mensaje histórico «pasa al espacio»; el envío adelantado ya ocurría por otra rama. Se elimina esa dependencia del texto y se espera el giro previo para comprobar el pase ejecutado.

Se añaden 64 pares de escenarios: dos equipos, dos direcciones laterales y 16 semillas. En el caso libre se exige destino adelantado más de dos unidades sobre el recorrido lateral y misma profundidad; con rival junto al destino anticipado se exige pase a la posición actual. Son 128 decisiones nuevas. Se conservan casos de carrera hacia delante, jugador parado, retroceso, distancia excesiva, presión en el destino y recepción más allá de la línea estando habilitado. Se compara además el resultado con velocidades laterales ocultas opuestas: no cambia.

La prueba ampliada falla con el HTML 0.120 en la primera exigencia de anticipación lateral y pasa con 0.121. Esto acredita el nuevo destino elegido y ejecutado, no una mejora general de recepciones, goles o rendimiento táctico.

## Validación global

Barrido completo: 112 programas CommonJS y dos Python, cuatro procesos y límite de 1200 s por programa. Resultado: **112/114 aprobados, dos fallidos, cero límites**. Fallos: attacking_heights y offball, ya presentes en 0.120. No se detectan nuevos fallos de programas frente a la auditoría anterior. La versión final de automatic_lead_pass se repitió tras ampliar el contracaso de velocidad lateral oculta y aplicar las semillas también al rival bloqueante; aprobada. Durante el barrido solo se actualizó además el subtítulo visible de la versión, sin cambio adicional de lógica.

Pasan las regresiones de orientación/golpeo, recepción, memoria, conservación/progresión, fuera de juego, simulación y continuidad. Los siete hitos de cierre permanecen abiertos. Safari/iPhone no se ha comprobado visualmente en esta entrega.

## Continuidad

Retomada la entrega de mejoras funcionales del motor, con auditoría proporcional a cada incremento. Los dos fallos heredados siguen registrados y no se consideran resueltos. Siguiente foco de desarrollo: continuidad del apoyo tras el pase y recepción en movimiento; contrastar alcance y llegada efectiva antes de elegir una nueva intervención. Mantener la evaluación de altura de interiores y órdenes sin balón en ese trabajo, sin convertir la limpieza documental en una condición indefinida para avanzar.

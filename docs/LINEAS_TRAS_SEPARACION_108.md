# ¿Separarse abre una segunda salida?

Motor 0.108. Ejecutar `node tests/spacing_possession.cjs`. Cuatro parejas de simulaciones: ambos equipos y dos semillas, hasta pérdida, reanudación o 12 s. Misma situación y semilla en cada pareja; solo cambia la corrección lateral de recorridos. Tras la colocación inicial no se fijan posiciones. Cada paso (1/30 s) con poseedor del equipo se considera doble salida cuando percibe dos compañeros a 5–25 unidades, habilitados según su lectura, con riesgo de línea ≤3, espacio ≥5 y direcciones separadas ≥30°. No equivale a éxito real de ambos pases.

|Equipo/semilla|Pasos con dos salidas / con poseedor, sin → con corrección|Duración sin → con (s)|Pases sin → con|
|---|---|---|---|
|Azul 401|49/199 → 22/177|8,30 → 8,07|10 → 8|
|Azul 402|154/296 → 9/137|≥12 → 5,87|15 → 5|
|Rojo 401|0/66 → 0/66|3,60 → 3,60|2 → 2|
|Rojo 402|0/55 → 0/55|2,47 → 2,47|1 → 1|

Las muestras temporales están correlacionadas; no son ensayos independientes. Son dos semillas por equipo y un arranque agrupado, no una estimación de eficacia general. La prueba previa de proximidad física sigue siendo válida en su escenario, pero no demuestra una mejora de conectividad. No se cambió el motor ni se seleccionó una variante ajustada a estos resultados. Próximo cambio propuesto: comparar cada desvío con mantener el recorrido, preservando una línea segura existente y valorando el ángulo de una segunda salida desde el poseedor; comprobar también situaciones nuevas.

# 0.86 — Estabilidad de la arquitectura con balón

## Evidencia utilizada

El contraste previo de Sample Game 3 (docs/ESTRUCTURA_PARTIDO_3.md) mostró coeficientes de desplazamiento longitudinal del centroide respecto al balón de 0,259/0,307. No son ganancias de control identificadas causalmente. Motivaron comprobar el seguimiento objetivo 1:1 del motor, no copiar distancias como reglas universales.

## Cambio

Referencia longitudinal = balón − limitar(0,65 × (balón − balón al recuperar), −12, 12).

Mientras no se alcanza el límite, un desplazamiento de balón de 10 unidades mueve la referencia 3,5 (antes 10). Un avance de 30 mueve la referencia 18, conservando conexión a un máximo de 12 unidades. Se usa la referencia para las posiciones base de los cuatro sistemas. No cambia destinos del poseedor, receptor ni apoyos locales; los dos destinos de seguridad siguen al balón para mantener su disponibilidad. No es un filtro temporal: no hay nueva demora dependiente del número de llamadas. Se conservan aceleración, giro, límites, fuera de juego y órdenes explícitas.

Los dos puestos de seguridad conservan sus ocupantes mientras sean elegibles y no exista una alternativa más de 8 unidades más profunda. Cuando el titular pasa a ser receptor/apoyo, queda fuera de la selección o pierde claramente profundidad se permite relevo. Se conserva la persistencia ya existente de los apoyos de continuidad, sin duplicarla. No se inmoviliza a los futbolistas.

0,35, 12 y 8 son parámetros provisionales. No son parámetros optimizados sobre tracking, ni garantizan mejores resultados. La ganancia menor es espacial respecto al inicio de posesión; queda pendiente un modelo temporal del centro colectivo.

## Verificación y límites

tests/block_stability.cjs comprueba cuatro sistemas por dos sentidos: excursión objetivo 10→3,5, acompañamiento en avance largo, movimiento físico con la misma locomoción, persistencia ante pequeñas permutas, relevo necesario, exclusión del receptor y restauración del estado. La comparación con 0.85 usa su fórmula estructural, no una simulación integral de dos partidos. No afirmar reducción medida del desorden colectivo ni validación científica. Mantener como pendiente una comparación contextual de las distribuciones reales y simuladas con las métricas del Game 3.

El error preexistente de repetición en decision_storage no se corrige aquí. El motor sigue en desarrollo.

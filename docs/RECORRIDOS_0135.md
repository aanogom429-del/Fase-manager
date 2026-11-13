# Auditoría de recorridos — 0.135

## Hallazgo reproducible

`node tests/run_spacing_trace.cjs` reproduce 30 segundos en modo libre, equipo inicial rojo, semilla 73. Registra 1174 correcciones de recorrido, de las cuales 236 ordenan desplazarse en sentido opuesto al destino táctico (producto escalar negativo). Son órdenes por fotograma, no 236 incidentes independientes. La instrumentación conserva exactamente el estado final de la ejecución sin traza.

Primera inversión: reloj 11.633, rojo #8, posición (54.604,33.323), destino antes de esquivar (48.931,23.213), después (52.035,37.745). `separateAttackRuns` considera desplazamientos sobre el eje Y del campo; si la carrera tiene componente vertical, esa alternativa puede invertirla. Una retirada para evitar contacto puede ser legítima: este hallazgo no demuestra que todas las inversiones sean incorrectas ni que causen la concentración.

## Contraste de hipótesis

Se probaron tres modificaciones, todas descartadas. Datos completos y parches aplicables a la 0.135 en `data/run-spacing-experiments-135.json`. Ejecutar el parche correspondiente y `node tests/spacing_match_audit.cjs` reproduce cada auditoría.

| Variante | Muestras agrupadas / total | Inicial rojo/73 | Cambios de posesión, cuatro ejecuciones |
|---|---:|---:|---|
| Publicada 0.135 | 26/167 (15.6%) | 13/40 | 8,4,2,6 |
| Rechazar esquiva inversa | 34/165 (20.6%) | 9/39 | 4,9,10,6 |
| Esquiva perpendicular siempre | 42/169 (24.9%) | 9/45 | 4,7,6,2 |
| Perpendicular solo ante inversión | 32/172 (18.6%) | 9/39 | 7,6,7,9 |

Agrupada: más de tres compañeros a menos de 12 unidades del poseedor. Muestreo cada medio segundo, con dueño y sin reanudación. Los denominadores cambian por las trayectorias y posesiones; cuatro escenarios sintéticos reutilizados no son validación independiente ni partidos completos. La mejora del caso rojo/73 no compensa evidencia global adversa; tampoco se demuestra mejora de conservación del balón.

La variante perpendicular completa pasó doce pruebas dirigidas, incluida ausencia de inversiones en esta secuencia. Esto no bastó: su auditoría dinámica empeoró. La restricción condicional también eliminó inversiones de esta secuencia (1356 correcciones), pero no la concentración.

## Decisión y pendiente

No se publica 0.136; index.html conserva el blob c18cea38263139e2e4f88e2a3512f70fa75717a8. Se incorpora diagnóstico pasivo reproducible, sus resultados y los experimentos rechazados.

El problema de concentración sigue abierto. La próxima investigación debe medir estabilidad y cambios de asignación de apoyos/equilibrio y destinos durante una misma posesión, relacionándolos con llegada efectiva; eliminar inversiones por sí solo no es una solución demostrada. Los hitos generales A1–A7 siguen abiertos; esta auditoría no constituye cierre táctico ni verificación visual en Safari.

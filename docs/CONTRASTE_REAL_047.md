# Contraste diagnóstico 0.47 · 19 de octubre de 2026

El motor reduce el error posicional frente a 0.35 en las tres ventanas reutilizadas, pero todavía pierde frente a mantener la posición inicial. No se considera validado el acompañamiento ni se ajustan probabilidades aéreas con una muestra insuficiente. Se conserva el motor 0.47 sin cambios de conducta.

| Ventana | Duración (s) | Error 0.35 (m) | Error 0.47 (m) | Posición inicial fija (m) |
|---|---:|---:|---:|---:|
| a | 3,16 | 6,915 | 6,561 | 2,298 |
| b | 1,16 | 3,782 | 2,334 | 0,755 |
| c | 3,00 | 5,758 | 5,558 | 2,884 |

Media temporal del error euclídeo de nueve compañeros de campo, excluido el poseedor. Balón, poseedor, oposición y porteros impuestos desde tracking. Todos los intervalos y criterios de integridad de owner-holdout-plan.json, sin sustituir casos. La comparación incluye múltiples cambios: no atribuye la mejora a la última regla perceptiva.

Ventanas cortas de un único partido, ya utilizadas: NO son reserva independiente. Mantenerse quieto es una referencia exigente en intervalos breves. Roles aproximados por dorsal; orientación corporal, velocidad inicial y capacidades reales no suministradas al modelo. Diferencia posicional no equivale a calidad táctica. No se demuestra que la causa sea exclusivamente exceso de movimiento.

## Eventos del partido completo

Fuente y atribución: [Metrica Sports, Sample Game 2](https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_2). Se verifica SHA-256 del CSV de eventos contra la importación registrada.

| Etiqueta | Recuento | Límite |
|---|---:|---|
| SHOT con HEAD | 7 de 24 tiros | No todos necesariamente desde centro |
| CROSS | 16 eventos | Incluye PASS, BALL LOST y BALL OUT |
| CLEARANCE | 10 eventos | Despejes identificados por subtipo |
| GOAL KICK | 16 eventos | PASS o BALL LOST, no solo SET PIECE |
| GOAL KICK de al menos 35 m | 11 de 16 | Mismo recuento con 30 y 40 m |

Distancias entre extremos del evento en campo de 105 × 68 m, sin recortar coordenadas ligeramente fuera del terreno. Etiquetas por tokens completos separados por guion. Cada saque queda registrado con fila CSV, equipo, periodo, tiempo y distancia.

No hay altura observada: largo no equivale a aéreo. No existe denominador de intentos de salto para calibrar el éxito del cabeceo ni vinculación verificada centro→remate. Un partido no define frecuencias generales. Estos recuentos no son comparables directamente con probabilidades por decisión del motor: oportunidades y denominadores difieren.

## Reproducción

Desde la raíz del proyecto:

```sh
node scripts/evaluate_reference_v047.cjs
python scripts/summarize_metrica_events.py /ruta/al/Sample_Game_2_RawEventsData.csv
```

El segundo comando requiere el CSV original de Metrica Game 2. Regeneran data/reference-v047.json y data/metrica-game2-event-reference.json. Snapshot y hash del motor 0.47 conservados; evaluaciones históricas intactas.

## Siguiente paso

Desglosar apoyos por jugador: desplazamiento real/simulado, dirección respecto al balón y destino táctico que induce el movimiento. Incorporar una referencia de velocidad inicial estimada desde tracking, sin equiparar dirección de carrera a perfil corporal. Separar errores de inicialización y de selección/persistencia del destino antes de ajustar conductas; contrastar después en secuencias no utilizadas para el ajuste.

Para el juego aéreo, registrar exposiciones equivalentes del motor (saques, centros, intentos/contactos y despejes) y ampliar fuentes. No cierra A1, A2, A6 ni A7. Sin aprendizaje ni calibración nueva.

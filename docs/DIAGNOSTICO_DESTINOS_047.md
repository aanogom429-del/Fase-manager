# Apoyos: velocidad inicial y destinos · 19-10-2026

## Resultado

La velocidad inicial no explica por sí sola el desajuste de estas ventanas. Se ha comparado el mismo motor 0.47 iniciando en reposo o con velocidad estimada del tracking anterior. No se ha modificado el juego.

| Ventana | Error desde reposo (m) | Error con velocidad previa (m) | Recorrido real medio (m) | Recorrido simulado medio (m) |
|---|---:|---:|---:|---:|
| a | 6,561 | 6,522 | 4,797 | 14,746 |
| b | 2,334 | 2,369 | 1,685 | 6,068 |
| c | 5,558 | 5,673 | 5,615 | 13,246 |

Recorridos: suma de distancias a 25 Hz, media de nueve compañeros, excluidos poseedor y portero; simulación con velocidad previa. Entre 2,36 y 3,60 veces el recorrido observado. No todos los individuos se mueven de más: hay casos de menos recorrido y dirección diferente. No se propone reducir globalmente la velocidad.

## Destinos que requieren revisión

En cada ventana, el jugador con mayor error presenta su mayor desplazamiento entre etapas de destino en «Destino por función»:

| Ventana / dorsal real | Error con velocidad previa (m) | Cambio medio en esa etapa (m) |
|---|---:|---:|
| a / 10 | 12,67 | 20,97 |
| b / 22 | 3,95 | 17,90 |
| c / 10 | 11,84 | 17,72 |

Ejemplo a/10: la referencia inicial está cerca de y=31,7; la función prescribe y=13 y el ajuste de separación lleva a y=9 (unidades del motor). Es una recolocación lateral considerable. Esto identifica una regla candidata, NO demuestra causalidad ni que ese movimiento sea incorrecto en cualquier situación. El mapeo aproximado de dorsales a funciones puede inducir destinos incompatibles con los roles reales.

Se registra para cada jugador: error medio, velocidad inicial estimada, recorrido observado/simulado, tiempo con dirección opuesta al desplazamiento real, distancia al destino aplicado, cambios entre etapas y primera cadena de decisión. Los cambios entre etapas son descriptivos: pueden ser anulados por etapas posteriores o por la intención almacenada, y no equivalen a contribuciones causales al error.

## Protocolo y límites

- Misma muestra reutilizada y mismo snapshot 0.47 que el contraste anterior. No es validación independiente.
- Velocidad por regresión lineal de seis muestras a 25 Hz desde t−0,20 s hasta t. Sin observaciones futuras. Verificación de hashes originales, identidades, finitud, límites y continuidad con el primer cuadro ya importado.
- Se altera únicamente vx/vy al iniciar el replay; perfilación corporal predeterminada y capacidades del modelo permanecen. Dirección de carrera NO se convierte en orientación corporal.
- Error integrado temporalmente; direcciones comparadas solo si ambos desplazamientos superan 0,2 m/s. El tiempo excluido no se interpreta como concordancia.
- Tracking, balón y oposición impuestos igual que antes. El análisis no reproduce un partido libre ni mide calidad táctica.
- Datos: [Metrica Sports, Sample Game 2](https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_2). Atribución y hashes conservados en support-initial-history.json; motor y protocolo en support-destination-diagnosis.json.

## Reproducción

```sh
python scripts/import_support_initial_velocity.py /ruta/a/directorio-con-Home.csv-y-Away.csv
node scripts/diagnose_support_destinations.cjs
node tests/support_destination_diagnosis.cjs
```

El historial previo importado se incluye, por lo que los dos comandos Node no necesitan descargar datos. El importador requiere los CSV originales verificados. Los informes históricos no se sobrescriben. Prueba de reproducción exacta y equivalencia con la línea base 0.47 anterior.

## Próximo paso

Contrastar mediante una intervención controlada la recolocación por función: mantener las relaciones espaciales iniciales frente a imponer carriles fijos, conservando apoyos asignados, equilibrio y decisiones del entrenador. Separar el efecto del mapeo de roles y comprobar ambos sentidos de ataque. Solo incorporar un cambio si conserva las pruebas funcionales y muestra ventajas justificables; reservar secuencias distintas para el contraste posterior. A1/A2/A7 siguen abiertos.

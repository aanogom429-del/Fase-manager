# Respuesta tras pérdida desde estados idénticos

Comparación 0.47–0.48: seis situaciones (tres alturas, x=40/60/80 respecto a la portería propia, y dos sentidos de ataque). Los diez defensores se desplazan libremente durante cinco segundos; el rival y ambos porteros siguen posiciones prescritas. El rival progresa a dos unidades del campo por segundo. Se fijan también velocidad y orientación de los jugadores prescritos; no se dejan contaminar por el movimiento que el motor habría decidido para ellos.

Las dos versiones producen **la misma respuesta defensiva** desde estos estados. Las mejoras de amplitud de 0.48 afectan a la organización ofensiva previa; este experimento elimina precisamente esa diferencia inicial. No prueba que ambos motores generen el mismo equilibrio al perder en un partido libre.

| Medida | Pérdida | +2 s | +5 s |
|---|---:|---:|---:|
| Distancia del defensor más cercano al balón (m), en los seis casos | 6,77 | 1,35 | 1,49 |
| Líneas geométricamente cerradas de dos evaluadas | 1/2 | 1/2 | 1/2 |
| Defensores de campo detrás del balón | 6 | 6 | 6 |

El tiempo estimado de llegada defensiva al punto central (16,32), comparado con el de los dos receptores rivales, conserva ventaja defensiva. A los cinco segundos es de aproximadamente 0,90 / 1,04 / 0,82 s según la altura inicial. Son estimaciones del predictor del motor, no tiempos observados de interceptación o de evitar un remate.

Una línea se considera cerrada cuando un defensor está a menos de dos metros del tramo interior (8–95 %) del segmento poseedor–receptor. No incluye vuelo, fuera de juego, orientación o control; una línea abierta tampoco es por sí sola un fallo: el defensor puede estar cumpliendo otra función. Acercarse al poseedor y conservar jugadores detrás del balón no bastan para demostrar protección de opciones peligrosas.

## Verificación

```sh
node scripts/controlled_loss.cjs
```

Genera data/controlled-loss-v048.json y comprueba valores finitos, las tres muestras completas, igualdad emparejada 0.47–0.48 y simetría de todas las medidas. Snapshots congelados, geometrías y protocolo incluidos. No hubo sustitución de casos ni ajuste de parámetros. Seis casos por versión, doce ejecuciones de cinco segundos.

Este aislamiento fuerza la posesión rival: no ejecuta pases, entradas ni recuperaciones y no permite que los atacantes reaccionen. No es un partido real ni valida por sí solo la defensa. Su resultado justifica contrastar presión y protección de líneas en escenarios con más de una respuesta posible, no ordenar que todo defensor persiga una línea.

## Siguiente actualización

Añadir una decisión defensiva contextual entre presionar, cubrir una salida peligrosa y temporizar, usando posibilidades de llegada y ayudas. Probar tanto el caso en que saltar al balón beneficia como aquel en que abre una línea peligrosa. Después comprobar la respuesta con rival libre, cambios de posesión, órdenes y continuidad. El motor publicado permanece en 0.48 durante este diagnóstico.

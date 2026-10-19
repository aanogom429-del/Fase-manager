# Defensa contextual · 0.49

Primera implementación acotada de D01/D02/D04/F05/F06. El primer defensor conserva el acercamiento de presión cuando estima llegada al balón en ≤0,75 s o tiene un compañero de campo a menos de 14 unidades del balón, situado hacia su portería. Sin esas condiciones dirige su desplazamiento a cinco unidades por detrás del balón para temporizar, en lugar de las dos de presión. La presencia de ayuda usa posiciones globales del equipo; no modela comunicación ni disponibilidad real de esa ayuda.

El segundo defensor puede cubrir un punto al 65 % del segmento hacia un receptor percibido más próximo a la portería propia que el balón. Solo considera recuerdos con incertidumbre espacial ≤1,5 unidades, receptores a ≤28 unidades y avance rival >3 unidades. Excluye al poseedor. Compara su tiempo estimado de llegada con el de un pase raso provisional a 20 unidades/s, con margen de 0,4 s. Si no puede llegar, mantiene la cobertura anterior. Entre alternativas elige avance rival menos tres veces el tiempo de llegada.

Los umbrales son heurísticos. No equivalen a metros en todos los ejes ni prescripciones tácticas universales. No se garantiza interceptación, pérdida o éxito de la presión. Todavía no se contempla fuera de juego del receptor en esta lectura, pase aéreo, recepción ni respuesta futura del rival. La asignación previa del segundo defensor sigue existente: no se optimiza todo el grupo respecto a las líneas.

La observación de rivales se actualiza para los defensores antes de asignar funciones. La cobertura usa posiciones recordadas, no la posición real oculta; los recuerdos caducados dejan de servir como objetivo. Balón, identidad del poseedor, asignación de roles y otros movimientos defensivos aún usan información global.

## Integración

Las nuevas intenciones aparecen en el inspector de destinos: «Temporizar sin ayuda cercana», «Presionar con acceso o ayuda» y «Cubrir línea percibida». Se aplican con posesión rival controlada. Durante un vuelo o balón suelto permanecen las prioridades existentes. Las órdenes del entrenador se aplican después de la lectura táctica, y se mantienen demora, aceleración, giro y frenada. No se añade estado persistente nuevo.

## Pruebas y contraste

tests/contextual_defense.cjs verifica ambos equipos: falta/presencia de ayuda, línea alcanzable percibida, movimiento real oculto sin cambio del recuerdo, caducidad y línea inalcanzable. Los demás defensores mantienen su función. Regresiones: origen defensivo, órdenes sin balón, continuidad, apoyos contextuales/simulación libre y juego aéreo.

scripts/compare_defense_v049.cjs compara los seis estados prescritos anteriores con snapshots 0.48/0.49. Las medidas de líneas cerradas, cercanía y llegada son iguales en estos casos. La prueba no acredita una mejora general ni que el problema anterior de línea abierta haya quedado resuelto. La nueva rama de cobertura requiere una amenaza percibida y alcanzable por el defensor asignado; se comprueba causalmente en los casos específicos, no se fuerza en cada jugada.

```sh
node tests/contextual_defense.cjs
node scripts/compare_defense_v049.cjs
```

Informe: data/controlled-loss-v049.json. Sigue pendiente validación externa. A1/A4 y D01–D04 continúan parciales.

## Próximo paso

Coordinar la selección del defensor de cobertura con la línea amenazada, y valorar si el compañero que permite presionar está realmente disponible. Probar alternativas de cubrir/temporizar sin desproteger otra amenaza, con reacción libre del rival y casos de inferioridad. No basta aumentar el recuento de líneas cerradas.

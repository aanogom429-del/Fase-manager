# Coordinación de coberturas · 0.50

La asignación de cobertura considera las líneas peligrosas que cada candidato ha visto o recuerda y puede alcanzar según la estimación de 0.49. Compara tiempo de llegada y valor de amenaza, conservando el margen de estabilidad existente. Si no dispone de una línea alcanzable, valora la cobertura convencional con un coste adicional provisional de dos. La amenaza usa avance hacia la portería propia, no una estimación completa de peligro de gol.

Un jugador con orden sin balón vigente, incluso durante su demora de preparación, queda fuera de la asignación automática de cobertura. También se evita asignarle la presión cuando hay compañeros libres. Si todos tienen órdenes se conserva un orden interno de jugadores para mantener el funcionamiento, pero no se declara cobertura disponible; las órdenes siguen teniendo prioridad al ejecutar el movimiento.

Para permitir presionar por disponer de ayuda ya no basta cualquier compañero próximo. Debe ser el defensor asignado a cobertura, estar libre de órdenes, situado hacia su portería y a menos de 14 unidades del balón. Su destino de cobertura debe quedar a menos de 12 unidades del balón y debe estimar llegada en ≤1,5 s. Si no cumple, se aplica la temporización existente, salvo acceso rápido del primer defensor al balón. Los umbrales siguen siendo heurísticos y usan unidades del modelo.

No se añade estado persistente: se conserva defDuty y los recuerdos existentes. Las intenciones del inspector y los controles siguen operativos. La selección colectiva y la comprobación de ubicación de compañeros permanecen globales; no se afirma comunicación explícita ni percepción completamente descentralizada.

## Evidencia

- tests/defensive_coordination.cjs: en ambos equipos, un defensor situado sobre una línea percibida alcanzable es elegido para cubrir; una orden lo excluye; un compañero cercano pero lento, ocupado o no asignado no cuenta como ayuda; ningún jugador libre implica ausencia de cobertura automática.
- tests/contextual_defense.cjs mantiene percepción, caducidad, movimiento oculto y contracasos. El caso de ayuda se actualiza para exigir asignación de cobertura.
- Regresiones de origen defensivo, órdenes, continuidad y apoyos/simulación libre.
- scripts/compare_defense_v050.cjs compara los seis escenarios prescritos de 0.49/0.50 y comprueba simetría y finitud. Las medidas de líneas cerradas, proximidad y margen de llegada permanecen iguales. Esto no demuestra mejora defensiva general ni resuelve la línea abierta de aquellos casos.

```sh
node tests/defensive_coordination.cjs
node tests/contextual_defense.cjs
node scripts/compare_defense_v050.cjs
```

Informe: data/controlled-loss-v050.json. Snapshots 0.49 y 0.50 conservados. El cambio resuelve casos funcionales concretos de asignación y disponibilidad; no está calibrado con partidos reales.

## Próximo paso

Valorar amenazas simultáneas: comprobar qué acceso se abandona al cambiar la cobertura, proteger la finalización y decidir temporización en inferioridad. Evaluar casos con rival libre y pases ejecutados para medir consecuencias, manteniendo contracasos donde presionar sea preferible. D01–D04 y F05–F08 siguen parciales.

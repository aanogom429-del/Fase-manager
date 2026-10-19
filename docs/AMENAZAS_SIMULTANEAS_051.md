# Amenazas simultáneas · 0.51

Antes de cambiar de cobertura se valoran las otras líneas percibidas que el defensor protege actualmente. Si su nuevo destino abandona una línea sin respaldo, se descuenta de la valoración el avance rival asociado a esa amenaza. También se considera mantener la posición actual que ya protege una línea. Esto permite conservar una posición útil, en vez de exigir un movimiento para cada nueva lectura.

Se mantienen los filtros de 0.50: recuerdo reciente, receptor hacia la portería propia, distancia acotada y llegada estimada. Una amenaza caducada deja de condicionar la decisión. El valor de peligro sigue siendo avance longitudinal; no equivale a probabilidad de gol. Si varias líneas quedarían abiertas, se suman sus penalizaciones. Conservar la posición se valora con la amenaza individual más avanzada; un margen de 0,1 evita diferencias insignificantes.

Una línea está geométricamente protegida si el defensor se sitúa a menos de dos unidades del segmento interior (8–95 %) poseedor–receptor. Se considera respaldo otro compañero de campo que ya protege esa línea, no está asignado a presionar y no tiene una orden vigente. Las posiciones de compañeros siguen siendo globales. No se predice todavía si ese compañero abandonará después la línea: es respaldo presente, no un relevo comunicado o garantizado.

## Evidencia causal

tests/simultaneous_threats.cjs reproduce dos amenazas desde ambos sentidos. Con el snapshot 0.50 el defensor deja una línea por otra ligeramente más avanzada. En 0.51 conserva la primera si queda sin respaldo. Si otro compañero libre la protege, permite el cambio. Si ese compañero presiona o tiene una orden, no lo cuenta como respaldo. Si caduca el recuerdo de la amenaza anterior, deja de retenerlo por esa posición.

El escenario usa capacidades explícitas altas para aislar la elección de destino de la imposibilidad física de llegar; no representa un perfil calibrado. Es prueba del mecanismo, no evidencia de rendimiento general. Se mantienen las pruebas de defensa contextual y coordinación. Regresiones de órdenes, continuidad y apoyos/simulación libre verifican compatibilidad.

```sh
node tests/simultaneous_threats.cjs
node tests/contextual_defense.cjs
node tests/defensive_coordination.cjs
```

El inspector muestra «Conservar línea prioritaria» cuando mantener la posición resulta preferible a los destinos de cobertura valorados. Se conservan demora de decisión, desplazamiento físico, prioridad de órdenes y recepción. No hay nuevo estado persistente ni aprendizaje.

## Límites y siguiente paso

No se afirma una mejora defensiva general ni que todas las líneas deban cerrarse. La geometría omite el tiempo del pase al valorar protección actual, fuera de juego y capacidad real de interceptar; los rivales se consideran mediante memoria, pero el respaldo usa posiciones globales. La presión del primer defensor todavía no penaliza las líneas que él abandona.

Siguiente paso: evaluar presión y temporización ante inferioridad, incluyendo el acceso que abre el primer defensor y la protección de finalización. Comprobar con pases ejecutados y rival que pueda reaccionar, además de contracasos donde presionar sea la mejor opción. D01–D04/F05–F08 siguen parciales.

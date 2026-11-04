# Qué falta para cerrar el motor táctico

## Estado vigente del motor 0.119

La revisión del 4 de noviembre de 2026 sustituye las prioridades de las entradas históricas inferiores. Se mantienen siete bloques abiertos. Cada bloque exige comportamiento comprobado en jugadas completas, casos contrarios y límites declarados.

| Hito | Avances comprobados en alcance acotado | Trabajo restante y criterio de cierre |
|---|---|---|
| 1. Defensa y transición tras pérdida (A1/A4) | Marcaje mixto, alturas de bloque, relevo zonal, protección del carril interior y regreso del superado | Demostrar llegada física de la cobertura antes de que el receptor progrese, especialmente en diagonales y pases atrás. Comparar presión, temporización y protección con oposición libre, conservar carriles interiores y probar trampas en banda. |
| 2. Espacios y red de apoyos (A1/A2) | Perfilación, memoria, accesibilidad temporal, separación, recuperación de amplitud, un interior adelantado y puesto independiente del dorsal | Mantener salidas de seguridad y progresión accesibles durante posesiones prolongadas, cambios de orientación y diferentes sistemas. Completar contornos de accesibilidad, anticipación y cambios estables de función. Delimitar la información global todavía usada en la coordinación. |
| 3. Ventajas y elección de soluciones (A3) | Selección contextual de pases, conducción, centros y tiro | Representar y contrastar ventaja numérica, posicional, cualitativa y dinámica. Resolver decisiones con memoria antigua, opciones progresivas y alternativas de remate, mediante casos donde conservar, progresar o finalizar sea realmente viable. |
| 4. Ciclo adaptativo y conductas colectivas (A4) | Lectura de líneas rivales, fases ofensivas/defensivas, descarga tras robo, reorganización y compensación | Validar fijación, ruptura sincronizada, tercer jugador, ayudas y compensación efectiva. Ensayar ciclos completos de posesión, pérdida y recuperación sin aglomeraciones ni pérdida sistemática de opciones. Comprobar estabilidad de fases ante pequeños cambios de posición. |
| 5. Individualidad y relaciones (A5) | Velocidad, aceleración, giro, reacción, precisión y memoria individuales | Implementar fatiga/recuperación y delimitar las demás áreas de individualidad. Especificar ajuste recíproco y resonancia con efectos observables, sin atribuir rasgos psicológicos a datos de posiciones. Verificar perfiles distintos con condiciones de juego iguales. |
| 6. Técnica, reglamento y errores (A6) | Pases, recepciones, juego aéreo, portero, varias reanudaciones, fuera de juego, faltas y disciplina | Cerrar una matriz acción/regla con casos positivos y contrarios. Investigar recepción y selección de jugadores habilitados. Diferenciar error perceptivo, de decisión, de ejecución y de sincronización. Enumerar explícitamente procedimientos y situaciones todavía fuera del alcance. |
| 7. Validación integral (A7) | Pruebas automatizadas, escenarios espejo, trazas, comparación de variantes y datos históricos | Resolver o justificar todos los fallos con evidencia, verificar partidos prolongados y ambos modos, comprobar Safari/iPhone y contrastar utilidad táctica en partidos reservados. Medir pases disponibles/completados, líneas superadas, coberturas que llegan y ocasiones concedidas, además de posiciones. |

### Orden inmediato de trabajo

1. Diagnosticar los fallos restantes de memoria, recepción y decisiones, distinguiendo la preparación del golpeo de su ejecución.
2. Validar la continuidad de apoyos e interiores en secuencias prolongadas y casos nuevos.
3. Abordar llegada de coberturas al lado débil y pase atrás con medición antes/después.
4. Completar ventajas, conductas colectivas e individualidad según la matriz anterior.
5. Consolidar técnica/reglas y validación integral a lo largo de cada entrega.

El número de pruebas aprobadas no acredita el cierre de estos hitos. La mejora de un fotograma por secuencia de la 0.118 es evidencia limitada. Los ensayos de diagonales anteriores permiten ocho recepciones en ambas variantes y no establecen que la defensa llegue a disputarlas.

Aprendizaje persistente de jugadores, producto comercial y adaptación a iOS siguen como trabajo posterior al núcleo en la hoja de ruta. La comprobación del juego web en Safari/iPhone sí corresponde a la validación actual.


Auditoría acumulada de 0.119: 105 de 114 aprobados, nueve fallos y cero ejecuciones sin concluir. [Método y resultados](AUDITORIA_CIERRE_119.md).

## Historial anterior


## Estado vigente 0.60

Quedan **7 bloques principales abiertos**, enumerados en «Secuencia de cierre». Son paquetes de trabajo, no siete actualizaciones. No existe todavía una estimación defendible del número de versiones restantes. La cifra no se reduce por cada corrección pequeña: un bloque se cierra al cumplir sus criterios de aceptación. La etapa B comercial y C iOS no están incluidas en esos siete.

Avances 0.56–0.60: apoyo con cambio de altura, selección de receptores habilitados, conducción diagonal corta, pases automáticos al espacio y selección de remate con línea central no bloqueada. Avanzan mecanismos de A1/A2/A3/A4/A6; no completan las ventajas, el ciclo, la percepción sin balón, la individualidad o la validación externa. 0.54–0.55 aportan herramientas de decisiones, no cierre táctico. Investigación 0.53.1 conservada y no integrada. Las referencias inferiores a no iniciar versiones posteriores son históricas y quedan sustituidas.

Para evitar confundir alcance con número de versiones, el criterio sigue siendo: requisitos y simplificaciones explícitos, casos favorables y contrarios, continuidad/reglas, simulación prolongada y contraste táctico representativo. Las pruebas sintéticas superadas no equivalen a validación científica del marco de Seirul·lo.

Actualización vigente 0.53 (20-10-2026): protección de finalización ante poseedor visible y conservación de cobertura de tiro, integrada sobre 0.52. [Mecanismo, pruebas dinámicas y límites](PROTECCION_FINALIZACION_053.md). En 20 parejas sintéticas: 3 reducen goles concedidos, 16 empatan y 1 empeora. A2/A4/A7 y el cierre defensivo siguen abiertos; no se demuestra mejora general. Consultar [ROADMAP.md](../ROADMAP.md) para estado consolidado. Las entradas inferiores se conservan como historial. No se inicia 0.54.

Actualización 0.52: el primer defensor considera líneas que deja libres al presionar e inferioridad local percibida. Evidencia acotada en PRESION_EXPOSICION_052.md. El bloque 1 sigue abierto: protección de finalización y validación con pases ejecutados y rival reactivo; sin mejora defensiva general demostrada.

Actualización 0.51: cobertura considera amenazas simultáneas y penaliza abandonar líneas sin respaldo. El bloque 1 continúa abierto: acceso que abandona el presionante, inferioridad y protección de finalización. Evidencia causal acotada en AMENAZAS_SIMULTANEAS_051.md; sin validación defensiva general.

Actualización 0.50: asignación de cobertura según amenaza percibida alcanzable y ayuda disponible considerando órdenes y llegada. El bloque 1 sigue abierto: amenazas simultáneas, acceso que se abandona y decisiones ante inferioridad. Véase COORDINACION_DEFENSIVA_050.md; no se declara mejora defensiva general.

Actualización 0.49: primera presión/temporización según llegada y ayuda, con cobertura de línea percibida alcanzable. El bloque 1 sigue abierto: falta coordinar mejor quién cubre y si la ayuda está realmente disponible. Las seis medidas comparadas no mejoran; no constituye validación general. Véase DEFENSA_CONTEXTUAL_049.md. Las referencias a 0.48 inferiores conservan el estado de la revisión original.

Estado revisado el 19-10-2026, motor publicado 0.48. Base: código actual, matriz de cobertura y últimas pruebas. No se asigna porcentaje de finalización: existen mecanismos operativos, pero no cobertura completa ni validación general del marco.

## Ya disponible, con alcance acotado

Simulación libre y decisiones guiadas con continuidad; órdenes sin balón; apoyos persistentes, amplitud progresiva, profundidad y equilibrio; orientación, memoria perceptiva y capacidades de movimiento; pases/control/primer toque, conducciones y regates, tiros/centros/cabeceos/despejes y envío largo del portero; procedimientos reglamentarios implementados; inspector y pruebas reproducibles. Ninguna enumeración equivale a completar todo el repertorio, arbitraje o teoría.

## Secuencia de cierre

| Orden | Bloque pendiente | Resultado exigido para cerrarlo |
|---|---|---|
| 1 | Presión, cobertura y temporización tras pérdida (A1/A4) | Elegir quién presiona, protege líneas y gana tiempo según peligro, llegada y ayudas. Comprobar casos favorables y contrarios, ambos equipos y oposición libre |
| 2 | Criterios conformadores y espacios funcionales (A1/A2) | Completar percepción sin balón, atención, recepción y anticipación; valorar la contribución de apoyo/cooperación y construir contornos por accesibilidad, no solo por envolvente de posiciones; estabilidad y cambio de función |
| 3 | Ventajas y selección de soluciones (A3) | Representar superioridad numérica local, ventaja posicional, emparejamientos cualitativos y ventaja dinámica; justificar conservar, progresar o finalizar según utilidad |
| 4 | Conductas y ciclo adaptativo (A4) | Fijación y superación explícitas, rupturas sincronizadas, ayudas, reorganización y protección de finalización; pasar entre funciones según situación, sin imponer una secuencia rígida |
| 5 | Individualidad y relaciones (A5) | Completar capacidades relevantes, fatiga/recuperación y las áreas mental, emotivo-volitiva, socioafectiva y expresivo-creativa; definir ajuste recíproco y resonancia con límites observables, sin inferir rasgos psicológicos de tracking |
| 6 | Repertorio técnico, reglas y errores (A6) | Cerrar lagunas de control orientado en movimiento, técnica aérea y portero, contacto/faltas y procedimientos; separar errores perceptivos, decisionales, técnicos y de sincronización; matriz de acciones/reglas con casos probados |
| 7 | Validación integral (A7, continua durante los anteriores) | Escenarios positivos y contrarios, partidos prolongados, ambos sentidos y modos, ausencia de bloqueos; contraste reservado por partido, utilidad táctica además de posiciones, regresiones y límites documentados |

Estos son bloques de trabajo, no siete pequeñas actualizaciones ni una estimación de duración. La matriz conserva los requisitos individuales y debe actualizarse con evidencia antes de cerrar cada uno. Reglamentación, continuidad y pruebas acompañan todos los cambios.

## Cobertura del marco

Zona del balón, ubicación, perfilación, trayectorias, individualidad e integración simultánea siguen parciales. La resonancia empática no dispone de un modelo explícito suficiente. Las tres zonas funcionales existen como aproximaciones; los contornos aún no representan plenamente el campo de accesibilidad condicionado por orientación y oposición. Ventajas, conductas y fases tienen cobertura desigual. No puede afirmarse que esté implementado todo el marco.

Las pruebas recientes respaldan mejoras acotadas de movimiento/opciones; no validan científicamente el conjunto. En pérdidas controladas, acercarse al balón no ha aumentado el número de líneas cerradas en los seis casos evaluados. Es la prioridad inmediata.

## Después del núcleo

Modo entrenamiento con situaciones guardadas, mejora específica persistente, retención y transferencia. Después, producto comercial (partidas, interfaz, estadísticas) y adaptación iOS/TestFlight/App Store. Actualmente los futbolistas no aprenden de la práctica. Para cerrar el núcleo deben declararse sus simplificaciones; afirmar cobertura completa de la teoría exige resolver también los elementos relacionales y las ocho áreas de individualidad.

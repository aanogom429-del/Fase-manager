# Auditoría y cierre pendiente del motor 0.119

4 de noviembre de 2026. Base 49a9a1b49e301f1bb9413d9d46c89b1328bdd416. Motor idéntico al publicado 0.119. Se corrigieron tres ensayos que leían el vuelo antes de finalizar el giro previo al golpeo: cross_selection, organizing_possession y shot_selection. La comprobación espera como máximo 120 fotogramas y exige finalizar la preparación, conservando sus aserciones tácticas positivas y negativas.

Se ejecutaron 112 programas CommonJS y dos Python, cuatro procesos, límite 1200 segundos por programa. Resultado inicial 104 PASS, 10 FAIL, 0 LIMIT. block_stability usaba un jugador sintético sin id y produjo posiciones no finitas al consultar el puesto estable de 0.119. Con id coherente pasa sin modificar motor ni aserciones. Resultado acumulado 105 PASS, 9 FAIL, 0 LIMIT, con repetición dirigida de block_stability. No hubo un segundo barrido completo tras ese cambio de fixture.

Los nueve fallos restantes son attacking_heights, automatic_lead_pass, offball, onside_decisions, organizing_memory, organizing_progression, perceptual_memory, reception y safe_outlet. No son nueve defectos independientes demostrados. Algunos comprueban vuelo inmediato o textos anteriores; necesitan clasificación antes de atribuirlos al motor. En una prueba exploratoria de organizing_memory esperando el golpeo persistió un fallo de selección de receptor reciente; se conserva su ensayo original y se prioriza la traza de decisión. Las expectativas de fase de organizing_progression preceden a la lectura por líneas rivales.

La 0.119 superó player_roles en este barrido completo. Los restantes programas aprobados incluyen formación, portero, reglas, juego aéreo, perfiles, percepción sin balón, diagonales y apoyos. Un PASS del ensayo de diagonales comprueba ejecución y métricas finitas, no que el defensor alcance al receptor. Sigue pendiente validación visual en Safari/iPhone.

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

# Auditoría global 0.120 — 5 de noviembre de 2026

Base 2e126fb85936211de4078728c53ad8817edf3f9f. Se ejecutaron 112 programas CommonJS y dos Python, cuatro procesos, límite de 1200 segundos por programa. Resultado inicial 106 aprobados, 8 fallidos, cero límites. organizing_memory pasa con el motor 0.120. La lista de fallos inicial es la de 0.119 menos este caso, sin nuevas regresiones detectadas en el barrido.

Se corrigieron y repitieron reception y onside_decisions. Los ensayos leían el vuelo antes de completar el giro previo al golpeo. La pared además forzaba captura antes de liberar el primer pase. Se conserva la comprobación de pase único, receptor elegido, cancelación por pérdida/reanudación, control orientado, pausa y restauración. El ensayo de receptores habilitados conserva sus casos de receptor en línea, ausencia de salidas legales y 24 decisiones desde banda. Ambos pasan.

Resultado acumulado tras esas dos repeticiones dirigidas: 108 aprobados, 6 fallidos, cero límites. No se repitieron los otros 112 programas tras editar únicamente los ensayos. El motor continúa en 0.120.

Pendientes: attacking_heights, automatic_lead_pass, offball, organizing_progression, perceptual_memory y safe_outlet. Son fallos de pruebas por diagnosticar, no seis defectos del motor demostrados. Próxima prioridad: perceptual_memory y coherencia de decisiones con información percibida; clasificar por separado textos de mensajes y expectativas de fases antiguas.

Los siete hitos de cierre de docs/AUDITORIA_CIERRE_119.md siguen abiertos. La batería confirma funcionamiento técnico en sus escenarios; no acredita eficacia táctica general. Safari/iPhone y contraste representativo con partidos siguen pendientes.

## Seguimiento — 6 de noviembre de 2026

Resuelto perceptual_memory sin cambiar el motor. El ensayo consultaba flight antes de completar el giro del golpeo. Ahora espera hasta 120 pasos de 1/60 s y exige que la preparación termine. Se mantienen las comprobaciones en ambos sentidos del receptor y las coordenadas originalmente recordadas. La caducidad se ensaya en una situación independiente: durante el giro el jugador puede volver a observar al compañero, por lo que la observación inicial ya no sirve como referencia de expiración. Se comprueba presencia justo antes de 1.5 s y ausencia en el límite, renovación y exclusión del expulsado. El reintento exige dos pases realmente ejecutados antes de comparar sus ejecuciones; ya no puede aprobar comparando dos valores ausentes.

Validación dirigida: 8/8 programas aprobados: perceptual_memory, organizing_memory, opponent_perception, support_perception, support_assignment_perception, teammate_spacing_perception, offball_spacing_perception y containment_perception. Cambio de prueba publicado en 866d150eeaa6a077bbbb260791b67f9f0b487197.

Resultado acumulado: 109/114 aprobados y cinco fallos pendientes (attacking_heights, automatic_lead_pass, offball, organizing_progression y safe_outlet). No es un nuevo barrido completo. Motor sin modificaciones, versión 0.120. Próximo diagnóstico: organizing_progression, distinguiendo selección de pase, giro previo y reconocimiento de fase. Los siete hitos y la validación Safari/iPhone continúan pendientes.

## Progresión organizada — 6 de noviembre de 2026

Resuelto organizing_progression en a4a6cc2c452f844da43cf9016501de48bdfb6fbd, sin modificar el motor. El primer fallo era la expectativa de fase: la prueba exigía Superación por disponer de un pase corto progresivo, aunque el bloque rival permanecía por delante. El modelo estructural vigente identifica ese escenario como Iniciación del juego. Se mantiene la exigencia de elegir el apoyo corto libre frente al pase profundo expuesto; no se ha eliminado la comprobación de fase, sino actualizado su significado.

Los tres casos (progresión corta, profundidad libre y reciclaje con apoyo marcado) esperan ahora el giro previo y exigen un pase ejecutado, sin aceptar solo una preparación. Pasan los 32 grupos (dos sentidos por 16 semillas), con 96 decisiones. Se captura la fase al elegir, antes de que los pasos de ejecución muevan el bloque.

Validación dirigida: 7/7 programas aprobados: organizing_progression, block_phase, organizing_possession, organizing_memory, buildup_circulation, progressive_outlet y recovery_outlet. block_phase conserva los contraejemplos de iniciación adelantada, confort, disposición posicional, superación y finalización por desarrollo de la jugada, en ambos sentidos.

Resultado acumulado: 110/114 aprobados, cuatro pendientes: attacking_heights, automatic_lead_pass, offball y safe_outlet. No es un nuevo barrido completo ni evidencia de cierre de los siete hitos. La versión continúa en 0.120. Próximo paso: diagnosticar safe_outlet (salida segura bajo presión), conservando los casos de apoyo marcado, no observado y memoria antigua.

## Salida segura — 6 de noviembre de 2026

Resuelto safe_outlet en d8c18d77961441e6d15042ecfc7a78b06ee789cb, sin modificar el motor (blob index.html d3b8bbb818f66a2374a987b105448949a7c88e11). El primer fallo exigía el mensaje «busca conservar», pero la decisión correcta ya se ejecutaba mediante la prioridad de continuidad. Al superar ese punto apareció una lectura prematura de flight en el caso de progresión libre, antes de terminar el giro.

La prueba espera ahora la preparación y comprueba receptores en lugar de mensajes. Los seis casos se repiten para ambos equipos y 16 semillas: 192 decisiones. Conserva con el apoyo libre bajo presión; rechaza el marcado y el no observado; progresa si la profundidad está libre; comprueba que el apoyo recordado tiene edad positiva y no recibe prioridad de salida fresca en ese escenario; permite circulación segura sin presión inmediata, coherente con la organización vigente. Esto no prohíbe todos los pases hacia compañeros recordados ni exige reciclar siempre sin presión.

Validación dirigida: 8/8 programas aprobados: safe_outlet, organizing_progression, organizing_possession, organizing_memory, buildup_circulation, progressive_outlet, recovery_outlet y perceptual_memory.

Resultado acumulado: 111/114 aprobados; pendientes attacking_heights, automatic_lead_pass y offball. No se ha repetido el barrido completo. Versión 0.120, siete hitos todavía abiertos, sin nueva validación visual en Safari/iPhone. Próximo paso: automatic_lead_pass, verificando destino anticipado, movimiento del receptor y ejecución del pase al espacio.

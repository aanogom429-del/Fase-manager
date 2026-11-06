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

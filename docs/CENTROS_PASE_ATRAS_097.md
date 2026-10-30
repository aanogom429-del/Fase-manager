# Centros y pases atrás — contraste pareado 0.97

Ejecutar `node tests/cross_cutback_relays.cjs`. Ocho parejas (16 simulaciones) de cuatro segundos: dos equipos defensores, centro aéreo/pase atrás raso, semillas 401/402. Sistema inicial 4-3-3. Misma posición/semilla por pareja, cadena activada frente a desactivada solo en copia de prueba. index.html no cambia. Primer pase se prescribe con kickTo, loft=5 y cross=true para centro; después ambos equipos ejecutan decisiones y movimiento reactivos. No se congela posesión ni se fuerzan posiciones tras inicio. No es una muestra de partido real.

| Defensa | Acción | Semilla | Observaciones de enlace | Dentro de 3 unidades | Exposición receptor sin/con | Goles sin/con |
|---|---|---|---:|---:|---:|---:|
| Azul | Centro | 401 | 70 | 0 | 32 / 32 | 0 / 0 |
| Azul | Centro | 402 | 11 | 0 | 38 / 38 | 0 / 0 |
| Azul | Pase atrás | 401 | 101 | 8 | 108 / 108 | 0 / 0 |
| Azul | Pase atrás | 402 | 55 | 0 | 108 / 108 | 0 / 0 |
| Rojo | Centro | 401 | 69 | 0 | 35 / 35 | 0 / 0 |
| Rojo | Centro | 402 | 61 | 0 | 63 / 63 | 0 / 0 |
| Rojo | Pase atrás | 401 | 105 | 11 | 108 / 108 | 1 / 1 |
| Rojo | Pase atrás | 402 | 62 | 0 | 108 / 108 | 0 / 0 |

Enlaces/proximidad son observaciones jugador-paso, no eventos distintos. Se observa la distancia al destino del relevo antes de mover; estar a <=3 no demuestra interceptar. Exposición cuenta pasos durante posesión/vuelo atacante en que el receptor original está a >5 del defensor de campo más próximo. Es proximidad geométrica, no accesibilidad completa, control del pase, visión ni valor de la amenaza. El receptor puede cambiar de función tras el pase inicial; se sigue su identidad durante la ventana.

534 observaciones de enlace, 19 dentro del radio repartidas entre dos escenarios de pase atrás. Sin cadena no hay enlaces. Tiros, pases, goles y exposición del receptor coinciden en cada pareja; se conserva el gol concedido por rojo ante pase atrás/401. No se ha demostrado mejora de eficacia: tampoco puede generalizarse ausencia de efecto a otros contextos. La cadena sí se ejecuta, pero esta métrica no demuestra utilidad defensiva.

PASS técnico: vuelos reales iniciados, defensores se desplazan, estados finitos y cadena ejercitada. No PASS de superioridad táctica. Solo una formación y dos semillas, cuatro segundos; no batería completa ni navegador real.

Conclusión operativa: la siguiente mejora debe valorar la amenaza del receptor del pase atrás y sus tiempos de acceso desde información percibida, coordinando cobertura y protección del área. No basta rellenar un puesto ni ampliar otra vez la persistencia. Comparar antes/después con estos contracasos y nuevas situaciones, sin asumir que todo centro exige abandonar el puesto. Motor permanece en 0.97; siete bloques abiertos.

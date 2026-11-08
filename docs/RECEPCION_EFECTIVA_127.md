# Recepción efectiva tras explorar — 0.127

8 de noviembre de 2026. Motor d976889f7405b27e6813a4d5cff5a955a7da524e, despliegue público verificado contra blob 80eeac718b2f2153273f8454a09069639781457d.

Ensayo tests/depth_reception.cjs, resultados data/depth-reception-127.json. Dos equipos × cuatro semillas × dos condiciones. Reutiliza el receptor habilitado, simulación libre y percepción inicial explícita. En la condición adversa un rival parte siete unidades por delante del poseedor y siete lateralmente, con velocidad inicial hacia el carril, sin añadir su nueva posición a la memoria inicial. Después actúa el motor. Se observa hasta 1.5 s para el primer vuelo y otros dos segundos; no se fuerza ninguna captura.

| Resultado | Línea inicialmente libre | Rival cercano |
|---|---:|---:|
| Receptor adelantado observado | 8/8 | 8/8 |
| Vuelo hacia ese receptor durante primera ventana | 8/8 | 0/8 |
| Receptor llega a controlar | 8/8 | 0/8 |
| Rival llega a controlar durante segunda ventana | 0/8 | 8/8 |

La prueba exige recepción real en la condición libre. Los casos adversos registran resultados, sin convertir la pérdida en comportamiento esperado obligatorio. Las semillas producen resultados idénticos por equipo; no son ocho contextos independientes.

Traza exploratoria azul, semilla 73: a t=10.008 conserva; t=10.792 decide conducir; t=11.392 el rival recupera con entrada legal. No hay pase interceptado en esa secuencia. Esto no prueba todavía si la conducción se eligió con información suficiente ni si existía alternativa mejor. Falta separar riesgo percibido al decidir, evolución de la presión y opciones seguras.

La 0.127 queda confirmada funcionalmente en recepción libre, pero no se demuestra una mejora general frente a 0.126 porque este ensayo no ejecuta comparación pareada de versiones. Motor sin cambios. Siguiente foco: conducción ante rival que se aproxima, con casos de rival que se aleja y de salida segura; mantener visibilidad/memoria limitadas. No hubo barrido global nuevo, siete hitos siguen pendientes.

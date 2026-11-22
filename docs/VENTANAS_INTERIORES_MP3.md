# MP3 · Auditoría temporal de conexión interior (instrumentación, sin ejecución)

Base verificada: `main@14ed39dbc48018946b731b0ee74f5306b207eecc` (0.148, 20/11/2026). Rama aislada: `codex/fase-manager-mp3-temporal-audit`. No cambia `index.html`, ni la política del motor, ni `main`.

## Objetivo
Observar durante ocho segundos de evolución autónoma por escenario cuánto se mantiene un **destino interior propuesto** para el mediapunta al reaccionar al pivote. Cuatro escenarios por variante (dos equipos × dos pivotes), semilla 73, con regla activada/desactivada.

## Entregable
`tests/mid_temporal_audit.cjs` instrumenta en memoria las trazas `abrir conexión` y `mantener conexión`; agrupa evaluaciones sucesivas separadas como máximo 0,15 s y devuelve JSON con duración de cada ventana y máximo. Se verifica que todas las posiciones continúan siendo finitas. Ejecución prevista: `node tests/mid_temporal_audit.cjs`.

## Interpretación
La duración **no equivale** al tiempo real de línea de pase libre ni acredita llegada/recepción: refleja evaluaciones de destinos candidatos. La variante desactivada no emite esas trazas, por diseño; no comparar su cero con éxito táctico. El ensayo no mide orientación, probabilidad de pase ni ventaja ofensiva. Las ventanas tampoco son estimaciones continuas exactas, pues son muestras de evaluación.

## Estado y siguiente criterio
**Prueba incorporada al repositorio pero NO ejecutada en este entorno.** No declarar PASS, cambio de motor ni mejora empírica. Próxima iteración: registrar de forma simétrica en ambos brazos disponibilidad temporal de línea percibida, distancia de llegada y orientación, con resolución y horizonte comparables; conectar ventanas con golpeo, desenlace y continuidad real, y después extender MP3 a relaciones interiores de 4-3-3, 4-4-2, 3-4-3 y 3-5-2. Mantener MP2 y MP11 abiertos.

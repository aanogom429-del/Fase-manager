# Resultados verificados en CI — 22/11/2026

GitHub Actions, ejecución `45067084840`, trabajo `137345539098`: **SUCCESS**. Pasaron el ensayo `mid_temporal_audit`, la comprobación de estructura JSON y cinco regresiones dirigidas: `mid_persistence`, `mid_connection`, `pivot_stagger`, `flank_stability` y `formation_selection`.

Muestreo uniforme de ocho segundos por variante, cada 0,1 s; aproximación de oportunidad perceptiva (`perceivedOpportunityShare`). Ventana máxima continua aproximada:

| Equipo | Pivote | Sin regla: muestras favorables | Con regla: muestras favorables | Mayor ventana con regla |
|---|---|---:|---:|---:|
| Azul | 5 | 13,8 % | 13,8 % | 0,9 s |
| Azul | 6 | 17,5 % | 13,8 % | 0,9 s |
| Rojo | 5 | 7,5 % | 7,5 % | 0,4 s |
| Rojo | 6 | 5,0 % | 5,0 % | 0,2 s |

La regla registró 15 activaciones para cada caso azul y 19 para cada caso rojo. **Estas activaciones no representan pases ni oportunidades independientes.** La reducción de muestras favorables en azul/pivote 6 es un dato adverso a investigar, no un error demostrado.

El proxy utiliza la posición instantánea del mediapunta como referencia y no incluye todas las reservas colectivas ni la orientación/decisión real del pasador. Por ello los valores no indican eficacia del pase, ni se puede afirmar una reducción causal de oportunidades únicamente a partir de esta muestra.

Siguiente entrega de verificación: CI `mid_sequence_comparison.cjs` para obtener ocho secuencias autónomas emparejadas y medir pases intentados, recepciones confirmadas, pases sin desenlace y continuaciones; no imponer una mejora en aserciones antes de observar los datos. El archivo de workflow se amplió en `db03f184`; su ejecución todavía no estaba confirmada al redactar esto.

---

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

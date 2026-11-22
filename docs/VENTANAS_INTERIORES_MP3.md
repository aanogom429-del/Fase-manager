# Verificación de horizonte equivalente — GitHub Actions 45068520178

**Resultado confirmado:** workflow `success`, incluyendo `tests/mid_fixed_horizon.cjs`, estructura y cinco regresiones. Las ventanas se simulan durante diez segundos en ambos brazos: ocho iniciales + dos comunes; se registran pases al mediapunta originados en el periodo inicial.

| Resultado | Regla desactivada | Regla activada |
|---|---:|---:|
| Pases al mediapunta | 4 | 3 |
| Recepciones completas | 4 | 3 |
| Recepciones con 2 s completos disponibles | 4 | 2 |
| Recepciones censuradas para continuidad | 0 | 1 |
| Pases posteriores del mediapunta en ventanas elegibles | 4 | 2 |

La nueva regla registra tres recepciones, pero **una de ellas es demasiado tardía** para observar dos segundos posteriores, de modo que queda censurada para la métrica de continuación. No se debe interpretar 4 frente a 2 como cuatro oportunidades equivalentes frente a dos: hay diferentes tamaños de muestra elegible, y la regla tampoco mejora el recuento total de recepciones (4→3). No hay evidencia de ventaja causal ni de perjuicio general con cuatro escenarios por brazo.

**Siguiente acción de comportamiento:** investigar qué condición bloquea la selección de pase al mediapunta en el caso perdido (azul/pivote 6), y contrastar una alternativa limitada sin forzar pases ni eliminar salvaguardas perceptivas. La prueba permite comparar, pero por sí sola no justifica modificar la toma de decisiones ni dar por cerrado MP3.

---

# Paso posterior · horizonte equivalente y censura explícita · 22/11/2026

**Evidencia nueva recuperada:** GitHub Actions `45067492930` completó con éxito el ensayo de secuencias autónomas y las regresiones dirigidas. Comparación de cuatro escenarios por variante en `tests/mid_sequence_comparison.cjs`:

| Variante | Pases al mediapunta | Recepciones completas | Continuaciones registradas | Sin desenlace |
|---|---:|---:|---:|---:|
| Sin regla | 4 | 4 | 3 | 0 |
| Con regla | 3 | 3 | 1 | 0 |

**Limitación detectada**: el ensayo anterior prolongaba opcionalmente el último vuelo de cada variante y contaba continuaciones sin garantizar tiempo posterior uniforme. Es un resultado adverso descriptivo, no una estimación causal de eficacia.

**Corrección incorporada**: `tests/mid_fixed_horizon.cjs` conserva la fase inicial de 8 s y prolonga **exactamente 2 s en cada escenario**, con mismo corte de pases elegibles a 18 s del reloj simulado. Una recepción solo entra al cálculo de continuación a dos segundos si ocurrió antes de 18 s; de lo contrario se marca como censurada y no se cuenta como fracaso. Las acciones posteriores tienen límite de dos segundos desde esa recepción. `.github/workflows/mp3-temporal-audit.yml` ejecuta ahora el nuevo ensayo y publica sus resultados, sin fijar como aserción que una variante tenga que ganar.

**Estado al publicar este paso:** código del ensayo y CI incorporados, nueva ejecución aún no verificada. No se ha modificado `index.html`; MP3 continúa parcial. No integrar en main hasta revisar las ocho trazas y efectos adversos.

---

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

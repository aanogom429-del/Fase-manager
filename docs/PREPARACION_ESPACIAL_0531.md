# 0.53.1 — Auditoría pasiva de la preparación espacial previa al tiro

21-10-2026. Continuación de la rama remota `codex/fase-manager-0.53.1-resume@e91ecb4`, cuyo árbol coincide con el commit local `b14e037`. Main remoto comprobado en `82c6c02`. Árbol local limpio antes de trabajar. Se consultan contexto, hoja de ruta, registro, reanudación y el informe de destinos intermedios. El motor sigue idéntico a e28; no se acepta 0.53.1 ni se inicia 0.54.

## Pregunta y método

Se investiga cuándo divergen las posiciones que preceden al bloqueo perdido, en lugar de ampliar otra vez los destinos o relajar presión. Se comparan ocho configuraciones existentes —ambos equipos, pase/libre, semillas 101/202, orientación cero— en 0.53 y e28: **16 simulaciones nuevas con observador pasivo**. No son una reserva de aceptación ni partidos independientes.

El observador envuelve consultas a `protectFinishingLine`, conserva su retorno y registra las del defensor número 6 durante los primeros tres segundos, con un máximo de una por jugador y paso. Estas consultas pueden formar parte de cálculos anidados de asignación: **una propuesta registrada no implica una intención ejecutada**. La traza aparte a 20 Hz conserva posiciones, velocidades y destinos almacenados de los cuatro protagonistas, y permite comprobar el movimiento efectivo. Se preservan tiros y capturas del ensayo completo.

Ambas versiones se examinan con copias separadas del predictor físico de e28. Se calcula si un tiro inmediato desde el balón observado sería interceptado siguiendo el destino consultado; además se avanza solo la copia propia durante su reacción individual y se repite la consulta desde esa postura, manteniendo fijo el balón de origen. No se da ese tiempo al rival antes de un remate: es un diagnóstico de geometría propia, **no preparación rival, predicción de su próxima acción ni una política aplicada**. Se respetan las intenciones propias pendientes en la integración. La extrapolación con balón congelado tiene límites obvios frente a pases, conducción y cambios de poseedor; un contacto previsto no equivale a toda la cobertura colectiva.

## Resultado localizado

En las ocho parejas se detecta la primera diferencia entre las trayectorias muestreadas a **0,05 s**. Las consultas iniciales, a 1/120 s = **0,00833 s**, ya difieren: la 0.53 propone protección y e28 conserva la aproximación. No se afirma que 0,05 s sea el primer subpaso físico distinto; es la primera muestra disponible.

En **equipo 0/pase/202**, a igual estado inicial:

| Consulta inicial | 0.53 | e28 |
|---|---|---|
| Destino propuesto por la base | (15;40) | (15;40) |
| Alternativa protectora devuelta | (7,545;33,461) | Ninguna |
| Rayos inmediatos accesibles bajo el predictor común | 2 de 3 | 3 de 3 |
| Acceso estimado tras 0,36 s propios | 1,532 s | 1,182 s |

Por tanto, al inicio la protección histórica **no domina** la aproximación en estas dos estimaciones locales. No se puede justificar su recuperación solo alegando más bloqueo inmediato o mejor acceso. El desenlace posterior depende de la continuidad de la posesión y del movimiento acumulado.

A **0,10833 s**, e28 presenta la primera consulta con un rayo accesible ahora pero no después del ciclo propio bajo la hipótesis de balón congelado. Quedan **0,26 s** de intención pendiente; no equivale a una nueva lectura libre ni habilita cancelar la demora. Es una advertencia geométrica del observador, no una oportunidad de intervención ya disponible.

A **0,900 s**, antes del remate real de **0,925 s**, ambos tienen el destino almacenado (18,148;30,730), pero sus posiciones son (10,094;34,306) en 0.53 y (12,230;36,631) en e28; las velocidades también difieren. La 0.53 termina con control defensivo del remate y 0 goles; e28 concede 1. Se reproduce así la divergencia temprana que la reacción posterior al tiro no compensa.

## Contrarios conservados

| Equipo, modo y semilla | Goles 0.53 | Goles e28 |
|---|---:|---:|
| 0, pase, 101 | 0 | 0 |
| 0, pase, 202 | 0 | 1 |
| 0, libre, 101 | 0 | 0 |
| 0, libre, 202 | 0 | 1 |
| 1, pase, 101 | 1 | 0 |
| 1, pase, 202 | 1 | 1 |
| 1, libre, 101 | 0 | 0 |
| 1, libre, 202 | 0 | 0 |

La pérdida de un rayo futuro aparece en las ocho trayectorias e28, tanto en perjuicios como en el caso favorable **equipo 1/pase/101** y los neutros. No es una señal discriminante suficiente para elegir protección. Las cifras de muestras dependen de consultas y visibilidad; no son duraciones de exposición ni decisiones independientes. En los casos cuyo primer remate ocurre después de tres segundos, la auditoría geométrica está truncada antes de ese remate; los eventos sí conservan el ensayo completo.

No se introduce una regla «si pierde un rayo, proteger»: este contraste aporta precisamente un contrario a esa simplificación. Tampoco prueba causalidad exclusiva de la primera intención: cambian después otras lecturas, acciones y relaciones. Aislar esa contribución exige una intervención diagnóstica separada.

## Verificación nueva y procedencia

Antes del instrumento pasan presión, revisión y evidencia de destinos intermedios. La nueva entrada `tests/pre_shot_posture.cjs` pasa: cuatro replays adicionales de un segundo, ambas fuentes y equipos, con igualdad completa del estado guardado frente a su fuente sin observador; copias físicas puras; hashes de las dos fuentes, receta y simulador; identidad de métricas y hashes inicial/final de las 16 ejecuciones con las referencias previamente verificadas; conservación del perjuicio pase/202 y resumen reproducible.

Las 16 coincidencias se comprueban tras ejecutar cada simulación, no solo leyendo hashes. Las referencias históricas no se vuelven a contar como ejecuciones nuevas. Los cuatro replays de la prueba son comprobaciones de pasividad, no cuatro nuevas configuraciones tácticas. La batería completa del paso anterior se conserva como histórica; no se afirma una reejecución completa de las 61 entradas actuales. No hay cambios del motor ni nueva prueba visual Safari/iOS.

Datos completos sin pérdida: `data/pre-shot-posture-v0531.json.gz`; resumen legible: `data/pre-shot-posture-summary.json`. El evaluador lee/escribe JSON o JSON comprimido según la extensión. La compresión no altera el contenido comprobado.

## Decisión y siguiente paso

No hay un nuevo candidato para main. El hallazgo acota la pregunta: **la preferencia local por más contacto inmediato y mejor acceso no asegura conservar el estado que será útil tras un pase; detectar un rayo futuro perdido tampoco basta para invertirla**. Se mantienen index.html, main, reglas, percepción y tiempos de reacción.

El siguiente experimento debe aislar causalmente el prefijo inicial de movimiento —con intervenciones diagnósticas acotadas y referencias sin intervenir, conservando ambos casos adversos opuestos— antes de diseñar una valoración de continuidad. Esas intervenciones serían controles explicativos, no una política que pueda consultar un desenlace futuro ni una aceptación automática de la heurística 0.53.

```bash
node scripts/audit_pre_shot_posture.cjs /tmp/pre-shot-posture.json.gz
node scripts/audit_pre_shot_posture.cjs --verify /tmp/pre-shot-posture.json.gz
node tests/pre_shot_posture.cjs
```

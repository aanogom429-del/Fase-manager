# Auditoría del motor — 28 octubre 2026

Base: motor 0.90; inspección de ROADMAP, implementación de compensaciones y pruebas estructurales/autónomas. No es una ejecución de toda la batería ni una certificación de realismo. Las versiones y prioridades antiguas de ROADMAP son historia, no pendientes automáticamente vigentes.

## Paso ejecutado: diagnóstico de candidatos

`COVER_DIAG=1 node tests/line_autonomous.cjs` instrumenta solo la copia de prueba del asignador; no modifica index.html. Ocho escenarios de 20 s, cuatro sistemas, ambos sentidos. PASS y mismos resultados agregados que el contraste sin instrumentación.

2679 consultas de vacante sin candidato, incluidas las secundarias. Exclusiones candidato-consulta: distancia 5726, apoyo 1395, foco/receptor 840, salida propia 229, ya asignado 214, seguridad 183. Las exclusiones se solapan: no suman vacantes y no son porcentajes causales. Distancia es la exclusión observada más frecuente, pero ampliarla sin medir tiempo de llegada podría generar carreras largas y más desorden. No se infiere que cada vacante sea un hueco físico vacío.

Siguiente implementación acotada: evaluar cobertura por llegada y continuidad, comparando antes/después tiempo de hueco efectivo, desplazamiento del sustituto, conservación de apoyos y exposición tras pérdida. Incluir candidatos de reserva sin retirar automáticamente apoyos prioritarios. No cambiar 24 por un número mayor sin contracasos.

## Estado y secuencia de cierre

Siete bloques originales A1–A7 siguen abiertos. La secuencia siguiente agrupa trabajo práctico, no promete siete versiones ni estima un porcentaje de terminación.

| Orden / bloque | Ya disponible | Falta y criterio de cierre |
|---|---|---|
| 1. Estructura y apoyos (A1, parte A4) | Cuatro sistemas, referencias amortiguadas, seguridad persistente, relevos encadenados e histéresis | Cobertura útil, retorno físico y hueco final; comparar tiempos de hueco, red de pases y desplazamientos con oposición en posesiones prolongadas, sin deteriorar seguridad. |
| 2. Ciclo ofensivo/defensivo (A4) | Fases/principios, órdenes, presión y protección parciales | Bloque defensivo por sistema, pérdida/recuperación, ayudas, rupturas y reorganización; validar todas las fases y cambios, incluidas inferioridades. No reintroducir 0.53.1 aparcada. |
| 3. Percepción y perfilación (A2) | Memoria, orientación, demora de recepción y perfil abierto | Atención sin balón, anticipación y accesibilidad; decisiones sin información rival oculta, control/recepción bajo presión en casos espejo. |
| 4. Selección por ventajas (A3) | Puntuaciones locales y políticas de conservar/progresar | Comparación explícita de ventajas numéricas, posicionales, cualitativas y dinámicas; justificar conservar/progresar/finalizar y superar contracasos. |
| 5. Individualidad y coordinación (A5) | Perfiles físicos, precisión, reacción y memoria | Fatiga/recuperación y ajustes recíprocos observables; diferencias reproducibles sin inventar aprendizaje o psicología a partir del tracking. |
| 6. Técnica y reglas (A6) | Pases, conducción, tiros, controles y arbitraje parciales | Completar controles en movimiento/aéreos, portero/contacto y lagunas reglamentarias; casos positivos/negativos y continuidad sin bloqueos. |
| 7. Validación integral (A7) | Pruebas sintéticas, contrastes de datos y reproducibilidad parcial | Ejecutar batería completa actual, sesiones prolongadas y semillas nuevas, partidos reservados y métricas comparables, Safari/iOS real. A7 acompaña todos los pasos, no solo el último. |

Para cerrar un bloque: requisitos enumerados, prueba de cada requisito, casos adversos, regresiones relevantes y límites aceptados explícitamente. No basta contar versiones ni pruebas. No hay base para dar una fecha o porcentaje fiable ahora.

## Hallazgos de auditoría

- Progreso comprobable en 0.83–0.90: sistemas seleccionables, perfilación, estabilidad, compensación y restauración. El fallo histórico de reintento fue corregido en 0.89 en los casos probados; no sigue siendo pendiente por aparecer en notas antiguas.
- Las dos entregas anteriores fueron validación, no nuevas conductas. El motor sigue 0.90 y aún no garantiza orden colectivo.
- Datos reales informan hipótesis; no hay motor entrenado ni calibración general validada. El estudio SkillCorner sigue separado y su reserva no debe reutilizarse para ajuste.
- La hoja de ruta acumulaba prioridades contradictorias y pendientes ya resueltos. Esta secuencia prevalece como planificación actual; no borra informes históricos.
- Desarrollo comercial, interfaz final, entrenamiento persistente y publicación iOS son etapas posteriores/distintas; no confundirlas con cierre del núcleo táctico.

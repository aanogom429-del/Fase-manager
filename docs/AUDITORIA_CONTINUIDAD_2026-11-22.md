# Auditoría de continuidad y procesos · Fase Manager · 22/11/2026

## Fuentes efectivamente contrastadas
- Repositorio remoto `aanogom429-del/Fase-manager`, `main@14ed39dbc48018946b731b0ee74f5306b207eecc` (0.148, 20/11).
- `PROJECT_CONTEXT.md`, `ROADMAP.md`, `DEVELOPMENT_LOG.md`, `docs/MATRIZ_POSICIONAL.md`, `docs/MATRIZ_COBERTURA_TACTICA.md`, `docs/AUDITORIA_CIERRE_119.md`, `docs/CONTINUIDAD_INTERIOR_0148.md`.
- Especificaciones conversacionales conocidas: matriz aportada el 15/11/2026; presión/temporización/contención/retroceso/protección; diez fases/principios; conservar y progresar en iniciación/disposición; defensa mixta; simulación interactiva con órdenes al poseedor y a jugadores sin balón.
- **Alcance**: no se ha recuperado íntegramente palabra por palabra toda la historia de chats ni todos los adjuntos originales; este documento no suplanta las fuentes originales. El documento `docs/MATRIZ_POSICIONAL.md` es una síntesis (5.407 caracteres), NO equivale a los cuadros completos de las catorce secciones del usuario.

## Hallazgos de auditoría

| ID | Severidad | Hallazgo | Resolución o acción |
|---|---|---|---|
| AU-01 | Alta | Riesgo de afirmar fidelidad completa a instrucciones previas porque solo se conserva síntesis y trazabilidad por bloques MP1–MP11. | Crear matriz requisito→archivo/función→prueba→estado→fuente original exacta. Prohibido dar por implementada una regla solo porque está en ROADMAP. |
| AU-02 | Alta | La prueba temporal inicial de la rama registraba ventanas de activación únicamente con la regla encendida: el control tenía cero eventos por construcción. | Instrumentación mejorada: estimación de oportunidades perceptivas en ambas variantes con muestreo uniforme; conservar por separado las activaciones propias de la regla. Aún no ejecutada. |
| AU-03 | Alta | En 0.147/0.148 la comparación autónoma del mediapunta registró 4 recepciones sin regla frente a 3 con regla, sin beneficio demostrado. | No optimizar persiguiendo activaciones; exigir recepciones, conservación/progresión y costes defensivos, y horizonte comparable. |
| AU-04 | Alta | Cobertura MP3 solo parcial (4-2-3-1); MP2 no cerrado; MP4–MP9 mayoritariamente pendientes de matriz específica por sistema. | Completar MP3 mediante relaciones por sistema después de validar conexión y escalonamiento; reservar defensa/transiciones y no confundir selector con implementación. |
| AU-05 | Alta | Persisten pruebas históricas fallidas, líneas de pase sin eficacia comprobada, concentración de jugadores y falta de pruebas visuales Safari/iPhone. | Auditar fallos en HEAD actual antes de corregir aserciones; mantener registro PASS/FAIL/INCONCLUSO y regresiones de motor, reglas y móvil. |
| AU-06 | Media | Los documentos acumulan secciones históricas contradictorias, y DEVELOPMENT_LOG tiene cabecera antigua. | Mantener sección `ESTADO VIGENTE` con fecha/ref en raíz de cada documento; historia marcada; no borrar evidencia. |
| AU-07 | Media | Las pruebas sintéticas usan memorias y geometrías controladas y no demuestran realismo científico. | Exigir contracasos, espejo de equipo y lado, situaciones autónomas y partidos externos reservados; registrar efectos adversos. |
| AU-08 | Media | La versión 0.53.1 fue aparcada por evaluación desfavorable; no equivale a rama lista para fusionarse. | Preservar y excluir expresamente su política al integrar nuevos incrementos. |
| AU-09 | Media | No hay evidencia de barrido global 0.148 ni validación Safari/iPhone. | No atribuir estado verde general al proyecto. Separar pruebas locales de verificación de usuario. |

## Contrato de requisitos funcionales (obligatorio en todos los incrementos)

1. **Cinco sistemas**: 1-4-3-3, 1-4-2-3-1, 1-4-4-2 plano, 1-3-4-3 con dos atacantes interiores, 1-3-5-2 con pivote e interiores. Rol nominal no es función momentánea.
2. **Espacio**: Z1–Z6 (sin nombres; Z1 portería propia/Z6 rival) y C1–C5 respecto del equipo, sector 6×5 = 30 posibles celdas. Invertir referencias con la dirección; no duplicar zona extra.
3. **Cuatro momentos**: AO, DO, TO, TD; no confundirlos con las cinco fases ofensivas y cinco defensivas internas.
4. **Fases**: ofensivas iniciación, confort, disposición posicional, superación, finalización; defensivas presión, temporización, contención, retroceso, protección de zona de finalización. Conservar el balón y progresar son principios concurrentes en iniciación/disposición.
5. **Relación y funciones**: interacción, apoyo mutuo, cooperación; DL/DT/DD/AP/AL/RP/CP/FI/CB/BA son opciones contextuales, FI puede ser quietud, CB/BA son funciones. Nada de carreras fijas ni persecución colectiva del balón.
6. **Defensa**: marcaje zonal y al hombre combinables según balón/oponente/sector dinámico; basculación, relevos, presión, ayudas, cierres de líneas, línea de cinco contextual y protección ante pérdidas. Prioridad de posesión, recepción, reanudación, orden manual y seguridad.
7. **Decisión**: posición, movimiento, balón, trayectorias, orientación, memorias observadas, compañeros, rivales, fases, ventajas y órdenes. Salidas explicables: función, destino, desplazamiento, relación, motivo, activación, cancelación, alternativa. No emplear rivales ocultos como observados.
8. **Técnica y reglas**: pases rasos/aéreos, controles, portero, disputas, tiros, regates, pérdidas y transiciones sin saltarse física de ejecución ni legislación IFAB. Declarar explícitamente qué queda sin representar.
9. **Validación**: utilidad espacial y temporal, recepción y progresión reales, cobertura que llega físicamente, conservación, ocasiones, pérdidas, infracciones, concentración, rendimiento ambos equipos, Safari/iPhone. Una prueba geométrica no cierra una función.
10. **Etapas**: A motor deportivo; B producto comercial; C iOS. Aprendizaje persistente no implementado por mostrar memoria de percepción; el diseño del modo entrenador permite órdenes con y sin balón y simulación de consecuencias.

## Proceso de cambios corregido

- **0 · Recuperación:** leer HEAD remoto y último registro vigente, comprobar ramas de investigación; conservar trabajo no fusionado. Evitar afirmar acceso a archivos locales de chats anteriores.
- **1 · Selección:** elegir una sola regla trazable con ID MP + sistema/momento/sector + condición y alternativa; definir contracasos.
- **2 · Línea base:** preparar variante con regla desactivada y muestra controlada equivalente, sin filtraciones de información.
- **3 · Instrumentación:** antes/después con mismo horizonte; separar señales geométricas, accesibilidad perceptiva, acción ejecutada y resultado.
- **4 · Pruebas:** fixtures unitarios, espejo azul/rojo, ambos lados, escenarios adversos, simulación autónoma, regresiones IFAB, cargas y móvil según alcance.
- **5 · Puerta de integración:** clasificar PASS/FAIL/INCONCLUSO; documentar mejora y degradaciones. No publicar `main` ni cambiar política defensiva aparcada sin evidencia.
- **6 · Trazabilidad y entrega:** actualizar contexto, hoja y registro en una única revisión, incluyendo commit, rama, pruebas realmente ejecutadas y pendientes. Preferir ramas pequeñas y commits por motivo.

## Ejecución de esta entrega

Se creó rama `codex/fase-manager-mp3-temporal-audit` desde main 0.148; contiene prueba temporal MP3 y documentación, sin modificar `index.html`. La prueba ahora mide una **aproximación simétrica** de oportunidades percibidas cada 0,1 s con y sin regla, pero no reproduce todas las reservas de destinos del motor, ni acredita por sí sola ventaja táctica. No hay acceso de ejecución del repositorio en este entorno; conexión remota GitHub permite leer y escribir archivos, no afirmar que Node haya corrido. Mantener el estado **IMPLEMENTADO / NO EJECUTADO**, no PASS.

## Próximo criterio de aceptación (MP3)
Ejecutar `node tests/mid_temporal_audit.cjs`, contrastar el control comparable en ambos brazos y detectar posibles fallos de instrumentación. Después validar la secuencia pivote→mediapunta con mismas ventanas de tiempo y continuidad tras recepción y comenzar extensión condicionada a 4-3-3 y 3-5-2, sin imponer pase ni alteraciones de formación automáticas. Conservar relación con MP2, MP10 y MP11.

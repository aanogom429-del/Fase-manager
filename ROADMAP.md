# Fase Manager — Hoja de ruta de continuidad

Fecha: 20-10-2026. Base: `main`, motor **0.52**, commit `a19f7435c22896d15e22f4d1a00033ac87c58cea`. Consolidación documental; no cambia código ni inicia la 0.53.

Se conservan expresamente las etapas **A) motor táctico; B) videojuego comercial; C) adaptación a iOS**. Los estados son de alcance, no porcentajes. «Implementado» no significa «validado científicamente». Fuente detallada de requisitos e identificadores: [MATRIZ_COBERTURA_TACTICA.md](docs/MATRIZ_COBERTURA_TACTICA.md). Esta síntesis fija las prioridades actuales; se conserva la trazabilidad en [HOJA_DE_RUTA.md](docs/HOJA_DE_RUTA.md).

## Funcionalidades terminadas en su alcance acotado

- Base de simulación libre/guiada, pausa, reinicio, comparación y restauración de decisiones.
- Órdenes sin balón, selección persistente de dos apoyos y amplitud contextual.
- Orientación, recepción rasa con preparación, memoria individual y movimiento con aceleración/frenada/giro.
- Pases y combinaciones guiadas de primer toque; conducciones y acciones de duelo; tiros, centros, cabeceos y despejes; envío largo del portero.
- Procedimientos reglamentarios enumerados en PROJECT_CONTEXT.md.
- Incrementos defensivos 0.49–0.52 e inspector de decisiones/destinos.
- Auditoría A0 y conservación de instantáneas e informes históricos.

Estas entregas no cierran sus bloques generales. Los resultados efectivos de las pruebas de recuperación figuran en DEVELOPMENT_LOG.md, incluidos fallos o bloqueos si los hubiera.

## Etapa A — Motor táctico y deportivo: EN DESARROLLO

| Bloque original | Estado preciso | Trabajo restante / aceptación |
|---|---|---|
| A0 Auditoría | Completado como inventario y planificación | Mantener matriz, evidencia y límites en cada incremento. |
| A1 Apoyos/contexto | Parcial: apoyos persistentes y amplitud contextual implementados | Validar utilidad, continuidad, seguridad y equilibrio en escenarios nuevos y posesiones prolongadas. |
| A2 Criterios y espacios | Parcial: orientación, memoria, llegada y capacidades; apoyos con percepción propia | Completar atención/percepción sin balón, recepción/anticipación y contornos de accesibilidad; comprobar estabilidad y cambios de función. |
| A3 Ventajas | Pendiente de modelo completo; hay puntuaciones y recuentos locales | Comparar conservar/progresar/finalizar por ventaja numérica, posicional, cualitativa y dinámica con casos contrarios. |
| A4 Conductas/ciclo | Parcial: ataque, órdenes y defensa 0.49–0.52 | Protección de finalización, fijación/superación, rupturas sincronizadas, ayudas y reorganización adaptativa. |
| A5 Individualidad/relaciones | Parcial: perfiles físicos, reacción, precisión y memoria | Fatiga/recuperación y áreas restantes; definir resonancia y ajuste recíproco observables, sin inferir psicología de tracking. |
| A6 Técnica/reglas | Parcial: repertorio y procedimientos acotados | Controles en movimiento/aéreos, portero, contacto y lagunas IFAB; casos positivos/negativos por acción y regla. |
| A7 Validación integral | En curso; cierre pendiente | Regresiones, ambos sentidos/modos, simulación prolongada, oposición reactiva, datos reservados por partido y utilidad además de posiciones. |

Secuencia vigente de cierre: (1) defensa tras pérdida; (2) criterios y espacios; (3) ventajas; (4) conductas/ciclo; (5) individualidad/relaciones; (6) técnica/reglas; (7) consolidación de validación. A7 y las regresiones reglamentarias acompañan todos los pasos. No se pospone el respeto de reglas a A6.

### Próxima funcionalidad: 0.53 — PENDIENTE, NO IMPLEMENTADA

**Protección de la zona de finalización e identificación de líneas de tiro expuestas durante la presión defensiva.** Extender el análisis actual de líneas de pase para valorar cuándo abandonar una posición de protección habilita una finalización rival. No asumir que presionar o temporizar es siempre mejor.

Criterios de aceptación propuestos para desarrollar este incremento, todavía sin resultados:

1. Identificar exposición relevante de tiro considerando balón, portería, orientación/acceso, tiempo de llegada y respaldo; documentar hipótesis y umbrales provisionales.
2. Comparar posición/destino de presión con protección/temporización y explicar la decisión en el inspector.
3. Probar casos espejo en ambos equipos: línea expuesta sin ayuda, ayuda disponible, ayuda comprometida por orden, amenaza no relevante y acceso inmediato que justifica presionar.
4. Conservar conocimiento perceptivo limitado: no introducir posiciones rivales ocultas como si fueran observadas; documentar información global que siga utilizándose.
5. Comprobar tiros y pases realmente ejecutados, trayectorias y oposición reactiva, no solo destinos estáticos. Medir protección, llegada y consecuencias sin garantizar bloqueo ni éxito defensivo.
6. Preservar órdenes, recepción, continuidad, restauración, fuera de juego, reanudaciones y disciplina; ejecutar las regresiones pertinentes.
7. Registrar código, pruebas, resultados adversos y límites antes de marcar el incremento completado. No declarar cerrado A4 ni todo el marco por completar 0.53.

La prioridad funcional posterior a la consolidación documental es 0.53. Cualquier fallo real de la base detectado en las pruebas debe diagnosticarse antes de integrarla; corregirlo requerirá un cambio de código separado de esta entrega.

### Cierre de A y entrenamiento posterior

Cierre de A exige requisitos con evidencia, simplificaciones declaradas, pruebas de continuidad y reglas, escenarios contrarios y validación táctica representativa. Un conjunto de pruebas verde no basta para afirmar realismo científico.

Después del núcleo: modo entrenamiento con situaciones guardadas, mejora específica persistente, retención y transferencia. Está pendiente; los jugadores actuales no aprenden. Mantener identidad/perfiles y evaluar resultados antes de atribuir aprendizaje.

## Etapa B — Videojuego comercial: PENDIENTE

Se aprovechará la base existente. La interfaz de prototipo y sus contadores no equivalen a una versión comercial.

- Definir bucle de juego, objetivos, progresión y experiencia del entrenador.
- Desarrollar interfaz y controles de producto, accesibilidad y adaptación a tamaños de pantalla.
- Implementar partidas persistentes, carga/guardado y recuperación de estado.
- Consolidar estadísticas y presentación de resultados útiles al jugador.
- Estabilizar rendimiento, errores y compatibilidad; completar pruebas de uso.

Aceptación: versión 1.0 jugable con sesiones completas, persistencia fiable, interfaz comprensible y rendimiento/compatibilidad comprobados. Detalles comerciales y monetización no están cerrados en esta consolidación.

## Etapa C — iOS: PENDIENTE

- Adaptar la aplicación existente mediante la ruta prevista Capacitor/Xcode, conservando HTML/JavaScript donde proceda.
- Configurar proyecto iOS, controles táctiles, tamaños de pantalla y ciclo de vida de la aplicación.
- Probar dispositivos reales, persistencia y rendimiento; preparar TestFlight.
- Preparar ficha, recursos, privacidad y requisitos de distribución; tramitar publicación en App Store cuando el producto esté listo.

Aceptación: compilación instalable, pruebas reales y TestFlight satisfactorios y cumplimiento de los requisitos vigentes al publicar. No hay todavía proyecto iOS ni evidencia de publicación.

## Disciplina de continuidad

Cada cambio futuro debe indicar versión/commit, requisitos atendidos, pruebas ejecutadas, resultados y límites. Conservar fixtures e informes como históricos y distinguirlos de validaciones del motor actual. Antes de escribir comprobar HEAD y evitar sobrescribir cambios concurrentes. Esta entrega solo añade PROJECT_CONTEXT.md, ROADMAP.md y DEVELOPMENT_LOG.md; conserva `docs/` y el motor.

# Fase Manager — Hoja de ruta de continuidad

Fecha: 20-10-2026. Motor publicado **0.53**, `main@82c6c02`. Propuesta correctiva **0.53.1 evaluada, NO integrada** tras la auditoría. Se preservan 0.52 y 0.53 como comparadores; no se inicia 0.54.

Se conservan expresamente las etapas **A) motor táctico; B) videojuego comercial; C) adaptación a iOS**. Los estados son de alcance, no porcentajes. «Implementado» no significa «validado científicamente». Fuente detallada de requisitos e identificadores: [MATRIZ_COBERTURA_TACTICA.md](docs/MATRIZ_COBERTURA_TACTICA.md). Esta síntesis fija las prioridades actuales; se conserva la trazabilidad en [HOJA_DE_RUTA.md](docs/HOJA_DE_RUTA.md).

## Funcionalidades terminadas en su alcance acotado

- Base de simulación libre/guiada, pausa, reinicio, comparación y restauración de decisiones.
- Órdenes sin balón, selección persistente de dos apoyos y amplitud contextual.
- Orientación, recepción rasa con preparación, memoria individual y movimiento con aceleración/frenada/giro.
- Pases y combinaciones guiadas de primer toque; conducciones y acciones de duelo; tiros, centros, cabeceos y despejes; envío largo del portero.
- Procedimientos reglamentarios enumerados en PROJECT_CONTEXT.md.
- Incrementos defensivos publicados 0.49–0.53 e inspector; propuesta 0.53.1 pendiente de aceptación de decisiones/destinos.
- Auditoría A0 y conservación de instantáneas e informes históricos.

Estas entregas no cierran sus bloques generales. Los resultados efectivos de las pruebas de recuperación figuran en DEVELOPMENT_LOG.md, incluidos fallos o bloqueos si los hubiera.

## Etapa A — Motor táctico y deportivo: EN DESARROLLO

| Bloque original | Estado preciso | Trabajo restante / aceptación |
|---|---|---|
| A0 Auditoría | Completado como inventario y planificación | Mantener matriz, evidencia y límites en cada incremento. |
| A1 Apoyos/contexto | Parcial: apoyos persistentes y amplitud contextual implementados | Validar utilidad, continuidad, seguridad y equilibrio en escenarios nuevos y posesiones prolongadas. |
| A2 Criterios y espacios | Parcial: orientación, memoria, llegada y capacidades; apoyos con percepción propia | Completar atención/percepción sin balón, recepción/anticipación y contornos de accesibilidad; comprobar estabilidad y cambios de función. |
| A3 Ventajas | Pendiente de modelo completo; hay puntuaciones y recuentos locales | Comparar conservar/progresar/finalizar por ventaja numérica, posicional, cualitativa y dinámica con casos contrarios. |
| A4 Conductas/ciclo | Parcial: ataque, órdenes y defensa 0.49–0.53; propuesta correctiva sin aceptar | Ampliar y validar protección de finalización, fijación/superación, rupturas sincronizadas, ayudas y reorganización adaptativa. |
| A5 Individualidad/relaciones | Parcial: perfiles físicos, reacción, precisión y memoria | Fatiga/recuperación y áreas restantes; definir resonancia y ajuste recíproco observables, sin inferir psicología de tracking. |
| A6 Técnica/reglas | Parcial: repertorio y procedimientos acotados | Controles en movimiento/aéreos, portero, contacto y lagunas IFAB; casos positivos/negativos por acción y regla. |
| A7 Validación integral | En curso; cierre pendiente | Regresiones, ambos sentidos/modos, simulación prolongada, oposición reactiva, datos reservados por partido y utilidad además de posiciones. |

Secuencia vigente de cierre: (1) defensa tras pérdida; (2) criterios y espacios; (3) ventajas; (4) conductas/ciclo; (5) individualidad/relaciones; (6) técnica/reglas; (7) consolidación de validación. A7 y las regresiones reglamentarias acompañan todos los pasos. No se pospone el respeto de reglas a A6.

### Incremento 0.53 — IMPLEMENTADO CON VALIDACIÓN ACOTADA

**Protección de la zona de finalización e identificación de líneas de tiro expuestas durante la presión defensiva.** Extender el análisis actual de líneas de pase para valorar cuándo abandonar una posición de protección habilita una finalización rival. No asumir que presionar o temporizar es siempre mejor.

Criterios de aceptación del incremento (resultados y límites en [informe 0.53](docs/PROTECCION_FINALIZACION_053.md)):

1. Identificar exposición relevante de tiro considerando balón, portería, orientación/acceso, tiempo de llegada y respaldo; documentar hipótesis y umbrales provisionales.
2. Comparar posición/destino de presión con protección/temporización y explicar la decisión en el inspector.
3. Probar casos espejo en ambos equipos: línea expuesta sin ayuda, ayuda disponible, ayuda comprometida por orden, amenaza no relevante y acceso inmediato que justifica presionar.
4. Conservar conocimiento perceptivo limitado: no introducir posiciones rivales ocultas como si fueran observadas; documentar información global que siga utilizándose.
5. Comprobar tiros y pases realmente ejecutados, trayectorias y oposición reactiva, no solo destinos estáticos. Medir protección, llegada y consecuencias sin garantizar bloqueo ni éxito defensivo.
6. Preservar órdenes, recepción, continuidad, restauración, fuera de juego, reanudaciones y disciplina; ejecutar las regresiones pertinentes.
7. Registrar código, pruebas, resultados adversos y límites antes de marcar el incremento completado. No declarar cerrado A4 ni todo el marco por completar 0.53.

La 0.53 añade protección del poseedor visible y cobertura de tiro sin sustituir presión/temporización ni protección de pases. Casos espejo, pruebas dinámicas con tiros/pases y oposición libre, y regresiones acompañan la entrega. En 20 parejas sintéticas: 3 reducen goles, 16 empatan, 1 empeora. No demuestra mejora general ni cierra A4/A7. Pendientes dentro del bloque: investigar el contracaso adverso, trayectorias/intercepciones más completas, receptores potenciales y validación externa. No se desarrolla ni se asigna aquí una versión 0.54.

### Propuesta 0.53.1 — NO ACEPTADA PARA MAIN

Actualización 22-10-2026: [intervención sobre la primera intención](docs/INTENCION_INICIAL_0531.md), 48 simulaciones nuevas y 32 controles sin cambio. Se demuestra contribución causal del primer destino en los dos casos adversos opuestos, con otro perjuicio en juego libre; no se acepta ninguna política. Regresión completa actual: **62/62 entradas PASS**, sin sustituir el motor de producción. Siguiente investigación: información realmente disponible y corrección físicamente ejecutable en la primera lectura ordinaria posterior al pase, sin cancelar intenciones pendientes ni usar desenlaces futuros. Sin cambios en motor/main y sin 0.54.

Se corrigen montaje del portero, preparación ficticia, estimación de contacto y sustitución automática de un plan previo. Se conserva solo el tiro ejecutable inmediato tras descartar la hipótesis posterior sin beneficio demostrado, se conservan corredores ya accesibles y se vetan pérdidas locales de presión o pases sin respaldo. Órdenes, percepción limitada y reglas IFAB se mantienen; no se amplía el portero ni se inicia otro bloque.

Comparación actual: 76 configuraciones × 0.52/0.53/0.53.1, con 16 condiciones de reserva inicial y otras 16 de confirmación más largas y capacidades distintas. Se guardan los casos favorables, neutros y perjudiciales y las tasas de exposición/presión/continuidad, además de goles. La precisión del predictor no equivale a superioridad táctica; el caso equipo 0/pase/202 pierde un bloqueo de 0.53. Informe: [CORRECCION_DEFENSIVA_0531.md](docs/CORRECCION_DEFENSIVA_0531.md).

Las 55 entradas de regresión pasan, pero el candidato concede 32 goles frente a 26/28 en 0.53/0.52, pierde intercepciones y no ofrece una mejora suficientemente consistente. No se integra en main; se conserva en una rama revisable con las variantes rechazadas y sus informes.

A2/A4/A6/A7 siguen abiertos: faltan relevo funcional y coordinación amplia, portero anticipativo, validación externa y comprobación representativa de posesiones prolongadas. Se descarta la primera selección que perjudicaba sistemáticamente la ayuda cercana; se conserva el acceso del presionante sin relevo. El motor posterior queda fijado antes de consultar las 16 condiciones nuevas de confirmación; los resultados no se usan para retocar umbrales de un gol concreto.

Reanudación 21-10-2026: se recuperó e28 sin pendientes y se reejecutaron sus 55 entradas; se añadieron dos pruebas de control/procedencia. Las 320 simulaciones nuevas reproducen las referencias y descartan otras dos alternativas por perjuicio o resultados mixtos. No cambia el motor ni se acepta la 0.53.1. Informe vigente: [REANUDACION_0531.md](docs/REANUDACION_0531.md). El siguiente trabajo sigue siendo la corrección 0.53.1 con coordinación perceptivamente justificable y contraste reservado nuevo; no 0.54.

Paso posterior de 0.53.1: completado el [contraste pasivo de relevo](docs/RELEVO_DEFENSIVO_0531.md). Se conservan contracasos favorables/contextuales, 76 simulaciones sin interferencia y ocho instantáneas diagnósticas pareadas. No se acredita todavía una política de relevo útil; faltan valorar el coste de aproximación y validar solicitud/aceptación con percepción y demora propias. No se cierra A4/A7 ni se modifica el motor.

Control posterior de comunicación: [relevo con demora y señal observada](docs/RELEVO_DEMORADO_0531.md), implementado y probado fuera del motor. Pasan 59 entradas del repositorio y 14 específicas sobre el control. No hay activaciones en 76 situaciones y diez diagnósticos nuevos; no se incorpora una funcionalidad sin utilidad demostrada. Siguen pendientes selección y ejecución de intercambios con coste, sin información futura ni supuesta coordinación instantánea. No se cierra 0.53.1 ni se inicia 0.54.


Nueva investigación desde `953855d`: [destinos intermedios](docs/DESTINOS_INTERMEDIOS_0531.md). Manteniendo los vetos de presión, disputa y pases, el control amplía los destinos sin modificar index.html. En 64 decisiones espejo ofrece seis elecciones protectoras frente a cuatro; en 76 simulaciones nuevas conserva exactamente las métricas de e28 (32 goles/77 tiros concedidos), con un único hash final distinto. Cuatro trazas nuevas confirman que pase/202 sigue perdiendo el bloqueo de 0.53. No se incorpora por falta de utilidad dinámica demostrada; las referencias 0.52/0.53/e28 son reutilizadas con procedencia comprobada. No se inicia 0.54.

Auditoría posterior: [preparación espacial previa al tiro](docs/PREPARACION_ESPACIAL_0531.md). Dieciséis simulaciones pasivas nuevas (ocho configuraciones × 0.53/e28) reproducen exactamente resultados históricos. La primera diferencia muestreada aparece a 0,05 s; en pase/202 la aproximación e28 ya es distinta desde la consulta inicial y pierde un rayo futuro a 0,10833 s, con intención pendiente. Pero la misma señal aparece en casos favorables y neutros: no basta para seleccionar protección. Se conserva el contrario equipo 1/pase/101. Pasan tres entradas previas y una nueva de pasividad/procedencia; no se reejecuta toda la batería. Sin cambios de motor ni main, 0.53.1 sigue sin aceptar y no se inicia 0.54.

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

Cada cambio futuro debe indicar versión/commit, requisitos atendidos, pruebas ejecutadas, resultados y límites. Conservar fixtures e informes como históricos y distinguirlos de validaciones del motor actual. Antes de escribir comprobar HEAD y evitar sobrescribir cambios concurrentes. La consolidación 13c0330 fue documental. La entrega 0.53 modifica el motor de forma acotada, añade pruebas/evaluación y conserva la documentación e instantáneas históricas.

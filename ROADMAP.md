# Fase Manager — Hoja de ruta de continuidad

## Corrección: prioridad simulación

El usuario no considera prioritario guardar decisiones. Se priorizan simulación y motor táctico; guardado plegado como herramienta opcional. El botón superior estaba desactivado en choose/review guiados: ahora Simular partido entra en modo libre desde la posición actual; después pausa/reanuda. Se conserva la parada reglamentaria. PASS simulation_entry.cjs y continuity.cjs. Publicación GitHub de 0.55 bloqueada por revisión automática; código local conservado.

## 23-10-2026 — 0.55: comparación de decisiones

Incremento de estadísticas y experiencia del entrenador (B) sobre 0.54. La tabla conserva los últimos ocho intentos terminados desde una misma situación: intención, órdenes sin balón, duración simulada, posesión final, desplazamiento longitudinal del balón, tiros totales de ambos equipos y goles azul/rojo. «Comparar otra decisión» conserva la tabla y restaura el punto de partida. Continuar, reiniciar, cambiar de modo o recuperar un guardado limpia la comparación. Importar un archivo solo escribe un espacio: no limpia la comparación hasta recuperarlo.

Los intentos pueden terminar tras duraciones distintas. Avance positivo significa hacia portería roja; no equivale a una puntuación táctica ni a un ranking. Los resultados no se guardan ni exportan; los guardados 0.54 siguen siendo compatibles. Motor táctico sin modificaciones; A2/A4/A7 siguen abiertos y 0.53.1 permanece aparcada.

Publicación de prueba: se actualiza el Site existente, conservando su URL y acceso privado. La URL contiene 054 por continuidad, pero el encabezado muestra la versión vigente. GitHub: rama `codex/fase-manager-0.55`, sin modificar main.


## 23-10-2026 — 0.54: situaciones portátiles

Entrega independiente solicitada por el usuario para avanzar la hoja de ruta. Parte de `63e5d82` (tres guardados locales) y conserva la investigación 0.53.1 aparcada. Añade exportación JSON de la decisión guiada actual y carga de archivos en uno de los tres espacios. La carga no modifica la jugada en pantalla; Recuperar decisión la restaura pausada. Conserva el formato de los guardados anteriores y la semilla reproducible.

Se comprueban tamaño, versión, integridad y estructura antes de escribir; se rechazan claves peligrosas y cadenas con marcado HTML. El espacio de destino se fija antes de leer el archivo. Un error de lectura, validación o almacenamiento no sustituye el guardado anterior. El checksum detecta corrupción accidental, no autentica al autor de un archivo.

Alcance: avance de persistencia de B; motor táctico 0.53 sin cambios. A2/A4/A7 y las demás lagunas tácticas siguen abiertas. No se declara cerrada la etapa A ni validada la defensa 0.53.1. Las menciones inferiores a «no iniciar 0.54» son históricas y quedan sustituidas por esta entrega. Descarga y selector de archivos pendientes de comprobación real en Safari/iPhone; pruebas Node con DOM simulado.


## 23-10-2026 — Prioridad vigente: entregas acotadas y guardado de decisiones

Por instrucción del usuario se cierra la ronda abierta de investigación: **0.53.1 queda aparcada, no aceptada para main**. No se exige resolverla para avanzar en tareas independientes. Las prioridades históricas de continuar indefinidamente 0.53.1 quedan sustituidas por esta decisión; A4/A7 siguen abiertos.

Recuperación verificada: `main@82c6c02`, remoto de investigación `5ecf9ed` y local `5d610b1`. Se reúnen las dos líneas en `d172bd5` (rama `codex/fase-manager-0.53.1-preserved`), conservando ambos informes, pruebas y datos. Los cambios pendientes de otras carpetas no se tocan. La mejora independiente parte deliberadamente de la 0.53 estable en `codex/fase-manager-decision-storage`; no incorpora la política defensiva rechazada ni borra su investigación.

Entrega: tres espacios locales para guardar una decisión pausada del modo guiado y recuperarla tras cerrar/abrir la aplicación. Conserva posiciones, memoria perceptiva, órdenes, marcador, reloj, disciplina, selección técnica y semilla; se recupera pausada. Se bloquea guardar durante ejecución, balón libre, reanudaciones y modo libre. Se informa de espacios vacíos, datos incompatibles/dañados y almacenamiento bloqueado/lleno. No hay sincronización entre dispositivos, importación externa, autoguardado ni partidas completas en vuelo.

Es un adelanto acotado de persistencia de B autorizado al desbloquear tareas independientes; no declara terminada A ni el videojuego comercial. Motor táctico sin cambios respecto a 0.53. El siguiente incremento debe elegir un requisito independiente y terminar en una función comprobable, con regresiones pertinentes; no reiniciar una investigación defensiva abierta sin un objetivo acotado.


Fecha: 20-10-2026. Motor **0.53**, desarrollado sobre `main@13c0330` (motor anterior 0.52, `a19f743`). Incremento acotado de protección de finalización; no se inicia 0.54.

Se conservan expresamente las etapas **A) motor táctico; B) videojuego comercial; C) adaptación a iOS**. Los estados son de alcance, no porcentajes. «Implementado» no significa «validado científicamente». Fuente detallada de requisitos e identificadores: [MATRIZ_COBERTURA_TACTICA.md](docs/MATRIZ_COBERTURA_TACTICA.md). Esta síntesis fija las prioridades actuales; se conserva la trazabilidad en [HOJA_DE_RUTA.md](docs/HOJA_DE_RUTA.md).

## Funcionalidades terminadas en su alcance acotado

- Base de simulación libre/guiada, pausa, reinicio, comparación y restauración de decisiones.
- Órdenes sin balón, selección persistente de dos apoyos y amplitud contextual.
- Orientación, recepción rasa con preparación, memoria individual y movimiento con aceleración/frenada/giro.
- Pases y combinaciones guiadas de primer toque; conducciones y acciones de duelo; tiros, centros, cabeceos y despejes; envío largo del portero.
- Procedimientos reglamentarios enumerados en PROJECT_CONTEXT.md.
- Incrementos defensivos 0.49–0.53 e inspector de decisiones/destinos.
- Auditoría A0 y conservación de instantáneas e informes históricos.

Estas entregas no cierran sus bloques generales. Los resultados efectivos de las pruebas de recuperación figuran en DEVELOPMENT_LOG.md, incluidos fallos o bloqueos si los hubiera.

## Etapa A — Motor táctico y deportivo: EN DESARROLLO

| Bloque original | Estado preciso | Trabajo restante / aceptación |
|---|---|---|
| A0 Auditoría | Completado como inventario y planificación | Mantener matriz, evidencia y límites en cada incremento. |
| A1 Apoyos/contexto | Parcial: apoyos persistentes y amplitud contextual implementados | Validar utilidad, continuidad, seguridad y equilibrio en escenarios nuevos y posesiones prolongadas. |
| A2 Criterios y espacios | Parcial: orientación, memoria, llegada y capacidades; apoyos con percepción propia | Completar atención/percepción sin balón, recepción/anticipación y contornos de accesibilidad; comprobar estabilidad y cambios de función. |
| A3 Ventajas | Pendiente de modelo completo; hay puntuaciones y recuentos locales | Comparar conservar/progresar/finalizar por ventaja numérica, posicional, cualitativa y dinámica con casos contrarios. |
| A4 Conductas/ciclo | Parcial: ataque, órdenes y defensa 0.49–0.53 | Ampliar y validar protección de finalización, fijación/superación, rupturas sincronizadas, ayudas y reorganización adaptativa. |
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

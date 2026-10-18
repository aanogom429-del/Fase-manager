# Matriz de cobertura del motor táctico

Fecha: 18-10-2026. Base auditada: motor 0.34, commit ced4caa81ae015b105ab255c31bfbcef71b89329.
Auditoría inicial de 0.34. Actualización A1 en 0.35: corrección acotada documentada al final; los estados de cobertura general permanecen parciales.

## Fuentes y alcance

Documentos del usuario contrastados: El-Espacio-de-Fase-en-Futbol-Criterios-conformadores-2.pdf; Marco-de-Interpretacion-de-los-Espacios-de-Fase-2.pdf; elciclodejuego-2.pdf.
La traducción computacional y los casos de aceptación siguientes son propuestas de ingeniería del proyecto, no afirmaciones literales de los documentos ni instrumentos psicológicos validados.
Referencias de implementación: [index.html](../index.html), [reglas](REGLAS_IMPLEMENTACION.md), [hoja de ruta](HOJA_DE_RUTA.md).

Estados:
- **Parcial**: existe una aproximación funcional; el requisito completo sigue abierto.
- **Pendiente**: no se identifica una representación explícita suficiente.
- **Operativo acotado**: funciona en el alcance descrito; no implica cobertura general.
- **Validado**: reservado para evidencia documentada de aceptación y contraste independiente. Ningún elemento del marco recibe este estado en esta auditoría.

Las situaciones de aceptación de las tablas son **especificaciones pendientes de ejecutar**, salvo la evidencia acotada A1 detallada al final; no son bloques completos superados. Se aplicarán a ambos equipos y sentidos, manteniendo geometría equivalente, semilla reproducible y prioridades de recepción, reglamento y órdenes. No se exige la misma decisión siempre, ni se premia avanzar o moverse por sí mismo.

## Criterios conformadores

| ID | Elemento y estado | Evidencia actual | Información y decisión pendientes | Caso de aceptación |
|---|---|---|---|---|
| C01 | Zona de pelota · Parcial | phaseRelations, attackingTargets, chooseAction: distancias, presión y zona del campo | Entorno funcional local, acceso al balón y consecuencias de moverlo | Tras un cambio de orientación, reajustar opciones y oposición; registrar qué relación cambia |
| C02 | Ubicación · Parcial | Líneas de pase, separación y destinos por roles | Relación con líneas rivales, espacios accesibles y utilidad de permanecer | Una posición útil se mantiene; otra tapada se adapta sin duplicar al compañero |
| C03 | Perfilación · Pendiente | Sin orientación corporal explícita | Orientación, percepción, recepción y coste de giro | Misma posición, balón y rivales, distinta orientación: cambiar tiempo o repertorio viable de recepción |
| C04 | Individualidad · Parcial | players: speed, reactionDelay y passPrecision derivados del puesto | Ocho áreas I01–I08, diferenciación estable y límites observables | Variar una capacidad en escenarios emparejados afecta su mecanismo específico sin bonificación global |
| C05 | Trayectorias · Parcial | Vuelo de balón, destinos continuos y tiempo de llegada aproximado | Velocidad actual, aceleración, giro e intercepción anticipada | Dos jugadores equidistantes con movimientos opuestos no tienen automáticamente la misma llegada |
| C06 | Resonancia empática · Pendiente | Pared y coordinación programada de destinos; no equivalen al constructo | Ajuste recíproco, anticipación de compañeros y asociaciones contextualizadas | Si un apoyo cambia su intención, el otro adapta la suya; diferenciar coordinación programada de relación aprendida |
| C07 | Integración simultánea · Parcial | Cálculos geométricos repartidos entre funciones | Lectura compartida que combine criterios sin una cadena rígida de fases | Un cambio de orientación o rival actualiza opciones, espacio funcional e intención; explicar factores y conflictos |

## Individualidad: ocho áreas

No inferir estas áreas de coordenadas de tracking. Los indicadores por definir requieren revisión conceptual y límites de interpretación.

| ID | Área y estado | Base / información pendiente | Decisión afectada | Caso de aceptación |
|---|---|---|---|---|
| I01 | Coordinativa · Parcial | Precisión del pase; faltan control, ajuste y repertorio técnico | Recurso ejecutable y error contextual | Misma intención con distinta dificultad técnica cambia ejecución, no destino táctico por decreto |
| I02 | Condicional · Parcial | Velocidad máxima; faltan aceleración, frenada y capacidad de esfuerzo | Llegadas y recuperación de posición | Carrera corta/larga y giro producen diferencias coherentes sin teletransporte |
| I03 | Cognitiva · Parcial | Demora fija; faltan percepción, atención y anticipación | Opciones percibidas y momento de decidir | Una opción fuera del campo perceptivo no se usa como información perfecta instantánea |
| I04 | Mental · Pendiente | Definir por separado del área cognitiva: concentración y regulación ante dificultad | Persistencia y revisión de decisiones | Distracción o recuperación de concentración afectan mecanismos definidos, no azar indiscriminado |
| I05 | Emotivo-volitiva · Pendiente | Definir motivación, confianza situacional y esfuerzo asumido | Riesgo y continuidad del esfuerzo | Mismo contexto con distinto estado modifica tendencias con límites; nunca garantiza éxito |
| I06 | Bioenergética · Pendiente | Carga, disponibilidad energética y recuperación | Esfuerzo sostenible y recuperación | Esfuerzos repetidos y descanso alteran capacidades de forma gradual y reversible |
| I07 | Socioafectiva · Pendiente | Familiaridad/confianza entre compañeros; no etiquetas psicológicas inferidas | Elección de asociaciones y anticipación mutua | Relación específica afecta a esa asociación; no mejora todas las acciones del equipo |
| I08 | Expresivo-creativa · Pendiente | Repertorio y exploración de soluciones viables | Variación contextual de recursos | Aparecen alternativas legales y útiles, sin confundir creatividad con ruido aleatorio |

## Espacios funcionales

| ID | Elemento y estado | Evidencia actual | Pendiente | Caso de aceptación |
|---|---|---|---|---|
| E01 | Intervención · Parcial | phaseRelations: poseedor, llegada y disputa próxima | Participación inmediata según capacidad real, orientación y trayectoria | Rival o compañero que disputa puede intervenir aunque no posea el balón |
| E02 | Apoyo mutuo · Parcial | Distancia/conexión, penalización de línea y receptor previsto | Incorporación en sucesivos momentos y ayudas ofensivas/defensivas | Jugador cercano tapado y jugador más lejano accesible reciben valoración funcional distinta |
| E03 | Cooperación · Parcial | Categoría residual y destinos de amplitud/profundidad/equilibrio | Identificar contribución estructural positiva; no basta no intervenir | Explicar qué aporta cada cooperante; detectar uno que no ofrece utilidad |
| E04 | Contornos relacionales · Parcial | phaseContour: envolvente convexa suavizada con márgenes | Campo funcional y curvas de nivel, no solo envolvente de posiciones | Con posiciones iguales y orientación/oposición distintas cambia el contorno cuando cambia la accesibilidad |
| E05 | Cambio de función · Parcial | Reclasificación dinámica y apoyos persistentes | Estabilidad sin impedir adaptación a una ventaja clara | Pase, pérdida y recepción cambian funciones sin oscilación innecesaria ni congelación del grupo |

## Ventajas

| ID | Ventaja y estado | Evidencia actual | Lectura / decisión pendiente | Caso de aceptación |
|---|---|---|---|---|
| V01 | Numérica · Pendiente | Proximidades; sin balance local explícito completo | Participantes capaces de intervenir y superioridad local | Distinguir 2 contra 1 de 2 contra 2 considerando accesibilidad, no solo recuento global |
| V02 | Posicional · Parcial | Libertad y líneas de pase en chooseAction | Ubicación respecto a rivales y líneas, recepción útil | Priorizar justificadamente una recepción entre/detrás de líneas frente a una libre pero ineficaz |
| V03 | Cualitativa · Parcial | Atributos simples, sin valoración de emparejamientos | Capacidades relevantes en esa oposición | Un duelo cambia de valoración al cambiar capacidades pertinentes, sin éxito obligatorio |
| V04 | Dinámica · Parcial | Llegada aproximada y avance geométrico | Ventaja de movimiento, orientación, velocidad y sincronización | Una ruptura con ventaja temporal se distingue de otra tardía con igual destino |
| V05 | Socioafectiva · Pendiente | Sin modelo relacional específico | Familiaridad y anticipación compartida, vinculadas a I07/C06 | Una combinación familiar puede sincronizarse mejor sin anular respuesta del rival |

## Conductas ofensivas

| ID | Conducta y estado | Evidencia actual | Intención pendiente | Caso de aceptación |
|---|---|---|---|---|
| O01 | Seguridad · Parcial | Apoyos retrasados y equilibrio | Conservar una salida útil según presión | Bajo presión existe una salida viable si la configuración la permite; no se fuerza avanzar |
| O02 | Continuidad · Parcial | Dos apoyos persistentes y alternativas cercanas | Encadenar opciones tras el pase | Tras recibir otro compañero, se reorganizan opciones para la acción siguiente |
| O03 | Progresión · Parcial | Avance, conducción y pase con libertad | Mejorar posibilidades, no solo coordenada longitudinal | Apoyar a distintas alturas; evitar retorno obligado por destinos fijos cuando hay solución progresiva viable |
| O04 | Ruptura · Parcial | Profundidad y restricción de fuera de juego | Momento, rival superado y trayectoria accesible | Carrera coordinada con pasador, legal y cancelable cuando desaparece la opción |
| O05 | Superación · Pendiente | Puede emerger de pases, sin intención explícita | Ofrecerse más allá de quienes presionan/contienen | Identificar qué oposición queda atrás y qué oposición permanece |
| O06 | Fijación · Pendiente | Ocupación incidental; sin intención causal explícita | Condicionar rival para habilitar compañero | El rival responde o mantiene su posición; el ataque adapta la solución, sin atracción garantizada |

## Conductas defensivas

| ID | Conducta y estado | Evidencia actual | Intención pendiente | Caso de aceptación |
|---|---|---|---|---|
| D01 | Presión · Parcial | defensiveOrder/defendingTarget: presor estable y cobertura | Presión conjunta según acceso, orientación y ayudas | Si el primer defensor salta, otro cubre; si no puede llegar, revisar presión |
| D02 | Contención · Parcial | Cobertura y recuperación de profundidad | Orientar y limitar progresión, temporizar | Un defensor superado en número gana tiempo sin perseguir ciegamente el balón |
| D03 | Protección de finalización · Parcial | Retroceso y referencias de portería | Priorizar accesos, remates, receptores y área | Ante amenaza de remate, proteger zona peligrosa sin arrastrar a todos al poseedor |
| D04 | Disuasión · Pendiente | Ocupación de líneas incidental | Negar opciones mediante posición estratégica | Cerrar una línea modifica las opciones rivales aunque no haya entrada ni recuperación |

## Ciclo y prioridades adaptativas

Las fases son interpretaciones funcionales que pueden solaparse y cambiar; no una secuencia obligatoria ni los estados de interfaz choose/resolve/review/settle.

| ID | Elemento y estado | Base actual | Pendiente y aceptación |
|---|---|---|---|
| F01 | Iniciación y confort · Parcial | Reinicios y posesión; sin reconocimiento funcional | Tras recuperar bajo presión, generar margen de tiempo/espacio; tras recuperar libre, permitir progresar directamente |
| F02 | Disposición posicional · Parcial | Amplitud, profundidad y apoyos | Organizar relaciones útiles según oposición; permitir reorganizar sin exigir pases prefijados |
| F03 | Superación · Pendiente | Avances geométricos | Reconocer oposición superada y actualizar ayudas; no etiquetar por cruzar una coordenada fija |
| F04 | Finalización · Parcial | Tiro y centros por distancia/zona | Convertir ventaja en remate razonable; poder conservar si el remate está cerrado |
| F05 | Presión tras pérdida · Parcial | Cambio de posesión y roles defensivos | Decidir presión o protección según posibilidades reales, conservando continuidad espacial |
| F06 | Temporización · Pendiente | No diferenciada explícitamente del retroceso | Ralentizar/orientar al rival y medir tiempo ganado para reorganización |
| F07 | Contención y retroceso · Parcial | Repliegue de jugadores superados | Coordinar quién contiene y quién recupera estructura; impedir huecos por retirada indiscriminada |
| F08 | Protección de zona final · Parcial | Referencias hacia portería | Ajustar prioridad al peligro y volver a presionar cuando cambie la situación |
| F09 | Goles y reinicios · Parcial | Gol, reanudaciones y procedimientos existentes | Revisar con matriz reglamentaria; no convertir el ciclo gráfico en guion obligatorio del partido |

## Requisitos transversales

| ID | Elemento y estado | Evidencia / límite | Aceptación pendiente |
|---|---|---|---|
| T01 | Continuidad entre modos · Operativo acotado | Pausa y cambio libre/guiado conservan estado; tests/continuity.cjs | Mantener estas garantías al añadir orientación, perfiles y relaciones; incluirlos en restauración |
| T02 | Decisiones sin balón · Parcial | Órdenes individuales/coordinadas para jugadores azules de campo | Opciones contextuales ligadas a O/D/E; duración, cancelación, prioridades y ambos sentidos |
| T03 | Técnica y reglamento · Parcial | Acciones existentes y REGLAS_IMPLEMENTACION.md | Matriz específica de repertorio y reglas; separar acción técnica de intención táctica |
| T04 | Errores plausibles · Parcial | passExecution y variación contextual | Distinguir error perceptivo, decisional, técnico y de sincronización; no justificar bloqueos como error humano |
| T05 | Validación real · Parcial | Ventanas de dos partidos; resultados mixtos, muestras ya usadas | Reservar muestras nuevas antes de medir; anotar utilidad táctica y contexto además de error posicional |
| T06 | Entrenamiento · Pendiente | Propuesta, sin aprendizaje persistente | Guardar situación, practicar con variantes, conservar mejora específica y medir retención/transferencia |
| T07 | Explicación · Operativo acotado | Inspector pasivo de destinos e intenciones almacenadas | Ampliar a nuevos factores sin alterar simulación; explicar prioridad final y antigüedad de percepción |

## Contrato de cada actualización

1. Elegir IDs de esta matriz y problema observable; no declarar todo un bloque completado por añadir una variable.
2. Registrar entrada, hipótesis, alternativas y prioridad elegida. Mantener criterios simultáneos, percepción imperfecta y posibilidad de error.
3. Definir casos positivos y contracasos antes de ajustar parámetros; añadir simetría, cambio de posesión, pausa y reproducción cuando el estado afectado lo requiera.
4. Comparar con base fija y misma semilla; publicar regresiones y límites. Los escenarios sintéticos prueban mecanismos, no validez ecológica.
5. Actualizar evidencia: commit, caso, resultado, alcance y muestras usadas. Solo pasar a validado tras aceptación documentada y contraste independiente pertinente.
6. Fijar métricas, protocolo y umbrales de éxito antes de evaluar una muestra reservada. No inventar porcentajes de finalización.

## Actualización A1: apoyos contextuales

IDs: O01–O03, E02–E05, C02/C05 y T01/T02/T07. Estado: implementada una corrección acotada en 0.35 y comprobada mediante casos sintéticos; contraste independiente pendiente.
Objetivo: eliminar retrocesos impuestos por una referencia fija cuando existe una alternativa útil, preservando seguridad, recepción y equilibrio. No eliminar universalmente los pases atrás ni los límites de equilibrio.

Casos a fijar antes de modificar attackingTargets:
- Progresión libre con apoyo ya adelantado y conectable: no obligarlo a volver detrás solo por ocupar la función de apoyo.
- Poseedor presionado y salida frontal cerrada: conservar una alternativa de seguridad, incluso retrasada.
- Dos compañeros convergiendo al mismo destino: obtener opciones complementarias sin retirar automáticamente a ambos.
- Receptor en vuelo u orden explícita vigente: respetar su prioridad.
- Pérdida durante progresión: cancelar función ofensiva incompatible y reorganizar.
- Repetir geometría reflejada y en ambos equipos; pausar/cambiar modo no reinicia la jugada.

Observar destino propuesto, restricciones, lectura almacenada y desplazamiento ejecutado; medir opciones accesibles, duplicación, retrocesos impuestos y equilibrio. Un retroceso longitudinal por sí solo no es fallo.
Usar primero el inspector existente para aislar un caso causal reproducible; conservar las ventanas ya analizadas como diagnóstico. Una corrección de estos casos solo cerrará ese alcance, no E04, C03 ni la teoría completa.

## Cierre del hito A y trabajo posterior

Motor táctico 1.0: cobertura operativa de los elementos acordados, límites explícitos, acciones/reglas compatibles, ausencia de bloqueos sistemáticos y validación documentada en ambos sentidos y modos.
Para afirmar cobertura completa del marco, deberán resolverse también C03, C06 y las ocho áreas; cualquier simplificación será declarada, nunca presentada como equivalencia científica.
El aprendizaje de T06 queda después del núcleo, con preparación de identidad/perfiles/restauración antes. Hito B: producto 1.0, partidas, interfaz y estadísticas. Hito C: adaptación iOS, TestFlight y publicación. No se adelantan por completar esta documentación.


## Evidencia A1 · motor 0.35

Causa reproducida en ambos sentidos: con balón en altura relativa 50, apoyo conectado en 56 y salida de seguridad en 42, los destinos anteriores eran 42 y 54. El orden de utilidad intercambiaba sus alturas sin necesidad. Ahora conservan 56 y 42 cuando ambas líneas están accesibles y no están marcados de cerca.

Implementación: connectedSupportPair y attackingTargets. Solo durante posesión controlada, para los dos apoyos seleccionados y sin órdenes vigentes o pendientes sobre ellos. Distancia al balón 6–25, altura avanzada 0–12 y retrasada −18 a −1, separación mínima 6, distancia al rival >3 y penalización de línea <6: umbrales provisionales en unidades del campo, no metros ni valores calibrados con partidos. Se mantienen después las restricciones de fuera de juego, límites y separación. La demora de lectura puede mantener temporalmente un destino previo.

Evidencia: tests/contextual_supports.cjs compara con tests/fixtures/engine-v034.html, conserva seguridad, comprueba línea frontal bloqueada, apoyo retrasado marcado, orden pendiente/ejecutada, recepción, pérdida, simetría, orden de jugadores, pausa y restauración. Incluye tres simulaciones de 60 s con semillas fijadas para continuidad y estados finitos; no demuestra calidad táctica de un partido completo.

No cambia el criterio de selección/persistencia, equilibrio ni los parámetros individuales. No resuelve otros tipos de apoyo regresivo, perfilación, trayectorias anticipadas ni aprendizaje. Durante balón en vuelo se conserva la política previa y la prioridad del receptor.

Los informes de tracking 0.34 siguen archivados y etiquetados como históricos. Sus pruebas de reproducción usan explícitamente la instantánea de esa versión; las pruebas de juego usan index.html actual. No se presentan como validación de 0.35. Los evaluadores con balón impuesto y sin poseedor no activan esta corrección: se necesita un protocolo con posesión identificada antes de contrastar ventanas nuevas. Próxima comprobación de A1: fijar ese protocolo y reservar ventanas sin ajustar estos umbrales a posteriori.

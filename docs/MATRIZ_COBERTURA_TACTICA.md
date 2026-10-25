# Matriz de cobertura del motor táctico

## 0.75 — Progresión corta con continuidad

A3/A4: corrige un hueco de 0.74: una salida progresiva corta segura desactivaba la circulación pero podía acabar eligiéndose el pase profundo expuesto. En zona organizativa aproximada (avance <=65), espacio del poseedor >=4 y riesgo del mejor pase >=4, elige progresión corta fresca (avance >3, distancia <=25, riesgo <=3, espacio >=5), o apoyo lateral/retrasado si aquella falta. No fuerza retroceso cuando hay avance claro. Conserva el resto de la política y reglas. Prueba espejo en 16 semillas: progresión corta, pase profundo abierto y alternativa de conservación con receptor marcado. La prueba falla contra 0.74 y pasa con 0.75. No es reconocimiento completo de fases ni garantía de posesión. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.74 — Conservar como principio organizativo

Petición del usuario: conservación y progresión en iniciación y disposición posicional. Aproximación inicial, NO identificación completa de fases: poseedor hasta avance 65. Sin presión inmediata (espacio >=4), si mejor pase tiene riesgo >=4 y no hay salida progresiva corta segura, prioriza apoyo lateral/retrasado fresco, distancia <=25, riesgo <=3 y espacio >=5, antes de conducir/forzar avance. En avance <35 y presión <3.5, aprovecha salida corta progresiva o de conservación antes del despeje aleatorio. Conserva progresión abierta, percepción y reglas; no asegura completar pases. No aplica nueva política al último tercio ni sustituye salida del portero. Umbrales heurísticos. Prueba organizing_possession: ambos sentidos, iniciación presionada y zona media sin presión, 16 semillas, apoyo marcado/oculto y progresión abierta. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicación main/Pages.

## 0.73 — Confianza gradual en la separación

A2/A4: la penalización de aglomeración en destinos de apoyo y separación lateral pondera cada compañero por 1 - edad del recuerdo / duración individual de memoria. La observación actual pesa 1; el recuerdo caduca con peso 0. No actualiza posiciones ocultas ni modifica el formato guardado: confianza derivada al consultar. Recuperación habilitada conserva su veto de ocupación hasta caducidad; coordinación global y línea táctica siguen pendientes. No modela colisiones ni garantiza mejor rendimiento táctico. Prueba spacing_confidence.cjs en ambos sentidos: decaimiento, destino, refresco y restauración. Siete bloques abiertos; 0.53.1 excluida; sin validación científica o Safari/iPhone. Publicación main/Pages.

## Incremento 0.72

Incremento A2/A4: la separación lateral de jugadores no asignados a apoyo y la ocupación del destino de recuperación habilitada usan compañeros observados/recordados (knownTeammates), sin consultar sus coordenadas ocultas. Mantiene el criterio perceptivo existente de los apoyos y el formato de memoria/guardado. Pruebas espejo de observación, recuerdo sin actualización oculta, refresco al mirar, caducidad, expulsión, movimiento, pausa y restauración; además recuperación directa/desvío. La 0.71 falla el caso oculto (destinos y=16/24); la 0.72 no cambia ese destino por movimiento no visto. No es evitación física de colisiones: puede haber aproximación a un compañero desconocido. Línea táctica de fuera de juego y coordinación de funciones continúan globales; no completa percepción sin balón. Siete bloques abiertos; 0.53.1 excluida; sin validación científica ni Safari/iPhone. Publicar main y mismo Pages.

## Incremento 0.71

Incremento A2/A4: la separación lateral de jugadores de campo no asignados a apoyo usa espacio percibido, con recuerdos e incertidumbre, en lugar de la posición real del rival más cercano. Los apoyos conservan su política perceptiva existente. Pruebas espejo: rival oculto, observación directa, recuerdo sin actualizar coordenadas ocultas, caducidad, movimiento y restauración. La comparación con 0.70 reproduce el fallo previo (destino lateral 16 frente a 24 según un rival no visto); 0.71 conserva el destino en ese caso. No completa percepción sin balón: línea táctica de fuera de juego, coordinación de funciones y separación respecto a compañeros siguen usando información compartida/global. Sin validación científica ni Safari/iPhone. Siete bloques abiertos; investigación 0.53.1 excluida; publicación en main y mismo Pages.

## Incremento 0.70

C03/C05/T03: recepción rasa con absorción de velocidad existente mediante frenada si perfil y espacio percibido lo permiten. Conserva preparación y no libera antes el balón. Evidencia moving_reception.cjs y regresiones reception/acceleration/anticipation_first_touch/aerial_play. No añade toque independiente ni recepción aérea completa; cobertura sigue parcial.

## Incremento 0.69

F04/A3: no forzar centro automático hacia receptor percibido muy marcado; elegir otro rematador elegible o valorar pase/conducción. Prueba cross_selection.cjs: ambos equipos, alternativa libre, memoria/caducidad y múltiples semillas. aerial_play.cjs mantiene centros manuales y ejecución aérea. No incorpora ventaja aérea individual ni trayectorias de salto; bloques generales abiertos.

## Incremento 0.68

O01/A3/A4: conducción lateral como alternativa cuando ningún corredor progresivo cumple el margen de separación percibida. Conserva la comparación con pases y no fuerza conducción bajo presión inmediata. Evidencia tests/lateral_carry.cjs y short_carry.cjs: espejo, movimiento, prioridad progresiva, cierre total y posiciones ocultas. No equivale a un modelo completo de fijación, protección o regate; los bloques siguen abiertos.

## Incrementos 0.66–0.67

O04/A2/A4: regreso directo de delanteros adelantados no asignados a apoyo y elección de pequeños desvíos si destino/corredor están cerrados. Tests onside_recovery.cjs: espejo, movimiento físico, ocupación, corredor bloqueado, ausencia de ruta, información rival oculta, jugador habilitado y golpeo previo. Reutiliza línea táctica global y posiciones compartidas de compañeros; no cierra percepción sin balón ni sincronización de rupturas. Siete bloques permanecen abiertos.

## Incremento 0.64

F01/T03/T04: receptor del envío largo coherente con su destino conocido, alcance diagonal y selección por espacio percibido. Sin receptor elegible se identifica balón al espacio; fuera de juego percibido en juego abierto, exención en saque de meta. Evidencia tests/keeper_long_target.cjs; sigue pendiente repertorio aéreo completo y validación de utilidad. Siete bloques continúan abiertos.

## Incremento 0.63

F01/T03/O01: el portero decide salida corta en juego abierto desde opciones observadas y riesgo percibido, en vez de alternar inicialmente el largo por azar. Ante presión o falta de receptor elegible conserva largo. Evidencia tests/keeper_distribution.cjs y aerial_play.cjs; no completa la iniciación colectiva, posesión en manos, reglamento del portero ni sus capacidades técnicas. Estados generales parciales.

## Incrementos 0.61–0.62

0.61 amplía F04/V02: dos ángulos laterales de remate cuando el centro está tapado, con percepción limitada y error de ejecución. 0.62 amplía O01/A3: alternativa corta lateral/retrasada observada y poco expuesta ante presión y mejor opción ordinaria bloqueada. Evidencia: tests/shot_selection.cjs y tests/safe_outlet.cjs, casos espejo y contrarios. Estados generales siguen parciales; no demuestra superioridad global ni cierra ninguno de los siete bloques.

## Evidencia vigente 0.56–0.60

Las restricciones históricas a versiones posteriores quedan sustituidas por ROADMAP.md. Estados generales siguen parciales; no se incorpora la investigación 0.53.1.

- 0.56 O01–O03/E02: apoyo que cambia altura ante línea tapada; tests/support_escape.cjs.
- 0.57 T03/O03: receptores percibidos en fuera de juego excluidos de pases y centros automáticos; tests/onside_decisions.cjs.
- 0.58 O03/C05: conducción diagonal corta cuando los recorridos largos están cerrados; tests/short_carry.cjs.
- 0.59 V04/O04/C05: pase automático al espacio sobre carrera visible ya iniciada, con filtros de línea, presión y alcance; no sincroniza una ruptura nueva; tests/automatic_lead_pass.cjs.
- 0.60 F04/D04/V02: un bloqueo percibido de la línea central puede disuadir el tiro automático y dar paso a otras opciones; portero excluido de ese veto. No evalúa toda la portería ni cierra la selección de ventajas; tests/shot_selection.cjs. D04 incorpora este mecanismo acotado de disuasión, sin completar la conducta estratégica defensiva.

Quedan abiertos los siete bloques de cierre descritos en CIERRE_MOTOR_TACTICO.md. Estas evidencias son sintéticas, no validación científica integral. Consultar DEVELOPMENT_LOG.md para ejecuciones y límites.

Actualización vigente 0.53 (20-10-2026): protección de finalización ante poseedor visible y conservación de cobertura de tiro, integrada sobre 0.52. [Mecanismo, pruebas dinámicas y límites](PROTECCION_FINALIZACION_053.md). En 20 parejas sintéticas: 3 reducen goles concedidos, 16 empatan y 1 empeora. A2/A4/A7 y el cierre defensivo siguen abiertos; no se demuestra mejora general. Consultar [ROADMAP.md](../ROADMAP.md) para estado consolidado. Las entradas inferiores se conservan como historial. No se inicia 0.54.

Avance 0.52 D01/D02/D04/F05–F08: [presión y exposición](PRESION_EXPOSICION_052.md). Primer defensor considera línea abandonada sin respaldo e inferioridad local percibida. Pruebas espejo y contracasos; geometría y recuento aproximados, sin garantía de interceptación. Pendientes protección de finalización y validación con pases ejecutados y oposición reactiva. Cobertura general parcial.

Avance 0.51 D02/D04/C02/E03: [amenazas simultáneas](AMENAZAS_SIMULTANEAS_051.md). Coste de abandonar líneas recordadas sin respaldo y alternativa de mantener posición. Pruebas causales frente a 0.50, espejo, respaldo ocupado y caducidad. Protección geométrica y respaldo presente no garantizan interceptación ni relevo futuro. Pendiente presión en inferioridad, acceso que abre el presionante y protección de finalización; cobertura general parcial.

Avance 0.50 D01/D02/D04/F05/F06/T02: [coordinación y ayuda disponible](COORDINACION_DEFENSIVA_050.md). Asignación ligada a línea percibida alcanzable, exclusión de órdenes y verificación de llegada de la ayuda. Casos espejo y regresiones; comparaciones controladas sin mejora general. Pendiente valorar amenazas simultáneas y consecuencias de abandonar coberturas. Estados generales permanecen parciales.

Avance 0.49 D01/D02/D04/F05/F06: [defensa contextual](DEFENSA_CONTEXTUAL_049.md), primera selección de presión/temporización y cobertura de línea vista/recordada alcanzable. Pruebas causales en ambos equipos; comparación controlada sin mejora de las medidas previas. Asignación colectiva y disponibilidad funcional de ayuda pendientes. Estados generales permanecen parciales.

Diagnóstico D01–D04/F05–F08/T05: [pérdidas controladas](PERDIDA_CONTROLADA_048.md), seis geometrías reflejadas y muestras completas 0/2/5 s; mismas respuestas defensivas desde iguales estados en 0.47 y 0.48. Se mantiene una de dos líneas geométricas abierta; no se infiere éxito o fracaso táctico global. Siguiente trabajo: presión/cobertura/temporización según peligro. [Estado de cierre](CIERRE_MOTOR_TACTICO.md) consolida pendientes del marco y del núcleo.

Evidencia diagnóstica E02–E04/D01–D04/T05: [utilidad geométrica 0.48](UTILIDAD_TACTICA_048.md). Observación de líneas y 0/2/5 s tras pérdida con exposición y censura explícitas. Más opciones geométricas en dos simulaciones; no prueba de pases ejecutables ni mejora defensiva. Semilla de aleatoriedad del entorno configurable para distinguir repeticiones. Pendiente contraste controlado de protección de líneas y llegada rival. Sin cambio de cobertura ni conducta.

Evidencia 0.48 A1/A2/E03–E04/T05: [amplitud contextual progresiva](AMPLITUD_CONTEXTUAL_048.md) integrada. Pruebas de posesión larga, ocupación observada, cambio de lado y restauración en ambos equipos. Tres ventanas nuevas del mismo partido mejoran error 10,7–21,9 %, sin superar referencia inmóvil. Fuente local completa recuperada y prefijos históricos verificados. Calidad táctica general, funciones reales y validación por otro partido pendientes.

Intervención experimental A1/A2/E03–E04: [amplitud desde relaciones iniciales](EXPERIMENTO_AMPLITUD_047.md). Menor error posicional en tres ventanas reutilizadas y prueba causal de recolocación lateral en ambos sentidos. Pendientes amplitud sostenida, cambios de función y secuencias nuevas. No integrada en producción; cobertura permanece parcial.

Evidencia diagnóstica A1/A2/T05: [desglose por jugador y velocidad previa](DIAGNOSTICO_DESTINOS_047.md). Replay emparejado con historial anterior, trazas de destinos y prueba reproducible. La velocidad inicial no resuelve el desajuste; revisión de funciones/mapeo pendiente. Sin nueva conducta ni validación independiente; cobertura permanece parcial.

Actualización diagnóstica 19-10-2026: [contraste real 0.47](CONTRASTE_REAL_047.md). A1/A2/T03/T05 mantienen cobertura parcial: mejora posicional respecto a 0.35 en tres ventanas reutilizadas, sin superar referencia inmóvil. Etiquetas reales acreditan ejemplos del repertorio, no frecuencia calibrada ni calidad táctica del motor. Informes reproducibles reference-v047.json y metrica-game2-event-reference.json; sin cambios de conducta.

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
| C03 | Perfilación · Parcial | 0.37: preparación; 0.40–0.41: percepción; 0.42: coste de perfilación en desplazamiento y llegada | Control orientado con desplazamiento, primer toque autónomo general, mirada independiente, desplazamientos especializados y capacidades individuales | Misma posición, balón y rivales, distinta orientación: cambiar tiempo o repertorio viable de recepción |
| C04 | Individualidad · Parcial | players: speed, reactionDelay y passPrecision derivados del puesto | Ocho áreas I01–I08, diferenciación estable y límites observables | Variar una capacidad en escenarios emparejados afecta su mecanismo específico sin bonificación global |
| C05 | Trayectorias · Parcial | 0.43–0.44: velocidad vectorial con aceleración/frenada y coste angular; llegada aproximada | Calibración dinámica, llegada predictiva completa, contacto físico y anticipación aérea | Dos jugadores equidistantes con movimientos opuestos no tienen automáticamente la misma llegada |
| C06 | Resonancia empática · Pendiente | Pared y coordinación programada de destinos; no equivalen al constructo | Ajuste recíproco, anticipación de compañeros y asociaciones contextualizadas | Si un apoyo cambia su intención, el otro adapta la suya; diferenciar coordinación programada de relación aprendida |
| C07 | Integración simultánea · Parcial | Cálculos geométricos repartidos entre funciones | Lectura compartida que combine criterios sin una cadena rígida de fases | Un cambio de orientación o rival actualiza opciones, espacio funcional e intención; explicar factores y conflictos |

## Individualidad: ocho áreas

No inferir estas áreas de coordenadas de tracking. Los indicadores por definir requieren revisión conceptual y límites de interpretación.

| ID | Área y estado | Base / información pendiente | Decisión afectada | Caso de aceptación |
|---|---|---|---|---|
| I01 | Coordinativa · Parcial | Precisión del pase; faltan control, ajuste y repertorio técnico | Recurso ejecutable y error contextual | Misma intención con distinta dificultad técnica cambia ejecución, no destino táctico por decreto |
| I02 | Condicional · Parcial | 0.43–0.44: velocidad, aceleración, frenada y giro individuales; faltan capacidad de esfuerzo y calibración | Llegadas y recuperación de posición | Carrera corta/larga y giro producen diferencias coherentes sin teletransporte |
| I03 | Cognitiva · Parcial | 0.45: duración individual de memoria y confianza; anticipación acotada. Pendientes atención selectiva, percepción sin balón y otras diferencias cognitivas | Opciones percibidas y momento de decidir | Una opción fuera del campo perceptivo no se usa como información perfecta instantánea |
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
| D04 | Disuasión · Parcial | 0.60: bloqueo percibido de línea central disuade tiro automático; selección defensiva estratégica incompleta | Negar opciones mediante posición estratégica | Cerrar una línea modifica las opciones rivales aunque no haya entrada ni recuperación |

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

## Contraste posterior de A1 · poseedor identificado

Protocolo fijado previamente y ejecutado en tres ventanas nuevas de Sample Game 2. Resultado: dos ventanas sin activación y sin diferencia; una con 74/375 pasos de activación y error 5,8603 → 5,7584 m. No hay ajuste de parámetros ni evidencia suficiente para validación general. Se resuelve la limitación del antiguo replay sin poseedor mediante un evaluador específico, conservando los informes anteriores como históricos.

Evidencia reproducible y límites en [CONTRASTE_APOYOS_035.md](CONTRASTE_APOYOS_035.md), scripts/import_owner_holdout.py, scripts/evaluate_owner_holdout.cjs y tests/owner_holdout.cjs. Los estados generales de la matriz siguen parciales. Próximo trabajo de implementación: A2, comenzando por C03/I03 y preservando T01; validación amplia de A1 pendiente.

## Evidencia A2 inicial · orientación y percepción 0.36

C03/I03 avanzan parcialmente: cada jugador conserva bodyAngle, scanAngle y scanUntil; el giro tiene velocidad angular limitada. En decisiones automáticas del poseedor, orientación filtra compañeros receptores, dirección de tiro y destinos de conducción. Si no elige una solución, detiene su desplazamiento y programa un giro de búsqueda. Al recibir conserva su orientación y cancela la búsqueda anterior. Una marca amarilla muestra orientación sin girar el dorsal.

Parámetros provisionales de diseño: apertura 220° y giro máximo 180°/s. No son mediciones fisiológicas ni capacidades calibradas. Los rivales y riesgos de líneas de pase siguen disponibles al cálculo; no hay mirada de cabeza independiente, memoria visual, oclusión, atención selectiva ni visión periférica graduada. Las órdenes explícitas del usuario conservan su autoridad y no se filtran por este campo angular. El movimiento lineal no se limita por el giro y el control de recepción aún no tiene coste corporal. No equivale a completar C03, I03 o E04.

Estado: los tres campos escalares se incluyen en la copia/restauración de jugadores. Pausa y cambio de modo no los reinician; nuevo partido y saque inicial restablecen orientación; captura conserva orientación corporal. No se añade estado anidado compartido entre ensayo y repetición.

Pruebas en tests/orientation.cjs: misma geometría con orientación distinta, opción inicialmente no percibida y disponible después del giro, límite angular, simetría de 180°, conservación al recibir, pausa/restauración exacta, repetición determinista, indicador visual y tres simulaciones de 60 s con semillas fijadas. Es evidencia funcional sintética, no validación con partidos reales.

El evaluador del informe 0.35 usa ahora su instantánea tests/fixtures/engine-v035.html, identificada por la huella ya incluida en el informe. Sus resultados permanecen históricos y no validan 0.36. Siguiente incremento de A2: incorporar orientación al control/recepción y tiempo de preparación técnica, preservando decisiones explícitas y continuidad; después ampliar percepción a relaciones de apoyo y trayectorias.

## Evidencia A2 · preparación de recepción rasa 0.37

C03/I01/I03/T01: al capturar un pase raso, el jugador conserva su orientación inicial. Se calcula la diferencia angular respecto al origen del pase y una preparación provisional de 0,12 + 0,35 × diferencia/π segundos (0,12–0,47 s). Durante esa preparación gira gradualmente hacia el balón recibido, permanece en su posición y no puede decidir una nueva acción automática. La demora decisional existente puede ser mayor: las esperas se solapan, no se suman necesariamente.

Una acción técnica guiada elegida antes de estar listo queda en espera y se ejecuta una sola vez al completar la preparación. Conserva el compañero elegido y consulta su posición al ejecutar. Si pierde el balón o hay reanudación se cancela; si el destinatario ya no está disponible, informa y no ejecuta un pase inválido. Las órdenes sin balón continúan. La devolución de pared espera el control; no se presenta como un toque de primeras. Cambiar de modo conserva el plazo de preparación; la acción técnica guiada se cancela al cambiar de modo, como en el comportamiento previo.

Estado escalar por jugador: controlUntil, controlAngle, controlError y controlDuration. Se restaura con posición/orientación/tiempo y se limpia en situación nueva o saque inicial. El mensaje junto al campo muestra el tiempo restante. Las dos líneas de brazos siguen mostrando el giro corporal. No se cambia el campo perceptivo de 220°.

Pruebas en tests/reception.cjs: mismo pase con receptor de cara o de espaldas en ambos sentidos, ausencia de giro instantáneo, inmovilidad durante preparación, bloqueo de decisión automática, ejecución diferida única de orden, recepción elevada fuera de alcance, pausa, cambio de modo, restauración, pérdida, reanudación y devolución de pared. Valores de diseño no calibrados con jugadores ni partidos.

Límites: modelo solo para pases rasos a jugadores de campo; no desarrolla controles aéreos, blocajes ni remates de primeras. No añade fallo de control, desplazamiento del primer toque, pie dominante o coste físico general de girar. No es necesario que el cuerpo complete todo el giro para acabar la espera. El control de oponentes y rivales sigue simplificado. C03 e individualidad continúan parciales; no se afirma validación científica. Próximo incremento A2: anticipación de trayectorias y tiempos de llegada para orientar apoyos e intercepciones.

## Evidencia A2 · anticipación y pase al primer toque 0.38

C05/E01/E02/D01: vx/vy se calculan a partir del desplazamiento ejecutado en cada paso. arrivalTime proyecta esa velocidad durante la demora restante de lectura (máximo provisional 0,6 s) y estima después el trayecto a velocidad máxima. Detecta también llegada durante la trayectoria inicial. Se usa en acceso al balón, ayudas, elección del presor y cobertura. Un jugador que ya se acerca puede llegar antes que otro equidistante que se aleja. Estado escalar restaurable; reinicios limpian velocidad para no interpretar una recolocación como movimiento.

anticipateFlight examina ocho instantes de los siguientes 0,8 s como máximo, sobre el pase raso en vuelo. Receptor y primer defensor pueden dirigirse a un punto alcanzable de la trayectoria; si no existe, mantienen su política anterior. Recepción sigue teniendo prioridad sobre una orden sin balón. No modifica la trayectoria del balón ni garantiza interceptar. No modela aceleración/inercia, no acopla velocidad a giro, no anticipa balones altos y todavía no sustituye el pase al espacio de avance fijo por una predicción del futuro receptor.

I01/C03/O02/T02: primer toque no equivale a pared. Se ofrecen pared directa A→B→A, pared con control y pase enlazado A→B→C. En pases, el selector de compañero fija B y el nuevo selector de destino del primer toque fija C. C debe ser distinto de A/B. La elección de ambos se conserva al repetir. El primer toque está preacordado en esta combinación guiada; no se introduce aún una política general de primer toque para todos los pases autónomos.

La devolución o continuación directa exige pase raso entrante del iniciador al receptor previsto, velocidad no superior a 38 unidades/s, destinatario disponible, distancia saliente entre 3 y 24 unidades, percepción angular del origen y destino, rivales a más de 2 unidades y penalización de línea inferior a 6. Son umbrales de diseño sin calibración. Si no cumple, B controla y pasa al mismo destinatario elegido. Si el destinatario deja de estar disponible, cancela; nunca reemplaza automáticamente C por A. En la pared se conserva el punto de devolución a la carrera; hacia C se toma su posición actual al ejecutar.

La preparación de 0.37 se evita solo en un primer toque viable; se comprueban reglas de contacto/fuera de juego antes de ejecutarlo y se conserva el error normal de pase. No se garantiza acierto. El registro interno de contacto usa posesión transitoria dentro del mismo paso, pero no impone una espera ni un control adicional al pase directo. La acción incluye riesgo de intercepción.

Pruebas: tests/anticipation_first_touch.cjs contrasta tiempos de llegada, llegada durante la demora, encuentro alcanzable, geometría reflejada, exclusión aérea, A→B→A y A→B→C, conservación de C tras control, cancelación sin redirección a A, selector/restauración, error de pase y velocidades. Se actualizan pruebas de recepción para admitir punto de encuentro, no exigir siempre destino final. Las reproducciones de informes 0.34 y 0.35 usan las instantáneas correspondientes; no validan 0.38.

Próximo incremento: ampliar percepción/anticipación al destino de pases al espacio y contrastar estas decisiones con escenarios de oposición, sin confundir menor tiempo de llegada con ventaja táctica suficiente. C05 e individualidad permanecen parciales.

Ampliación 0.38: «Repetir pase: A → B → A» devuelve a la posición actual de A sin imponer la carrera de pared. Conserva la opción de primer toque, el control alternativo si no es viable y la cancelación si A deja de estar disponible. Pruebas específicas de destino, control y cancelación añadidas.


## Evidencia A2 · pase al espacio 0.39
C05 sigue parcial. El destino de la opción guiada se calcula mediante encuentro con velocidad constante observada, limitada a la velocidad del jugador, horizonte de 1,2 s y límites del terreno. Compara la llegada estimada con el tiempo de vuelo y vuelve a la posición actual si no hay una anticipación viable. Para un receptor parado no inventa una carrera. Dirección lateral y retroceso son válidas; no presupone avance hacia portería.

La precisión, oposición y fuera de juego siguen actuando. El destino se recalcula al ejecutar la acción. Pruebas en tests/lead_pass.cjs contrastan solución analítica, ejecución por interfaz, restauración, límites y sanción por fuera de juego. No añade política autónoma de pase al espacio ni aceleración, percepción con memoria, cambios de trayectoria futuros o validación empírica. Parámetros provisionales. Siguiente subpaso A2: memoria perceptiva limitada.


## Evidencia A2 · memoria perceptiva 0.40
I03/T01 avanzan de forma parcial: observación angular de compañeros y último lugar visto, con caducidad a 1,5 s. Se actualiza durante el tiempo simulado y antes de la decisión automática. No extrapola ni consulta la posición oculta para dirigir el pase; al recuperar visión renueva el registro. La valoración de pase raso reduce 3 puntos por segundo de antigüedad. El destino físico puede quedar desactualizado; conserva errores normales y comprobaciones reglamentarias reales.

tests/perceptual_memory.cjs prueba ambos equipos, pase a la posición antigua aunque el compañero se haya movido, caducidad exacta, renovación, expulsión, ausencia de observación inventada, pausa, copia independiente y restauración determinista. Regresiones de orientación (incluye tres simulaciones libres de 60 s), continuidad, primer toque, pase al espacio, fuera de juego y recepción superadas.

Límites: aplica a compañeros para pases/centros autónomos. Rivales, presión, líneas de pase, valoración de fuera de juego y organización colectiva siguen usando estado global; órdenes guiadas mantienen la perspectiva del entrenador. No hay oclusión, distancia visual máxima, mirada independiente, incertidumbre espacial graduada ni capacidad de memoria individual. La duración y penalización son decisiones de diseño provisionales, sin validación con tracking. No cierra I03 ni el marco completo. Próximo subpaso: información limitada de rivales y tratamiento explícito de incertidumbre.


## Evidencia A2 · oposición percibida 0.41
I03/C03/T01 siguen parciales. Última posición vista de cada rival durante 1,5 s; radio de incertidumbre de 2 × antigüedad en unidades del campo. Confianza agregada según rivales activos recordados y antigüedad. Riesgo basal de línea 4 × incertidumbre; límites conservadores del espacio estimado (12 − 8 × incertidumbre) y del corredor (9 − 6 × incertidumbre). Son parámetros de diseño, no mediciones empíricas.

chooseAction utiliza solo recuerdos para valorar presión, libertad de receptores, corredores, centros y posible fuera de juego. La evaluación de este último es una estimación; markOffside/penalizeOffside mantienen la regla con posiciones reales. La ejecución física, contacto y arbitraje no se vuelven perceptivos. La falta de conocimiento no inventa un rival localizado ni concede espacio libre infinito.

tests/opponent_perception.cjs contrasta ambos sentidos, bloqueo observado, posición oculta invariable, incertidumbre creciente, caducidad, renovación, fuera de juego estimado, pausa y copia independiente. Un par de decisiones con posiciones ocultas distintas conserva el mismo destino intencional. Otras siete suites de regresión superadas, incluyendo tres simulaciones libres de 60 s.

Límites: incertidumbre espacial circular y global simplificada; sin atención selectiva, oclusión ni memoria individual. Jugadores sin balón, ejecución del pase (presión física), combinaciones guiadas y decisiones del entrenador todavía acceden al estado real. Sin calibración con partidos ni validación del marco completo. Próximo subpaso A2: acoplar perfilación y desplazamiento.


## Evidencia A2 · coste angular de desplazamiento 0.42
C03/C05/T01 avanzan parcialmente. advancePlayer integra velocidad × (0,725 + 0,275 × cos del ángulo cuerpo-trayectoria) durante el giro limitado ya existente, y a velocidad alineada cuando termina. Valores provisionales: lateral 72,5%, hacia atrás 45%. No obliga a parar para girar; tampoco impide una carrera lateral o hacia atrás. vx/vy se calculan desde el movimiento ejecutado.

arrivalTime conserva la proyección de velocidad durante la demora de lectura y luego usa el mismo coste angular para alcanzar un destino fijo. La inversión numérica del tramo de giro se resuelve con iteración acotada; los viajes largos añaden el tramo alineado de forma directa. No anticipa aceleración ni cambios de intención, y conserva aproximaciones de reacción/contacto.

tests/turn_movement.cjs contrasta distancias analíticas, subdivisión temporal, lados/retroceso, espejo, llegada corta/larga, límites y restauración en el movimiento real. Regresiones de apoyos, órdenes, primer toque, recepción, pase al espacio, continuidad e inspector. Sin validación con partidos reales. No cierra C03/C05 ni añade inercia, frenada, trayectorias curvas, cabeza independiente o capacidades individuales. Próximo subpaso: aceleración y frenada.


## Evidencia A2 · tres actualizaciones 0.43–0.45
- C05/I02/T01: integración vectorial por subpasos ≤1/60 s; velocidad objetivo limitada por orientación y distancia de frenada; cambio de velocidad limitado por aceleración o frenada. vx/vy representan la velocidad final del subpaso. Paradas explícitas en reanudación, control estático y límites del terreno permanecen como excepciones.
- I01/I02/C04: capacidades de aceleración, frenada y giro explícitas por jugador, iguales en ambos equipos, sin inferencia desde tracking ni etiquetas de capacidad reales. La tabla de perfiles es inspeccionable en la interfaz. Pruebas emparejadas aíslan cada mecanismo.
- I03/C04/T01: caducidad individual de memoria de 1,2–1,8 s para compañeros/rivales, incluida confianza relativa. El radio de incertidumbre sigue creciendo con la antigüedad y no se convierte en conocimiento perfecto por ampliar la duración. Estado escalar y recuerdos preservados al restaurar.

arrivalTime usa el máximo del tiempo angular y el longitudinal acelerado tras la demora, con corrección de velocidad inicial negativa. Es una aproximación: no integra simultáneamente todos los efectos ni modela la frenada final para detenerse exactamente. anticipateFlight mantiene los radios de contacto; el destino del pase al espacio conserva extrapolación lineal limitada. No se afirma consistencia física exacta entre todos los predictores.

Pruebas nuevas: tests/acceleration.cjs y tests/individual_capabilities.cjs. Incluyen arranque 0,11 unidades en 0,1 s con aceleración 22, impulso antes de invertir, estabilización, giro y frenada diferenciados, memoria larga/corta bajo idénticas observaciones, simetría de perfiles y restauración. Regresiones existentes conservan recepción, primer toque, órdenes, reglas, apoyos y continuidad.

Pendientes: atención, percepción sin balón, fatiga/bioenergética, calibración, contacto físico, otras áreas de individualidad y validación externa. No hay aprendizaje. Siguiente subpaso A2: selección de apoyos desde información percibida.

## Evidencia A2/T03 · apoyos y juego aéreo 0.46

El ajuste local de los apoyos asignados usa recuerdos individuales para separación, presión y línea de pase. La asignación colectiva de funciones, anclaje al balón y límite táctico de fuera de juego siguen globales. tests/support_perception.cjs verifica simetría, recuerdo de un bloqueo, independencia ante movimiento oculto y caducidad. Alcance parcial, no eliminación completa del conocimiento global sin balón.

Despejes manuales/automáticos y de cabeza, centros con intento de cabeceo y envíos largos aéreos del portero. Ventana de cabeceo 1,4–2,8; radio de contacto existente; intento con probabilidad provisional reducida por oposición cercana. Un salto fallido no cuenta como toque. Un contacto válido pasa por las comprobaciones reglamentarias antes de crear el remate o despeje. El remate puede ir fuera, alto o ser detenido; no se adjudica gol por seleccionar la acción.

Los saques de meta alternan corto y largo conservando su exención de fuera de juego y segundo toque. En juego abierto, el portero selecciona destino largo desde compañeros observados/recordados; la reanudación mantiene selección global. No hay modelo de posesión en manos/volea, salto individual, choque aéreo o voleas de jugadores de campo. Altura y probabilidades son heurísticas sin calibración con partidos reales.

tests/aerial_play.cjs recorre centros hasta cabeceo en ambos equipos y contrasta cabeceo en fuera de juego, alturas imposibles, despeje de cabeza, salto fallido, despeje sin receptor y alternativas larga/corta del saque de meta. Se mantiene la resolución geométrica de gol y límites. El vuelo nuevo no hereda el cierre o la salida del centro que lo originó.

## Evidencia A2 · asignación perceptiva 0.47

I03/E02–E04 permanecen parciales. perceivedSupportReading calcula valor, línea, presión e incertidumbre con recuerdos del candidato; selectAttackSupports conserva dos puestos y el margen de sustitución. connectedSupportPair comprueba la seguridad con esas lecturas y exige incertidumbre menor de 0,75. Los recuerdos se actualizan por visión antes de valorar; no se actualizan posiciones ocultas.

Pruebas causales en tests/support_assignment_perception.cjs: un bloqueo observado sustituye al apoyo, mover al rival oculto no cambia su valor, caducar el recuerdo elimina su localización y mantiene incertidumbre, una mejora pequeña no cambia el puesto y una clara permite recuperarlo. La prueba histórica de bloqueo ahora orienta al apoyo hacia el rival para que el bloqueo sea visible; ya no exige que responda a un defensor que no ha visto. La conservación de altura, equilibrio y los casos de órdenes y pérdida siguen comprobados.

La comparación de candidatos y asignación de puestos es coordinada; balón/posesión, equilibrio, límites y fuera de juego táctico siguen globales. No cierra la percepción sin balón completa ni introduce comunicación entre agentes, atención selectiva o validación empírica. Próximo trabajo: contraste externo de apoyos y juego aéreo.

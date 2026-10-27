# Fase Manager — Registro de desarrollo y recuperación

## 0.88 — Cadena de compensaciones

Implementada cola de vacantes sin alterar prioridades ni crear nuevos campos de estado. Prueba line_chain para cuatro sistemas y dos sentidos: dos enlaces, referencias únicas, ausencia de ciclos, prioridades, límite espacial y liberación. Documentación de límites en docs/CADENAS_088.md. Estudio SkillCorner permanece separado; no se usaron sus umbrales para calibrar este cambio. Fallo previo decision_storage pendiente.

## 0.87 — Integración de compensaciones

Recuperado código local pendiente. Añadida prueba de integración de lineCoverAssignments en attackingTargets, con fixture espejo corregida. Documentación en docs/LINEAS_087.md. Cambios independientes de resultados SkillCorner; no redistribuyen datos originales. Se conserva investigación en rama separada y el fallo previo de decision_storage como pendiente. No validación en navegador real.

## 0.86 — Estabilidad tras contraste real

Implementada referencia longitudinal de posesión con ganancia 0,35 y desfase máximo 12; dos puestos de seguridad persistentes con margen de relevo de 8. Ver docs/ESTABILIDAD_BLOQUE_086.md. No se confunde fórmula objetivo con ganancia observada del centroide; no es aprendizaje ni validación de partido completo. PASS block_stability (4 sistemas ×2 sentidos, reducción objetivo y movimiento físico controlado, progresión larga, persistencia/relevo y snapshots), possession_shape, formation_selection, open_reception y simulation_entry. Diff --check limpio. Incidencia preexistente decision_storage sigue pendiente. Sin validación Safari ni afirmación de batería completa superada.

## 2026-10-27 — Otra referencia real: estructura del Game 3

Descarga completa de tres archivos Metrica, blobs coinciden con API; 69.661 fotogramas de primera parte procesados. 203 ventanas de cinco segundos, ninguna descartada por coordenadas incompletas. Alineación de 574 pases comprobada. Métricas y cautelas en docs/ESTRUCTURA_PARTIDO_3.md; resultados reproducibles en data/game3-structure.json. Dos pruebas Python superadas, diff --check limpio. No cambios en index.html: no se anuncia 0.86 ni aprendizaje entrenado. Hipótesis para siguiente ajuste: ganancia longitudinal 1 de destinos estructurales vs 0,26–0,31 de desplazamiento colectivo observado; requiere evaluación simulada antes/después. Fallo previo decision_storage sigue pendiente.

## 0.85 — Continuidad del perfil al recibir

PASS: open_reception, reception, moving_reception, anticipation_first_touch, body_profile, formation_selection y simulation_entry. git diff --check limpio. No se afirma batería completa superada.

Corregida pérdida de perfil abierto en prepareReception: fijaba siempre controlAngle hacia el origen. Ahora conserva ángulo actual cuando recibe dentro del plano frontal/lateral, también puede mirar al avance y perceivedSpace >5. Mantiene coste y plazo de control, sin teletransporte ni conocimiento de rivales ocultos. Ver tests/open_reception.cjs: ambos sentidos, presión, incertidumbre, perfil cerrado, exclusión aérea y orientación gradual. Las pruebas se ejecutan en Node/DOM simulado; no validación real/Safari. Incidencia previa decision_storage sigue pendiente. Publicación a comprobar tras commit.

## 0.84 — Perfilación y espacios de fase

Causa observada en código: orientBody igualaba rumbo corporal a destino de desplazamiento, incluso en reajustes cortos del apoyo; phaseRelations no añadía coste de orientación a la conexión ofensiva. Ahora los apoyos cercanos y receptores próximos abren balón/avance, defensores próximos orientan al balón, y la conexión suma demora por recepción de espaldas. No se modifica el sistema de control posterior al contacto ni se añade visión independiente de cabeza. Sin nueva consulta a posiciones ocultas de rivales.

PASS body_profile (ambos equipos, visión balón/avance, giro acotado, carrera larga, geometría idéntica con distinta relación de fase, prioridad de control), orientation (incluye tres simulaciones de 60 s), turn_movement, reception, moving_reception, formation_selection, possession_shape y simulation_entry. Node con DOM simulado, no navegador real ni validación de partido. Incidencia preexistente de decision_storage documentada en 0.83 sigue pendiente; no se afirma batería completa superada. Conserva cuatro sistemas de 0.83. Publicación pendiente de confirmación remota.

## 0.83 — Sistemas seleccionables por equipo

Verificación: PASS formation_selection (4 sistemas ×2 equipos, roles, destinos, simulación, restauración y guardar/cargar en contexto nuevo), possession_shape, offball, contextual_supports (3 ×60 s), simulation_entry, continuity y offside. decision_storage FALLA en «retry remains deterministic»; se reprodujo contra HEAD:index.html de 0.82 con idéntica diferencia de estado/tiempo (77.30 frente a 77.3916667). Incidencia preexistente pendiente; no se modificaron expectativas para ocultarla. La cadena inicial se detuvo en ese fallo, por lo que decision_portable no se ejecutó. Resto de regresiones ejecutadas separadamente. Node/DOM simulado; sin Safari/iPhone real. git diff --check limpio.

Selectores azul/rojo: 4-3-3, 4-2-3-1, 4-4-2 y 3-5-2. Cada sistema define referencias longitudinales/laterales y funciones por dorsal; actualiza roles, referencias de arquitectura y funciones dependientes del rol, no solo una etiqueta. Conserva posiciones y velocidades al cambiar, apoyos locales y seguridad de 0.82. Sistema por jugador incluido en instantáneas y guardados; recuperar una instantánea antigua sin sistema vuelve a 4-3-3. Reiniciar conserva la selección actual. No redefine aún posiciones de saque inicial ni un bloque defensivo específico por sistema: son arquitecturas con balón, no cuatro modelos de juego completos. No añade redistribución automática tras expulsión. Parámetros de diseño sin calibración de partido real/Safari. Siete bloques abiertos, 0.53.1 excluida; publicar main/Pages.

## 0.82 — Arquitectura base con balón

Verificación: 11 entradas PASS: possession_shape, attack_origin, attacking_heights, contextual_supports (3 ×60 s), offball, onside_recovery, containment_perception, destination_trace, simulation_entry, continuity y offside. Node/DOM simulado, no Safari/iPhone real. git diff --check limpio.

Petición del usuario: mantener estructura y red de receptores. Primera base 4-3-3: referencias por puesto relativas al balón, dos destinos de seguridad escalonados, reconstrucción gradual desde posiciones de recuperación. Apoyos, receptor y órdenes conservan prioridad. Ver docs/ARQUITECTURA_POSESION_082.md para parámetros, evidencia histórica Metrica leída y límites: no entrenado/validado contra un partido, no selector de múltiples sistemas ni garantía de apoyos instantáneos. Siete bloques abiertos; 0.53.1 excluida. Publicar main/Pages.

## 0.81 — Referencia defensiva según incertidumbre

Verificación: 11 entradas PASS: containment_reference, containment_perception, defense_origin, pressure_exposure, finishing_protection, defensive_coordination, contextual_supports (3 × 60 s), destination_trace, simulation_entry, continuity y offside. Node/DOM simulado; git diff --check limpio.

A2/A4: en contención/retroceso fuera del presionante y primera cobertura, compara referencias de campo a menos de 16 unidades por distancia + 2 × radio de incertidumbre, desempate por id. Evita que un recuerdo próximo casi caducado desplace siempre a un rival visible ligeramente más lejano. Conserva ponderación gradual, referencia de pérdida y retroceso de 0.80. Parámetro heurístico, no probabilidad ni mejora defensiva general demostrada. containment_reference comprueba ambos sentidos y estados, recencia, límite local, movimiento oculto y restauración. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Copia local recuperada de main 317763d tras mantenimiento del entorno. Publicar main/Pages.

## 0.80 — Contención y retroceso perceptivos

Verificación: 11 entradas PASS: containment_perception, defense_origin, pressure_exposure, finishing_protection, defensive_coordination, game_phases, contextual_supports (3 × 60 s), destination_trace, simulation_entry, continuity y offside. Node/DOM simulado. git diff --check limpio.

A2/A4: el ajuste hacia rival cercano de defensores fuera de los dos primeros puestos usa oposición observada/recordada, excluye porteros y pondera el recuerdo con confianza lineal hasta caducidad. Mantiene referencia de pérdida, recuperación de profundidad y políticas del presionante/cobertura. No sigue coordenadas ocultas. containment_perception prueba ambos equipos, contención/retroceso, observación, memoria gradual, caducidad, restauración y movimiento; falla en 0.79 por dependencia del rival oculto. Coordinación, balón y otras partes defensivas conservan información global: no completa percepción ni demuestra mejora defensiva general. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.79 — Centro con referencia reciente

Verificación: 9 entradas PASS: cross_selection, aerial_play, game_phases, organizing_memory, organizing_progression, contextual_supports (3 × 60 s), simulation_entry, continuity y offside. Node/DOM simulado; git diff --check limpio.

Finalización A2/A3/A6: centros automáticos requieren receptor visto hace menos de 0.5 s, además de espacio y posición habilitada percibidos. Sin candidato se mantienen pase/conducción; no prohíbe todo pase hacia recuerdos ni modifica centros manuales o física aérea. Umbral heurístico. cross_selection añade casos espejo de receptor oculto antiguo y refresco visual. Siete bloques abiertos; fases aún parciales, 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.78 — Superación ligada a su opción concreta

Verificación: 10 entradas PASS: game_phases, organizing_progression, organizing_memory, organizing_possession, progressive_outlet, contextual_supports (3 × 60 s), destination_trace, simulation_entry, continuity y offside. Node/DOM simulado, no Safari/iPhone real. git diff --check limpio.

A3/A4: gamePhase consulta el riesgo de la salida progresiva corta elegible, no el de otro pase mejor puntuado. Conserva prioridad de iniciación/finalización. La preferencia por salida corta frente a alternativa expuesta o recuerdo antiguo también se aplica en Superación; evita que el cambio de etiqueta desactive la continuidad de 0.75/0.77. Prueba espejo de fase y pase ejecutado; el caso falla en 0.77. Progresión profunda abierta sigue disponible. No demuestra líneas realmente superadas ni cierra el detector de fases. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.77 — Conservar con información reciente

Verificación: 10 entradas PASS: organizing_memory, game_phases, organizing_progression, organizing_possession, perceptual_memory, safe_outlet, contextual_supports (3 × 60 s), simulation_entry, continuity y offside. Node/DOM simulado, no prueba real Safari/iPhone. git diff --check limpio.

A2/A3/A4: en fases organizativas, espacio del poseedor >=4, si el mejor pase depende de un recuerdo de al menos 0.5 s, prioriza salida corta observada ahora y con los criterios de riesgo/espacio existentes. Conserva prioridad de progresión corta cuando es elegible. No elimina recuerdos ni inventa posiciones ocultas; no cambia finalización, portero, acciones manuales o presión inmediata. Umbral heurístico: no calibrado científicamente. organizing_memory prueba ambos equipos y 16 semillas: apoyo fresco, movimiento oculto, refresco, recuerdo reciente y apoyo marcado; falla contra 0.76 y pasa con 0.77. Siete bloques abiertos, modelo de fases parcial y 0.53.1 excluida. Publicar main/Pages.

## 0.76 — Fases y principios explícitos

Verificación: 11 entradas PASS: game_phases (diez fases y conservación avanzada espejo), organizing_progression, organizing_possession, safe_outlet, progressive_outlet, contextual_supports (3 × 60 s), pressure_exposure, finishing_protection, simulation_entry, continuity y offside. Node/DOM simulado. git diff --check limpio.

Primera integración de las diez fases solicitadas. gamePhase vincula lecturas ofensivas y planes defensivos a principios; la organización ofensiva utiliza opciones percibidas, presión y remate además de profundidad, sustituyendo el corte único de 65. Conservación y progresión corta comparten política. Defensa añade explicación al inspector sobre conductas existentes, sin nueva política defensiva. Alcance, tabla y pendientes en docs/FASES_PRINCIPIOS_076.md. Sin detector global completo ni secuencia rígida; siete bloques abiertos y 0.53.1 excluida. Pruebas sintéticas, no validación científica/Safari. Publicar main y mismo Pages.

## 0.75 — Progresión corta con continuidad

Verificación: 10 entradas PASS: organizing_progression, organizing_possession, safe_outlet, progressive_outlet, short_carry, lateral_carry, contextual_supports (3 × 60 s), simulation_entry, continuity y offside. Node/DOM simulado. git diff --check limpio.

A3/A4: corrige un hueco de 0.74: una salida progresiva corta segura desactivaba la circulación pero podía acabar eligiéndose el pase profundo expuesto. En zona organizativa aproximada (avance <=65), espacio del poseedor >=4 y riesgo del mejor pase >=4, elige progresión corta fresca (avance >3, distancia <=25, riesgo <=3, espacio >=5), o apoyo lateral/retrasado si aquella falta. No fuerza retroceso cuando hay avance claro. Conserva el resto de la política y reglas. Prueba espejo en 16 semillas: progresión corta, pase profundo abierto y alternativa de conservación con receptor marcado. La prueba falla contra 0.74 y pasa con 0.75. No es reconocimiento completo de fases ni garantía de posesión. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.74 — Conservar como principio organizativo

Verificación: 10 entradas PASS: organizing_possession (64 grupos × 4 comprobaciones), safe_outlet, progressive_outlet, short_carry, lateral_carry, keeper_distribution, contextual_supports (3 × 60 s), simulation_entry, continuity y offside. Node/DOM simulado. git diff --check limpio.

Petición del usuario: conservación y progresión en iniciación y disposición posicional. Aproximación inicial, NO identificación completa de fases: poseedor hasta avance 65. Sin presión inmediata (espacio >=4), si mejor pase tiene riesgo >=4 y no hay salida progresiva corta segura, prioriza apoyo lateral/retrasado fresco, distancia <=25, riesgo <=3 y espacio >=5, antes de conducir/forzar avance. En avance <35 y presión <3.5, aprovecha salida corta progresiva o de conservación antes del despeje aleatorio. Conserva progresión abierta, percepción y reglas; no asegura completar pases. No aplica nueva política al último tercio ni sustituye salida del portero. Umbrales heurísticos. Prueba organizing_possession: ambos sentidos, iniciación presionada y zona media sin presión, 16 semillas, apoyo marcado/oculto y progresión abierta. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicación main/Pages.

## 0.73 — Confianza gradual en la separación

Verificación: 11 entradas PASS: spacing_confidence, teammate_spacing_perception, offball_spacing_perception, support_perception, support_escape, onside_recovery, contextual_supports (3 × 60 s), moving_reception, simulation_entry, continuity y offside. Node/DOM simulado. git diff --check limpio.

A2/A4: la penalización de aglomeración en destinos de apoyo y separación lateral pondera cada compañero por 1 - edad del recuerdo / duración individual de memoria. La observación actual pesa 1; el recuerdo caduca con peso 0. No actualiza posiciones ocultas ni modifica el formato guardado: confianza derivada al consultar. Recuperación habilitada conserva su veto de ocupación hasta caducidad; coordinación global y línea táctica siguen pendientes. No modela colisiones ni garantiza mejor rendimiento táctico. Prueba spacing_confidence.cjs en ambos sentidos: decaimiento, destino, refresco y restauración. Siete bloques abiertos; 0.53.1 excluida; sin validación científica o Safari/iPhone. Publicación main/Pages.

## 0.72 — Separación perceptiva de compañeros

Verificación: 17 entradas PASS: teammate_spacing_perception, offball_spacing_perception, opponent_perception, perceptual_memory, support_perception, support_assignment_perception, onside_recovery, offball, attacking_heights, contextual_supports (3 × 60 s libres), relational_width, support_escape, moving_reception, reception, simulation_entry, continuity y offside. Node con DOM simulado, no navegador real. La prueba nueva falla contra el HTML 0.71 en independencia del compañero oculto y pasa con el actual. git diff --check limpio.

Incremento A2/A4: la separación lateral de jugadores no asignados a apoyo y la ocupación del destino de recuperación habilitada usan compañeros observados/recordados (knownTeammates), sin consultar sus coordenadas ocultas. Mantiene el criterio perceptivo existente de los apoyos y el formato de memoria/guardado. Pruebas espejo de observación, recuerdo sin actualización oculta, refresco al mirar, caducidad, expulsión, movimiento, pausa y restauración; además recuperación directa/desvío. La 0.71 falla el caso oculto (destinos y=16/24); la 0.72 no cambia ese destino por movimiento no visto. No es evitación física de colisiones: puede haber aproximación a un compañero desconocido. Línea táctica de fuera de juego y coordinación de funciones continúan globales; no completa percepción sin balón. Siete bloques abiertos; 0.53.1 excluida; sin validación científica ni Safari/iPhone. Publicar main y mismo Pages.

## 0.71 — Rivales ocultos y separación sin balón

Verificación: 14 entradas PASS: offball_spacing_perception, opponent_perception, perceptual_memory, support_perception, support_assignment_perception, onside_recovery, offball, attacking_heights, contextual_supports (3 × 60 s libres), moving_reception, reception, simulation_entry, continuity y offside. Pruebas Node con DOM simulado. La prueba nueva falla intencionadamente contra el HTML 0.70 en independencia del rival oculto y pasa con el motor actual. git diff --check sin errores.

Incremento A2/A4: la separación lateral de jugadores de campo no asignados a apoyo usa espacio percibido, con recuerdos e incertidumbre, en lugar de la posición real del rival más cercano. Los apoyos conservan su política perceptiva existente. Pruebas espejo: rival oculto, observación directa, recuerdo sin actualizar coordenadas ocultas, caducidad, movimiento y restauración. La comparación con 0.70 reproduce el fallo previo (destino lateral 16 frente a 24 según un rival no visto); 0.71 conserva el destino en ese caso. No completa percepción sin balón: línea táctica de fuera de juego, coordinación de funciones y separación respecto a compañeros siguen usando información compartida/global. Sin validación científica ni Safari/iPhone. Siete bloques abiertos; investigación 0.53.1 excluida; publicación en main y mismo Pages.

## 0.70 — Absorber velocidad al controlar

Verificación: PASS moving_reception.cjs, reception.cjs, acceleration.cjs, anticipation_first_touch.cjs, aerial_play.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs y contextual_supports.cjs (3 × 60 s libres). git diff --check sin errores. Comparación directa con 0.69: en el caso de recepción bien perfilada la base anulaba la velocidad sin desplazamiento; 0.70 ejecuta la frenada analítica en ambos sentidos.

Incremento A2/A6: durante preparación de recepción rasa, permite frenar la velocidad existente si error de perfil <=60°, velocidad alineada al cuerpo <=45°, espacio percibido >5 y corredor observado de 3 unidades con separación >3.2. Integra frenada analítica sin acelerar ni inventar conducción; de lo contrario mantiene control estático. No adelanta la liberación ni cambia primer toque, controles aéreos o formato de guardado. No es todavía control orientado completo ni modelo de toque separado del balón. Prueba espejo, desplazamiento/frenada, presión, mala orientación, pausa, restauración y balón siguiendo al receptor. Umbrales heurísticos; sin validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.69 — Rematador disponible

Verificación: PASS cross_selection.cjs, aerial_play.cjs, onside_decisions.cjs, lateral_carry.cjs, opponent_perception.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs y contextual_supports.cjs (3 × 60 s libres). La prueba específica fallaba antes del cambio ante receptor marcado y pasa después. git diff --check sin errores.

Incremento A3/A4/F04: para el centro automático, el receptor necesita espacio percibido >2.5, además de posición habilitada y ubicación de remate. Si no hay candidato, se valoran las otras opciones existentes; no se garantiza posesión ni remate. Conserva memoria e incertidumbre, física aérea y centros manuales. Caso espejo: poseedor (80,10), receptor y marcador (90,32); 0.68 centraba, 0.69 no fuerza ese centro. Prueba alternativa libre, apertura de marcaje, recuerdo/caducidad y 32 decisiones marcadas. Umbral heurístico, no probabilidad ni validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.68 — Salida sin avance forzado

Comparación causal espejo: poseedor (50,32), oposición a (55,32)/(54,28)/(54,36); 0.67 se detiene y explora, 0.68 fija destino (50,27) y conduce. No implica mayor éxito global ante oposición móvil.

Verificación: PASS lateral_carry.cjs, short_carry.cjs, progressive_outlet.cjs, safe_outlet.cjs, opponent_perception.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs y contextual_supports.cjs (3 × 60 s). git diff --check sin errores.

Incremento A3/A4/O01: si no existe corredor progresivo viable, añade conducción lateral de 5 unidades, mínimo desplazamiento real 4 dentro de límites. Conserva separación percibida >3.2, presión >4 y comparación con pases. No obliga a avanzar, no fuerza regate bajo presión ni consulta coordenadas rivales ocultas. Pruebas espejo, movimiento físico, avance prioritario, presión inmediata, cierre de todas las rutas y rival oculto. Parámetros heurísticos; sin validación científica ni nueva prueba Safari/iPhone. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.67 — Regreso con alternativa lateral

Comparación causal espejo: delantero en y=10 y rival observado sobre su regreso a x=80/y=10; 0.66 destinaba y=28/32, 0.67 y=4 con igual coordenada longitudinal habilitada. Prueba de cierre total corregida para cubrir las cinco rutas (tres rivales todavía dejaban un hueco); no se modificó el motor para forzar ese resultado.

Verificación: PASS onside_recovery.cjs, offside.cjs, offball.cjs, contextual_supports.cjs (3 × 60 s), simulation_entry.cjs y continuity.cjs. git diff --check sin errores.

Incremento A2/A4/O04 sobre 0.66: compara regreso directo y desvíos laterales de ±4/±8, acotados al campo, para delanteros adelantados sin función de apoyo. Elige el recorrido geométrico más corto con destino no ocupado y corredor percibido >2.5; si ninguno cumple mantiene la alternativa ordinaria. No garantiza evitar un rival en movimiento. Conserva física, órdenes, apoyos y libertad después del golpeo. La línea táctica sigue siendo global, como antes: no completa percepción sin balón. Siete bloques abiertos, investigación 0.53.1 excluida; publicar main/Pages. Sin validación científica ni nueva comprobación Safari/iPhone.

## 0.66 — Recolocación sin balón

Comparación causal: delantero inicialmente a altura lateral 10; 0.65 ordenaba recuperar hacia y=28/32 en ambos equipos, 0.66 hacia y=10 con la misma coordenada longitudinal habilitada. Prueba inicial corregida para tolerancia numérica del espejo (25.7 frente a 25.700000000000003), sin cambiar el motor por ese redondeo.

Verificación: PASS onside_recovery.cjs, offside.cjs, offball.cjs, contextual_supports.cjs (3 × 60 s), simulation_entry.cjs y continuity.cjs. git diff --check sin errores.

Incremento A2/A4/O04: delantero no asignado a apoyo, más de 1.5 unidades por delante de la línea, recupera hacia línea menos 0.7 conservando altura lateral. Solo con posesión del equipo, destino libre de compañeros a menos de 4 y corredor percibido >2.5. Sin teletransporte ni restricción después del golpeo; órdenes y apoyos conservan prioridad. Reutiliza la línea táctica GLOBAL ya existente: no completa percepción sin balón. Prueba espejo, movimiento físico, destino ocupado, corredor bloqueado, jugador habilitado y balón en vuelo. Umbrales heurísticos, sin validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.65 — Alternativa progresiva

Verificación: PASS progressive_outlet.cjs, safe_outlet.cjs, automatic_lead_pass.cjs, onside_decisions.cjs, opponent_perception.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs y contextual_supports.cjs (3 × 60 s). git diff --check sin errores.

Incremento A3/O03: bajo presión percibida <4 y mejor pase ordinario con riesgo >=8, prioriza una alternativa progresiva observada ahora (avance >3, distancia <=25, riesgo <=3, espacio >=5) antes del apoyo de conservación. Caso espejo: poseedor (50,32), receptor profundo (74,32), alternativa (54,50), rivales (48,32)/(60,32). 0.64 elegía el profundo tapado; 0.65 elige la alternativa. Conserva pase profundo abierto y rechaza alternativa marcada. Parámetros heurísticos; sin validación científica ni Safari/iPhone. Siete bloques abiertos, 0.53.1 excluida, publicar main/Pages.

## 0.64 — Receptor y destino del envío largo

Verificación: PASS keeper_long_target.cjs, keeper_distribution.cjs, aerial_play.cjs, offside.cjs, opponent_perception.cjs, simulation_entry.cjs, continuity.cjs, contextual_supports.cjs (3 × 60 s libres) y finishing_dynamic.cjs. git diff --check sin errores.

Contracaso causal en ambos equipos frente a 0.63: portero a altura 8, compañeros a 20; antes asociaba receptor a 20 pero intención de golpeo a 40 (espejo 80/60). Ahora no asocia ese receptor y anuncia envío al espacio. Con compañero elegible, posición conocida e intención coinciden antes del error de ejecución. Pruebas de elección menos presionada, distancia diagonal, fuera de juego abierto/exención de saque de meta y posición recordada pese a desplazamiento oculto. Restricciones y puntuaciones heurísticas; no acredita mayor porcentaje de recepción ni valida científicamente el motor. Sin nueva comprobación Safari/iPhone.

## 0.63 — Distribución contextual del portero

Verificación: PASS keeper_distribution.cjs, aerial_play.cjs, safe_outlet.cjs, shot_selection.cjs, automatic_lead_pass.cjs, opponent_perception.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs, contextual_supports.cjs (3 × 60 s libres) y finishing_dynamic.cjs. git diff --check sin errores.

Comparación con 0.62: portero a (8,32), apoyo a (22,40), resto de compañeros a altura 50 y rivales a 80. En 16 semillas, la 0.62 enviaba largo en 6 pese a tener el apoyo disponible; 0.63 selecciona corto en las 16. Prueba refleja ambos equipos (32 elecciones), presión, línea tapada, receptor marcado/oculto/recordado, distancia y tiempo de control. No se exige corto en saques de meta ni cambia la exención reglamentaria. No es una prueba de mayor rendimiento ni una calibración científica; sin nueva validación Safari/iPhone.

## 0.62 — Apoyo de seguridad bajo presión

Verificación: PASS safe_outlet.cjs, shot_selection.cjs, automatic_lead_pass.cjs, onside_decisions.cjs, short_carry.cjs, opponent_perception.cjs, perceptual_memory.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs, contextual_supports.cjs (3 × 60 s de juego libre) y finishing_dynamic.cjs. git diff --check sin errores.

Contracaso espejo frente a 0.61: poseedor a (50,32), receptor avanzado a (75,32), apoyo a (35,42), rivales a (52,32) y (60,32). La opción avanzada tiene riesgo percibido 19.32 y la retrasada 0; antes elegía #10 avanzado, ahora #8 de apoyo. Son índices heurísticos, no probabilidades. Conserva riesgo físico, dispersión y oposición posterior. Prueba salida marcada/oculta, recuerdo antiguo, ausencia de presión, avance abierto y 32 decisiones con semillas distintas. No demuestra superioridad general ni valida todo A3; no hay nueva prueba Safari/iPhone o tracking reservado.

## 0.61 — Ángulos laterales de finalización

Verificación: PASS shot_selection.cjs, automatic_lead_pass.cjs, onside_decisions.cjs, short_carry.cjs, opponent_perception.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs, contextual_supports.cjs (3 × 60 s libres) y finishing_dynamic.cjs. git diff --check sin errores.

Caso espejo: poseedor a altura 80, bloqueador central a 96. La 0.60 descarta el tiro central; 0.61 encuentra un lateral accesible. Centro bloqueado a 90 sigue cerrando los tres ángulos. Prueba mismo ruido de ejecución con desplazamiento de destino ±3.3, alternativa contraria al bloquear un lateral y ausencia de tiro con tres líneas bloqueadas. Se adapta el caso de memoria: recordar bloqueo central no impide una línea lateral visible; se mantiene independencia de coordenadas ocultas y caducidad. No se modifica el informe histórico 0.53. Parámetros heurísticos, sin validación científica ni nueva prueba Safari/iPhone.

## 0.60 — Selección de remate ante bloqueo percibido

Verificación final: PASS shot_selection.cjs, automatic_lead_pass.cjs, onside_decisions.cjs, short_carry.cjs, opponent_perception.cjs, finishing_protection.cjs, finishing_dynamic.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs y contextual_supports.cjs (3 × 60 s de juego libre). git diff --check sin errores. No hay nueva validación Safari/iPhone ni con tracking reservado.

Contracaso causal frente a 0.59 en ambos equipos y semilla 73: poseedor a altura 80, defensor de campo a 90 en la línea central, apoyo a (80,42). 0.59 remataba; 0.60 descarta ese tiro y valora continuidad. Pruebas: línea abierta, portero como único obstáculo, tiro manual, 32 decisiones con bloqueo, recuerdo de bloqueador oculto y caducidad. Umbral 1.65 provisional; no valora todos los ángulos de tiro ni acredita más goles o mejor juego general.

Incidencia de prueba histórica: finishing_dynamic.cjs exigía al motor actual reproducir el informe 0.53. También difiere 0.59 (caso libre 0/202: 1 tiro, 2 pases, 1 pérdida frente a 2/4/5 históricos). Se conserva el informe intacto, se reproduce con engine-v053.html y se añaden repeticiones deterministas y movimiento real para el motor actual. No se regeneran datos históricos para hacer pasar la prueba.

## 0.59 — Pase automático al espacio

Verificación final: PASS automatic_lead_pass.cjs, lead_pass.cjs, onside_decisions.cjs, short_carry.cjs, opponent_perception.cjs, perceptual_memory.cjs, anticipation_first_touch.cjs, reception.cjs, offside.cjs, simulation_entry.cjs, continuity.cjs y contextual_supports.cjs (3 × 60 s de juego libre). git diff --check sin errores.

También conserva la opción a los pies cuando anticipar supera el alcance automático de 42 unidades. La prueba inicial de igualdad entre entornos VM se corrigió para comparar datos serializados, evitando diferencias de prototipo entre contextos.

Comparación causal con 0.58 en ambos sentidos: poseedor a altura 50, compañero a 68 avanzando a 6 unidades/s; antes apuntaba a 68, ahora a 71.724 (espejo 28.276). Es destino intencional: conserva dispersión de ejecución y oposición real. Reutiliza el cálculo existente de encuentro con velocidad constante y horizonte 1.2 s. No anticipa compañeros parados, en retroceso, ocultos ni destinos con deterioro excesivo de línea/espacio. Prueba receptor habilitado que recibe más allá de la línea: no confundir destino del balón con posición de fuera de juego al golpeo. No acredita mejora general del porcentaje de pases ni validación con tracking/Safari/iPhone. Investigación defensiva 0.53.1 sin integrar.

## 0.58 — Conducción corta diagonal

Verificación: PASS short_carry.cjs, onside_decisions.cjs, opponent_perception.cjs, simulation_entry.cjs, continuity.cjs, contextual_supports.cjs (3 × 60 s de juego libre), support_escape.cjs y offside.cjs. git diff --check sin errores.

Contracaso reproducido en 0.57: poseedor a (50,32), rival a altura 55 y compañeros fuera del campo visual; ambos equipos se detenían a explorar pese a disponer de una diagonal corta. 0.58 selecciona avance 3 y desplazamiento lateral 5, con separación percibida superior a 3.2. Filtra candidatos inseguros antes de ordenarlos. Mantiene avance 7 con línea libre; no fuerza la conducción bajo presión inmediata ni con ambas diagonales cerradas. Tests cubren simetría, independencia de rival oculto y movimiento sin teletransporte. Parámetros heurísticos, sin validación científica ni nueva comprobación Safari/iPhone.

## 0.57 — Decisión automática y fuera de juego

Verificación: PASS onside_decisions.cjs, offside.cjs, opponent_perception.cjs, contextual_supports.cjs (3 × 60 s de juego libre), simulation_entry.cjs y continuity.cjs. Sin validación nueva en Safari/iPhone ni con tracking real.

Contracaso reproducido frente a 0.56 en ambos equipos: bajo presión, con poseedor a altura 55, receptor adelantado a 75 y línea defensiva a 60, el motor anterior elegía #10 adelantado; 0.57 selecciona #8 habilitado. Se elimina la penalización compensable y se filtran también los centros. Prueba onside_decisions.cjs cubre ambos equipos, receptor en línea, ausencia de salidas habilitadas y 24 elecciones desde banda. No constituye validación general de mejora ofensiva. Se conservan la 0.53.1 y sus investigaciones sin integrar.

## 0.56 — Apoyo ante línea tapada

PASS support_escape.cjs: caso espejo en ambos equipos, riesgo percibido 10.125 → 0 en el destino, movimiento sin teletransporte, independencia de rival oculto y contracasos de línea abierta/memoria vacía. Este índice no es una probabilidad de éxito ni evidencia de superioridad general.

PASS contextual_supports.cjs (incluye 3 × 60 s de juego libre), simulation_entry.cjs y continuity.cjs al cerrar la entrega. También pasaron support_perception.cjs, support_assignment_perception.cjs, support_persistence.cjs, offball.cjs y offside.cjs durante implementación. Sin validación nueva con tracking real ni Safari/iPhone. Publicación GitHub expresamente autorizada; 0.55 remota 197b206, árbol idéntico a local 591e79d.

## Corrección: prioridad simulación

El usuario no considera prioritario guardar decisiones. Se priorizan simulación y motor táctico; guardado plegado como herramienta opcional. El botón superior estaba desactivado en choose/review guiados: ahora Simular partido entra en modo libre desde la posición actual; después pausa/reanuda. Se conserva la parada reglamentaria. PASS simulation_entry.cjs y continuity.cjs. Publicación GitHub de 0.55 bloqueada por revisión automática; código local conservado.

Verificación 0.55: PASS `decision_comparison.cjs`, `continuity.cjs`, `decision_portable.cjs` y `decision_storage_edges.cjs`. Prueba visual en Chrome: registro de resultado, conservación al comparar y corrección de superposición de guardados con controles. Se restringe el selector de cuadrícula al panel de decisiones; el panel de guardados ocupa su propia fila. Safari/iPhone no comprobados. `git diff --check` sin errores.

## 23-10-2026 — 0.55: comparación de decisiones

Incremento de estadísticas y experiencia del entrenador (B) sobre 0.54. La tabla conserva los últimos ocho intentos terminados desde una misma situación: intención, órdenes sin balón, duración simulada, posesión final, desplazamiento longitudinal del balón, tiros totales de ambos equipos y goles azul/rojo. «Comparar otra decisión» conserva la tabla y restaura el punto de partida. Continuar, reiniciar, cambiar de modo o recuperar un guardado limpia la comparación. Importar un archivo solo escribe un espacio: no limpia la comparación hasta recuperarlo.

Los intentos pueden terminar tras duraciones distintas. Avance positivo significa hacia portería roja; no equivale a una puntuación táctica ni a un ranking. Los resultados no se guardan ni exportan; los guardados 0.54 siguen siendo compatibles. Motor táctico sin modificaciones; A2/A4/A7 siguen abiertos y 0.53.1 permanece aparcada.

Publicación de prueba: se actualiza el Site existente, conservando su URL y acceso privado. La URL contiene 054 por continuidad, pero el encabezado muestra la versión vigente. GitHub: rama `codex/fase-manager-0.55`, sin modificar main.


## 23-10-2026 — Entrega 0.54: exportar y cargar decisiones

Base: `63e5d82`, rama de entrega `codex/fase-manager-0.54`. Añade descarga JSON y carga asíncrona al espacio seleccionado, con compatibilidad con guardados 0.53, límites de tamaño y rechazo de marcado HTML en datos. No modifica políticas tácticas ni integra 0.53.1. Actualiza versión visible, contexto y hoja de ruta.

Verificación en Node v24.19.0: PASS `tests/decision_portable.cjs`, `tests/decision_storage.cjs`, `tests/decision_storage_edges.cjs`, `tests/continuity.cjs`; `git diff --check` sin errores. Se verifican tres alternativas reproducibles tras exportar/importar, seis trayectorias entre sesiones del guardado anterior, órdenes/ventaja pendientes, datos dañados/incompatibles, marcado malicioso con checksum recalculado, archivo grande, almacenamiento bloqueado y cambio del selector durante lectura. No se ha repetido toda la batería táctica: sus políticas no cambian. Descarga real, selector y presentación en Safari/iPhone pendientes; las API de descarga están simuladas en las pruebas.


## 23-10-2026 — Prioridad vigente: entregas acotadas y guardado de decisiones

Por instrucción del usuario se cierra la ronda abierta de investigación: **0.53.1 queda aparcada, no aceptada para main**. No se exige resolverla para avanzar en tareas independientes. Las prioridades históricas de continuar indefinidamente 0.53.1 quedan sustituidas por esta decisión; A4/A7 siguen abiertos.

Recuperación verificada: `main@82c6c02`, remoto de investigación `5ecf9ed` y local `5d610b1`. Se reúnen las dos líneas en `d172bd5` (rama `codex/fase-manager-0.53.1-preserved`), conservando ambos informes, pruebas y datos. Los cambios pendientes de otras carpetas no se tocan. La mejora independiente parte deliberadamente de la 0.53 estable en `codex/fase-manager-decision-storage`; no incorpora la política defensiva rechazada ni borra su investigación.

Entrega: tres espacios locales para guardar una decisión pausada del modo guiado y recuperarla tras cerrar/abrir la aplicación. Conserva posiciones, memoria perceptiva, órdenes, marcador, reloj, disciplina, selección técnica y semilla; se recupera pausada. Se bloquea guardar durante ejecución, balón libre, reanudaciones y modo libre. Se informa de espacios vacíos, datos incompatibles/dañados y almacenamiento bloqueado/lleno. No hay sincronización entre dispositivos, importación externa, autoguardado ni partidas completas en vuelo.

Es un adelanto acotado de persistencia de B autorizado al desbloquear tareas independientes; no declara terminada A ni el videojuego comercial. Motor táctico sin cambios respecto a 0.53. El siguiente incremento debe elegir un requisito independiente y terminar en una función comprobable, con regresiones pertinentes; no reiniciar una investigación defensiva abierta sin un objetivo acotado.
## Verificación final — 23-10-2026

52 entradas distintas verificadas sin fallos pendientes, de forma incremental: primera ejecución completa 50/51 PASS; `finishing_dynamic.cjs` falló por comparar el hash del HTML nuevo con un informe histórico. Se conserva el HTML exacto de 0.53 en fixture, se mantiene la comparación del motor actual con los desenlaces históricos y se reejecuta esa prueba: PASS. Se añade `decision_storage_edges.cjs`: PASS. No se presenta como una sola ejecución de 52. Resultados y fallo inicial conservados en `data/decision-storage-verification.json`.

La prueba de guardado reproduce seis trayectorias/resultados entre contextos nuevos (dos equipos y tres decisiones), restaura para comparar, comprueba tres espacios, almacenamiento bloqueado/lleno y datos vacíos/incompatibles/corruptos. Otra prueba comprueba ventaja pendiente con identidad compartida de falta, orden sin balón y recuperación sobre un vuelo existente. Pruebas Node VM con DOM simulado; no se ha verificado visualmente Chromium/Safari/iPhone: no había navegador instalado y la descarga de Chromium falló.

Publicación pendiente: la revisión automática rechazó el push de la rama de investigación preservada porque no consideró explícita la autorización de ese destino/rama. No se reintentó por otra vía. Los commits quedan locales; main no se modifica.



## 20-10-2026 — Auditoría táctica de 0.53 (solo documentación)

Referencia de motor: `d440066319ad18c5ebbe6cbd0ebe0e7bdc62488b`, comprobada en `main`. Informe: [AUDITORIA_TACTICA_053.md](docs/AUDITORIA_TACTICA_053.md). No se modifica el motor, el evaluador ni las pruebas; no se implementa 0.54.

- Caso adverso equipo 1/pase/101 reproducido: 0→1. Reconstrucción de posiciones, intenciones, pases, recuperación, tiro y portero. A 1,825 s, con los mismos sorteos hasta la bifurcación, la distancia percibida 4,047→3,797 cruza el umbral de conducción y favorece el pase; no es simplemente pérdida continua de presión.
- Error demostrado del ensayo anterior: `hx` del portero queda lejos de su posición inicial y lo hace abandonar la meta. Corregir solo ese anclaje en el ensayo no elimina el caso adverso. Con ayuda cercana parada o en movimiento, el caso termina 0→0.
- 40 parejas distintas / 80 simulaciones de seis segundos: 24 de orientación, ocho con anclaje del portero corregido y ocho con ayuda. Observación temporal externa; igualdad de ocho parejas originales en los contadores y desenlaces. Repeticiones adicionales para trazar azar y acceso, sin contarlas como nuevas parejas.
- Grupo de orientación: goles 10→6, pero tiros concedidos 19→26 y ventanas potenciales de ocasión 9,00→15,50 s. Intercepciones 4→14 y entradas recuperadoras 6→2. Son métricas sintéticas, no xG ni validación general. Detalle, controles y código de reproducción en el informe.
- No se demuestra que proteger impida una entrada segura: persisten lecturas antiguas y la disputa sigue activa. Se identifica desajuste entre preparación angular supuesta y ejecución instantánea del tiro, además de límites de cobertura conjunta.
- Recomendación: revisar/corregir de forma acotada la 0.53 y el protocolo antes de pasar al siguiente bloque; no revertir todo ni ajustar para un único gol. A4/A7 siguen abiertos, B/C pendientes. No se vuelve a ejecutar toda la batería histórica: el motor permanece idéntico y el 50/50 anterior no se presenta como resultado nuevo.

---

## 20-10-2026 — Versión 0.53: protección de finalización

Base: `main@13c0330cc6abad294e0cc1552abb64b4bd71e46d`, motor previo 0.52 (`a19f743`). El hash del commit de esta versión se obtiene con `git log -1 -- index.html`; no se inserta su propio hash dentro del contenido del commit.

Implementado: capa de protección sobre el plan defensivo 0.52, con tres corredores de tiro raso, preparación angular del poseedor visible, extrapolación corta de su movimiento, desplazamiento estimado del defensor y ayuda visible disponible. Distingue proteger tiro/mantener cobertura sin sustituir presión, temporización ni defensa de líneas de pase. No se han cambiado física de contacto, acciones ofensivas, reglas ni tests históricos. Informe: [PROTECCION_FINALIZACION_053.md](docs/PROTECCION_FINALIZACION_053.md).

### Verificación incremental y resultados

- Regresiones defensivas específicas, continuidad, órdenes y disciplina verificadas antes de integrar.
- **50/50 archivos automatizados PASS: 48 anteriores + 2 nuevos** (49 CommonJS y una entrada Python con tres casos). Node.js v24.19.0, Python 3.12.14. Cero fallos finales, errores de entorno o timeouts. Batería secuencial con límite preventivo de 240 s por archivo; prueba dinámica adicional ejecutada y registrada por separado. Los 48 archivos anteriores se conservaron sin cambios.
- Prueba específica: ambos equipos, ayuda libre/comprometida/en movimiento, visión limitada, orientación, trayectoria observada, acceso inmediato y amenaza fuera del rango. Predictor sin mutaciones, comprobado contra el estado guardado completo. Los fallos iniciales de dos supuestos del nuevo test y su corrección se describen en el informe; no eran regresiones del motor anterior.
- Evaluación dinámica: 20 parejas, 40 simulaciones de seis segundos. Todos los jugadores se mueven con el motor; tiros/pases reales, decisiones reactivas y casos autónomos. Se cuentan intenciones protectoras realmente aplicadas mediante el inspector pasivo. Los hashes del informe identifican los motores evaluados.
- **Goles concedidos: 3 parejas mejoran, 16 empatan, 1 empeora.** Caso adverso: equipo defensor 1, pase, semilla 101, 0→1. Caso favorable autónomo: equipo defensor 0, libre, semilla 202, 1→0. Ambos se reprodujeron automáticamente. Las sondas de tiro controlado no mejoran el desenlace del primer tiro (control defensivo en ambas versiones). No se afirma mejora general ni validación científica.
- No se ejecutó prueba visual en Safari/iPhone. Los reportes de versiones congeladas siguen siendo históricos.

### Pendientes y alcance de la entrega

A continúa en desarrollo; A4/A7 no se cierran. Ampliar dentro del bloque la predicción de intervención, investigar el contracaso adverso, receptor potencial y ayuda futura, y contrastar datos externos. Tres rayos rasos, preparación heurística y proyección inicial del punto de paso no equivalen a intercepción física exacta. La valoración nueva solo opera con poseedor visible y balón controlado; tras el tiro sigue el movimiento/contacto anterior. No hay oclusión completa, resonancia empática ni aprendizaje. B comercial y C iOS pendientes. **No se inicia 0.54.**

### Inventario final de pruebas 0.53

| Entrada | Resultado | Duración (s) |
|---|---|---:|
| `tests/acceleration.cjs` | PASS | 0.14 |
| `tests/advantage.cjs` | PASS | 0.54 |
| `tests/aerial_play.cjs` | PASS | 1.77 |
| `tests/anticipation_first_touch.cjs` | PASS | 0.40 |
| `tests/attack_interactions.cjs` | PASS | 37.41 |
| `tests/attack_origin.cjs` | PASS | 0.41 |
| `tests/attacking_heights.cjs` | PASS | 0.21 |
| `tests/audit_continuity.cjs` | PASS | 2.31 |
| `tests/audit_windows.cjs` | PASS | 1.37 |
| `tests/contextual_defense.cjs` | PASS | 0.10 |
| `tests/contextual_supports.cjs` | PASS | 33.96 |
| `tests/contextual_width.cjs` | PASS | 0.16 |
| `tests/continuity.cjs` | PASS | 17.01 |
| `tests/defense.cjs` | PASS | 0.13 |
| `tests/defense_origin.cjs` | PASS | 0.17 |
| `tests/defense_replay.cjs` | PASS | 1.90 |
| `tests/defensive_coordination.cjs` | PASS | 0.11 |
| `tests/defensive_roles.cjs` | PASS | 0.19 |
| `tests/destination_trace.cjs` | PASS | 7.68 |
| `tests/discipline.cjs` | PASS | 0.52 |
| `tests/finishing_dynamic.cjs` | PASS | 11.64 |
| `tests/finishing_protection.cjs` | PASS | 0.15 |
| `tests/fouls.cjs` | PASS | 2.60 |
| `tests/game2.cjs` | PASS | 2.20 |
| `tests/heights_report.cjs` | PASS | 0.09 |
| `tests/individual_capabilities.cjs` | PASS | 0.14 |
| `tests/laws.cjs` | PASS | 3.68 |
| `tests/lead_pass.cjs` | PASS | 0.12 |
| `tests/offball.cjs` | PASS | 1.13 |
| `tests/offside.cjs` | PASS | 0.78 |
| `tests/offside_reference.cjs` | PASS | 0.10 |
| `tests/opponent_perception.cjs` | PASS | 0.21 |
| `tests/orientation.cjs` | PASS | 32.12 |
| `tests/owner_holdout.cjs` | PASS | 4.97 |
| `tests/perceptual_memory.cjs` | PASS | 0.26 |
| `tests/player_roles.cjs` | PASS | 15.17 |
| `tests/pressure_exposure.cjs` | PASS | 0.10 |
| `tests/reception.cjs` | PASS | 0.71 |
| `tests/relational_width.cjs` | PASS | 0.15 |
| `tests/simultaneous_threats.cjs` | PASS | 0.13 |
| `tests/support_assignment_perception.cjs` | PASS | 0.11 |
| `tests/support_destination_diagnosis.cjs` | PASS | 9.16 |
| `tests/support_diagnosis.cjs` | PASS | 14.69 |
| `tests/support_holdout.cjs` | PASS | 12.22 |
| `tests/support_perception.cjs` | PASS | 0.10 |
| `tests/support_persistence.cjs` | PASS | 0.25 |
| `tests/support_stability.cjs` | PASS | 9.43 |
| `tests/tactical_utility.cjs` | PASS | 0.06 |
| `tests/tracking.py` | PASS | 0.05 |
| `tests/turn_movement.cjs` | PASS | 0.12 |

La prueba específica de protección también se repitió después de reforzar la comprobación de inmutabilidad. Los tiempos dependen de la carga del entorno y no son un benchmark del videojuego.

---

Las secciones siguientes describen la recuperación histórica de 0.52.


## 20-10-2026 — Consolidación documental de 0.52

Repositorio `aanogom429-del/Fase-manager`, rama `main`. Base del motor y padre previsto de este commit documental: **a19f7435c22896d15e22f4d1a00033ac87c58cea**, 19-10-2026 21:38:58 UTC (23:38:58 Europe/Madrid). Mensaje: `Implement 0.52 pressure exposure and perceived local inferiority`.

El identificador de esta consolidación se consulta en `git log -1 -- PROJECT_CONTEXT.md ROADMAP.md DEVELOPMENT_LOG.md`: un documento no puede contener el hash de su propio commit sin cambiarlo. Se distingue ese commit documental del último commit que modifica el motor, indicado arriba.

Alcance: ejecutar las entradas automatizadas disponibles, registrar resultados y crear tres documentos raíz. No corregir motor, modificar pruebas ni iniciar la 0.53. Se preservan `docs/`, datos e instantáneas. No se importa ningún borrador no verificado de conversaciones anteriores.

## Historial relevante

| Versión / etapa | Commit representativo | Avance y límite |
|---|---|---|
| Base, octubre 2026 | `817c438` | Inicio del repositorio. |
| Corrección inicial | `5eb3c75` | Corrige acceso a poseedor nulo tras pases/tiros; incidencia histórica, no declarada reproducida en 0.52. |
| Decisiones guiadas | `fe91341`, `0856399` | Primera situación e integración de decisiones encadenadas. |
| Ataque y técnicas | `1dca2b6`, `9241136`, `7512ec4` | Técnicas contextuales, apoyos móviles, amplitud, profundidad y progresión. |
| 0.11–0.12 | `8b84a5b`, `b2423b5` | Espacios relacionales, contornos, continuidad y visor de tracking. |
| 0.13–0.14 | historial 14-10-2026 | Eventos de referencia, medidas y ajuste provisional; no calibración general. |
| 0.20–0.25 | docs/REGLAS_IMPLEMENTACION.md | Reanudaciones, fuera de juego, contacto, ventaja y disciplina en etapas; alcance reglamentario parcial. |
| 0.26–0.34 | docs/HOJA_DE_RUTA.md | Órdenes/coordinación, contrastes, referencias de posesión, roles, equilibrio y persistencia de apoyos. |
| Auditoría y 0.35 | `ef17476`, `57a685d`, `5b263c3` | Matriz de cobertura, apoyos contextuales y validación acotada. |
| 0.36 | `3b06482` | Orientación y percepción angular. |
| 0.37 | `0be1b1e` | Preparación de recepción rasa según orientación. |
| 0.38 | `1200c34`, `a9a8c03` | Anticipación y primer toque A→B→A/C; repetición sin carrera obligatoria. |
| 0.39 | `4200150` | Pase guiado al espacio con encuentro anticipado. |
| 0.40–0.41 | `3eca2f1`, `e46602b` | Recuerdos caducables y oposición percibida. |
| 0.42 | `35ee962` | Coste de giro en desplazamiento/llegada. |
| 0.43–0.45 | `e5f8b1a` | Aceleración/frenada, capacidades y memoria individual. |
| 0.46 | `bbc0e9d` | Apoyos percibidos, cabeceos/despejes y envío largo del portero. |
| 0.47 | `9cb0b6c`, `3ddb6e7`, `18d9d30` | Asignación perceptiva de apoyos y diagnósticos de referencia/destino. |
| 0.48 | `ea5bc91`, `3d56c90`, `1686f67` | Amplitud contextual, utilidad geométrica y pérdidas controladas. |
| 0.49 | `220641c` | Presión/temporización y cobertura contextual. |
| 0.50 | `5468bec` | Cobertura según amenaza y ayuda disponible. |
| 0.51 | `66589c6` | Amenazas simultáneas y conservación de líneas sin respaldo. |
| **0.52** | **`a19f743`** | Exposición de líneas de pase al presionar e inferioridad local percibida. |
| **0.53** | **Sin commit de implementación** | **Pendiente: protección de finalización y líneas de tiro expuestas. No iniciada en esta consolidación.** |

Los mensajes de commits identifican avances históricos; su presencia no acredita por sí sola pruebas satisfactorias. El resultado de la recuperación se documenta a continuación.

## Incidencias y límites conocidos

- Documentación acumulativa: `docs/HOJA_DE_RUTA.md` conserva referencias antiguas a 0.48 y prioridades reemplazadas. En `docs/REGLAS_IMPLEMENTACION.md` las entradas antiguas niegan mecanismos añadidos después (ventaja/tarjetas). Se conservan como historial; usar código 0.52 y los documentos raíz para el estado actual.
- Las seis comparaciones defensivas documentadas no acreditan mejora general; geometría de líneas no garantiza interceptación. 0.52 prueba destinos, no el resultado completo de jugadas con rival reactivo.
- Percepción sin balón parcialmente global; no hay atención/oclusión completas, resonancia empática suficiente, fatiga ni aprendizaje persistente.
- Reglamentación, portero, técnica aérea y ciclo adaptativo incompletos. Son pendientes de alcance, no fallos de ejecución demostrados por sí mismos.
- Los informes históricos reproducidos con fixtures 0.34/0.35/0.47 no validan automáticamente la 0.52. Mantener la separación entre regresión del motor actual y reproducibilidad de análisis pasados.
- La clonación inicialmente tardó en responder, pero finalmente se completó y HEAD coincidió con la base. No se atribuye esa demora al motor.

## Siguiente tarea y estado de la hoja de ruta

Tras esta consolidación, **la siguiente funcionalidad es 0.53**, protección de zona de finalización e identificación de líneas de tiro expuestas durante presión defensiva, con contracasos y jugadas ejecutadas. Criterios detallados en ROADMAP.md. No se ha programado.

**A en desarrollo:** A0 completado como auditoría; A1/A2/A4/A5/A6 parciales; A3 pendiente de modelo completo; A7 en curso sin cierre integral. Entrenamiento con retención/transferencia pendiente después del núcleo. **B pendiente:** videojuego comercial. **C pendiente:** adaptación iOS y publicación. Sin porcentaje de finalización ni cierre científico del marco.

## Ejecución automatizada de recuperación — 20-10-2026

Base exacta: `a19f7435c22896d15e22f4d1a00033ac87c58cea`. Entorno Linux, Node.js **v24.19.0**, Python **3.12.14**. Ejecución secuencial desde la raíz: `node tests/<archivo>.cjs` para cada uno de los 47 archivos CommonJS y `python tests/tracking.py`. Límite preventivo de 180 s por archivo.

**Resultado: 48/48 archivos PASS; 0 fallos de aserción, 0 errores de entorno y 0 timeouts.** La entrada Python contiene tres casos unittest. El total 48 cuenta archivos ejecutables, no aserciones individuales. No se cambiaron pruebas ni motor para obtener el resultado.

Cobertura: continuidad de posesión/vuelo/pausa/repetición/modos; decisiones y apoyos, defensa contextual y 0.52; orientación, aceleración, capacidades y recuerdos; acciones rasas/aéreas y primer toque; reanudaciones, fuera de juego, faltas, ventaja y disciplina; tracking y reproducción de informes históricos. Las pruebas de orientación incluyen simulación libre con semillas. No se ejecutaron pruebas visuales en navegador/iOS ni se certifica realismo de un partido completo.

Los informes basados en fixtures conservan su versión histórica; no se contabilizan como validación empírica nueva de 0.52. Dos pruebas escriben informes (`defense.cjs`, `offside_reference.cjs`): la comparación SHA-256 de los 160 archivos preexistentes antes/después y `git diff` confirman contenido idéntico. El commit documental no incluye informes regenerados, cachés ni logs temporales.

No se han detectado errores reproducidos en esta batería. Las lagunas funcionales y de validación descritas arriba permanecen abiertas.

### Inventario de resultados

| Entrada | Resultado | Duración (s) |
|---|---|---:|
| `tests/acceleration.cjs` | PASS | 0.20 |
| `tests/advantage.cjs` | PASS | 0.62 |
| `tests/aerial_play.cjs` | PASS | 1.91 |
| `tests/anticipation_first_touch.cjs` | PASS | 0.50 |
| `tests/attack_interactions.cjs` | PASS | 40.77 |
| `tests/attack_origin.cjs` | PASS | 0.59 |
| `tests/attacking_heights.cjs` | PASS | 0.22 |
| `tests/audit_continuity.cjs` | PASS | 2.67 |
| `tests/audit_windows.cjs` | PASS | 1.46 |
| `tests/contextual_defense.cjs` | PASS | 0.11 |
| `tests/contextual_supports.cjs` | PASS | 35.31 |
| `tests/contextual_width.cjs` | PASS | 0.15 |
| `tests/continuity.cjs` | PASS | 19.68 |
| `tests/defense.cjs` | PASS | 0.12 |
| `tests/defense_origin.cjs` | PASS | 0.18 |
| `tests/defense_replay.cjs` | PASS | 1.89 |
| `tests/defensive_coordination.cjs` | PASS | 0.11 |
| `tests/defensive_roles.cjs` | PASS | 0.20 |
| `tests/destination_trace.cjs` | PASS | 8.19 |
| `tests/discipline.cjs` | PASS | 0.51 |
| `tests/fouls.cjs` | PASS | 2.51 |
| `tests/game2.cjs` | PASS | 2.09 |
| `tests/heights_report.cjs` | PASS | 0.10 |
| `tests/individual_capabilities.cjs` | PASS | 0.15 |
| `tests/laws.cjs` | PASS | 3.39 |
| `tests/lead_pass.cjs` | PASS | 0.12 |
| `tests/offball.cjs` | PASS | 1.16 |
| `tests/offside.cjs` | PASS | 0.75 |
| `tests/offside_reference.cjs` | PASS | 0.10 |
| `tests/opponent_perception.cjs` | PASS | 0.21 |
| `tests/orientation.cjs` | PASS | 31.53 |
| `tests/owner_holdout.cjs` | PASS | 5.22 |
| `tests/perceptual_memory.cjs` | PASS | 0.28 |
| `tests/player_roles.cjs` | PASS | 14.70 |
| `tests/pressure_exposure.cjs` | PASS | 0.09 |
| `tests/reception.cjs` | PASS | 0.68 |
| `tests/relational_width.cjs` | PASS | 0.14 |
| `tests/simultaneous_threats.cjs` | PASS | 0.12 |
| `tests/support_assignment_perception.cjs` | PASS | 0.10 |
| `tests/support_destination_diagnosis.cjs` | PASS | 8.82 |
| `tests/support_diagnosis.cjs` | PASS | 12.62 |
| `tests/support_holdout.cjs` | PASS | 9.49 |
| `tests/support_perception.cjs` | PASS | 0.11 |
| `tests/support_persistence.cjs` | PASS | 0.24 |
| `tests/support_stability.cjs` | PASS | 9.25 |
| `tests/tactical_utility.cjs` | PASS | 0.06 |
| `tests/tracking.py` | PASS | 0.06 |
| `tests/turn_movement.cjs` | PASS | 0.14 |

### Reproducción

En una copia del commit de motor, con Node y Python disponibles, ejecutar todas las entradas conservando los códigos de salida:

```bash
failed=0
for test in tests/*.cjs; do
  node "$test" || failed=1
done
python tests/tracking.py || failed=1
exit "$failed"
```

Algunos scripts de `scripts/` son importadores/evaluadores y no entradas de pruebas; pueden requerir CSV externos o sobrescribir informes. No se ejecutaron indiscriminadamente. Las pruebas que los importan sí ejercitan sus funciones.

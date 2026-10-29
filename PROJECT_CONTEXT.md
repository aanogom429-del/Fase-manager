# Fase Manager — Contexto permanente del proyecto

## 0.95 — Relevo defensivo

Medio elegible cubre referencia abandonada por presionante de última línea, sin retirar cobertura inmediata ni órdenes. Selección por llegada y continuidad, no segunda persecución al balón. defSlotFor restaurable/limpiado con estado defensivo. Ver docs/RELEVO_DEFENSIVO_095.md. Pendiente vacante secundaria del medio, ocupación física y exposición a centros/pase atrás; no cierre de bloques.

## 0.94 — Última línea cerca de portería

Menor anchura y menor arrastre hacia la banda, graduales en últimos 30→15 de profundidad propia; referencia longitudinal última línea limitada al lado propio del balón con margen interior. Otras líneas/presión/cobertura conservadas. Ver docs/AREA_094.md. Pendiente exposición real a centros/pase atrás y compensación del defensor saliente; no mejora general ni cierre de bloques demostrados.

## 0.93 — Bloque defensivo coordinado

defensiveBlockTargets en movement: un presionante/una cobertura, resto en tres alturas compartidas y carriles del sistema, basculación lateral conjunta. Ajustes individuales acotados y prioridades explícitas conservadas. Ver docs/BLOQUE_DEFENSIVO_093.md para pruebas/límites. Pendiente defensa de área, compensación del puesto del presionante y aglomeración física sostenida; no garantiza orden instantáneo ni cierra bloques.

## 0.92 — Ocupación racional ofensiva

Coordinación final de destinos para evitar espacio compartido, reservas de recepción/poseedor/órdenes/pared, prioridad seguridad→compensaciones→apoyos, separación lateral acotada sin alterar profundidad. Ver docs/OCUPACION_092.md. attack_space: 4→0 parejas próximas en ocho fixtures integrados; no equivale a separación física garantizada. Contraste autónomo mixto, especialmente 3-5-2. Pendiente proximidad sostenida, estabilidad de carril y red de pases. No cierre de bloques ni calibración real.

## 0.91 — Relevos por llegada

arrivalTime ordena candidatos, conserva sustituto si está a <=0,6 s del mejor. Radio 24 y prioridades intactos. Cinco pruebas PASS; comparación autónoma con contracaso documentada en docs/RELEVOS_091.md. No demuestra mejora general ni ocupación física: siguiente paso medir tiempo real de hueco/llegada y seguridad tras pérdida antes de ampliar candidatos. Siete bloques abiertos.

## Prioridad vigente tras auditoría 28-10-2026

Ver docs/AUDITORIA_MOTOR_090.md: secuencia de cierre actual por encima de prioridades históricas. Diagnóstico COVER_DIAG PASS: 2679 consultas sin candidato, exclusiones solapadas dominadas por distancia (5726), apoyo (1395) y foco (840). No ampliar radio a ciegas. Próxima implementación: cobertura por llegada/continuidad, medir hueco físico y preservar seguridad. Siete bloques A1–A7 abiertos; no siete versiones. Motor permanece 0.90. Reintento corregido en 0.89, no pendiente actual.

## Contraste autónomo 0.90

line_autonomous PASS: ocho escenarios de 20 s con ambos equipos activos, selección real de sistemas y acciones autónomas. 906/9600 pasos con relevo, 2183 observaciones jugador-paso de salida sin sustituto, 36 cambios de equipo propietario/vuelo. Métricas no equivalen a ocupación física ni recuperaciones. Ver docs/CONTRASTE_AUTONOMO_090.md. Próximo paso: diagnosticar exclusiones de candidatos y auditar liberación en pérdidas. Motor sigue 0.90; no declarar resuelto el orden colectivo.

## Último paso: contraste colectivo 0.90

line_collective PASS: ocho escenarios controlados de 30 s con dos salidas simultáneas, movimiento físico de sustitutos y liberación. Documentado en docs/VALIDACION_COLECTIVA_090.md. No cambia el motor. Próximo paso: acciones autónomas, pérdidas y oposición; medir huecos efectivos, no solo asignaciones. Siete bloques siguen abiertos.

## 0.90 — Continuidad de compensaciones

Una salida establecida (más de 8 unidades durante 1 segundo) mantiene su condición hasta volver a 5 unidades de su referencia. Evita apagar la cadena por oscilaciones en el umbral de activación. Perder la función de avance sigue liberando inmediatamente; prioridades y elegibilidad de sustitutos no cambian. Al liberarse, una nueva salida debe superar otra vez 8 unidades y esperar 1 segundo. Parámetros heurísticos, no calibrados con tracking. line_chain añade casos espejo para los cuatro sistemas: persistencia a 7, liberación a 5, no reactivación a 7 y nueva espera. No demuestra estabilidad colectiva en partido real ni cierra bloques pendientes.

## 0.89 — Restauración completa de jugadores

restorePosition elimina todas las propiedades propias salvo el nodo SVG antes de aplicar el checkpoint. Evita arrastrar widthStarted/driveX/driveY y futuros campos opcionales ausentes. No añade guardado ni cambia el formato; conserva compensaciones 0.88. Ver docs/RESTAURACION_089.md. No cierra los siete bloques del motor.

## 0.88 — Compensaciones secundarias

Cola de vacantes en lineCoverAssignments: primero salidas originales, luego referencias abandonadas por sustitutos. Encadena defensa←medio←ataque; termina en ataque, no garantiza cubrir vacante final. Mismas prioridades y distancia de 0.87, sin estado nuevo. Ver docs/CADENAS_088.md. No calibrado con SkillCorner; siete bloques abiertos, decision_storage pendiente.

## 0.87 — Referencias y compensaciones entre líneas

Ver docs/LINEAS_087.md: compensación temporal de salida avanzada de defensor/medio por candidato de línea siguiente, con retorno al acabar la función. Campos lineExitAt/lineCoverFor restaurados y limpiados con el resto de estado ofensivo. Límites: solo con balón, no desdoblamientos nuevos ni permutas permanentes/cadenas; no calibrado por SkillCorner. Estudio SkillCorner separado en rama codex/skillcorner-study, muestra todavía insuficiente. Mantener siete bloques abiertos y fallo decision_storage pendiente.

## 0.86 — Referencia amortiguada y seguridad persistente

Aplica hipótesis del Game 3: possessionShape usa origen longitudinal de posesión + 0,35 del desplazamiento de balón, limitado a 12 unidades de desfase. Mantiene geometrías por sistema, anchura lateral previa, apoyos/receptor, órdenes, límites y seguridad ligada al balón. No es filtro temporal ni aprendizaje ML; al superar el desfase máximo vuelve a acompañar 1:1 para evitar desconexión. 0,35/12 son parámetros de diseño, no óptimos estimados de Game 3. Dos puestos attackBalance persistentes, reemplazables por inelegibilidad o ventaja de profundidad >8. Campo primitivo incluido en snapshots y limpiado junto a attackSupport; siete bloques siguen abiertos. Ver docs/ESTABILIDAD_BLOQUE_086.md. Incidencia previa decision_storage pendiente.

## Contraste estructural — Sample Game 3 (motor sigue en 0.85)

Petición: aprender de otro partido por desorden posicional. Descargados tracking/eventos/XML de Game 3; integridad blobs verificada. Analizada primera parte completa para seleccionar 203 ventanas PASS/CARRY de 5 s (150 desarrollo/53 contraste temporal). Ver docs/ESTRUCTURA_PARTIDO_3.md, data/game3-structure.json y script reproducible. Ganancia longitudinal centroide/ball 0,259/0,307 frente a objetivo estructural longitudinal de ganancia 1 en possessionShape tras mezcla completa: hipótesis de sobrerreacción, no validación simulada. Próximo paso: amortiguación del centro de bloque y persistencia de funciones con comparación antes/después. No entrenamiento ML, ni partido completo analizado, ni orientación inferida del tracking. Mantener 0.85 hasta implementar/verificar ajuste. Contraste ya inspeccionado, no reutilizar como holdout ciego.

## 0.85 — Continuidad del perfil al recibir

prepareReception conserva el ángulo corporal actual en pase raso si balón de origen y avance quedan dentro de ±90° y el espacio percibido supera 5. Observa rivales desde el perfil actual; desconocimiento no equivale a espacio libre. En presión/perfil cerrado conserva giro hacia origen. Mantiene controlError y demora angular existentes, prioridad de control, exclusión de portero/aéreos y cuatro sistemas. No añade control orientado direccional elegido ni visión de cabeza. Parámetros provisionales, siete bloques abiertos; fallo preexistente decision_storage pendiente.

## 0.84 — Perfilación y relación de fase

El apoyo de campo a menos de 6 unidades de su destino abre el cuerpo entre balón y avance; receptor de pase a menos de 15 del balón también anticipa ese perfil. En oposición exacta abre hacia el centro. Defensa cerca de su destino (<3) mira al balón. Carrera larga, portero, reinicios, control y escaneo conservan sus prioridades. Giros limitados por capacidad individual; sin teletransporte ni nueva información sobre rivales ocultos. La conexión de apoyo mutuo añade demora angular cuando el balón llega por detrás del plano lateral: max(0,error−π/2)/turnRate. Puede reclasificar apoyo a cooperación; receptor ya designado conserva vínculo. Parámetros heurísticos, no validación real ni cabeza independiente. Conserva cuatro sistemas de 0.83. Incidencia previa de retry en decision_storage pendiente; siete bloques abiertos.

## 0.83 — Sistemas seleccionables por equipo

Selectores azul/rojo: 4-3-3, 4-2-3-1, 4-4-2 y 3-5-2. Cada sistema define referencias longitudinales/laterales y funciones por dorsal; actualiza roles, referencias de arquitectura y funciones dependientes del rol, no solo una etiqueta. Conserva posiciones y velocidades al cambiar, apoyos locales y seguridad de 0.82. Sistema por jugador incluido en instantáneas y guardados; recuperar una instantánea antigua sin sistema vuelve a 4-3-3. Reiniciar conserva la selección actual. No redefine aún posiciones de saque inicial ni un bloque defensivo específico por sistema: son arquitecturas con balón, no cuatro modelos de juego completos. No añade redistribución automática tras expulsión. Parámetros de diseño sin calibración de partido real/Safari. Siete bloques abiertos, 0.53.1 excluida; publicar main/Pages.

## 0.82 — Arquitectura base con balón

Petición del usuario: mantener estructura y red de receptores. Primera base 4-3-3: referencias por puesto relativas al balón, dos destinos de seguridad escalonados, reconstrucción gradual desde posiciones de recuperación. Apoyos, receptor y órdenes conservan prioridad. Ver docs/ARQUITECTURA_POSESION_082.md para parámetros, evidencia histórica Metrica leída y límites: no entrenado/validado contra un partido, no selector de múltiples sistemas ni garantía de apoyos instantáneos. Siete bloques abiertos; 0.53.1 excluida. Publicar main/Pages.

## 0.81 — Referencia defensiva según incertidumbre

A2/A4: en contención/retroceso fuera del presionante y primera cobertura, compara referencias de campo a menos de 16 unidades por distancia + 2 × radio de incertidumbre, desempate por id. Evita que un recuerdo próximo casi caducado desplace siempre a un rival visible ligeramente más lejano. Conserva ponderación gradual, referencia de pérdida y retroceso de 0.80. Parámetro heurístico, no probabilidad ni mejora defensiva general demostrada. containment_reference comprueba ambos sentidos y estados, recencia, límite local, movimiento oculto y restauración. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Copia local recuperada de main 317763d tras mantenimiento del entorno. Publicar main/Pages.

## 0.80 — Contención y retroceso perceptivos

A2/A4: el ajuste hacia rival cercano de defensores fuera de los dos primeros puestos usa oposición observada/recordada, excluye porteros y pondera el recuerdo con confianza lineal hasta caducidad. Mantiene referencia de pérdida, recuperación de profundidad y políticas del presionante/cobertura. No sigue coordenadas ocultas. containment_perception prueba ambos equipos, contención/retroceso, observación, memoria gradual, caducidad, restauración y movimiento; falla en 0.79 por dependencia del rival oculto. Coordinación, balón y otras partes defensivas conservan información global: no completa percepción ni demuestra mejora defensiva general. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.79 — Centro con referencia reciente

Finalización A2/A3/A6: centros automáticos requieren receptor visto hace menos de 0.5 s, además de espacio y posición habilitada percibidos. Sin candidato se mantienen pase/conducción; no prohíbe todo pase hacia recuerdos ni modifica centros manuales o física aérea. Umbral heurístico. cross_selection añade casos espejo de receptor oculto antiguo y refresco visual. Siete bloques abiertos; fases aún parciales, 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.78 — Superación ligada a su opción concreta

A3/A4: gamePhase consulta el riesgo de la salida progresiva corta elegible, no el de otro pase mejor puntuado. Conserva prioridad de iniciación/finalización. La preferencia por salida corta frente a alternativa expuesta o recuerdo antiguo también se aplica en Superación; evita que el cambio de etiqueta desactive la continuidad de 0.75/0.77. Prueba espejo de fase y pase ejecutado; el caso falla en 0.77. Progresión profunda abierta sigue disponible. No demuestra líneas realmente superadas ni cierra el detector de fases. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.77 — Conservar con información reciente

A2/A3/A4: en fases organizativas, espacio del poseedor >=4, si el mejor pase depende de un recuerdo de al menos 0.5 s, prioriza salida corta observada ahora y con los criterios de riesgo/espacio existentes. Conserva prioridad de progresión corta cuando es elegible. No elimina recuerdos ni inventa posiciones ocultas; no cambia finalización, portero, acciones manuales o presión inmediata. Umbral heurístico: no calibrado científicamente. organizing_memory prueba ambos equipos y 16 semillas: apoyo fresco, movimiento oculto, refresco, recuerdo reciente y apoyo marcado; falla contra 0.76 y pasa con 0.77. Siete bloques abiertos, modelo de fases parcial y 0.53.1 excluida. Publicar main/Pages.

## 0.76 — Fases y principios explícitos

Primera integración de las diez fases solicitadas. gamePhase vincula lecturas ofensivas y planes defensivos a principios; la organización ofensiva utiliza opciones percibidas, presión y remate además de profundidad, sustituyendo el corte único de 65. Conservación y progresión corta comparten política. Defensa añade explicación al inspector sobre conductas existentes, sin nueva política defensiva. Alcance, tabla y pendientes en docs/FASES_PRINCIPIOS_076.md. Sin detector global completo ni secuencia rígida; siete bloques abiertos y 0.53.1 excluida. Pruebas sintéticas, no validación científica/Safari. Publicar main y mismo Pages.

## 0.75 — Progresión corta con continuidad

A3/A4: corrige un hueco de 0.74: una salida progresiva corta segura desactivaba la circulación pero podía acabar eligiéndose el pase profundo expuesto. En zona organizativa aproximada (avance <=65), espacio del poseedor >=4 y riesgo del mejor pase >=4, elige progresión corta fresca (avance >3, distancia <=25, riesgo <=3, espacio >=5), o apoyo lateral/retrasado si aquella falta. No fuerza retroceso cuando hay avance claro. Conserva el resto de la política y reglas. Prueba espejo en 16 semillas: progresión corta, pase profundo abierto y alternativa de conservación con receptor marcado. La prueba falla contra 0.74 y pasa con 0.75. No es reconocimiento completo de fases ni garantía de posesión. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicar main/Pages.

## 0.74 — Conservar como principio organizativo

Petición del usuario: conservación y progresión en iniciación y disposición posicional. Aproximación inicial, NO identificación completa de fases: poseedor hasta avance 65. Sin presión inmediata (espacio >=4), si mejor pase tiene riesgo >=4 y no hay salida progresiva corta segura, prioriza apoyo lateral/retrasado fresco, distancia <=25, riesgo <=3 y espacio >=5, antes de conducir/forzar avance. En avance <35 y presión <3.5, aprovecha salida corta progresiva o de conservación antes del despeje aleatorio. Conserva progresión abierta, percepción y reglas; no asegura completar pases. No aplica nueva política al último tercio ni sustituye salida del portero. Umbrales heurísticos. Prueba organizing_possession: ambos sentidos, iniciación presionada y zona media sin presión, 16 semillas, apoyo marcado/oculto y progresión abierta. Siete bloques abiertos; 0.53.1 excluida; sin validación científica/Safari. Publicación main/Pages.

## 0.73 — Confianza gradual en la separación

A2/A4: la penalización de aglomeración en destinos de apoyo y separación lateral pondera cada compañero por 1 - edad del recuerdo / duración individual de memoria. La observación actual pesa 1; el recuerdo caduca con peso 0. No actualiza posiciones ocultas ni modifica el formato guardado: confianza derivada al consultar. Recuperación habilitada conserva su veto de ocupación hasta caducidad; coordinación global y línea táctica siguen pendientes. No modela colisiones ni garantiza mejor rendimiento táctico. Prueba spacing_confidence.cjs en ambos sentidos: decaimiento, destino, refresco y restauración. Siete bloques abiertos; 0.53.1 excluida; sin validación científica o Safari/iPhone. Publicación main/Pages.

## Estado 0.72

Incremento A2/A4: la separación lateral de jugadores no asignados a apoyo y la ocupación del destino de recuperación habilitada usan compañeros observados/recordados (knownTeammates), sin consultar sus coordenadas ocultas. Mantiene el criterio perceptivo existente de los apoyos y el formato de memoria/guardado. Pruebas espejo de observación, recuerdo sin actualización oculta, refresco al mirar, caducidad, expulsión, movimiento, pausa y restauración; además recuperación directa/desvío. La 0.71 falla el caso oculto (destinos y=16/24); la 0.72 no cambia ese destino por movimiento no visto. No es evitación física de colisiones: puede haber aproximación a un compañero desconocido. Línea táctica de fuera de juego y coordinación de funciones continúan globales; no completa percepción sin balón. Siete bloques abiertos; 0.53.1 excluida; sin validación científica ni Safari/iPhone. Publicar main y mismo Pages.

## Estado 0.71

Incremento A2/A4: la separación lateral de jugadores de campo no asignados a apoyo usa espacio percibido, con recuerdos e incertidumbre, en lugar de la posición real del rival más cercano. Los apoyos conservan su política perceptiva existente. Pruebas espejo: rival oculto, observación directa, recuerdo sin actualizar coordenadas ocultas, caducidad, movimiento y restauración. La comparación con 0.70 reproduce el fallo previo (destino lateral 16 frente a 24 según un rival no visto); 0.71 conserva el destino en ese caso. No completa percepción sin balón: línea táctica de fuera de juego, coordinación de funciones y separación respecto a compañeros siguen usando información compartida/global. Sin validación científica ni Safari/iPhone. Siete bloques abiertos; investigación 0.53.1 excluida; publicación en main y mismo Pages.

## Estado 0.70

Incremento A2/A6: durante preparación de recepción rasa, permite frenar la velocidad existente si error de perfil <=60°, velocidad alineada al cuerpo <=45°, espacio percibido >5 y corredor observado de 3 unidades con separación >3.2. Integra frenada analítica sin acelerar ni inventar conducción; de lo contrario mantiene control estático. No adelanta la liberación ni cambia primer toque, controles aéreos o formato de guardado. No es todavía control orientado completo ni modelo de toque separado del balón. Prueba espejo, desplazamiento/frenada, presión, mala orientación, pausa, restauración y balón siguiendo al receptor. Umbrales heurísticos; sin validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## Estado 0.69

Incremento A3/A4/F04: para el centro automático, el receptor necesita espacio percibido >2.5, además de posición habilitada y ubicación de remate. Si no hay candidato, se valoran las otras opciones existentes; no se garantiza posesión ni remate. Conserva memoria e incertidumbre, física aérea y centros manuales. Caso espejo: poseedor (80,10), receptor y marcador (90,32); 0.68 centraba, 0.69 no fuerza ese centro. Prueba alternativa libre, apertura de marcaje, recuerdo/caducidad y 32 decisiones marcadas. Umbral heurístico, no probabilidad ni validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## Estado 0.68

Incremento A3/A4/O01: si no existe corredor progresivo viable, añade conducción lateral de 5 unidades, mínimo desplazamiento real 4 dentro de límites. Conserva separación percibida >3.2, presión >4 y comparación con pases. No obliga a avanzar, no fuerza regate bajo presión ni consulta coordenadas rivales ocultas. Pruebas espejo, movimiento físico, avance prioritario, presión inmediata, cierre de todas las rutas y rival oculto. Parámetros heurísticos; sin validación científica ni nueva prueba Safari/iPhone. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## Estado 0.67

Incremento A2/A4/O04 sobre 0.66: compara regreso directo y desvíos laterales de ±4/±8, acotados al campo, para delanteros adelantados sin función de apoyo. Elige el recorrido geométrico más corto con destino no ocupado y corredor percibido >2.5; si ninguno cumple mantiene la alternativa ordinaria. No garantiza evitar un rival en movimiento. Conserva física, órdenes, apoyos y libertad después del golpeo. La línea táctica sigue siendo global, como antes: no completa percepción sin balón. Siete bloques abiertos, investigación 0.53.1 excluida; publicar main/Pages. Sin validación científica ni nueva comprobación Safari/iPhone.

## Estado 0.66

Incremento A2/A4/O04: delantero no asignado a apoyo, más de 1.5 unidades por delante de la línea, recupera hacia línea menos 0.7 conservando altura lateral. Solo con posesión del equipo, destino libre de compañeros a menos de 4 y corredor percibido >2.5. Sin teletransporte ni restricción después del golpeo; órdenes y apoyos conservan prioridad. Reutiliza la línea táctica GLOBAL ya existente: no completa percepción sin balón. Prueba espejo, movimiento físico, destino ocupado, corredor bloqueado, jugador habilitado y balón en vuelo. Umbrales heurísticos, sin validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## Estado 0.65

Incremento A3/O03: bajo presión percibida <4 y mejor pase ordinario con riesgo >=8, prioriza una alternativa progresiva observada ahora (avance >3, distancia <=25, riesgo <=3, espacio >=5) antes del apoyo de conservación. Caso espejo: poseedor (50,32), receptor profundo (74,32), alternativa (54,50), rivales (48,32)/(60,32). 0.64 elegía el profundo tapado; 0.65 elige la alternativa. Conserva pase profundo abierto y rechaza alternativa marcada. Parámetros heurísticos; sin validación científica ni Safari/iPhone. Siete bloques abiertos, 0.53.1 excluida, publicar main/Pages.

## Estado 0.64

Sobre 0.63: envíos largos con destino coherente con el receptor conocido, alcance total limitado y elección por espacio percibido. Si falta candidato, el mensaje indica envío al espacio sin receptor identificado. Conserva error físico y memoria; fuera de juego percibido se filtra en juego abierto, no en saque de meta. tests/keeper_long_target.cjs. Publicar main y mismo enlace Pages; siete bloques abiertos.

## Estado 0.63

Portero en juego abierto: salida corta contextual si dispone de tiempo y compañero observado con línea poco expuesta; largo ante presión o ausencia de esa opción. Mensaje «portero inicia en corto». Saques de meta y acción manual de largo sin cambios. Prueba tests/keeper_distribution.cjs y regresión aerial_play.cjs. Publicar main y mismo enlace Pages; siete bloques abiertos, sin integrar 0.53.1.

## Estado 0.62

Sobre 0.61: conservación automática con apoyo observado poco expuesto cuando la mejor opción ordinaria está tapada y hay presión inmediata. Mensaje «busca conservar con el apoyo». Ver tests/safe_outlet.cjs. No modifica guardados, arbitraje ni defensa experimental. Publicar en main y mismo enlace Pages; siete bloques generales siguen abiertos.

## Estado 0.61

Sobre 0.60: finalización automática compara dos ángulos laterales cuando el centro está bloqueado. Percepción/memoria, dispersión, contacto y tiro manual se conservan. Pruebas ampliadas en shot_selection.cjs; siete bloques generales de cierre siguen abiertos. Mantener publicación en main y https://aanogom429-del.github.io/Fase-manager/.

## Estado 0.60

Sobre 0.59: la elección automática de tiro tiene en cuenta bloqueadores de campo percibidos en la línea central a portería. Si está cerrada, continúa valorando pase/conducción; portero y tiro manual conservan su función. Ver tests/shot_selection.cjs. El informe histórico 0.53 se reproduce ahora sobre su fixture inmutable y el motor actual tiene comprobaciones dinámicas propias. Siguen abiertos siete bloques de cierre, no siete versiones. Publicar en main y comprobar el mismo enlace Pages; 0.53.1 sigue excluida.

## Estado 0.59

Sobre 0.58: pase automático al espacio para receptores visibles en avance, reutilizando leadPassTarget con filtros de riesgo y espacio percibidos. El mensaje del partido identifica «pasa al espacio». No añade conocimiento oculto, nuevos formatos de guardado ni cambios de arbitraje. Prueba tests/automatic_lead_pass.cjs; instrucciones vigentes de publicar incrementos probados en main y verificar el mismo enlace https://aanogom429-del.github.io/Fase-manager/.

## Estado 0.58

Sobre 0.57: conducción automática con avance corto y diagonal como alternativa al recorrido largo bloqueado. Usa exclusivamente oposición percibida para valorar el recorrido; conserva presión mínima, comparación con pases, exploración sin salida y física de movimiento. Prueba específica tests/short_carry.cjs. No cambia guardados, órdenes, arbitraje ni defensa experimental 0.53.1. Publicar incrementos probados en main y verificar https://aanogom429-del.github.io/Fase-manager/.

## Estado 0.57

Sobre 0.56: selección automática de pases y centros descarta receptores percibidos en fuera de juego. El motor conserva percepción limitada, conducción y exploración cuando no hay salida. No garantiza evitar todos los fueras de juego ni cambia la sanción reglamentaria o las decisiones manuales. Flujo autorizado: publicar rama y actualizar main tras pruebas; enlace de juego https://aanogom429-del.github.io/Fase-manager/. No continuar despliegues en Sites como vía habitual.

## Estado 0.56

Base: 0.55 corregida (simulación directa y guardado plegado). Mejora de apoyo: otra altura cuando la salida lateral sigue tapada, con información percibida y margen mínimo de utilidad. Ver ROADMAP.md y tests/support_escape.cjs. No modifica la política defensiva ni cierra A. Los guardados previos conservan su formato, pero sus resultados pueden cambiar al evolucionar el motor. Usuario autoriza publicar el proyecto en GitHub; conservar main y las ramas de investigación.

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


Actualizado: 20-10-2026. Motor actual: **0.53**, repositorio `aanogom429-del/Fase-manager`, rama `main`, commit anterior de motor `a19f7435c22896d15e22f4d1a00033ac87c58cea` (19-10-2026 21:38:58 UTC). La referencia anterior identifica el motor 0.52; el padre de la entrega 0.53 es `13c0330cc6abad294e0cc1552abb64b4bd71e46d`. La 0.53 se implementa de forma acotada según el informe enlazado, sin iniciar 0.54.

## Objetivos y continuidad

Videojuego de simulación futbolística basado en los espacios de fase de Paco Seirul·lo, el comportamiento colectivo y las decisiones individuales. Permite observar situaciones, intervenir como entrenador, comparar decisiones y continuar la simulación. Se conserva la secuencia **A) motor táctico y deportivo; B) videojuego comercial; C) adaptación a iOS**.

El código existente es la base del desarrollo: no reiniciar el proyecto, sustituirlo por un prototipo anterior ni sobrescribir funcionalidades. El posible borrador 0.53 mencionado en una conversación anterior no está acreditado como código integrado. La 0.53 actual se desarrolla y verifica desde esa base; no se importa aquel borrador.

Fuentes: código del commit indicado, historial Git y documentación de `docs/`. Los mensajes de conversación no sustituyen estas evidencias. Para estado vigente consultar [ROADMAP.md](ROADMAP.md); para resultados de pruebas e incidencias consultar [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md). Los documentos anteriores se conservan: sus entradas antiguas describen versiones históricas, aunque utilicen la palabra «vigente».

## Arquitectura

- `index.html`: aplicación monolítica con HTML, CSS, SVG y JavaScript sin framework. Incluye interfaz, estado, decisiones, física simplificada, arbitraje y visor de referencia.
- Simulación en navegador con `requestAnimationFrame` y acumulador a pasos de 1/120 s; movimiento acelerado integrado por subpasos. Campo lógico 100×64; parámetros de diseño no equivalen automáticamente a magnitudes calibradas de futbolistas reales.
- Estado en memoria: jugadores, orientación, velocidad, capacidades, recuerdos, posesión, vuelo, acción técnica, órdenes, reloj, marcador, faltas, ventaja y reanudaciones. Guardado/restauración de decisiones y semilla reproducible en modo guiado; modo libre usa azar.
- `data/`: 58 JSON de referencias, diagnósticos y resultados históricos.
- `docs/`: 15 documentos anteriores y el informe de protección de finalización 0.53.
- `scripts/`: 31 herramientas Python/Node para importación, diagnóstico y comparación.
- `tests/`: 49 entradas CommonJS y una entrada Python; ocho instantáneas HTML en `tests/fixtures/`.
- `README.md`: descripción mínima. Antes de esta consolidación había 160 archivos versionados.

No hay proyecto nativo iOS, Capacitor, servidor de partidas, base de datos ni manifiesto `package.json` en esta base. Las pruebas Node usan `node:vm` y un DOM simulado; no equivalen a pruebas visuales en Safari/iPhone.

## Fundamentos y espacios de fase

El enfoque del proyecto es sistémico: las conductas dependen de las relaciones entre balón, compañeros, rivales y posibilidades de acción. La implementación es una operacionalización exploratoria, no una validación científica completa de la teoría.

| Criterio | Representación y límite |
|---|---|
| Zona del balón y ubicación | Posiciones, posesión y geometría; parte del conocimiento colectivo sigue siendo global. |
| Perfilación | Orientación corporal, giro limitado, filtro angular y coste en desplazamiento/recepción; sin mirada independiente ni oclusión completa. |
| Trayectorias | Velocidad, aceleración, frenada, vuelo, llegada aproximada y anticipación rasa; predictores simplificados. |
| Individualidad | Velocidad, precisión, reacción, aceleración, frenada, giro y duración de memoria; perfiles ilustrativos, sin cubrir las ocho áreas. |
| Relaciones y resonancia empática | Persistencia y coordinación básica de funciones; sin modelo suficiente de resonancia, comunicación o ajuste recíproco. |

`phaseRelations` clasifica interacción, apoyo mutuo y cooperación mediante acceso, conexión y cobertura. `phaseContour` dibuja envolventes convexas redondeadas: no representa todavía un campo completo de accesibilidad. No confundir clasificación visual con una política decisional completa. Ventajas numéricas, posicionales, cualitativas y dinámicas y el ciclo adaptativo conservan cobertura parcial.

## Comportamiento colectivo

`attackingTargets` y `selectAttackSupports` asignan dos apoyos persistentes, con valoración desde oposición percibida, amplitud contextual progresiva, profundidad, equilibrio y ocupación de remate. Hay anclajes de posesión y límites tácticos de fuera de juego; persiste coordinación central y acceso a datos globales.

`defensiveOrder`, `contextualDefense` y `defendingTarget` asignan presionante/cobertura, estiman llegada y ayuda disponible y consideran líneas percibidas y amenazas simultáneas. La 0.52 puede temporizar si presionar abandona una línea de pase sin respaldo o ante inferioridad local percibida; mantiene presión con acceso inmediato. La 0.53 añade protección de corredores rasos ante poseedor visible y conservación de cobertura, considerando orientación, movimiento y ayuda visible. Informe y contracasos en [PROTECCION_FINALIZACION_053.md](docs/PROTECCION_FINALIZACION_053.md).

Las órdenes guiadas sin balón incluyen apoyo, equilibrio, amplitud, profundidad, mantener posición, cobertura, presión y repliegue. Tienen demora, duración y prioridades; se cancelan según posesión y disponibilidad. Las transiciones limpian referencias ofensivas/defensivas y registran pérdidas. No constituyen todavía un ciclo adaptativo completo.

## Decisiones y acciones individuales

`chooseAction` puntúa pases y conducción y aplica condiciones/probabilidades para tiro, centro, despeje o envío del portero. Usa recuerdos de compañeros/rivales con caducidad e incertidumbre. La ejecución física y el arbitraje consultan el estado real. Los futbolistas **no aprenden de la práctica**: no hay entrenamiento de modelos ni mejora persistente.

Implementaciones acotadas: pase raso/elevado, pase al espacio guiado, paredes A→B→A y continuidad hacia C, primer toque condicionado con alternativa de control, preparación de recepción rasa por orientación, conducción, regate/finta guiados, protección/giro, tiro, centro, cabeceo y despeje raso/aéreo. `passExecution` introduce dispersión por distancia, presión y precisión. Una acción seleccionada no garantiza éxito.

Portero: posición básica, intervención sobre vuelos/remates, salida corta/larga y distribución aérea. No hay control explícito con manos, volea desde manos, salto individual ni repertorio completo de portero. El control orientado en movimiento, controles aéreos específicos, voleas, fatiga y contacto corporal detallado siguen pendientes.

## Reglas implementadas y límites

Se describe código existente, no una certificación arbitral ni una revisión normativa independiente.

| Área | Implementación acotada | Pendiente |
|---|---|---|
| Balón fuera/gol | Cruce completo y restricciones de gol directo de reanudaciones | Colisiones completas con postes/travesaño, agentes externos |
| Reanudaciones | Banda, meta, esquina, centro, directos, indirectos y penalti; colocación/distancias y segundo toque | Técnica corporal, desobediencia, demoras e infracciones detalladas |
| Fuera de juego | Registro al golpeo, sanción al tocar/recibir y exenciones directas de banda/meta/esquina | Interferencia sin toque, anatomía, rebotes/salvadas y otras excepciones |
| Contacto | Entrada baja legal, fallida o imprudente; directo/penalti | Manos, agarres, fuerza excesiva y demás conductas |
| Ventaja | Ventana provisional, beneficio observado y retorno a la falta | Ventaja en área, sanciones diferidas y situaciones más amplias |
| Disciplina | Ataque prometedor/ocasión manifiesta simplificados, amarillas, roja, segunda amarilla y mínimo de siete | Cobertura disciplinaria completa, sustituciones y expulsión de portero |
| Partido | Reloj, marcador y centro tras gol | Periodos, descanso, añadido, final reglamentario, balón a tierra y desempates |

Consultar [REGLAS_IMPLEMENTACION.md](docs/REGLAS_IMPLEMENTACION.md): sus secciones superiores actualizan las inferiores. Por ejemplo, los apartados históricos que niegan ventaja/tarjetas no describen la 0.52.

## Estado y evidencia

La etapa A está abierta. La comparación dinámica 0.53 añade evidencia sintética acotada (3 parejas favorables, 16 sin cambio en goles y 1 adversa), no validación general. Existen pruebas funcionales, regresiones e informes con tracking de Metrica; reproducirlos no demuestra realismo general ni aprendizaje. Las ventanas históricas reutilizadas no son una reserva independiente. Las pruebas de la 0.52 aíslan destinos; la mejora defensiva general con rival reactivo no está demostrada. Resultado de la ejecución de recuperación y límites detallados en DEVELOPMENT_LOG.md.

Referencias de continuidad: [matriz](docs/MATRIZ_COBERTURA_TACTICA.md), [cierre del motor](docs/CIERRE_MOTOR_TACTICO.md), [hoja histórica](docs/HOJA_DE_RUTA.md), [avance 0.52](docs/PRESION_EXPOSICION_052.md).

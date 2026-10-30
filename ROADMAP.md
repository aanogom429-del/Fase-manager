# Fase Manager — Hoja de ruta de continuidad

## 0.99 — Perfil de carrera y giro antes del golpeo

Corrección prioritaria solicitada por el usuario: repliegue con referencia corporal al balón; pases/tiros con el pie fuera del cono frontal esperan giro real, sin tacones automáticos. Preparación cancelable por pérdida, atributos de centros/saques preservados y pausa/continuación protegidas. Ver docs/PERFIL_GOLPEO_099.md. Parámetros heurísticos; cabeceo y estimación completa de llegada pendientes. Siete bloques abiertos, no cierre del motor.

## 0.98 — Receptor de pase atrás

Cobertura contextual de receptor central percibido recientemente, alcanzable desde banda cerca de portería; alternativa a líneas prioritarias y continuidad en vuelo raso. Ver docs/PASE_ATRAS_098.md. Ocho pruebas PASS; ocho parejas de ablación sin mejora en exposición/tiros/goles. Nueva conducta acotada, no eficacia general demostrada. Pendiente percepción/preparación previa al pase y causas de inelegibilidad; siete bloques abiertos.

## Contraste centros/pase atrás — 0.97

cross_cutback_relays PASS técnico: ocho parejas de 4 s con/sin cadena, dos equipos/acciones/semillas. 534 observaciones de enlace, 19 cerca de referencia en dos casos de pase atrás; mismos tiros/goles/exposición receptor por pareja. Gol adverso conservado. Ver docs/CENTROS_PASE_ATRAS_097.md. Próxima mejora: amenaza percibida del receptor del pase atrás y tiempos de acceso, no más persistencia por sí sola. Motor sin cambios; no eficacia general demostrada.

## Diagnóstico de cierres finalizado — 0.97

El cierre externo pendiente era recuperación de posesión del equipo defensor (rojo), no fallo de persistencia. El otro episodio cambia de presionante. Ver docs/CIERRES_RELEVO_097.md. Añadida regresión capture→limpieza de toda la cadena. Sin cambios de motor. No seguir ampliando radio/tiempo con estos dos casos; próximo paso: centro/pase atrás prescritos y comparación con/sin cadena. Cobertura efectiva todavía no validada.

## 0.97 — Continuidad acotada de relevo

Diagnóstico: un episodio termina por cambio de presionante y otro por distancia. Radio de entrada 18 conservado, continuidad del mismo relevo hasta 22. Ver docs/CONTINUIDAD_DEFENSIVA_097.md: episodio 17→30 pasos sin llegada observada; no mejora de cobertura demostrada. Pendiente cierres externos y utilidad por tiempo disponible, no ampliar radios indefinidamente. Siete bloques abiertos.

## Contraste físico 0.96 — cobertura aún no validada

defensive_arrival ejecutado: ocho escenarios autónomos de 20 s, semillas 301/302. Solo dos episodios, 14/17 pasos, sin llegada a <=3 unidades observada. Ver docs/LLEGADA_DEFENSIVA_096.md. PASS técnico, no eficacia táctica. Próximo diagnóstico: causa de liberación y duración frente a llegada estimada antes de modificar persistencia. Sin cambio de motor/versión.

## 0.96 — Cadena defensiva

El jugador avanzado puede cubrir la referencia del medio que releva al defensor. Máximo dos enlaces adyacentes y únicos, mismas prioridades/radio/llegada y campo defSlotFor. Ver docs/CADENA_DEFENSIVA_096.md. No cubre la vacante final ni garantiza ocupación física; pendientes centros/pase atrás y llegada con oposición. No cierre de bloques.

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

## Contraste colectivo controlado de 0.90

Completada prueba line_collective de salidas simultáneas con desplazamiento físico y liberación, ocho escenarios de 30 s. Pendiente integración con acciones autónomas, pérdidas y oposición reactiva, y medida de huecos efectivos. No confundir asignaciones únicas con ocupación garantizada. Motor sigue en 0.90.

## 0.90 — Continuidad de compensaciones

Una salida establecida (más de 8 unidades durante 1 segundo) mantiene su condición hasta volver a 5 unidades de su referencia. Evita apagar la cadena por oscilaciones en el umbral de activación. Perder la función de avance sigue liberando inmediatamente; prioridades y elegibilidad de sustitutos no cambian. Al liberarse, una nueva salida debe superar otra vez 8 unidades y esperar 1 segundo. Parámetros heurísticos, no calibrados con tracking. line_chain añade casos espejo para los cuatro sistemas: persistencia a 7, liberación a 5, no reactivación a 7 y nueva espera. No demuestra estabilidad colectiva en partido real ni cierra bloques pendientes.

## 0.89 — Fiabilidad de comparaciones

Corregida restauración parcial de campos opcionales al repetir una jugada. Regresión ampliada a igualdad del estado completo guardado e identidad de nodos SVG. Pendientes estructurales de 0.88 continúan: vacante final, coordinación defensiva y contraste colectivo. No es un nuevo comportamiento táctico ni calibración con tracking.

## 0.88 — Cadena de relevos con balón

Compensación secundaria de la referencia del primer sustituto, con prioridad a vacantes originales y sin ciclos. Pendientes evaluación de la vacante final en ataque, coordinación defensiva y contraste colectivo. No cerrar el motor ni afirmar aprendizaje de tracking.

## 0.87 — Primera compensación temporal entre líneas

Referencia por puesto, sustitución elegible desde línea posterior y retorno progresivo al terminar la función. Pendientes coberturas encadenadas, defensa y evaluación colectiva de vacantes secundarias. Evidencia SkillCorner no usada para ajustar umbrales; no afirmar aprendizaje automático ni cierre del motor.

## 0.86 — Primer ajuste de estabilidad tras Game 3

Referencia longitudinal amortiguada con desfase acotado y persistencia de dos funciones de seguridad. Contraste controlado de desplazamiento objetivo/físico, no validación de partido completo. Pendientes comparación colectiva contextual, distribución por fases y retardos temporales; no cerrar los siete bloques ni afirmar reproducción aprendida.

## Prioridad tras contraste de otro partido

Game 3: 203 ventanas de circulación/conducción analizadas, métricas reales derivadas y fuente verificable en docs/ESTRUCTURA_PARTIDO_3.md. Pendiente comparar trayectorias del motor y probar centro de bloque amortiguado + funciones persistentes, sin congelar jugadores. No declarar motor entrenado ni cerrar bloques. Versión jugable sigue 0.85.

## 0.85 — Continuidad del perfil al recibir

Conservar perfil abierto ya adquirido al controlar raso con espacio percibido; mantener preparación conservadora con presión, incertidumbre o perfil cerrado. No cierra el modelo de recepción ni los siete bloques del motor. Próximos aspectos: elección de salida tras control y validación contextual.

## 0.84 — Perfilación y relación de fase

Separar orientación de carrera y perfil de apoyo cercano, abrir balón/avance y anticipar al recibir. Integrar demora de perfilación en conexión de apoyo mutuo. No completa percepción de cabeza, compenetración ni validación de partido; siete bloques siguen abiertos. Mantener los cuatro sistemas seleccionables de 0.83.

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

## 0.72 — Compañeros observados al ocupar espacios

Incremento A2/A4: la separación lateral de jugadores no asignados a apoyo y la ocupación del destino de recuperación habilitada usan compañeros observados/recordados (knownTeammates), sin consultar sus coordenadas ocultas. Mantiene el criterio perceptivo existente de los apoyos y el formato de memoria/guardado. Pruebas espejo de observación, recuerdo sin actualización oculta, refresco al mirar, caducidad, expulsión, movimiento, pausa y restauración; además recuperación directa/desvío. La 0.71 falla el caso oculto (destinos y=16/24); la 0.72 no cambia ese destino por movimiento no visto. No es evitación física de colisiones: puede haber aproximación a un compañero desconocido. Línea táctica de fuera de juego y coordinación de funciones continúan globales; no completa percepción sin balón. Siete bloques abiertos; 0.53.1 excluida; sin validación científica ni Safari/iPhone. Publicar main y mismo Pages.

## 0.71 — Separación según percepción

Incremento A2/A4: la separación lateral de jugadores de campo no asignados a apoyo usa espacio percibido, con recuerdos e incertidumbre, en lugar de la posición real del rival más cercano. Los apoyos conservan su política perceptiva existente. Pruebas espejo: rival oculto, observación directa, recuerdo sin actualizar coordenadas ocultas, caducidad, movimiento y restauración. La comparación con 0.70 reproduce el fallo previo (destino lateral 16 frente a 24 según un rival no visto); 0.71 conserva el destino en ese caso. No completa percepción sin balón: línea táctica de fuera de juego, coordinación de funciones y separación respecto a compañeros siguen usando información compartida/global. Sin validación científica ni Safari/iPhone. Siete bloques abiertos; investigación 0.53.1 excluida; publicación en main y mismo Pages.

## 0.70 — Frenada durante la recepción

Incremento A2/A6: durante preparación de recepción rasa, permite frenar la velocidad existente si error de perfil <=60°, velocidad alineada al cuerpo <=45°, espacio percibido >5 y corredor observado de 3 unidades con separación >3.2. Integra frenada analítica sin acelerar ni inventar conducción; de lo contrario mantiene control estático. No adelanta la liberación ni cambia primer toque, controles aéreos o formato de guardado. No es todavía control orientado completo ni modelo de toque separado del balón. Prueba espejo, desplazamiento/frenada, presión, mala orientación, pausa, restauración y balón siguiendo al receptor. Umbrales heurísticos; sin validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.69 — Selección de centros

Incremento A3/A4/F04: para el centro automático, el receptor necesita espacio percibido >2.5, además de posición habilitada y ubicación de remate. Si no hay candidato, se valoran las otras opciones existentes; no se garantiza posesión ni remate. Conserva memoria e incertidumbre, física aérea y centros manuales. Caso espejo: poseedor (80,10), receptor y marcador (90,32); 0.68 centraba, 0.69 no fuerza ese centro. Prueba alternativa libre, apertura de marcaje, recuerdo/caducidad y 32 decisiones marcadas. Umbral heurístico, no probabilidad ni validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.68 — Conducción lateral

Incremento A3/A4/O01: si no existe corredor progresivo viable, añade conducción lateral de 5 unidades, mínimo desplazamiento real 4 dentro de límites. Conserva separación percibida >3.2, presión >4 y comparación con pases. No obliga a avanzar, no fuerza regate bajo presión ni consulta coordenadas rivales ocultas. Pruebas espejo, movimiento físico, avance prioritario, presión inmediata, cierre de todas las rutas y rival oculto. Parámetros heurísticos; sin validación científica ni nueva prueba Safari/iPhone. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.67 — Desvío de recolocación

Incremento A2/A4/O04 sobre 0.66: compara regreso directo y desvíos laterales de ±4/±8, acotados al campo, para delanteros adelantados sin función de apoyo. Elige el recorrido geométrico más corto con destino no ocupado y corredor percibido >2.5; si ninguno cumple mantiene la alternativa ordinaria. No garantiza evitar un rival en movimiento. Conserva física, órdenes, apoyos y libertad después del golpeo. La línea táctica sigue siendo global, como antes: no completa percepción sin balón. Siete bloques abiertos, investigación 0.53.1 excluida; publicar main/Pages. Sin validación científica ni nueva comprobación Safari/iPhone.

## 0.66 — Recuperar posición habilitada

Incremento A2/A4/O04: delantero no asignado a apoyo, más de 1.5 unidades por delante de la línea, recupera hacia línea menos 0.7 conservando altura lateral. Solo con posesión del equipo, destino libre de compañeros a menos de 4 y corredor percibido >2.5. Sin teletransporte ni restricción después del golpeo; órdenes y apoyos conservan prioridad. Reutiliza la línea táctica GLOBAL ya existente: no completa percepción sin balón. Prueba espejo, movimiento físico, destino ocupado, corredor bloqueado, jugador habilitado y balón en vuelo. Umbrales heurísticos, sin validación científica/Safari. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.65 — Progresión menos expuesta

Incremento A3/O03: bajo presión percibida <4 y mejor pase ordinario con riesgo >=8, prioriza una alternativa progresiva observada ahora (avance >3, distancia <=25, riesgo <=3, espacio >=5) antes del apoyo de conservación. Caso espejo: poseedor (50,32), receptor profundo (74,32), alternativa (54,50), rivales (48,32)/(60,32). 0.64 elegía el profundo tapado; 0.65 elige la alternativa. Conserva pase profundo abierto y rechaza alternativa marcada. Parámetros heurísticos; sin validación científica ni Safari/iPhone. Siete bloques abiertos, 0.53.1 excluida, publicar main/Pages.

## 0.64 — Destino coherente del envío largo

Incremento A3/A6/F01: el envío largo selecciona receptores con avance >=32 y distancia total <=55, dentro de los márgenes 3–97/2–62. En juego abierto compara espacio percibido, antigüedad y distancia a 42; descarta fuera de juego percibido. Destino intencional igual a posición conocida del receptor, sin desplazarlo por límites del golpeo. Sin candidato, envía al espacio sin receptor asociado. Saque de meta conserva exención y lectura global de reanudación. No añade control aéreo ni garantiza recepción. Siete bloques abiertos; 0.53.1 excluida; publicar main/Pages.

## 0.63 — Salida contextual del portero

Incremento A3/A6/F01: en juego abierto, con espacio percibido >=7, busca un receptor observado ahora, habilitado, a 8–25 unidades, no retrasado, riesgo de línea <=3 y espacio receptor >=5. Ordena por espacio, riesgo, distancia y avance; si no existe o hay presión, envía en largo. Sustituye la elección aleatoria inicial de largo, sin cambiar saques de meta ni órdenes manuales. No garantiza recepción; parámetros no calibrados. Siete bloques siguen abiertos y 0.53.1 excluida. Publicar en main/Pages.

## 0.62 — Salida de conservación bajo presión

Incremento A3/O01: con presión percibida menor de 4 y mejor pase ordinario con riesgo de línea >=8, puede preferir apoyo lateral/retrasado observado ahora (avance <=3, longitud <=25, riesgo <=3, espacio receptor >=5). Mantiene comparación ordinaria si no hay tal salida; no garantiza completar el pase. No declara segura una posición recordada antigua. Criterios heurísticos, no probabilidades. Siguen abiertos siete bloques. Publicación en main/Pages; 0.53.1 excluida.

## 0.61 — Alternativas de ángulo de tiro

Incremento A3/A4/F04: mantiene el centro libre y, si está cerrado, compara destinos laterales a y=29/35 en la línea de gol. Selecciona separación percibida >1.65 y proyecta esa intención hasta el final del vuelo, conservando dispersión de ejecución. Si todos están tapados, continúa con pase/conducción. No modela toda la superficie de portería ni probabilidad de gol; el portero no veta el tiro. Siguen abiertos los siete bloques; 0.53.1 no se integra. Publicación en main y mismo enlace Pages.

## 0.60 — Elegir remate o continuidad

Incremento A3/A4 (F04/D04): antes del tiro automático se comprueba la separación de la línea central a portería respecto a defensores de campo percibidos. Si es <=1.65 unidades, se valoran las alternativas existentes de pase, conducción o exploración. El portero no veta el tiro por ocupar su posición. No cambia el tiro manual, la ejecución ni el arbitraje. No compara aún todos los ángulos de portería, probabilidades de gol ni ventajas completas.

Recuento de cierre actualizado: siguen abiertos los **7 bloques de trabajo** de docs/CIERRE_MOTOR_TACTICO.md; esta entrega avanza selección de soluciones/finalización, pero no cierra esos bloques. No equivalen a siete versiones: falta descomposición y validación suficiente para un número fiable de entregas. Se conserva la prioridad de motor, incrementos comprobables y publicación en main/Pages; no se integra 0.53.1.

## 0.59 — Pase automático al espacio

Incremento A2/A4/A6: reutiliza el cálculo de encuentro del pase guiado para compañeros observados que avanzan. Solo anticipa con observación actual y destino visible, avance mayor de 0.5, riesgo de línea no superior en más de 0.5 y espacio de recepción no inferior en más de 1. Evalúa después ese destino frente a los otros pases y la conducción. El fuera de juego se valora sobre el receptor al golpeo, no sobre el punto futuro de recepción. Los recuerdos sin observación actual siguen usando la última posición, sin velocidad oculta. No sincroniza todavía rupturas ni garantiza completar el pase; no cierra A. Publicación en main y mismo enlace Pages; investigación 0.53.1 conservada y excluida.

## 0.58 — Conducción corta ante línea cerrada

Incremento A2/A4: el poseedor compara recorridos de avance 7 y 3, rectos o diagonales. Descarta los recorridos sin separación percibida suficiente antes de elegir el mejor. Conserva la comparación con el pase y no fuerza la conducción bajo presión inmediata. Caso espejo: rival a 5 unidades delante bloquea los recorridos largos, pero deja una diagonal corta accesible. No modela todavía una secuencia completa de fijación/pase ni garantiza superar al defensor. Mantiene publicación en main y el mismo enlace de Pages; 0.53.1 sigue excluida.

## 0.57 — Elegir receptores habilitados

Incremento A6 de decisión táctica automática: un receptor percibido en fuera de juego queda excluido de la selección de pases y centros. Antes recibía una penalización que podía ser compensada por el avance. Si falta una salida habilitada, se mantiene la alternativa de conducción u observación; las acciones manuales y el arbitraje no cambian. La percepción incompleta aún puede provocar un fuera de juego real.

Prioridad vigente: motor táctico, pruebas acotadas, publicación de cada incremento probado en GitHub y main para el mismo enlace GitHub Pages, según autorización posterior del usuario. Las restricciones históricas de mantener main intacta quedan sustituidas; las ramas de investigación 0.53.1 siguen conservadas y excluidas.

## 0.56 — Desmarque de apoyo con cambio de altura

Incremento A1/A2: si la mejor alternativa lateral sigue tapada por oposición percibida, el apoyo puede retrasar su destino 4 u 8 unidades, con desplazamiento lateral opcional. Solo acepta una alternativa con menor riesgo percibido y una mejora suficiente de espacio, separación y coste de movimiento. Conserva el límite previo de fuera de juego; no consulta posiciones rivales ocultas. El inspector identifica el cambio de altura.

Evidencia acotada a escenarios sintéticos y regresiones; no demuestra mejora táctica general. 0.53.1 sigue aparcada. Se priorizan simulación y comportamiento táctico; el guardado sigue siendo opcional. GitHub es destino autorizado del código; main permanece intacta.

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

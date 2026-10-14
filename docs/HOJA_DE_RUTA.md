# Actualizaciones completadas · 14 de octubre de 2026

- **0.21 — Primer bloque reglamentario y segundo partido real.** El PDF 2026/27 aportado por el usuario pasa a ser la referencia normativa. Salida completa del balón y decisión por último toque; banda, meta, esquina y centro; geometría de gol, distancias de reanudación y restricciones de gol directo/segundo toque. Los tiros desviados dejan de convertirse en posesión automática del portero y los destinos de pase ya no se recortan artificialmente al interior. Las reanudaciones automáticas se conservan al pausar y cambiar de modo. La matriz docs/REGLAS_IMPLEMENTACION.md distingue alcance, simplificaciones y reglas pendientes.

Se añaden dos ventanas fijas de diez segundos de Metrica Sample Game 2, tras banda y córner. El visor contiene diez secuencias de dos partidos, con giro documentado de orientación del segundo partido, tiempos originales y huecos conservados. En nueve jugadores medibles por ventana, el bloque retrocede en promedio 14,58 y 15,53 m: observación que evita equiparar acompañamiento exclusivamente con avanzar. No se usa para ajustar parámetros ni afirmar patrones generales. El contraste defensivo anterior se reproduce sin cambios en sus resultados; sigue limitado a Game 1.

Verificación 0.21: cruces completos y primera línea atravesada, ambos equipos, anchura/altura de gol, excepciones de gol directo, segundo toque, distancias, continuidad y reanudación guiada. Tres partidas libres de 90 s: 67/66/74 pases, 6/6/6 tiros y marcadores 0–1, 1–1, 0–0, sin posiciones inválidas. Informe data/runtime-regression-v021.json. Los ejecutores pueden ocupar las líneas del campo durante banda/esquina; las pruebas ya no confunden esas posiciones reglamentarias con errores.

- **0.20 — Continuidad de presión y cobertura.** La asignación estima llegada por distancia/velocidad y mantiene al defensor actual salvo ventaja clara de otro: coste nuevo < coste actual × 0,8 − 0,15. La cobertura considera un destino hacia portería propia y penaliza el lado incorrecto. Son reglas provisionales, no intenciones observadas ni tiempos medidos. Los roles son distintos, excluyen al portero y conservan la demora de reacción. Se renuevan tras cambio de posesión y se restauran al repetir decisiones. El panel muestra los jugadores asignados.

Contraste frente a 0.19 en cuatro ventanas de cinco segundos: error medio 5,67 → 5,48 m; 6,39 → 6,35 m; 8,40 → 8,73 m; 4,97 → 4,97 m. La tercera empeora un 4,0 % y la cuarta queda prácticamente igual: no se afirma una mejora general de precisión. Cambios de presionante totales 6 → 4 y de cobertura 14 → 5; menos cambios tampoco demuestra mejor táctica. La cuarta ventana, 300,76–305,76 s, se añade después de fijar la regla. Todas pertenecen al mismo partido y la referencia inmóvil sigue teniendo menor error en tres de cuatro. Informes: data/defense-baseline-v019.json y data/defense-validation.json.

Verificación 0.20: continuidad, referencia espacial, asignación estable y relevo, exclusión del portero, repetición, simetría, superposición y tracking. Tres simulaciones libres de 90 s con semillas 73/101/211: 69/77/68 pases, 8/4/8 tiros, sin posiciones inválidas; data/runtime-regression-v020.json. No se modifican velocidades ni errores técnicos y todavía no hay aprendizaje.

- **0.19 — Reorganización desde el estado de la pérdida.** Se corrige una referencia espacial incorrecta: el bloque usaba la formación inicial más un desplazamiento del balón respecto al centro, lo que podía generar desplazamientos al iniciar la defensa aunque el balón aún no hubiera avanzado. Ahora conserva una referencia de posiciones y balón al comenzar a defender y responde al desplazamiento posterior. Se renueva al cambiar la posesión, se conserva al pausar/cambiar de modo y se restaura al comparar decisiones. La presión guiada utiliza también el desplazamiento desde el inicio de la decisión, no desde el centro. Se mantienen velocidades, presión/cobertura, marcaje y demora de reacción; no se ajustan coeficientes a las trayectorias.

Contraste controlado frente a 0.18: error medio azul 10,87 → 5,67 m (−47,8 %); rojo 8,52 → 6,39 m (−24,9 %). Con la corrección ya fijada se incorpora una tercera secuencia no usada para elegirla, 215,40–220,40 s: 8,73 → 8,40 m (−3,8 %). Sigue superando el error de la referencia inmóvil en dos de las tres ventanas: la corrección no valida aún el realismo general. Las tres ventanas son del mismo partido. data/defense-baseline-v018.json conserva el resultado del motor anterior, ejecutado desde su fuente 0.18; data/defense-validation.json contiene el nuevo y las diferencias. Reproducción alternativa: FASE_ENGINE_SOURCE=<fuente_0.18> FASE_DEFENSE_OUT=<destino> node scripts/evaluate_defense.cjs.

Verificación 0.19: pruebas de referencia espacial, renovación tras pérdida, restauración, simetría, superposición, tracking y continuidad; tres partidas libres de 90 s con semillas 73/101/211 producen 73/78/83 pases y 1/5/4 tiros sin posiciones inválidas. Informe data/runtime-regression-v019.json. No es una validación estadística de frecuencia de acciones.

- **0.18 — Contraste defensivo controlado.** Reproducción del motor con los diez defensores de campo libres y el balón, atacantes y portero prescritos por el tracking. Mismas posiciones iniciales, paso máximo 1/120 s, interpolación únicamente entre muestras completas; sin ajustar parámetros. Superposición amarilla activable y error de posición visible en las dos referencias de transición. Resultado temporal: azul 10,87 m frente a 3,91 m manteniendo las posiciones iniciales; rojo 8,52 frente a 8,03 m. El motor no supera esta referencia simple en ninguna de las dos ventanas. Son discrepancias de trayectoria, no una nota táctica; no justifican inmovilizar jugadores ni afirmar que todas las defensas son incorrectas. Roles y velocidades no están medidos y la muestra procede de un solo partido. Informe: data/defense-validation.json; reproducir con node scripts/evaluate_defense.cjs. Tests: node tests/defense_replay.cjs. Se mantiene la dinámica de juego 0.16; las versiones 0.17 y 0.18 añaden observación y contraste.

La selección de las dos secuencias originales del banco de pruebas ofensivo ahora se hace por identificadores explícitos: las referencias defensivas nuevas no entran accidentalmente en su ajuste.

- **0.17 — Observación de la transición defensiva.** Dos nuevas ventanas de cinco segundos desde RECOVERY rival en Metrica Sample Game 1 (288,12 y 374,16 s), con los 22 jugadores y balón presentes en todos los fotogramas seleccionados. Botones 0/+2/+5 s; medidas compartidas con el motor: distancia del más próximo al balón, candidatos geométricos a cobertura, jugadores hacia portería propia respecto al balón y profundidad sin porteros. Registro automático de la última pérdida simulada en esos tres instantes; pausa conserva el registro, comparar/reiniciar lo limpia y una nueva pérdida lo sustituye. Informe reproducible: data/defense-observations.json, generado con node tests/defense.cjs. Una cobertura candidata no demuestra eficacia. La versión incorpora observación y contraste descriptivo; no ajusta las reglas defensivas ni entrena jugadores.

En los ejemplos observados, la profundidad azul pasa de 35,4 a 29,8 m y la roja de 34,3 a 43,3 m. Estas respuestas diferentes no constituyen objetivos numéricos para el motor. La muestra continúa siendo de un único partido.

- **0.14 — Medición y acompañamiento.** Panel para medir avance del balón, avance medio del bloque, jugadores sin intervención que avanzan al menos 2 m y candidatos geométricos a apoyo. Cierre tras pérdida; comparar o reiniciar limpia la medición. Primer ajuste longitudinal de 0,65 a 0,35, seleccionado con dos secuencias de Metrica y evaluado posteriormente con otra secuencia reservada. Error de posición: −2,0 % en ajuste y −17,6 % en contraste, bajo balón y oposición prescritos. Roles aproximados y una muestra de un solo partido: no equivale a validar el fútbol libre completo. Informes reproducibles en data/movement-validation.json y data/free-movement-check.json; corresponden al motor 0.14.
- **0.15 — Presión, cobertura y reorganización.** Corrección del lado de la segunda cobertura para ambos equipos; presión cercana, cobertura a mayor profundidad y recuperación del resto del bloque hacia portería propia. Conserva demoras individuales y las decisiones explícitas de presionar, temporizar y replegar. Pruebas de orientación para ambos equipos y continuidad del estado.
- **0.16 — Errores de pase contextuales.** Desviación continua según distancia, proximidad rival y precisión individual provisional; la recepción y oposición determinan la consecuencia. Semilla reproducible en modo guiado y panel del último pase. Se comprueba mayor dispersión con presión/distancia y repetición exacta de una misma decisión. No incluye todavía aprendizaje, fatiga, percepción o errores de todas las técnicas. La regresión detectó una recuperación defensiva demasiado rígida: se sustituyó la alineación obligatoria detrás del balón por una aproximación parcial desde las posiciones de referencia. Prueba de funcionamiento final: tres semillas, 90 segundos cada una, 75/83/82 pases y 3/4/3 tiros, sin posiciones inválidas. Informe en data/runtime-regression-v016.json; no constituye validación del realismo.

Las medidas de apoyo son geométricas, no sustituyen la interpretación de los espacios de fase. Los contornos relacionales amplios y la continuidad entre simulación libre y decisiones se mantienen.

**Siguiente etapa:** fuera de juego con participación activa y sus excepciones; después faltas, ventaja, tarjetas y penaltis. En paralelo, contrastar velocidades contextuales y transiciones prolongadas en más partidos, usando la segunda muestra ya incorporada sin optimizar solo para ella. Completar tiempos reglamentarios, portero con manos y los procedimientos 2026/27 antes de afirmar cobertura reglamentaria completa. La referencia espacial de la pérdida y la continuidad de asignaciones ya están implementadas, pero su realismo general sigue pendiente de validar. Calibrar errores de ejecución antes de atribuirles tasas reales. El modo entrenamiento continúa en la hoja de ruta: guardar situaciones, practicar objetivos concretos y evaluar transferencia sin perfección automática.

---

# MANAGER-FASE — Hoja de ruta
Actualizada: 14 de octubre de 2026. Base de esta actualización: 0.13.

## Prioridad y alcance
Requisitos del usuario para las siguientes etapas. Esta hoja de ruta no implica que las funciones estén implementadas.
Completar los procesos actuales del modelo de espacios de fase antes de desarrollar el modo entrenamiento. Mantener al usuario como responsable de las decisiones tácticas.
La simulación debe ejecutar esas decisiones con comportamientos plausibles y resultados inciertos, no buscar un juego perfecto.

## Incidencias observadas por el usuario
- Algunos patrones de movimiento no resultan habituales del fútbol.
- En simulación libre algunos compañeros no acompañan.
- Al progresar desde mediocampo hacia la portería rival, el poseedor pierde opciones y termina volviendo atrás reiteradamente.
Las versiones 0.9–0.11 introdujeron progresión contextual, apoyos reactivos y espacios variables. Su realismo todavía debe contrastarse con tracking.
Un pase atrás puede ser una decisión válida. El objetivo es evitar que sea una obligación sistemática causada por el motor.
Que todos los jugadores se muevan no demuestra por sí solo que exista coordinación táctica.

## 1. Dinámicas de partidos reales con tracking
Objetivo solicitado: usar movimientos ya registrados en partidos reales para incorporar dinámicas parecidas.
Fuentes de referencia:
- Metrica Sports: https://github.com/metrica-sports/sample-data
  Ofrece tracking y eventos sincronizados; partidos de muestra anonimizados.
- SkillCorner: https://github.com/SkillCorner/opendata
  Ofrece diez partidos de tracking de retransmisiones y eventos dinámicos.
  Distingue posiciones detectadas de extrapoladas mediante is_detected.

Avance completado en 0.12:
- Cambio de simulación libre a decisiones sin reiniciar posiciones, reloj, marcador ni estadísticas. El retorno a libre también conserva el partido.
- Si el balón está en vuelo o suelto, se conserva ese estado; el usuario reanuda hasta un control antes de elegir la siguiente acción.
- Primera muestra Metrica importada: Sample Game 1, periodo 1, fotogramas 1–501 (0,04–20,04 s), 101 instantes de visualización a 5 Hz.
- Importador reproducible en scripts/import_metrica.py. Coordenadas fuente 0–1 en campo de 105 × 68 m transformadas a 100 × 64 unidades. Se conservan tiempo, periodo, fotograma e identidad.
- Comprobación de sincronía entre equipos, coordenadas no finitas o fuera del campo y saltos de velocidad >14 m/s (umbral provisional de calidad). No se rellenan datos ausentes. El roster original incluye suplentes sin posición: esos huecos no se equiparan a fallos del tracking.
- Orientación del fragmento inferida a partir de los porteros: Home #11 a la izquierda y Away #25 a la derecha. No generalizar a otros periodos.
- Visor independiente con reproducción, selección de instante y anchura/profundidad de ambos equipos, incluidos porteros. No altera las posiciones ni los parámetros del motor.
- Atribución visible a Metrica Sports. README revisado el 13-10-2026: solicita reconocimiento de la fuente para uso público; no se ha identificado una licencia estándar en ese README ni se ha asumido una autorización comercial general.
- Fuentes: https://github.com/metrica-sports/sample-data y los dos CSV Home/Away de data/Sample_Game_1. Metadatos y enlaces guardados en data/metrica-sample.json.
- Muestra de 20 s = prueba del proceso de importación y observación; no demuestra patrones típicos ni permite calibrar errores o aprendizaje.

Avance completado en 0.13 (14 de octubre de 2026):
- Importados diez minutos del primer periodo de Sample Game 1 y sus eventos. Seleccionadas cuatro secuencias identificables por tiempo, fotograma y equipo:
  - Progresión Away 30,52–40,40 s: cuatro pases, +10,5 m entre el origen del primero y el destino del último.
  - Progresión Home 45,36–50,64 s: tres pases, +25,2 m.
  - Circulación y pérdida Away 0,04–15,20 s: seis pases y pérdida/recuperación anotadas; avance de la cadena de pases −4,2 m (no incluye la trayectoria posterior de la pérdida).
  - Progresión Away 463,44–476,72 s: seis pases, +48,3 m; reservada para contraste posterior.
- Visor con selector de secuencia, salto al inicio de cada evento, tiempos originales y trazas de los jugadores sin intervención anotada.
- Medidos avance medio del bloque, desplazamiento individual y número de jugadores sin intervención anotada que avanzan al menos 2 m. La ausencia de un evento From/To no garantiza ausencia de todos los contactos.
- Candidatos geométricos a apoyo calculados en el fotograma exacto de inicio de cada pase. Umbrales descriptivos: 3–30 m, sin rival a menos de 2 m de la parte interior del segmento. No son probabilidades de éxito ni una identificación completa del espacio de ayuda mutua.
- Conservados los huecos y las identidades; excluidas estimaciones de líneas de apoyo si falta algún rival. Eventos y posiciones del pasador se contrastan en tests: discrepancia <1 m en los pases seleccionados.
- Implementación reproducible: scripts/analyze_sequences.py; resultados: data/metrica-analysis.json; pruebas: tests/tracking.py y tests/continuity.cjs.
- No hay aprendizaje automático ni ajuste de parámetros del motor en esta versión. Se trata de ejemplos seleccionados, no de una muestra representativa ni de validación independiente por partido.

Etapa iniciada en 0.14 (ampliar validación): instrumentar el motor con medidas comparables de apoyo y acompañamiento, evaluar discrepancias sobre escenarios equivalentes y ajustar una primera regla de movimiento. Contrastar el cambio con secuencias no usadas para el ajuste y mantener errores y decisiones del usuario. Ampliar después el análisis a más partidos, rupturas, remates y reorganizaciones.

Trabajo completo de referencia (puntos 1–5 iniciados; ampliar muestras e interpretación antes de calibración):
1. Verificar condiciones de uso y atribución para la integración prevista.
2. Importar una muestra, normalizar dimensiones, orientación de ataque, coordenadas y tiempo.
3. Filtrar errores de identidad, saltos y datos extrapolados de baja confianza. No tratar estimaciones como observaciones exactas.
4. Extraer secuencias de progresión, apoyos, rupturas, ocupación del área, circulación, pérdidas y reorganización.
5. Medir distancias relativas, dirección y momento de los apoyos, anchura, profundidad, opciones disponibles y reacción al desplazamiento del balón.
6. Interpretar esas secuencias con el marco del usuario: criterios conformadores, interacción/apoyo mutuo/cooperación, ventajas, conductas y ciclo del juego.
7. Calibrar reglas o modelos de movimiento y probar situaciones no utilizadas para el ajuste.

No copiar trayectorias de forma rígida: la jugada debe responder a la decisión del usuario y a la oposición.
No equiparar automáticamente las etiquetas de fases del proveedor con los espacios de fase del proyecto.
Las coordenadas por sí solas no permiten inferir con certeza intención, perfilación corporal, ocho áreas de individualidad o resonancia empática.
Los ejemplos profesionales no deben convertirse automáticamente en el nivel perfecto ni en el único estilo posible.

## 2. Errores plausibles
Requisito: los futbolistas deben cometer errores ocasionalmente.
Propuesta: errores contextuales de ejecución, percepción y sincronización, asociados a dificultad, presión, capacidades y, cuando estén modeladas, fatiga y compenetración.
Separar variabilidad individual de fallos del programa: inmovilidad, bloqueos, falta estructural de apoyos y resultados predeterminados no son errores humanos aceptables.
Mantener semillas reproducibles para comparar decisiones bajo condiciones equivalentes.
No fijar todavía porcentajes de error sin calibración y validación.

## 3. Futuro modo entrenamiento
Objetivo solicitado: entrenar las situaciones que necesitan mejorar para que los futbolistas virtuales aprendan y mejoren.
Flujo propuesto:
1. Marcar y guardar una situación del partido con su estado completo y versión del motor.
2. Seleccionar el problema y el objetivo de entrenamiento.
3. Repetir con variantes de posiciones, rivales, presión, espacio y tiempo.
4. Guardar cambios específicos por jugador y grupo, con límites y diferencias individuales.
5. Evaluar retención y transferencia a situaciones nuevas de partido.

Ejemplo de tarea: acompañar la progresión desde mediocampo mediante apoyos a diferentes alturas, manteniendo amplitud y opciones de profundidad.
Evaluar disponibilidad y oportunidad de los apoyos, progresión, pérdidas y equilibrio tras pérdida; no solo goles o posesión.
El entrenamiento no debe producir perfección automática ni una bonificación general desconectada de lo practicado.
Decisión técnica pendiente: progresión mediante parámetros adaptativos o aprendizaje automático. La versión 0.16 no aprende de la práctica; ambas alternativas deben explicarse con precisión.

## Criterios de aceptación futuros
- Las dinámicas se contrastan con secuencias reales identificables.
- En simulación libre y guiada existen opciones coherentes al progresar, condicionadas por el rival.
- Los jugadores pueden conservar una posición útil; no se premia moverse por moverse.
- Se mantiene incertidumbre y posibilidad de error sin bloqueos del motor.
- Las mejoras entrenadas persisten y se evalúan frente a una línea base y en situaciones no ensayadas.
- Se preservan el diseño, los controles y la capacidad de comparar decisiones.


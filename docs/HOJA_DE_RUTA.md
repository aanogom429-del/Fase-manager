# Actualizaciones completadas · 14 de octubre de 2026

- **0.14 — Medición y acompañamiento.** Panel para medir avance del balón, avance medio del bloque, jugadores sin intervención que avanzan al menos 2 m y candidatos geométricos a apoyo. Cierre tras pérdida; comparar o reiniciar limpia la medición. Primer ajuste longitudinal de 0,65 a 0,35, seleccionado con dos secuencias de Metrica y evaluado posteriormente con otra secuencia reservada. Error de posición: −2,0 % en ajuste y −17,6 % en contraste, bajo balón y oposición prescritos. Roles aproximados y una muestra de un solo partido: no equivale a validar el fútbol libre completo. Informes reproducibles en data/movement-validation.json y data/free-movement-check.json; corresponden al motor 0.14.
- **0.15 — Presión, cobertura y reorganización.** Corrección del lado de la segunda cobertura para ambos equipos; presión cercana, cobertura a mayor profundidad y recuperación del resto del bloque hacia portería propia. Conserva demoras individuales y las decisiones explícitas de presionar, temporizar y replegar. Pruebas de orientación para ambos equipos y continuidad del estado.
- **0.16 — Errores de pase contextuales.** Desviación continua según distancia, proximidad rival y precisión individual provisional; la recepción y oposición determinan la consecuencia. Semilla reproducible en modo guiado y panel del último pase. Se comprueba mayor dispersión con presión/distancia y repetición exacta de una misma decisión. No incluye todavía aprendizaje, fatiga, percepción o errores de todas las técnicas. La regresión detectó una recuperación defensiva demasiado rígida: se sustituyó la alineación obligatoria detrás del balón por una aproximación parcial desde las posiciones de referencia. Prueba de funcionamiento final: tres semillas, 90 segundos cada una, 75/83/82 pases y 3/4/3 tiros, sin posiciones inválidas. Informe en data/runtime-regression-v016.json; no constituye validación del realismo.

Las medidas de apoyo son geométricas, no sustituyen la interpretación de los espacios de fase. Los contornos relacionales amplios y la continuidad entre simulación libre y decisiones se mantienen.

**Siguiente etapa:** ampliar el contraste a más secuencias y partidos, evaluar la reorganización defensiva con datos observados y calibrar errores de ejecución antes de atribuirles tasas reales. El modo entrenamiento continúa en la hoja de ruta: guardar situaciones, practicar objetivos concretos y evaluar transferencia sin perfección automática.

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


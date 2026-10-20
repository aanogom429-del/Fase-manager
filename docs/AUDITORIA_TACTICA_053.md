# Auditoría táctica y funcional de Fase Manager 0.53

Fecha: 20-10-2026. Referencia auditada: `main@d440066319ad18c5ebbe6cbd0ebe0e7bdc62488b`. Comparador: `tests/fixtures/engine-v052.html`, motor 0.52. Diagnóstico exclusivamente documental: no se modifica el motor, las pruebas ni el evaluador versionado y no se implementa 0.54.

## Dictamen

**Recomiendo revisar y corregir de forma acotada la 0.53 y su protocolo de evaluación antes de pasar al siguiente bloque.** No recomiendo revertir toda la protección ni ajustar umbrales solo para evitar este gol. Hay utilidad geométrica y algunas intercepciones adicionales, pero no evidencia suficiente de mejora táctica general. La etiqueta de una intención, el número de pruebas superadas y el marcador final son insuficientes como criterios de cierre.

El caso adverso se reproduce: equipo defensor 1, pase, semilla 101, 0→1 goles concedidos. La cadena no es simplemente «menos presión → gol»: primero se conserva una línea de tiro; posteriormente la geometría produce **más proximidad al receptor**, cambia su elección de conducción a pase y se prolonga el ataque. Concurre una segunda protección antes de otro pase. El gol depende de la secuencia completa, la selección ofensiva, la intercepción fallida y el portero.

Existe además un **defecto demostrado del montaje del ensayo**: la posición de referencia longitudinal del portero no se actualiza al recolocarlo. Corregir solo esa condición inicial en una copia de ensayo no elimina el caso adverso. Esto invalida interpretar el ensayo original como un portero simplemente descentrado, pero no permite descartar la diferencia entre versiones.

## 1. Alcance y protocolo

Se leyeron `PROJECT_CONTEXT.md`, `ROADMAP.md`, `DEVELOPMENT_LOG.md`, `docs/PROTECCION_FINALIZACION_053.md`, las funciones de decisión/movimiento/contacto y el evaluador original. Se comprobó que `main` coincidía con el commit solicitado.

La observación se ejecutó con Node y el entorno simulado de `tests/continuity.cjs`. Instrumentación temporal fuera del repositorio: envoltorios de eventos, inspector pasivo y métricas de lectura; conserva los resultados devueltos por las funciones, sin introducir decisiones ni llamadas adicionales al azar. Los envoltorios se añaden a la cadena cargada en memoria; ningún archivo del motor se edita. Se comprobó igualdad de pases, tiros, goles, pérdidas, primer desenlace, pasos protectores y jugadores desplazados con las ocho parejas originales de pase/libre y orientación inicial original.

**40 parejas distintas, 80 simulaciones de seis segundos**, a 1/120 s; además se repitieron casos concretos para trazar decisiones y acceso. No son 80 partidos independientes ni datos reales:

| Grupo | Parejas | Condiciones |
|---|---:|---|
| Orientaciones | 24 | Dos equipos × pase/libre × semillas 101/202 × orientación inicial del poseedor 0°, +90°, +180° respecto a la original |
| Referencia del portero | 8 | Mismos equipos, escenarios y semillas, orientación original; solo se igualan `hx/hy` del portero defensor a su posición inicial |
| Ayuda cercana | 8 | Dos equipos × pase/101 o libre/202 × ayuda inicialmente parada o saliendo a velocidad lateral 8; referencia del portero corregida |

En el último grupo se coloca al defensor #7 en (12;35,8), o su espejo, y se deja evolucionar libremente. La velocidad inicial de la ayuda que sale es (0;−8), o su espejo. No se mantiene un desplazamiento prescrito. Las orientaciones alteradas son iniciales: el motor gira después a los jugadores. El pase inicial sigue prescrito a 0,35 s; las decisiones posteriores son reactivas. No se alteran posiciones después de inicializar.

El resto del equipo del escenario original empieza lejos de la acción. Esto facilita aislar mecanismos, pero limita fuertemente la representatividad de las ayudas y del bloque defensivo. Se conserva esa limitación y se añade el grupo con ayuda, sin sustituir retrospectivamente los resultados originales.

## 2. Reconstrucción del caso adverso

Coordenadas del juego: 100×64, no metros calibrados. Equipo 0 azul ataca hacia x=100; equipo 1 rojo defiende esa portería. Jugadores relevantes: azul #6 (pasador inicial), azul #7 (receptor/rematador), rojo #6 (primer defensor), rojo #1 (portero).

### Estado inicial y relaciones

- Azul #6: (80;24), orientado hacia +x. Azul #7: (77;36).
- Rojo #6: (93;29,5), orientado hacia −x. Portero rojo: (96;16).
- Las ayudas de campo comienzan lejos: por ejemplo rojo #7 en (31;24). No hay relevo cercano que libere al primer defensor de proteger y presionar a la vez.
- El pase inicial es hacia atrás y lateral, fuera del corredor que ocupa el defensor. Ya era una línea disponible en 0.52: no se demuestra que 0.53 la abra de nuevo.

| Tiempo | 0.52 | 0.53 | Interpretación comprobada |
|---|---|---|---|
| 0,008 s | Rojo #6 guarda destino (85;24), «Temporizar ante inferioridad percibida» | Guarda (92,455;30,539), «Proteger línea de tiro» | La primera sustitución afecta a una temporización que aproxima al balón; no a una presión inmediata |
| 0,350 s | Defensor en (91,89;28,74) | Defensor en (92,51;30,44) | Mismo pase azul #6→#7 desde (81,20;24,60), destino ejecutado (76,56;34,87) |
| 0,567 s | Azul #7 recibe en (76,83;33,25); defensor (90,27;27,99) | Misma recepción; defensor (92,00;30,44) | Ya existe una diferencia de trayectoria aunque las decisiones siguientes pueden coincidir |
| 1,000 s | Llegada estimada al radio de contacto: 1,218 s | 1,332 s | Se retrasa inicialmente el acceso; no demuestra todavía una ocasión convertida |
| 1,825 s | Azul #7 continúa conduciendo; rival a 4,047 unidades | Azul #7 pasa a #6; rival a 3,797 | La proximidad percibida cruza el umbral `pressure > 4` que permite conducir |
| 2,350 s | Rojo #6 recupera mediante entrada legal | El balón sigue la secuencia del pase; no hay esa recuperación | Las trayectorias posteriores dejan de ser comparables como una única jugada idéntica |
| 2,533 s | Rojo conserva tras recuperar | Azul #6 controla balón suelto en (78,51;29,56) | En 0.53 se prolonga la posesión atacante |
| 2,942 s | Otra fase de posesión | Rojo #6 almacena otra protección hacia (83,202;30,721) | Segunda decisión protectora, antes de otro pase |
| 3,058–3,208 s | Rojo ya había enviado un pase largo a 2,792 s | Azul #6 pasa a #7; este recibe en (75,58;35,99) | La intención protectora sigue almacenada hasta 3,302 s; durante parte del pase aún se ejecuta |
| 3,583 s | No se produce el tiro equivalente | Azul #7 tira desde (75,581;35,988) hacia (102;30,612) | Rojo #6 en (82,781;31,582), con intención de temporizar; portero (76,14;20,73) |
| 4,100 s | Sin gol concedido | Cruce de meta y gol azul | No se produce interceptación ni parada |

### Punto de bifurcación ofensiva y azar

Se registraron las llamadas al azar sin añadir ninguna. A 1,825 s ambos motores han consumido seis llamadas; las dos siguientes valen **0,8784661903 y 0,1714847491** en ambos. La distancia percibida `pressure` es respectivamente 4,046963 y 3,797452. El actor y su posición coinciden. En 0.52 se ejecuta conducción; en 0.53, pase. El segundo valor participa en la puntuación del pase; no es un sorteo directo «pasar/no pasar».

Por tanto, esta bifurcación concreta no procede de semillas distintas: la geometría/percepción cambia la rama elegida. A partir del pase, 0.53 consume otras dos llamadas para su dispersión y las secuencias de azar divergen. No es válido atribuir todos los acontecimientos posteriores exclusivamente a una menor distancia o al primer destino protector.

### Tiro, intercepción y portero

En 0.53, a 3,700 s el balón está en (81,46;34,79) y el defensor en (82,39;32,41). A 3,750 s el balón ya está en (83,81;34,31), mientras el defensor está en (82,30;32,76). El registro de contactos no contiene interceptación: estar inicialmente entre poseedor y meta no garantiza alcanzar el trayecto del remate a tiempo. La intención protectora previa no se convierte en un bloqueo.

El ensayo asigna inicialmente `hx=31` al portero rojo y después lo mueve a x=96 sin actualizar ese anclaje. `movement` usa `tx=p.hx`, por lo que abandona la meta: x=94,91 a 0,35 s, 83,43 a 2,35 s en 0.52; x=76,14 en el tiro de 0.53. El mismo defecto existe reflejado para el otro equipo. Es un error del escenario de evaluación, no una nueva instrucción del motor 0.53.

En el control con `hx=96`, el caso sigue en **0→1**: en el tiro el portero está en (96;32,02), sube siguiendo el balón y termina en (96;33,88) cuando se concede el gol. Su política persigue la coordenada lateral del balón, no una intercepción anticipada de la trayectoria de tiro. Esto muestra otra limitación del portero ya existente. No demuestra que cualquier portero más completo detuviera ese tiro.

Con ayuda cercana, tanto parada como inicialmente saliendo del corredor, ese mismo escenario pase/101 termina **0→0**. Cambiar la ayuda cambia toda la dinámica: no permite atribuir causalmente el resultado solo a un relevo puntual.

## 3. Métricas añadidas y significado

Las métricas son instrumentos de auditoría; no se han incorporado al juego ni se presentan como xG o criterios científicos validados. El observador usa el estado real para describir la situación; esa información no se entrega al futbolista.

| Métrica | Definición operacional |
|---|---|
| Tiros concedidos | Eventos `kickTo(...,'shot')` del equipo atacante original durante los seis segundos |
| Acceso defensivo | Mínimo `arrivalTime(defensor,poseedor,1.65)` de los jugadores de campo; media ponderada por tiempo con posesión atacante |
| Zona peligrosa | Poseedor controlando, a ≤25 longitudinales de meta y ≤17 laterales del centro, sin reanudación |
| Exposición de portería | Fracción libre de siete rayos hacia y=29…35, sin defensor a <1,65 unidades en el interior 8–95 %; con y sin portero |
| Tiempo de exposición | Integral de esa fracción durante posesión en zona peligrosa, en segundos equivalentes; no duración de siete tiros posibles |
| Ventana de ocasión potencial | Zona peligrosa, preparación angular estimada ≤0,8 s, acceso mínimo mayor que dicha preparación y al menos 3/7 rayos libres incluyendo portero |
| Episodios potenciales | Entradas en la condición anterior a muestreo 20 Hz, sin histéresis; sensibles a oscilaciones, no «ocasiones claras» independientes |
| Opciones de pase | Compañeros a 3–30 unidades con segmento interior sin rival a <2; no incluye fuera de juego ni recepción garantizada |
| Intercepciones | Capturas efectivas del equipo defensor original durante vuelo rival, incluyendo tiros y portero; se separan paradas y entradas |
| Cobertura doble | Fracción de rayos con ≥2 defensores de campo; describe redundancia geométrica, no calidad de coordinación |
| Protección aplicada | Pasos-jugador a 120 Hz con intención protectora almacenada realmente aplicada; no bloqueos |

Muestreo espacial a 20 Hz (0,05 s); eventos/contactos y comprobación de acceso en protección a 120 Hz. El radio 1,65 coincide con contacto de vuelo rival, no con el umbral 2,8 de tentativa de entrada. `arrivalTime` supone un objetivo instantáneo: no es prueba de alcance a un poseedor que seguirá moviéndose. La preparación del predictor es heurística y no un retraso que `kickTo` exija al atacante. La exposición es geométrica, sin giro, velocidad, visibilidad, altura ni rebotes: por eso se informa junto a acceso y eventos reales.

## 4. Resultados ampliados

| Medida (0.52 → 0.53) | 24 parejas de orientación | 8 con anclaje del portero corregido | 8 con ayuda cercana |
|---|---:|---:|---:|
| Goles concedidos | 10.00 → 6.00 | 3.00 → 2.00 | 0.00 → 0.00 |
| Tiros concedidos | 19.00 → 26.00 | 7.00 → 11.00 | 4.00 → 5.00 |
| Intercepciones (incluye paradas) | 4.00 → 14.00 | 2.00 → 7.00 | 6.00 → 7.00 |
| Paradas de tiro del portero | 0.00 → 0.00 | 1.00 → 0.00 | 0.00 → 0.00 |
| Recuperaciones por entrada | 6.00 → 2.00 | 2.00 → 0.00 | 2.00 → 2.00 |
| Tiempo en zona peligrosa (s) | 22.40 → 28.10 | 7.80 → 11.15 | 10.60 → 11.70 |
| Ventanas de ocasión potencial (s) | 9.00 → 15.50 | 3.00 → 5.95 | 4.00 → 3.75 |
| Episodios potenciales | 12.00 → 39.00 | 4.00 → 17.00 | 8.00 → 13.00 |
| Exposición con portero (s equivalentes) | 14.30 → 16.88 | 5.06 → 4.81 | 6.99 → 5.69 |
| Cobertura doble (s equivalentes) | 0.00 → 0.00 | 0.00 → 0.00 | 2.03 → 2.03 |
| Opciones de pase × tiempo (opción·s) | 20.70 → 26.50 | 7.10 → 11.10 | 7.40 → 8.50 |
| Acceso mínimo medio durante posesión atacante (s) | 1.079 → 1.170 | 1.066 → 1.154 | 0.734 → 0.728 |

Los totales cubren ventanas de igual duración, pero las posesiones y su duración cambian entre versiones. No son comparaciones de exactamente los mismos estados. En orientación, la fracción media de meta expuesta dentro de la zona peligrosa baja de 63,8 % a 60,1 %, mientras el tiempo acumulado expuesto aumenta de 14,30 a 16,88 s equivalentes porque el ataque permanece más tiempo en esa zona. Menor exposición instantánea no equivale a menor peligro acumulado. Con ayuda, el tiempo de ocasión potencial baja de 4,00 a 3,75 s y hay un tiro adicional, sin goles en ninguna versión.

En las 24 parejas de orientación: **6 mejoran, 16 empatan y 2 empeoran en goles**. Las dos adversas son el mismo escenario pase/101/equipo 1 con orientación 0° y 90°; no son dos contextos independientes. Con referencia del portero corregida: 2/5/1; con ayuda: 0/8/0. No agregar estos grupos como una tasa representativa de éxito.

### Detalle de sensibilidad a la orientación inicial

| Defensor | Escenario | Semilla | Giro inicial | Goles 0.52→0.53 | Tiros 0.52→0.53 | Ventanas potenciales (s), 0.52→0.53 |
|---|---|---:|---:|---:|---:|---:|
| 0 | pass | 101 | 0° | 0→0 | 0→1 | 1.15→2.15 |
| 0 | pass | 101 | 90° | 0→0 | 0→1 | 1.15→2.15 |
| 0 | pass | 101 | 180° | 0→0 | 0→0 | 1.15→1.15 |
| 0 | pass | 202 | 0° | 1→0 | 1→1 | 0.35→0.40 |
| 0 | pass | 202 | 90° | 1→0 | 1→2 | 0.35→0.70 |
| 0 | pass | 202 | 180° | 1→1 | 1→1 | 0.35→0.35 |
| 0 | free | 101 | 0° | 0→0 | 1→1 | 0.00→0.10 |
| 0 | free | 101 | 90° | 0→0 | 1→1 | 0.00→0.50 |
| 0 | free | 101 | 180° | 0→0 | 1→2 | 0.00→0.00 |
| 0 | free | 202 | 0° | 1→0 | 1→2 | 0.00→1.15 |
| 0 | free | 202 | 90° | 1→0 | 1→1 | 0.00→0.15 |
| 0 | free | 202 | 180° | 1→0 | 1→1 | 0.00→0.00 |
| 1 | pass | 101 | 0° | 0→1 | 0→1 | 1.15→1.95 |
| 1 | pass | 101 | 90° | 0→1 | 0→1 | 1.15→1.95 |
| 1 | pass | 101 | 180° | 0→0 | 0→0 | 1.15→1.15 |
| 1 | pass | 202 | 0° | 1→1 | 1→1 | 0.35→0.40 |
| 1 | pass | 202 | 90° | 1→1 | 1→1 | 0.35→0.40 |
| 1 | pass | 202 | 180° | 1→1 | 1→1 | 0.35→0.35 |
| 1 | free | 101 | 0° | 0→0 | 1→2 | 0.00→0.10 |
| 1 | free | 101 | 90° | 0→0 | 1→1 | 0.00→0.10 |
| 1 | free | 101 | 180° | 0→0 | 1→1 | 0.00→0.00 |
| 1 | free | 202 | 0° | 1→0 | 2→1 | 0.00→0.15 |
| 1 | free | 202 | 90° | 0→0 | 1→1 | 0.00→0.15 |
| 1 | free | 202 | 180° | 0→0 | 1→1 | 0.00→0.00 |

### Métricas del caso adverso original

| Medida | 0.52 | 0.53 |
|---|---:|---:|
| Goles concedidos | 0.00 | 1.00 |
| Tiros concedidos | 0.00 | 1.00 |
| Intercepciones (incluye paradas) | 0.00 | 0.00 |
| Paradas de tiro del portero | 0.00 | 0.00 |
| Recuperaciones por entrada | 1.00 | 0.00 |
| Tiempo en zona peligrosa (s) | 2.10 | 2.50 |
| Ventanas de ocasión potencial (s) | 1.15 | 1.95 |
| Episodios potenciales | 1.00 | 4.00 |
| Exposición con portero (s equivalentes) | 1.80 | 1.81 |
| Cobertura doble (s equivalentes) | 0.00 | 0.00 |
| Opciones de pase × tiempo (opción·s) | 1.85 | 2.50 |

## 5. ¿Se renuncia a una intervención realmente posible?

En el caso adverso, la primera lectura protectora ocurre con un acceso estimado cercano a dos segundos y preparación del tiro próxima a 0,25 s: proteger un corredor frente a un tiro inmediato es una alternativa tácticamente defendible. El ensayo fuerza un pase posterior; no sería correcto exigir que el defensor conozca esa instrucción futura.

En las 24 parejas se contabilizan 1.086 pasos-jugador protectores. **Ninguno coincide con llegada estimada al radio 1,65 anterior a la preparación heurística del tiro.** Siete pasos sí presentan llegada ≤0,35 s: equipo 0, libre/101, giro inicial 180°, entre 4,367 y 4,417 s. La intención procede de 4,058 s y caduca a 4,418 s. El acceso baja de 0,339 a 0,267 s, pero la preparación estimada es 0,217 s y la distancia todavía es 3,31–3,18 unidades. Es persistencia de una lectura anterior, no prueba de renunciar a una entrada segura o de recalcular una decisión errónea siete veces.

A 20 Hz aparecen tres muestras de **temporización** de 0.53 con distancia real <2,8 y `cool=0`: equipo 0, libre/101, giro 90°, 4,05–4,15 s; distancias 2,42–2,70. En ese estado existe posibilidad de tentativa de entrada. Sin embargo, `update` evalúa el contacto **antes de ejecutar el desplazamiento y con independencia de la etiqueta de destino**; la entrada es probabilística. No se demuestra que la temporización la desactive ni que entrar resulte mejor. No aparecieron muestras protectoras a esa distancia en este muestreo; esto no prueba ausencia entre muestras ni en otros escenarios.

Hay una incoherencia operacional comprobable: la nueva política estima preparación angular, mientras la acción ofensiva puede lanzar el tiro en el mismo paso en que lo decide, con visión angular de portería y sin imponer esa espera. Además, la exclusión protectora consulta llegada al centro (`radius=0`) y el observador mide acceso al radio de vuelo 1,65; la entrada usa 2,8 y otra resolución. **No hay una única definición consistente de “poder intervenir antes”.** Esto exige revisión, no una conclusión de que toda temporización es pasiva.

## 6. Utilidad táctica frente a cumplimiento de reglas programadas

| Observación | Valoración táctica | Qué no demuestra |
|---|---|---|
| Mantener inicialmente un corredor sin ayuda y sin acceso rápido | Coherente como respuesta local a un poseedor con posibilidad de tiro | Que ese corredor sea la mejor prioridad frente a todas las acciones |
| Ayuda visible estacionaria o saliendo cambia la lectura | Tiene sentido relacional y dinámico | Que la ayuda vaya a mantener su función; el predictor solo extrapola su velocidad |
| Aumento de intercepciones de 4 a 14 en las 24 parejas | Utilidad funcional observada dentro de la muestra | Que sean diez tiros bloqueados: incluye vuelos de pase y trayectorias que ya cambiaron |
| Menor porcentaje instantáneo de rayos libres | Mejor cobertura geométrica en esos instantes | Menor duración total del peligro, mejores ocasiones evitadas o mejor resultado general |
| Primer defensor conserva `defDuty='press'` mientras protege | La función asignada y la intención ejecutada pueden diferir | Que exista otro jugador asumiendo activamente presión; no hay relevo explícito por ese cambio |
| `score=30` y elección del primer rayo que satisface condiciones | Cumple el algoritmo y puede alterar la asignación de cobertura | Una comparación de utilidad entre tiro, pase, conducción y amenaza secundaria |
| Protección que persiste durante un pase | Puede representar demora perceptiva normal | Que siga siendo funcional para el receptor que será nuevo poseedor |
| Temporización con entrada físicamente cercana | Puede contener y a la vez permitir disputar | Que el futbolista rechace una entrada: la disputa se decide en otra capa |

La coherencia con los espacios de fase es **parcial**: orientación, accesibilidad y relaciones modifican la respuesta; faltan una ponderación conjunta de amenazas, relevo funcional y continuidad de la organización frente al cambio de poseedor. No basta con conservar una envolvente o una línea para demostrar coordinación colectiva.

### Efectos secundarios

- **Presión:** empeora inicialmente la llegada en el caso adverso, pero a 1,825 s la distancia es menor y provoca un pase. El efecto cambia a lo largo de la jugada.
- **Líneas de pase:** el primer pase ya era viable en ambas versiones. La nueva política no evalúa explícitamente el coste de habilitar otro pase al reemplazar el plan previo. Que aumente el tiempo con opciones de pase no demuestra por sí solo una línea concreta abierta por el desplazamiento.
- **Otras zonas:** el ensayo original no contiene un bloque próximo suficiente; la cobertura doble es cero en ambas versiones. No permite juzgar protección de segundo palo, equilibrio o defensa del área completa. Con ayuda cercana sí hay cobertura doble, pero idéntica integral (2,03 s equivalentes): tampoco acredita mejor coordinación global.
- **Ventajas del ataque:** más tiempo en zona peligrosa, más tiros y menos recuperaciones por entrada en el grupo de orientaciones, aunque menos goles. Son consecuencias observadas del conjunto de secuencias; no se atribuyen todas a la misma decisión.
- **Portería:** el portero es excluido como ayuda en el algoritmo protector. Su comportamiento puede dominar el resultado final; debe medirse por separado y con un escenario válido.

## 7. Clasificación de hallazgos

| Categoría | Hallazgo | Evidencia / alcance |
|---|---|---|
| Error demostrado del ensayo | Anclaje `hx` del portero incoherente con su colocación | Código de inicialización, destinos registrados y trayectoria hacia x=31/69 |
| Incoherencia demostrada del modelo | Tiempo de preparación supuesto por la protección no exigido por la ejecución del tiro | `protectFinishingLine`, `chooseAction`, `kickTo`; puede rematar en el mismo paso de decisión |
| Diferencia funcional demostrada | Caso adverso 0→1, también con anclaje del portero corregido | Reejecución de ambas versiones, eventos y marcador |
| Bifurcación demostrada | A 1,825 s cambia conducción→pase con los mismos sorteos iniciales y distinta presión percibida | Trazas de decisión, distancia 4,047→3,797 y umbral de conducción |
| Limitación demostrada | No hay valoración explícita del coste de otras amenazas al imponer protección | Se devuelve el primer corredor aceptable; no se compara una utilidad global de alternativas |
| Limitación demostrada | Persistencia de intención tras cambio de situación | Intención de 2,942 s ejecutada durante el pase posterior y hasta el próximo ciclo de lectura |
| Hipótesis pendiente | Relevar al presionante cuando protege mejoraría presión y cobertura | Requiere pruebas específicas con varios defensores disponibles; no se ensayó una política alternativa |
| Hipótesis pendiente | Invalidar una intención ante recepción peligrosa evitaría oportunidades | Puede ayudar o generar oscilaciones/omnisciencia; no se ha implementado ni comparado |
| Hipótesis pendiente | Predicción física de trayectoria mejoraría bloqueos y portero | No se ha probado un predictor sustituto; el control de anclaje no equivale a esa mejora |
| No demostrado | Que la protección sea en general mejor o peor, o que toda temporización impida disputar | Muestra sintética, corta, pocos perfiles y semillas; resultados mixtos |

## 8. Propuestas y criterio para continuar

Prioridades propuestas, **sin implementación en esta entrega**:

1. **Corregir el protocolo de validación:** inicialización coherente de anclajes, posiciones y reinicios; portero válido; escenarios con ayudas y varias amenazas. Mantener los casos originales como regresión diagnóstica, identificando el defecto; no borrar el resultado adverso.
2. **Alinear la predicción con las posibilidades reales del motor:** distinguir llegada al balón, radio de disputa y contacto de vuelo; comparar el horizonte protector con la ejecución efectiva del tiro. No añadir una supuesta demora atacante únicamente para favorecer la defensa.
3. **Evaluar alternativas y sus costes:** presión, temporización, protección y cobertura deben comparar amenaza de tiro, pase al receptor y continuidad ofensiva. Medir qué se deja libre y si otro compañero puede asumirlo. No basta subir o bajar el umbral de 25 unidades ni imponer un `score` mayor.
4. **Revisar coordinación y actualización de intención:** investigar relevo de presión y respuesta a pase/recepción respetando información observada, demora y capacidades. Añadir controles de oscilación y casos donde mantener la lectura sea correcto.
5. **Validar antes de cerrar:** usar escenarios nuevos reservados, ambos sentidos, perfiles distintos, más semillas y posesiones más largas; informar resultados pareados, presión efectiva, tiros y ventanas peligrosas por posesión, intervención ejecutada y portero. Separar el efecto de cambios geométricos del de la secuencia de azar; no asumir que compartir semilla mantiene sorteos equivalentes tras una bifurcación.

Criterio mínimo para pasar de bloque: corregir el montaje y explicar las diferencias; demostrar que una mejora propuesta reduce un problema identificado sin abrir otros de manera sistemática, conservar contracasos y comprobar regresiones. No exigir «cero goles» ni optimizar para esta única secuencia. Si la comparación sigue siendo mixta, conservar la funcionalidad como experimental con su límite, sin cerrar A4/A7.

**Estado de la hoja de ruta:** A sigue en desarrollo. Esta auditoría alimenta A4 (conductas defensivas) y A7 (validación), y señala dependencias de A2 (accesibilidad/percepción) y A6 (portero/contacto). B comercial y C iOS siguen pendientes. No se ha iniciado 0.54 ni se modifica ROADMAP.md en este commit documental.

## 9. Verificación y reproducibilidad

La batería histórica 50/50 corresponde a la implementación previa; no se presenta como una nueva ejecución completa de esta auditoría. Se comprobó no interferencia con ocho parejas originales, se reprodujo el caso adverso y se ejecutaron los tres grupos descritos. Las repeticiones del caso adverso para registrar azar y del caso de acceso cercano conservaron sus resultados. No hubo fallos de ejecución en estos ensayos. Sin prueba visual Safari/iPhone ni validación externa.

Solo se añaden este informe y la entrada de auditoría de DEVELOPMENT_LOG.md. El contenido del motor y demás archivos versionados permanece idéntico al commit de referencia.

### Reproducción del instrumento temporal

El siguiente código es **un anexo documental ejecutable de diagnóstico**, no una modificación del motor ni una nueva versión. Guardarlo fuera del repositorio como `audit.cjs`, indicar en `FASE_REPO` la ruta absoluta del repositorio en el commit auditado y ejecutar con Node:

```bash
FASE_REPO=/ruta/al/repositorio node /ruta/temporal/audit.cjs case
FASE_REPO=/ruta/al/repositorio node /ruta/temporal/audit.cjs batch
FASE_REPO=/ruta/al/repositorio node /ruta/temporal/audit.cjs keeper
FASE_REPO=/ruta/al/repositorio node /ruta/temporal/audit.cjs help
```

Los JSON se escriben junto al instrumento temporal. `case` reconstruye el adverso; `batch` produce 24 parejas; `keeper`, ocho; `help`, ocho. Los resultados detallados contienen eventos y muestras de posiciones/intenciones para comprobar las tablas. Para contar intercepciones, filtrar capturas con `after.owner===actor`, equipo del actor igual al defensor original y vuelo previo del equipo contrario; los pases y tiros globales del resultado incluyen ambos equipos y no sustituyen ese filtro. Para tiros concedidos, filtrar eventos `kick`, `kind==='shot'`, actor rival. La media de acceso es `arrivalSum/attackSeconds`; el resto de integrales y ventanas se registra en `audit.metrics`.

La sonda adicional de azar envolvió `random` devolviendo exactamente el valor obtenido del original y registró contador/tiempo/valor; envolvió `chooseAction` registrando estado antes/después y `perceivedSpace(p,perceivedOpposition(p))` antes de invocar el original. No volvió a llamar a `random` para observarlo. Para inspeccionar los siete pasos cercanos, se repitió la pareja equipo 0/libre/101/π guardando tiempo, `arrivalTime`, preparación y `r.intent` dentro de la rama `a<=.35` del instrumento. Estas sondas no forman nuevas parejas independientes.

SHA-256 de los motores observados:

- `index.html`: `3df7034dfafb05ecd642b2ea0601b7f27224fdcdd66fee3ce1e94101c264f331`.
- `tests/fixtures/engine-v052.html`: `2aabc7ad31293682799fc3e39d086ea5e77541b609307fdb7c76f9952136ccfc`.

```javascript
// Paired synthetic dynamic probes: no fitted real-match claim.
const fs=require('node:fs'),path=require('node:path');
const root=process.env.FASE_REPO||process.cwd(),{env}=require(path.join(root,'tests/continuity.cjs'));
const {createHash}=require('node:crypto');
const entry='startSituation();requestAnimationFrame(frame);';
function simulate(source,t,kind,seed,angle=0,keeperHome=false,help=0){
 source=hook(source);
 const e=env(source.replace(entry,entry+`globalThis.test.probe={schedule:(delay)=>{decision=delay;},read:contextualDefense};`),seed);
 e.t.enterFreeMode();e.t.scenario({time:0,team:1-t,seed});
 const ps=e.t.get().players,flip=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 const carrier=ps.find(p=>p.t!==t&&p.n===6),p=ps.find(p=>p.t===t&&p.n===6),receiver=ps.find(p=>p.t!==t&&p.n===7);
 for(const q of ps){const pos=flip(q.t===t?65+(q.n%3)*4:75+(q.n%3)*4,5+q.n*5);
  Object.assign(q,pos,{hx:pos.x,hy:pos.y,sx:pos.x,sy:pos.y,vx:0,vy:0,bodyAngle:q.t===t?(t?Math.PI:0):(t?0:Math.PI),visualMemory:[],rivalMemory:[],controlUntil:0,cool:0});
  for(const k of ['intentAt','intentX','intentY','attackOrigin','defOrigin','defDuty'])delete q[k];
 }
 Object.assign(carrier,flip(20,kind==='central'?32:40),{bodyAngle:t?0:Math.PI});
 Object.assign(p,flip(7,kind==='central'?32:34.5));
 Object.assign(ps.find(q=>q.t===t&&q.n===1),flip(4,48));
 Object.assign(receiver,flip(23,28));
 if(help){const h=ps.find(q=>q.t===t&&q.n===7);Object.assign(h,flip(12,35.8),{vx:0,vy:help===2?(t?8:-8):0});} carrier.bodyAngle+=angle; if(keeperHome){const g=ps.find(q=>q.t===t&&q.n===1);g.hx=g.x;g.hy=g.y;}
 e.t.capture(carrier,'inicio del ensayo');carrier.driveX=carrier.x+(t?1:-1)*2;carrier.driveY=carrier.y- (t?-1:1);
 if(kind!=='free')e.t.probe.schedule(10);
 e.t.setDestinationTrace(true);
 const initial=ps.map(q=>({id:q.id,x:q.x,y:q.y}));
 let protectionSamples=0,shot=false,pass=false,firstShotOutcome=null,firstShotTime=null;
 const initialGoals=e.t.get().score[1-t];
 const audit=new Auditor(e,t);
 for(let k=0;k<720;k++){
  const s=e.t.get(),time=k/120;
  if(kind==='pass'&&!pass&&time>=.35&&s.owner===carrier){e.t.kickTo(carrier,receiver.x,receiver.y,'pass',receiver);pass=true;}
  const launchAt=kind==='immediate'?0:.55;
  if(['delayed','immediate','central'].includes(kind)&&!shot&&time>=launchAt&&s.owner===carrier){
   const goal=flip(-2,kind==='central'?32:29.5);e.t.kickTo(carrier,goal.x,goal.y,'shot');shot=true;firstShotTime=time;
  }
  audit.sample(k);
  const beforeShots=s.shots;e.t.update(1/120);const after=e.t.get();
  protectionSamples+=e.t.getDestinationTrace().rows.filter(r=>r.time===after.elapsed&&r.team===t&&r.source==='lectura almacenada'&&r.intent&&r.intent.steps.some(step=>step.stage==='Proteger línea de tiro'||step.stage==='Mantener cobertura de tiro')).length;
  if(firstShotTime===null&&after.shots>beforeShots)firstShotTime=time;
  if(firstShotTime!==null&&firstShotOutcome===null&&!after.flight){
   firstShotOutcome=after.score[1-t]>initialGoals?'goal':after.owner&&after.owner.t===t?'defender_control':after.restart?'restart':'other';
  }
  for(const q of ps)if(!Number.isFinite(q.x)||!Number.isFinite(q.y))throw Error('Non-finite movement');
 }
 const s=e.t.get();
 return {audit:audit.finish(),angle,keeperHome,help,defendingTeam:t,kind,seed,seconds:6,protectionSamples,passes:s.passes,shots:s.shots,goalsConceded:s.score[1-t]-initialGoals,turnovers:s.turnovers,firstShotOutcome,
  movedAttackers:ps.filter(q=>q.t!==t&&Math.hypot(q.x-initial[q.id].x,q.y-initial[q.id].y)>.1).length,
  movedDefenders:ps.filter(q=>q.t===t&&Math.hypot(q.x-initial[q.id].x,q.y-initial[q.id].y)>.1).length};
}
function hook(source){
 return source.replace(entry,entry+`
 const auditEvents=[];
 const auditSnap=()=>({time:elapsed,ball:[bx,by],owner:owner&&owner.id,score:[...score],players:players.map(q=>({id:q.id,t:q.t,n:q.n,x:q.x,y:q.y,vx:q.vx,vy:q.vy,angle:q.bodyAngle,duty:q.defDuty,tx:q.intentX,ty:q.intentY,hx:q.hx,cool:q.cool})),flight:flight&&{kind:flight.kind,from:flight.from.id,target:flight.target&&flight.target.id,x:flight.x,y:flight.y,tx:flight.tx,ty:flight.ty}});
 const auditKick=kickTo,auditCapture=capture,auditExit=adjudicateExit;
 kickTo=function(...args){const before=auditSnap();const ret=auditKick(...args);auditEvents.push({type:'kick',kind:args[3],actor:args[0].id,before,after:auditSnap()});return ret;};
 capture=function(...args){const before=auditSnap();const ret=auditCapture(...args);auditEvents.push({type:'capture',why:args[1],actor:args[0].id,before,after:auditSnap()});return ret;};
 adjudicateExit=function(...args){const before=auditSnap();const ret=auditExit(...args);auditEvents.push({type:'exit',before,after:auditSnap()});return ret;};
 globalThis.test.kickTo=kickTo;globalThis.test.capture=capture;
 globalThis.test.audit={events:auditEvents,snap:auditSnap};
 `);
}
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function gap(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,ll=dx*dx+dy*dy;if(!ll)return Infinity;const u=((p.x-a.x)*dx+(p.y-a.y)*dy)/ll;return u>.08&&u<.95?Math.hypot(p.x-a.x-u*dx,p.y-a.y-u*dy):Infinity;}
class Auditor{
 constructor(e,t){this.e=e;this.t=t;this.samples=[];this.m={attackSeconds:0,dangerSeconds:0,occasionSeconds:0,occasionEpisodes:0,arrivalSum:0,openGoalSum:0,fieldOpenSum:0,passOptionsSum:0,doubleCoverSum:0,protectionSteps:0,protectImmediate:0,protectBeforeShot:0};this.prevOcc=false;}
 sample(k){const e=this.e,t=this.t,s=e.t.get(),o=s.owner,defs=s.players.filter(p=>p.t===t&&p.n!==1&&!p.sentOff),g=s.players.find(p=>p.t===t&&p.n===1);
 const rows=e.t.getDestinationTrace().rows;
 for(const r of rows.filter(r=>r.team===t&&r.source==='lectura almacenada'&&r.intent&&r.intent.steps.some(x=>/línea de tiro|cobertura de tiro/.test(x.stage)))){
 this.m.protectionSteps++;
 if(o&&o.t!==t){const p=s.players.find(q=>q.id===r.id);if(p){const a=e.t.arrivalTime(p,o,1.65),prep=.18+Math.abs(Math.atan2(Math.sin(Math.atan2(32-o.y,(t?100:0)-o.x)-o.bodyAngle),Math.cos(Math.atan2(32-o.y,(t?100:0)-o.x)-o.bodyAngle)))/(o.turnRate||Math.PI);if(a<=.35)this.m.protectImmediate++;if(a<=prep)this.m.protectBeforeShot++;}}
 }
 if(k%6)return;
 let metrics=null;
 if(o&&o.t!==t&&!s.restart){const goal={x:t?100:0,y:32},arrival=Math.min(...defs.map(p=>e.t.arrivalTime(p,o,1.65))),danger=Math.abs(o.x-goal.x)<=25&&Math.abs(o.y-32)<=17;
 const prep=.18+Math.abs(Math.atan2(Math.sin(Math.atan2(32-o.y,goal.x-o.x)-o.bodyAngle),Math.cos(Math.atan2(32-o.y,goal.x-o.x)-o.bodyAngle)))/(o.turnRate||Math.PI);
 const covers=Array.from({length:7},(_,i)=>{const b={x:goal.x,y:29+i};return {n:defs.filter(p=>gap(p,o,b)<1.65).length,g:gap(g,o,b)<1.65};});
 const open=covers.filter(c=>!c.n&&!c.g).length/7,fieldOpen=covers.filter(c=>!c.n).length/7,double=covers.filter(c=>c.n>=2).length/7;
 const passOptions=s.players.filter(p=>p.t===o.t&&p!==o&&p.n!==1&&dist(p,o)>=3&&dist(p,o)<=30&&!defs.concat(g).some(q=>gap(q,o,p)<2)).length;
 const occasion=danger&&prep<=.8&&arrival>prep&&open>=3/7;
 this.m.attackSeconds+=.05;this.m.arrivalSum+=arrival*.05;
 if(danger){this.m.dangerSeconds+=.05;this.m.openGoalSum+=open*.05;this.m.fieldOpenSum+=fieldOpen*.05;this.m.passOptionsSum+=passOptions*.05;this.m.doubleCoverSum+=double*.05;}
 if(occasion){this.m.occasionSeconds+=.05;if(!this.prevOcc)this.m.occasionEpisodes++;}this.prevOcc=occasion;
 metrics={arrival,prep,open,fieldOpen,passOptions,double,danger,occasion};
 }else this.prevOcc=false;
 this.samples.push({k,...e.t.audit.snap(),metrics,trace:rows.filter(r=>r.team===t).map(r=>({id:r.id,source:r.source,intent:r.intent,steps:r.steps}))});
 }
 finish(){return {metrics:this.m,events:this.e.t.audit.events,samples:this.samples};}
}
if(require.main===module){
 const src={v052:fs.readFileSync(path.join(root,'tests/fixtures/engine-v052.html'),'utf8'),v053:fs.readFileSync(path.join(root,'index.html'),'utf8')};
 const pairs=[];const mode=process.argv[2]||'case';
 const cases=mode==='case'?[[1,'pass',101,0,false]]:[];
 if(mode==='batch')for(const t of [0,1])for(const kind of ['pass','free'])for(const seed of [101,202])for(const angle of [0,Math.PI/2,Math.PI])cases.push([t,kind,seed,angle,false]);
 if(mode==='help')for(const t of [0,1])for(const [kind,seed] of [['pass',101],['free',202]])for(const help of [1,2])cases.push([t,kind,seed,0,true,help]);
 if(mode==='keeper')for(const t of [0,1])for(const kind of ['pass','free'])for(const seed of [101,202])cases.push([t,kind,seed,0,true]);
 for(const args of cases){const before=simulate(src.v052,...args),after=simulate(src.v053,...args);pairs.push({before,after});console.log('done',JSON.stringify(args),before.goalsConceded,after.goalsConceded);}
 fs.writeFileSync(path.join(__dirname,mode+'.json'),JSON.stringify(pairs));
}
module.exports={simulate};
```

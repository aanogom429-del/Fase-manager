# Matriz posicional del usuario · referencia funcional

Fuente: matriz integral aportada en la conversación del proyecto el 15/11/2026. Es una especificación de diseño; no una taxonomía validada empíricamente ni una lista de movimientos obligatorios.

## Contrato espacial y funcional

Cinco sistemas: 1-4-3-3, 1-4-2-3-1, 1-4-4-2 plano, 1-3-4-3 (dos atacantes interiores), 1-3-5-2 (pivote e interiores). Once jugadores, seis zonas sin nombres tácticos: Z1 portería propia y Z6 rival. Cinco carriles mirando hacia la portería rival: C1 exterior izquierdo, C2 interior izquierdo, C3 central, C4 interior derecho, C5 exterior derecho. Al cambiar equipo se invierten ambos ejes. Los límites exteriores pertenecen a Z6/C5, sin sectores 7/6.

AO ataque organizado, DO defensa organizada, TO transición ofensiva, TD transición defensiva. DL longitudinal, DT transversal, DD diagonal, AP aproximación, AL alejamiento, RP ruptura, CP compensación, FI fijación, CB cobertura, BA basculación. FI puede ser estática; CB/BA son funciones, no trayectorias independientes.

La tabla defensiva aportada describe la zona desde el atacante: su Z1 corresponde al inicio rival y su Z6 a la portería que defendemos. Las lecturas del inspector siempre usan el equipo del jugador. No mezclar referencias.

## Relaciones y prioridades a desarrollar

| Sistema | Relaciones prioritarias | Condiciones principales |
|---|---|---|
| 4-3-3 | Central-pivote-interior; lateral-interior-extremo; interior-delantero | Alternar amplitud lateral/extremo; compensar interiorizaciones y conducción del central; ocupar profundidad liberada por punta; no bascular todos mecánicamente |
| 4-2-3-1 | Central-doble pivote; lateral-extremo-mediapunta; mediapunta-delantero | Escalonar pivotes; mediapunta puede romper si punta baja; lateral ensancha ante extremo interior; proteger centro tras pérdida |
| 4-4-2 | Central-medio; lateral-medio exterior; pareja de medios; pareja de puntas | Alternar apoyo/profundidad de puntas; compensar llegada del medio; coordinar presión de dos y distancias de líneas |
| 3-4-3 | Central exterior-carrilero-medio; carrilero-atacante interior; atacante-punta | Carrilero exterior y atacante en intervalo; compensar avance del central; preservar amplitud si carrilero interioriza; valorar línea de cinco en DO |
| 3-5-2 | Central exterior-carrilero-interior; pivote-interiores; interior-punta; pareja de puntas | Alternancia de puntas; compensar carrilero/central; mantener conexión si pivote baja; proteger centro tras pérdida; línea de cinco contextual |

En AO las funciones progresan desde construcción/apoyo en Z1-Z2 a conexiones y ruptura Z3-Z4 y llegada/finalización Z5-Z6, sin imponer que todos sigan el balón. Portero y centrales mantienen protección; pivotes organizan/equilibran; laterales/carrileros alternan apoyo y amplitud; interiores y mediapunta conectan/llegan; atacantes alternan fijación, apoyo y profundidad. Son tendencias condicionadas, no una programación automática por zona.

Con balón exterior, próximos ofrecen apoyo/amplitud/ruptura, centrales conectan/equilibran y alejados conservan amenaza, amplitud o compensación. Con balón interior, alternativas exterior/interior; con balón central, conexiones a ambos lados y referencias abiertas.

TO: asegurar/progresar en Z1-Z2, progresar o conservar Z3, valorar ataque inmediato Z4, finalizar con ventaja Z5-Z6. TD: dificultar progresión y defender profundidad Z1-Z2, cerrar centro Z3, valorar recuperación Z4, presionar con ventaja y proteger contraataque Z5-Z6. Oposición, cobertura, orientación, distancia y tiempo deben determinar presión o repliegue.

Contrato futuro de decisión: sistema, posición actual, rol, balón y trayectoria, compañeros/oposición percibidos, momento y objetivo. Salida: rol momentáneo, objetivo, sector destino, desplazamiento, relación principal, activación, cancelación y alternativa. Prioridad de recepción/disputa y órdenes explícitas conservada. Evaluar utilidad espacial, oportunidad temporal, coordinación, adaptación, eficacia y equilibrio; llegar al sector no prueba éxito táctico.

## Integración 0.141 y límites

Se añade el quinto sistema al selector, con tres centrales, dos carrileros, dos medios, dos atacantes interiores y un punta. Referencias interiores separadas de la amplitud de carrileros; actores interiores dejan de clasificarse como jugadores de amplitud automática. Las referencias se ajustan físicamente, no recolocan jugadores. Inspector muestra sector propio actual y destino aplicado. Etiquetas específicas en selección sin balón.

Se conserva el motor defensivo y de transiciones existente. NO se han implementado todavía todas las reglas R1–R6, los cuatro momentos por puesto, la línea de cinco contextual ni las 6600 combinaciones. No se demuestra mejora de resultados o eliminación de concentración. 1320 combinaciones sin carril y 6600 con carril son contextos combinatorios, no casos verificados.

Siguiente implementación: complementar lateral/extremo y carrilero/atacante según ocupación observada, con activación/cancelación y alternativas; después parejas de pivotes/puntas y DO/TO/TD. Validar con contracasos y situaciones reales antes de declarar completa la matriz.

El ensayo de protección de amplitud iniciado antes de recibir esta especificación no se integra en 0.141. Se retoma desde la 0.140 publicada; no se atribuyen resultados de aquel ensayo a esta versión.

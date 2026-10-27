# 0.88 — Compensación secundaria

Extiende la asignación temporal de 0.87: primero se atienden todas las salidas originales y después las referencias que abandonan sus sustitutos. Un medio puede cubrir al defensor y un atacante la referencia del medio. Se conservan los criterios de elegibilidad, radio máximo 24, prioridad de apoyos/seguridades/órdenes y preferencia por el sustituto anterior.

La cadena solo avanza hacia una línea posterior en cada enlace; termina en ataque y no puede formar ciclos. Cada jugador se asigna una vez y cada vacante tiene un sustituto como máximo. Al terminar la salida original, se liberan sus relevos y los destinos vuelven progresivamente a las referencias originales. No añade estado persistente nuevo.

Límite importante: no garantiza ocupación completa. Puede quedar una vacante en ataque, o no existir candidato elegible. No obliga a un atacante lejano a retroceder ni sacrifica una orden explícita para completar la cadena. No produce automáticamente un nuevo desdoblamiento. Solo arquitectura con balón; sin calibración de SkillCorner ni validación de partido completo.

Pruebas line_chain: cuatro sistemas × dos sentidos, dos enlaces, unicidad, orden estricto de líneas, prioridades, límite espacial y liberación completa. Se mantienen las pruebas previas de integración y continuidad. Error preexistente decision_storage pendiente; no se declara toda la batería superada ni prueba Safari/iOS real.

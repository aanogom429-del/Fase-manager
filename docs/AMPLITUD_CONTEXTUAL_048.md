# Amplitud contextual progresiva · 0.48

El jugador de banda no asignado como apoyo puede abrirse progresivamente desde la referencia de posesión. Si recuerda un compañero ocupando esa banda a menos de 12 unidades longitudinales, conserva el destino de seguimiento del balón. El lado se adapta a su posición actual al cruzar la franja central; dentro de ella mantiene el lado de origen. Se conserva la ocupación específica del último tercio, los apoyos, el equilibrio y la prioridad de órdenes.

El alcance lateral comienza en cuatro unidades y aumenta 0,75 unidades por segundo desde el comienzo de la posesión hasta permitir alcanzar el destino de amplitud. Es un límite al destino, no una velocidad prescrita: el desplazamiento mantiene aceleración, giro y frenada. El reloj se reinicia con una nueva referencia de posesión y se restaura al comparar decisiones. Los parámetros son heurísticos, pendientes de calibración.

La separación local ya no obliga a volver a un carril fijo por el puesto nominal. Esta búsqueda puede desplazar adicionalmente el destino y mantiene conocimiento global en jugadores no asignados como apoyo. No se presenta como percepción descentralizada completa.

## Contraste nuevo, selección previa

Primeras tres posesiones inferidas de pases consecutivos entre 400 y 600 s del partido 2 de Metrica; duración 1–6 s. Selección fijada antes de importar trayectorias o calcular resultados. Ninguna ventana sustituida. Mismo partido que los diagnósticos anteriores: no es validación independiente por partido.

| Ventana | Tiempo (s) | Error 0.47 (m) | Error 0.48 (m) | Referencia inmóvil (m) |
|---|---|---:|---:|---:|
| 1 | 430,60–435,44 | 8,345 | 7,448 | 6,797 |
| 2 | 436,84–440,32 | 7,125 | 5,876 | 4,324 |
| 3 | 447,96–451,00 | 5,709 | 4,456 | 3,342 |

Reducciones del 10,7 %, 17,5 % y 21,9 %. Se mantiene el protocolo de nueve compañeros libres, poseedor/ball/oposición impuestos, velocidad inicial cero y orientación predeterminada. La referencia inmóvil sigue siendo mejor. El resultado respalda una mejora posicional acotada; no valida todavía la calidad táctica general. Los roles siguen aproximados por dorsal; las tres ventanas nuevas corresponden al mismo equipo, aunque las pruebas funcionales cubren ambos sentidos.

## Corrección de la fuente local

Los CSV de posiciones disponibles localmente estaban truncados a aproximadamente 2 MB y terminaban antes de las nuevas ventanas. Se descargaron los CSV completos oficiales. Se comprobó que cada archivo anterior coincide byte a byte con el prefijo del completo; los datos ya usados permanecen iguales. La primera importación nueva carecía de cuadros y fue rechazada. Se repitió la importación con la fuente completa y las mismas ventanas preseleccionadas, sin seleccionar otras. Los hashes completos figuran en width-validation-windows.json.

Fuente y atribución: [Metrica Sports, Sample Game 2](https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_2). Los hashes históricos identifican los fragmentos locales anteriores, no los CSV íntegros.

## Verificación y reproducción

contextual_width comprueba inicio y posesión larga, banda ocupada observada, cambio de lado, restauración y nueva posesión para ambos equipos. Superadas también support_persistence, offball, contextual_supports (tres simulaciones de 60 s) y aerial_play. No se afirma calibración de amplitud con un partido completo.

```sh
node tests/contextual_width.cjs
node scripts/evaluate_width_validation.cjs
```

Snapshot 0.48, selección, ventanas y resultados quedan conservados. El importador prepare_width_validation.py permite repetir la importación de los CSV completos; su modo select rechaza sobrescribir el plan fijado.

## Próximo paso

Medir utilidad de los apoyos y amplitud durante posesiones prolongadas: líneas disponibles, ocupación redundante, progresión y equilibrio tras pérdida. Contrastar funciones reales y escenarios de intercambio de puestos; ampliar después a otro partido. A1/A2/A7 continúan parciales. No hay aprendizaje automático.

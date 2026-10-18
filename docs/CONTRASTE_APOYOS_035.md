# Contraste de apoyos con poseedor · motor 0.35

18 de octubre de 2026. La regla se activa en una de tres ventanas nuevas y reduce ligeramente el error posicional. Las otras dos no permiten valorar su efecto. No se demuestra una mejora táctica general.

## Protocolo fijado antes de evaluar

Plan publicado en commit `50d2976674d9aa9594138ce5c06e74368eef99a3`, antes de importar posiciones de las ventanas y medir resultados. Motor de partida: `57a685d479ab8af9ff4e0b3e877510a8bb2e7005`; comparación con instantánea 0.34. Parámetros sin cambios.

Selección por eventos: los tres primeros intervalos entre 220 y 400 s del primer periodo de Metrica Sample Game 2, delimitados por dos pases consecutivos del mismo equipo donde el receptor del primero ejecuta el segundo, con duración entre 1 y 6 s. Sin sustitución de ventanas si se excluyen. Son nuevas respecto a las ventanas del proyecto, pero pertenecen a un partido ya utilizado.

Se comprueban todos los fotogramas originales a 25 Hz: 22 identidades estables, coordenadas válidas, sincronía, balón concordante en las dos fuentes y distancia balón–poseedor no superior a 3 m. Este último umbral es provisional y se fijó antes de medir. Los eventos y la proximidad permiten inferir control compatible; no prueban por sí solos control continuo ni perfilación. No se reconstruyen huecos.

Balón, poseedor, rivales y porteros siguen las posiciones registradas; se simulan los otros nueve atacantes. Interpolación únicamente entre muestras completas contiguas, con paso máximo de 1/120 s. Se mantienen la identidad del poseedor y el sentido de ataque normalizado. Los roles por dorsal siguen siendo aproximados. El nuevo evaluador activa la lógica que el anterior, con balón impuesto en vuelo y sin poseedor, no podía comprobar.

## Resultados

Error: media temporal de distancia a las posiciones observadas en metros del campo original; integración trapezoidal. Las ventanas completas se conservan; ninguna fue excluida.

| Ventana (s) | Equipo / poseedor | Error 0.34 | Error 0.35 | Pasos con regla activa | Referencia inmóvil |
|---|---|---:|---:|---:|---:|
| 222,44–225,60 | Home / 8 | 6,9151 m | 6,9151 m | 0 / 395 | 2,2979 m |
| 236,00–237,16 | Away / 19 | 3,7823 m | 3,7823 m | 0 / 145 | 0,7548 m |
| 256,76–259,76 | Home / 9 | 5,8603 m | 5,7584 m | 74 / 375 | 2,8841 m |

En la tercera ventana el error disminuye 0,1019 m. La distancia recorrida hacia atrás por jugador y segundo pasa de 1,1485 a 1,0006 m/s; esa dirección de movimiento no determina su utilidad táctica. Los 74 pasos registran una propuesta de destino conservada; una lectura almacenada puede demorar su aplicación.

La referencia inmóvil tiene menor error en las tres ventanas. Esto muestra límites del acompañamiento simulado en estos fragmentos cortos; no justifica recomendar inmovilidad. No se combinan las ventanas como si fueran partidos independientes. No se han ajustado umbrales, seleccionado reemplazos, entrenado jugadores ni actualizado la conducta tras observar los resultados.

## Comprobaciones y reproducción

- `python scripts/import_owner_holdout.py --directory <CSV originales> --out data/owner-holdout-windows.json`
- `node scripts/evaluate_owner_holdout.cjs`
- `node tests/owner_holdout.cjs`

El importador verifica la selección por eventos. El informe conserva huellas SHA-256 de los CSV y de ambas fuentes HTML. Las pruebas comprueban activación con una situación sintética que sí ofrece una pareja conectada, simetría de ataque, independencia del orden de identidades, rechazo de huecos/duplicados/posesión incompatible, ausencia de mutación de fuentes y reproducción exacta del informe. El visor muestra las tres ventanas y sus límites. Se comprueba además la continuidad existente de los modos de juego.

Datos: [Metrica Sports Sample Game 2](https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_2). Se conserva la atribución existente; este trabajo no añade una afirmación de licencia comercial. Plan, ventanas y resultados: `data/owner-holdout-plan.json`, `data/owner-holdout-windows.json`, `data/owner-holdout-validation.json`.

## Decisión de desarrollo

Conservar 0.35 sin recalibración. A1 cuenta ahora con una corrección sintética y un contraste inicial limitado; no recibe el estado de validación general. Seguir con A2: orientación corporal y percepción, integradas en decisiones, pausa y restauración. Ampliar posteriormente el contraste a más situaciones y partidos con anotación de utilidad táctica; no convertir esta mejora de error en validación de todo el marco.

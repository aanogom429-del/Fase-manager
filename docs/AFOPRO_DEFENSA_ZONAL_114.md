# Contraste táctico: AFOPRO y Fase Manager 0.114

Fuente: [AFOPRO, La defensa zonal](https://afopro.com/2020/06/12/la-defensa-zonal/amp/). Lectura cualitativa para diseñar situaciones de juego, no un estudio de validación ni una calibración de distancias.

| Idea de la guía | Motor 0.113 | Integración o límite en 0.114 |
|---|---|---|
| Relacionar balón, espacio, compañeros y adversarios | Referencias móviles por línea, cobertura y rival percibido en zona | Antes de aceptar una marca, comprobar también qué línea interior deja y si otro compañero ya la cubre. |
| Priorizar el interior sin seguir siempre al oponente | Entrega por salida de zona, pero el defensor podía abandonar un pase interior aún dentro de su radio | Rechazar un seguimiento si rompe la cobertura de un pase progresivo a un rival central percibido. Permitirlo con cobertura efectiva en posición actual y destino comprometido. |
| Elegir altura del bloque según plan | Repliegue y protección bajaban referencias, sin altura seleccionable independiente | Selectores bajo/medio/alto por equipo. Altura media conserva la referencia anterior. La orden alta no empuja hacia delante ante protección o repliegue. |
| Coordinar basculación y escalonamiento | Basculación común, cierre del lado débil en área y relevos limitados | Se conservan. Comprobar en secuencias futuras cambios diagonales rápidos y si llega físicamente la cobertura. No imponer una distancia fija en metros para todos los sistemas. |
| Alternar intervención activa, disuasión y permanencia zonal | Un presionante, cobertura y aproximación oblicua; alternativas de contención/protección | La nueva decisión permite permanecer en el carril incluso cuando la marca individual es viable. No hay aún trampas colectivas ensayadas para atraer cambios de orientación. |

`tests/zonal_centre.cjs`: ambos sentidos, mismo defensor, adversario que pasa del interior hacia fuera; suelta la marca sin cobertura central y puede retomarla si el compañero está en posición. Compara referencias de altura baja/media/alta manteniendo igual el balón. Son pruebas de decisión/destino, no una afirmación de mejora agregada en tiros o goles. Los radios, bandas y desplazamientos usados son elecciones del simulador, no valores prescritos por el artículo.

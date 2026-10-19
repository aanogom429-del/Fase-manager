# Presión, exposición e inferioridad percibida · 0.52

El primer defensor considera las líneas hacia receptores que ha visto o recuerda con incertidumbre baja. Si protege una línea que su destino de presión dejaría abierta, y ningún compañero libre la protege, puede temporizar sobre esa línea. Se prioriza el receptor con mayor avance hacia la portería propia. Con acceso inmediato al balón (llegada estimada de hasta 0,35 s) no se activa esta retención.

La geometría conserva el criterio de 0.51: distancia inferior a dos unidades al segmento interior (8–95 %). El destino de temporización se sitúa al 35 % del segmento poseedor–receptor. Las amenazas deben estar a menos de 28 unidades, avanzar más de tres y tener incertidumbre de hasta 1,5. Son parámetros provisionales en coordenadas 100×64, no metros ni calibración empírica.

También compara rivales percibidos y compañeros de campo sin órdenes dentro de un radio de 14 unidades del balón. Si percibe más rivales, y su llegada tarda más de 0,75 s, temporiza aunque haya ayuda. El inspector distingue «Temporizar ante inferioridad percibida», «Temporizar protegiendo línea» y la falta de ayuda. Es un recuento local aproximado, no una evaluación completa de superioridad funcional. Las posiciones de compañeros siguen siendo globales.

## Verificación

`node tests/pressure_exposure.cjs` prueba ambos sentidos: línea abandonada, destino que la conserva, respaldo libre, respaldo con orden, memoria caducada, presión que no abandona la línea, inferioridad local y acceso inmediato. Se mantienen las pruebas de defensa contextual, coordinación, amenazas simultáneas, órdenes sin balón, continuidad, apoyos y juego aéreo.

## Límites y siguiente paso

Las pruebas aíslan decisiones de destino: no demuestran interceptaciones ni mejora defensiva general. La protección geométrica no considera todavía velocidad del pase, fuera de juego, trayectoria completa del defensor ni relevo futuro. El recuento puede omitir rivales no percibidos. No se añade aprendizaje ni se elimina el error.

Siguiente prioridad: protección de finalización y validación con pases ejecutados y rival reactivo, comprobando cuándo conviene presionar y cuándo temporizar. El bloque defensivo y el marco de espacios de fase continúan parcialmente implementados.

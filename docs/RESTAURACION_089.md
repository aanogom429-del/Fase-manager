# 0.89 — Restauración completa al reintentar

La restauración eliminaba una lista parcial de campos opcionales antes de copiar la instantánea. Campos como `widthStarted`, `driveX` y `driveY` podían sobrevivir desde el intento anterior aunque no existieran en el punto de partida. La prueba `decision_storage` reproducía una divergencia en trayectoria y resultado.

Ahora se eliminan todas las propiedades propias del jugador salvo `el` (su nodo SVG), y se aplica el estado guardado. Se conserva la identidad del objeto jugador y del nodo visual. Las memorias visuales siguen copiándose de forma independiente. No cambia el formato de archivos ni se añaden herramientas de guardado.

La regresión verifica igualdad de todos los campos serializados al reintentar, eliminación de una propiedad residual artificial, identidad de nodos y reproducción del resultado en seis casos (dos equipos, tres elecciones). Este alcance no prueba determinismo universal, compatibilidad Safari/iOS ni mejora táctica general. Las compensaciones de 0.88 permanecen.

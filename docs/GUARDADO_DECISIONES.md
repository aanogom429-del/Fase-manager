# Guardado de decisiones — incremento independiente sobre 0.53

## Cómo usarlo

1. En modo guiado, espera a que el juego solicite una decisión.
2. En «Mis decisiones guardadas», selecciona Situación 1, 2 o 3.
3. Pulsa «Guardar decisión». Sustituye el contenido anterior de ese espacio.
4. Tras volver al juego desde el mismo navegador y dirección, elige ese espacio y pulsa «Recuperar decisión».
5. El campo vuelve al punto guardado, pausado; elige una acción o compara alternativas.

Guardar se desactiva durante una jugada o simulación libre. Recuperar sustituye el estado en pantalla. Los datos están en localStorage: borrar datos del sitio los elimina; otro navegador, dispositivo o dirección tiene almacenamiento distinto. No es un guardado completo de partido ni una aceptación de la 0.53.1.

## Implementación

Formato `stable-053-decisions-1`, tres claves independientes, suma de comprobación para detectar corrupción accidental y validación antes de mutar la partida. La suma no es autenticación ni una barrera contra manipulación deliberada del almacenamiento local. Se reutiliza el límite de decisión y el restaurador existentes; se eliminan campos opcionales de jugadores que no existían en el guardado, conservando nodos SVG. Se reconstruye la identidad de la falta compartida con la ventaja, que JSON perdería. No cambia la selección táctica, física, reglas ni azar de la 0.53.

## Procedencia

Base estable: `82c6c02`. Investigación preservada: `d172bd5`, unión de `5ecf9ed` y `5d610b1`. No se modifica main. La decisión del usuario de avanzar en tareas independientes sustituye el bloqueo histórico de no continuar hasta aceptar 0.53.1.

## Verificación final — 23-10-2026

52 entradas distintas verificadas sin fallos pendientes, de forma incremental: primera ejecución completa 50/51 PASS; `finishing_dynamic.cjs` falló por comparar el hash del HTML nuevo con un informe histórico. Se conserva el HTML exacto de 0.53 en fixture, se mantiene la comparación del motor actual con los desenlaces históricos y se reejecuta esa prueba: PASS. Se añade `decision_storage_edges.cjs`: PASS. No se presenta como una sola ejecución de 52. Resultados y fallo inicial conservados en `data/decision-storage-verification.json`.

La prueba de guardado reproduce seis trayectorias/resultados entre contextos nuevos (dos equipos y tres decisiones), restaura para comparar, comprueba tres espacios, almacenamiento bloqueado/lleno y datos vacíos/incompatibles/corruptos. Otra prueba comprueba ventaja pendiente con identidad compartida de falta, orden sin balón y recuperación sobre un vuelo existente. Pruebas Node VM con DOM simulado; no se ha verificado visualmente Chromium/Safari/iPhone: no había navegador instalado y la descarga de Chromium falló.

Publicación pendiente: la revisión automática rechazó el push de la rama de investigación preservada porque no consideró explícita la autorización de ese destino/rama. No se reintentó por otra vía. Los commits quedan locales; main no se modifica.

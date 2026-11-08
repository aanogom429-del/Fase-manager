# Elección posterior a la exploración — 0.126

8 de noviembre de 2026. Motor 54be0284bd50e062d87fe29583b3811dc1b973e9. Despliegue público verificado contra blob 178d087757b10958deb4e007c85f1232d51f0f22.

Se amplía tests/reception_scan.cjs para emitir la geometría y acción final de sus ocho casos (dos sentidos y cuatro semillas). Duración 1.5 s, simulación libre, oposición y compañeros reactivos. No se fuerza una captura ni el segundo pase.

En los ocho casos se observa al receptor adelantado. El poseedor conduce y avanza 3.08625 unidades longitudinales; el receptor pasa de 14 unidades por delante a 2.08746 al finalizar, con separación lateral 5.48028. Cero pases. Las cuatro semillas producen la misma geometría en cada sentido: no aportan cuatro trayectorias independientes. Las coordenadas son unidades del modelo 100×64, no metros físicos certificados.

La traza muestra que el compañero ya no conserva su ventaja inicial de profundidad al terminar la exploración. Esto es compatible con continuar conduciendo, pero la posición final no prueba por sí sola la causa de la elección anterior ni que sea óptima. No se modifica la prioridad de pase para fabricar una devolución.

Próximo incremento: evaluar el destino y la altura del apoyo durante la exploración; comparar conservar profundidad accesible frente a retroceder, con casos de fuera de juego, línea bloqueada y necesidad de seguridad. Mantener medición de la decisión en su instante exacto, además del resultado final. No hay cambio de motor en este diagnóstico; versión 0.126. Las once regresiones de su entrega siguen siendo la última validación dirigida, sin barrido global nuevo.

# Compensaciones simultáneas — validación controlada 0.90

Ejecutar `node tests/line_collective.cjs`.

Ocho escenarios: cuatro sistemas por dos sentidos. Cada escenario dura 30 segundos a 30 pasos/s. Dos defensores mantienen una salida programada durante 20 segundos; el balón y las referencias oscilan. Los otros jugadores avanzan mediante advancePlayer hacia la referencia propia o compensada. Los últimos 10 segundos comprueban liberación.

Resultado: PASS, 7200 muestras, 4560 con alguna compensación y máximo de tres enlaces simultáneos (no tres eslabones de una misma cadena). Se comprueba unicidad de vacantes, orden entre líneas, exclusión de jugadores salientes como sustitutos, identidad de puesto/rol, coordenadas finitas, desplazamiento menor de una unidad por paso y liberación de todos los relevos.

Límites: se llama directamente al asignador y al movimiento físico; no se ejecuta la selección automática completa de acciones/apoyos, oposición reactiva, pases ni pérdidas. Los dos salientes siguen posiciones programadas. No prueba ocupación efectiva de todos los huecos, distancias óptimas, retorno físico completo ni realismo de partido. No se cambian parámetros ni código del motor; permanece 0.90.

Siguiente contraste pendiente: integrar acciones autónomas y pérdidas de posesión, medir tiempo real de huecos sin cobertura y cambios de identidad, conservando casos adversos.

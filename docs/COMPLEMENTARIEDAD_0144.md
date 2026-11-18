# 0.144 · Complementariedad en los cinco sistemas

Extiende MP2 de la matriz del usuario a lateral–medio exterior (4-4-2) y carrilero–interior (3-5-2). En 4-4-2 los dos medios exteriores se distinguen de la pareja central. En 3-5-2 los dos interiores se distinguen del pivote. La posición actual observada determina el lado y la proximidad; el puesto identifica la relación funcional, no impone dónde debe estar el compañero.

Se conservan las reglas previas: compañero abierto → valorar interior; compañero interior → valorar amplitud. Solo observación reciente, destino visible y libre, conexión de pase percibida y poseedor conocido. Apoyos, equilibrio, relevos y órdenes explícitas mantienen prioridad. Es una preferencia del reparto colectivo y puede perder frente a otra necesidad; no garantiza pase, recepción ni llegada. No se modifica DO, TO o TD.

## Comprobaciones

flank_systems comprueba ocho combinaciones de sistema/equipo/lado, ambas alternativas, exclusión de mediocentro/pivote, memoria antigua, equilibrio, órdenes bloqueadas y aproximación física al destino. Falla en 0.143 y pasa en 0.144. El movimiento físico se comprueba con el desplazador del motor hacia el destino elegido, no como demostración de una recepción real.

Pasan nueve programas: flank_systems, flank_connection, flank_complement, formation_selection, continuity, offball_arrow_lifecycle, positional_matrix, balance_distance y null_support_focus. Sin barrido global ni comprobación Safari/iPhone.

Comparación dinámica: tests/flank_systems_audit.cjs, cuatro ejecuciones de 30 s por variante, dos sistemas y dos poseedores iniciales, semilla73. Ambos equipos usan el mismo sistema en cada ejecución. Los umbrales de agrupamiento/anchura son diagnósticos, no estándares tácticos ni validación de partido real. Datos en data/flank-systems-144.json.

MP2 continúa abierto: faltan estabilidad temporal de funciones ante cambios de orientación, cancelación/reasignación en secuencia y recepción efectiva. MP3–MP11 y A1–A7 no se dan por completados. La hoja de ruta integral permanece en ROADMAP.md y se sincroniza PROJECT_CONTEXT.md, cuya actualización anterior quedó interrumpida por límite de uso.

Resultados: muestras agrupadas29/169→30/171, parejas próximas271→262, muestras estrechas3→2, cambios de posesión19→14, pases113→119. El 4-4-2 mantiene los indicadores; 3-5-2 inicial azul reduce agrupadas11→7 y rojo aumenta4→9. No hay reducción agregada del agrupamiento ni mejora universal demostrada.

# 0.145 · Continuidad de la preferencia exterior/interior

18 de noviembre de 2026. Bloque MP2 de la matriz integral; sigue abierto.

## Cambio

Antes, un compañero observado en la franja y=12–16 (o 48–52) hacía desaparecer la preferencia de complementariedad inmediatamente. Ahora se conserva hasta 0,6 segundos desde la última clasificación clara, exclusivamente en esa franja y con el mismo compañero, lado, sistema y poseedor. La ambigüedad no renueva el plazo. Una ocupación claramente contraria cambia la preferencia inmediatamente.

Se revalidan en cada consulta la observación reciente, espacio disponible, ocupación, orientación y conexión de pase. No se mantiene ante presión, memoria antigua o conexión bloqueada. Se limpia al asumir apoyo/equilibrio/cobertura, recibir un destino bloqueado, cambiar sistema, reiniciar o perder posesión. Se usan campos escalares para conservar la independencia de las instantáneas. La preferencia sigue siendo blanda: el reparto colectivo puede elegir otro destino. No se congela al jugador ni se garantiza una recepción.

## Verificación

Diez scripts pasan: flank_stability, flank_systems, flank_connection, flank_complement, formation_selection, continuity, offball_arrow_lifecycle, positional_matrix, balance_distance y null_support_focus. La nueva prueba cubre cinco sistemas × dos equipos × dos lados: retención acotada, cambio inmediato, presión, ocupación, memoria antigua, instantánea, órdenes, cambio de sistema y pérdida. Falla como se espera en 0.144 por desaparición de preferencia en la franja intermedia.

Comparación reproducible: `node tests/flank_systems_audit.cjs <html>`. Cuatro simulaciones de 30 s por versión, sistemas 4-4-2/3-5-2, ambos equipos iniciales, semilla 73. Datos completos en data/flank-stability-145.json.

| Indicador | 0.144 | 0.145 |
|---|---:|---:|
| Muestras | 171 | 169 |
| Muestras agrupadas | 30 | 27 |
| Parejas próximas acumuladas | 262 | 256 |
| Muestras estrechas | 2 | 2 |
| Pases | 119 | 116 |
| Cambios de posesión | 14 | 13 |

Solo cambia la trayectoria 4-4-2 con inicio rojo: agrupadas 6/44 → 3/42, pases 34 → 31 y cambios 4 → 3. Muestra pequeña, sin atribución causal de mejora táctica general. No prueba solución de concentración, recepción efectiva en secuencia completa, partidos reales ni Safari.

## Siguiente entrega

Verificar recepción efectiva tras un cambio de orientación y complementariedad, incluyendo un contracaso con cierre de la línea. Después avanzar a las conexiones interiores MP3. La matriz completa MP1–MP11 sigue en ROADMAP.md.

# 0.53.1 — Investigación de destinos intermedios

21-10-2026. Base: `codex/fase-manager-0.53.1-resume@953855d`. Main remoto comprobado en `82c6c02`. Se leen los cuatro documentos solicitados y los informes de relevo posteriores antes de modificar código. Se crea un worktree limpio; otra copia antigua con cambios preparados se conserva intacta. El motor de la rama continúa siendo e28, propuesta no aceptada. No se inicia 0.54.

## Hipótesis y alcance

Los experimentos previos no justifican relajar presión ni activar un relevo. Este control pregunta si faltaban destinos capaces de conciliar ambas funciones sin cambiar las guardas. Desde cada proyección de contacto original se examinan primero el destino original y después tres puntos, al 75 %, 50 % y 25 % del recorrido desde el destino defensivo propuesto hacia ese contacto. Para cada contacto se examina primero su extremo, antes de sus interpolaciones; se conserva la primera alternativa con la máxima ganancia encontrada. El extremo se calcula con la misma fórmula interpolada: puede introducir redondeo de coma flotante respecto a la coordenada original. Un cambio de hash por sí solo no acredita una conducta diferente. La discretización es exploratoria; no es un optimizador exhaustivo ni demuestra imposibilidad si no encuentra una solución.

El generador `scripts/evaluate_compromise_targets.cjs` solo amplía los destinos. Conserva las condiciones de visión, amenaza inmediata, ayuda observada, órdenes, disputa próxima, acceso estimado del presionante y pase sin respaldo. No introduce comunicaciones, información privada, preparación ficticia, cambios de física, portero ni ataque. No modifica index.html. Las referencias de 0.52/0.53/e28 se reutilizan con comprobación de hashes y configuración; no se presentan como ejecuciones nuevas.

## Verificación incremental

Antes del control pasan tres entradas sobre la base: presión, revisión y relevo demorado. En copia aislada con la fuente experimental pasan siete entradas: presión, revisión, trayectoria, defensa contextual, amenazas simultáneas, órdenes sin balón y coordinación defensiva. `data/compromise-targets-checks.json` conserva salidas y hash de la fuente. No es una batería completa del motor experimental.

La nueva prueba `tests/compromise_targets.cjs` compara base y control en 64 decisiones espejo. Comprueba estado y semilla intactos, mantenimiento de elecciones anteriores, ganancia física de corredores y vetos de acceso/disputa. Obtiene seis elecciones frente a cuatro: dos adicionales. Son hipótesis locales con destino fijo, no recuperaciones ni secuencias autónomas. La prueba de trayectoria preexistente contrasta 60 contactos y 84 ausencias de contacto con update real; esto tampoco acredita utilidad colectiva.

Regresión nueva completa de la base sin modificar, ejecutada en copia aislada: **59/59 entradas PASS** (58 CommonJS y Python con tres casos), con hashes de archivos y motor comprobados. La nueva entrada de destinos intermedios pasa aparte tras generar los informes: **60 entradas verificadas incrementalmente**, no una batería completa de 60 sobre la fuente experimental. Las siete comprobaciones experimentales se registran por separado. No se realiza una prueba visual nueva en Safari/iOS.

## Evaluación y límites

Los resultados completos quedan en `data/compromise-targets-v0531.json`; el comando `--verify` comprueba procedencia y produce agregados. Las 76 configuraciones existentes se simulan de nuevo para el control, con oposición reactiva y el protocolo común. Son exploratorias y ya conocidas, no una reserva nueva de aceptación. Se conservan cuatro reejecuciones pasivas adicionales, base/control para pase/202 del equipo 0 y tiro central/101 del equipo 1, en `data/compromise-targets-traces.json`. La instrumentación tiene que conservar las métricas y estados de la evaluación sin traza.

Las guardas de llegada son estimaciones locales y no una prueba de presión eficaz a lo largo de una posesión. Los tres rayos no equivalen a toda la portería ni a todas las trayectorias. Sin mejora dinámica suficiente, ampliar elecciones locales no justifica aceptar el motor. La búsqueda está además limitada por el filtro previo de contactos cercanos y por las hipótesis de tiro inmediato existentes: un resultado negativo solo se refiere a esta receta.

## Resultado y decisión

76 ejecuciones nuevas del control: **32 goles y 77 tiros concedidos**, exactamente los de e28; las referencias conservadas tienen 28/74 (0.52) y 26/85 (0.53). Las 76 configuraciones conservan todas las métricas registradas: exposición con portero 45,3143 s equivalentes, opciones de pase × tiempo 184,70, tiempo en rango de tentativa 20,05 s. Solo cambia un hash de posiciones finales, equipo 1/central/101. No hay mejora ni deterioro observado de marcador o indicadores frente a e28; tampoco se demuestra equivalencia táctica general.

Las cuatro trazas nuevas coinciden con sus resultados sin traza. En equipo 0/pase/202 base y control conceden 1 gol, sin intercepciones; sigue sin recuperarse el bloqueo útil de 0.53. En central/101 ambos conservan el control defensivo del remate; las muestras de los cuatro protagonistas y eventos son iguales, aunque el hash final completo es distinto. No se atribuye a esa diferencia periférica un beneficio que no aparece en los indicadores.

Se descarta incorporar la ampliación: dos opciones locales adicionales no resuelven el problema de selección durante el juego. Los resultados adversos anteriores permanecen intactos. Próximo problema acotado: investigar cuándo se pierde la preparación espacial útil **antes** de que el tiro inmediato resulte bloqueable, comparando continuidad de presión y cobertura durante posesiones; sin volver a introducir una preparación ficticia rival ni ajustar demoras para rescatar un gol. Requiere una hipótesis nueva y comprobable, no más densidad de esta misma búsqueda ni una afirmación de imposibilidad global.

## Reproducción

```bash
node tests/compromise_targets.cjs
node scripts/evaluate_compromise_targets.cjs /tmp/compromise-targets-v0531.json
node scripts/evaluate_compromise_targets.cjs --verify /tmp/compromise-targets-v0531.json
node scripts/evaluate_compromise_targets.cjs --traces /tmp/compromise-targets-traces.json
```

No se integra el control en main ni en index.html. La investigación continúa dentro de 0.53.1; A4/A7 siguen abiertos.

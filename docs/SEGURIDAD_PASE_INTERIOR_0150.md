# Fase Manager · 0.150 candidata · Seguridad adaptativa del pase interior (23/11/2026)

## Objetivo de comportamiento
Avanzar desde el bonus uniforme de la 0.149 a una **preferencia modulada por riesgo percibido**, sin introducir pase obligatorio ni cambiar las funciones de los otros sistemas. La bonificación no se basa en rivales ocultos, usa el riesgo de la línea y el espacio del receptor que el propio pasador percibe.

## Cambio en motor real
`index.html`: `midfielderPassPreference()`, aplicada solo a pase pivote (puestos 5/6) → mediapunta (puesto 7) en 4-2-3-1:
- Requisitos originales de observación fresca, sin anticipación, distancia 8–30, progresión 6–28 y espacio del poseedor >=4 permanecen.
- Con riesgo de línea >2 o espacio del receptor <6: **sin bonificación**.
- Con riesgo <=1 y espacio del receptor >=6: bonus **+2**.
- Con 1 < riesgo <=2: bonus **+1**.
- Nunca se fuerza el pase y no se anulan las valoraciones existentes de alternativas, conducción ni las reglas de fuera de juego.

Este cambio es más conservador que 0.149 (bonificación +2 incluso con riesgo entre 2 y 3, espacio de 5 a 6). Una política más conservadora no implica mayor calidad global: podría suprimir una oportunidad útil. La mejora es **de criterio de seguridad contextual**, y su efecto sobre recepción y progresión queda por validar.

## Estrategia de integración
Rama `codex/fase-manager-0.150-contextual-mid-safety` derivada exactamente de candidata 0.149 `522c9f0`. No se mezcla con investigación anterior de PR #2 ni se modifica `main@14ed39d` (0.148 estable). La revisión de 0.150 se dirigirá contra la rama de 0.149, pues depende del cambio previo; no hay promoción automática a main.

## Validación prevista
- `tests/mid_pass_preference.cjs`: nuevos contracasos (riesgo intermedio, riesgo limítrofe y receptor con poco espacio), más espejo de equipos y pivotes.
- `tests/mid_choice_ablation.cjs`: 160 decisiones emparejadas con bonus variable frente a cero.
- `tests/mid_pass_outcome_0149.cjs`: 32 pares con primer contacto y golpeo.
- `tests/mid_pass_opposition_0149.cjs`: 48 pares con defensa reactiva de campo cerca del receptor, trayectoria y alternativa.
- `tests/mid_fixed_horizon.cjs`: comparación de resultados autónomos con archivo 0.149 base; además regresiones de decisiones, formación, conservación y continuidad.

**Puerta**: solo se considera estable cuando el nuevo criterio tiene pruebas ejecutadas y no muestra degradaciones significativas de posesión y progresión frente a 0.149 en más contextos. Tests PASS no equivalen automáticamente a mejora futbolística.

## Siguiente bloque funcional
Tras esta corrección puntual, dar prioridad a MP4 (profundidad y apoyos en sistemas adicionales) en una rama separada, conservando la matriz aportada por el usuario y la evaluación de defensa/transiciones de MP7–MP9. No repetir indefinidamente la misma muestra de cuatro u ocho escenarios.

# 0.149 — Preferencia contextual pivote → mediapunta (candidata, 23/11/2026)

## Motivación y evidencia
El diagnóstico MP3 realizado sobre 0.148 (GitHub Actions `45108837889`, rama de investigación) detectó en el escenario azul/pivote 6 dos evaluaciones de oportunidad perceptiva tanto con la regla de apertura del mediapunta activada como desactivada, pero uno frente a cero pases recibidos por el mediapunta. La diferencia no se explica únicamente por falta de percepción. No se ha demostrado que un pase al mediapunta sea siempre mejor que otras alternativas.

## Implementación en motor
En `index.html`, `chooseAction` incorpora `midfielderPassPreference` que añade **solo +2 puntos** al valor ya calculado de una opción de pase hacia el mediapunta en **1-4-2-3-1** cuando:
- El poseedor desempeña una de las dos funciones de pivote (puestos 5/6) y el receptor el puesto de mediapunta (7).
- El receptor está observado directamente y no se anticipa su posición mediante una carrera extrapolada.
- La progresión real es 6–28 unidades, distancia de pase 8–30; el receptor es visible.
- La línea percibida tiene riesgo ≤3, espacio percibido del receptor ≥5 y el poseedor dispone de espacio ≥4.
- La exclusión por fuera de juego sigue realizándose antes de evaluar esta preferencia.

No se crea pase obligatorio, no se desactiva conservación ni conducción, no se retocan los otros sistemas, ni se omiten preparación corporal, física de golpeo, fuera de juego o selección por oposición. El resto de opciones conserva su puntuación. Se usa la percepción de la situación, no la posición de un adversario oculto.

## Verificación
`tests/mid_pass_preference.cjs`: casos espejo (dos equipos × dos pivotes), conexión segura y casos contrarios por memoria, extrapolación, cambio de receptor, presión sobre el poseedor, presión sobre receptor, bloqueo, rango y visibilidad, y otro sistema.

`tests/mid_fixed_horizon.cjs`: simulación autónoma de ocho escenarios por motor con horizonte uniforme y censura explícita de las continuaciones. El workflow `.github/workflows/mid-pass-0149.yml` compara **main 0.148** contra **candidato 0.149** y ejecuta regresiones dirigidas. No exigir como aserción que una variante marque más goles o complete más pases; registrar los efectos desfavorables.

**Estado inicial**: implementación de código publicada en rama, aceptación condicionada a CI. No fusionar automáticamente ni declarar mejora táctica general hasta examinar resultados y contracasos.

## Pendientes
- Identificar durante ejecución la opción best/progress/safety y decisión finalmente tomada; un cambio en el marcador de pases no demuestra causa individual.
- Ampliar semillas, rivales y otros momentos; evaluar conservación, progresión, protección tras pérdida y tiempos de recepción.
- MP3 y MP11 continúan abiertos, así como MP2 y validación Safari/iPhone.

## Contención de cambios
La rama de entrega 0.149 sale de `main@14ed39d` (0.148), **sin fusionar** los experimentos y documentos no aprobados de PR #2. Conserva investigación anterior en su propia rama y protege `main`.

# SkillCorner: primera muestra y control de calidad

Fuente y reconocimiento: SkillCorner Open Data, https://github.com/SkillCorner/opendata. Repositorio bajo MIT; conservar aviso de copyright y licencia de la fuente. No se redistribuyen aquí archivos originales de tracking.

Selección previa al análisis: los tres primeros partidos cronológicos del catálogo descargado. Desarrollo: 1874553 Brisbane–Adelaide (23/11/2024), 1886347 Auckland–Newcastle (30/11/2024). Reservado: 1899585 Auckland–Wellington (07/12/2024). El tercero se ha descargado y calculado su hash, pero no se han analizado sus trayectorias ni fases.

Descargados doce archivos: metadatos, tracking extrapolado, eventos dinámicos y fases para cada partido. Huellas SHA-256 y tamaños en data/skillcorner-import.json. Reproducción: `python scripts/import_skillcorner.py DIRECTORIO_RAW data/skillcorner-import.json`. Primera ejecución detectó periodos nulos en tracking; corregida la ordenación de periodos, conservando los registros nulos en el recuento de calidad. El verificador LFS se añadió durante la primera descarga: los archivos ya presentes no se revalidan contra el puntero remoto, solo se calcula su SHA-256. No afirmar integridad remota verificada para esta descarga.

## Resultado inicial

- 1874553: 60.301 registros, 973.368 posiciones de jugadores; 564.001 marcadas como detectadas (57,94 %).
- 1886347: 59.061 registros, 956.076 posiciones; 566.778 detectadas (59,28 %).
- Ambos incluyen primera y segunda parte; registros sin periodo/posesión no implican juego activo.
- Métricas del proveedor agrupadas por create, finish, chaotic, build_up, direct, quick_break, transition y set_play. No son equivalentes automáticos a nuestras fases tácticas.
- Anchura inicial mediana declarada por el proveedor: create 47,61/45,47; chaotic 34,24/33,60. No usar estos números como parámetros hasta verificar definición de jugadores incluidos y normalización. No compararlos directamente con las métricas Metrica de diez jugadores de campo.

## Siguiente evaluación

Seleccionar ventanas continuas de juego con identidad y observación suficientes; medir separación de líneas, distancia a referencia, duración de vacantes y retorno. Comparar detectados frente a extrapolados y registrar exclusiones. No tratar coordenadas extrapoladas como observación independiente. Reservar el tercer partido para validar parámetros sin ajustarlos después de ver sus resultados.

Este paso descarga y audita datos; NO entrena un modelo, no mide aún tiempos de retorno ni demuestra mejora del motor. La 0.87 de compensaciones sigue local y separada de esta evidencia; web en 0.86. No se ha usado StatsBomb.

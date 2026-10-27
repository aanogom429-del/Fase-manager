# Seguimiento local de salidas y retornos

Fuente: SkillCorner Open Data, https://github.com/SkillCorner/opendata. Véase SKILLCORNER_ESTUDIO.md para selección previa, huellas de archivos y licencia MIT. Solo se analizan los dos partidos de desarrollo; 1899585 permanece reservado.

## Método reproducible

`python tests/skillcorner_returns.py`

`python scripts/skillcorner_returns.py DIRECTORIO_RAW data/skillcorner-returns.json`

Ventanas de 20 s en fases build_up/create del proveedor; posesión del mismo equipo en las 21 muestras a 1 Hz. Cohorte fija de al menos cuatro compañeros de campo detectados en todas las muestras. No se interpolan posiciones. La referencia de cada jugador es la mediana de sus primeras cinco posiciones relativas al centroide de esa cohorte. Salida: alejamiento >8 m en dos muestras consecutivas. Retorno: <=4 m en dos muestras consecutivas. Umbrales de exploración, no parámetros aprendidos del partido. El criterio comprueba muestras a 1 Hz, no detección continua en cada fotograma.

## Resultados

| Partido | Candidatas | Admitidas | Posesión inestable | Cohorte insuficiente | Salidas | Retornos observados | Posibles ocupaciones |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1874553 | 25 | 3 | 13 | 9 | 7 | 2 | 0 |
| 1886347 | 15 | 5 | 4 | 6 | 14 | 1 | 2 |

No faltaron fotogramas en las muestras solicitadas. Los 18 episodios sin retorno observado están censurados por el final de ventana: no son 18 fallos de retorno. Posible ocupación significa que otro miembro de la cohorte estuvo a <=4 m de la referencia durante dos muestras antes del retorno/final. Puede haber estado allí previamente: no identifica intención ni demuestra compensación. Las referencias son locales y móviles; no son puestos tácticos ni líneas identificadas. No se mide todavía salida a una línea avanzada ni cobertura entre líneas distintas.

## Decisión

Cuatro pruebas sintéticas superadas: retorno, censura, salida transitoria y posición estable. Análisis ejecutado sobre ambos archivos reales. La escasa muestra no justifica calibrar duración ni distancia de retorno en el juego. No cambiar automáticamente 0.87 a partir de estos datos. Próximo trabajo: revisar las ocho ventanas, controlar ocupación previa y relacionar posiciones con líneas/funciones, ampliar ventanas sin degradar la calidad y comparar métricas equivalentes del motor. No inspeccionar el partido reservado durante el ajuste.

Web sin cambios (0.86); las modificaciones locales de 0.87 se conservan separadas. No se ha entrenado un modelo ni demostrado mejora colectiva.

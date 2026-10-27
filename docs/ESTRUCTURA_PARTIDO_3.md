# Estructura con balón — contraste con otro partido real

## Fuente y alcance

Metrica Sports, Sample Game 3: https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_3
Reconocimiento expreso a Metrica Sports. Datos públicos anonimizados; no se infieren nombres de equipos. Es un partido distinto de los Sample Games 1 y 2 usados previamente. Se descargaron seguimiento, eventos y metadatos completos; se analizó **solo la primera parte**, 69.661 fotogramas a 25 Hz (46:26,44). No es observación en directo ni entrenamiento automático.

Integridad verificada contra los blobs de la fuente:

- metadata.xml: `74b55a80f6aeeb8f8df7fd26e4b3a94e2cc1738d`
- events.json: `992b4cb502f0b0bc1244174f014f3f7ecb6d38ef`
- tracking.txt: `7062b7ceaa44d53345a4625b8f447efc74895b1d`

El resultado incluye SHA-256 de los archivos. Campo 105 × 68 m según XML. Identidad, equipo y portero proceden del XML; no se asignan por proximidad al balón. En 574 pases con origen disponible, error entre origen anotado y posición del pasador: mediana y percentil 90 redondeados a 0,000 m. Esto verifica alineación, no precisión independiente del proveedor.

## Selección y métricas

Ventanas consecutivas no solapadas de 5 s dentro de cadenas de eventos PASS/CARRY del mismo equipo, con separaciones máximas de 1 s. Otros eventos cortan la cadena. Seis muestras por ventana a 1 Hz; todos los jugadores de campo y balón deben tener coordenadas finitas. No se selecciona según resultado favorable. 203 ventanas, ninguna excluida por datos incompletos. No representan toda la posesión ni todas las fases tácticas: la selección favorece circulación/conducción anotada. No clasifica iniciación, confort o superación.

Partición temporal declarada antes de calcular resultados: 150 ventanas antes de 30:00 para desarrollo y 53 posteriores de contraste. Es el mismo partido, no validación independiente; el contraste ya se ha inspeccionado y no debe reutilizarse como prueba ciega de parámetros nuevos.

| Medida (mediana de ventanas) | Desarrollo | Contraste |
|---|---:|---:|
| Anchura de los diez jugadores de campo | 57,96 m | 53,92 m |
| Profundidad de los diez jugadores de campo | 37,06 m | 35,54 m |
| Distancia media al compañero de campo más cercano | 13,09 m | 12,65 m |
| Candidatos geométricos de seguridad detrás del balón | 1,33 | 1,67 |
| Desplazamiento individual residual en 5 s | 5,80 m | 5,88 m |
| Inversiones del orden lateral por ventana | 1 | 2 |

Anchura/profundidad son promedios temporales del máximo menos mínimo. Seguridad: compañero de campo entre 3 y 25 m del balón y más de 2 m por detrás, según sentido inferido del lado del portero; no comprueba línea de pase, perfil ni presión. Recuentos fraccionarios son medias temporales, no jugadores fraccionados. Residual: desplazamiento neto individual tras descontar la traslación del centroide; no es distancia recorrida, velocidad instantánea ni error respecto a un puesto ideal. Inversiones laterales: pares separados más de 2 m al inicio y final que intercambian orden; no significa necesariamente desorden.

Regresión por el origen de desplazamiento del centroide respecto al desplazamiento del balón (no mediana de cocientes): longitudinal **0,259 / 0,307** y lateral **0,180 / 0,201**, desarrollo/contraste. No es una ley causal ni una consigna universal. Faltan estratificación por equipo/fase y análisis de retardos.

## Qué aporta al motor 0.85

1. La estructura real no está inmóvil: admite desplazamientos individuales y permutas. Congelar puestos no sería una solución suficiente.
2. La traslación colectiva es menor que la del balón en estas ventanas. En el motor, `possessionShape` usa `ballDepth + offset` (ganancia longitudinal objetivo 1), y `structureWeight` llega a 1 tras 11 s de posesión para jugadores no exceptuados. Esto desplaza el destino estructural un metro por metro de balón, antes de límites y excepciones. **Es una hipótesis concreta de sobrerreacción, no una comparación ya validada de trayectorias simuladas.** El seguimiento inicial de 0,35 queda sustituido al completar la mezcla.
3. La asignación de dos seguridades se recalcula por profundidad actual y excluye apoyos/receptor. Puede cambiar de identidad: conviene medir permanencia y distancia al puesto antes de tocar sus umbrales.
4. Próximo ajuste propuesto: centro de bloque con respuesta amortiguada al balón, referencias por sistema relativas a ese centro y persistencia temporal de las funciones de apoyo/seguridad. Comparar antes/después con estas mismas métricas y escenarios espejo, sin imponer 0,259 como constante universal.

**No se ha modificado el motor ni publicado una 0.86 en este paso.** La web permanece en 0.85. Se establece una referencia medible de otro partido, en lugar de afirmar que el simulador ya ha aprendido sus patrones. No se puede inferir orientación corporal ni compenetración solo a partir de estas coordenadas.

## Reproducción

Descargar los tres archivos de la fuente y nombrarlos metadata.xml, events.json y tracking.txt en un directorio local. Ejecutar:

```sh
python scripts/analyze_game3_structure.py RUTA_DATOS data/game3-structure.json
python tests/game3_structure.py
```

No se incluyen los 53 MB de tracking en el repositorio; el código, los resultados derivados y las huellas permiten repetir el análisis. El análisis completo de la segunda parte y el contraste simulado quedan pendientes.

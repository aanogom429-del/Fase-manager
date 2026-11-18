# Recepción exterior tras cambio de orientación · motor 0.145

## Resultado

40 casos controlados superados: cinco sistemas × dos equipos × dos lados × conexión abierta/cerrada. En los 20 casos abiertos el lateral/carrilero recibe mediante la actualización ordinaria del balón y jugadores. En los 20 cerrados el defensor intercepta el pase intentado deliberadamente. No se llama a capture para imponer el resultado.

## Método reproducible

Ejecutar `node tests/flank_reception.cjs`. Datos: data/flank-reception-145.json. Semilla 73. La prueba prepara posiciones y observaciones recientes para aislar la relación exterior; el compañero está interiorizado. Obtiene la preferencia de amplitud del distribuidor y comprueba aproximación física mediante advancePlayer durante un segundo con reloj progresivo. El resto del equipo no se actualiza en ese segundo preparatorio. Después ordena un pase raso transversal desde el otro lado y ejecuta update a 120 Hz con movimiento colectivo, orientación, trayectoria, contactos y reglas ordinarias.

El receptor se desplaza entre 3,60 y 5,48 unidades durante la preparación. La resolución del pase sucede entre 55 y 104 pasos de simulación. Los casos abiertos comprueban posesión del receptor previsto, tiempo de control positivo y prohibición de pase automático inmediato durante ese control. Los cerrados comprueban que la línea percibida pasa de riesgo <=3 a >3, se descarta la complementariedad y un rival intercepta el intento deliberado.

También pasan open_reception, moving_reception y flank_stability. No hay modificación del motor ni aumento de versión: estas pruebas verifican capacidades de 0.145.

## Límites y hallazgo pendiente

La jugada y el pase son seleccionados por el ensayo, no por chooseAction. La aproximación inicial usa el distribuidor y la locomoción reales, pero no una secuencia autónoma completa de los 22 jugadores. Por ello no acredita selección oportuna del cambio de orientación en partido, superioridad general de la regla, recepción aérea ni solución de concentración.

Durante la aproximación, la orientación corporal puede dejar el destino exterior fuera del campo visual y cancelar la preferencia antes del pase, aunque la línea siga despejada. El test cerrado no atribuye exclusivamente al defensor esa cancelación: comprueba por separado el aumento del riesgo y la intercepción efectiva. Queda pendiente estudiar esa continuidad perceptiva sin conceder información de rivales ocultos.

MP2 continúa abierto para selección autónoma, mantenimiento útil de la función y variedad de situaciones. Se avanza al siguiente incremento funcional MP3: coordinación de doble pivote y conexiones interiores; no esperar a declarar cerrado todo MP2 para continuar el resto de la matriz.

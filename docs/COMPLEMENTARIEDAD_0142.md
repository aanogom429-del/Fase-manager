# 0.142 · Complementariedad local de banda

Primera regla evaluable de la matriz del usuario para 4-3-3, 4-2-3-1 y 3-4-3. Un lateral/carrilero sin función prioritaria considera al atacante del mismo lado más próximo, recién observado (<=0,25 s), a una diferencia longitudinal <=12 del destino base. Usa ubicación actual observada, no el costado nominal.

Si el atacante está abierto (y<=12 o y>=52), ofrece interior (y20/44). Si está dentro (y16–28 o y36–48), ofrece amplitud (y8/56). La alternativa debe ser visible, tener espacio percibido >=5 y no coincidir a menos de 6 con otro compañero conocido. Sin observación reciente, con presión/ocupación o fuera de estos contextos, se conserva la valoración anterior. No se consulta posición oculta de rivales.

Es una preferencia adicional en el reparto de destinos, no una orden: la separación colectiva y el espacio alrededor del poseedor pueden prevalecer. No cambia x, fuera de juego ni posiciones físicas; conserva demora y giro. Apoyos, equilibrio, relevos y destinos bloqueados por recepción/órdenes/pared quedan excluidos. El inspector registra el motivo. No se obliga al extremo a moverse; el ajuste lo realiza el lateral/carrilero al interpretar su posición. No implementa todavía la complementariedad de medios exteriores del 4-4-2 ni los interiores del 3-5-2.

## Validación

Nueva flank_complement: doce combinaciones de equipo, lado y sistema; alternativas interior/amplitud; cancelación por memoria antigua, compañero ocupante, presión e incertidumbre; prioridades, destino explícito y ausencia de teletransporte. Pasan también positional_matrix, formation_selection, offball_arrow_lifecycle, balance_distance, continuity, attack_space, space_search, null_support_focus y structural_supports (diez programas en total).

Cuatro simulaciones de 30 s por variante, 4-3-3, equipos iniciales azul/rojo, semillas73/101: ambas producen 174 muestras, 20 agrupadas, 204 observaciones de parejas próximas, una muestra estrecha y 14 cambios de posesión. Pases123→122. No hay mejora agregada de separación demostrada. Datos: data/flank-complement-142.json; reproducción con tests/equilibrium_spacing_audit.cjs y los dos index.html. No barrido global, partido real ni Safari.

Siguiente foco: permanencia/alternancia de funciones bajo cambios de orientación y evaluación de la línea de pase que realmente ofrece cada alternativa, sin sacrificar equilibrio. La matriz completa y los hitos A1–A7 siguen pendientes.

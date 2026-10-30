# 0.99 — Perfil durante el desplazamiento y preparación del golpeo

Corrección solicitada por observación del usuario, 30 de octubre de 2026.

## Cambios

- Los jugadores sin balón mantienen una orientación a un máximo de 60° de la dirección del balón durante el desplazamiento con posesión o vuelo conocido. Se conserva la apertura específica de apoyos cercanos y receptores. El giro conserva la velocidad angular individual: puede haber un intervalo transitorio de mala orientación, pero no se vuelve instantáneamente.
- El repliegue permite carrera lateral/diagonal conservando referencia del balón. El coste angular de locomoción existente reduce la velocidad; no se mueve igual de rápido de espaldas que de frente.
- Los pases y tiros con el pie fuera del cono frontal de ±60° quedan en preparación. El jugador conserva el balón, frena y gira antes de ejecutar; puede perderlo mientras tanto. Ni pases cortos ni largos hacia atrás se convierten automáticamente en tacones.
- Centros, pases elevados, saques y envíos largos conservan sus atributos durante la preparación. Fuera de juego, dispersión y contador de pases se calculan al soltar el balón, no al decidirlo. El destino escogido no persigue mágicamente al receptor durante el giro.
- Una recuperación, reinicio o expulsión cancela la preparación correspondiente. Pausa y cambio al modo de decisiones conservan la acción pendiente y permiten continuar hasta el siguiente control.
- Los contactos aéreos de cabeza siguen su ruta existente: no se retiene un balón en el aire para girar. La biomecánica del cabeceo no se ha revisado aquí.

## Validación y límites

Pruebas específicas en ambas direcciones: repliegue efectivo con balón visible, giro angular acotado, pases traseros cortos/largos sin salida instantánea, liberación tras giro, cancelación por robo y pausa/reanudación de preparación. Las pruebas anteriores que iniciaban vuelos artificiales se han perfilado explícitamente; las que ejercitan saques y centros esperan ahora el giro cuando procede.

Regresiones ejecutadas: body_profile, orientation, continuity, simulation_entry, aerial_play, laws, keeper_distribution, anticipation_first_touch, defensive_chain, turn_movement y decision_storage, además de kick_orientation.

Umbrales heurísticos, no calibración biomecánica con tracking. La estimación de llegada sigue siendo aproximada y no simula toda la futura orientación al balón. No se ha validado visualmente en navegador real ni en iOS. No se afirma que todos los problemas del motor estén cerrados; continúan los siete bloques de la auditoría.

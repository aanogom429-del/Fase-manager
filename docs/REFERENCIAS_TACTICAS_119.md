# 0.119 · Puesto táctico independiente del dorsal

La formación, la línea posicional, las referencias de ataque y defensa y el pivote de salida del portero usaban el dorsal como índice. La referencia pasa a utilizar el puesto estable derivado del identificador del jugador, coherente con la creación de la plantilla y el reinicio de situaciones. También se conserva el elemento gráfico de orientación asociado al jugador.

El motor publicado tiene blob 7e6d86c66bda86aca5718aca1888db1eec47b31d, idéntico al candidato ensayado antes de la autorización de publicación.

Pasaron diez pruebas dirigidas: player_roles (ampliada a los cuatro sistemas y los dos equipos), formation_selection, possession_shape, structural_supports, line_structure, zonal_centre, defensive_roles, teammate_spacing_perception, onside_recovery e interior_outlet. No se ejecutó el barrido completo sobre 0.119.

El barrido global previo sobre 0.118 terminó con 101 de 114 programas aprobados y 13 fallidos, sin límites de tiempo. Los fallos fueron attacking_heights, automatic_lead_pass, cross_selection, offball, onside_decisions, organizing_memory, organizing_possession, organizing_progression, perceptual_memory, player_roles, reception, safe_outlet y shot_selection. La corrección de player_roles pasa ahora en la prueba dirigida. Queda pendiente la comprobación visual en Safari/iPhone.

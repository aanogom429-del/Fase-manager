# Intervención controlada sobre amplitud · 19-10-2026

Se ha implementado una variante experimental reproducible. El motor publicado continúa en 0.47.

La variante toma el lado del jugador desde su posición al comienzo de la posesión y limita a cuatro unidades el ajuste lateral de amplitud respecto al destino de seguimiento del balón. Elimina también la restricción que obligaba al buscador local a devolver a los jugadores de banda a un carril fijo. Apoyos seleccionados, equilibrio, profundidad y prioridades de órdenes mantienen sus reglas. La rama de ocupación del último tercio mantiene sus destinos por función, aunque el buscador local deja de imponer los límites de banda.

| Ventana reutilizada | Error original (m) | Error experimental (m) | Reducción |
|---|---:|---:|---:|
| a | 6,561 | 6,193 | 5,6 % |
| b | 2,334 | 2,243 | 3,9 % |
| c | 5,558 | 4,682 | 15,8 % |

Comparación emparejada desde velocidad inicial cero y el mismo snapshot 0.47. Cambian dos restricciones laterales relacionadas; no se atribuye el efecto a una sola. Se conservan la muestra, los roles aproximados y el protocolo previo. La referencia inmóvil sigue obteniendo menos error. Estos resultados no acreditan utilidad táctica ni generalización.

La prueba específica reproduce en ambos sentidos de ataque una colocación central que antes genera desplazamientos hacia carriles lejanos. La variante limita ese cambio inicial. El valor de cuatro unidades es provisional y no procede de una calibración con estos datos.

Verificación adicional ejecutada con la variante como motor del entorno de pruebas: support_persistence, offball y contextual_supports superadas. Incluyen conservación/restauración de asignaciones, órdenes, equilibrio, recepción, pérdida y tres simulaciones libres de 60 s con estados finitos y reloj en marcha. Estas comprobaciones no miden por sí solas la amplitud útil en posesiones largas.

## Decisión y siguiente paso

Mantener la variante en experimentación. El anclaje a la posición inicial puede reducir la amplitud necesaria durante posesiones largas: antes de integrarlo hay que comprobar y resolver ese caso, junto con jugadores que intercambian funciones. El mapeo de dorsales a puestos también permanece como limitación del contraste.

Siguiente paso: convertir el ajuste lateral en una adaptación contextual que permita abrirse progresivamente cuando falte amplitud, conserve posiciones útiles y respete cambios de función. Comprobar posesiones largas y una selección nueva de secuencias fijada antes de evaluar. Esta etapa no cierra A1/A2/A7 ni añade aprendizaje.

## Reproducción

```sh
node scripts/compare_relational_width.cjs
node tests/relational_width.cjs
```

El informe completo se guarda en data/relational-width-experiment.json. La variante se genera en memoria desde tests/fixtures/engine-v047.html; no cambia index.html. Fuente de las ventanas: Metrica Sports, Sample Game 2, con atribución y hashes en owner-holdout-windows.json.

# Cierre del diagnóstico de interrupciones — 0.97

Validación ejecutada: defensive_arrival, defensive_chain, defensive_relay y continuity PASS. Cuatro entradas seleccionadas; no batería completa ni navegador real.

30 octubre 2026. Se amplía defensive_arrival para registrar equipo defensor real, llegada estimada inicial, inicio/fin y estado de posesión al terminar cada episodio. El motivo interno del asignador tiene prioridad sobre la clasificación por estado externo. Esta última describe el estado observado: no reconstruye toda la secuencia causal de cada acción.

| Escenario (posesión inicial) | Equipo relevando | Inicio / fin (s) | Llegada estimada inicial | Cierre observado |
|---|---|---|---|---|
| 4-2-3-1, rojo, semilla302 | Rojo | 19,100 / 19,333 | 1,651 s | Cambio de presionante; azul aún posee |
| 3-5-2, azul, semilla301 | Rojo | 2,583 / 3,083 | 2,783 s | Rojo recupera posesión |

Los demás seis escenarios no activan relevos. Ninguno de los dos alcanza <=3 unidades del destino antes del cierre. La estimación supone el objetivo actual; no predice que esa situación durará ese tiempo. No comparar tiempo disponible retrospectivo con previsión como si el jugador conociera el futuro.

Conclusión: no hay evidencia aquí de otra cancelación injustificada que corregir. El relevo defensivo debe finalizar cuando el equipo recupera el balón. El cambio de presionante invalida la salida original; conservarla sin reevaluar su necesidad sería otra política, no una corrección demostrada. Se cierra esta ronda de diagnóstico sin ampliar radio ni duración mínima.

Regresión nueva: defensive_chain activa dos relevos y ejecuta capture real en ambos equipos/cuatro sistemas, comprobando nuevo poseedor y limpieza de todos los campos defSlotFor. defensive_arrival verifica que la recuperación observada no deja referencias defensivas y que las estimaciones son finitas. No cambia index.html ni la versión jugable.

Siguiente paso concreto: situaciones prescritas de centro y pase atrás, con defensa mantenida durante la trayectoria, para medir tiempo real de cobertura, accesibilidad de receptores y vacante final; comparar con/sin cadena sobre iguales estados/semillas y conservar contracasos. Esta es validación funcional pendiente, no motivo para seguir afinando la misma pareja de episodios. Los siete bloques del motor siguen abiertos.

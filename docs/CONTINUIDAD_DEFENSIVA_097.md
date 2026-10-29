# 0.97 — Margen de continuidad del relevo

PASS: defensive_relay, defensive_chain, defensive_block, continuity, decision_storage, simulation_entry y defensive_arrival. Siete entradas seleccionadas; no batería completa ni Safari/iOS real. git diff --check sin incidencias.

Diagnóstico reproducido sobre 0.96: en 4-2-3-1, inicio rojo/semilla302, finaliza por cambio de presionante a 19,333 s. En 3-5-2 inicio azul/semilla301, finaliza por distancia a 2,867 s. El registro de liberaciones instrumenta solo la copia de prueba: distingue cambio de presionante, prioridad, orden, regreso, distancia y destino ocupado; cierres externos al asignador no quedan causalmente clasificados y no deben inventarse.

Cambio acotado: radio para iniciar relevo sigue siendo 18; para continuar el mismo jugador→puesto pasa a 22. No impone duración mínima. El cambio de presionante, regreso, prioridad, orden, destino ocupado y nueva posesión siguen liberando el relevo. Margen heurístico no calibrado; puede prolongar un desplazamiento poco útil y requiere contraste adicional.

Comparación de ocho escenarios de 20 s con mismas semillas: el episodio 3-5-2 pasa de 17 a 30 pasos (0,283→0,500 s), distancia media 17,506→17,773. No se observa llegada a <=3 unidades. El episodio 4-2-3-1 conserva 14 pasos y termina por cambio de presionante; otros seis escenarios no activan relevos. **Mayor duración no demuestra mejor cobertura**; eficacia física sigue pendiente. El segundo cierre de 0.97 ocurre fuera del registro de liberación del asignador: no se atribuye una causa concreta.

defensive_relay añade prueba espejo: conservar a 18,2 unidades si ya estaba asignado, no iniciar allí uno nuevo; conserva límites/distancia, órdenes y liberación previos. Sin nuevos campos de estado. Próximo trabajo: identificar cierres externos y comprobar utilidad de iniciar el relevo según llegada estimada y duración disponible, con nuevos escenarios prescritos de centro/pase atrás. No seguir ampliando radios sin evidencia.

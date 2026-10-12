# Calcula tu Casa 2.0 · cobertura final del rediseño

Estado de esta rama: implementación UI/UX completa previa a revisión visual y sin merge a `main`.

| # | Herramienta | Ruta | Render | Variante visual principal | Estado |
|---:|---|---|---|---|---|
| 1 | Consumo aire acondicionado | /climatizacion/consumo-aire-acondicionado/ | Generic | Coste + escenarios | Completa |
| 2 | Consumo radiador eléctrico | /energia/consumo-radiador-electrico/ | Generic | Coste + escenarios | Completa |
| 3 | Termo eléctrico | /energia/termo-electrico/ | Generic | Métrica + desglose | Completa |
| 4 | Punto de rocío | /aislamiento/punto-de-rocio-moho/ | Generic | Métrica + estado | Completa |
| 5 | Transmitancia térmica | /aislamiento/transmitancia-termica/ | Especializada | Capas + métrica | Completa |
| 6 | Frigorías | /climatizacion/calculadora-frigorias/ | Especializada | Rango + métricas | Completa |
| 7 | Potencia eléctrica | /energia/potencia-electrica/ | Especializada | Escenarios | Completa |
| 8 | Consumo electrodomésticos | /energia/consumo-electrodomesticos/ | Especializada | Ranking + consumo | Completa |
| 9 | Suelo radiante | /climatizacion/suelo-radiante-tubo-circuitos/ | Especializada | Cantidades + circuitos | Completa |
| 10 | Ventilación vivienda | /energia/ventilacion-vivienda/ | Generic | Caudales + desglose | Completa |
| 11 | Factura eléctrica | /energia/simulador-factura-electrica/ | Generic | Importe + composición | Completa |
| 12 | Producción solar | /solar/produccion-placas-solares/ | Especializada | Producción + PVGIS | Completa |
| 13 | Radiadores | /climatizacion/potencia-radiadores-elementos/ | Generic | Elementos + potencia | Completa |
| 14 | Número de placas | /solar/numero-placas-solares/ | Especializada | Placas + cobertura | Completa |
| 15 | Coste calefacción | /energia/comparador-coste-calefaccion/ | Generic | Comparativa tabular | Completa |
| 16 | Reforma integral | /reformas/presupuesto-reforma-integral/ | Especializada | Escenarios + partidas | Completa |
| 17 | Reforma baño | /reformas/reforma-bano/ | Especializada | Escenarios + partidas | Completa |
| 18 | Reforma cocina | /reformas/reforma-cocina/ | Especializada | Escenarios + partidas | Completa |
| 19 | Amortización solar | /solar/amortizacion-placas-solares/ | Generic | Payback + evolución | Completa |
| 20 | Aerotermia | /energia/rentabilidad-aerotermia/ | Generic | Payback + comparación | Completa |
| 21 | Reformas energéticas | /reformas/comparador-reformas-energeticas/ | Especializada | Comparativa | Completa |
| 22 | Pintura | /reformas/calculadora-pintura/ | Especializada | Cantidades | Completa |
| 23 | Azulejos/baldosas | /reformas/calculadora-azulejos-baldosas/ | Especializada | Piezas + cajas | Completa |
| 24 | Suelo laminado | /reformas/suelo-laminado-tarima/ | Especializada | m² + paquetes | Completa |
| 25 | Rodapié | /reformas/calculadora-rodapie/ | Generic | Metros + piezas | Completa |
| 26 | Papel pintado | /reformas/calculadora-papel-pintado/ | Generic | Rollos + tiras | Completa |
| 27 | Iluminación lux | /energia/calculadora-iluminacion-lux/ | Generic | Lúmenes + luminarias | Completa |
| 28 | Ahorro LED | /energia/ahorro-bombillas-led/ | Generic | Ahorro + payback | Completa |
| 29 | Standby | /energia/consumo-standby/ | Especializada | Ranking + coste | Completa |
| 30 | Recarga vehículo eléctrico | /energia/recarga-coche-electrico/ | Especializada | Tiempo + coste | Completa |
| 31 | Batería solar | /solar/bateria-solar/ | Generic | Capacidad + estado | Completa |
| 32 | Pérdida térmica | /aislamiento/perdida-termica-vivienda/ | Especializada | Ranking + potencia | Completa |
| 33 | Deshumidificador | /energia/consumo-deshumidificador/ | Generic | Consumo + coste | Completa |
| 34 | Ahorro cambio ventanas | /aislamiento/ahorro-cambio-ventanas/ | Generic | Ahorro + payback | Completa |
| 35 | Hormigón | /reformas/hormigon-necesario/ | Especializada | m³ + sacos + coste | Completa |
| 36 | Mortero | /reformas/mortero-necesario/ | Generic | litros + sacos + coste | Completa |
| 37 | Ladrillos/bloques | /reformas/ladrillos-bloques-necesarios/ | Generic | piezas + paquetes | Completa |
| 38 | Impermeabilización | /reformas/calculadora-impermeabilizacion/ | Especializada | cantidad + envases | Completa |
| 39 | Depósito de agua | /reformas/tamano-deposito-agua/ | Especializada | capacidad + depósitos | Completa |

## Contratos preservados

- 39 rutas públicas sin cambios.
- Motores en `src/lib/calculators/` sin modificaciones.
- Catálogo, slugs y generador de rutas sin cambios.
- SEO estructural, AdSense meta, `ads.txt`, Search Console y páginas legales preservados.
- Procesamiento y excepciones PVGIS conservados.
- Formularios sin pasos obligatorios adicionales.
- `Siguiente decisión` usa exclusivamente rutas reales del catálogo.
- La herramienta recomendada como siguiente decisión se excluye del bloque genérico de relacionadas para evitar duplicidad.

## QA

La rama añade tests específicos de cobertura UI v2 para garantizar:
- 39/39 presentaciones visuales.
- 39/39 siguientes decisiones.
- destinos de navegación existentes;
- cobertura del shell compartido en GenericCalculator y todas las implementaciones especializadas;
- controles segmentados accesibles;
- Home con buscador protagonista e ilustración;
- orden correcto de resultado, siguiente decisión, publicidad, metodología y herramientas relacionadas.

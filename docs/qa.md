# QA — Expansión a 12 calculadoras

Fecha de revisión: 6 de octubre de 2026.

## Alcance

La rama `expansion-calculadoras-01` conserva las 8 calculadoras de la V1 y añade cuatro herramientas:

- suelo radiante: tubo y circuitos;
- ventilación mínima de vivienda (CTE DB-HS 3);
- simulador de factura eléctrica;
- producción de placas solares con PVGIS/JRC.

Solar pasa a ser indexable y entra en sitemap. Reformas continúa `noindex, follow` y excluido del sitemap.

## Tests

Se mantienen los 86 tests previos y se añaden pruebas de regresión para las cuatro calculadoras nuevas, además de adaptar las comprobaciones de catálogo/indexación a 12 rutas.

Ejecución real previa al cierre documental:

```text
npm test
127 tests
127 aprobados
0 fallidos
```

Las nuevas herramientas cubren como mínimo caso normal, mínimo, máximo razonable, cero, negativo, vacío, decimal con coma y caso manual conocido. También existen pruebas específicas de múltiples estancias y circuitos, filas CTE/equilibrado, mínimo fiscal editable, parámetros regulatorios centralizados, URL/JSON PVGIS y ausencia de claves privadas.

## Builds

Ejecución real previa al cierre documental:

```text
npm run build
28 páginas generadas

SITE_URL=https://example.com npm run build
28 páginas generadas
sitemap-index.xml generado
```

La CI final de esta rama sustituye el segundo comando por el dominio provisional real:

```bash
SITE_URL=https://calcula-tu-casa.pages.dev npm run build
```

El resultado final de ese HEAD debe quedar verde antes de revisión/merge.

## Verificaciones funcionales y normativas

- Ventilación: valores de HS 3 tabla 2.1 centralizados y revisados el 06/10/2026; se informa separadamente la extracción específica de cocción.
- Factura: referencias regulatorias comprobadas el 06/10/2026; precios de comercializadora nunca se obtienen ni ocultan en código.
- Solar: no se realizan llamadas AJAX a PVGIS porque la documentación oficial las rechaza por CORS; la consulta se abre en JRC y el JSON se procesa localmente.
- Suelo radiante: el máximo por circuito es un dato editable del diseño/fabricante, no una norma universal.

## Revisión visual humana

Pendiente de revisión final del PR en navegador real, especialmente:

- flujo de varias estancias en suelo radiante a 360 px;
- comprensión del equilibrado CTE y aviso de extracción de cocción;
- correspondencia de campos de factura con una factura real representativa;
- experiencia de abrir PVGIS, guardar/copiar JSON e importarlo;
- navegación e interlinking con 12 tarjetas;
- sitemap de producción con Solar incluido y Reformas excluido.

## Producción

La producción actual en `https://calcula-tu-casa.pages.dev/` no se modifica desde esta rama. El despliegue seguirá dependiendo del merge manual a `main`.

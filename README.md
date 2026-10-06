# Calcula tu casa

Proyecto de calculadoras para hogar, energía, climatización, aislamiento, solar y ahorro. La base V1 de 8 herramientas se amplía a 12 manteniendo la misma arquitectura. El sitio se genera de forma estática con Astro, Tailwind CSS 4 compilado y JavaScript vanilla. La mayoría de los cálculos se realiza localmente en el navegador y Calcula tu Casa no recibe ni almacena esos valores. En Solar, preparar la consulta no envía datos; solo al abrir voluntariamente el enlace oficial se envían las coordenadas y parámetros directamente a PVGIS/JRC, y el JSON de respuesta se procesa después localmente.

## Calculadoras publicadas

1. `/climatizacion/consumo-aire-acondicionado/`
2. `/energia/consumo-radiador-electrico/`
3. `/energia/termo-electrico/`
4. `/aislamiento/punto-de-rocio-moho/`
5. `/aislamiento/transmitancia-termica/`
6. `/climatizacion/calculadora-frigorias/`
7. `/energia/potencia-electrica/`
8. `/energia/consumo-electrodomesticos/`
9. `/climatizacion/suelo-radiante-tubo-circuitos/`
10. `/energia/ventilacion-vivienda/`
11. `/energia/simulador-factura-electrica/`
12. `/solar/produccion-placas-solares/`

Los hubs canónicos son `/energia/`, `/climatizacion/`, `/aislamiento/`, `/solar/` y `/reformas/`. `/calculadoras/` funciona como directorio global con buscador local sin sensibilidad a tildes. Solar ya contiene una calculadora real y es indexable. Reformas continúa `noindex, follow` y fuera del sitemap hasta publicar su primera herramienta.

## Desarrollo

Requiere Node 24 (el proyecto declara `>=22.12.0`).

```bash
npm ci
npm run dev
```

Pruebas:

```bash
npm test
```

Build:

```bash
npm run build
SITE_URL=https://calcula-tu-casa.pages.dev npm run build
```

Verificación combinada:

```bash
npm run check
```

La salida estática se genera en `dist/`.

## Arquitectura

- `src/lib/calculators/`: funciones matemáticas puras y validación.
- `src/lib/calculator-ui.mjs`: lectura de formularios y renderizado DOM.
- `src/lib/catalog.mjs`: catálogo, SEO, FAQ, fuentes, keywords e interlinking.
- `src/components/`: formularios reutilizables, resultados, metodología, fuentes, FAQ, breadcrumbs, relacionados y placeholders publicitarios.
- `src/layouts/CalculatorLayout.astro`: estructura común de las calculadoras y Schema.
- `src/pages/`: páginas estáticas, hubs, directorio, institucionales, legales y robots.
- `tests/`: pruebas matemáticas y consistencia del catálogo.

## SEO y sitemap

Cada calculadora incluye title, description, canonical cuando existe `SITE_URL`, breadcrumbs, H1, metodología, fórmula, ejemplo, limitaciones, fuentes, fecha de revisión, FAQ visible y herramientas relacionadas. El termo modela mezcla de agua y precio opcional; AC/radiador incluyen sensibilidad ±20 % de horas; la potencia eléctrica impone como suelo la mayor carga individual. La expansión añade suelo radiante geométrico, ventilación CTE HS 3, factura editable con parámetros regulados versionados y producción solar basada en PVGIS.

Se utiliza la integración oficial `@astrojs/sitemap`, que genera `sitemap-index.xml` y `sitemap-0.xml` cuando se construye con `SITE_URL`. `robots.txt` apunta al índice. Páginas legales pendientes y el hub sin herramientas `/reformas/` se excluyen del sitemap. `/solar/` vuelve a indexarse al disponer de contenido funcional.

## Variables de entorno

- `SITE_URL=https://DOMINIO`: origen HTTPS real, sin ruta. Necesario para canonical y sitemap de producción. La CI valida actualmente con `https://calcula-tu-casa.pages.dev`.
- `PUBLIC_CONTACT_EMAIL`: opcional durante desarrollo; debe configurarse con un email real antes de publicar la página de contacto.

No se deben guardar secretos en variables `PUBLIC_`.

## Cloudflare Pages

Configuración prevista:

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node: 24
- Variable de producción: `SITE_URL=https://DOMINIO`

El proyecto es estático y no necesita adaptador de Cloudflare.

## AdSense y CMP

La V1 **no carga anuncios reales**. `AdSlot.astro` reserva espacio después de resultados y metodología para minimizar CLS, sin publisher ID ni scripts publicitarios.

Antes de activar AdSense en el EEE debe configurarse una CMP certificada por Google, verificar aceptar/rechazar/configurar/revocar y actualizar la política de cookies según las tecnologías realmente cargadas. No se implementa una CMP falsa.

`ads.txt` no debe contener identificadores inventados; se añadirá la entrada exacta facilitada por AdSense cuando exista la cuenta.

## Datos legales pendientes

Las páginas legales permanecen `noindex` mientras falten datos esenciales. Sustituir:

- `[NOMBRE_TITULAR]`
- `[NIF]`
- `[DOMICILIO]`
- `[EMAIL_CONTACTO]`
- `[DOMINIO]`

Después debe revisarse la redacción legal contra la configuración real de alojamiento, CMP, publicidad, analítica y contacto.

## QA

La CI se ejecuta en push, pull request y manualmente mediante `workflow_dispatch`. Ejecuta `npm ci`, `npm test`, `npm run build` y un segundo build con `SITE_URL=https://calcula-tu-casa.pages.dev`.

Consulta `docs/qa.md` para el registro de verificaciones reales de la V1.

## Metodologías de la expansión

- **Suelo radiante:** estimación geométrica `L ≈ A/separación`, conexiones y margen; el máximo por circuito lo introduce el usuario y no se presenta como norma universal.
- **Ventilación:** CTE DB-HS 3, tabla 2.1, ventilación de caudal constante y equilibrado de admisión/extracción; valores normativos centralizados en `src/lib/config/ventilation-cte.mjs`.
- **Factura eléctrica:** precios comerciales introducidos por el usuario; tipos fiscales y referencias reguladas visibles, editables, versionadas y con fuentes BOE en `src/lib/config/electricity-bill.mjs`.
- **Solar:** PVGIS 5.3/JRC. Debido a la prohibición CORS de AJAX en PVGIS, la web genera la consulta oficial y procesa localmente el JSON que aporta el usuario, sin backend ni claves privadas.

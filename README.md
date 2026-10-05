# Calcula tu casa

V1 del proyecto de calculadoras para hogar, energía, climatización, aislamiento y ahorro. El sitio se genera de forma estática con Astro, Tailwind CSS 4 compilado y JavaScript vanilla. Los cálculos se realizan localmente en el navegador.

## Calculadoras V1

1. `/climatizacion/consumo-aire-acondicionado/`
2. `/energia/consumo-radiador-electrico/`
3. `/energia/termo-electrico/`
4. `/aislamiento/punto-de-rocio-moho/`
5. `/aislamiento/transmitancia-termica/`
6. `/climatizacion/calculadora-frigorias/`
7. `/energia/potencia-electrica/`
8. `/energia/consumo-electrodomesticos/`

Los hubs canónicos son `/energia/`, `/climatizacion/`, `/aislamiento/`, `/solar/` y `/reformas/`. `/calculadoras/` funciona como directorio global con buscador local sin sensibilidad a tildes. Mientras Solar y Reformas no tengan calculadoras publicadas se mantienen `noindex, follow` y fuera del sitemap.

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
SITE_URL=https://example.com npm run build
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

Cada calculadora incluye title, description, canonical cuando existe `SITE_URL`, breadcrumbs, H1, metodología, fórmula, ejemplo, limitaciones, fuentes, fecha de revisión, FAQ visible y herramientas relacionadas. El termo modela mezcla de agua y precio opcional; AC/radiador incluyen sensibilidad ±20 % de horas; la potencia eléctrica impone como suelo la mayor carga individual.

Se utiliza la integración oficial `@astrojs/sitemap`, que genera `sitemap-index.xml` y `sitemap-0.xml` cuando se construye con `SITE_URL`. `robots.txt` apunta al índice. Páginas legales pendientes y hubs sin herramientas (`/solar/`, `/reformas/`) se excluyen del sitemap.

## Variables de entorno

- `SITE_URL=https://DOMINIO`: origen HTTPS real, sin ruta. Necesario para canonical y sitemap de producción.
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

La CI se ejecuta en push, pull request y manualmente mediante `workflow_dispatch`. Ejecuta `npm ci`, `npm test`, `npm run build` y un segundo build con `SITE_URL=https://example.com`.

Consulta `docs/qa.md` para el registro de verificaciones reales de la V1.

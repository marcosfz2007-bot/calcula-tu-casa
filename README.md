# Calcula tu casa

Calcula tu Casa es un sitio estático de calculadoras para hogar, energía, climatización, aislamiento, solar y reformas. Mantiene el principio **«Calcula primero. Decide después»**: sin registro, sin teléfono, con fórmulas, fuentes, hipótesis y limitaciones visibles.

La mayoría de las herramientas calcula localmente en el navegador y Calcula tu Casa no recibe ni almacena esos valores. En la calculadora de producción solar, preparar la consulta no envía datos; solo cuando el usuario abre voluntariamente el enlace oficial se envían los parámetros necesarios directamente a PVGIS/JRC. El JSON que después se pega o selecciona se procesa localmente.

## Rutas publicadas

- `/climatizacion/consumo-aire-acondicionado/`
- `/energia/consumo-radiador-electrico/`
- `/energia/termo-electrico/`
- `/aislamiento/punto-de-rocio-moho/`
- `/aislamiento/transmitancia-termica/`
- `/climatizacion/calculadora-frigorias/`
- `/energia/potencia-electrica/`
- `/energia/consumo-electrodomesticos/`
- `/climatizacion/suelo-radiante-tubo-circuitos/`
- `/energia/ventilacion-vivienda/`
- `/energia/simulador-factura-electrica/`
- `/solar/produccion-placas-solares/`
- `/climatizacion/potencia-radiadores-elementos/`
- `/solar/numero-placas-solares/`
- `/energia/comparador-coste-calefaccion/`
- `/reformas/presupuesto-reforma-integral/`
- `/reformas/reforma-bano/`
- `/reformas/reforma-cocina/`
- `/solar/amortizacion-placas-solares/`
- `/energia/rentabilidad-aerotermia/`
- `/reformas/comparador-reformas-energeticas/`

Los hubs canónicos son `/energia/`, `/climatizacion/`, `/aislamiento/`, `/solar/` y `/reformas/`. Solar y Reformas tienen herramientas funcionales y son indexables.

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

La salida estática se genera en `dist/`.

## Arquitectura

- `src/lib/calculators/`: motores matemáticos puros y validación.
- `src/lib/config/`: datos externos/versionados y configuración compartida.
- `src/lib/calculators/heating-common.mjs`: conversión común de calor útil a energía comprada.
- `src/lib/calculators/investment-common.mjs`: payback acumulado y VAN.
- `src/lib/calculators/reforms-common.mjs`: rangos de presupuesto por mediciones y precios unitarios.
- `src/lib/config/reform-costs.mjs`: estructura común de partidas y política de precios de reformas.
- `src/lib/calculators/solar-pvgis.mjs`: integración/parser común de resultados PVGIS.
- `src/components/`: formularios, resultados, metodología, fuentes, FAQ, breadcrumbs, relacionados y placeholders publicitarios.
- `src/layouts/CalculatorLayout.astro`: estructura común, Schema y metadatos.
- `src/lib/catalog.mjs`: catálogo, SEO, FAQ, fuentes, keywords e interlinking.
- `tests/`: pruebas matemáticas, consistencia, privacidad y contratos UI.

No se introduce React, Vue, backend ni base de datos.

## Decisiones metodológicas de la expansión

### Radiadores hidráulicos

El factor térmico W/m³ y la potencia por elemento son datos del usuario. No existe un W/m³ normativo precargado. La potencia útil puede corregirse con un factor introducido por el usuario cuando exista una metodología o tabla del fabricante aplicable.

### Solar

El número de paneles usa producción específica `kWh/kWp·año` introducida manualmente o extraída del mismo JSON oficial de PVGIS usado por la calculadora de producción. No hay irradiación provincial inventada.

La amortización solar usa exclusivamente inversión, ayudas, producción, autoconsumo, precios, compensación, mantenimiento, degradación, crecimiento de precio y descuento introducidos por el usuario. No consulta subvenciones ni tarifas actuales.

### Calefacción y aerotermia

Todos los precios, rendimientos, SCOP y costes fijos son datos editables. El comparador obliga a producir la misma cantidad de calor útil con cada sistema. La rentabilidad de aerotermia no muestra payback cuando el ahorro anual no es positivo.

### Reformas

No se precargan `€/m²` nacionales ni factores provinciales. La configuración común define partidas, unidades y fuentes, mientras los precios unitarios bajo/central/alto los introduce el usuario a partir de presupuestos o una base apropiada a su ámbito.

La BCCA de la Junta de Andalucía se cita como base pública de referencia metodológica, pero sus importes no se trasladan automáticamente al conjunto de España.

### Reformas energéticas

El usuario introduce HDD manualmente. El modelo simplificado es:

```text
Ahorro térmico = (U inicial - U nueva) × superficie × HDD × 24 / 1000
```

Después se convierte a energía comprada según rendimiento o SCOP. Si `U nueva >= U inicial`, la herramienta no atribuye ahorro positivo.

## SEO, sitemap y privacidad

Cada calculadora incluye title, description, canonical con `SITE_URL`, H1, breadcrumbs, fórmula, metodología, ejemplo, limitaciones, fuentes, revisión, versión metodológica, FAQ visible, Schema e interlinking.

`@astrojs/sitemap` genera el sitemap cuando existe `SITE_URL`. Solar y Reformas se incluyen. Las páginas legales pendientes siguen excluidas/noindex.

La corrección de privacidad de PVGIS se mantiene: preparar la URL no envía datos; abrir voluntariamente la consulta comunica los parámetros directamente al JRC/PVGIS; Calcula tu Casa no recibe esos datos; el JSON importado se procesa localmente.

## Cloudflare Pages

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node: 24
- Producción actual: `https://calcula-tu-casa.pages.dev/`

## AdSense / CMP / analítica

Se conserva la metaetiqueta `google-adsense-account` de verificación incorporada en `main`. No se cargan scripts de AdSense, Google Analytics ni CMP, ni se activan cookies publicitarias.

## Datos legales y contacto

Las páginas de Contacto, Aviso legal, Privacidad y Cookies leen la configuración actual mediante `PUBLIC_CONTACT_EMAIL`, `LEGAL_OWNER_NAME`, `LEGAL_NIF`, `LEGAL_ADDRESS` y `SITE_URL`. No se mantienen placeholders legales en `src/`. Estas páginas continúan `noindex` y fuera del sitemap.

## QA

La CI se ejecuta en push, Pull Request y `workflow_dispatch`, con:

```bash
npm ci
npm test
npm run build
SITE_URL=https://calcula-tu-casa.pages.dev npm run build
```

Consulta `docs/qa.md` para el registro real de la rama de expansión.

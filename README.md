# Calcula tu casa

Primera entrega de los sprints 0 y 1 de la estrategia: Astro estático, Tailwind compilado y JavaScript vanilla. Dos calculadoras completas de consumo (aire acondicionado y radiador), inicio, catálogo, hubs, metodología y páginas informativas.

## Desarrollo

Requiere Node 24. Ejecutar `npm ci`, `npm run dev`. Verificación: `npm run check`. Producción: `npm run build`; salida `dist/`. Previsualización: `npm run preview`.

## Cloudflare Pages

Conectar este repositorio en Cloudflare Pages, rama `main`, comando `npm run build`, salida `dist`, Node 24. No requiere adaptador ni servidor. Configurar `SITE_URL` con el origen HTTPS real (sin ruta) en las variables del entorno de producción. `PUBLIC_CONTACT_EMAIL` es opcional; solo debe incluir una dirección que se quiera publicar. Nunca poner secretos en variables PUBLIC_.

Sin SITE_URL las páginas llevan noindex y no generan canonical ni URLs de ejemplo en el sitemap. Los entornos de preview deben omitir SITE_URL. Las páginas legales y el contacto permanecen noindex hasta completar su contenido y retirar expresamente esa marca. El sitio aún no se ha desplegado en Cloudflare.

## Arquitectura

- `src/lib/energy.mjs`: funciones puras, validación, constantes.
- `src/lib/energy-ui.mjs`: formulario y resultados mediante DOM; sin peticiones ni almacenamiento.
- `src/lib/catalog.mjs`: herramientas, valores ilustrativos y contenido específico.
- `src/components/`: formulario, tarjetas, espacios de anuncios inactivos.
- `src/layouts/Base.astro`: navegación, metadatos y pie.
- `src/pages/`: páginas prerenderizadas y sitemap.
- `tests/`: casos matemáticos verificables.
- `docs/estrategia-y-prompt-maestro.md`: documento aportado completo.

## Pendiente antes del lanzamiento público

Completar identidad del titular y textos legales de acuerdo con el tratamiento real, contacto y dominio. Validar el sitio en el dominio final. Este commit no activa publicidad, CMP, analítica, ads.txt ni Search Console; no se han inventado identificadores. La CMP se integra cuando se active AdSense, con comprobación de consentimiento y revocación.

El siguiente sprint añade termo, condensación, aislamiento y suelo radiante. Las 20 calculadoras del roadmap no se presentan como terminadas. Los enlaces públicos solo apuntan a herramientas existentes.

Consulta `docs/qa.md` para alcance, hipótesis y verificaciones.

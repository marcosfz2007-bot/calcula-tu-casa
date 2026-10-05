# QA — V1

Fecha de cierre técnico/hardening: 5 de octubre de 2026.

## Alcance

La V1 contiene ocho calculadoras funcionales, cinco hubs canónicos, directorio global con buscador local normalizado sin tildes, navegación responsive, páginas institucionales, legales con placeholders, Schema, interlinking, placeholders AdSense, sitemap oficial y CI. Solar y Reformas permanecen `noindex, follow` y fuera del sitemap hasta publicar herramientas reales.

## Tests definidos

`tests/calculators.test.mjs` mantiene los 8 casos base por cada calculadora:

1. normal;
2. mínimo;
3. máximo razonable;
4. cero;
5. negativo;
6. vacío;
7. decimal con coma;
8. caso manual verificable.

Son 64 pruebas base. El hardening añade 8 regresiones específicas en el mismo archivo: mezcla térmica del termo, precio opcional, coherencia de temperaturas, acristalamiento mayor que suelo, varios aparatos de potencia, sensibilidad ±20 % en aire acondicionado, sensibilidad ±20 % en radiador y límite superior de 24 h/día.

`tests/consistency.test.mjs` contiene 10 comprobaciones:

- exactamente ocho rutas canónicas;
- ausencia de duplicidades;
- retirada de la URL antigua del radiador;
- metadatos obligatorios y 5–7 FAQ;
- enlaces internos a herramientas existentes;
- categorías válidas y ausencia de ratings/reviews inventados;
- keywords presentes para el buscador local;
- hubs Energía/Climatización/Aislamiento indexables frente a Solar/Reformas noindex y fuera de sitemap;
- normalización de tildes/diacríticos del buscador.

`tests/ui-contract.test.mjs` añade 4 contratos de integración: Hub aplica `noindex`, reset de filas dinámicas, etiqueta/escape del menú móvil y enlace al sitemap condicionado a `Astro.site`.

Total definido tras hardening: **86 tests**.

## Verificación de ejecución

El workflow `Verify` del PR ejecuta obligatoriamente, sobre el HEAD de `fase-2-final`:

```bash
npm ci
npm test
npm run build
SITE_URL=https://example.com npm run build
```

El resultado del HEAD final se comprueba en GitHub Actions antes de fusionar.

## Build

El hardening no añade ni elimina páginas HTML: se mantienen 24 rutas generadas. Con `SITE_URL`, el sitemap excluye páginas legales pendientes y los hubs `/solar/` y `/reformas/`; sin `SITE_URL` no se enlaza ni genera sitemap de producción.

## Revisión visual

Pendiente de navegador real. La CI no sustituye una auditoría visual, WCAG ni Core Web Vitals. Antes del lanzamiento revisar al menos:

- 360 px y escritorio;
- menú hamburguesa, Escape y foco;
- inputs dinámicos de capas/aparatos;
- buscador con teclado;
- mensajes de error;
- ausencia de desbordamiento;
- posiciones reservadas para anuncios;
- canonical/Schema en el dominio final.

## Despliegue provisional

La V1 está desplegada provisionalmente en Cloudflare Pages en `https://calcula-tu-casa.pages.dev`. Se ha verificado visualmente la carga en escritorio y móvil. Mientras se valida el sitio y antes de un dominio definitivo, esta URL se utiliza como entorno de producción temporal.

## Placeholders y tareas dependientes del lanzamiento

- `[NOMBRE_TITULAR]`
- `[NIF]`
- `[DOMICILIO]`
- `[EMAIL_CONTACTO]`
- `[DOMINIO]`
- dominio real para `SITE_URL`;
- CMP certificada cuando se active publicidad en el EEE;
- cuenta AdSense y entrada real de `ads.txt`;
- publisher ID real, nunca ficticio;
- validación final en Search Console/Schema/Rich Results cuando el dominio esté publicado.

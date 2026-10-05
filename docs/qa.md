# QA — V1

Fecha de cierre técnico: 5 de octubre de 2026.

## Alcance

La V1 contiene ocho calculadoras funcionales, cinco hubs canónicos, directorio global con buscador local, navegación responsive, páginas institucionales, legales con placeholders, Schema, interlinking, placeholders AdSense, sitemap oficial y CI.

## Tests definidos

`tests/calculators.test.mjs` incluye 8 casos por cada calculadora:

1. normal;
2. mínimo;
3. máximo razonable;
4. cero;
5. negativo;
6. vacío;
7. decimal con coma;
8. caso manual verificable.

Son 64 pruebas de calculadoras.

`tests/consistency.test.mjs` añade 6 comprobaciones:

- exactamente ocho rutas canónicas;
- ausencia de duplicidades;
- retirada de la URL antigua del radiador;
- metadatos obligatorios y 5–7 FAQ;
- enlaces internos a herramientas existentes;
- categorías válidas y ausencia de ratings/reviews inventados.

Total definido: **70 tests**.

## Verificación de ejecución

Pendiente de registrar el resultado del workflow final del Pull Request. Este apartado se actualizará únicamente con resultados realmente ejecutados.

Comandos configurados en CI:

```bash
npm ci
npm test
npm run build
SITE_URL=https://example.com npm run build
```

## Build esperado

Astro estático, salida `dist/`. Con `SITE_URL`, `@astrojs/sitemap` debe generar `sitemap-index.xml` y `sitemap-0.xml`. Sin `SITE_URL`, Astro puede omitir el sitemap y las páginas llevan `noindex` por diseño.

La V1 define 24 páginas HTML esperadas: portada, directorio, cinco hubs, ocho calculadoras, ocho páginas institucionales/legales y 404.

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

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

`tests/consistency.test.mjs` añade 8 comprobaciones:

- exactamente ocho rutas canónicas;
- ausencia de duplicidades;
- retirada de la URL antigua del radiador;
- metadatos obligatorios y 5–7 FAQ;
- enlaces internos a herramientas existentes;
- categorías válidas y ausencia de ratings/reviews inventados;
- keywords presentes para el buscador local.

Total ejecutado: **72 tests**.

## Verificación de ejecución

GitHub Actions, workflow `Verify`, ejecución del HEAD `1224fd27794a5d8ea95497cd4f307771619c11dd`:

```bash
npm ci
# correcto

npm test
# 72 tests · 72 aprobados · 0 fallidos

npm run build
# correcto · 24 páginas generadas

SITE_URL=https://example.com npm run build
# correcto · 24 páginas generadas · sitemap-index.xml creado
```

`npm ci` instaló correctamente las dependencias y la auditoría reportó 0 vulnerabilidades en esa ejecución.

## Build real

Astro estático, salida `dist/`. El build sin `SITE_URL` terminó correctamente y omitió el sitemap, tal como advierte la integración oficial cuando no existe `site`. El build de producción de prueba con `SITE_URL=https://example.com` terminó correctamente y creó `dist/sitemap-index.xml`.

Ambos builds generaron **24 páginas**: portada, directorio, cinco hubs, ocho calculadoras, ocho páginas institucionales/legales y 404.

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

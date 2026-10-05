# QA — V1

Fecha de cierre técnico/hardening: 5 de octubre de 2026.

## Alcance

La V1 contiene ocho calculadoras funcionales, cinco hubs canónicos, directorio global con buscador local normalizado sin tildes, navegación responsive, páginas institucionales, legales con placeholders, Schema, interlinking, placeholders AdSense, sitemap oficial y CI. Solar y Reformas permanecen `noindex, follow` y fuera del sitemap hasta publicar herramientas reales.

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

El hardening añade regresiones específicas para mezcla del termo, precio opcional, temperaturas, acristalamiento, potencia mínima individual, sensibilidad de horas, normalización del buscador y hubs noindex/sitemap. El total final se registra tras la ejecución de CI del nuevo HEAD.

## Verificación de ejecución

Pendiente de actualizar con la ejecución real del HEAD de hardening. Los comandos obligatorios siguen siendo `npm ci`, `npm test`, `npm run build` y `SITE_URL=https://example.com npm run build`.

## Build real

Pendiente de actualizar con el HEAD de hardening. El número de páginas HTML no cambia: 24; con `SITE_URL` el sitemap debe excluir páginas legales pendientes y los hubs `/solar/` y `/reformas/`.

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

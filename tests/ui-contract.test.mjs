import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('Hub aplica noindex a categorías marcadas como no indexables',()=>{
 const source=read('src/components/Hub.astro');
 assert.match(source,/noindex=\{category\.indexable===false\}/);
});

test('Reset restaura el HTML inicial de filas dinámicas',()=>{
 const source=read('src/lib/calculator-ui.mjs');
 assert.match(source,/\[data-layers\],\[data-appliances\]/);
 assert.match(source,/item\.node\.innerHTML=item\.html/);
});

test('Menú móvil actualiza etiqueta y Escape solo actúa si estaba abierto',()=>{
 const source=read('src/layouts/Base.astro');
 assert.match(source,/Cerrar menú/);
 assert.match(source,/Abrir menú/);
 assert.match(source,/e\.key==='Escape'&&button\.getAttribute\('aria-expanded'\)==='true'/);
});

test('Enlace al sitemap solo se emite cuando Astro.site existe',()=>{
 const source=read('src/layouts/Base.astro');
 assert.match(source,/Astro\.site&&<link rel="sitemap" href="\/sitemap-index\.xml"\/>/);
});


test('Rediseño UI v2 · respeta reduced motion y tamaños de interacción',()=>{
 const css=read('src/styles/global.css');
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/min-height:48px/);
 assert.match(css,/font-size:16px/);
});

test('Rediseño UI v2 · usa iconografía SVG ligera en tarjetas',()=>{
 const card=read('src/components/ToolCard.astro');
 assert.match(card,/<svg/);
 assert.doesNotMatch(card,/\{tool\.icon\}/);
});

test('Rediseño UI v2 · buscador mantiene label visible y contador accesible',()=>{
 const search=read('src/components/SearchTools.astro');
 assert.match(search,/>¿Qué quieres calcular\?<\/label>/);
 assert.match(search,/aria-live="polite"/);
});

test('Rediseño UI v2 · relacionadas aparecen después del contenido explicativo',()=>{
 const layout=read('src/layouts/CalculatorLayout.astro');
 assert.ok(layout.indexOf('<RelatedTools')>layout.indexOf('<FAQ'));
});


test('Fuentes usa la fecha de revisión de cada herramienta y no una fecha global fija',()=>{
 const sources=read('src/components/Sources.astro');
 const layout=read('src/layouts/CalculatorLayout.astro');
 assert.match(sources,/reviewedAt/);
 assert.match(sources,/Última revisión: \{reviewedAt\}/);
 assert.doesNotMatch(sources,/5 de octubre de 2026|05\/10\/2026|2026-10-05/);
 assert.match(layout,/const reviewedAt=tool\.reviewedAt\|\|'05\/10\/2026'/);
 assert.match(layout,/<Sources[^>]*reviewedAt=\{reviewedAt\}/);
});

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

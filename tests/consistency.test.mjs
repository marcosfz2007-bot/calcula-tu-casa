import test from 'node:test';
import assert from 'node:assert/strict';
import {tools,categories} from '../src/lib/catalog.mjs';
import {SITEMAP_EXCLUDED_PATHS,isSitemapPage} from '../src/lib/seo.mjs';
import {normalizeSearchText} from '../src/lib/search.mjs';

const expected=[
 'climatizacion/consumo-aire-acondicionado',
 'energia/consumo-radiador-electrico',
 'energia/termo-electrico',
 'aislamiento/punto-de-rocio-moho',
 'aislamiento/transmitancia-termica',
 'climatizacion/calculadora-frigorias',
 'energia/potencia-electrica',
 'energia/consumo-electrodomesticos'
];

test('Catálogo V1 contiene exactamente las ocho rutas canónicas',()=>{
 assert.equal(tools.length,8);
 assert.deepEqual(new Set(tools.map(t=>t.path)),new Set(expected));
});
test('No hay rutas duplicadas',()=>assert.equal(new Set(tools.map(t=>t.path)).size,tools.length));
test('No permanece la ruta corta antigua del radiador',()=>assert.ok(!tools.some(t=>t.path==='energia/consumo-radiador')));
test('Todas las herramientas tienen metadatos obligatorios',()=>{
 for(const t of tools){
  for(const key of ['kind','path','category','categorySlug','short','title','description','methodology','formula','limitations','example']) assert.ok(t[key],t.path+' sin '+key);
  assert.ok(Array.isArray(t.sources)&&t.sources.length>0,t.path+' sin fuentes');
  assert.ok(Array.isArray(t.faqs)&&t.faqs.length>=5&&t.faqs.length<=7,t.path+' FAQ fuera de 5–7');
  assert.ok(Array.isArray(t.related)&&t.related.length>0,t.path+' sin relacionadas');
 }
});
test('Todos los enlaces a herramientas relacionadas existen',()=>{
 const paths=new Set(tools.map(t=>t.path));
 for(const t of tools) for(const related of t.related) assert.ok(paths.has(related),t.path+' enlaza a '+related+' inexistente');
});
test('Las categorías de cada herramienta existen como hubs',()=>{
 const slugs=new Set(categories.map(c=>c.slug));
 for(const t of tools) assert.ok(slugs.has(t.categorySlug),t.path+' usa categoría inexistente');
});
test('No hay ratings ni reviews declarados en catálogo',()=>{
 const text=JSON.stringify(tools);
 assert.ok(!/AggregateRating|ratingValue|Review/.test(text));
});

test('Todas las herramientas tienen keywords para el buscador',()=>{for(const t of tools) assert.ok(Array.isArray(t.keywords)&&t.keywords.length>0,t.path+' sin keywords');});

test('Hubs sin herramientas quedan noindex y fuera de sitemap',()=>{
 const indexable=new Map(categories.map(c=>[c.slug,c.indexable]));
 assert.equal(indexable.get('energia'),true);
 assert.equal(indexable.get('climatizacion'),true);
 assert.equal(indexable.get('aislamiento'),true);
 assert.equal(indexable.get('solar'),false);
 assert.equal(indexable.get('reformas'),false);
 assert.equal(isSitemapPage('https://example.com/energia/'),true);
 assert.equal(isSitemapPage('https://example.com/climatizacion/'),true);
 assert.equal(isSitemapPage('https://example.com/aislamiento/'),true);
 assert.equal(isSitemapPage('https://example.com/solar/'),false);
 assert.equal(isSitemapPage('https://example.com/reformas/'),false);
 assert.ok(SITEMAP_EXCLUDED_PATHS.includes('/solar/'));
 assert.ok(SITEMAP_EXCLUDED_PATHS.includes('/reformas/'));
});
test('Buscador normaliza tildes y diacríticos',()=>{
 assert.equal(normalizeSearchText('Frigorías'),'frigorias');
 assert.equal(normalizeSearchText('aislamiento térmico'),'aislamiento termico');
 assert.ok(normalizeSearchText('Calculadora de frigorías').includes(normalizeSearchText('frigorias')));
});

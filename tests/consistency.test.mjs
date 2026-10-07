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
 'energia/consumo-electrodomesticos',
 'climatizacion/suelo-radiante-tubo-circuitos',
 'energia/ventilacion-vivienda',
 'energia/simulador-factura-electrica',
 'solar/produccion-placas-solares',
 'climatizacion/potencia-radiadores-elementos',
 'solar/numero-placas-solares',
 'energia/comparador-coste-calefaccion',
 'reformas/presupuesto-reforma-integral',
 'reformas/reforma-bano',
 'reformas/reforma-cocina',
 'solar/amortizacion-placas-solares',
 'energia/rentabilidad-aerotermia',
 'reformas/comparador-reformas-energeticas',
 'reformas/calculadora-pintura',
 'reformas/calculadora-azulejos-baldosas',
 'reformas/suelo-laminado-tarima',
 'reformas/calculadora-rodapie',
 'reformas/calculadora-papel-pintado',
 'energia/calculadora-iluminacion-lux',
 'energia/ahorro-bombillas-led',
 'energia/consumo-standby',
 'energia/recarga-coche-electrico',
 'solar/bateria-solar',
 'aislamiento/perdida-termica-vivienda',
 'energia/consumo-deshumidificador',
 'aislamiento/ahorro-cambio-ventanas',
 'reformas/hormigon-necesario',
 'reformas/mortero-necesario',
 'reformas/ladrillos-bloques-necesarios',
 'reformas/calculadora-impermeabilizacion',
 'reformas/tamano-deposito-agua'
];

test('Catálogo contiene exactamente las treinta y nueve rutas canónicas',()=>{
 assert.equal(tools.length,39);
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
 assert.equal(indexable.get('solar'),true);
 assert.equal(indexable.get('reformas'),true);
 assert.equal(isSitemapPage('https://example.com/energia/'),true);
 assert.equal(isSitemapPage('https://example.com/climatizacion/'),true);
 assert.equal(isSitemapPage('https://example.com/aislamiento/'),true);
 assert.equal(isSitemapPage('https://example.com/solar/'),true);
 assert.equal(isSitemapPage('https://example.com/reformas/'),true);
 assert.ok(!SITEMAP_EXCLUDED_PATHS.includes('/solar/'));
 assert.ok(!SITEMAP_EXCLUDED_PATHS.includes('/reformas/'));
});
test('Buscador normaliza tildes y diacríticos',()=>{
 assert.equal(normalizeSearchText('Frigorías'),'frigorias');
 assert.equal(normalizeSearchText('aislamiento térmico'),'aislamiento termico');
 assert.ok(normalizeSearchText('Calculadora de frigorías').includes(normalizeSearchText('frigorias')));
});

test('Contadores de interfaz no codifican 8 o 12 herramientas',async()=>{
 const {readFileSync}=await import('node:fs');
 const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
 for(const path of ['src/pages/index.astro','src/pages/calculadoras/index.astro','src/components/Hub.astro','src/pages/[info].astro']){
   const source=read(path);
   assert.doesNotMatch(source,/\b(?:8|12) calculadoras\b|\b(?:ocho|doce) (?:calculadoras|herramientas)\b/i,path);
 }
 assert.match(read('src/pages/index.astro'),/tools\.length/);
 assert.match(read('src/pages/calculadoras/index.astro'),/tools\.length/);
});
test('Reformas y Solar están indexables y fuera de exclusiones del sitemap',()=>{
 assert.equal(categories.find(c=>c.slug==='reformas')?.indexable,true);
 assert.equal(categories.find(c=>c.slug==='solar')?.indexable,true);
 assert.ok(!SITEMAP_EXCLUDED_PATHS.includes('/reformas/'));
 assert.ok(!SITEMAP_EXCLUDED_PATHS.includes('/solar/'));
});

test('Regresión expansión 04 · el catálogo no puede volver accidentalmente a 31 herramientas',()=>{
 assert.notEqual(tools.length,31);
 assert.equal(tools.length,39);
});

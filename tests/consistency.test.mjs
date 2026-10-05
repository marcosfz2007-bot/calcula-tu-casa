import test from 'node:test';
import assert from 'node:assert/strict';
import {tools,categories} from '../src/lib/catalog.mjs';

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

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('Transparencia global documenta explícitamente la excepción voluntaria de PVGIS',()=>{
  const catalog=read('src/lib/catalog.mjs');
  const info=read('src/pages/[info].astro');
  const readme=read('README.md');
  const combined=[catalog,info,readme].join('\n');
  assert.match(combined,/mayoría de las calculadoras/i);
  assert.match(combined,/no recibe ni almacena/i);
  assert.match(combined,/abr(?:e|ir) voluntariamente/i);
  assert.match(combined,/(?:directamente al JRC\/PVGIS|directamente a PVGIS\/JRC)/i);
  assert.match(combined,/JSON[^.]*se procesa localmente/i);
});

test('Textos globales no vuelven a afirmar procesamiento local absoluto sin la excepción PVGIS',()=>{
  const files=[
    read('src/lib/catalog.mjs'),
    read('src/pages/[info].astro'),
    read('src/pages/index.astro'),
    read('src/pages/calculadoras/index.astro'),
    read('README.md')
  ];
  const banned=[
    /Los cálculos se realizan localmente en el navegador/i,
    /Los valores introducidos se calculan localmente en el navegador/i,
    /Los valores técnicos introducidos en las calculadoras se procesan localmente/i,
    /Las doce herramientas[^.]*procesan los valores en tu navegador/i,
    /todos los datos[^.]*no se envían/i
  ];
  for(const source of files) for(const pattern of banned) assert.doesNotMatch(source,pattern);
});

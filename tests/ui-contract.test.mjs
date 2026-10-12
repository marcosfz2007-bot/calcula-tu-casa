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

test('Rediseño UI v2 · usa iconografía SVG ligera reutilizable en tarjetas',()=>{
 const card=read('src/components/ToolCard.astro');
 const icon=read('src/components/CategoryIcon.astro');
 assert.match(card,/CategoryIcon/);
 assert.match(icon,/<svg/);
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

test('Expansión 04 · calculadoras especializadas reutilizan patrones UI v2',()=>{
 for(const path of ['src/components/ThermalLossCalculator.astro','src/components/ConcreteCalculator.astro','src/components/WaterproofingCalculator.astro','src/components/WaterTankCalculator.astro']){
  const source=read(path);
  assert.match(source,/class="calculator/);
  assert.match(source,/class="card/);
  assert.match(source,/class="card result"/);
  assert.match(source,/class="button/);
  assert.match(source,/aria-live="polite"/);
 }
});


test('Calcula tu Casa 2.0 · controles segmentados conservan radios nativos',()=>{
 const segmented=read('src/components/SegmentedControl.astro');
 assert.match(segmented,/type="radio"/);
 assert.match(segmented,/name=\{name\}/);
 assert.match(segmented,/value=\{optionValue\}/);
});

test('Calcula tu Casa 2.0 · siguiente decisión solo usa rutas del catálogo',async()=>{
 const {NEXT_DECISIONS}=await import('../src/lib/presentation.mjs');
 const {toolByPath}=await import('../src/lib/catalog.mjs');
 for(const [source,decision] of Object.entries(NEXT_DECISIONS)){
  assert.ok(toolByPath.has(source),'Origen inexistente: '+source);
  assert.ok(toolByPath.has(decision.path),'Destino inexistente: '+decision.path);
 }
});

test('Calcula tu Casa 2.0 · formularios agrupados conservan todos los campos',async()=>{
 const {tools}=await import('../src/lib/catalog.mjs');
 const {getFormGroups}=await import('../src/lib/presentation.mjs');
 for(const tool of tools.filter(tool=>tool.fields?.length)){
  const grouped=getFormGroups(tool).flatMap(group=>group.keys);
  assert.deepEqual(new Set(grouped),new Set(tool.fields.map(([key])=>key)),tool.path);
  assert.equal(grouped.length,new Set(grouped).size,'Campo duplicado en '+tool.path);
 }
});


test('Calcula tu Casa 2.0 · las 39 herramientas tienen variante visual definida',async()=>{
 const {tools}=await import('../src/lib/catalog.mjs');
 const {getToolPresentation}=await import('../src/lib/presentation.mjs');
 assert.equal(tools.length,39);
 for(const tool of tools)assert.notEqual(getToolPresentation(tool).variant,'default',tool.path);
});

test('Calcula tu Casa 2.0 · visualizaciones de resultado son CSS y DOM nativos',()=>{
 const ui=read('src/lib/result-ui.mjs');
 assert.doesNotMatch(ui,/chart\.js|d3\.|echarts|highcharts/i);
 for(const helper of ['createRangeVisual','createBreakdownBar','createScenarioCards','createComparisonBars','createRankingBars','createMonthlyBars','createTimelineBars'])assert.ok(ui.includes(helper),helper);
});

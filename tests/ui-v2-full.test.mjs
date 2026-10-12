import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tools,toolByPath} from '../src/lib/catalog.mjs';
import {getToolPresentation,getNextDecision,presentationCount,nextDecisionCount} from '../src/lib/presentation.mjs';

const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('UI v2 completo · cubre las 39 herramientas con presentación y siguiente decisión',()=>{
  assert.equal(tools.length,39);
  assert.equal(presentationCount,39);
  assert.equal(nextDecisionCount,39);
  for(const tool of tools){
    const presentation=getToolPresentation(tool);
    assert.ok(presentation.question,tool.path+' sin pregunta visual');
    assert.ok(presentation.result,tool.path+' sin descripción de resultado');
    const decision=getNextDecision(tool.path);
    assert.ok(decision,tool.path+' sin siguiente decisión');
    assert.ok(toolByPath.has(decision[0]),tool.path+' apunta a una ruta inexistente: '+decision[0]);
  }
});

test('UI v2 completo · todas las calculadoras especializadas usan shell visual común',()=>{
  const files=[
    'CoolingCalculator.astro','TransmittanceCalculator.astro','PowerCalculator.astro','AppliancesCalculator.astro',
    'UnderfloorCalculator.astro','SolarCalculator.astro','SolarSizingCalculator.astro','ReformBudgetCalculator.astro',
    'EnergyReformsCalculator.astro','PaintCalculator.astro','TilesCalculator.astro','LaminateCalculator.astro',
    'StandbyCalculator.astro','EvChargingCalculator.astro','ThermalLossCalculator.astro','ConcreteCalculator.astro',
    'WaterproofingCalculator.astro','WaterTankCalculator.astro'
  ];
  for(const file of files){
    const source=read('src/components/'+file);
    assert.match(source,/class="card calc-form"/,file+' sin formulario UI v2');
    assert.match(source,/class="card result result-kind-/,file+' sin variante de resultado');
  }
  const generic=read('src/components/GenericCalculator.astro');
  assert.match(generic,/card calc-form/);
  assert.match(generic,/result-kind-/);
});

test('UI v2 completo · Home real incorpora buscador protagonista e ilustración conceptual',()=>{
  const home=read('src/pages/index.astro');
  const visual=read('src/components/HomeHeroVisual.astro');
  assert.match(home,/SearchTools tools=\{tools\} compact hero/);
  assert.match(home,/HomeHeroVisual/);
  assert.doesNotMatch(home,/proof-number|Herramientas publicadas/);
  assert.match(visual,/<svg/);
  assert.match(visual,/8 placas/);
});

test('UI v2 completo · Siguiente decisión aparece antes de publicidad y metodología',()=>{
  const layout=read('src/layouts/CalculatorLayout.astro');
  assert.ok(layout.indexOf('<NextDecision')>layout.indexOf('<slot'));
  assert.ok(layout.indexOf('<NextDecision')<layout.indexOf('<AdSlot position="after-result"'));
  assert.ok(layout.indexOf('<AdSlot position="after-result"')<layout.indexOf('<Methodology'));
});

test('UI v2 completo · controles segmentados conservan radios nativos accesibles',()=>{
  const segmented=read('src/components/SegmentedControl.astro');
  const cooling=read('src/components/CoolingCalculator.astro');
  assert.match(segmented,/type="radio"/);
  assert.match(segmented,/<fieldset/);
  assert.match(segmented,/<legend>/);
  for(const value of ['mild','warm','hot','N','E','S','O','good','average','poor']) assert.ok(cooling.includes("'"+value+"'"),value);
});

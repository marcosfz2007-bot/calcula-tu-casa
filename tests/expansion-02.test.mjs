import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateRadiatorElements} from '../src/lib/calculators/radiator-elements.mjs';
import {calculateSolarSizing} from '../src/lib/calculators/solar-sizing.mjs';
import {parsePvgisResult} from '../src/lib/calculators/solar-pvgis.mjs';
import {calculateHeatingComparison} from '../src/lib/calculators/heating-comparison.mjs';
import {calculateRangeBudget} from '../src/lib/calculators/reforms-common.mjs';
import {REFORM_PRESETS,REFORM_COSTS_META} from '../src/lib/config/reform-costs.mjs';
import {calculateSolarPayback} from '../src/lib/calculators/solar-payback.mjs';
import {calculateAerothermalPayback} from '../src/lib/calculators/aerothermal-payback.mjs';
import {calculateEnergyReforms} from '../src/lib/calculators/energy-reforms.mjs';

const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);

// 13. Potencia y elementos de radiador
const radiator={area:15,height:'2,5',thermalFactor:50,elementPowerW:120,correctionFactor:1,marginPercent:0};
test('Radiadores · normal',()=>{const r=calculateRadiatorElements(radiator);near(r.volumeM3,37.5);near(r.requiredPowerW,1875);assert.equal(r.elements,16);near(r.installedPowerW,1920);});
test('Radiadores · mínimo',()=>assert.doesNotThrow(()=>calculateRadiatorElements({area:1,height:1.5,thermalFactor:1,elementPowerW:1,correctionFactor:0.1,marginPercent:0})));
test('Radiadores · máximo razonable',()=>assert.doesNotThrow(()=>calculateRadiatorElements({area:1000,height:10,thermalFactor:500,elementPowerW:2000,correctionFactor:2,marginPercent:100})));
test('Radiadores · cero margen',()=>near(calculateRadiatorElements({...radiator,marginPercent:0}).requiredPowerW,1875));
test('Radiadores · negativo',()=>assert.throws(()=>calculateRadiatorElements({...radiator,area:-1}),RangeError));
test('Radiadores · vacío',()=>assert.throws(()=>calculateRadiatorElements({...radiator,thermalFactor:''}),RangeError));
test('Radiadores · decimal con coma',()=>near(calculateRadiatorElements({...radiator,height:'2,5'}).volumeM3,37.5));
test('Radiadores · manual ceil',()=>assert.equal(calculateRadiatorElements({area:10,height:2,thermalFactor:50,elementPowerW:300,correctionFactor:1,marginPercent:0}).elements,4));
test('Radiadores · potencia instalada siempre cubre demanda',()=>{const r=calculateRadiatorElements(radiator);assert.ok(r.installedPowerW>=r.requiredPowerW);});
test('Radiadores · potencia por elemento configurable',()=>{assert.ok(calculateRadiatorElements({...radiator,elementPowerW:200}).elements<calculateRadiatorElements({...radiator,elementPowerW:100}).elements);});

// 14. Número de placas solares
const sizing={annualConsumptionKwh:5000,targetCoveragePercent:80,panelPowerWp:450,panelAreaM2:2,availableAreaM2:12,specificYieldKwhPerKwp:1400};
test('Solar tamaño · normal',()=>{const r=calculateSolarSizing(sizing);near(r.targetProductionKwh,4000);assert.equal(r.panels,7);near(r.installedKwp,3.15);near(r.estimatedAnnualProductionKwh,4410);});
test('Solar tamaño · mínimo',()=>{const r=calculateSolarSizing({annualConsumptionKwh:0,targetCoveragePercent:0,panelPowerWp:1,panelAreaM2:0.1,availableAreaM2:0,specificYieldKwhPerKwp:1});assert.equal(r.panels,0);});
test('Solar tamaño · máximo razonable',()=>assert.doesNotThrow(()=>calculateSolarSizing({annualConsumptionKwh:1000000,targetCoveragePercent:200,panelPowerWp:2000,panelAreaM2:10,availableAreaM2:100000,specificYieldKwhPerKwp:5000})));
test('Solar tamaño · cero cobertura',()=>assert.equal(calculateSolarSizing({...sizing,targetCoveragePercent:0}).panels,0));
test('Solar tamaño · negativo',()=>assert.throws(()=>calculateSolarSizing({...sizing,panelPowerWp:-1}),RangeError));
test('Solar tamaño · vacío',()=>assert.throws(()=>calculateSolarSizing({...sizing,specificYieldKwhPerKwp:''}),RangeError));
test('Solar tamaño · decimal con coma',()=>near(calculateSolarSizing({...sizing,panelPowerWp:'450,0'}).installedKwp,3.15));
test('Solar tamaño · manual un panel',()=>assert.equal(calculateSolarSizing({annualConsumptionKwh:1000,targetCoveragePercent:100,panelPowerWp:1000,panelAreaM2:2,availableAreaM2:'',specificYieldKwhPerKwp:1000}).panels,1));
test('Solar tamaño · límite por superficie',()=>{const r=calculateSolarSizing(sizing);assert.equal(r.fitsAvailableArea,false);assert.equal(r.maxPanelsByArea,6);});
test('Solar tamaño · reutiliza producción específica de PVGIS',()=>{const payload={outputs:{monthly:{fixed:Array.from({length:12},(_,i)=>({month:i+1,E_m:100}))},totals:{fixed:{E_y:7000,SD_y:100}}}};const p=parsePvgisResult(payload,5);near(p.specificYieldKwhPerKwp,1400);assert.equal(calculateSolarSizing({...sizing,specificYieldKwhPerKwp:p.specificYieldKwhPerKwp}).panels,7);});
test('Solar tamaño · cobertura anual no se presenta como autoconsumo',()=>{const r=calculateSolarSizing(sizing);assert.ok('theoreticalAnnualCoveragePercent' in r);assert.ok(!('selfConsumptionPercent' in r));});

// 15. Comparador calefacción
const heating={usefulHeatKwh:10000,electricityPrice:'0,20',resistanceFixed:0,scop:4,heatPumpFixed:0,gasPrice:'0,08',gasEfficiencyPercent:90,gasFixed:0,pelletPriceKg:'0,40',pelletPciKwhKg:5,pelletEfficiencyPercent:80,pelletFixed:0};
test('Calefacción · normal',()=>{const r=calculateHeatingComparison(heating);assert.equal(r.systems[0].key,'heat-pump');near(r.systems.find(s=>s.key==='resistance').annualCost,2000);near(r.systems.find(s=>s.key==='heat-pump').annualCost,500);});
test('Calefacción · mínimo',()=>assert.doesNotThrow(()=>calculateHeatingComparison({...heating,usefulHeatKwh:0,electricityPrice:0,gasPrice:0,pelletPriceKg:0})));
test('Calefacción · máximo razonable',()=>assert.doesNotThrow(()=>calculateHeatingComparison({usefulHeatKwh:1000000,electricityPrice:10,resistanceFixed:100000,scop:10,heatPumpFixed:100000,gasPrice:10,gasEfficiencyPercent:120,gasFixed:100000,pelletPriceKg:20,pelletPciKwhKg:20,pelletEfficiencyPercent:120,pelletFixed:100000})));
test('Calefacción · precio cero',()=>near(calculateHeatingComparison({...heating,electricityPrice:0,heatPumpFixed:50}).systems.find(s=>s.key==='heat-pump').annualCost,50));
test('Calefacción · negativo',()=>assert.throws(()=>calculateHeatingComparison({...heating,gasPrice:-1}),RangeError));
test('Calefacción · vacío',()=>assert.throws(()=>calculateHeatingComparison({...heating,scop:''}),RangeError));
test('Calefacción · decimal con coma',()=>near(calculateHeatingComparison({...heating,scop:'4,0'}).systems.find(s=>s.key==='heat-pump').purchasedEnergyKwh,2500));
test('Calefacción · manual mismo calor útil',()=>{const r=calculateHeatingComparison(heating);near(r.systems.find(s=>s.key==='gas').purchasedEnergyKwh,10000/0.9);near(r.systems.find(s=>s.key==='pellet').pelletKg,2500);});
test('Calefacción · costes fijos se suman',()=>near(calculateHeatingComparison({...heating,gasFixed:123}).systems.find(s=>s.key==='gas').annualCost,10000/0.9*0.08+123));
test('Calefacción · resultados ordenados por coste',()=>{const r=calculateHeatingComparison(heating);for(let i=1;i<r.systems.length;i++)assert.ok(r.systems[i].annualCost>=r.systems[i-1].annualCost);});

// Reformas: helper
const row=(label,quantity=1,low=100,central=120,high=150)=>({label,quantity,low,central,high,selected:true,unit:'ud.'});
function reformCase(surface=10,rows=[row('A')]){return calculateRangeBudget({surface,rows});}

// 16. Reforma integral
test('Reforma integral · normal',()=>{const r=reformCase(90,[row('Demolición',90,10,12,15),row('Cocina',1,5000,6000,8000)]);near(r.total.central,7080);});
test('Reforma integral · mínimo',()=>{const r=reformCase(1,[row('A',0,0,0,0)]);near(r.total.central,0);});
test('Reforma integral · máximo razonable',()=>assert.doesNotThrow(()=>reformCase(1000,[row('A',100000,1000,5000,10000)])));
test('Reforma integral · exclusión opcional',()=>{const r=calculateRangeBudget({surface:90,rows:[row('A'),{...row('B'),selected:false}]});assert.equal(r.rows.length,1);});
test('Reforma integral · negativo',()=>assert.throws(()=>reformCase(90,[row('A',1,-1,2,3)]),RangeError));
test('Reforma integral · vacío',()=>assert.throws(()=>reformCase(90,[row('A',1,'',2,3)]),RangeError));
test('Reforma integral · decimal con coma',()=>near(reformCase('90,0',[row('A',1,'100,5','120,5','150,5')]).total.central,120.5));
test('Reforma integral · manual suma partidas',()=>near(reformCase(10,[row('A',2,10,20,30),row('B',3,5,10,15)]).total.central,70));

// 17. Baño
test('Baño · normal',()=>{const r=reformCase(5,[row('Alicatado',20,20,30,40),row('Suelo',5,20,30,40)]);near(r.total.central,750);});
test('Baño · mínimo',()=>near(reformCase(1,[row('A',0,0,0,0)]).total.low,0));
test('Baño · máximo razonable',()=>assert.doesNotThrow(()=>reformCase(100,[row('A',100000,1000,5000,10000)])));
test('Baño · cero partida opcional',()=>near(reformCase(5,[row('A',0,100,120,150)]).total.central,0));
test('Baño · negativo',()=>assert.throws(()=>reformCase(5,[row('A',-1,1,2,3)]),RangeError));
test('Baño · vacío',()=>assert.throws(()=>reformCase(5,[row('A',1,1,'',3)]),RangeError));
test('Baño · decimal con coma',()=>near(reformCase('5,0',[row('A','2,5','10,0','20,0','30,0')]).total.central,50));
test('Baño · bajo central alto ordenados',()=>{const r=reformCase(5,[row('A',2,10,20,30)]);assert.ok(r.total.low<=r.total.central&&r.total.central<=r.total.high);});

// 18. Cocina
test('Cocina · normal',()=>{const r=reformCase(10,[row('Muebles',5,500,700,900),row('Encimera',4,100,200,300)]);near(r.total.central,4300);});
test('Cocina · mínimo',()=>near(reformCase(1,[row('A',0,0,0,0)]).total.high,0));
test('Cocina · máximo razonable',()=>assert.doesNotThrow(()=>reformCase(200,[row('A',100000,1000,5000,10000)])));
test('Cocina · electrodomésticos excluidos',()=>{const r=calculateRangeBudget({surface:10,rows:[row('Muebles'),{...row('Electrodomésticos'),selected:false}]});assert.equal(r.rows.length,1);});
test('Cocina · negativo',()=>assert.throws(()=>reformCase(10,[row('A',1,1,-2,3)]),RangeError));
test('Cocina · vacío',()=>assert.throws(()=>reformCase(10,[row('A',1,1,2,'')]),RangeError));
test('Cocina · decimal con coma',()=>near(reformCase('10,5',[row('A','1,5','10,5','20,5','30,5')]).total.central,30.75));
test('Cocina · manual suma',()=>near(reformCase(10,[row('A',5,100,200,300),row('B',4,50,100,150)]).total.central,1400));
test('Reformas · configuración versionada y sin precios precargados',()=>{assert.equal(REFORM_COSTS_META.checkedAt,'2026-10-06');assert.match(REFORM_COSTS_META.pricingPolicy,/datos del usuario/i);assert.ok(REFORM_PRESETS['reform-integral']);assert.ok(REFORM_PRESETS['reform-bathroom']);assert.ok(REFORM_PRESETS['reform-kitchen']);});
test('Reformas · rechaza rango desordenado',()=>assert.throws(()=>reformCase(10,[row('A',1,30,20,10)]),RangeError));

// 19. Amortización solar
const solarPayback={installationCost:10000,aid:1000,annualProductionKwh:6000,annualConsumptionKwh:5000,selfConsumptionPercent:60,avoidedPrice:'0,20',surplusCompensation:'0,05',annualMaintenance:100,degradationPercent:1,horizonYears:20,energyPriceGrowthPercent:0,discountRatePercent:3};
test('Solar payback · normal',()=>{const r=calculateSolarPayback(solarPayback);near(r.netInvestment,9000);near(r.firstYearSaving,740);assert.ok(r.years.length===20);});
test('Solar payback · mínimo',()=>assert.doesNotThrow(()=>calculateSolarPayback({installationCost:0,aid:0,annualProductionKwh:0,annualConsumptionKwh:0,selfConsumptionPercent:0,avoidedPrice:0,surplusCompensation:0,annualMaintenance:0,degradationPercent:0,horizonYears:1,energyPriceGrowthPercent:0,discountRatePercent:0})));
test('Solar payback · máximo razonable',()=>assert.doesNotThrow(()=>calculateSolarPayback({installationCost:10000000,aid:10000000,annualProductionKwh:10000000,annualConsumptionKwh:10000000,selfConsumptionPercent:100,avoidedPrice:10,surplusCompensation:10,annualMaintenance:100000,degradationPercent:10,horizonYears:50,energyPriceGrowthPercent:50,discountRatePercent:100})));
test('Solar payback · inversión cero',()=>assert.equal(calculateSolarPayback({...solarPayback,installationCost:0,aid:0}).paybackYears,0));
test('Solar payback · negativo',()=>assert.throws(()=>calculateSolarPayback({...solarPayback,installationCost:-1}),RangeError));
test('Solar payback · vacío',()=>assert.throws(()=>calculateSolarPayback({...solarPayback,selfConsumptionPercent:''}),RangeError));
test('Solar payback · decimal con coma',()=>near(calculateSolarPayback({...solarPayback,avoidedPrice:'0,20'}).firstYearSaving,740));
test('Solar payback · manual cinco años',()=>{const r=calculateSolarPayback({installationCost:1000,aid:0,annualProductionKwh:1000,annualConsumptionKwh:1000,selfConsumptionPercent:100,avoidedPrice:0.2,surplusCompensation:0,annualMaintenance:0,degradationPercent:0,horizonYears:10,energyPriceGrowthPercent:0,discountRatePercent:0});near(r.paybackYears,5);});
test('Solar payback · excedentes separados',()=>{const r=calculateSolarPayback({...solarPayback,degradationPercent:0});near(r.years[0].selfConsumedKwh,3600);near(r.years[0].surplusKwh,2400);});
test('Solar payback · degradación reduce producción',()=>{const r=calculateSolarPayback({...solarPayback,degradationPercent:2});assert.ok(r.years[1].productionKwh<r.years[0].productionKwh);});
test('Solar payback · mantenimiento reduce ahorro',()=>{const a=calculateSolarPayback({...solarPayback,annualMaintenance:0});const b=calculateSolarPayback({...solarPayback,annualMaintenance:500});assert.ok(b.firstYearSaving<a.firstYearSaving);});
test('Solar payback · ahorro no positivo no fuerza payback',()=>assert.equal(calculateSolarPayback({...solarPayback,avoidedPrice:0,surplusCompensation:0,annualMaintenance:1000}).paybackYears,null));

// 20. Aerotermia
const aero={usefulHeatKwh:10000,currentFuelPrice:'0,10',currentEfficiencyPercent:80,scop:4,electricityPrice:'0,20',investment:7500,aid:0,currentMaintenance:0,aerothermalMaintenance:0,sensitivityPercent:10};
test('Aerotermia · normal',()=>{const r=calculateAerothermalPayback(aero);near(r.current.annualCost,1250);near(r.aerothermal.annualCost,500);near(r.annualSaving,750);near(r.paybackYears,10);});
test('Aerotermia · mínimo',()=>assert.doesNotThrow(()=>calculateAerothermalPayback({usefulHeatKwh:0,currentFuelPrice:0,currentEfficiencyPercent:1,scop:0.1,electricityPrice:0,investment:0,aid:0,currentMaintenance:0,aerothermalMaintenance:0,sensitivityPercent:0})));
test('Aerotermia · máximo razonable',()=>assert.doesNotThrow(()=>calculateAerothermalPayback({usefulHeatKwh:1000000,currentFuelPrice:10,currentEfficiencyPercent:150,scop:10,electricityPrice:10,investment:1000000,aid:1000000,currentMaintenance:100000,aerothermalMaintenance:100000,sensitivityPercent:50})));
test('Aerotermia · precio cero',()=>near(calculateAerothermalPayback({...aero,electricityPrice:0}).aerothermal.annualCost,0));
test('Aerotermia · negativo',()=>assert.throws(()=>calculateAerothermalPayback({...aero,investment:-1}),RangeError));
test('Aerotermia · vacío',()=>assert.throws(()=>calculateAerothermalPayback({...aero,scop:''}),RangeError));
test('Aerotermia · decimal con coma',()=>near(calculateAerothermalPayback({...aero,scop:'4,0'}).aerothermal.purchasedEnergyKwh,2500));
test('Aerotermia · manual rendimiento y SCOP',()=>{const r=calculateAerothermalPayback(aero);near(r.current.purchasedEnergyKwh,12500);near(r.aerothermal.purchasedEnergyKwh,2500);});
test('Aerotermia · ayuda reduce inversión neta',()=>near(calculateAerothermalPayback({...aero,aid:2500}).netInvestment,5000));
test('Aerotermia · ahorro negativo no da payback',()=>assert.equal(calculateAerothermalPayback({...aero,currentFuelPrice:0,electricityPrice:1}).paybackYears,null));

// 21. Reformas energéticas
const energyReform={hdd:2000,systemPerformance:1,energyPrice:'0,20',actions:[{name:'Fachada',area:100,uInitial:'1,2',uNew:'0,4',cost:5000}]};
test('Reformas energéticas · normal',()=>{const r=calculateEnergyReforms(energyReform);near(r.actions[0].deltaU,0.8);near(r.actions[0].thermalSavingKwh,3840);near(r.actions[0].annualMoneySaving,768);});
test('Reformas energéticas · mínimo',()=>{const r=calculateEnergyReforms({...energyReform,hdd:0});near(r.actions[0].annualMoneySaving,0);assert.equal(r.actions[0].paybackYears,null);});
test('Reformas energéticas · máximo razonable',()=>assert.doesNotThrow(()=>calculateEnergyReforms({hdd:10000,systemPerformance:10,energyPrice:10,actions:[{name:'A',area:100000,uInitial:20,uNew:0.01,cost:10000000}]})));
test('Reformas energéticas · coste cero',()=>assert.equal(calculateEnergyReforms({...energyReform,actions:[{...energyReform.actions[0],cost:0}]}).actions[0].paybackYears,0));
test('Reformas energéticas · negativo',()=>assert.throws(()=>calculateEnergyReforms({...energyReform,actions:[{...energyReform.actions[0],area:-1}]}),RangeError));
test('Reformas energéticas · vacío',()=>assert.throws(()=>calculateEnergyReforms({...energyReform,hdd:''}),RangeError));
test('Reformas energéticas · decimal con coma',()=>near(calculateEnergyReforms({...energyReform,hdd:'2000,0'}).actions[0].thermalSavingKwh,3840));
test('Reformas energéticas · manual verificable',()=>{const r=calculateEnergyReforms({hdd:1000,systemPerformance:1,energyPrice:1,actions:[{name:'A',area:10,uInitial:1,uNew:0.5,cost:1200}]});near(r.actions[0].thermalSavingKwh,120);near(r.actions[0].paybackYears,10);});
test('Reformas energéticas · U nueva mayor no produce ahorro',()=>{const a=calculateEnergyReforms({...energyReform,actions:[{name:'Peor',area:100,uInitial:1,uNew:1.2,cost:1000}]}).actions[0];assert.equal(a.validImprovement,false);near(a.thermalSavingKwh,0);assert.equal(a.paybackYears,null);});
test('Reformas energéticas · rendimiento/SCOP convierte energía comprada',()=>{const r=calculateEnergyReforms({...energyReform,systemPerformance:4});near(r.actions[0].purchasedEnergySavingKwh,960);});

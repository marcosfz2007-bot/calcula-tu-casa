import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateUnderfloor} from '../src/lib/calculators/underfloor.mjs';
import {calculateVentilation} from '../src/lib/calculators/ventilation.mjs';
import {calculateElectricityBill} from '../src/lib/calculators/electricity-bill.mjs';
import {buildPvgisUrl,parsePvgisResult,validateSolarInputs,PVGIS_META} from '../src/lib/calculators/solar-pvgis.mjs';
import {VENTILATION_CTE} from '../src/lib/config/ventilation-cte.mjs';
import {ELECTRICITY_BILL_REGULATION} from '../src/lib/config/electricity-bill.mjs';

const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);

const underfloor={rooms:[{name:'Salón',area:50},{name:'Dormitorios',area:30}],spacingM:'0,15',connectionM:10,marginPercent:5,maxCircuitM:100};
test('Suelo radiante · normal',()=>{const r=calculateUnderfloor(underfloor);near(r.area,80);near(r.totalLengthM,570.5);assert.equal(r.circuits,6);near(r.averageCircuitM,570.5/6);});
test('Suelo radiante · mínimo',()=>{const r=calculateUnderfloor({rooms:[{area:0}],spacingM:0.05,connectionM:0,marginPercent:0,maxCircuitM:10});near(r.totalLengthM,0);assert.equal(r.circuits,0);});
test('Suelo radiante · máximo razonable',()=>assert.doesNotThrow(()=>calculateUnderfloor({rooms:[{area:1000}],spacingM:0.05,connectionM:2000,marginPercent:50,maxCircuitM:10})));
test('Suelo radiante · cero',()=>near(calculateUnderfloor({...underfloor,connectionM:0,marginPercent:0}).marginLengthM,0));
test('Suelo radiante · negativo',()=>assert.throws(()=>calculateUnderfloor({...underfloor,rooms:[{area:-1}]}),RangeError));
test('Suelo radiante · vacío',()=>assert.throws(()=>calculateUnderfloor({...underfloor,spacingM:''}),RangeError));
test('Suelo radiante · decimal con coma',()=>near(calculateUnderfloor({...underfloor,spacingM:'0,20'}).baseLengthM,400));
test('Suelo radiante · manual conocido',()=>{const r=calculateUnderfloor({rooms:[{area:15}],spacingM:0.15,connectionM:0,marginPercent:0,maxCircuitM:100});near(r.baseLengthM,100);near(r.totalLengthM,100);assert.equal(r.circuits,1);});
test('Suelo radiante · suma varias estancias antes del trazado',()=>near(calculateUnderfloor({rooms:[{area:10},{area:20},{area:30}],spacingM:0.2,connectionM:0,marginPercent:0,maxCircuitM:100}).baseLengthM,300));

const ventilation={bedrooms:2,livingRooms:1,kitchens:1,bathrooms:1,toilets:0};
test('Ventilación CTE · normal',()=>{const r=calculateVentilation(ventilation);near(r.dryMinimumLs,20);near(r.wetMinimumLs,24);near(r.balancedLs,24);near(r.balancedM3h,86.4);});
test('Ventilación CTE · mínimo',()=>{const r=calculateVentilation({bedrooms:1,livingRooms:0,kitchens:1,bathrooms:0,toilets:0});near(r.dryMinimumLs,8);near(r.wetMinimumLs,12);near(r.balancedLs,12);});
test('Ventilación CTE · máximo razonable',()=>assert.doesNotThrow(()=>calculateVentilation({bedrooms:10,livingRooms:10,kitchens:5,bathrooms:10,toilets:10})));
test('Ventilación CTE · cero en locales opcionales',()=>{const r=calculateVentilation({bedrooms:1,livingRooms:0,kitchens:1,bathrooms:0,toilets:0});assert.equal(r.bathrooms,0);assert.equal(r.toilets,0);});
test('Ventilación CTE · negativo',()=>assert.throws(()=>calculateVentilation({...ventilation,bathrooms:-1}),RangeError));
test('Ventilación CTE · vacío',()=>assert.throws(()=>calculateVentilation({...ventilation,bedrooms:''}),RangeError));
test('Ventilación CTE · decimal con coma entero',()=>assert.equal(calculateVentilation({...ventilation,bedrooms:'2,0'}).bedrooms,2));
test('Ventilación CTE · manual 3 dormitorios',()=>{const r=calculateVentilation({bedrooms:3,livingRooms:1,kitchens:1,bathrooms:2,toilets:0});near(r.dryMinimumLs,26);near(r.wetMinimumLs,33);near(r.balancedLs,33);near(r.admissionIncreaseLs,7);});
test('Ventilación CTE · húmedos por local pueden dominar mínimo total',()=>{const r=calculateVentilation({bedrooms:3,livingRooms:1,kitchens:1,bathrooms:5,toilets:0});near(r.wetMinimumLs,48);near(r.balancedLs,48);});
test('Ventilación CTE · extracción de cocción queda separada del caudal general',()=>{const r=calculateVentilation(ventilation);assert.equal(r.kitchenSpecificExtractionLs,50);assert.equal(VENTILATION_CTE.kitchenSpecificExtractionLs,50);});

const bill={consumptionKwh:250,energyPrice:'0,15',powerKw:'4,6',powerPriceKwDay:'0,10',days:30,electricityTaxPercent:'5,11269632',vatPercent:21,meterRental:'0,81',otherBeforeVat:0,otherAfterVat:0};
test('Factura · normal',()=>{const r=calculateElectricityBill(bill);near(r.energyTerm,37.5);near(r.powerTerm,13.8);near(r.electricityTax,51.3*0.0511269632);near(r.total,r.beforeVat*1.21);});
test('Factura · mínimo',()=>near(calculateElectricityBill({consumptionKwh:0,energyPrice:0,powerKw:0,powerPriceKwDay:0,days:1,electricityTaxPercent:0,vatPercent:0,meterRental:0,otherBeforeVat:0,otherAfterVat:0}).total,0));
test('Factura · máximo razonable',()=>assert.doesNotThrow(()=>calculateElectricityBill({consumptionKwh:100000,energyPrice:10,powerKw:1000,powerPriceKwDay:10,days:366,electricityTaxPercent:100,vatPercent:100,meterRental:10000,otherBeforeVat:100000,otherAfterVat:100000})));
test('Factura · cero consumo mantiene términos fijos',()=>{const r=calculateElectricityBill({...bill,consumptionKwh:0,energyPrice:0});assert.ok(r.powerTerm>0);assert.ok(r.total>0);});
test('Factura · negativo',()=>assert.throws(()=>calculateElectricityBill({...bill,energyPrice:-1}),RangeError));
test('Factura · vacío',()=>assert.throws(()=>calculateElectricityBill({...bill,days:''}),RangeError));
test('Factura · decimal con coma',()=>near(calculateElectricityBill({...bill,energyPrice:'0,20'}).energyTerm,50));
test('Factura · manual sin impuestos',()=>{const r=calculateElectricityBill({consumptionKwh:100,energyPrice:0.2,powerKw:2,powerPriceKwDay:0.1,days:10,electricityTaxPercent:0,vatPercent:0,meterRental:1,otherBeforeVat:3,otherAfterVat:4});near(r.energyTerm,20);near(r.powerTerm,2);near(r.total,30.1);});
test('Factura · mínimo legal doméstico del impuesto eléctrico',()=>{const r=calculateElectricityBill({consumptionKwh:1,energyPrice:0,powerKw:0,powerPriceKwDay:0,days:1,electricityTaxPercent:0,vatPercent:0,meterRental:0,otherBeforeVat:0,otherAfterVat:0});near(r.electricityTax,0.001);near(r.total,0.001);});
test('Factura · parámetros regulados centralizados y fechados',()=>{assert.equal(ELECTRICITY_BILL_REGULATION.checkedAt,'2026-10-06');assert.equal(ELECTRICITY_BILL_REGULATION.electricityTax.valuePercent,5.11269632);assert.equal(ELECTRICITY_BILL_REGULATION.vat.valuePercent,21);});

const solar={latitude:'40,63',longitude:'-3,17',peakPowerKw:5,tilt:30,azimuth:0,lossPercent:14,technology:'crystSi',mounting:'building'};
const pvgisFixture={outputs:{monthly:{fixed:Array.from({length:12},(_,i)=>({month:i+1,E_m:400+i,'H(i)_m':100+i}))},totals:{fixed:{E_y:5000,SD_y:200,l_total:21.5}}}};
test('Solar PVGIS · normal',()=>{const r=buildPvgisUrl(solar);assert.match(r.url,/api\/v5_3\/PVcalc/);assert.match(r.url,/peakpower=5/);});
test('Solar PVGIS · mínimo',()=>assert.doesNotThrow(()=>validateSolarInputs({latitude:-90,longitude:-180,peakPowerKw:0.1,tilt:0,azimuth:-180,lossPercent:0,technology:'Unknown',mounting:'free'})));
test('Solar PVGIS · máximo razonable',()=>assert.doesNotThrow(()=>validateSolarInputs({latitude:90,longitude:180,peakPowerKw:10000,tilt:90,azimuth:180,lossPercent:99,technology:'CdTe',mounting:'building'})));
test('Solar PVGIS · cero permitido en inclinación y azimut',()=>{const r=validateSolarInputs({...solar,tilt:0,azimuth:0,lossPercent:0});near(r.tilt,0);near(r.lossPercent,0);});
test('Solar PVGIS · negativo imposible',()=>assert.throws(()=>validateSolarInputs({...solar,peakPowerKw:-1}),RangeError));
test('Solar PVGIS · vacío',()=>assert.throws(()=>validateSolarInputs({...solar,latitude:''}),RangeError));
test('Solar PVGIS · decimal con coma',()=>near(validateSolarInputs(solar).latitude,40.63));
test('Solar PVGIS · manual conocido desde JSON',()=>{const r=parsePvgisResult(pvgisFixture,5);near(r.annualKwh,5000);near(r.specificYieldKwhPerKwp,1000);near(r.rangeLowKwh,4800);near(r.rangeHighKwh,5200);assert.equal(r.months.length,12);});
test('Solar PVGIS · parser rechaza JSON incompleto',()=>assert.throws(()=>parsePvgisResult({outputs:{}},5),RangeError));
test('Solar PVGIS · no incorpora clave ni llamada AJAX',()=>{const {url}=buildPvgisUrl(solar);assert.ok(!/key=|token=|apikey=/i.test(url));assert.match(PVGIS_META.cors,/no permite acceso AJAX/i);});

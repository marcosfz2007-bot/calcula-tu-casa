import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateEnergy as calc,parseDecimal,validate} from '../src/lib/energy.mjs';
import {tools} from '../src/lib/catalog.mjs';
const ac=tools[0].defaults;
for (const tool of tools) {
 const v=tool.defaults;
 test(`${tool.short}: caso normal y cálculo manual`,()=>{const r=calc(v);const expected=tool===tools[0]?[144,28.8,432]:[157.5,31.5,630]; assert.ok(Math.abs(r.monthlyKwh-expected[0])<1e-9);assert.ok(Math.abs(r.monthlyCost-expected[1])<1e-9);assert.ok(Math.abs(r.annualKwh-expected[2])<1e-9);});
 test(`${tool.short}: mínimo y cero`,()=>{assert.equal(calc({...v,watts:0,hours:0,days:0,price:0,factor:0,units:1,months:0}).monthlyCost,0);});
 test(`${tool.short}: máximo`,()=>{const r=calc({...v,watts:30000,hours:24,days:30,price:5,factor:100,units:20,months:12});assert.equal(r.annualCost,25920000);assert.equal(r.highCost,r.monthlyCost);});
 test(`${tool.short}: negativo`,()=>assert.throws(()=>calc({...v,watts:-1}),RangeError));
 test(`${tool.short}: campo vacío`,()=>assert.equal(validate({...v,hours:''}).valid,false));
 test(`${tool.short}: decimal con coma`,()=>assert.equal(calc({...v,price:'0,25'}).monthlyCost,calc({...v,price:0.25}).monthlyCost));
 test(`${tool.short}: referencia de 1 kWh`,()=>{const r=calc({...v,watts:1000,hours:1,days:1,factor:100,price:'0,20',units:1,months:1});assert.equal(r.monthlyKwh,1);assert.equal(r.monthlyCost,0.2);});
 test(`${tool.short}: porcentaje cero`,()=>assert.equal(calc({...v,factor:0}).monthlyCost,0));
 test(`${tool.short}: escenario +/-20%`,()=>{const r=calc(v);assert.ok(Math.abs(r.lowCost-r.monthlyCost*.8)<1e-9);assert.ok(Math.abs(r.highCost-r.monthlyCost*1.2)<1e-9);});
}
test('Rechaza formatos ambiguos e infinitos',()=>{for(const value of ['', ' ', '1.000,5','1,000.5','1e3',null,undefined,Infinity,NaN,'abc'])assert.ok(Number.isNaN(parseDecimal(value)));});
test('Acepta punto, coma y espacios alrededor',()=>{for(const value of [' 1,5 ', '1.5',1.5])assert.equal(parseDecimal(value),1.5);});
test('Rechaza fracciones de equipos, días o meses y valores fuera de rango',()=>{for(const [key,value] of [['units',1.5],['days',1.2],['months',1.3],['hours',25],['price',6],['factor',101],['days',32],['units',0],['months',13]])assert.equal(validate({...ac,[key]:value}).valid,false);});
test('No permite más de 365 días/año',()=>assert.equal(validate({...ac,days:31,months:12}).valid,false));
test('Suma lineal de equipos y año estacional',()=>{assert.equal(calc({...ac,units:2}).monthlyCost,calc(ac).monthlyCost*2);assert.equal(calc({...ac,months:0}).annualCost,0);});

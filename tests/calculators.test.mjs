import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateEnergy} from '../src/lib/calculators/energy.mjs';
import {calculateThermo} from '../src/lib/calculators/thermo.mjs';
import {calculateDewPoint} from '../src/lib/calculators/dew-point.mjs';
import {calculateTransmittance} from '../src/lib/calculators/transmittance.mjs';
import {calculateCooling} from '../src/lib/calculators/cooling.mjs';
import {calculatePower} from '../src/lib/calculators/power.mjs';
import {calculateAppliances} from '../src/lib/calculators/appliances.mjs';

const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);

const energyCases=[
 ['Aire acondicionado',{watts:1000,hours:8,days:30,price:'0,20',factor:60,units:1,months:3},144,28.8,432],
 ['Radiador eléctrico',{watts:1500,hours:5,days:30,price:'0,20',factor:70,units:1,months:4},157.5,31.5,630]
];
for(const [name,base,kwh,cost,annual] of energyCases){
 test(name+' · normal',()=>{const r=calculateEnergy(base);near(r.monthlyKwh,kwh);near(r.monthlyCost,cost);near(r.annualKwh,annual);});
 test(name+' · mínimo',()=>near(calculateEnergy({...base,watts:0,hours:0,days:0,price:0,factor:0,months:0}).monthlyCost,0));
 test(name+' · máximo razonable',()=>near(calculateEnergy({...base,watts:30000,hours:24,days:30,price:5,factor:100,units:20,months:12}).annualCost,25920000));
 test(name+' · cero',()=>near(calculateEnergy({...base,factor:0}).monthlyKwh,0));
 test(name+' · negativo',()=>assert.throws(()=>calculateEnergy({...base,watts:-1}),RangeError));
 test(name+' · vacío',()=>assert.throws(()=>calculateEnergy({...base,hours:''}),RangeError));
 test(name+' · decimal con coma',()=>near(calculateEnergy({...base,price:'0,25'}).monthlyCost,calculateEnergy({...base,price:0.25}).monthlyCost));
 test(name+' · manual 1 kWh',()=>{const r=calculateEnergy({...base,watts:1000,hours:1,days:1,price:'0,20',factor:100,units:1,months:1});near(r.monthlyKwh,1);near(r.monthlyCost,0.2);});
}

const thermo={persons:3,showers:3,litresPerShower:50,cold:15,target:60,powerW:2000,volume:100,price:'0,20'};
test('Termo · normal',()=>{const r=calculateThermo(thermo);near(r.energyTank,5.2335);near(r.heatTimeHours,2.61675);});
test('Termo · mínimo',()=>assert.doesNotThrow(()=>calculateThermo({persons:1,showers:0,litresPerShower:0,cold:19,target:20,powerW:100,volume:10,price:0})));
test('Termo · máximo razonable',()=>assert.doesNotThrow(()=>calculateThermo({persons:20,showers:40,litresPerShower:300,cold:0,target:90,powerW:12000,volume:1000,price:5})));
test('Termo · cero',()=>near(calculateThermo({...thermo,showers:0}).dailyEnergy,0));
test('Termo · negativo',()=>assert.throws(()=>calculateThermo({...thermo,volume:-1}),RangeError));
test('Termo · vacío',()=>assert.throws(()=>calculateThermo({...thermo,powerW:''}),RangeError));
test('Termo · decimal con coma',()=>near(calculateThermo({...thermo,price:'0,25'}).tankCost,calculateThermo({...thermo,price:0.25}).tankCost));
test('Termo · manual 10 L y ΔT 1',()=>near(calculateThermo({...thermo,cold:19,target:20,volume:10}).energyTank,0.01163));

const dew={temperature:20,humidity:60,surface:11,exterior:5};
test('Punto de rocío · normal',()=>{const r=calculateDewPoint(dew);assert.ok(r.dewPoint>11.9&&r.dewPoint<12.1);assert.equal(r.condensationPossible,true);});
test('Punto de rocío · mínimo',()=>assert.doesNotThrow(()=>calculateDewPoint({temperature:-45,humidity:1,surface:-60,exterior:-60})));
test('Punto de rocío · máximo razonable',()=>assert.doesNotThrow(()=>calculateDewPoint({temperature:60,humidity:100,surface:80,exterior:60})));
test('Punto de rocío · cero',()=>assert.throws(()=>calculateDewPoint({...dew,humidity:0}),RangeError));
test('Punto de rocío · negativo',()=>assert.throws(()=>calculateDewPoint({...dew,humidity:-1}),RangeError));
test('Punto de rocío · vacío',()=>assert.throws(()=>calculateDewPoint({...dew,temperature:''}),RangeError));
test('Punto de rocío · decimal con coma',()=>near(calculateDewPoint({...dew,temperature:'20,5'}).dewPoint,calculateDewPoint({...dew,temperature:20.5}).dewPoint));
test('Punto de rocío · manual a 100 % HR',()=>near(calculateDewPoint({...dew,temperature:20,humidity:100,surface:20}).dewPoint,20));

const wall={surface:'wall',layers:[{name:'Aislante',thicknessMm:100,lambda:0.04}],targetU:0.3,extraLambda:0.04};
test('Transmitancia · normal',()=>{const r=calculateTransmittance(wall);near(r.layers[0].r,2.5);near(r.totalR,2.67);near(r.u,1/2.67);});
test('Transmitancia · mínimo',()=>assert.doesNotThrow(()=>calculateTransmittance({...wall,layers:[{thicknessMm:0,lambda:0.001}]})));
test('Transmitancia · máximo razonable',()=>assert.doesNotThrow(()=>calculateTransmittance({...wall,layers:[{thicknessMm:2000,lambda:10}],targetU:10,extraLambda:1})));
test('Transmitancia · cero',()=>near(calculateTransmittance({...wall,layers:[{thicknessMm:0,lambda:0.04}],targetU:'',extraLambda:''}).totalR,0.17));
test('Transmitancia · negativo',()=>assert.throws(()=>calculateTransmittance({...wall,layers:[{thicknessMm:-1,lambda:0.04}]}),RangeError));
test('Transmitancia · vacío',()=>assert.throws(()=>calculateTransmittance({...wall,layers:[{thicknessMm:'',lambda:0.04}]}),RangeError));
test('Transmitancia · decimal con coma',()=>near(calculateTransmittance({...wall,layers:[{thicknessMm:100,lambda:'0,040'}]}).u,calculateTransmittance(wall).u));
test('Transmitancia · manual R=d/lambda',()=>near(calculateTransmittance({...wall,layers:[{thicknessMm:100,lambda:0.05}]}).layers[0].r,2));

const cooling={area:30,height:2.5,climate:'warm',orientation:'S',insulation:'average',glass:5,people:2,internalW:200};
test('Frigorías · normal',()=>{const r=calculateCooling(cooling);assert.ok(r.centralW>0);near(r.kw,r.centralW/1000);near(r.frigoriaH,r.centralW/1.163);});
test('Frigorías · mínimo',()=>assert.doesNotThrow(()=>calculateCooling({area:1,height:2,climate:'mild',orientation:'N',insulation:'good',glass:0,people:0,internalW:0})));
test('Frigorías · máximo razonable',()=>assert.doesNotThrow(()=>calculateCooling({area:500,height:6,climate:'hot',orientation:'S',insulation:'poor',glass:500,people:30,internalW:20000})));
test('Frigorías · cero',()=>assert.throws(()=>calculateCooling({...cooling,area:0}),RangeError));
test('Frigorías · negativo',()=>assert.throws(()=>calculateCooling({...cooling,glass:-1}),RangeError));
test('Frigorías · vacío',()=>assert.throws(()=>calculateCooling({...cooling,height:''}),RangeError));
test('Frigorías · decimal con coma',()=>near(calculateCooling({...cooling,height:'2,5'}).centralW,calculateCooling(cooling).centralW));
test('Frigorías · manual base simple',()=>near(calculateCooling({area:10,height:2.5,climate:'mild',orientation:'N',insulation:'average',glass:0,people:0,internalW:0}).centralW,1104.85));

const power={items:[{name:'A',selected:true,watts:2000},{name:'B',selected:true,watts:1000}]};
test('Potencia · normal',()=>{const r=calculatePower(power);near(r.nominalW,3000);near(r.scenarios.habitual,1950);});
test('Potencia · mínimo',()=>near(calculatePower({items:[{name:'A',selected:true,watts:1}]}).nominalW,1));
test('Potencia · máximo razonable',()=>near(calculatePower({items:Array.from({length:12},(_,i)=>({name:String(i),selected:true,watts:30000}))}).nominalW,360000));
test('Potencia · cero',()=>assert.throws(()=>calculatePower({items:[{name:'A',selected:true,watts:0}]}),RangeError));
test('Potencia · negativo',()=>assert.throws(()=>calculatePower({items:[{name:'A',selected:true,watts:-1}]}),RangeError));
test('Potencia · vacío',()=>assert.throws(()=>calculatePower({items:[{name:'A',selected:true,watts:''}]}),RangeError));
test('Potencia · decimal con coma',()=>near(calculatePower({items:[{name:'A',selected:true,watts:'1000,5'}]}).nominalW,1000.5));
test('Potencia · manual 65 %',()=>near(calculatePower({items:[{name:'A',selected:true,watts:8000}]}).scenarios.habitual,5200));

const appliances={price:'0,20',items:[{name:'A',mode:'hours',watts:100,hoursDay:5}]};
test('Electrodomésticos · normal',()=>{const r=calculateAppliances(appliances);near(r.annualKwh,182.5);near(r.annualCost,36.5);});
test('Electrodomésticos · mínimo',()=>near(calculateAppliances({price:0,items:[{name:'A',mode:'hours',watts:0,hoursDay:0}]}).annualKwh,0));
test('Electrodomésticos · máximo razonable',()=>near(calculateAppliances({price:5,items:[{name:'A',mode:'hours',watts:30000,hoursDay:24}]}).annualKwh,262800));
test('Electrodomésticos · cero',()=>near(calculateAppliances({price:0.2,items:[{name:'A',mode:'cycle',kwhCycle:0,cyclesWeek:0}]}).annualKwh,0));
test('Electrodomésticos · negativo',()=>assert.throws(()=>calculateAppliances({price:0.2,items:[{name:'A',mode:'hours',watts:-1,hoursDay:1}]}),RangeError));
test('Electrodomésticos · vacío',()=>assert.throws(()=>calculateAppliances({price:0.2,items:[{name:'A',mode:'hours',watts:'',hoursDay:1}]}),RangeError));
test('Electrodomésticos · decimal con coma',()=>near(calculateAppliances({price:'0,20',items:[{name:'A',mode:'hours',watts:'100,5',hoursDay:1}]}).annualKwh,calculateAppliances({price:0.2,items:[{name:'A',mode:'hours',watts:100.5,hoursDay:1}]}).annualKwh));
test('Electrodomésticos · manual por ciclo',()=>near(calculateAppliances({price:0.2,items:[{name:'A',mode:'cycle',kwhCycle:1,cyclesWeek:4}]}).annualKwh,208));

import {numberIn} from './common.mjs';
import {simplePaybackYears} from './investment-common.mjs';

export function calculateWindowSavings(raw){
  const areaM2=numberIn(raw.areaM2,{name:'areaM2',min:0,max:100000});
  const currentU=numberIn(raw.currentU,{name:'currentU',min:0.001,max:20});
  const newU=numberIn(raw.newU,{name:'newU',min:0.001,max:20});
  const interiorTempC=numberIn(raw.interiorTempC,{name:'interiorTempC',min:-100,max:100});
  const exteriorTempC=numberIn(raw.exteriorTempC,{name:'exteriorTempC',min:-100,max:100});
  if(interiorTempC<exteriorTempC) throw Object.assign(new RangeError('exteriorTempC: para un escenario de calefacción, la temperatura exterior no puede superar a la interior.'),{field:'exteriorTempC'});
  const equivalentHours=numberIn(raw.equivalentHours,{name:'equivalentHours',min:0,max:8760});
  const performance=numberIn(raw.performance,{name:'performance',min:0.01,max:20});
  const energyPrice=numberIn(raw.energyPrice,{name:'energyPrice',min:0,max:10});
  const replacementCost=numberIn(raw.replacementCost,{name:'replacementCost',min:0,max:10000000,optional:true});
  const deltaT=interiorTempC-exteriorTempC;
  const currentPowerW=currentU*areaM2*deltaT;
  const newPowerW=newU*areaM2*deltaT;
  const rawPowerDifferenceW=currentPowerW-newPowerW;
  const avoidedPowerW=Math.max(0,rawPowerDifferenceW);
  const thermalEnergySavedKwh=avoidedPowerW*equivalentHours/1000;
  const purchasedEnergySavedKwh=thermalEnergySavedKwh/performance;
  const annualSaving=purchasedEnergySavedKwh*energyPrice;
  const paybackYears=replacementCost===null?null:simplePaybackYears(replacementCost,annualSaving);
  return {areaM2,currentU,newU,interiorTempC,exteriorTempC,deltaT,equivalentHours,performance,energyPrice,replacementCost,currentPowerW,newPowerW,rawPowerDifferenceW,avoidedPowerW,thermalEnergySavedKwh,purchasedEnergySavedKwh,annualSaving,paybackYears,improves:newU<currentU};
}

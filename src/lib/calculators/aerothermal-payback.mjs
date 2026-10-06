import {numberIn} from './common.mjs';
import {annualEnergyCost} from './heating-common.mjs';
import {simplePaybackYears} from './investment-common.mjs';

export const AEROTHERMAL_META=Object.freeze({
  version:'1.0',checkedAt:'2026-10-06',
  source:'IDAE documenta SCOP como relación estacional entre calor útil y electricidad consumida. Los valores concretos de rendimiento, SCOP, precios e inversión los introduce el usuario.'
});

export function calculateAerothermalPayback(raw){
  const usefulHeatKwh=numberIn(raw.usefulHeatKwh,{name:'usefulHeatKwh',min:0,max:1000000});
  const currentFuelPrice=numberIn(raw.currentFuelPrice,{name:'currentFuelPrice',min:0,max:10});
  const currentEfficiencyPercent=numberIn(raw.currentEfficiencyPercent,{name:'currentEfficiencyPercent',min:1,max:150});
  const scop=numberIn(raw.scop,{name:'scop',min:0.1,max:10});
  const electricityPrice=numberIn(raw.electricityPrice,{name:'electricityPrice',min:0,max:10});
  const investment=numberIn(raw.investment,{name:'investment',min:0,max:1000000});
  const aid=numberIn(raw.aid,{name:'aid',min:0,max:1000000});
  const currentMaintenance=numberIn(raw.currentMaintenance,{name:'currentMaintenance',min:0,max:100000});
  const aerothermalMaintenance=numberIn(raw.aerothermalMaintenance,{name:'aerothermalMaintenance',min:0,max:100000});
  const sensitivityPercent=numberIn(raw.sensitivityPercent,{name:'sensitivityPercent',min:0,max:50});
  if(aid>investment) throw Object.assign(new RangeError('aid: las ayudas no pueden superar la inversión introducida.'),{field:'aid'});

  const current=annualEnergyCost({usefulHeatKwh,performance:currentEfficiencyPercent/100,unitPrice:currentFuelPrice,fixedCost:currentMaintenance});
  const aero=annualEnergyCost({usefulHeatKwh,performance:scop,unitPrice:electricityPrice,fixedCost:aerothermalMaintenance});
  const annualSaving=current.annualCost-aero.annualCost;
  const savingPercent=current.annualCost===0?null:annualSaving/current.annualCost*100;
  const netInvestment=investment-aid;
  const paybackYears=simplePaybackYears(netInvestment,annualSaving);

  const delta=sensitivityPercent/100;
  const lowScop=Math.max(0.1,scop*(1-delta));
  const highScop=scop*(1+delta);
  const lowScopCost=annualEnergyCost({usefulHeatKwh,performance:lowScop,unitPrice:electricityPrice,fixedCost:aerothermalMaintenance}).annualCost;
  const highScopCost=annualEnergyCost({usefulHeatKwh,performance:highScop,unitPrice:electricityPrice,fixedCost:aerothermalMaintenance}).annualCost;

  return {
    usefulHeatKwh,current,aerothermal:aero,annualSaving,savingPercent,netInvestment,paybackYears,
    sensitivity:{percent:sensitivityPercent,lowScop,highScop,lowScopCost,centralCost:aero.annualCost,highScopCost}
  };
}

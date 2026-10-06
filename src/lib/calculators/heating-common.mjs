import {numberIn} from './common.mjs';

export function usefulHeatInput(raw,{name='usefulHeatKwh',max=1000000}={}){
  return numberIn(raw,{name,min:0,max});
}

export function efficiencyRatio(raw,{name='efficiency',min=0.01,max=10}={}){
  return numberIn(raw,{name,min,max});
}

export function purchasedEnergyFromUsefulHeat(usefulHeatKwh,performance){
  if(!Number.isFinite(usefulHeatKwh)||usefulHeatKwh<0) throw new RangeError('usefulHeatKwh: valor no válido.');
  if(!Number.isFinite(performance)||performance<=0) throw new RangeError('performance: debe ser mayor que cero.');
  return usefulHeatKwh/performance;
}

export function annualEnergyCost({usefulHeatKwh,performance,unitPrice,fixedCost=0}){
  const purchasedEnergyKwh=purchasedEnergyFromUsefulHeat(usefulHeatKwh,performance);
  return {
    purchasedEnergyKwh,
    variableCost:purchasedEnergyKwh*unitPrice,
    fixedCost,
    annualCost:purchasedEnergyKwh*unitPrice+fixedCost
  };
}

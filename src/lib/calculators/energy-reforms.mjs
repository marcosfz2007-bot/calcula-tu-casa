import {numberIn} from './common.mjs';

export const ENERGY_REFORMS_META=Object.freeze({
  version:'1.0',checkedAt:'2026-10-06',
  source:'Modelo simplificado de pérdidas por transmisión basado en ΔU × A × HDD × 24 / 1000. HDD, rendimiento/SCOP, precios y costes son datos del usuario.'
});

export function calculateEnergyReforms(raw){
  const hdd=numberIn(raw.hdd,{name:'hdd',min:0,max:10000});
  const systemPerformance=numberIn(raw.systemPerformance,{name:'systemPerformance',min:0.1,max:10});
  const energyPrice=numberIn(raw.energyPrice,{name:'energyPrice',min:0,max:10});
  if(!Array.isArray(raw.actions)||raw.actions.length===0) throw Object.assign(new RangeError('actions: añade al menos una actuación.'),{field:'actions'});
  const actions=raw.actions.map((action,index)=>{
    const name=(action.name||'').trim()||`Actuación ${index+1}`;
    const area=numberIn(action.area,{name:`action-${index}-area`,min:0,max:100000});
    const uInitial=numberIn(action.uInitial,{name:`action-${index}-uInitial`,min:0.01,max:20});
    const uNew=numberIn(action.uNew,{name:`action-${index}-uNew`,min:0.01,max:20});
    const cost=numberIn(action.cost,{name:`action-${index}-cost`,min:0,max:10000000});
    const deltaU=Math.max(0,uInitial-uNew);
    const validImprovement=uNew<uInitial;
    const thermalSavingKwh=deltaU*area*hdd*24/1000;
    const purchasedEnergySavingKwh=thermalSavingKwh/systemPerformance;
    const annualMoneySaving=purchasedEnergySavingKwh*energyPrice;
    const paybackYears=annualMoneySaving>0?cost/annualMoneySaving:null;
    return {name,area,uInitial,uNew,cost,deltaU,validImprovement,thermalSavingKwh,purchasedEnergySavingKwh,annualMoneySaving,paybackYears};
  });
  const ranked=[...actions].sort((a,b)=>{
    if(a.paybackYears===null&&b.paybackYears===null) return b.annualMoneySaving-a.annualMoneySaving;
    if(a.paybackYears===null) return 1;
    if(b.paybackYears===null) return -1;
    return a.paybackYears-b.paybackYears;
  });
  return {hdd,systemPerformance,energyPrice,actions:ranked};
}

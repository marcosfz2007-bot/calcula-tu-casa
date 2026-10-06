import {numberIn} from './common.mjs';

export function calculateSolarBattery(raw){
  const dailyShiftKwh=numberIn(raw.dailyShiftKwh,{name:'dailyShiftKwh',min:0,max:10000});
  const autonomyDays=numberIn(raw.autonomyDays,{name:'autonomyDays',min:0,max:30});
  const usableFractionPercent=numberIn(raw.usableFractionPercent,{name:'usableFractionPercent',min:0.01,max:100});
  const roundTripEfficiencyPercent=numberIn(raw.roundTripEfficiencyPercent,{name:'roundTripEfficiencyPercent',min:0.01,max:100});
  const dailySurplusKwh=numberIn(raw.dailySurplusKwh,{name:'dailySurplusKwh',min:0,max:10000,optional:true});
  const requiredPowerKw=numberIn(raw.requiredPowerKw,{name:'requiredPowerKw',min:0,max:1000,optional:true});
  const moduleCapacityKwh=numberIn(raw.moduleCapacityKwh,{name:'moduleCapacityKwh',min:0.01,max:1000,optional:true});
  const usefulTargetKwh=dailyShiftKwh*autonomyDays;
  const nominalCapacityKwh=usefulTargetKwh/(usableFractionPercent/100);
  const chargeInputKwh=usefulTargetKwh/(roundTripEfficiencyPercent/100);
  const estimatedLossesKwh=chargeInputKwh-usefulTargetKwh;
  const modules=moduleCapacityKwh===null?null:(nominalCapacityKwh===0?0:Math.ceil(nominalCapacityKwh/moduleCapacityKwh));
  const surplusSufficient=dailySurplusKwh===null?null:dailySurplusKwh>=chargeInputKwh;
  const surplusShortfallKwh=dailySurplusKwh===null?null:Math.max(0,chargeInputKwh-dailySurplusKwh);
  return {dailyShiftKwh,autonomyDays,usableFractionPercent,roundTripEfficiencyPercent,dailySurplusKwh,requiredPowerKw,moduleCapacityKwh,usefulTargetKwh,nominalCapacityKwh,chargeInputKwh,estimatedLossesKwh,modules,surplusSufficient,surplusShortfallKwh};
}

import {numberIn} from './common.mjs';

export function calculateWaterTank(raw){
  const mode=raw.mode==='persons'?'persons':'manual';
  let dailyDemandLitres,persons=null,litresPerPersonDay=null;
  if(mode==='persons'){
    persons=numberIn(raw.persons,{name:'persons',min:0,max:100000,integer:true});
    litresPerPersonDay=numberIn(raw.litresPerPersonDay,{name:'litresPerPersonDay',min:0,max:100000});
    dailyDemandLitres=persons*litresPerPersonDay;
  }else{
    dailyDemandLitres=numberIn(raw.dailyDemandLitres,{name:'dailyDemandLitres',min:0,max:100000000});
  }
  const autonomyDays=numberIn(raw.autonomyDays,{name:'autonomyDays',min:0,max:365});
  const reservePercent=numberIn(raw.reservePercent,{name:'reservePercent',min:0,max:500});
  const usableFractionPercent=numberIn(raw.usableFractionPercent,{name:'usableFractionPercent',min:0.01,max:100,optional:true});
  const commercialTankLitres=numberIn(raw.commercialTankLitres,{name:'commercialTankLitres',min:0.01,max:100000000,optional:true});
  const baseDemandLitres=dailyDemandLitres*autonomyDays;
  const usefulTargetLitres=baseDemandLitres*(1+reservePercent/100);
  const usableFraction=usableFractionPercent===null?1:usableFractionPercent/100;
  const nominalCapacityLitres=usefulTargetLitres/usableFraction;
  const nominalCapacityM3=nominalCapacityLitres/1000;
  const tanks=commercialTankLitres===null?null:(nominalCapacityLitres===0?0:Math.ceil(nominalCapacityLitres/commercialTankLitres));
  const installedCapacityLitres=tanks===null?null:tanks*commercialTankLitres;
  return {mode,dailyDemandLitres,persons,litresPerPersonDay,autonomyDays,reservePercent,usableFractionPercent,commercialTankLitres,baseDemandLitres,usefulTargetLitres,nominalCapacityLitres,nominalCapacityM3,tanks,installedCapacityLitres};
}

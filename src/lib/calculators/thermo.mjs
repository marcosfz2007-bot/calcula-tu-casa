import {numberIn} from './common.mjs';
export const THERMO_META=Object.freeze({version:'1.0',checkedAt:'2026-10-05',kwhPerLitreKelvin:0.001163,source:'E = V × 0,001163 × ΔT'});
export function calculateThermo(raw){
 const persons=numberIn(raw.persons,{name:'persons',min:1,max:20,integer:true});
 const showers=numberIn(raw.showers,{name:'showers',min:0,max:40,integer:true});
 const litresPerShower=numberIn(raw.litresPerShower,{name:'litresPerShower',min:0,max:300});
 const cold=numberIn(raw.cold,{name:'cold',min:0,max:35});
 const target=numberIn(raw.target,{name:'target',min:20,max:90});
 const powerW=numberIn(raw.powerW,{name:'powerW',min:100,max:12000});
 const volume=numberIn(raw.volume,{name:'volume',min:10,max:1000});
 const price=numberIn(raw.price,{name:'price',min:0,max:5});
 if(target<=cold) throw Object.assign(new RangeError('target: la temperatura objetivo debe ser mayor que la del agua fría.'),{field:'target'});
 const deltaT=target-cold;
 const energyTank=volume*THERMO_META.kwhPerLitreKelvin*deltaT;
 const heatTimeHours=energyTank/(powerW/1000);
 const dailyLitres=showers*litresPerShower;
 const dailyEnergy=dailyLitres*THERMO_META.kwhPerLitreKelvin*deltaT;
 const coverage=dailyLitres===0?null:volume/dailyLitres;
 return {persons,deltaT,energyTank,heatTimeHours,dailyLitres,dailyEnergy,tankCost:energyTank*price,dailyCost:dailyEnergy*price,coverage};
}

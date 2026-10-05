import {numberIn} from './common.mjs';
export const ENERGY_META=Object.freeze({version:'1.1',checkedAt:'2026-10-05',wattsPerKilowatt:1000,percentScale:100});
export function calculateEnergy(raw){
 const watts=numberIn(raw.watts,{name:'watts',min:0,max:30000});
 const hours=numberIn(raw.hours,{name:'hours',min:0,max:24});
 const days=numberIn(raw.days,{name:'days',min:0,max:31,integer:true});
 const price=numberIn(raw.price,{name:'price',min:0,max:5});
 const factor=numberIn(raw.factor,{name:'factor',min:0,max:100});
 const units=numberIn(raw.units,{name:'units',min:1,max:20,integer:true});
 const months=numberIn(raw.months,{name:'months',min:0,max:12,integer:true});
 if(days*months>365) throw Object.assign(new RangeError('months: la combinación supera 365 días de uso al año.'),{field:'months'});
 const hourlyKwh=watts/1000*(factor/100)*units;
 const dailyKwh=hourlyKwh*hours;
 const monthlyKwh=dailyKwh*days;
 const annualKwh=monthlyKwh*months;
 return {hourlyKwh,dailyKwh,monthlyKwh,annualKwh,hourlyCost:hourlyKwh*price,dailyCost:dailyKwh*price,monthlyCost:monthlyKwh*price,annualCost:annualKwh*price};
}

import {numberIn} from './common.mjs';

export function calculateDehumidifier(raw){
  const powerW=numberIn(raw.powerW,{name:'powerW',min:0,max:100000});
  const hoursPerDay=numberIn(raw.hoursPerDay,{name:'hoursPerDay',min:0,max:24});
  const daysPerMonth=numberIn(raw.daysPerMonth,{name:'daysPerMonth',min:0,max:31,integer:true});
  const daysPerYear=numberIn(raw.daysPerYear,{name:'daysPerYear',min:0,max:366,integer:true});
  const price=numberIn(raw.price,{name:'price',min:0,max:10});
  const nominalLitresPerDay=numberIn(raw.nominalLitresPerDay,{name:'nominalLitresPerDay',min:0.01,max:1000,optional:true});
  const dailyKwh=powerW/1000*hoursPerDay;
  const monthlyKwh=dailyKwh*daysPerMonth;
  const annualKwh=dailyKwh*daysPerYear;
  const dailyCost=dailyKwh*price;
  const monthlyCost=monthlyKwh*price;
  const annualCost=annualKwh*price;
  const nominalWhPerL=nominalLitresPerDay===null?null:powerW*24/nominalLitresPerDay;
  const nominalCostPerL=nominalWhPerL===null?null:nominalWhPerL/1000*price;
  return {powerW,hoursPerDay,daysPerMonth,daysPerYear,price,nominalLitresPerDay,dailyKwh,monthlyKwh,annualKwh,dailyCost,monthlyCost,annualCost,nominalWhPerL,nominalCostPerL};
}

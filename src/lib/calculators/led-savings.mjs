import {numberIn} from './common.mjs';
import {kwhFromWatts,energyCost,simplePositivePayback} from './electric-energy-common.mjs';

export function calculateLedSavings(raw){
  const bulbs=numberIn(raw.bulbs,{name:'bulbs',min:0,max:100000,integer:true});
  const currentWatts=numberIn(raw.currentWatts,{name:'currentWatts',min:0,max:100000});
  const ledWatts=numberIn(raw.ledWatts,{name:'ledWatts',min:0,max:100000});
  const hoursPerDay=numberIn(raw.hoursPerDay,{name:'hoursPerDay',min:0,max:24});
  const daysPerYear=numberIn(raw.daysPerYear,{name:'daysPerYear',min:0,max:366,integer:true});
  const price=numberIn(raw.price,{name:'price',min:0,max:10});
  const investment=numberIn(raw.investment,{name:'investment',min:0,max:1000000,optional:true});
  const currentKwh=kwhFromWatts({watts:currentWatts,hours:hoursPerDay,days:daysPerYear,units:bulbs});
  const ledKwh=kwhFromWatts({watts:ledWatts,hours:hoursPerDay,days:daysPerYear,units:bulbs});
  const savingKwh=currentKwh-ledKwh;
  const savingPercent=currentKwh===0?null:savingKwh/currentKwh*100;
  const currentCost=energyCost(currentKwh,price);
  const ledCost=energyCost(ledKwh,price);
  const annualSaving=currentCost-ledCost;
  const paybackYears=investment===null?null:simplePositivePayback(investment,annualSaving);
  return {bulbs,currentWatts,ledWatts,hoursPerDay,daysPerYear,price,investment,currentKwh,ledKwh,savingKwh,savingPercent,currentCost,ledCost,annualSaving,paybackYears};
}

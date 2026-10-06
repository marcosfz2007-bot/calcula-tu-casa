import {numberIn} from './common.mjs';
import {kwhFromWatts,energyCost} from './electric-energy-common.mjs';

export function calculateStandby(raw){
  const price=numberIn(raw.price,{name:'price',min:0,max:10});
  const reductionPercent=numberIn(raw.reductionPercent,{name:'reductionPercent',min:0,max:100});
  if(!Array.isArray(raw.items)||raw.items.length===0) throw Object.assign(new RangeError('items: añade al menos un equipo.'),{field:'items'});
  const items=raw.items.map((item,index)=>{
    const name=(item.name||'').trim()||`Equipo ${index+1}`;
    const watts=numberIn(item.watts,{name:`item-${index}-watts`,min:0,max:100000});
    const units=numberIn(item.units,{name:`item-${index}-units`,min:0,max:100000,integer:true});
    const hoursPerDay=numberIn(item.hoursPerDay,{name:`item-${index}-hoursPerDay`,min:0,max:24});
    const daysPerYear=numberIn(item.daysPerYear,{name:`item-${index}-daysPerYear`,min:0,max:366,integer:true});
    const kwh=kwhFromWatts({watts,hours:hoursPerDay,days:daysPerYear,units});
    const cost=energyCost(kwh,price);
    return {name,watts,units,hoursPerDay,daysPerYear,kwh,cost};
  });
  const totalKwh=items.reduce((s,x)=>s+x.kwh,0);
  const totalCost=items.reduce((s,x)=>s+x.cost,0);
  const ranked=[...items].sort((a,b)=>b.kwh-a.kwh).map(x=>({...x,sharePercent:totalKwh===0?0:x.kwh/totalKwh*100}));
  const potentialSavingKwh=totalKwh*reductionPercent/100;
  const potentialSavingCost=totalCost*reductionPercent/100;
  return {price,reductionPercent,items:ranked,totalKwh,totalCost,potentialSavingKwh,potentialSavingCost};
}

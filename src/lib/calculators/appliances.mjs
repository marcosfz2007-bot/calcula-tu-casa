import {numberIn} from './common.mjs';
export const APPLIANCES_META=Object.freeze({version:'1.0',checkedAt:'2026-10-05',daysPerYear:365,weeksPerYear:52,monthsPerYear:12});
export function calculateAppliances(raw){
 const price=numberIn(raw.price,{name:'price',min:0,max:5});
 if(!Array.isArray(raw.items)||raw.items.length===0) throw Object.assign(new RangeError('items: añade al menos un aparato.'),{field:'items'});
 const items=raw.items.map((item,index)=>{
   const name=(item.name||'').trim()||`Aparato ${index+1}`;
   let annualKwh;
   if(item.mode==='cycle'){
     const kwhCycle=numberIn(item.kwhCycle,{name:`item-${index}-kwhCycle`,min:0,max:100});
     const cyclesWeek=numberIn(item.cyclesWeek,{name:`item-${index}-cyclesWeek`,min:0,max:100});
     annualKwh=kwhCycle*cyclesWeek*APPLIANCES_META.weeksPerYear;
   } else {
     const watts=numberIn(item.watts,{name:`item-${index}-watts`,min:0,max:30000});
     const hoursDay=numberIn(item.hoursDay,{name:`item-${index}-hoursDay`,min:0,max:24});
     annualKwh=watts/1000*hoursDay*APPLIANCES_META.daysPerYear;
   }
   const monthlyKwh=annualKwh/APPLIANCES_META.monthsPerYear;
   return {name,mode:item.mode==='cycle'?'cycle':'hours',annualKwh,monthlyKwh,annualCost:annualKwh*price,monthlyCost:monthlyKwh*price};
 });
 const annualKwh=items.reduce((s,i)=>s+i.annualKwh,0),monthlyKwh=annualKwh/12;
 const ranked=[...items].sort((a,b)=>b.annualKwh-a.annualKwh).map(i=>({...i,percentage:annualKwh===0?0:i.annualKwh/annualKwh*100}));
 return {items:ranked,annualKwh,monthlyKwh,annualCost:annualKwh*price,monthlyCost:monthlyKwh*price,price};
}

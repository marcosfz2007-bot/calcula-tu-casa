import {numberIn} from './common.mjs';
import {packagesFor} from './materials-common.mjs';

export function calculateLaminate(raw){
  if(!Array.isArray(raw.rooms)||raw.rooms.length===0) throw Object.assign(new RangeError('rooms: añade al menos una estancia.'),{field:'rooms'});
  const rooms=raw.rooms.map((room,index)=>{
    const name=(room.name||'').trim()||`Estancia ${index+1}`;
    const manual=numberIn(room.area,{name:`room-${index}-area`,min:0,max:100000,optional:true});
    let area;
    if(manual!==null) area=manual;
    else{
      const length=numberIn(room.length,{name:`room-${index}-length`,min:0,max:1000});
      const width=numberIn(room.width,{name:`room-${index}-width`,min:0,max:1000});
      area=length*width;
    }
    return {name,area};
  });
  const wastePercent=numberIn(raw.wastePercent,{name:'wastePercent',min:0,max:200});
  const coveragePerBoxM2=numberIn(raw.coveragePerBoxM2,{name:'coveragePerBoxM2',min:0.001,max:10000});
  const pricePerBox=numberIn(raw.pricePerBox,{name:'pricePerBox',min:0,max:100000,optional:true});
  const surfaceM2=rooms.reduce((sum,r)=>sum+r.area,0);
  const purchaseTargetM2=surfaceM2*(1+wastePercent/100);
  const boxes=packagesFor(purchaseTargetM2,coveragePerBoxM2);
  const purchasedM2=boxes*coveragePerBoxM2;
  const leftoverM2=purchasedM2-surfaceM2;
  const cost=pricePerBox===null?null:boxes*pricePerBox;
  const effectiveCostPerM2=cost===null||surfaceM2===0?null:cost/surfaceM2;
  return {rooms,surfaceM2,wastePercent,purchaseTargetM2,coveragePerBoxM2,boxes,purchasedM2,leftoverM2,pricePerBox,cost,effectiveCostPerM2};
}

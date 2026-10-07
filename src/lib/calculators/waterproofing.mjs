import {numberIn} from './common.mjs';

export function calculateWaterproofing(raw){
  const mode=raw.mode==='kg'?'kg':'litres';
  const areaM2=numberIn(raw.areaM2,{name:'areaM2',min:0,max:100000});
  const coats=numberIn(raw.coats,{name:'coats',min:1,max:20,integer:true});
  const marginPercent=numberIn(raw.marginPercent,{name:'marginPercent',min:0,max:200});
  const containerSize=numberIn(raw.containerSize,{name:'containerSize',min:0.001,max:100000,optional:true});
  const containerPrice=numberIn(raw.containerPrice,{name:'containerPrice',min:0,max:1000000,optional:true});
  if(containerPrice!==null&&containerSize===null) throw Object.assign(new RangeError('containerSize: para calcular coste debes indicar el tamaño del envase.'),{field:'containerSize'});
  let theoreticalQuantity,unit,rate,basis=null;
  if(mode==='litres'){
    rate=numberIn(raw.coverageM2PerL,{name:'coverageM2PerL',min:0.001,max:100000});
    unit='L';
    theoreticalQuantity=areaM2*coats/rate;
  }else{
    rate=numberIn(raw.consumptionKgM2,{name:'consumptionKgM2',min:0.001,max:100000});
    basis=raw.kgBasis==='total'?'total':'per-coat';
    unit='kg';
    theoreticalQuantity=areaM2*rate*(basis==='per-coat'?coats:1);
  }
  const purchaseQuantity=theoreticalQuantity*(1+marginPercent/100);
  const containers=containerSize===null?null:(purchaseQuantity===0?0:Math.ceil(purchaseQuantity/containerSize));
  const purchasedQuantity=containers===null?null:containers*containerSize;
  const leftoverQuantity=purchasedQuantity===null?null:purchasedQuantity-purchaseQuantity;
  const cost=containerPrice===null?null:containers*containerPrice;
  return {mode,areaM2,coats,marginPercent,containerSize,containerPrice,rate,basis,unit,theoreticalQuantity,purchaseQuantity,containers,purchasedQuantity,leftoverQuantity,cost};
}

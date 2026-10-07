import {numberIn} from './common.mjs';

export function calculateMortar(raw){
  const areaM2=numberIn(raw.areaM2,{name:'areaM2',min:0,max:100000});
  const thicknessMm=numberIn(raw.thicknessMm,{name:'thicknessMm',min:0,max:10000});
  const marginPercent=numberIn(raw.marginPercent,{name:'marginPercent',min:0,max:200});
  const yieldLitresPerBag=numberIn(raw.yieldLitresPerBag,{name:'yieldLitresPerBag',min:0.01,max:10000,optional:true});
  const pricePerBag=numberIn(raw.pricePerBag,{name:'pricePerBag',min:0,max:100000,optional:true});
  if(pricePerBag!==null&&yieldLitresPerBag===null) throw Object.assign(new RangeError('yieldLitresPerBag: para calcular coste por saco debes indicar el rendimiento real en litros por saco.'),{field:'yieldLitresPerBag'});
  const thicknessM=thicknessMm/1000;
  const theoreticalM3=areaM2*thicknessM;
  const theoreticalLitres=theoreticalM3*1000;
  const purchaseM3=theoreticalM3*(1+marginPercent/100);
  const purchaseLitres=purchaseM3*1000;
  const bags=yieldLitresPerBag===null?null:(purchaseLitres===0?0:Math.ceil(purchaseLitres/yieldLitresPerBag));
  const cost=pricePerBag===null?null:bags*pricePerBag;
  return {areaM2,thicknessMm,thicknessM,marginPercent,yieldLitresPerBag,pricePerBag,theoreticalM3,theoreticalLitres,purchaseM3,purchaseLitres,bags,cost};
}

import {numberIn} from './common.mjs';

export function calculateConcrete(raw){
  if(!Array.isArray(raw.zones)||raw.zones.length===0) throw Object.assign(new RangeError('zones: añade al menos una zona.'),{field:'zones'});
  const zones=raw.zones.map((zone,index)=>{
    const name=(zone.name||'').trim()||`Zona ${index+1}`;
    const lengthM=numberIn(zone.lengthM,{name:`zone-${index}-lengthM`,min:0,max:10000});
    const widthM=numberIn(zone.widthM,{name:`zone-${index}-widthM`,min:0,max:10000});
    const thickness=numberIn(zone.thickness,{name:`zone-${index}-thickness`,min:0,max:10000});
    const thicknessUnit=zone.thicknessUnit==='m'?'m':'cm';
    const thicknessM=thicknessUnit==='m'?thickness:thickness/100;
    const volumeM3=lengthM*widthM*thicknessM;
    return {name,lengthM,widthM,thickness,thicknessUnit,thicknessM,volumeM3};
  });
  const marginPercent=numberIn(raw.marginPercent,{name:'marginPercent',min:0,max:200});
  const yieldLitresPerBag=numberIn(raw.yieldLitresPerBag,{name:'yieldLitresPerBag',min:0.01,max:10000,optional:true});
  const pricePerM3=numberIn(raw.pricePerM3,{name:'pricePerM3',min:0,max:1000000,optional:true});
  const pricePerBag=numberIn(raw.pricePerBag,{name:'pricePerBag',min:0,max:100000,optional:true});
  if(pricePerM3!==null&&pricePerBag!==null) throw Object.assign(new RangeError('pricePerM3: introduce precio por m³ o por saco, no ambos.'),{field:'pricePerM3'});
  if(pricePerBag!==null&&yieldLitresPerBag===null) throw Object.assign(new RangeError('yieldLitresPerBag: para calcular coste por saco debes indicar el rendimiento real en litros por saco.'),{field:'yieldLitresPerBag'});
  const theoreticalM3=zones.reduce((sum,z)=>sum+z.volumeM3,0);
  const purchaseM3=theoreticalM3*(1+marginPercent/100);
  const theoreticalLitres=theoreticalM3*1000;
  const purchaseLitres=purchaseM3*1000;
  const bags=yieldLitresPerBag===null?null:(purchaseLitres===0?0:Math.ceil(purchaseLitres/yieldLitresPerBag));
  const cost=pricePerM3!==null?purchaseM3*pricePerM3:pricePerBag!==null?bags*pricePerBag:null;
  return {zones,marginPercent,yieldLitresPerBag,pricePerM3,pricePerBag,theoreticalM3,purchaseM3,theoreticalLitres,purchaseLitres,bags,cost};
}

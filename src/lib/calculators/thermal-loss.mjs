import {numberIn} from './common.mjs';

export function calculateThermalLoss(raw){
  const interiorTempC=numberIn(raw.interiorTempC,{name:'interiorTempC',min:-100,max:100});
  const exteriorTempC=numberIn(raw.exteriorTempC,{name:'exteriorTempC',min:-100,max:100});
  if(interiorTempC<exteriorTempC) throw Object.assign(new RangeError('exteriorTempC: para estimar pérdida de calefacción, la temperatura exterior no puede superar a la interior.'),{field:'exteriorTempC'});
  if(!Array.isArray(raw.elements)||raw.elements.length===0) throw Object.assign(new RangeError('elements: añade al menos una superficie.'),{field:'elements'});
  const deltaT=interiorTempC-exteriorTempC;
  const elements=raw.elements.map((item,index)=>{
    const name=(item.name||'').trim()||`Elemento ${index+1}`;
    const areaM2=numberIn(item.areaM2,{name:`element-${index}-areaM2`,min:0,max:100000});
    const uValue=numberIn(item.uValue,{name:`element-${index}-uValue`,min:0.001,max:20});
    const watts=uValue*areaM2*deltaT;
    return {name,areaM2,uValue,watts};
  });
  const totalW=elements.reduce((sum,item)=>sum+item.watts,0);
  const ranked=[...elements].sort((a,b)=>b.watts-a.watts).map(item=>({...item,percentage:totalW===0?0:item.watts/totalW*100}));
  return {interiorTempC,exteriorTempC,deltaT,elements:ranked,totalW,totalKw:totalW/1000};
}

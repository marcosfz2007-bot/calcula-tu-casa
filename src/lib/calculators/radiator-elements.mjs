import {numberIn} from './common.mjs';

export const RADIATOR_META=Object.freeze({
  version:'1.0',
  checkedAt:'2026-10-06',
  source:'La potencia por elemento debe proceder de la ficha del radiador y de sus condiciones de ensayo (p. ej. UNE-EN 442 / ΔT declarado por fabricante). El factor térmico W/m³ es un dato de diseño introducido por el usuario.'
});

export function calculateRadiatorElements(raw){
  const area=numberIn(raw.area,{name:'area',min:1,max:1000});
  const height=numberIn(raw.height,{name:'height',min:1.5,max:10});
  const thermalFactor=numberIn(raw.thermalFactor,{name:'thermalFactor',min:1,max:500});
  const elementPowerW=numberIn(raw.elementPowerW,{name:'elementPowerW',min:1,max:2000});
  const correctionFactor=numberIn(raw.correctionFactor,{name:'correctionFactor',min:0.1,max:2});
  const marginPercent=numberIn(raw.marginPercent,{name:'marginPercent',min:0,max:100});
  const volumeM3=area*height;
  const baseDemandW=volumeM3*thermalFactor;
  const requiredPowerW=baseDemandW*(1+marginPercent/100);
  const usefulPowerPerElementW=elementPowerW*correctionFactor;
  const elements=Math.ceil(requiredPowerW/usefulPowerPerElementW);
  const installedPowerW=elements*usefulPowerPerElementW;
  const installedMarginW=installedPowerW-requiredPowerW;
  return {area,height,thermalFactor,elementPowerW,correctionFactor,marginPercent,volumeM3,baseDemandW,requiredPowerW,usefulPowerPerElementW,elements,installedPowerW,installedMarginW};
}

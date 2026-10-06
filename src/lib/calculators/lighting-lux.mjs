import {numberIn} from './common.mjs';

export function calculateLightingLux(raw){
  const areaM2=numberIn(raw.areaM2,{name:'areaM2',min:0,max:100000});
  const targetLux=numberIn(raw.targetLux,{name:'targetLux',min:0,max:100000});
  const lumensPerFixture=numberIn(raw.lumensPerFixture,{name:'lumensPerFixture',min:0.01,max:10000000});
  const utilizationFactor=numberIn(raw.utilizationFactor,{name:'utilizationFactor',min:0.001,max:1});
  const maintenanceFactor=numberIn(raw.maintenanceFactor,{name:'maintenanceFactor',min:0.001,max:1});
  const usefulLumensRequired=targetLux*areaM2;
  const effectiveLumensPerFixture=lumensPerFixture*utilizationFactor*maintenanceFactor;
  const fixtures=usefulLumensRequired===0?0:Math.ceil(usefulLumensRequired/effectiveLumensPerFixture);
  const installedLumens=fixtures*lumensPerFixture;
  const usefulInstalledLumens=fixtures*effectiveLumensPerFixture;
  const estimatedLux=areaM2===0?null:usefulInstalledLumens/areaM2;
  return {areaM2,targetLux,lumensPerFixture,utilizationFactor,maintenanceFactor,usefulLumensRequired,effectiveLumensPerFixture,fixtures,installedLumens,usefulInstalledLumens,estimatedLux};
}

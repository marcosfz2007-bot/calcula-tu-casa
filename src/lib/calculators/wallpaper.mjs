import {numberIn} from './common.mjs';

export function calculateWallpaper(raw){
  const wallWidthM=numberIn(raw.wallWidthM,{name:'wallWidthM',min:0,max:10000});
  const heightM=numberIn(raw.heightM,{name:'heightM',min:0.01,max:100});
  const rollWidthM=numberIn(raw.rollWidthM,{name:'rollWidthM',min:0.01,max:10});
  const rollLengthM=numberIn(raw.rollLengthM,{name:'rollLengthM',min:0.01,max:1000});
  const repeatM=numberIn(raw.repeatM,{name:'repeatM',min:0,max:10});
  const trimMarginM=numberIn(raw.trimMarginM,{name:'trimMarginM',min:0,max:10});
  const extraPercent=numberIn(raw.extraPercent,{name:'extraPercent',min:0,max:200});
  const rawStripLength=heightM+trimMarginM;
  const stripLengthM=repeatM===0?rawStripLength:Math.ceil(rawStripLength/repeatM)*repeatM;
  const baseStrips=Math.ceil(wallWidthM/rollWidthM);
  const stripsNeeded=Math.ceil(baseStrips*(1+extraPercent/100));
  const stripsPerRoll=Math.floor(rollLengthM/stripLengthM);
  if(stripsPerRoll<1) throw Object.assign(new RangeError('rollLengthM: el rollo es demasiado corto para obtener una sola tira con la altura, margen y rapport introducidos.'),{field:'rollLengthM'});
  const rolls=Math.ceil(stripsNeeded/stripsPerRoll);
  const usedLengthM=stripsNeeded*stripLengthM;
  const purchasedLengthM=rolls*rollLengthM;
  const leftoverLengthM=purchasedLengthM-usedLengthM;
  return {wallWidthM,heightM,rollWidthM,rollLengthM,repeatM,trimMarginM,extraPercent,rawStripLength,stripLengthM,baseStrips,stripsNeeded,stripsPerRoll,rolls,usedLengthM,purchasedLengthM,leftoverLengthM};
}

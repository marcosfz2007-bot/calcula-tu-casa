import {numberIn} from './common.mjs';
import {packagesFor} from './materials-common.mjs';

export function calculatePaint(raw){
  const length=numberIn(raw.length,{name:'length',min:0.1,max:1000});
  const width=numberIn(raw.width,{name:'width',min:0.1,max:1000});
  const height=numberIn(raw.height,{name:'height',min:0.1,max:100});
  const openingsArea=numberIn(raw.openingsArea,{name:'openingsArea',min:0,max:100000});
  const coats=numberIn(raw.coats,{name:'coats',min:1,max:20,integer:true});
  const coverage=numberIn(raw.coverage,{name:'coverage',min:0.01,max:1000});
  const marginPercent=numberIn(raw.marginPercent,{name:'marginPercent',min:0,max:200});
  const canLitres=numberIn(raw.canLitres,{name:'canLitres',min:0.01,max:10000,optional:true});
  const paintWalls=raw.paintWalls===true;
  const paintCeiling=raw.paintCeiling===true;
  if(!paintWalls&&!paintCeiling) throw Object.assign(new RangeError('surfaces: selecciona paredes y/o techo.'),{field:'surfaces'});
  const wallsArea=paintWalls?2*(length+width)*height:0;
  const ceilingArea=paintCeiling?length*width:0;
  const selectedArea=wallsArea+ceilingArea;
  if(openingsArea>selectedArea) throw Object.assign(new RangeError('openingsArea: los huecos no pueden superar la superficie seleccionada.'),{field:'openingsArea'});
  const netArea=selectedArea-openingsArea;
  const equivalentArea=netArea*coats;
  const theoreticalLitres=equivalentArea/coverage;
  const litres=theoreticalLitres*(1+marginPercent/100);
  const cans=canLitres===null?null:packagesFor(litres,canLitres);
  const purchasedLitres=cans===null?null:cans*canLitres;
  const leftoverLitres=purchasedLitres===null?null:purchasedLitres-litres;
  return {length,width,height,paintWalls,paintCeiling,openingsArea,coats,coverage,marginPercent,canLitres,wallsArea,ceilingArea,selectedArea,netArea,equivalentArea,theoreticalLitres,litres,cans,purchasedLitres,leftoverLitres};
}

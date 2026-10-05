import {numberIn} from './common.mjs';
export const COOLING_META=Object.freeze({
 version:'1.0',checkedAt:'2026-10-05',wPerFrigoria:1.163,btuPerWh:3.412142,referenceHeight:2.5,
 baseFrigoriaPerM2:{mild:100,warm:125,hot:150},
 orientationFactor:{N:0.95,E:1,S:1.175,O:1.10},
 insulationFactor:{good:0.90,average:1,poor:1.15},
 occupantHeatW:115,
 source:'Base 100–150 frigorías/m² y correcciones solares: Daikin; 115 W/persona sentada: ASHRAE. Los factores intermedios y de acristalamiento son hipótesis orientativas declaradas.'
});
export function calculateCooling(raw){
 const area=numberIn(raw.area,{name:'area',min:1,max:500});
 const height=numberIn(raw.height,{name:'height',min:2,max:6});
 const glass=numberIn(raw.glass,{name:'glass',min:0,max:500});
 const people=numberIn(raw.people,{name:'people',min:0,max:30,integer:true});
 const internalW=numberIn(raw.internalW,{name:'internalW',min:0,max:20000});
 if(glass>area) throw Object.assign(new RangeError('glass: la superficie acristalada no puede superar la superficie de la estancia en este modelo simplificado.'),{field:'glass'});
 const climate=COOLING_META.baseFrigoriaPerM2[raw.climate];
 const orientation=COOLING_META.orientationFactor[raw.orientation];
 const insulation=COOLING_META.insulationFactor[raw.insulation];
 if(!climate||!orientation||!insulation) throw new RangeError('Selecciona clima, orientación y aislamiento válidos.');
 const heightFactor=height/COOLING_META.referenceHeight;
 const glassRatio=glass/area;
 const glassFactor=1+Math.max(0,glassRatio-0.15)*0.5;
 const baseW=area*climate*COOLING_META.wPerFrigoria*heightFactor*orientation*insulation*glassFactor;
 const centralW=baseW+people*COOLING_META.occupantHeatW+internalW;
 const spread=0.12+Math.min(0.08,glassRatio*0.2);
 const lowW=centralW*(1-spread),highW=centralW*(1+spread);
 return {centralW,lowW,highW,kw:centralW/1000,frigoriaH:centralW/COOLING_META.wPerFrigoria,btuH:centralW*COOLING_META.btuPerWh,spread,glassRatio};
}

import {numberIn} from './common.mjs';
export const SURFACES=Object.freeze({
 wall:{label:'Cerramiento vertical · flujo horizontal',rsi:0.13,rse:0.04},
 roof:{label:'Techo/cubierta · flujo ascendente',rsi:0.10,rse:0.04},
 floor:{label:'Suelo · flujo descendente',rsi:0.17,rse:0.04}
});
export const U_META=Object.freeze({version:'1.0',checkedAt:'2026-10-05',source:'CTE DA DB-HE/1, tabla 1'});
export function calculateTransmittance(raw){
 const surface=SURFACES[raw.surface]||SURFACES.wall;
 if(!Array.isArray(raw.layers)||raw.layers.length===0) throw Object.assign(new RangeError('layers: añade al menos una capa.'),{field:'layers'});
 const layers=raw.layers.map((layer,index)=>{
   const thicknessMm=numberIn(layer.thicknessMm,{name:`layer-${index}-thickness`,min:0,max:2000});
   const lambda=numberIn(layer.lambda,{name:`layer-${index}-lambda`,min:0.001,max:10});
   return {...layer,thicknessMm,lambda,r:(thicknessMm/1000)/lambda};
 });
 const layersR=layers.reduce((sum,l)=>sum+l.r,0);
 const totalR=surface.rsi+layersR+surface.rse;
 const u=1/totalR;
 const targetU=numberIn(raw.targetU,{name:'targetU',min:0.05,max:10,optional:true});
 const extraLambda=numberIn(raw.extraLambda,{name:'extraLambda',min:0.001,max:1,optional:true});
 let extraThicknessMm=null;
 if(targetU!==null&&extraLambda!==null){
   const requiredR=Math.max(0,1/targetU-totalR);
   extraThicknessMm=requiredR*extraLambda*1000;
 }
 return {surface,layers,layersR,totalR,u,targetU,extraLambda,extraThicknessMm};
}

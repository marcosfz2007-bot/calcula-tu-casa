import {numberIn} from './common.mjs';
export const POWER_META=Object.freeze({version:'1.0',checkedAt:'2026-10-05',factors:{moderate:0.45,habitual:0.65,intensive:0.85},source:'Factores de simultaneidad propios del simulador; no son valores reglamentarios ni sustituyen un estudio de cargas.'});
export function calculatePower(raw){
 if(!Array.isArray(raw.items)) throw new RangeError('items: lista no válida.');
 const items=raw.items.filter(i=>i.selected).map((item,index)=>({name:item.name||`Aparato ${index+1}`,watts:numberIn(item.watts,{name:`item-${index}-watts`,min:1,max:30000})}));
 if(items.length===0) throw Object.assign(new RangeError('items: selecciona al menos un aparato e indica su potencia.'),{field:'items'});
 const nominalW=items.reduce((s,i)=>s+i.watts,0);
 const scenarios=Object.fromEntries(Object.entries(POWER_META.factors).map(([k,f])=>[k,nominalW*f]));
 return {items,nominalW,scenarios,marginToNominalW:nominalW-scenarios.habitual};
}

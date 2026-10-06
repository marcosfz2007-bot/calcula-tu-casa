import {numberIn} from './common.mjs';

export function validateCostRange(raw,{prefix='row'}={}){
  const low=numberIn(raw.low,{name:`${prefix}-low`,min:0,max:1000000});
  const central=numberIn(raw.central,{name:`${prefix}-central`,min:0,max:1000000});
  const high=numberIn(raw.high,{name:`${prefix}-high`,min:0,max:1000000});
  if(!(low<=central&&central<=high)) throw Object.assign(new RangeError(`${prefix}: debe cumplirse bajo ≤ central ≤ alto.`),{field:prefix});
  return {low,central,high};
}

export function calculateRangeBudget({surface,rows}){
  const area=numberIn(surface,{name:'area',min:0.1,max:10000});
  if(!Array.isArray(rows)||rows.length===0) throw new RangeError('rows: añade al menos una partida.');
  const calculated=rows.filter(r=>r.selected!==false).map((row,index)=>{
    const quantity=numberIn(row.quantity,{name:`row-${index}-quantity`,min:0,max:100000});
    const range=validateCostRange(row,{prefix:`row-${index}`});
    return {
      key:row.key||String(index),
      label:row.label||`Partida ${index+1}`,
      unit:row.unit||'ud.',
      quantity,
      rate:range,
      low:quantity*range.low,
      central:quantity*range.central,
      high:quantity*range.high
    };
  });
  const total=calculated.reduce((acc,row)=>({
    low:acc.low+row.low,
    central:acc.central+row.central,
    high:acc.high+row.high
  }),{low:0,central:0,high:0});
  return {
    rows:calculated,total,area,
    perM2:{low:total.low/area,central:total.central/area,high:total.high/area}
  };
}

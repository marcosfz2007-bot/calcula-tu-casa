import {numberIn} from './common.mjs';

export const UNDERFLOOR_META=Object.freeze({
  version:'1.0',
  checkedAt:'2026-10-06',
  source:'Estimación geométrica L ≈ A/s; la longitud máxima de circuito la introduce el usuario según fabricante/diseño hidráulico.'
});

export function calculateUnderfloor(raw){
  if(!Array.isArray(raw.rooms)||raw.rooms.length===0) throw Object.assign(new RangeError('rooms: añade al menos una estancia.'),{field:'rooms'});
  const rooms=raw.rooms.map((room,index)=>({
    name:(room.name||'').trim()||`Estancia ${index+1}`,
    area:numberIn(room.area,{name:`room-${index}-area`,min:0,max:1000})
  }));
  const spacingM=numberIn(raw.spacingM,{name:'spacingM',min:0.05,max:0.5});
  const connectionM=numberIn(raw.connectionM,{name:'connectionM',min:0,max:2000});
  const marginPercent=numberIn(raw.marginPercent,{name:'marginPercent',min:0,max:50});
  const maxCircuitM=numberIn(raw.maxCircuitM,{name:'maxCircuitM',min:10,max:500});
  const area=rooms.reduce((sum,r)=>sum+r.area,0);
  const baseLengthM=area/spacingM;
  const beforeMarginM=baseLengthM+connectionM;
  const marginLengthM=beforeMarginM*(marginPercent/100);
  const totalLengthM=beforeMarginM+marginLengthM;
  const circuits=totalLengthM===0?0:Math.ceil(totalLengthM/maxCircuitM);
  const averageCircuitM=circuits===0?0:totalLengthM/circuits;
  return {rooms,area,spacingM,connectionM,marginPercent,maxCircuitM,baseLengthM,marginLengthM,totalLengthM,circuits,averageCircuitM};
}

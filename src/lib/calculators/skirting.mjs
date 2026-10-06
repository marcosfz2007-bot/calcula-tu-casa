import {numberIn} from './common.mjs';
import {packagesFor} from './materials-common.mjs';

export function calculateSkirting(raw){
  const length=numberIn(raw.length,{name:'length',min:0,max:1000});
  const width=numberIn(raw.width,{name:'width',min:0,max:1000});
  const openingsM=numberIn(raw.openingsM,{name:'openingsM',min:0,max:10000});
  const marginPercent=numberIn(raw.marginPercent,{name:'marginPercent',min:0,max:200});
  const pieceLengthM=numberIn(raw.pieceLengthM,{name:'pieceLengthM',min:0.01,max:100});
  const piecesPerPack=numberIn(raw.piecesPerPack,{name:'piecesPerPack',min:1,max:10000,integer:true,optional:true});
  const pricePerPiece=numberIn(raw.pricePerPiece,{name:'pricePerPiece',min:0,max:100000,optional:true});
  const pricePerPack=numberIn(raw.pricePerPack,{name:'pricePerPack',min:0,max:100000,optional:true});
  if(pricePerPiece!==null&&pricePerPack!==null) throw Object.assign(new RangeError('precio: introduce precio por pieza o por paquete, no ambos.'),{field:'price'});
  if(pricePerPack!==null&&piecesPerPack===null) throw Object.assign(new RangeError('piecesPerPack: indica piezas por paquete para usar precio por paquete.'),{field:'piecesPerPack'});
  const perimeterM=2*(length+width);
  if(openingsM>perimeterM) throw Object.assign(new RangeError('openingsM: los huecos no pueden superar el perímetro.'),{field:'openingsM'});
  const netM=perimeterM-openingsM;
  const purchaseTargetM=netM*(1+marginPercent/100);
  const pieces=packagesFor(purchaseTargetM,pieceLengthM);
  const purchasedM=pieces*pieceLengthM;
  const leftoverM=purchasedM-netM;
  const packs=piecesPerPack===null?null:packagesFor(pieces,piecesPerPack);
  const cost=pricePerPiece!==null?pieces*pricePerPiece:pricePerPack!==null?packs*pricePerPack:null;
  return {length,width,openingsM,marginPercent,pieceLengthM,piecesPerPack,pricePerPiece,pricePerPack,perimeterM,netM,purchaseTargetM,pieces,purchasedM,leftoverM,packs,cost};
}

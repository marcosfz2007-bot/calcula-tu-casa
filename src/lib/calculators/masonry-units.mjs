import {numberIn} from './common.mjs';

export function calculateMasonryUnits(raw){
  const wallWidthM=numberIn(raw.wallWidthM,{name:'wallWidthM',min:0,max:10000});
  const wallHeightM=numberIn(raw.wallHeightM,{name:'wallHeightM',min:0,max:1000});
  const openingsAreaM2=numberIn(raw.openingsAreaM2,{name:'openingsAreaM2',min:0,max:100000});
  const pieceLengthCm=numberIn(raw.pieceLengthCm,{name:'pieceLengthCm',min:0.01,max:1000});
  const pieceHeightCm=numberIn(raw.pieceHeightCm,{name:'pieceHeightCm',min:0.01,max:1000});
  const horizontalJointMm=numberIn(raw.horizontalJointMm,{name:'horizontalJointMm',min:0,max:1000});
  const verticalJointMm=numberIn(raw.verticalJointMm,{name:'verticalJointMm',min:0,max:1000});
  const wastePercent=numberIn(raw.wastePercent,{name:'wastePercent',min:0,max:200});
  const piecesPerPack=numberIn(raw.piecesPerPack,{name:'piecesPerPack',min:1,max:100000,integer:true,optional:true});
  const pricePerPiece=numberIn(raw.pricePerPiece,{name:'pricePerPiece',min:0,max:100000,optional:true});
  const pricePerPack=numberIn(raw.pricePerPack,{name:'pricePerPack',min:0,max:1000000,optional:true});
  if(pricePerPiece!==null&&pricePerPack!==null) throw Object.assign(new RangeError('pricePerPiece: introduce precio por pieza o por paquete, no ambos.'),{field:'pricePerPiece'});
  if(pricePerPack!==null&&piecesPerPack===null) throw Object.assign(new RangeError('piecesPerPack: para usar precio por paquete debes indicar piezas por paquete.'),{field:'piecesPerPack'});
  const grossAreaM2=wallWidthM*wallHeightM;
  if(openingsAreaM2>grossAreaM2) throw Object.assign(new RangeError('openingsAreaM2: los huecos no pueden superar la superficie de pared.'),{field:'openingsAreaM2'});
  const netAreaM2=grossAreaM2-openingsAreaM2;
  const physicalPieceAreaM2=(pieceLengthCm/100)*(pieceHeightCm/100);
  const moduleWidthM=pieceLengthCm/100+verticalJointMm/1000;
  const moduleHeightM=pieceHeightCm/100+horizontalJointMm/1000;
  const moduleAreaM2=moduleWidthM*moduleHeightM;
  const theoreticalPieces=netAreaM2/moduleAreaM2;
  const pieces=theoreticalPieces===0?0:Math.ceil(theoreticalPieces*(1+wastePercent/100));
  const packs=piecesPerPack===null?null:(pieces===0?0:Math.ceil(pieces/piecesPerPack));
  const purchasedPieces=packs===null?pieces:packs*piecesPerPack;
  const leftoverPieces=packs===null?0:purchasedPieces-pieces;
  const cost=pricePerPiece!==null?pieces*pricePerPiece:pricePerPack!==null?packs*pricePerPack:null;
  return {wallWidthM,wallHeightM,openingsAreaM2,pieceLengthCm,pieceHeightCm,horizontalJointMm,verticalJointMm,wastePercent,piecesPerPack,pricePerPiece,pricePerPack,grossAreaM2,netAreaM2,physicalPieceAreaM2,moduleWidthM,moduleHeightM,moduleAreaM2,theoreticalPieces,pieces,packs,purchasedPieces,leftoverPieces,cost};
}

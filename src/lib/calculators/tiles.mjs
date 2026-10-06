import {numberIn} from './common.mjs';
import {packagesFor} from './materials-common.mjs';

export function calculateTiles(raw){
  const surfaceM2=numberIn(raw.surfaceM2,{name:'surfaceM2',min:0,max:100000});
  const pieceWidthCm=numberIn(raw.pieceWidthCm,{name:'pieceWidthCm',min:0.1,max:1000});
  const pieceLengthCm=numberIn(raw.pieceLengthCm,{name:'pieceLengthCm',min:0.1,max:1000});
  const wastePercent=numberIn(raw.wastePercent,{name:'wastePercent',min:0,max:200});
  const pricePerBox=numberIn(raw.pricePerBox,{name:'pricePerBox',min:0,max:100000,optional:true});
  const mode=raw.boxMode==='coverage'?'coverage':'pieces';
  const pieceAreaM2=(pieceWidthCm/100)*(pieceLengthCm/100);
  const theoreticalPieces=surfaceM2/pieceAreaM2;
  const piecesToBuy=Math.ceil(theoreticalPieces*(1+wastePercent/100));
  const targetAreaM2=surfaceM2*(1+wastePercent/100);
  let boxes,purchasedAreaM2,purchasedPieces=null,boxCoverageM2;
  if(mode==='pieces'){
    const piecesPerBox=numberIn(raw.piecesPerBox,{name:'piecesPerBox',min:1,max:100000,integer:true});
    boxes=packagesFor(piecesToBuy,piecesPerBox);
    purchasedPieces=boxes*piecesPerBox;
    purchasedAreaM2=purchasedPieces*pieceAreaM2;
    boxCoverageM2=piecesPerBox*pieceAreaM2;
  }else{
    const coveragePerBoxM2=numberIn(raw.coveragePerBoxM2,{name:'coveragePerBoxM2',min:0.001,max:10000});
    boxes=packagesFor(targetAreaM2,coveragePerBoxM2);
    purchasedAreaM2=boxes*coveragePerBoxM2;
    boxCoverageM2=coveragePerBoxM2;
  }
  const leftoverM2=purchasedAreaM2-surfaceM2;
  const cost=pricePerBox===null?null:boxes*pricePerBox;
  return {surfaceM2,pieceWidthCm,pieceLengthCm,wastePercent,pricePerBox,mode,pieceAreaM2,theoreticalPieces,piecesToBuy,targetAreaM2,boxes,purchasedPieces,purchasedAreaM2,boxCoverageM2,leftoverM2,cost};
}

import {numberIn} from './common.mjs';
import {VENTILATION_CTE} from '../config/ventilation-cte.mjs';

const rowForBedrooms=(bedrooms)=>bedrooms<=1?VENTILATION_CTE.rows.one:bedrooms===2?VENTILATION_CTE.rows.two:VENTILATION_CTE.rows.threePlus;

export function calculateVentilation(raw){
  const bedrooms=numberIn(raw.bedrooms,{name:'bedrooms',min:0,max:10,integer:true});
  const livingRooms=numberIn(raw.livingRooms,{name:'livingRooms',min:0,max:10,integer:true});
  const kitchens=numberIn(raw.kitchens,{name:'kitchens',min:1,max:5,integer:true});
  const bathrooms=numberIn(raw.bathrooms,{name:'bathrooms',min:0,max:10,integer:true});
  const toilets=numberIn(raw.toilets,{name:'toilets',min:0,max:10,integer:true});
  if(bedrooms===0&&livingRooms===0) throw Object.assign(new RangeError('livingRooms: una vivienda sin dormitorio separado debe incluir al menos un local seco habitable multiuso.'),{field:'livingRooms'});
  const row=rowForBedrooms(bedrooms);
  const mainBedroomLs=bedrooms===0?0:row.mainBedroomLs;
  const otherBedroomsLs=Math.max(0,bedrooms-1)*row.otherBedroomLs;
  const livingLs=livingRooms*row.livingLs;
  const studioMultiuseAdjustmentLs=bedrooms===0&&livingRooms>0?Math.max(0,row.mainBedroomLs-row.livingLs):0;
  const dryMinimumLs=mainBedroomLs+otherBedroomsLs+livingLs+studioMultiuseAdjustmentLs;
  const wetRooms=kitchens+bathrooms+toilets;
  const wetByRoomsLs=wetRooms*row.wetPerRoomLs;
  const wetMinimumLs=Math.max(row.wetTotalLs,wetByRoomsLs);
  const balancedLs=Math.max(dryMinimumLs,wetMinimumLs);
  const admissionIncreaseLs=balancedLs-dryMinimumLs;
  const extractionIncreaseLs=balancedLs-wetMinimumLs;
  return {
    standard:VENTILATION_CTE.standard,method:VENTILATION_CTE.method,checkedAt:VENTILATION_CTE.checkedAt,
    bedrooms,livingRooms,kitchens,bathrooms,toilets,wetRooms,row,
    mainBedroomLs,otherBedroomsLs,livingLs,studioMultiuseAdjustmentLs,dryMinimumLs,wetByRoomsLs,wetMinimumLs,
    balancedLs,balancedM3h:balancedLs*3.6,admissionIncreaseLs,extractionIncreaseLs,
    kitchenSpecificExtractionLs:VENTILATION_CTE.kitchenSpecificExtractionLs
  };
}

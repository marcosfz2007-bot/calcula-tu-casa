import {numberIn} from './common.mjs';
export const DEW_META=Object.freeze({version:'1.0',checkedAt:'2026-10-05',a:17.62,b:243.12,validMinC:-45,validMaxC:60,source:'Magnus/Sonntag para vapor sobre agua'});
export function calculateDewPoint(raw){
 const temperature=numberIn(raw.temperature,{name:'temperature',min:DEW_META.validMinC,max:DEW_META.validMaxC});
 const humidity=numberIn(raw.humidity,{name:'humidity',min:1,max:100});
 const surface=numberIn(raw.surface,{name:'surface',min:-60,max:80});
 const exterior=numberIn(raw.exterior,{name:'exterior',min:-60,max:60,optional:true});
 const gamma=Math.log(humidity/100)+(DEW_META.a*temperature)/(DEW_META.b+temperature);
 const dewPoint=(DEW_META.b*gamma)/(DEW_META.a-gamma);
 const margin=surface-dewPoint;
 return {temperature,humidity,surface,exterior,dewPoint,margin,condensationPossible:margin<=0};
}

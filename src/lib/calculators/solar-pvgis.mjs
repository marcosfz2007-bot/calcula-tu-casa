import {numberIn} from './common.mjs';

export const PVGIS_META=Object.freeze({
  version:'1.0',
  checkedAt:'2026-10-06',
  apiVersion:'5.3',
  endpoint:'https://re.jrc.ec.europa.eu/api/v5_3/PVcalc',
  source:'https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/using-pvgis-5/api-non-interactive-service_en',
  cors:'PVGIS no permite acceso AJAX desde navegador; Calcula tu casa genera la consulta y procesa localmente el JSON que el usuario obtiene del JRC.'
});

const TECHNOLOGIES=new Set(['crystSi','CIS','CdTe','Unknown']);
const MOUNTING=new Set(['free','building']);

export function validateSolarInputs(raw){
  const latitude=numberIn(raw.latitude,{name:'latitude',min:-90,max:90});
  const longitude=numberIn(raw.longitude,{name:'longitude',min:-180,max:180});
  const peakPowerKw=numberIn(raw.peakPowerKw,{name:'peakPowerKw',min:0.1,max:10000});
  const tilt=numberIn(raw.tilt,{name:'tilt',min:0,max:90});
  const azimuth=numberIn(raw.azimuth,{name:'azimuth',min:-180,max:180});
  const lossPercent=numberIn(raw.lossPercent,{name:'lossPercent',min:0,max:99});
  const technology=TECHNOLOGIES.has(raw.technology)?raw.technology:'crystSi';
  const mounting=MOUNTING.has(raw.mounting)?raw.mounting:'building';
  return {latitude,longitude,peakPowerKw,tilt,azimuth,lossPercent,technology,mounting};
}

export function buildPvgisUrl(raw){
  const v=validateSolarInputs(raw);
  const url=new URL(PVGIS_META.endpoint);
  url.search=new URLSearchParams({
    lat:String(v.latitude),lon:String(v.longitude),peakpower:String(v.peakPowerKw),
    loss:String(v.lossPercent),angle:String(v.tilt),aspect:String(v.azimuth),
    pvtechchoice:v.technology,mountingplace:v.mounting,outputformat:'json',browser:'1'
  }).toString();
  return {url:url.href,inputs:v};
}

const finite=(value,name)=>{const n=Number(value);if(!Number.isFinite(n)) throw new RangeError(`pvgis: falta o no es válido ${name} en el JSON de PVGIS.`);return n;};

export function parsePvgisResult(payload,peakPowerKw){
  const peak=numberIn(peakPowerKw,{name:'peakPowerKw',min:0.1,max:10000});
  if(!payload||typeof payload!=='object') throw new RangeError('pvgis: JSON de PVGIS no válido.');
  const monthly=payload.outputs?.monthly?.fixed;
  const totals=payload.outputs?.totals?.fixed;
  if(!Array.isArray(monthly)||monthly.length!==12||!totals) throw new RangeError('pvgis: el JSON no contiene la salida mensual/anual esperada de PVcalc.');
  const months=monthly.map((m,index)=>({month:Number(m.month)||index+1,energyKwh:finite(m.E_m,`E_m mes ${index+1}`),irradiationKwhM2:m['H(i)_m']==null?null:finite(m['H(i)_m'],`H(i)_m mes ${index+1}`)}));
  const annualKwh=finite(totals.E_y,'E_y');
  const sdKwh=totals.SD_y==null?null:finite(totals.SD_y,'SD_y');
  const specificYieldKwhPerKwp=annualKwh/peak;
  const rangeLowKwh=sdKwh===null?null:Math.max(0,annualKwh-sdKwh);
  const rangeHighKwh=sdKwh===null?null:annualKwh+sdKwh;
  const totalLossPercent=totals.l_total==null?null:finite(totals.l_total,'l_total');
  return {annualKwh,sdKwh,specificYieldKwhPerKwp,rangeLowKwh,rangeHighKwh,totalLossPercent,months};
}

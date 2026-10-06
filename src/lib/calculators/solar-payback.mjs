import {numberIn} from './common.mjs';
import {cumulativePayback,netPresentValue} from './investment-common.mjs';

export const SOLAR_PAYBACK_META=Object.freeze({
  version:'1.0',checkedAt:'2026-10-06',
  note:'Ayudas, precios, compensación, mantenimiento, degradación, incremento de precio y tasa de descuento son datos del usuario. No se consulta ninguna subvención o tarifa actual.'
});

export function calculateSolarPayback(raw){
  const installationCost=numberIn(raw.installationCost,{name:'installationCost',min:0,max:10000000});
  const aid=numberIn(raw.aid,{name:'aid',min:0,max:10000000});
  const annualProductionKwh=numberIn(raw.annualProductionKwh,{name:'annualProductionKwh',min:0,max:10000000});
  const annualConsumptionKwh=numberIn(raw.annualConsumptionKwh,{name:'annualConsumptionKwh',min:0,max:10000000});
  const selfConsumptionPercent=numberIn(raw.selfConsumptionPercent,{name:'selfConsumptionPercent',min:0,max:100});
  const avoidedPrice=numberIn(raw.avoidedPrice,{name:'avoidedPrice',min:0,max:10});
  const surplusCompensation=numberIn(raw.surplusCompensation,{name:'surplusCompensation',min:0,max:10});
  const annualMaintenance=numberIn(raw.annualMaintenance,{name:'annualMaintenance',min:0,max:100000});
  const degradationPercent=numberIn(raw.degradationPercent,{name:'degradationPercent',min:0,max:10});
  const horizonYears=numberIn(raw.horizonYears,{name:'horizonYears',min:1,max:50,integer:true});
  const energyPriceGrowthPercent=numberIn(raw.energyPriceGrowthPercent,{name:'energyPriceGrowthPercent',min:-20,max:50});
  const discountRatePercent=numberIn(raw.discountRatePercent,{name:'discountRatePercent',min:-20,max:100});
  if(aid>installationCost) throw Object.assign(new RangeError('aid: las ayudas no pueden superar el coste de instalación.'),{field:'aid'});
  const netInvestment=installationCost-aid;
  const selfShare=selfConsumptionPercent/100;
  const degradation=degradationPercent/100;
  const priceGrowth=energyPriceGrowthPercent/100;
  const years=[];
  for(let year=1;year<=horizonYears;year++){
    const production=annualProductionKwh*Math.pow(1-degradation,year-1);
    const selfConsumed=Math.min(production*selfShare,annualConsumptionKwh);
    const surplus=Math.max(0,production-selfConsumed);
    const price=avoidedPrice*Math.pow(1+priceGrowth,year-1);
    const grossSaving=selfConsumed*price+surplus*surplusCompensation;
    const cashFlow=grossSaving-annualMaintenance;
    years.push({year,productionKwh:production,selfConsumedKwh:selfConsumed,surplusKwh:surplus,avoidedPrice:price,grossSaving,cashFlow});
  }
  let cumulative=-netInvestment;
  for(const row of years){cumulative+=row.cashFlow;row.cumulativeCash=cumulative;}
  const paybackYears=cumulativePayback(years.map(y=>y.cashFlow),netInvestment);
  const firstYearSaving=years[0]?.cashFlow??0;
  const npv=netPresentValue(years.map(y=>y.cashFlow),netInvestment,discountRatePercent);
  return {netInvestment,firstYearSaving,paybackYears,npv,years};
}

import {numberIn} from './common.mjs';
import {annualEnergyCost,purchasedEnergyFromUsefulHeat} from './heating-common.mjs';

export const HEATING_COMPARISON_META=Object.freeze({
  version:'1.0',checkedAt:'2026-10-06',
  pelletPciReferenceKwhKg:4.7,
  note:'Todos los precios, rendimientos, SCOP y costes fijos son datos editables del usuario. 4,7 kWh/kg se muestra únicamente como referencia IDAE para pellet de madera.'
});

const fixed=(raw,name)=>numberIn(raw,{name,min:0,max:100000});

export function calculateHeatingComparison(raw){
  const usefulHeatKwh=numberIn(raw.usefulHeatKwh,{name:'usefulHeatKwh',min:0,max:1000000});
  const electricityPrice=numberIn(raw.electricityPrice,{name:'electricityPrice',min:0,max:10});
  const resistanceFixed=fixed(raw.resistanceFixed,'resistanceFixed');
  const scop=numberIn(raw.scop,{name:'scop',min:0.1,max:10});
  const heatPumpFixed=fixed(raw.heatPumpFixed,'heatPumpFixed');
  const gasPrice=numberIn(raw.gasPrice,{name:'gasPrice',min:0,max:10});
  const gasEfficiencyPercent=numberIn(raw.gasEfficiencyPercent,{name:'gasEfficiencyPercent',min:1,max:120});
  const gasFixed=fixed(raw.gasFixed,'gasFixed');
  const pelletPriceKg=numberIn(raw.pelletPriceKg,{name:'pelletPriceKg',min:0,max:20});
  const pelletPciKwhKg=numberIn(raw.pelletPciKwhKg,{name:'pelletPciKwhKg',min:0.1,max:20});
  const pelletEfficiencyPercent=numberIn(raw.pelletEfficiencyPercent,{name:'pelletEfficiencyPercent',min:1,max:120});
  const pelletFixed=fixed(raw.pelletFixed,'pelletFixed');

  const resistance=annualEnergyCost({usefulHeatKwh,performance:1,unitPrice:electricityPrice,fixedCost:resistanceFixed});
  const heatPump=annualEnergyCost({usefulHeatKwh,performance:scop,unitPrice:electricityPrice,fixedCost:heatPumpFixed});
  const gas=annualEnergyCost({usefulHeatKwh,performance:gasEfficiencyPercent/100,unitPrice:gasPrice,fixedCost:gasFixed});
  const pelletUsefulPerKg=pelletPciKwhKg*(pelletEfficiencyPercent/100);
  const pelletKg=usefulHeatKwh/pelletUsefulPerKg;
  const pelletPurchasedEnergyKwh=purchasedEnergyFromUsefulHeat(usefulHeatKwh,pelletEfficiencyPercent/100);
  const pelletVariableCost=pelletKg*pelletPriceKg;
  const pellet={purchasedEnergyKwh:pelletPurchasedEnergyKwh,pelletKg,variableCost:pelletVariableCost,fixedCost:pelletFixed,annualCost:pelletVariableCost+pelletFixed};

  const systems=[
    {key:'resistance',name:'Resistencia eléctrica',...resistance},
    {key:'heat-pump',name:'Bomba de calor / aerotermia',...heatPump},
    {key:'gas',name:'Gas natural',...gas},
    {key:'pellet',name:'Pellet',...pellet}
  ].map(s=>({...s,costPerUsefulKwh:usefulHeatKwh===0?0:s.annualCost/usefulHeatKwh}));

  const ranked=[...systems].sort((a,b)=>a.annualCost-b.annualCost);
  const cheapest=ranked[0]?.annualCost??0;
  return {
    usefulHeatKwh,
    systems:ranked.map(s=>({...s,differenceToCheapest:s.annualCost-cheapest}))
  };
}

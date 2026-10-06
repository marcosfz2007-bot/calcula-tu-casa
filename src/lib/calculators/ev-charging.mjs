import {numberIn} from './common.mjs';

export function calculateEvCharging(raw){
  const mode=raw.mode==='manual'?'manual':'battery';
  let storedEnergyKwh,batteryCapacityKwh=null,socInitial=null,socTarget=null,manualEnergyKwh=null;
  if(mode==='battery'){
    batteryCapacityKwh=numberIn(raw.batteryCapacityKwh,{name:'batteryCapacityKwh',min:0.01,max:1000});
    socInitial=numberIn(raw.socInitial,{name:'socInitial',min:0,max:100});
    socTarget=numberIn(raw.socTarget,{name:'socTarget',min:0,max:100});
    if(socTarget<=socInitial) throw Object.assign(new RangeError('socTarget: el SOC objetivo debe ser mayor que el SOC inicial.'),{field:'socTarget'});
    storedEnergyKwh=batteryCapacityKwh*(socTarget-socInitial)/100;
  }else{
    manualEnergyKwh=numberIn(raw.manualEnergyKwh,{name:'manualEnergyKwh',min:0,max:1000});
    storedEnergyKwh=manualEnergyKwh;
  }
  const chargerPowerKw=numberIn(raw.chargerPowerKw,{name:'chargerPowerKw',min:0.01,max:1000});
  const vehicleAcLimitKw=numberIn(raw.vehicleAcLimitKw,{name:'vehicleAcLimitKw',min:0.01,max:1000,optional:true});
  const efficiencyPercent=numberIn(raw.efficiencyPercent,{name:'efficiencyPercent',min:0.01,max:100});
  const price=numberIn(raw.price,{name:'price',min:0,max:10});
  const consumptionKwh100=numberIn(raw.consumptionKwh100,{name:'consumptionKwh100',min:0.01,max:200,optional:true});
  const effectivePowerKw=vehicleAcLimitKw===null?chargerPowerKw:Math.min(chargerPowerKw,vehicleAcLimitKw);
  const efficiency=efficiencyPercent/100;
  const gridEnergyKwh=storedEnergyKwh/efficiency;
  const lossesKwh=gridEnergyKwh-storedEnergyKwh;
  const timeHours=gridEnergyKwh/effectivePowerKw;
  const cost=gridEnergyKwh*price;
  const rangeKm=consumptionKwh100===null?null:storedEnergyKwh/consumptionKwh100*100;
  const costPer100Km=consumptionKwh100===null?null:(consumptionKwh100/efficiency)*price;
  return {mode,batteryCapacityKwh,socInitial,socTarget,manualEnergyKwh,storedEnergyKwh,chargerPowerKw,vehicleAcLimitKw,efficiencyPercent,price,consumptionKwh100,effectivePowerKw,gridEnergyKwh,lossesKwh,timeHours,cost,rangeKm,costPer100Km};
}

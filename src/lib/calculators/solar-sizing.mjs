import {numberIn} from './common.mjs';

export const SOLAR_SIZING_META=Object.freeze({
  version:'1.0',checkedAt:'2026-10-06',
  note:'La producción específica kWh/kWp·año debe proceder de PVGIS/JRC o ser introducida manualmente por el usuario. No se incorporan factores de irradiación provinciales.'
});

export function calculateSolarSizing(raw){
  const annualConsumptionKwh=numberIn(raw.annualConsumptionKwh,{name:'annualConsumptionKwh',min:0,max:1000000});
  const targetCoveragePercent=numberIn(raw.targetCoveragePercent,{name:'targetCoveragePercent',min:0,max:200});
  const panelPowerWp=numberIn(raw.panelPowerWp,{name:'panelPowerWp',min:1,max:2000});
  const panelAreaM2=numberIn(raw.panelAreaM2,{name:'panelAreaM2',min:0.1,max:10});
  const availableAreaM2=numberIn(raw.availableAreaM2,{name:'availableAreaM2',min:0,max:100000,optional:true});
  const specificYieldKwhPerKwp=numberIn(raw.specificYieldKwhPerKwp,{name:'specificYieldKwhPerKwp',min:1,max:5000});

  const targetProductionKwh=annualConsumptionKwh*(targetCoveragePercent/100);
  const requiredKwp=targetProductionKwh===0?0:targetProductionKwh/specificYieldKwhPerKwp;
  const panelPowerKwp=panelPowerWp/1000;
  const panels=requiredKwp===0?0:Math.ceil(requiredKwp/panelPowerKwp);
  const installedKwp=panels*panelPowerKwp;
  const requiredAreaM2=panels*panelAreaM2;
  const estimatedAnnualProductionKwh=installedKwp*specificYieldKwhPerKwp;
  const theoreticalAnnualCoveragePercent=annualConsumptionKwh===0?null:estimatedAnnualProductionKwh/annualConsumptionKwh*100;
  const fitsAvailableArea=availableAreaM2===null?null:requiredAreaM2<=availableAreaM2;
  const maxPanelsByArea=availableAreaM2===null?null:Math.floor(availableAreaM2/panelAreaM2);
  return {annualConsumptionKwh,targetCoveragePercent,panelPowerWp,panelAreaM2,availableAreaM2,specificYieldKwhPerKwp,targetProductionKwh,requiredKwp,panels,installedKwp,requiredAreaM2,estimatedAnnualProductionKwh,theoreticalAnnualCoveragePercent,fitsAvailableArea,maxPanelsByArea};
}

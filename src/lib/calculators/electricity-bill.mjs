import {numberIn} from './common.mjs';
import {ELECTRICITY_BILL_REGULATION} from '../config/electricity-bill.mjs';

export function calculateElectricityBill(raw){
  const consumptionKwh=numberIn(raw.consumptionKwh,{name:'consumptionKwh',min:0,max:100000});
  const energyPrice=numberIn(raw.energyPrice,{name:'energyPrice',min:0,max:10});
  const powerKw=numberIn(raw.powerKw,{name:'powerKw',min:0,max:1000});
  const powerPriceKwDay=numberIn(raw.powerPriceKwDay,{name:'powerPriceKwDay',min:0,max:10});
  const days=numberIn(raw.days,{name:'days',min:1,max:366,integer:true});
  const electricityTaxPercent=numberIn(raw.electricityTaxPercent,{name:'electricityTaxPercent',min:0,max:100});
  const vatPercent=numberIn(raw.vatPercent,{name:'vatPercent',min:0,max:100});
  const meterRental=numberIn(raw.meterRental,{name:'meterRental',min:0,max:10000});
  const otherBeforeVat=numberIn(raw.otherBeforeVat,{name:'otherBeforeVat',min:0,max:100000});
  const otherAfterVat=numberIn(raw.otherAfterVat,{name:'otherAfterVat',min:0,max:100000});

  const energyTerm=consumptionKwh*energyPrice;
  const powerTerm=powerKw*powerPriceKwDay*days;
  const electricityTaxBase=energyTerm+powerTerm;
  const percentageTax=electricityTaxBase*(electricityTaxPercent/100);
  const statutoryMinimumTax=consumptionKwh/1000*ELECTRICITY_BILL_REGULATION.electricityTax.minimumDomesticEuroPerMwh;
  const electricityTax=Math.max(percentageTax,statutoryMinimumTax);
  const beforeVat=energyTerm+powerTerm+electricityTax+meterRental+otherBeforeVat;
  const vat=beforeVat*(vatPercent/100);
  const total=beforeVat+vat+otherAfterVat;

  return {
    consumptionKwh,energyPrice,powerKw,powerPriceKwDay,days,electricityTaxPercent,vatPercent,meterRental,otherBeforeVat,otherAfterVat,
    energyTerm,powerTerm,electricityTaxBase,percentageTax,statutoryMinimumTax,electricityTax,beforeVat,vat,total,
    regulationCheckedAt:ELECTRICITY_BILL_REGULATION.checkedAt
  };
}

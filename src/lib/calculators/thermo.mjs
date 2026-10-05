import {numberIn} from './common.mjs';

export const THERMO_META=Object.freeze({
 version:'1.1',
 checkedAt:'2026-10-05',
 waterSpecificHeatKjKgK:4.186,
 kwhPerLitreKelvin:4.186/3600,
 litreToKgApprox:1,
 source:'NIST: calor específico típico del agua ≈ 4,186 kJ/(kg·K); 4,186/3600 ≈ 0,001163 kWh/(kg·K), usando 1 L ≈ 1 kg como aproximación doméstica.'
});

export function calculateThermo(raw){
 const persons=numberIn(raw.persons,{name:'persons',min:1,max:20,integer:true});
 const showers=numberIn(raw.showers,{name:'showers',min:0,max:40,integer:true});
 const litresPerShower=numberIn(raw.litresPerShower,{name:'litresPerShower',min:0,max:300});
 const cold=numberIn(raw.cold,{name:'cold',min:0,max:35});
 const showerTemp=numberIn(raw.showerTemp,{name:'showerTemp',min:10,max:60});
 const target=numberIn(raw.target,{name:'target',min:20,max:90});
 const powerW=numberIn(raw.powerW,{name:'powerW',min:100,max:12000});
 const volume=numberIn(raw.volume,{name:'volume',min:10,max:1000});
 const price=numberIn(raw.price,{name:'price',min:0,max:5,optional:true});

 if(!(cold<showerTemp && showerTemp<target)){
   throw Object.assign(new RangeError('showerTemp: debe cumplirse temperatura fría < temperatura de uso/ducha < temperatura del termo.'),{field:'showerTemp'});
 }

 const tankDeltaT=target-cold;
 const showerDeltaT=showerTemp-cold;
 const hotFraction=showerDeltaT/tankDeltaT;
 const energyTank=volume*THERMO_META.kwhPerLitreKelvin*tankDeltaT;
 const heatTimeHours=energyTank/(powerW/1000);
 const mixedDailyLitres=showers*litresPerShower;
 const hotDailyLitres=mixedDailyLitres*hotFraction;
 const mixedAvailableLitres=volume/hotFraction;
 const minimumTheoreticalVolumeLitres=hotDailyLitres;
 const dailyEnergy=mixedDailyLitres*THERMO_META.kwhPerLitreKelvin*showerDeltaT;
 const coverage=mixedDailyLitres===0?null:mixedAvailableLitres/mixedDailyLitres;
 const mixedLitresPerPerson=mixedDailyLitres/persons;
 const hotLitresPerPerson=hotDailyLitres/persons;

 return {
   persons,showers,litresPerShower,cold,showerTemp,target,powerW,volume,price,
   tankDeltaT,showerDeltaT,hotFraction,energyTank,heatTimeHours,
   mixedDailyLitres,hotDailyLitres,mixedAvailableLitres,minimumTheoreticalVolumeLitres,
   dailyEnergy,coverage,mixedLitresPerPerson,hotLitresPerPerson,
   tankCost:price===null?null:energyTank*price,
   dailyCost:price===null?null:dailyEnergy*price
 };
}

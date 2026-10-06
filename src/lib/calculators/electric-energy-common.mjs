export function kwhFromWatts({watts,hours,days=1,units=1}){
  for(const [name,value] of Object.entries({watts,hours,days,units})){
    if(!Number.isFinite(value)||value<0) throw new RangeError(name+': valor no válido.');
  }
  return watts/1000*hours*days*units;
}

export function energyCost(kwh,price){
  if(!Number.isFinite(kwh)||kwh<0) throw new RangeError('kwh: valor no válido.');
  if(!Number.isFinite(price)||price<0) throw new RangeError('price: valor no válido.');
  return kwh*price;
}

export function simplePositivePayback(investment,annualSaving){
  if(!Number.isFinite(investment)||investment<0) throw new RangeError('investment: valor no válido.');
  if(!Number.isFinite(annualSaving)) throw new RangeError('annualSaving: valor no válido.');
  if(investment===0) return 0;
  return annualSaving>0?investment/annualSaving:null;
}

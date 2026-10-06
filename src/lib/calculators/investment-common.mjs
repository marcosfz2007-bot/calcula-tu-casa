export function simplePaybackYears(investment,annualSaving){
  if(!Number.isFinite(investment)||investment<0) throw new RangeError('investment: valor no válido.');
  if(!Number.isFinite(annualSaving)) throw new RangeError('annualSaving: valor no válido.');
  if(investment===0) return 0;
  return annualSaving>0?investment/annualSaving:null;
}

export function cumulativePayback(flows,investment){
  if(!Array.isArray(flows)) throw new RangeError('flows: lista no válida.');
  if(!Number.isFinite(investment)||investment<0) throw new RangeError('investment: valor no válido.');
  if(investment===0) return 0;
  let cumulative=0;
  for(let i=0;i<flows.length;i++){
    const flow=Number(flows[i]);
    if(!Number.isFinite(flow)) throw new RangeError('flows: contiene un valor no válido.');
    const before=cumulative;
    cumulative+=flow;
    if(cumulative>=investment&&flow>0){
      return i+(investment-before)/flow;
    }
  }
  return null;
}

export function netPresentValue(flows,investment,discountRatePercent){
  if(!Array.isArray(flows)) throw new RangeError('flows: lista no válida.');
  const r=discountRatePercent/100;
  if(!Number.isFinite(r)||r<=-1) throw new RangeError('discountRatePercent: valor no válido.');
  return -investment+flows.reduce((sum,flow,index)=>sum+flow/Math.pow(1+r,index+1),0);
}

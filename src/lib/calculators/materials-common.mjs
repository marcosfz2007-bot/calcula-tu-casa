import {numberIn} from './common.mjs';

export function withWaste(base,percent,{name='wastePercent',max=200}={}){
  const p=numberIn(percent,{name,min:0,max});
  return {percent:p,total:base*(1+p/100),extra:base*p/100};
}

export function packagesFor(required,coverage){
  if(!Number.isFinite(required)||required<0) throw new RangeError('required: valor no válido.');
  if(!Number.isFinite(coverage)||coverage<=0) throw new RangeError('coverage: debe ser mayor que cero.');
  return required===0?0:Math.ceil(required/coverage);
}

export function leftoverFromPackages(packages,coverage,required){
  return packages*coverage-required;
}

export function rectangleArea(length,width){
  if(!Number.isFinite(length)||length<0||!Number.isFinite(width)||width<0) throw new RangeError('dimensiones: valores no válidos.');
  return length*width;
}

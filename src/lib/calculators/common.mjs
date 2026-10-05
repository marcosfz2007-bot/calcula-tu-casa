export function parseDecimal(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
  if (typeof value !== 'string') return NaN;
  const text=value.trim();
  if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(text)) return NaN;
  return Number(text.replace(',', '.'));
}
export function numberIn(value,{name='valor',min=-Infinity,max=Infinity,integer=false,optional=false}={}) {
  if (optional && (value === '' || value == null)) return null;
  const n=parseDecimal(value);
  if (!Number.isFinite(n)) throw Object.assign(new RangeError(`${name}: introduce un número válido con coma o punto.`),{field:name});
  if (n<min || n>max || (integer && !Number.isInteger(n))) throw Object.assign(new RangeError(`${name}: valor fuera del rango admitido.`),{field:name});
  return n;
}
export const round=(n,d=6)=>Number(n.toFixed(d));

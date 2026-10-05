export const METHODOLOGY = Object.freeze({ version: '1.0', checkedAt: '2026-10-05', wattsPerKilowatt: 1000, percentScale: 100, sensitivity: 0.2 });
// Límites de entrada de producto, no umbrales normativos. Todas las potencias se expresan en W.
export const FIELDS = Object.freeze({
  watts: { label: 'Potencia eléctrica', unit: 'W', min: 0, max: 30000 },
  hours: { label: 'Horas de uso al día', unit: 'h/día', min: 0, max: 24 },
  days: { label: 'Días de uso al mes', unit: 'días', min: 0, max: 31, integer: true },
  price: { label: 'Precio de la energía', unit: '€/kWh', min: 0, max: 5 },
  factor: { label: 'Utilización de la potencia indicada', unit: '%', min: 0, max: 100 },
  units: { label: 'Número de equipos iguales', unit: 'equipos', min: 1, max: 20, integer: true },
  months: { label: 'Meses de uso al año', unit: 'meses', min: 0, max: 12, integer: true }
});
export function parseDecimal(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
  if (typeof value !== 'string' || !/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(value.trim())) return NaN;
  return Number(value.trim().replace(',', '.'));
}
export function validate(raw) {
  const values = {}, errors = {};
  for (const [key, field] of Object.entries(FIELDS)) {
    const n = parseDecimal(raw[key]);
    if (!Number.isFinite(n)) errors[key] = 'Introduce un número válido, con coma o punto y sin separador de miles.';
    else if (n < field.min || n > field.max || (field.integer && !Number.isInteger(n))) errors[key] = `Introduce ${field.integer ? 'un entero' : 'un valor'} entre ${field.min} y ${field.max}.`;
    else values[key] = n;
  }
  if (values.days * values.months > 365) errors.months = 'La combinación supera 365 días de uso al año. Reduce días o meses.';
  return { values, errors, valid: Object.keys(errors).length === 0 };
}
export function calculateEnergy(raw) {
  const checked = validate(raw);
  if (!checked.valid) throw new RangeError(JSON.stringify(checked.errors));
  const v = checked.values;
  const hourlyKwh = v.watts / METHODOLOGY.wattsPerKilowatt * v.factor / METHODOLOGY.percentScale * v.units;
  const dailyKwh = hourlyKwh * v.hours;
  const monthlyKwh = dailyKwh * v.days;
  const annualKwh = monthlyKwh * v.months;
  return { hourlyKwh, dailyKwh, monthlyKwh, annualKwh, hourlyCost: hourlyKwh * v.price, dailyCost: dailyKwh * v.price, monthlyCost: monthlyKwh * v.price, annualCost: annualKwh * v.price,
    lowCost: hourlyKwh * Math.max(0, v.hours * (1 - METHODOLOGY.sensitivity)) * v.days * v.price,
    highCost: hourlyKwh * Math.min(24, v.hours * (1 + METHODOLOGY.sensitivity)) * v.days * v.price };
}

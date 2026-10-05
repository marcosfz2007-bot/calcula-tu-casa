import { calculateEnergy, validate, FIELDS } from './energy.mjs';
const root = document.querySelector('[data-calculator]');
if (root) {
 const form = root.querySelector('form'), output = root.querySelector('#result-output');
 const number = new Intl.NumberFormat('es-ES', {maximumFractionDigits: 2});
 const money = new Intl.NumberFormat('es-ES', {style: 'currency', currency:'EUR'});
 const el = (tag, text, cls) => {const node=document.createElement(tag); node.textContent=text; if(cls)node.className=cls; return node;};
 const render = (focusError = false) => {
   const raw = Object.fromEntries(new FormData(form)), check = validate(raw);
   for (const key of Object.keys(FIELDS)) { const input=form.elements.namedItem(key); input.setAttribute('aria-invalid', String(Boolean(check.errors[key]))); root.querySelector(`#${key}-error`).textContent=check.errors[key] || ''; }
   output.replaceChildren();
   if (!check.valid) {output.append(el('p','Revisa los campos señalados para obtener un resultado válido.')); if(focusError) form.elements.namedItem(Object.keys(check.errors)[0]).focus(); return;}
   const r=calculateEnergy(raw), v=check.values;
   output.append(el('p',money.format(r.monthlyCost),'amount'),el('p',`${number.format(r.monthlyKwh)} kWh al mes`));
   const dl=el('dl','');
   for (const [label,value] of [['Por hora de uso',money.format(r.hourlyCost)],['Por día de uso',money.format(r.dailyCost)],['Coste anual estimado',money.format(r.annualCost)],['Consumo anual',`${number.format(r.annualKwh)} kWh`]]) dl.append(el('dt',label),el('dd',value));
   output.append(dl,el('hr',''),el('h3','¿Y si cambias el horario?'),el('p',`Un 20 % menos de horas: ${money.format(r.lowCost)}/mes. Un 20 % más (máximo 24 h/día): ${money.format(r.highCost)}/mes.`),el('small',`Hipótesis: ${number.format(v.watts)} W × ${v.units} equipo(s), utilización ${number.format(v.factor)} %, ${number.format(v.hours)} h/día, ${v.days} días/mes y ${v.months} meses/año. Precio ${number.format(v.price)} €/kWh.`, 'help'),el('p','Estimación del coste variable de la energía. No es tu factura completa.','notice mt-5'));
 };
 form.addEventListener('submit',event=>{event.preventDefault();render(true);});
 form.addEventListener('input',()=>{output.replaceChildren(el('p','Datos modificados. Pulsa «Calcular consumo» para actualizar el resultado.'));});
 form.addEventListener('reset',()=>{queueMicrotask(()=>render());});
 render();
}

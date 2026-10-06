import {calculateEvCharging} from './calculators/ev-charging.mjs';
const nf=new Intl.NumberFormat('es-ES',{maximumFractionDigits:2}),money=new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'});
const root=document.querySelector('[data-ev-charging]');
if(root){
 const form=root.querySelector('form'),result=root.querySelector('[data-result]'),error=root.querySelector('[data-form-error]'),mode=form.elements.mode;
 const sync=()=>{const manual=mode.value==='manual';root.querySelector('[data-battery-mode]').hidden=manual;root.querySelector('[data-manual-mode]').hidden=!manual;};
 const line=(label,value)=>{const p=document.createElement('p');const s=document.createElement('strong');s.textContent=label+': ';p.append(s,document.createTextNode(value));return p;};
 mode.addEventListener('change',sync);sync();
 form.addEventListener('submit',e=>{e.preventDefault();error.textContent='';try{const r=calculateEvCharging(Object.fromEntries(new FormData(form)));const amount=document.createElement('p');amount.className='amount';amount.textContent=nf.format(r.timeHours)+' h';const nodes=[amount,line('Energía añadida a batería',nf.format(r.storedEnergyKwh)+' kWh'),line('Energía tomada de red',nf.format(r.gridEnergyKwh)+' kWh'),line('Pérdidas estimadas',nf.format(r.lossesKwh)+' kWh'),line('Potencia efectiva',nf.format(r.effectivePowerKw)+' kW'),line('Coste',money.format(r.cost))];if(r.rangeKm!==null)nodes.push(line('Autonomía equivalente energética',nf.format(r.rangeKm)+' km'),line('Coste energético por 100 km',money.format(r.costPer100Km)));nodes.push(Object.assign(document.createElement('p'),{className:'notice',textContent:'No modela curva de carga DC, reducción de potencia por temperatura/SOC, balance dinámico doméstico ni límites que no hayas introducido.'}));result.replaceChildren(...nodes);}catch(err){error.textContent=err instanceof Error?err.message:'Revisa los datos.';}});
 form.addEventListener('reset',()=>queueMicrotask(()=>{sync();error.textContent='';result.replaceChildren(Object.assign(document.createElement('p'),{textContent:'Valores restablecidos. Introduce los datos y calcula.'}));}));
}

import {calculateWaterproofing} from './calculators/waterproofing.mjs';
const nf=new Intl.NumberFormat('es-ES',{maximumFractionDigits:2}),money=new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'});
const root=document.querySelector('[data-waterproofing]');
if(root){
 const form=root.querySelector('form'),result=root.querySelector('[data-result]'),error=root.querySelector('[data-form-error]'),mode=form.elements.mode,unit=root.querySelector('[data-container-unit]');
 const sync=()=>{const litres=mode.value==='litres',kg=mode.value==='kg';root.querySelector('[data-litres-mode]').hidden=!litres;root.querySelector('[data-kg-mode]').hidden=!kg;unit.textContent=litres?'L':kg?'kg':'unidad';};
 const line=(label,value)=>{const p=document.createElement('p');const s=document.createElement('strong');s.textContent=label+': ';p.append(s,document.createTextNode(value));return p;};
 mode.addEventListener('change',sync);sync();
 form.addEventListener('submit',e=>{e.preventDefault();error.textContent='';try{const r=calculateWaterproofing(Object.fromEntries(new FormData(form)));const nodes=[Object.assign(document.createElement('p'),{className:'amount',textContent:nf.format(r.purchaseQuantity)+' '+r.unit}),line('Cantidad teórica',nf.format(r.theoreticalQuantity)+' '+r.unit),line('Cantidad con margen',nf.format(r.purchaseQuantity)+' '+r.unit),line('Margen',nf.format(r.marginPercent)+' %')];if(r.mode==='kg')nodes.push(line('Interpretación del consumo',r.basis==='per-coat'?'kg/m² por cada capa':'kg/m² total del sistema'));if(r.containers!==null)nodes.push(line('Envases',nf.format(r.containers)),line('Cantidad comprada',nf.format(r.purchasedQuantity)+' '+r.unit),line('Sobrante',nf.format(r.leftoverQuantity)+' '+r.unit));if(r.cost!==null)nodes.push(line('Coste',money.format(r.cost)));result.replaceChildren(...nodes);}catch(err){error.textContent=err instanceof Error?err.message:'Revisa los datos.';}});
 form.addEventListener('reset',()=>queueMicrotask(()=>{sync();error.textContent='';result.replaceChildren(Object.assign(document.createElement('p'),{textContent:'Valores restablecidos. Selecciona el modo y calcula.'}));}));
}

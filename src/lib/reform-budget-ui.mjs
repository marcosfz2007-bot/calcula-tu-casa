import {calculateRangeBudget} from './calculators/reforms-common.mjs';
const money=new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const nf=new Intl.NumberFormat('es-ES',{maximumFractionDigits:2});
document.querySelectorAll('[data-reform-budget]').forEach(root=>{
 const form=root.querySelector('form'),result=root.querySelector('[data-result]'),error=root.querySelector('[data-form-error]');
 const line=(label,value)=>{const p=document.createElement('p');const s=document.createElement('strong');s.textContent=label+': ';p.append(s,document.createTextNode(value));return p;};
 const quantityFor=(row)=>{const key=row.dataset.quantityKey;if(key==='fixed')return 1;return form.elements[key]?.value??0;};
 const updateQuantities=()=>root.querySelectorAll('[data-row]').forEach(row=>{const q=quantityFor(row);row.querySelector('[data-quantity-label]').textContent='Cantidad usada: '+q+' '+row.dataset.unit;});
 updateQuantities();
 form.addEventListener('input',updateQuantities);
 form.addEventListener('submit',e=>{e.preventDefault();error.textContent='';try{
   const rows=[...root.querySelectorAll('[data-row]')].map((row,index)=>({
     key:row.dataset.key,label:row.dataset.label,unit:row.dataset.unit,quantity:quantityFor(row),
     selected:row.querySelector('input[type=checkbox]').checked,
     low:row.querySelector('[name=low]').value,central:row.querySelector('[name=central]').value,high:row.querySelector('[name=high]').value
   }));
   const area=form.elements.area?.value;
   const r=calculateRangeBudget({surface:area,rows});
   const amount=document.createElement('p');amount.className='amount';amount.textContent=money.format(r.total.central);
   const nodes=[amount,line('Escenario bajo',money.format(r.total.low)),line('Escenario central',money.format(r.total.central)),line('Escenario alto',money.format(r.total.high)),line('Central por m² útil',nf.format(r.perM2.central)+' €/m²')];
   const wrap=document.createElement('div');wrap.className='table-wrap';const table=document.createElement('table');table.className='data-table';table.innerHTML='<thead><tr><th>Partida</th><th>Cantidad</th><th>Bajo</th><th>Central</th><th>Alto</th></tr></thead>';const body=document.createElement('tbody');r.rows.forEach(row=>{const tr=document.createElement('tr');[row.label,nf.format(row.quantity)+' '+row.unit,money.format(row.low),money.format(row.central),money.format(row.high)].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td);});body.append(tr);});table.append(body);wrap.append(table);nodes.push(wrap);
   const note=document.createElement('p');note.className='notice';note.textContent='El rango depende íntegramente de los precios unitarios que has introducido. No es una tarifa nacional ni incorpora un factor provincial oculto.';nodes.push(note);result.replaceChildren(...nodes);
 }catch(err){error.textContent=err instanceof Error?err.message:'Revisa los precios de las partidas.';}});
 form.addEventListener('reset',()=>queueMicrotask(()=>{error.textContent='';updateQuantities();result.replaceChildren(Object.assign(document.createElement('p'),{textContent:'Valores restablecidos. Introduce precios unitarios y calcula.'}));}));
});

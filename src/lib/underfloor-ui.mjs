import {calculateUnderfloor} from './calculators/underfloor.mjs';
const nf=new Intl.NumberFormat('es-ES',{maximumFractionDigits:2});
const root=document.querySelector('[data-underfloor]');
if(root){
  const form=root.querySelector('form'),rooms=root.querySelector('[data-rooms]'),result=root.querySelector('[data-result]'),error=root.querySelector('[data-form-error]');
  const initialRooms=rooms.innerHTML;
  const line=(label,value)=>{const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(value));return p;};
  const makeRoom=(index)=>{const row=document.createElement('div');row.className='dynamic-row room-row';row.innerHTML='<label>Estancia <input name="roomName" type="text" autocomplete="off"/></label><label>Superficie <span class="input-wrap"><input name="roomArea" inputmode="decimal"/><span>m²</span></span></label><button type="button" class="button tertiary" data-remove-room>Eliminar</button>';row.querySelector('[name=roomName]').value='Estancia '+index;row.querySelector('[name=roomArea]').value='10';return row;};
  const collect=()=>({
    rooms:[...rooms.querySelectorAll('.room-row')].map(row=>({name:row.querySelector('[name=roomName]').value,area:row.querySelector('[name=roomArea]').value})),
    spacingM:form.elements.spacingM.value,connectionM:form.elements.connectionM.value,marginPercent:form.elements.marginPercent.value,maxCircuitM:form.elements.maxCircuitM.value
  });
  const render=(r)=>{const amount=document.createElement('p');amount.className='amount';amount.textContent=nf.format(r.totalLengthM)+' m';const nodes=[amount,line('Superficie total',nf.format(r.area)+' m²'),line('Longitud base A/s',nf.format(r.baseLengthM)+' m'),line('Conexiones añadidas',nf.format(r.connectionM)+' m'),line('Margen',nf.format(r.marginLengthM)+' m ('+nf.format(r.marginPercent)+' %)'),line('Número orientativo de circuitos',nf.format(r.circuits)),line('Longitud media por circuito',nf.format(r.averageCircuitM)+' m')];const note=document.createElement('p');note.className='notice';note.textContent='El reparto real entre circuitos debe comprobar pérdidas de carga, diámetro, colectores y criterios del fabricante.';nodes.push(note);result.replaceChildren(...nodes);};
  form.addEventListener('submit',e=>{e.preventDefault();error.textContent='';try{render(calculateUnderfloor(collect()));}catch(err){error.textContent=err instanceof Error?err.message:'Revisa los datos.';result.replaceChildren(Object.assign(document.createElement('p'),{textContent:'No se puede calcular todavía.'}));}});
  form.addEventListener('reset',()=>queueMicrotask(()=>{rooms.innerHTML=initialRooms;error.textContent='';result.replaceChildren(Object.assign(document.createElement('p'),{textContent:'Valores restablecidos. Pulsa «Calcular tubo y circuitos» para actualizar.'}));}));
  root.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.matches('[data-add-room]'))rooms.append(makeRoom(rooms.querySelectorAll('.room-row').length+1));if(button.matches('[data-remove-room]')&&rooms.querySelectorAll('.room-row').length>1)button.closest('.room-row').remove();});
}

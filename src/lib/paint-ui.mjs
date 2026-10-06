import {calculatePaint} from './calculators/paint.mjs';
const nf=new Intl.NumberFormat('es-ES',{maximumFractionDigits:2});
const root=document.querySelector('[data-paint]');
if(root){
 const form=root.querySelector('form'),result=root.querySelector('[data-result]'),error=root.querySelector('[data-form-error]');
 const line=(label,value)=>{const p=document.createElement('p');const s=document.createElement('strong');s.textContent=label+': ';p.append(s,document.createTextNode(value));return p;};
 form.addEventListener('submit',e=>{e.preventDefault();error.textContent='';try{
  const raw=Object.fromEntries(new FormData(form));raw.paintWalls=form.elements.paintWalls.checked;raw.paintCeiling=form.elements.paintCeiling.checked;
  const r=calculatePaint(raw);const amount=document.createElement('p');amount.className='amount';amount.textContent=nf.format(r.litres)+' L';
  const nodes=[amount,line('Paredes',nf.format(r.wallsArea)+' m²'),line('Techo',nf.format(r.ceilingArea)+' m²'),line('Huecos descontados',nf.format(r.openingsArea)+' m²'),line('Superficie neta por mano',nf.format(r.netArea)+' m²'),line('Superficie total con manos',nf.format(r.equivalentArea)+' m²'),line('Litros teóricos',nf.format(r.theoreticalLitres)+' L'),line('Litros con margen',nf.format(r.litres)+' L')];
  if(r.cans!==null)nodes.push(line('Envases',nf.format(r.cans)),line('Litros comprados',nf.format(r.purchasedLitres)+' L'),line('Sobrante aproximado',nf.format(r.leftoverLitres)+' L'));
  result.replaceChildren(...nodes);
 }catch(err){error.textContent=err instanceof Error?err.message:'Revisa los datos.';}});
 form.addEventListener('reset',()=>queueMicrotask(()=>{error.textContent='';result.replaceChildren(Object.assign(document.createElement('p'),{textContent:'Valores restablecidos. Introduce el rendimiento y calcula.'}));}));
}

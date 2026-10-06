import {calculateTiles} from './calculators/tiles.mjs';
const nf=new Intl.NumberFormat('es-ES',{maximumFractionDigits:2}),money=new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'});
const root=document.querySelector('[data-tiles]');
if(root){
 const form=root.querySelector('form'),result=root.querySelector('[data-result]'),error=root.querySelector('[data-form-error]'),mode=form.elements.boxMode;
 const sync=()=>{const coverage=mode.value==='coverage';root.querySelector('[data-pieces-box]').hidden=coverage;root.querySelector('[data-coverage-box]').hidden=!coverage;};
 const line=(label,value)=>{const p=document.createElement('p');const s=document.createElement('strong');s.textContent=label+': ';p.append(s,document.createTextNode(value));return p;};
 mode.addEventListener('change',sync);sync();
 form.addEventListener('submit',e=>{e.preventDefault();error.textContent='';try{
  const r=calculateTiles(Object.fromEntries(new FormData(form)));const amount=document.createElement('p');amount.className='amount';amount.textContent=nf.format(r.piecesToBuy)+' piezas';
  const nodes=[amount,line('Superficie',nf.format(r.surfaceM2)+' m²'),line('Área por pieza',nf.format(r.pieceAreaM2)+' m²'),line('Piezas teóricas',nf.format(r.theoreticalPieces)),line('Piezas con desperdicio y redondeo',nf.format(r.piecesToBuy)),line('Desperdicio aplicado',nf.format(r.wastePercent)+' %'),line('Cajas',nf.format(r.boxes)),line('Superficie comprada',nf.format(r.purchasedAreaM2)+' m²'),line('Sobrante frente a la superficie real',nf.format(r.leftoverM2)+' m²')];
  if(r.cost!==null)nodes.push(line('Coste',money.format(r.cost)));result.replaceChildren(...nodes);
 }catch(err){error.textContent=err instanceof Error?err.message:'Revisa los datos.';}});
 form.addEventListener('reset',()=>queueMicrotask(()=>{sync();error.textContent='';result.replaceChildren(Object.assign(document.createElement('p'),{textContent:'Valores restablecidos. Introduce los datos y calcula.'}));}));
}

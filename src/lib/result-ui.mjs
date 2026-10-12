const div=(cls)=>{const node=document.createElement('div');node.className=cls;return node;};
const text=(tag,value,cls)=>{const node=document.createElement(tag);node.textContent=value;if(cls)node.className=cls;return node;};

export function createRangeVisual(low,central,high,format=(value)=>String(value)){
 const wrap=div('result-range-visual');wrap.setAttribute('aria-hidden','true');
 const rail=div('result-range-rail'),marker=document.createElement('span');marker.className='result-range-marker';
 const span=high-low,position=span>0?Math.max(0,Math.min(100,(central-low)/span*100)):50;marker.style.left=position+'%';rail.append(marker);
 const labels=div('result-range-labels');labels.append(text('span',format(low)),text('strong',format(central)),text('span',format(high)));wrap.append(rail,labels);return wrap;
}
export function createBreakdownBar(items){
 const valid=items.filter(item=>Number.isFinite(item.value)&&item.value>0);if(!valid.length)return document.createDocumentFragment();
 const total=valid.reduce((sum,item)=>sum+item.value,0),wrap=div('result-breakdown-visual'),bar=div('result-stack');wrap.setAttribute('aria-hidden','true');
 valid.forEach((item,index)=>{const segment=document.createElement('span');segment.style.width=(item.value/total*100)+'%';segment.dataset.segment=String(index+1);bar.append(segment);});
 const legend=div('result-stack-legend');valid.forEach((item,index)=>{const row=div('result-stack-key'),dot=document.createElement('i');dot.dataset.segment=String(index+1);row.append(dot,text('span',item.label));legend.append(row);});wrap.append(bar,legend);return wrap;
}
export function createScenarioCards(items,primaryIndex=1){
 const wrap=div('result-scenarios');wrap.setAttribute('aria-hidden','true');items.forEach((item,index)=>{const card=div('result-scenario'+(index===primaryIndex?' primary':''));card.append(text('span',item.label),text('strong',item.display));if(item.note)card.append(text('small',item.note));wrap.append(card);});return wrap;
}
export function createComparisonBars(items){
 const valid=items.filter(item=>Number.isFinite(item.value)&&item.value>=0);if(!valid.length)return document.createDocumentFragment();const max=Math.max(...valid.map(item=>item.value),1),wrap=div('result-comparison-visual');wrap.setAttribute('aria-hidden','true');
 valid.forEach(item=>{const row=div('result-comparison-row'),head=div('result-comparison-head');head.append(text('span',item.label),text('strong',item.display));const rail=div('result-comparison-rail'),bar=document.createElement('span');bar.style.width=(item.value/max*100)+'%';rail.append(bar);row.append(head,rail);wrap.append(row);});return wrap;
}
export function createRankingBars(items){
 const valid=items.filter(item=>Number.isFinite(item.value)&&item.value>=0);if(!valid.length)return document.createDocumentFragment();const max=Math.max(...valid.map(item=>item.value),1),wrap=div('result-ranking-visual');wrap.setAttribute('aria-hidden','true');
 valid.slice(0,8).forEach(item=>{const row=div('result-ranking-row'),head=div('result-ranking-head');head.append(text('span',item.label),text('strong',item.display));const rail=div('result-ranking-rail'),bar=document.createElement('span');bar.style.width=(item.value/max*100)+'%';rail.append(bar);row.append(head,rail);wrap.append(row);});return wrap;
}
export function createMonthlyBars(months,format=(value)=>String(value)){
 if(!months?.length)return document.createDocumentFragment();const max=Math.max(...months.map(item=>Number(item.value)||0),1),names=['E','F','M','A','M','J','J','A','S','O','N','D'],wrap=div('result-monthly-visual');wrap.setAttribute('aria-hidden','true');
 months.forEach((item,index)=>{const col=div('result-month'),bar=div('result-month-bar');bar.style.height=Math.max(4,item.value/max*100)+'%';bar.title=format(item.value);col.append(bar,text('span',names[index]||String(index+1)));wrap.append(col);});return wrap;
}
export function createTimelineBars(items){
 if(!items?.length)return document.createDocumentFragment();const sampled=items.length<=10?items:items.filter((_,index)=>index===0||index===items.length-1||index%Math.ceil(items.length/8)===0),values=sampled.map(item=>Math.max(0,Number(item.value)||0)),max=Math.max(...values,1),wrap=div('result-timeline-visual');wrap.setAttribute('aria-hidden','true');
 sampled.forEach((item,index)=>{const col=div('result-timeline-col'),bar=div('result-timeline-bar');bar.style.height=Math.max(4,values[index]/max*100)+'%';col.append(bar,text('span',item.label));wrap.append(col);});return wrap;
}

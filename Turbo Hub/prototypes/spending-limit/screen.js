const H=TurboUI;
let saved={};try{saved=JSON.parse(TurboStoryContext.storage.getItem('turbo-hub-spending-limits'))||{}}catch{}
let target=TurboStoryContext.embedded?'neha':'hub';
document.getElementById('statusbar').append(H.statusbar());document.getElementById('nav').append(H.navigation({title:'Spending limit',variant:'icons-only',left:{label:'Back to Hub',icon:'navigation-back',href:'../hub-dashboard/index.html?tab=Members'}}));document.getElementById('heading').append(H.pageHeader({heading:'Set a monthly spending limit'}));
const form=document.createElement('form');form.className='limit-editor-form';form.noValidate=true;
const limits={hub:100000,arun:45000,kavya:45000,neha:5000};
// Bounds: the Hub's limit runs ₹10,000–₹5,00,000; a member's can't exceed the Hub's current limit.
const inr=v=>'₹'+Number(v).toLocaleString('en-IN');
const bounds=who=>who==='hub'?{min:10000,max:500000,step:5000}:{min:500,max:saved.hub??limits.hub,step:500};
const valueFor=who=>{const {min,max}=bounds(who);return Math.min(max,Math.max(min,saved[who]??limits[who]));};
const amount=H.slider({id:'limit-amount',label:'Monthly limit',...bounds(target),value:valueFor(target),format:inr,onInput:()=>feedback.replaceChildren()});
const syncAmount=()=>{const {min,max,step}=bounds(target);amount.control.step=String(step);amount.setRange(min,max);amount.setValue(valueFor(target));};
const subject=H.select({id:'limit-target',label:'Limit for',items:[['hub','The Sharma’s · Hub'],['arun','Arun Sharma'],['kavya','Kavya Sharma'],['neha','Neha Sharma']],value:target,onChange:value=>{target=value;syncAmount();feedback.replaceChildren()}});
const period=H.select({id:'limit-period',label:'Period',items:[['monthly','Monthly']],value:'monthly'});
const feedback=document.createElement('div');feedback.className='limit-editor-feedback';
const sliderLayout=document.createElement('div');sliderLayout.className='limit-editor-slider';sliderLayout.append(amount);
form.append(subject,period,sliderLayout,H.button({label:TurboStoryContext.embedded&&TurboStoryContext.scene?.id==='spending-limit'?'Send invite':'Save limit',type:'submit'}),feedback);document.getElementById('content').append(form);
form.onsubmit=event=>{event.preventDefault();const value=Number(amount.control.value);saved[target]=value;TurboStoryContext.storage.setItem('turbo-hub-spending-limits',JSON.stringify(saved));feedback.replaceChildren(H.notice({message:'Monthly limit saved: ₹'+value.toLocaleString('en-IN'),onDismiss:()=>feedback.replaceChildren()}));};
window.addEventListener('DOMContentLoaded',()=>{if(TurboStoryContext.embedded)return;document.querySelector('.preview-reference').append(Object.assign(document.createElement('p'),{textContent:'Proposed editor · Hub setup shown as the related Figma reference'}));});

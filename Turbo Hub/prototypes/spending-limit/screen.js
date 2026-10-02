const H=TurboUI;
let saved={};try{saved=JSON.parse(sessionStorage.getItem('turbo-hub-spending-limits'))||{}}catch{}
let target='hub';
document.getElementById('statusbar').append(H.statusbar());document.getElementById('nav').append(H.navigation({title:'Spending limit',left:{label:'Back to Hub',icon:'navigation-back',href:'../hub-dashboard/index.html?tab=Members'}}));document.getElementById('heading').append(H.pageHeader({heading:'Set a monthly spending limit'}));
const form=document.createElement('form');form.className='limit-editor-form';form.noValidate=true;
const limits={hub:100000,arun:45000,kavya:45000,neha:5000};
const amount=H.field({id:'limit-amount',label:'Monthly limit',prefix:'₹',value:String(saved[target]??limits[target]),onInput:()=>{amount.setError('');feedback.replaceChildren()}});amount.control.inputMode='decimal';
const subject=H.select({id:'limit-target',label:'Limit for',items:[['hub','The Sharma’s · Hub'],['arun','Arun Sharma'],['kavya','Kavya Sharma'],['neha','Neha Sharma']],value:target,onChange:value=>{target=value;amount.control.value=String(saved[target]??limits[target]);amount.setError('');feedback.replaceChildren()}});
const period=H.select({id:'limit-period',label:'Period',items:[['monthly','Monthly']],value:'monthly'});
const feedback=document.createElement('div');feedback.className='limit-editor-feedback';
form.append(subject,period,amount,H.button({label:'Save limit',type:'submit'}),feedback);document.getElementById('content').append(form);
form.onsubmit=event=>{event.preventDefault();const text=amount.control.value.trim(),value=Number(text);if(!/^\d+(\.\d{1,2})?$/.test(text)||!Number.isFinite(value)||value<1||value>1000000){amount.setError('Enter an amount from ₹1 to ₹10,00,000, with up to two decimal places.');amount.control.focus();return}saved[target]=value;sessionStorage.setItem('turbo-hub-spending-limits',JSON.stringify(saved));feedback.replaceChildren(H.notice({message:'Monthly limit saved: ₹'+value.toLocaleString('en-IN'),onDismiss:()=>feedback.replaceChildren()}));};
window.addEventListener('DOMContentLoaded',()=>{document.querySelector('.preview-reference').append(Object.assign(document.createElement('p'),{textContent:'Proposed editor · Hub setup shown as the related Figma reference'}));});

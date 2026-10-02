const storageKey='turbo-demo-delivery-draft';
let draft={line1:'',line2:'',line3:'',pincode:'',city:'',state:'',contact:''};
try{const stored=JSON.parse(sessionStorage.getItem(storageKey));if(stored&&typeof stored==='object')for(const key of Object.keys(draft))if(typeof stored[key]==='string')draft[key]=stored[key];}catch{}
document.getElementById('statusbar').append(TurboUI.statusbar());
const returnSaved=new URLSearchParams(location.search).get('return')==='saved';
document.getElementById('nav').append(TurboUI.navigation({title:'Delivery Details',left:{label:'Back to profile',icon:'navigation-back',href:'../member-profile/index.html'+(returnSaved?'?saved=true':'')}}));
const form=document.getElementById('delivery-form'),fields={};
const persist=()=>{try{sessionStorage.setItem(storageKey,JSON.stringify(draft));}catch{}};
for(const [id,label,optional,type,autocomplete] of [['line1','Address Line 1',false,'text','address-line1'],['line2','Address Line 2',true,'text','address-line2'],['line3','Address Line 3',true,'text','address-line3'],['pincode','Pincode',false,'text','postal-code'],['city','City',false,'text','address-level2'],['state','State',false,'text','address-level1'],['contact','Contact Number',false,'tel','tel-national']]){
 const field=TurboUI.field({id,label,optional,type,value:draft[id],prefix:id==='contact'?'+91':'',onInput:value=>{draft[id]=value;field.setError('');persist();}});
 field.control.autocomplete=autocomplete;fields[id]=field;
 if(id==='pincode'){field.control.inputMode='numeric';field.control.maxLength=6;}
 if(id==='city'||id==='state')document.getElementById('locality').append(field);else if(id==='contact')form.append(field);else form.insertBefore(field,document.getElementById('locality'));
}
const confirmation=TurboUI.check({id:'delivery-confirm',label:'I confirm that the information provided is true and correct.',onChange:()=>confirmation.setError('')});
form.append(confirmation,TurboUI.button({label:'Proceed',type:'submit'}));
form.onsubmit=event=>{
 event.preventDefault();let first=null;
 for(const id of ['line1','pincode','city','state','contact']){
  const value=draft[id].trim();let error=!value?'Enter '+(id==='line1'?'Address Line 1':id==='contact'?'a contact number':id)+'.':'';
  if(id==='pincode'&&value&&!/^[1-9]\d{5}$/.test(value))error='Enter a six-digit pincode.';
  if(id==='contact'&&value&&!/^[6-9]\d{9}$/.test(value.replace(/[\s-]/g,'')))error='Enter a valid ten-digit mobile number.';
  fields[id].setError(error);if(error&&!first)first=fields[id].control;
 }
 confirmation.setError(confirmation.control.checked?'':'Confirm the delivery details before proceeding.');
 if(!first&&!confirmation.control.checked)first=confirmation.control;
 if(first){first.focus();return;}
 persist();location.href='../member-profile/index.html?saved=true';
};
// Local draft only; city/state are editable because this demo has no postal lookup.

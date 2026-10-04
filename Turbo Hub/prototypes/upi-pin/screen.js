// Set UPI PIN: the second step. Once confirmed, UPI is active and Neha returns to her profile.
const H=TurboUI;
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Set UPI PIN',variant:'icons-only',left:{label:'Back to PAN',icon:'navigation-back',href:'../verify-pan/index.html'}}));
document.getElementById('heading').append(H.pageHeader({heading:'Set your UPI PIN',subtext:'You’ll use it to approve every UPI payment. Step 2 of 2.'}));
const form=document.getElementById('form'),fields={};
for(const [id,label] of [['pin','New 4-digit PIN'],['confirm','Confirm PIN']]){
 fields[id]=H.field({id,label,value:'4821',type:'password',prominent:true,onInput:()=>fields[id].setError('')});
 fields[id].control.inputMode='numeric';fields[id].control.maxLength=4;fields[id].control.autocomplete='off';form.append(fields[id]);
}
const note=document.createElement('p');note.className='setup-note';note.textContent='Never share your UPI PIN, not even with family.';
form.append(note,H.button({label:'Set UPI PIN',type:'submit'}));
form.onsubmit=event=>{
 event.preventDefault();const pin=fields.pin.control.value.trim(),again=fields.confirm.control.value.trim();
 fields.pin.setError(/^\d{4}$/.test(pin)?'':'Enter 4 digits.');fields.confirm.setError(/^\d{4}$/.test(pin)&&again!==pin?'PINs don’t match.':'');
 if(!/^\d{4}$/.test(pin)){fields.pin.control.focus();return;}if(again!==pin){fields.confirm.control.focus();return;}
 TurboStoryContext.navigate('../member-profile/index.html?member=neha&upi=active&done=upi');
};
// Local prototype only; no PIN is stored.

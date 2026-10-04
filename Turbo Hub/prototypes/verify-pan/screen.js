// Verify PAN: the first of two steps that activate UPI. Asked once, from the UPI row on Neha's profile.
const H=TurboUI;
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Verify PAN',variant:'icons-only',left:{label:'Back to profile',icon:'navigation-back',href:'../member-profile/index.html?member=neha'}}));
document.getElementById('heading').append(H.pageHeader({heading:'Verify your PAN',subtext:'Needed once to activate UPI. Step 1 of 2.'}));
const form=document.getElementById('form'),fields={};
for(const [id,label,value] of [['pan','PAN','BXKPS4821L'],['name','Name as on PAN','Neha Sharma'],['dob','Date of birth','14/08/2007']]){
 fields[id]=H.field({id,label,value,onInput:()=>fields[id].setError('')});form.append(fields[id]);
}
fields.pan.control.autocapitalize='characters';fields.pan.control.maxLength=10;fields.dob.control.inputMode='numeric';
const consent=H.check({id:'pan-consent',label:'I allow HDFC Bank to verify my PAN with the Income Tax Department.',onChange:()=>consent.setError('')});
form.append(consent,H.button({label:'Verify PAN',type:'submit'}));
form.onsubmit=event=>{
 event.preventDefault();let first=null;
 const checks={pan:/^[A-Z]{5}\d{4}[A-Z]$/.test(fields.pan.control.value.trim().toUpperCase())?'':'Enter a valid 10-character PAN.',name:fields.name.control.value.trim()?'':'Enter your name as on PAN.',dob:/^\d{2}\/\d{2}\/\d{4}$/.test(fields.dob.control.value.trim())?'':'Use DD/MM/YYYY.'};
 for(const [id,error] of Object.entries(checks)){fields[id].setError(error);if(error&&!first)first=fields[id].control;}
 consent.setError(consent.control.checked?'':'Allow the check to continue.');if(!first&&!consent.control.checked)first=consent.control;
 if(first){first.focus();return;}
 TurboStoryContext.navigate('../upi-pin/index.html');
};
// Local prototype only; no PAN is verified.

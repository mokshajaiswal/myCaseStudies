let savedLimits={};try{savedLimits=JSON.parse(TurboStoryContext.storage.getItem('turbo-hub-spending-limits'))||{}}catch{}
const params=new URLSearchParams(location.search);
// ?member=neha shows the newly joined member; otherwise Kavya. UPI starts pending for Neha until PAN and UPI PIN
// are done (?upi=active). ?saved=true means the card's delivery address has been added.
const memberKey=params.get('member')==='neha'?'neha':'kavya';
const people={
 kavya:{name:'Kavya Sharma',type:'Wife · Manager',limit:savedLimits.kavya??45000,card:'XXXX 9700',upi:'kavya@pz'},
 neha:{name:'Neha Sharma',type:'Daughter · Member',limit:savedLimits.neha??5000,card:'XXXX 4821',upi:'neha@pz'}
};
const person=people[memberKey],first=person.name.split(' ')[0];
const saved=params.get('saved')==='true',upiActive=memberKey==='kavya'||params.get('upi')==='active';
// Carry who and how far along through the card-delivery screens and back.
const state=new URLSearchParams();if(memberKey==='neha'){state.set('member','neha');if(upiActive)state.set('upi','active');}
const withState=(path,extra={})=>{const q=new URLSearchParams(state);for(const [k,v] of Object.entries(extra))q.set(k,v);const s=q.toString();return path+(s?'?'+s:'');};
document.body.dataset.reference=memberKey==='neha'?(saved&&upiActive?'neha-ready':upiActive?'neha-upi-active':'neha-profile'):(saved?'address-saved':'member-profile');
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('nav').append(TurboUI.navigation({title:'',left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'},right:{label:'Profile options',icon:'more',onClick:()=>{}}}));
// Same hero treatment as Hub Details: identity and the glass Monthly Limit on the blue chrome; methods on the sheet.
document.getElementById('hero').append(TurboUI.summary({name:person.name,type:person.type,variant:'centered',tone:'chrome',person:person.name}),TurboUI.limit({spent:0,limit:person.limit,label:'Monthly Limit',variant:'circular',tone:'glass'}));
// Shared payment-method rows preserve identifiers, pending status and destination state.
document.getElementById('methods').append(
 TurboUI.paymentMethod({id:'card-row',name:'Card',detail:person.card,graphic:'card-fill',href:withState('../delivery-details/index.html',saved?{return:'saved'}:{}),status:saved?'':'Details needed',label:saved?`Card ${person.card}, edit delivery address`:`Card ${person.card}, add delivery details`}),
 TurboUI.paymentMethod({id:'upi-row',name:'UPI',detail:person.upi,graphic:'upi-fill',href:upiActive?null:'../verify-pan/index.html',status:upiActive?'':'Verify PAN',label:upiActive?`UPI ${person.upi}, active`:`UPI ${person.upi}, verify PAN to activate`})
);
// Neha arrives here straight from Set UPI PIN: confirm activation once.
if(params.get('done')==='upi'){const host=document.getElementById('feedback');host.append(TurboUI.notice({message:'UPI is active. You can pay now, '+first+'.',onDismiss:()=>host.replaceChildren()}));}
// Saving an address does not activate a physical card or initiate card delivery.

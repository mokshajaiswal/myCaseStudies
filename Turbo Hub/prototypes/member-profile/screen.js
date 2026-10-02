let savedLimits={};try{savedLimits=JSON.parse(sessionStorage.getItem('turbo-hub-spending-limits'))||{}}catch{}
const saved=new URLSearchParams(location.search).get('saved')==='true';
document.body.dataset.reference=saved?'address-saved':'member-profile';
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('nav').append(TurboUI.navigation({title:'Profile',left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
document.getElementById('identity').prepend(TurboUI.avatar({name:'Kavya Sharma',size:'profile'}));
document.getElementById('options').append(TurboUI.button({label:'Profile options',icon:'more',iconOnly:true,quiet:true,onClick:()=>{}}));
document.getElementById('limit').append(TurboUI.limit({spent:0,limit:savedLimits.kavya??45000,label:'Monthly Limit',variant:'circular'}));
document.getElementById('card-avatar').append(TurboUI.avatar({name:'Card'}));
document.getElementById('upi-avatar').append(TurboUI.avatar({name:'UPI'}));
const status=document.getElementById('card-status');status.textContent=saved?'Delivery details added':'Pending Action';status.classList.toggle('is-pending',!saved);
document.getElementById('delivery-action').append(TurboUI.button({label:saved?'Edit address':'+ Delivery Details',quiet:true,size:'compact',href:'../delivery-details/index.html'+(saved?'?return=saved':'')}));
if(saved){const host=document.getElementById('feedback');const notice=TurboUI.notice({message:'Address added successfully',onDismiss:()=>{host.replaceChildren();}});host.append(notice);}
// Saving an address does not activate a physical card or initiate card delivery.


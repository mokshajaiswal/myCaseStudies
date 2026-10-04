// Delivery confirmed: closes the card-delivery flow with a celebration, when the card arrives and the address it goes to.
let draft={};try{draft=JSON.parse(TurboStoryContext.storage.getItem('turbo-demo-delivery-draft'))||{}}catch{}
const line1=(draft.line1||'').trim()||'12, Garden Apartments';
const locality=[(draft.city||'').trim()||'Bengaluru',(draft.pincode||'').trim()||'560001'].join(' · ');
// A week from today, the courier estimate this demo promises.
const arrival=new Date(Date.now()+7*864e5).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});

document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('symbol').append(TurboUI.successIndicator({tone:'action',animated:true}));
const copy=document.getElementById('result-copy'),date=document.createElement('strong');date.textContent=arrival;
copy.append('Your card will be delivered by ',date,'. Until then, you can use it virtually for payments.');

const address=document.getElementById('address');
address.innerHTML=TurboIcons.render('map-pin',{size:20});
const text=document.createElement('p');const label=document.createElement('span');label.textContent='Delivering to';
const street=document.createElement('span'),town=document.createElement('span');street.textContent=line1;town.textContent=locality;
text.append(label,street,town);address.append(text);

const query=new URLSearchParams(location.search),back=new URLSearchParams();for(const key of ['member','upi'])if(query.get(key))back.set(key,query.get(key));back.set('saved','true');
document.getElementById('actions').append(TurboUI.button({label:'Done',variant:'inverse',href:'../member-profile/index.html?'+back}));
// Local prototype outcome only; no card is ordered or shipped.

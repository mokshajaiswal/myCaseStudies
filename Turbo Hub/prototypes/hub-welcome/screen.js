// First launch after installing from the invite: PayZapp opens straight into the Hub invitation, not a generic intro.
// Figma "About Hub" (406:61169), rebuilt on the DS chrome. Accepting leads to a single number check.
const H=TurboUI;
let limits={};try{limits=JSON.parse(TurboStoryContext.storage.getItem('turbo-hub-spending-limits'))||{}}catch{}
const limit=limits.neha??5000,money=value=>'₹'+value.toLocaleString('en-IN');
document.getElementById('statusbar').append(H.statusbar());

const hero=document.getElementById('hero');
const art=document.createElement('img');art.className='welcome-hero__art';art.src=H.avatarArtwork.home;art.alt='';
const kicker=document.createElement('p');kicker.className='welcome-hero__kicker';kicker.textContent='Arun Sharma has invited you to';
const heading=document.createElement('h1');heading.id='welcome-heading';heading.textContent='The Sharma’s Family Hub';
// The members already in the Hub, as overlapping round faces.
const family=document.createElement('div');family.className='welcome-hero__family';family.setAttribute('aria-label','Members: Arun, Kavya and Rohan');
for(const name of ['Arun Sharma','Kavya Sharma','Rohan Sharma'])family.append(H.avatar({name,size:'stack-large'}));
hero.append(art,kicker,heading,family);

const content=document.getElementById('content');
const title=document.createElement('h2');title.textContent='What you get';
const list=document.createElement('ul');list.className='welcome-offer';
for(const [graphic,name] of [['upi-fill','UPI payments'],['card-fill','A Hub card'],['limit',money(limit)+' monthly limit']]){
 const item=document.createElement('li');const label=document.createElement('span');label.textContent=name;
 item.append(H.avatar({name,graphic}),label);list.append(item);
}
// The terms link is a placeholder in this prototype.
const terms=H.check({id:'welcome-terms',label:'I agree to the',link:{label:'Terms and conditions',href:'#terms',onClick:()=>{}},onChange:()=>terms.setError('')});
const accept=H.button({label:'Accept invite',onClick:()=>{if(!terms.control.checked){terms.setError('Agree to the terms to join the Hub.');terms.control.focus();return;}TurboStoryContext.navigate('../verify-mobile/index.html');}});
const footer=document.createElement('div');footer.className='welcome-footer';footer.append(terms,accept);
content.append(title,list,footer);
// Local prototype only; no account is created.

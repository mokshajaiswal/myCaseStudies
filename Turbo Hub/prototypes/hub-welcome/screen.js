// After PayZapp onboarding, the Hub invitation opens over the PayZapp home.
// Home source: QNc5WWAGgH0PKr3z42BP3N, 12:1799. Acceptance still leads to number verification.
const H=TurboUI;
H.chromeBackdrop({host:document.getElementById('welcome-screen')});
let limits={};try{limits=JSON.parse(TurboStoryContext.storage.getItem('turbo-hub-spending-limits'))||{}}catch{}
const limit=limits.neha??5000,money=value=>'₹'+value.toLocaleString('en-IN');
document.getElementById('statusbar').append(H.statusbar());

const home=document.getElementById('payzapp-home');
const accounts=document.getElementById('home-accounts');
for(const options of [
 {name:'PayZapp Wallet',detail:'₹0',graphicSrc:'assets/home/wallet-logo.svg'},
 {name:'Cashpoints',detail:'0',graphicSrc:'assets/home/cash-icon.svg',actionLabel:'Transfer to Wallet',actionIcon:'flash'}
]){
 const slot=document.createElement('div');slot.className='payzapp-home__account-slot';
 slot.append(H.accountCard({...options,variant:'home',onAction:()=>{}}));accounts.append(slot);
}

const hero=document.getElementById('hero');
const art=document.createElement('div');art.className='welcome-hero__art';art.append(H.avatar({graphic:true,size:'contact-medium'}));
const kicker=document.createElement('p');kicker.className='welcome-hero__kicker';kicker.textContent='Arun Sharma has invited you to';
const heading=document.createElement('h1');heading.id='welcome-heading';heading.textContent='The Sharma’s';
// The members already in the Hub, as overlapping round faces.
const family=document.createElement('div');family.className='welcome-hero__family';family.setAttribute('aria-label','Members: Arun, Kavya and Rohan');
for(const name of ['Arun Sharma','Kavya Sharma','Rohan Sharma']){const slot=document.createElement('span');slot.className='welcome-hero__portrait';slot.append(H.avatar({name,size:'stack'}));family.append(slot);}
hero.append(art,kicker,heading,family);

const content=document.getElementById('content');
const title=document.createElement('h2');title.textContent='What you get';
const benefits=document.createElement('fieldset');benefits.className='welcome-benefits';
const legend=document.createElement('legend');legend.append(title);
const list=document.createElement('ul');list.className='welcome-offer';
for(const [graphic,name] of [['upi-fill','UPI payments'],['card-fill','A Hub card'],['limit',money(limit)+' monthly limit']]){
 const item=document.createElement('li');const label=document.createElement('span');label.textContent=name;
 item.append(H.avatar({name,graphic,size:'merchant'}),label);list.append(item);
}
// The terms link is a placeholder in this prototype.
const terms=document.createElement('p');terms.className='welcome-terms';
terms.append(document.createTextNode('By proceeding, you accept all '),H.button({label:'Terms & Conditions',href:'#terms',variant:'link',onClick:event=>event.preventDefault()}));
const accept=H.button({label:'Accept invite',onClick:()=>TurboStoryContext.navigate('../verify-mobile/index.html')});
const footer=document.createElement('div');footer.className='welcome-footer';footer.id='footer';footer.append(terms,accept);
benefits.append(legend,list);content.append(benefits,footer);

const layer=document.getElementById('invitation-layer');
const modal=document.getElementById('invitation-modal');
const reopenSlot=document.getElementById('invitation-reopen');
const locked=Boolean(window.TurboStoryContext?.embedded&&TurboStoryContext.locked);
let entranceAnimations=[];
const cancelEntrance=()=>{entranceAnimations.forEach(animation=>animation.cancel());entranceAnimations=[];};
function showInvitation(){
 cancelEntrance();modal.style.opacity='1';modal.style.transform='none';layer.style.opacity='1';
}
function resetEntrance(){
 cancelEntrance();modal.style.opacity='0';modal.style.transform='scale(.92)';layer.style.opacity='0';
}
function playEntrance(){
 showInvitation();
 if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||!modal.animate||!layer.animate)return;
 entranceAnimations=[
  modal.animate([{opacity:0,transform:'scale(.92)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:'cubic-bezier(.2,.8,.2,1)'}),
  layer.animate([{opacity:0},{opacity:1}],{duration:280,easing:'ease-out'})
 ];
}
// The flow starts this only after its screen transition has handed off to home.
window.TurboWelcomePlayback={reset:resetEntrance,enter:playEntrance,show:showInvitation,pause:()=>entranceAnimations.forEach(animation=>animation.pause()),resume:()=>entranceAnimations.forEach(animation=>animation.play())};
function setInvitationOpen(open){
 layer.hidden=!open;modal.inert=!open;home.inert=open;reopenSlot.hidden=open;
 if(open){home.setAttribute('aria-hidden','true');if(!locked)playEntrance();else showInvitation();}else{home.removeAttribute('aria-hidden');cancelEntrance();}
 if(!locked)(open?modal:reopen).focus({preventScroll:true});
}
const close=H.button({label:'Close invitation',icon:'close',iconOnly:true,variant:'plain',onClick:()=>setInvitationOpen(false)});
document.getElementById('invitation-close').append(close);
const reopen=H.button({label:'View Hub invitation',onClick:()=>setInvitationOpen(true)});
reopenSlot.append(reopen);
modal.addEventListener('keydown',event=>{
 if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setInvitationOpen(false);return;}
 if(event.key!=='Tab')return;
 const controls=[...modal.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]')].filter(node=>node.tabIndex>=0);
 const first=controls[0],last=controls.at(-1);
 if(!first){event.preventDefault();modal.focus();return;}
 if(event.shiftKey&&(document.activeElement===first||document.activeElement===modal)){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&(document.activeElement===last||document.activeElement===modal)){event.preventDefault();first.focus();}
});
setInvitationOpen(locked||new URLSearchParams(location.search).get('invite')!=='closed');
// Local prototype only; no account is created.

const supplied=Number(new URLSearchParams(location.search).get('amount'));
const amount=Number.isFinite(supplied)&&supplied>=1&&supplied<=1000000?supplied:2500;
const money=value=>'₹'+value.toLocaleString('en-IN');
// The 15-minute window Neha also sees on Request pending; the request is 80s old here.
const requestWindow=900,elapsed=80;
const H=TurboUI,actions=document.getElementById('actions');

document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Payment request',left:{label:'Close payment request',icon:'close',href:'../hub-dashboard/index.html?tab=Spends'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
document.getElementById('identity').append(H.avatar({name:'Neha Sharma',large:true}));
document.getElementById('amount').textContent=money(amount);

const countdown=H.countdown({remaining:requestWindow-elapsed,total:requestWindow,variant:'inline'});
document.getElementById('countdown').append(countdown);

// One outcome replaces both decisions, so the footer never shows controls that no longer apply.
let timer=0,concluded=false;
function conclude(message,next){
  concluded=true;clearInterval(timer);
  const status=document.createElement('p');status.className='request-outcome';status.setAttribute('role','status');status.textContent=message;
  actions.replaceChildren(status,H.button({label:'Back to Hub',href:'../hub-dashboard/index.html?tab=Spends'}));
  if(next){const nav=document.createElement('nav');nav.className='preview-flow-navigation';nav.setAttribute('aria-label','Case-study flow navigation');const a=document.createElement('a');a.textContent=next.label;a.href=next.href;nav.append(a);document.querySelector('.preview-reference')?.append(nav);}
}
const swipe=H.swipeAction({id:'authorize-swipe',label:'Swipe to Authorize',onComplete:()=>{clearInterval(timer);TurboStoryContext.navigate('../authorization-confirmed/index.html?amount='+amount);}});
const decline=H.button({label:'Decline',variant:'danger',onClick:()=>conclude('You declined this request. Neha will see it on her phone.',{label:'Next screen: Member · Request declined',href:'../payment-unapproved/index.html?state=declined&amount='+amount})});
actions.append(decline,swipe);

// The window counts down from a deadline in standalone previews; locked story embeds stay still.
if(!window.TurboStoryContext?.locked){
  const deadline=Date.now()+(requestWindow-elapsed)*1000;
  const tick=()=>{const remaining=Math.max(0,(deadline-Date.now())/1000);countdown.setRemaining(remaining);if(remaining<=0)conclude('This request expired before anyone responded. Neha can send a new one.');};
  timer=setInterval(tick,1000);
  addEventListener('pagehide',()=>clearInterval(timer));
  addEventListener('pageshow',event=>{if(event.persisted&&!concluded){tick();timer=setInterval(tick,1000);}});
}
// Local case-study demonstration only; no real approval or decline is transmitted.

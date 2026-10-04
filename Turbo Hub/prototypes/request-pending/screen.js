const parameters=new URLSearchParams(location.search);
const supplied=Number(parameters.get('amount'));
const amount=Number.isFinite(supplied)&&supplied>=1&&supplied<=1000000?supplied:2500;
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('toolbar').append(TurboUI.button({label:'Close approval request preview',icon:'close',quiet:true,iconOnly:true,href:'../payment-review/index.html?amount='+amount}));
const countdown=TurboUI.countdown({remaining:900,total:900});
document.getElementById('countdown').append(countdown);
// Local prototype time only. Closing the preview does not cancel a real request.
const deadline=Date.now()+900000;
let expired=false;
function tick(){
 const remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));
 countdown.setRemaining(remaining);
 if(!remaining&&!expired){expired=true;clearInterval(interval);document.getElementById('request-heading').textContent='Approval request expired';document.getElementById('outcome').textContent='No approval was received before the request expired.';document.getElementById('recovery').append(TurboUI.button({label:'Back to review',quiet:true,href:'../payment-review/index.html?amount='+amount}));}
}
const frozen=TurboStoryContext.locked;
let interval=frozen?null:setInterval(tick,1000);
window.addEventListener('pagehide',()=>clearInterval(interval));
window.addEventListener('pageshow',event=>{if(!frozen&&event.persisted&&!expired){tick();if(!expired)interval=setInterval(tick,1000);}});
if(!frozen)document.addEventListener('visibilitychange',tick);

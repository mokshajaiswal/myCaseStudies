// Play Store listing: Neha doesn't have PayZapp yet, so the WhatsApp invite link lands here first.
// An external app, drawn in code like the WhatsApp chat: a documented exception to the DS shell.
const icon=(name,size=24)=>TurboIcons.render(name,{size});
document.getElementById('statusbar').append(TurboUI.statusbar({tone:'light'}));
// The shared preview mounts Turbo Hub chrome; this external store keeps its white surface.
addEventListener('DOMContentLoaded',()=>document.querySelector('.store-screen').classList.remove('th-chrome-backdrop'));
const store=document.getElementById('store');
store.innerHTML=`<header class="ps-bar"><a class="ps-icon-button" href="../invitation/index.html" aria-label="Back to WhatsApp">${icon('arrow-left')}</a><span class="ps-bar__brand">Google Play</span><span class="ps-bar__spacer"></span><span class="ps-icon-button" aria-hidden="true">${icon('magnifying-glass')}</span><span class="ps-icon-button" aria-hidden="true">${icon('dots-three-vertical')}</span></header>
<section class="ps-app" aria-labelledby="ps-title">
 <div class="ps-app__head"><img class="ps-app__icon" src="assets/payzapp-icon.png" width="72" height="72" alt=""><div><h1 id="ps-title">PayZapp UPI Wallet, Pixel Card</h1><p class="ps-app__dev">HDFC Bank Limited</p></div></div>
 <dl class="ps-stats"><div><dt>4.4 <span aria-hidden="true">★</span></dt><dd>13.2L reviews</dd></div><div><dt>1Cr+</dt><dd>Downloads</dd></div><div><dt>Everyone</dt><dd>Content rating</dd></div></dl>
 <div class="ps-install" id="install"></div>
 <div class="ps-shots" aria-hidden="true">${Array.from({length:3},()=>'<div class="ps-shot"><span class="ps-skeleton ps-shot__line"></span><span class="ps-skeleton ps-shot__line ps-shot__line--short"></span><div class="ps-shot__phone"><span class="ps-skeleton ps-shot__hero"></span><span class="ps-skeleton"></span><span class="ps-skeleton"></span><span class="ps-skeleton ps-shot__line--short"></span></div></div>').join('')}</div>
 <h2 class="ps-about">About this app <span aria-hidden="true">${icon('arrow-left',20)}</span></h2>
 <p class="ps-desc">UPI payments, a wallet, cards, bill payments and rewards in one app.</p>
 <span class="ps-category">Finance</span>
 <h2 class="ps-about">Data safety <span aria-hidden="true">${icon('arrow-left',20)}</span></h2>
 <div class="ps-details-skeleton" aria-hidden="true"><span class="ps-skeleton"></span><span class="ps-skeleton"></span><span class="ps-skeleton ps-shot__line--short"></span></div>
</section>`;
const install=document.getElementById('install');
// Install → a short progress → Open, which launches PayZapp straight into the invitation.
const idle=()=>{const b=document.createElement('button');b.type='button';b.className='ps-button';b.textContent='Install';b.onclick=progress;install.replaceChildren(b);};
const progress=()=>{if(window.TurboStoryContext?.locked)return;install.innerHTML='<div class="ps-progress" role="progressbar" aria-label="Installing PayZapp"><span></span></div><p class="ps-progress__label" role="status">Installing…</p>';setTimeout(ready,1600);};
const ready=()=>{const a=document.createElement('a');a.className='ps-button';a.textContent='Open';a.href='../hub-welcome/index.html';install.replaceChildren(a);};
idle();
// Visual adapter for the locked story only. The editorial queue owns progress and
// timing; no native click, install timer or iframe navigation is triggered.
if(window.TurboStoryContext?.embedded&&window.TurboStoryContext.locked){
  install.setPlaybackState=(state,value=0)=>{
    if(state==='idle')idle();
    else if(state==='ready')ready();
    else if(state==='progress'){
      const percent=Math.max(0,Math.min(100,Number(value)||0));
      install.innerHTML=`<div class="ps-progress ps-progress--story" role="progressbar" aria-label="Installing PayZapp" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div><p class="ps-progress__label" role="status">Installing… ${percent}%</p>`;
    }else throw new Error('Unknown Play Store playback state');
  };
}
// Local prototype only; nothing is installed.

// Play Store listing: Neha doesn't have PayZapp yet, so the WhatsApp invite link lands here first.
// An external app, drawn in code like the WhatsApp chat: a documented exception to the DS shell.
const svg=(d,size=24)=>`<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
document.getElementById('statusbar').append(TurboUI.statusbar({tone:'light'}));
const store=document.getElementById('store');
store.innerHTML=`<header class="ps-bar"><a class="ps-icon-button" href="../invitation/index.html" aria-label="Back to WhatsApp">${svg('<path d="M19 12H5M11 6l-6 6 6 6"/>')}</a><span class="ps-bar__spacer"></span><span class="ps-icon-button" aria-hidden="true">${svg('<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>')}</span><span class="ps-icon-button" aria-hidden="true">${svg('<circle cx="12" cy="5.5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="18.5" r="1"/>')}</span></header>
<section class="ps-app" aria-labelledby="ps-title">
 <div class="ps-app__head"><span class="ps-app__icon" aria-hidden="true">Pay<b>Z</b></span><div><h1 id="ps-title">PayZapp</h1><p class="ps-app__dev">HDFC Bank Ltd.</p><p class="ps-app__meta">Contains in-app payments</p></div></div>
 <dl class="ps-stats"><div><dt>4.4 ★</dt><dd>2 Cr reviews</dd></div><div><dt>5 Cr+</dt><dd>Downloads</dd></div><div><dt>3+</dt><dd>Rated for 3+</dd></div></dl>
 <div class="ps-install" id="install"></div>
 <div class="ps-shots" aria-hidden="true"><span></span><span></span><span></span></div>
 <h2 class="ps-about">About this app ${svg('<path d="M5 12h14M13 6l6 6-6 6"/>',20)}</h2>
 <p class="ps-desc">Pay with UPI, cards and family Hubs. Shop, recharge and split bills, all with HDFC Bank security.</p>
</section>`;
const install=document.getElementById('install');
// Install → a short progress → Open, which launches PayZapp straight into the invitation.
const idle=()=>{const b=document.createElement('button');b.type='button';b.className='ps-button';b.textContent='Install';b.onclick=progress;install.replaceChildren(b);};
const progress=()=>{install.innerHTML='<div class="ps-progress" role="progressbar" aria-label="Installing PayZapp"><span></span></div><p class="ps-progress__label" role="status">Installing…</p>';setTimeout(ready,1600);};
const ready=()=>{const a=document.createElement('a');a.className='ps-button';a.textContent='Open';a.href='../hub-welcome/index.html';install.replaceChildren(a);};
idle();
// Local prototype only; nothing is installed.

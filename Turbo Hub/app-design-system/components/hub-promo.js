(() => {
  const H=TurboUI;
  const artwork=new URL('../../assets/hub-promo/family-wallet.png',document.currentScript.src).href;
  const familyArtwork=new URL('../../assets/hub-promo/family-shared-fund-3d.png',document.currentScript.src).href;
  const el=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text)e.textContent=text;return e;};
  H.hubPromo=({href,title='Turbo Hub',intro='Introducing',description='A new way to share money with family.',label='Open Turbo Hub',variant='v1'}={})=>{
    const version=variant==='v2'?'v2':'v1';
    const card=el('a','th-hub-promo th-hub-promo--'+version);card.href=href;card.dataset.inspectorVariant=version;card.setAttribute('aria-label',label);
    const copy=el('div','th-hub-promo__copy');
    if(intro)copy.append(el('p','th-hub-promo__intro',intro));
    copy.append(el('h2','th-hub-promo__title',title));
    if(description)copy.append(el('p','th-hub-promo__description',description));
    const visual=el('img','th-hub-promo__art');visual.alt='';visual.width=104;visual.height=104;visual.decoding='async';
    visual.addEventListener('error',()=>visual.remove(),{once:true});visual.src=version==='v2'?familyArtwork:artwork;
    card.append(copy,visual);
    return card;
  };
})();

/* Loads the Turbo Hub design system from wherever it is served, so prototypes work both in the DS studio
   (which serves app-design-system only at /design-system/) and from any plain static server or Live Server
   (where it sits at ../../app-design-system/). One quick synchronous check, then the tags are written in order.
   Usage: <script src="../shared/ds.js" data-assets="tokens.css components.css components/hub.js ..."></script> */
(() => {
  const me=document.currentScript,local=new URL('../../app-design-system/',me.src);
  let base='/design-system/';
  if(location.protocol==='file:')base=local.href;
  else try{const probe=new XMLHttpRequest();probe.open('HEAD',new URL('tokens.css',local),false);probe.send();if(probe.status===200)base=local.href;}catch{}
  window.TurboDesignSystemBase=base;
  for(const asset of (me.dataset.assets||'').split(/\s+/).filter(Boolean)){
    const url=new URL(asset,new URL(base,location.href)).href;
    document.write(asset.endsWith('.css')?`<link rel="stylesheet" href="${url}">`:`<script src="${url}" defer><\/script>`);
  }
})();

// Shared preview geometry and Figma source comparison; not product UI.
(() => {
  // Inspection is available on standalone previews, not overview thumbnails.
  if (window.top === window.self) window.dsInspectorConfig = {...window.dsInspectorConfig, keyboardActivation:true};
  TurboUI.chromeBackdrop({host:document.querySelector('.phone-screen')});
  const viewport=document.querySelector('.phone-viewport');
  const fit=()=>viewport.style.setProperty('--screen-scale',viewport.getBoundingClientRect().width/390);
  fit();new ResizeObserver(fit).observe(viewport);
  const assets={
    invitation:['419:29279','Invitation · WhatsApp source'],
    'tag-added':['436:58199','Hub Members · Tag added'],
    'tag-scanner':['411:56192','Scan tag QR'],
    'accounts-cards':['397:48986','Accounts & Cards'],
    'hub-intro':['397:47894','Introduction'],
    'hub-intro-family':['397:47996','The Family Hub'],
    'hub-intro-office':['397:48053','The Office Hub'],
    'hub-intro-events':['397:48112','Hub for Events'],
    'hub-intro-more':['397:47938','More Hubs'],
    'scan-qr':['436:65155','Scan QR'],
    'payment-notification':['436:66403','Manager payment notification'],
    hubs:['515:76029','Hubs'],
    'hub-type':['397:49240','Choose a Hub type'],
    'hub-setup':['397:49288','Name & source account'],
    'hub-created':['397:49311','Hub created'],
    spends:['402:51668','Hub Details · Spends'],
    members:['402:51353','Hub Details · Members'],
    analytics:['402:51722','Hub Details · Analytics'],
    'member-details':['402:50472','Member details'],
    'payment-methods':['402:50163','Payment methods'],
    'payment-review':['436:64799','Review payment'],
    'request-pending':['436:65448','Request pending'],
    'authorization-confirmed':['436:65736','Authorization confirmed'],
    'payment-authorize':['436:64799','Review & authorize'],
    'payment-processing':['436:65284','Payment processing'],
    'payment-receipt':['436:65113','Payment receipt'],
    'member-profile':['559:55687','Member profile · Pending action'],
    'delivery-details':['409:63158','Delivery Details'],
    'address-saved':['409:62894','Member profile · Address saved']
  };
  const phone=document.querySelector('.phone'),layout=document.createElement('div');layout.className='preview-comparison';phone.before(layout);layout.append(phone);
  const figure=document.createElement('figure');figure.className='preview-reference';const caption=document.createElement('figcaption'),title=document.createElement('span'),link=document.createElement('a');link.textContent='Original';link.target='_blank';link.rel='noopener';caption.append(title,link);const stage=document.createElement('div');stage.className='preview-reference__image';stage.setAttribute('tabindex','0');stage.setAttribute('aria-label','Scrollable source reference');const crop=document.createElement('div');crop.className='preview-reference__crop';const img=document.createElement('img');crop.append(img);stage.append(crop);figure.append(caption,stage);layout.append(figure);
  function update(){const key=document.body.dataset.reference,asset=assets[key];if(!asset)return;const [id,label]=asset;img.src='../shared/references/figma/'+key+'.png';img.alt='Figma reference · '+label;title.textContent=label+' · Figma';link.textContent='Open in Figma';link.href='https://www.figma.com/design/IJU02E1n5jSddJqd3SpkG7/Turbo-Hub?node-id='+id.replace(':','-');img.classList.remove('is-composite');img.style.setProperty('--reference-offset','0%');stage.scrollTop=0;}
  update();
  if(document.body.dataset.reference==='pixel-tag'){
    img.src='../../flow-reference/source/L9fO641kjt3My4tVM92GN606kQ0.png';img.alt='Pixel Tag choices · original flow reference';
    img.style.width=(3155/810*100)+'%';img.style.position='relative';img.style.left='0';
    title.textContent='Link or buy · source flow';link.textContent='Open in Figma';link.href='https://www.figma.com/design/IJU02E1n5jSddJqd3SpkG7/Turbo-Hub?node-id=411-56117';
  }
  if(document.body.dataset.reference==='payment-authorize'){
    img.src='../../flow-reference/source/Y16WMsQBYYXK4i16Uq3PzRaQUDs.png';
    img.alt='Manager authorization · original flow reference';
    img.style.width=(3301/810*100)+'%';img.style.position='relative';img.style.left=(-1245.5/810*100)+'%';
    title.textContent='Review & authorize · source flow';link.textContent='Open source';link.href=img.src;
  }
  new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['data-reference']});
  const next={'tag-scanner':['tag-added','Manager · Tag added (simulated scan)'],'scan-qr':['payment-review','Member · Review Nykaa payment'],'request-pending':['payment-notification','Manager · Notification'],'authorization-confirmed':['payment-processing','Member · Processing'],'payment-processing':['payment-receipt','Member · Receipt']};
  if(next[document.body.dataset.reference]){
    const [route,label]=next[document.body.dataset.reference],nav=document.createElement('nav'),a=document.createElement('a');
    nav.setAttribute('aria-label','Case-study flow navigation');nav.className='preview-flow-navigation';
    a.textContent='Next screen: '+label;a.href='../'+route+'/index.html';
    const amount=new URLSearchParams(location.search).get('amount');if(amount)a.search=new URLSearchParams({amount});
    nav.append(a);figure.append(nav);
  }
})();

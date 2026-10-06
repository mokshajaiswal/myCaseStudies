const params=new URLSearchParams(location.search);document.body.dataset.gallery=params.get('gallery')==='1';
const main=document.getElementById('preview'),target=params.get('target'),state=params.get('state')||'live';
const examples=[['v1','Version 1 · Glossy',{variant:'v1'}],['v2','Version 2 · Light',{variant:'v2'}],['minimal','Title only',{intro:'',description:''}],['without-intro','Without introduction',{intro:''}],['long','Long content',{title:'Bring your family together with Turbo Hub',description:'Set shared spending boundaries while giving each family member their own way to pay.'}]];
for(const [id,label,options] of examples){
 if(target&&target!==id)continue;
 const box=document.createElement('section');box.className='example';box.id=id;
 const caption=document.createElement('p');caption.className='label';caption.textContent=label;
 const card=TurboUI.hubPromo({href:'/app/prototypes/onboarding/index.html',variant:'v2',...options});card.dataset.previewState=state;
 box.append(caption,card);main.append(box);
}

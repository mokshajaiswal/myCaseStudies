(() => {
const H=TurboUI;
const node=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text!==undefined)e.textContent=text;return e;};
H.accountAction=({label='Add Money',iconOnly=false,disabled=false,onClick=()=>{}}={})=>{
 const button=node('button','th-account-action'+(iconOnly?' th-account-action--icon':''));button.type='button';button.disabled=disabled;button.dataset.inspectorVariant=iconOnly?'icon':'label';
 if(iconOnly)button.setAttribute('aria-label',label);
 const plus=node('span','th-account-action__icon');plus.setAttribute('aria-hidden','true');plus.innerHTML=TurboIcons.render('plus',{size:20});button.append(plus);
 if(!iconOnly)button.append(document.createTextNode(label));button.addEventListener('click',onClick);return button;
};
H.accountCard=({name,detail='',icon='wallet',variant='summary',cards=[],actionLabel='Add Money',disabled=false,onAction=()=>{}})=>{
 const card=node('section','th-account-card'+(variant==='summary'?' th-account-card--summary-only':''));card.dataset.inspectorVariant=variant;card.setAttribute('aria-label',name);
 const summary=node('div','th-account-card__summary'),body=node('div','th-account-card__balance');body.append(node('h2','',name));if(detail)body.append(node('p','',detail));
 const graphic=node('span','th-account-card__icon');graphic.setAttribute('aria-hidden','true');graphic.innerHTML=TurboIcons.render(icon,{size:32});summary.append(body,graphic);card.append(summary);
 if(variant==='wallet')card.append(H.accountAction({label:actionLabel,disabled,onClick:onAction}));
 if(variant==='linked'){
  const strip=node('div','th-account-cards');strip.setAttribute('aria-label','Linked bank cards');strip.tabIndex=0;
  strip.append(H.accountAction({label:'Add card',iconOnly:true,disabled,onClick:onAction}));
  for(const {name:bank,detail:digits='',initial=bank.slice(0,1),logo=null} of cards){const chip=node('span','th-account-cards__chip'),mark=node('span','th-account-cards__bank',initial);mark.setAttribute('aria-hidden','true');if(logo){const image=node('img','th-account-cards__logo');image.src=logo;image.alt='';image.width=24;image.height=24;image.addEventListener('error',()=>{mark.classList.remove('th-account-cards__bank--logo');mark.replaceChildren(document.createTextNode(initial));},{once:true});mark.classList.add('th-account-cards__bank--logo');mark.replaceChildren(image);}chip.append(mark,document.createTextNode(bank+(digits?' · '+digits:'')));strip.append(chip);}card.append(strip);
 }return card;
};
})();

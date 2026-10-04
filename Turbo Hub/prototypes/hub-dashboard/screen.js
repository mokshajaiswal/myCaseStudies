const H=TurboUI;let active=new URLSearchParams(location.search).get('tab')||'Spends';if(!['Spends','Members','Analytics'].includes(active))active='Spends';
document.getElementById('statusbar').append(H.statusbar());
const navBar=title=>H.navigation({title,left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'},right:{label:'Hub options',icon:'more',onClick:()=>{}}});
document.getElementById('nav').append(navBar(''));

let savedLimits={};try{savedLimits=JSON.parse(TurboStoryContext.storage.getItem('turbo-hub-spending-limits'))||{}}catch{}
// Sample spends, each with the family member who paid.
const transactions=[['Amazon','04 Dec 2023, 10:00 PM',1595,'Arun'],['BESCOM','03 Dec 2023, 01:25 AM',710,'Kavya'],['INOX Leisure Ltd','01 Dec 2023, 07:00 PM',350,'Rohan'],['Swiggy','28 Nov 2023, 11:42 AM',1200,'Neha'],['Nykaa','27 Nov 2023, 01:45 PM',2400,'Neha'],['Amazon','25 Nov 2023, 07:00 PM',450,'Kavya'],['Big Basket','22 Nov 2023, 10:00 PM',400,'Kavya'],['Gupta Stores','22 Nov 2023, 10:00 PM',3200,'Arun']];
const merchantImages={'Amazon':'amazon.ico','BESCOM':'bescom-framed.svg','INOX Leisure Ltd':'cinema.svg','Swiggy':'swiggy.png','Nykaa':'nykaa.png','Big Basket':'bigbasket.jpg','Gupta Stores':'shop.svg'};
const E=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text)e.textContent=text;return e};
function rows(items){const box=E('div','row-list');items.forEach(([name,detail,amount])=>box.append(H.row({name,detail,amount})));return box}
function section(title,content){const s=E('section','panel-section');s.append(E('h2','section-heading',title),content);return s}
function hubArtwork(){const artwork=E('div','hub-artwork');artwork.setAttribute('aria-hidden','true');const words=E('img','hub-artwork__words');words.src='assets/manage-spends-together.svg';words.alt='';words.width=342;words.height=136;const lock=E('span','hub-artwork__lock');lock.append(E('span','hub-artwork__keyhole'));artwork.append(words,lock);return artwork}
// ?roster= stages the Members list for the story: owner (Arun only), parents (Kavya joined),
// children-invited (Neha and Rohan yet to join), all-invited (Kavya and both children yet to join) and family (everyone joined). Default keeps Kavya pending plus stored invites.
function membersRoster(stageOverride){let invites=[];try{invites=JSON.parse(TurboStoryContext.storage.getItem('turbo-hub-members'))||[]}catch{}
const stage=stageOverride||new URLSearchParams(location.search).get('roster'),arun={name:'Arun Sharma',role:'Manager',spent:0,limit:savedLimits.arun??45000},kavya=stage&&stage!=='invited'?{name:'Kavya Sharma',role:'Manager',relation:'Wife',spent:1200,limit:savedLimits.kavya??45000}:{name:'Kavya Sharma',role:'Manager',relation:'Wife',pending:true};
const children=pending=>[{name:'Neha Sharma',relation:'Daughter',pending,spent:pending?0:500,limit:savedLimits.neha??5000},{name:'Rohan Sharma',relation:'Son',pending,spent:pending?0:2400,limit:savedLimits.rohan??10000}];
const roster=stage==='owner'?[arun]:stage==='invited'?[arun,kavya]:stage==='parents'?[arun,kavya]:stage==='children-invited'?[arun,kavya,...children(true)]:stage==='all-invited'?[arun,{name:'Kavya Sharma',role:'Manager',relation:'Wife',pending:true},...children(true)]:stage==='family'?[arun,kavya,...children(false)]:[arun,kavya,...invites];return roster;}
// Hero subtext: joined members, plus invitations still awaiting a response (e.g. "2 members · 2 awaiting").
function rosterSummary(roster){const awaiting=roster.filter(m=>m.pending).length,joined=roster.length-awaiting;return joined+(joined===1?' member':' members')+(awaiting?' · '+awaiting+' awaiting':'');}
// ?state=new: the Hub just created (Figma 397:49311). Same hero (identity, no tabs yet) plus a sheet; the hero
// offers a setup widget for the Hub's monthly limit and prompts inviting members (registered list Action).
const freshHub=new URLSearchParams(location.search).get('state')==='new';
function renderFresh(){
  document.body.dataset.reference='hub-created';
  document.getElementById('overview').replaceChildren(H.summary({variant:'centered',tone:'chrome',type:rosterSummary(membersRoster('owner'))}),H.limit({label:'Monthly Limit',variant:'setup',tone:'glass',action:{label:'Set up the Hub’s monthly limit',icon:'limit',href:'../spending-limit/index.html'}}));
  const tabs=document.getElementById('tabs');tabs.hidden=true;tabs.replaceChildren();
  const panel=document.getElementById('hub-panel');panel.removeAttribute('role');panel.setAttribute('aria-label','Get started');
  const intro=E('p','created-intro','Let’s add your family to the Hub.');
  const actions=E('div','created-actions');actions.append(H.button({label:'Invite Member',icon:'invite',variant:'list',href:'../add-member/index.html'}));
  panel.replaceChildren(intro,actions);
}
function render(){// Hub identity and the Monthly Limit (glass) sit on the blue header; the white sheet starts at the tabs.
document.getElementById('overview').replaceChildren(H.summary({variant:'centered',tone:'chrome',type:rosterSummary(membersRoster())}),H.limit({spent:active==='Members'?0:14500,limit:savedLimits.hub??100000,label:'Monthly Limit',variant:'circular',tone:'glass'}));document.body.dataset.reference=active==='Members'?'members':active==='Analytics'?'analytics':'spends';const tabs=document.getElementById('tabs');tabs.replaceChildren(H.tabs({items:['Spends','Members','Analytics'],selected:active,tone:'chrome',onChange:value=>{active=value;render();document.querySelector('.phone-content').scrollTop=0;history.replaceState(null,'','?tab='+active)}}));const panel=document.getElementById('hub-panel');panel.setAttribute('aria-labelledby','hub-tab-'+['Spends','Members','Analytics'].indexOf(active));panel.replaceChildren();
if(active==='Spends'){const list=E('div','transaction-list');list.setAttribute('aria-label','Recent transactions');transactions.forEach(([name,detail,amount,by])=>list.append(H.row({name,detail,amount,by,variant:'compact',avatarSrc:'assets/merchants/'+merchantImages[name]})));panel.append(list);const footer=E('div','full-action');footer.append(H.button({label:'Show all transactions',onClick:()=>{}}));panel.append(footer)}
if(active==='Members'){const roster=membersRoster();const top=E('div','section-top');top.append(E('h2','section-heading',roster.length+(roster.length===1?' member':' members')),H.button({label:'Add',icon:'caret-down',iconPosition:'end',size:'compact',quiet:true,href:'../add-member/index.html'}));const members=E('div','member-list');roster.forEach(member=>members.append(H.member({...member,variant:'profile',chevron:true})));panel.append(top,members)}
if(active==='Analytics'){panel.append(H.chart({}));const spenders=E('div','spenders');[['Arun',20000],['Kavya',43000],['Neha',1200]].forEach(([name,value])=>{const s=E('div','spender');s.append(H.avatar({name}),E('span','',name),E('strong','','₹'+value.toLocaleString('en-IN')));spenders.append(s)});panel.append(section('Top spenders',spenders),section('Top categories',rows([['Essentials','10% of total spends',2320],['Shopping','35% of total spends',1350],['Bills & recharges','20% of total spends',710]])),section('Most used payment methods',rows([['HDFC Credit Card','XXXX 9132',10580],['ICICI Debit Card','XXXX 4281',4750],['UPI','Family Hub',2350]])))}
// Hub watermark ("Manage spends together") hidden for now; hubArtwork() is kept for when it returns.
}if(freshHub)renderFresh();else render();

// Collapsing title: the navigation starts untitled; once the Hub name scrolls past the top of the
// content, the title becomes the Hub name (re-rendered through the registered Navigation).
const scroller=document.querySelector('.phone-content'),chromeBar=document.querySelector('.phone-chrome');let navTitle='';
// The chrome floats over the scroller, so content passes beneath the nav. --chrome-h pads the scroller and docks the tabs.
const chromeBlur=document.createElement('div');chromeBlur.className='chrome-blur';chromeBlur.setAttribute('aria-hidden','true');for(let i=0;i<6;i++)chromeBlur.append(document.createElement('span'));chromeBar.prepend(chromeBlur);
const chromeH=()=>chromeBar.offsetHeight;const measureChrome=()=>{scroller.parentElement.style.setProperty('--chrome-h',chromeH()+'px');scroller.parentElement.style.setProperty('--tabs-h',(document.getElementById('tabs')?.offsetHeight||64)+'px');};measureChrome();
const syncTitle=()=>{const fScale=chromeBar.getBoundingClientRect().height/(chromeBar.offsetHeight||1);const top=scroller.getBoundingClientRect().top+chromeBar.getBoundingClientRect().height,tabs=document.getElementById('tabs');
  // While the hero passes under the nav it fades out behind it; once the tabs dock at the nav's edge, a rounded clip takes over.
  // Content slides under the chrome, which paints its own copy of the backdrop. Once the tabs dock at its edge,
  // a rounded clip keeps their 24px corners clean.
  // Each hero block fades by how much of it is still visible below the chrome edge: fully shown until a quarter has
  // slid under (already softened by the blur), then fading, gone once about 85% is under. No early empty gaps.
  document.querySelectorAll('.overview > *').forEach(block=>{const r=block.getBoundingClientRect(),visible=(r.bottom-top)/r.height;block.style.opacity=scroller.scrollTop>0?Math.min(1,Math.max(0,(visible-.15)/.6)).toFixed(3):'';});
  // No blur once the tabs are within reach, so their rounded top stays crisp.
  const tabsTop=tabs.hidden?Infinity:tabs.getBoundingClientRect().top,docked=tabsTop<=top+1;scroller.classList.toggle('is-docked',docked);scroller.classList.toggle('is-feathered',scroller.scrollTop>0&&tabsTop>top+22*fScale);
  const name=document.querySelector('.th-hub-summary h1');if(!name)return;// The progressive blur softens the name just before the hard edge, so switch once it is inside the blur.
  const scale=chromeBar.getBoundingClientRect().height/(chromeBar.offsetHeight||1),title=name.getBoundingClientRect().bottom<=top+16*scale?name.textContent:'';if(title===navTitle)return;navTitle=title;document.getElementById('nav').replaceChildren(navBar(title));};
scroller.addEventListener('scroll',syncTitle,{passive:true});
// Showcasing a member state (story embeds or a staged ?roster=): open scrolled to 12px above the tabs
// (inside the empty gap below the limit card) so the members list fills the screen with room to breathe. The panel is given enough height for the tabs to reach the top.
if(active==='Members'&&(window.TurboStoryContext?.embedded||new URLSearchParams(location.search).has('roster'))){
  const showMembers=()=>{scroller.scrollTop=0;const tabs=document.getElementById('tabs'),panel=document.getElementById('hub-panel');const breathing=12;measureChrome();panel.style.minHeight=Math.max(0,scroller.clientHeight-chromeH()-tabs.offsetHeight-breathing)+'px';scroller.scrollTop=tabs.offsetTop-scroller.offsetTop-chromeH()-breathing;syncTitle();};
  requestAnimationFrame(showMembers);addEventListener('load',showMembers);
}

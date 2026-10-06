const params=new URLSearchParams(location.search);document.body.dataset.gallery=params.get('gallery')==='1';
const main=document.getElementById('preview'),kind=params.get('component'),target=params.get('target'),state=params.get('state')||'live';
const feedback=document.createElement('p');feedback.setAttribute('role','status');
function add(id,label,element){const box=document.createElement('section');box.className='example';box.id=id;const caption=document.createElement('p');caption.className='label';caption.textContent=label;box.append(caption,element);main.append(box);}
const onAction=()=>feedback.textContent='Action activated';
if(kind==='action'){
 for(const [id,label,options] of [['label','Add money',{}],['icon','Add card',{iconOnly:true}]]){if(target&&target!==id)continue;const control=TurboUI.accountAction({label:options.iconOnly?'Add card':'Add Money',...options,disabled:state==='disabled',onClick:onAction});control.dataset.previewState=state;add(id,label,control);}
}else{
 add('summary','Summary',TurboUI.accountCard({name:'UPI Accounts',detail:'7667376343@pz',icon:'bank'}));
 add('wallet','Wallet',TurboUI.accountCard({name:'PayZapp Wallet',detail:'₹0',variant:'wallet',onAction}));
 add('linked','Linked cards',TurboUI.accountCard({name:'Linked Cards',detail:'7 cards linked',icon:'card',variant:'linked',cards:[{name:'ICICI',detail:'8179',logo:'../../assets/bank-logos/icici.png'},{name:'PNB',detail:'4122',logo:'../../assets/bank-logos/pnb.ico'},{name:'Bank of Baroda',logo:'../../assets/bank-logos/bank-of-baroda.png'}],onAction}));
 add('minimal','Without detail',TurboUI.accountCard({name:'UPI Accounts',icon:'bank'}));
 add('empty','No linked cards',TurboUI.accountCard({name:'Linked Cards',detail:'No cards linked',icon:'card',variant:'linked',onAction}));
 add('long','Long account name',TurboUI.accountCard({name:'Family household spending account',detail:'family.household@bank',icon:'bank'}));
}main.append(feedback);

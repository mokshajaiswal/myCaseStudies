const supplied=Number(new URLSearchParams(location.search).get('amount'));
const amount=Number.isFinite(supplied)&&supplied>=1&&supplied<=1000000?supplied:2500;
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('nav').append(TurboUI.navigation({title:'',left:{label:'Close receipt',icon:'close',href:'../hub-dashboard/index.html?tab=Spends'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
document.getElementById('symbol').append(TurboUI.successIndicator());
document.getElementById('amount').textContent='₹'+amount.toLocaleString('en-IN');
document.getElementById('transaction').append(TurboUI.row({name:'Nykaa Phoenix Mall',detail:'Transaction ID-037374621513913'}));
const details=document.getElementById('details');
const disclosure=TurboUI.button({label:'View more details',icon:'more',quiet:true,onClick:()=>{details.hidden=!details.hidden;disclosure.setAttribute('aria-expanded',String(!details.hidden));}});
disclosure.setAttribute('aria-expanded','false');disclosure.setAttribute('aria-controls','details');document.getElementById('disclosure').append(disclosure);
document.getElementById('actions').append(TurboUI.button({label:'View Balance',quiet:true,onClick:()=>{document.getElementById('balance').textContent='Available balance ₹85,500 (sample).';}}),TurboUI.button({label:'View Home',href:'../hub-dashboard/index.html?tab=Spends'}));
// Sample receipt data only; this prototype neither executes nor verifies a payment.

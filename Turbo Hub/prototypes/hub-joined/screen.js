// Joined: confirm membership, then enter the Hub where payment setup remains available.
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('symbol').append(TurboUI.successIndicator({tone:'action',animated:true}));
document.getElementById('result-heading').textContent='You’re in, Neha';
document.getElementById('result-copy').textContent='You’ve joined The Sharma’s. Two quick steps and you can start paying.';
const steps=document.getElementById('steps');
for(const [graphic,text] of [['upi-fill','Verify PAN and set a UPI PIN'],['card-fill','Add a delivery address for your card']]){
 const item=document.createElement('li');const mark=document.createElement('span');mark.className='joined-steps__icon';mark.setAttribute('aria-hidden','true');mark.innerHTML=TurboIcons.render(graphic,{size:20});
 const label=document.createElement('span');label.textContent=text;item.append(mark,label);steps.append(item);
}
document.getElementById('actions').append(TurboUI.button({label:'Go to Hub',variant:'inverse',href:'../hub-dashboard/index.html?state=joined&member=neha'}));
// Local prototype outcome only.

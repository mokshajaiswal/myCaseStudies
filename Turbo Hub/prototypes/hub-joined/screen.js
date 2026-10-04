// Joined: Neha is in the Hub. Two short steps remain before she can pay, and the profile is where she does them.
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('symbol').append(TurboUI.successIndicator({tone:'action',animated:true}));
document.getElementById('result-heading').textContent='You’re in, Neha';
document.getElementById('result-copy').textContent='You’ve joined The Sharma’s. Two quick steps and you can start paying.';
const steps=document.getElementById('steps');
for(const [graphic,text] of [['upi-fill','Verify PAN and set a UPI PIN'],['card-fill','Add a delivery address for your card']]){
 const item=document.createElement('li');const mark=document.createElement('span');mark.className='joined-steps__icon';mark.setAttribute('aria-hidden','true');mark.innerHTML=TurboIcons.render(graphic,{size:20});
 const label=document.createElement('span');label.textContent=text;item.append(mark,label);steps.append(item);
}
document.getElementById('actions').append(TurboUI.button({label:'Set up payments',variant:'inverse',href:'../member-profile/index.html?member=neha'}));
// Local prototype outcome only.

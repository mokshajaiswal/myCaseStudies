const H=TurboUI,raw=new URLSearchParams(location.search).get('amount');const amount=raw&&/^\d+(?:\.\d{1,2})?$/.test(raw)&&Number(raw)>=1&&Number(raw)<=1000000?Number(raw):2500;
document.getElementById('statusbar').append(H.statusbar());
// ?kind=invite: the member's lock screen when the Hub invitation arrives on WhatsApp.
const invite=new URLSearchParams(location.search).get('kind')==='invite';
if(invite){
  const name=window.TurboStoryContext?.embedded?TurboStoryContext.member.name.split(' ')[0]:'Neha';
  document.querySelector('.lock-time').textContent='5:06';document.getElementById('notifications').setAttribute('aria-label','Messages');
  document.getElementById('notifications').append(H.paymentNotification({app:'WhatsApp',mark:'whatsapp',time:'now',message:`HDFC Bank: Hey ${name}! Arun Sharma has invited you to join The Sharma’s family Hub on PayZapp.`,href:'../invitation/index.html'}));
}else document.getElementById('notifications').append(H.paymentNotification({message:`Neha Sharma from The Sharma’s Hub is making a transaction of ₹${amount.toLocaleString('en-IN')} at the Nykaa store. Authorise the transaction to complete the payment.`,href:'../payment-authorize/index.html?amount='+amount}));

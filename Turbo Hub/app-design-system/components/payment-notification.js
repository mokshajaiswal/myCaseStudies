TurboUI.paymentNotification=({message,href,app='PayZapp',time='now'}={})=>{
 const root=document.createElement('a');root.className='th-payment-notification';root.href=href;
 const header=document.createElement('div');header.className='th-payment-notification__header';
 const mark=document.createElement('span');mark.className='th-payment-notification__mark';mark.textContent='P';mark.setAttribute('aria-hidden','true');
 const brand=document.createElement('strong');brand.textContent=app;const timestamp=document.createElement('span');timestamp.className='th-payment-notification__time';timestamp.textContent=time;header.append(mark,brand,timestamp);
 const copy=document.createElement('p');copy.className='th-payment-notification__message';copy.textContent=message;root.append(header,copy);return root;
};

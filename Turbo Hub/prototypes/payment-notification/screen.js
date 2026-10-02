const H=TurboUI,raw=new URLSearchParams(location.search).get('amount');const amount=raw&&/^\d+(?:\.\d{1,2})?$/.test(raw)&&Number(raw)>=1&&Number(raw)<=1000000?Number(raw):2500;
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('notifications').append(H.paymentNotification({message:`Neha Sharma from The Sharma’s Hub is making a transaction of ₹${amount.toLocaleString('en-IN')} at the Nykaa store. Authorise the transaction to complete the payment.`,href:'../payment-authorize/index.html?amount='+amount}));

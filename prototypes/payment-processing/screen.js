const supplied=Number(new URLSearchParams(location.search).get('amount'));
const amount=Number.isFinite(supplied)&&supplied>=1&&supplied<=1000000?supplied:2500;
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('amount').textContent='₹'+amount.toLocaleString('en-IN');
// Processing is a stable case-study state. Preview navigation advances to the receipt.

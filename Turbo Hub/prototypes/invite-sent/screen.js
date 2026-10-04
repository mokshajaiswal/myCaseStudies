// Invitation sent: confirms the invite went out, then returns to Members on its own.
let draftName='';try{draftName=(JSON.parse(TurboStoryContext.storage.getItem('turbo-hub-member-draft'))||{}).name||''}catch{}
const name=(new URLSearchParams(location.search).get('name')||(TurboStoryContext.embedded?TurboStoryContext.member.name:draftName)||'Kavya Sharma').trim();
const first=name.split(' ')[0];
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('symbol').append(TurboUI.successIndicator({tone:'action',animated:true}));
document.getElementById('result-heading').textContent=TurboStoryContext.embedded&&TurboStoryContext.scene?.confirmationHeading||'Invitation sent to '+first;
document.getElementById('result-copy').textContent=TurboStoryContext.embedded&&TurboStoryContext.scene?.confirmationCopy||first+' will get a WhatsApp message to join The Sharma’s.';
// No action: the confirmation dismisses itself to Members after a short pause (held still in locked story embeds).
if(!window.TurboStoryContext?.locked)setTimeout(()=>TurboStoryContext.navigate('../hub-dashboard/index.html?tab=Members'),2400);
// Local prototype outcome only; no invitation is sent.

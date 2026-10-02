const chapters = [
 {role:'Manager',title:'Create a family Hub',intro:'The manager’s journey begins within PayZapp. They discover Turbo Hub, choose a family Hub, and connect an existing source account to create the shared space.',groups:[
  {title:'A familiar starting point',decision:'I placed Turbo Hub in Accounts & Cards, alongside the accounts users already manage. An introductory carousel explains shared spending and control before asking the manager to configure the Hub.',screens:[['Accounts & Cards','Turbo Hubs entry beneath linked cards.'],['Introduction','First carousel slide; remaining slides as a short sequence.']]},
  {title:'Purpose before setup',decision:'Hub types explain who the shared space is for. Naming the Hub and selecting a configured source account make its identity and funding clear; the created Hub then leads directly to inviting a member or adding a tag.',screens:[['Hub type','Family Hub selected.'],['Name & source','Hub name and existing credit/prepaid account.'],['Hub created','Success confirmation, Invite Member, and Add Pixel Tag.']]}
 ],refs:[['Discovery','VMJYp9g7DGyHWmhJZz1cQChc'],['Creation · right to left','irJNPUFcdMorYoJ08bUXa5fgmk']]},
 {role:'Manager',title:'Invite and manage members',intro:'With the Hub created, the manager adds family members and chooses their payment methods. The Hub dashboard becomes the place to check participation and understand spending.',groups:[
  {title:'Make access explicit',decision:'Payment methods describe what the member receives and any associated fee before the invitation is sent. In the Members view, pending invitations are stated on the member card so the manager can distinguish an invite from someone who has joined.',screens:[['Member details','Relationship, name, mobile, and optional nickname.'],['Payment methods','Physical Card, Digital Card, and UPI, with descriptions and fees.'],['Invitation status','Pending and joined members in the Members view.']]},
  {title:'From activity to oversight',decision:'Spends shows individual transactions, while Analytics highlights top spenders, categories, and payment methods. Monthly-limit summaries provide context for these amounts. The Hubs list separates spaces managed by the user from those managed by others; a proposed limit editor would complete the control flow.',screens:[['Spending','Merchant transactions and monthly spending.'],['Analytics','Top spenders, most-used cards, and categories.'],['Spending limit','Member/Hub, period, amount, and saved confirmation.','new'],['Other Hubs','Hubs list with Managed by Me / Managed by Others tabs.']]}
 ],refs:[['Invitation · right to left','keXcXE5lkhS5SPirkreik3BLM']],note:'The limit editor is suggested. The Hubs-list reference shows Managed by Me; Managed by Others is available as a tab.'},
 {role:'Member',title:'Join and set up payment access',intro:'The invitation brings the member into their side of the Hub. Their profile shows the available payment methods, monthly limit, and any setup still required.',groups:[
  {title:'Two entry paths, one destination',decision:'The source explores separate journeys for existing and new PayZapp users. The proposed entry screens make that distinction explicit: returning users proceed to the Hub, while new users first receive the account setup and introduction they need.',screens:[['Invitation','Inviter, Hub, and existing-account entry.','new'],['New-user entry','PayZapp entry and Turbo Hub introduction; new users only.','new']]},
  {title:'Show the next action in context',decision:'The delivery-details action sits beside the physical card marked Pending Action, while UPI is shown separately as active. A focused address form collects delivery information and returns to the profile with confirmation that the address was saved.',screens:[['Profile · pending action','Monthly limit, active UPI, and card delivery-details link.'],['Delivery details','Address, pincode, city/state, contact, and confirmation.'],['Address saved','Updated profile with the address-success message.']]}
 ],refs:[['Card setup','G4ExTT6ySA2J0WQb83q1BWijJ0w']],note:'Source onboarding labels are ambiguous; entry screens are proposed. Address submission is not proof of physical-card activation.'},
 {role:'Member + Manager',title:'Request, approve, and complete a payment',intro:'In this flow, Neha initiates a ₹2,500 payment at Nykaa using the family Hub. The transaction requires Arun’s authorization, connecting the member’s payment journey with the manager’s decision.',groups:[
  {title:'Member · Send the request',decision:'I retained PayZapp’s Scan & Pay pattern and kept the merchant, amount, and selected Hub account together during review. Once the request is sent, the pending state names the manager and shows an expiry countdown so the member knows who is responding and how long the request remains open.',screens:[['Scan QR','Nykaa merchant scanner.'],['Review payment','Nykaa, ₹2,500, family Hub account, and Swipe to Pay.'],['Request pending','Arun Sharma, ₹2,500, merchant, and expiry countdown.']]},
  {title:'Manager · Make an informed decision',decision:'The notification identifies the member, merchant, and amount before the manager opens the request. The detail screen repeats that context and offers Decline or Swipe to Authorize, followed by a distinct authorization confirmation.',screens:[['Notification','Neha, Nykaa, and ₹2,500 on the lock screen.'],['Review & authorize','Request details, Decline, and Swipe to Authorize.'],['Authorization confirmed','Manager’s request-authorized success state.']]},
  {title:'Member · Close the loop',decision:'Processing and the final receipt distinguish an authorized request from a completed payment. The receipt records the merchant, amount, and transaction details. Proposed declined and expired states would also give the member a clear outcome when authorization does not arrive.',screens:[['Processing','₹2,500 payment-processing state.'],['Payment receipt','Nykaa receipt, transaction details, and next actions.'],['Declined / expired','Two outcome variants with a clear next action.','new']]}
 ],refs:[['Scan','OOyc0Zq9BRNy8eRM7cFK8sNo23g'],['Review','pj5901B1DyQtj8DDjEgz0wXEaA'],['Pending','Z8wJc8fuEBUz3utfYZbLnu2Mls'],['Manager approval','Y16WMsQBYYXK4i16Uq3PzRaQUDs'],['Processing','8O2LAV3ua2Xc89uFVOUrY734oGA'],['Receipt','AEUUu7mF6h2FAlF8b5RqtQDDvA']],note:'The source does not establish the approval trigger. This sequence describes a payment requiring approval, not every payment.'},
 {role:'Manager · Optional',title:'Link a Pixel Tag',intro:'Beyond member payment methods, the manager can add a Pixel Tag to the Hub. This branch supports linking an existing tag or choosing between payment-only and tracking-capable options.',groups:[
  {title:'Explain the choice before linking',decision:'Images and descriptions distinguish Pixel Tag’s payment capability from Pixel+ Tag’s payment and tracking features. Existing owners can link their tag directly by scanning the QR code on its back.',screens:[['Link or buy','Existing-tag option and both tag types with images and capabilities.'],['Scan tag QR','Scanner with the instruction to scan the back of the tag.']]},
  {title:'Connect tracking to its setup',decision:'After linking, the Pixel+ Tag appears in the Hub with a geofence setup prompt attached to it. This keeps the unfinished action in context; the proposed configuration screens would carry that prompt through to a saved location boundary.',screens:[['Tag added','Card Keys tag with Configure Geofence / Setup Pixel+ Tag.'],['Geofence setup','Location, boundary/radius, permissions, and saved confirmation.','new']]}
 ],refs:[['Pixel Tag flow','L9fO641kjt3My4tVM92GN606kQ0']],note:'The source shows a geofence prompt; completed configuration is proposed.'}
];
// Composite references are displayed through a screen-sized window; originals stay intact.
const triptych=(id,column,width=3155)=>({id,width,height:1797,screenWidth:810,x:column*(width-810)/2});
const screenAssets={
 'Accounts & Cards':triptych('VMJYp9g7DGyHWmhJZz1cQChc',1),
 'Introduction':triptych('VMJYp9g7DGyHWmhJZz1cQChc',2),
 'Hub type':triptych('irJNPUFcdMorYoJ08bUXa5fgmk',2),
 'Name & source':triptych('irJNPUFcdMorYoJ08bUXa5fgmk',1),
 'Hub created':triptych('irJNPUFcdMorYoJ08bUXa5fgmk',0),
 'Member details':triptych('keXcXE5lkhS5SPirkreik3BLM',1),
 'Payment methods':triptych('keXcXE5lkhS5SPirkreik3BLM',0),
 'Invitation status':{id:'cUEe9aCzNha1OYgFqfbI4ag9A',ratio:'720 / 2452'},
 'Spending':{id:'mO1QSMbg3mwg82znPJfl6fYFbxA',ratio:'720 / 2486'},
 'Analytics':{id:'xuyu9b6BPiGFE51sIWm7n3Rm4HE',ratio:'720 / 3094'},
 'Other Hubs':triptych('keXcXE5lkhS5SPirkreik3BLM',2),
 'Profile · pending action':triptych('G4ExTT6ySA2J0WQb83q1BWijJ0w',0,3300),
 'Delivery details':triptych('G4ExTT6ySA2J0WQb83q1BWijJ0w',1,3300),
 'Address saved':triptych('G4ExTT6ySA2J0WQb83q1BWijJ0w',2,3300),
 'Scan QR':{id:'OOyc0Zq9BRNy8eRM7cFK8sNo23g'},
 'Review payment':{id:'pj5901B1DyQtj8DDjEgz0wXEaA'},
 'Request pending':{id:'Z8wJc8fuEBUz3utfYZbLnu2Mls'},
 'Notification':triptych('Y16WMsQBYYXK4i16Uq3PzRaQUDs',0,3301),
 'Review & authorize':triptych('Y16WMsQBYYXK4i16Uq3PzRaQUDs',1,3301),
 'Authorization confirmed':triptych('Y16WMsQBYYXK4i16Uq3PzRaQUDs',2,3301),
 'Processing':{id:'8O2LAV3ua2Xc89uFVOUrY734oGA'},
 'Payment receipt':{id:'AEUUu7mF6h2FAlF8b5RqtQDDvA'},
 'Link or buy':triptych('L9fO641kjt3My4tVM92GN606kQ0',0),
 'Scan tag QR':triptych('L9fO641kjt3My4tVM92GN606kQ0',1),
 'Tag added':triptych('L9fO641kjt3My4tVM92GN606kQ0',2)
};
const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node};
const root=document.getElementById('flows');
const prototypes={'New-user entry':'invitation?audience=new','Geofence setup':'geofence-setup','Spending limit':'spending-limit','Declined / expired':'payment-unapproved?state=declined','Invitation':'invitation','Tag added':'tag-added','Scan tag QR':'tag-scanner','Link or buy':'pixel-tag','Accounts & Cards':'accounts-cards','Introduction':'hub-introduction','Scan QR':'scan-qr','Notification':'payment-notification','Other Hubs':'hubs','Hub type':'create-hub?step=type','Name & source':'create-hub?step=details','Hub created':'create-hub?step=created','Profile · pending action':'member-profile','Delivery details':'delivery-details','Address saved':'member-profile?saved=true','Request pending':'request-pending','Processing':'payment-processing','Payment receipt':'payment-receipt','Review & authorize':'payment-authorize','Authorization confirmed':'authorization-confirmed','Review payment':'payment-review','Member details':'add-member','Payment methods':'add-member?step=payments','Spending':'hub-dashboard?tab=Spends','Analytics':'hub-dashboard?tab=Analytics','Invitation status':'hub-dashboard?tab=Members'};
const allScreens=chapters.flatMap(chapter=>chapter.groups.flatMap(group=>group.screens));
const done=allScreens.filter(([name])=>prototypes[name]).length;
const checklist=el('details','flow-checklist');
checklist.append(el('summary','',`Screen checklist · ${done} done · ${allScreens.length-done} remaining`));
checklist.append(el('p','checklist-note','Done means a full-page preview is available.'));
const checklistGroups=el('div','checklist-groups');
chapters.forEach(chapter=>{
 const group=el('section');group.append(el('h3','',chapter.title));const list=el('ul','checklist-items');
 chapter.groups.flatMap(group=>group.screens).forEach(([name])=>{
  const complete=Boolean(prototypes[name]);const item=el('li',complete?'is-done':'is-remaining');
  const mark=el('span','checklist-mark',complete?'✓':'○');mark.setAttribute('aria-hidden','true');
  item.append(mark,el('span','',name),el('span','checklist-status',complete?'Done':'Remaining'));list.append(item);
 });group.append(list);checklistGroups.append(group);
});
checklist.append(checklistGroups);root.before(checklist);
chapters.forEach((chapter,index)=>{
 const section=el('section','chapter');
 section.append(el('p','eyebrow',`${String(index+1).padStart(2,'0')} / ${chapter.role}`),el('h2','',chapter.title));
 section.append(el('p','flow-intro',chapter.intro));
 let step=0;
 chapter.groups.forEach(group=>{
  const block=el('section','flow-group');const header=el('div','group-head');header.append(el('h3','',group.title),el('p','decision',group.decision));
  const list=el('ol',group.screens.length===4?'screens screens--four':'screens');
  group.screens.forEach(([name,placement,status])=>{
   step++;const item=el('li',status==='new'?'proposed':'');const box=el('div','placeholder');
   const meta=el('div','slot-meta');meta.append(el('span','slot',`${index+1}.${step}`));if(status)meta.append(el('span','status',status==='new'?'Create':'Prototype reference'));
   box.append(meta,el('strong','',name),el('p','',placement));item.append(box);
   const preview=el('div','screen-preview');const stage=el('div','screen-stage');preview.append(stage);item.append(preview);
   const asset=screenAssets[name];
   if(asset){const link=el('a','screen-reference');link.href=`source/${asset.id}.png`;link.target='_blank';link.rel='noopener';link.setAttribute('aria-label',`Open original reference: ${name}`);const img=el('img');img.src=link.href;img.alt=name+' — original Turbo Hub screen';img.loading='lazy';img.decoding='async';if(asset.ratio)link.style.aspectRatio=asset.ratio;if(asset.width){link.classList.add('screen-reference--crop');link.style.aspectRatio=`${asset.screenWidth} / ${asset.height}`;img.style.width=`${asset.width/asset.screenWidth*100}%`;img.style.left=`${-asset.x/asset.screenWidth*100}%`;}link.append(img);stage.append(link);box.classList.add('placeholder--caption');}
   if(prototypes[name]){const prototype=el('a','open-full-page','Open full page ↗');const [path,query]=prototypes[name].split('?');prototype.href='../prototypes/'+path+'/index.html'+(query?'?'+query:'');prototype.target='_blank';prototype.rel='noopener';prototype.setAttribute('aria-label',`Open ${name} full page in a new tab`);preview.append(prototype);}
   if(!asset)stage.append(el('span','reserved-label',status==='new'?'Screen to create':'Screen reference pending'));list.append(item);
  });block.append(header,list);section.append(block);
 });
 const details=el('details');details.append(el('summary','','References'));if(chapter.note)details.append(el('p','',chapter.note));
 const links=el('p','reference-links');chapter.refs.forEach(([name,id])=>{const a=el('a','',name);a.href=`source/${id}.png`;a.target='_blank';a.rel='noopener';links.append(a)});details.append(links);section.append(details);root.append(section);
});




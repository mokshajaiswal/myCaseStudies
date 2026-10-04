const H=TurboUI;
const recipient=TurboStoryContext.embedded?TurboStoryContext.member.name:'Neha Sharma';
const newUser=new URLSearchParams(location.search).get('audience')==='new';
const node=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n};
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Hub invitation',variant:'icons-only',left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'}}));
document.getElementById('heading').append(H.pageHeader({heading:newUser?'Get started with PayZapp':'Join your family'}));
const content=document.getElementById('content');const preview=node('section','invitation-preview');preview.append(H.summary({name:'The Sharma’s',type:'Family Hub',variant:'centered'}));
const people=node('div','invitation-people');people.setAttribute('aria-label','Your family');['Arun Sharma','Kavya Sharma',recipient].forEach(name=>people.append(H.avatar({name})));preview.append(people);
const copy=node('section','invitation-copy');copy.append(node('h2','','Hey '+recipient.split(' ')[0]+'!'),node('p','','Arun Sharma has invited you to join The Sharma’s family Hub on PayZapp.'),node('p','','Start sharing expenses with your family.'));
const actions=node('div','invitation-actions');
if(newUser){copy.append(node('p','','Create your PayZapp account first, then return to this invitation to access your family Hub.'));const status=node('p','invitation-caption');status.setAttribute('role','status');actions.append(H.button({label:'Create PayZapp account',onClick:()=>{status.textContent='Account setup is not included in this prototype.'}}),H.button({label:'I already have a PayZapp account',quiet:true,href:'index.html'}),status);window.addEventListener('DOMContentLoaded',()=>{if(TurboStoryContext.embedded)return;const figure=document.querySelector('.preview-reference');figure.append(node('p','','Proposed new-user entry · invitation is the related Figma reference.'));const nav=node('nav','preview-flow-navigation');nav.setAttribute('aria-label','Case-study flow navigation');const link=node('a','','Preview after account setup: Member profile');link.href='../member-profile/index.html';nav.append(link);figure.append(nav);});}
else actions.append(H.button({label:'Open Hub in PayZapp',href:'../member-profile/index.html'}),node('p','invitation-caption','For existing PayZapp users.'),H.button({label:'New to PayZapp?',quiet:true,href:'index.html?audience=new'}));
content.append(preview,copy,actions);

// Existing-user invitation: an external WhatsApp chat (Figma 419:29279), a documented exception to the DS shell.
// The bank's business account messages the member; the link opens the Hub in PayZapp.
if(!newUser){
  const first=recipient.split(' ')[0];
  const svg=(d,size=24)=>`<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const screen=document.querySelector('.phone-screen');screen.className='phone-screen wa-screen';
  screen.innerHTML=`<div id="statusbar"></div>
  <header class="wa-header"><a class="wa-back" href="../../flow-reference/index.html" aria-label="Back to chats">${svg('<path d="M15 5l-7 7 7 7"/>',26)}</a><span class="wa-contact-avatar" aria-hidden="true">${svg('<circle cx="12" cy="9" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',22)}</span><span class="wa-contact"><strong>HDFC Bank</strong><span>Business account</span></span><span class="wa-actions" aria-hidden="true">${svg('<rect x="2.5" y="6" width="13" height="12" rx="2.5"/><path d="M15.5 10.5 21 7v10l-5.5-3.5"/>')}${svg('<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"/>')}</span></header>
  <section class="wa-chat" aria-label="Chat with HDFC Bank" tabindex="0">
    <p class="wa-day">Today</p>
    <p class="wa-notice">${svg('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',13)} Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.</p>
    <article class="wa-bubble">
      <a class="wa-preview" href="../play-store/index.html"><img src="../onboarding/assets/family-home.png" alt=""><strong>Join your family</strong><span class="wa-people" aria-hidden="true"><span>A</span><span>K</span><span>N</span><span>R</span></span></a>
      <p>Hey ${first}! <strong>Arun Sharma</strong> has invited you to join <strong>The Sharma’s</strong> family Hub on PayZapp.</p>
      <p>Download PayZapp and start sharing expenses with your family. <a href="../play-store/index.html">https://pzlive.page.link/1hWAehYid5ZhDBZR8</a></p>
      <span class="wa-time">5:06 pm</span>
    </article>
  </section>
  <footer class="wa-composer" aria-hidden="true">${svg('<path d="M12 5v14M5 12h14"/>')}<span class="wa-input"></span>${svg('<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/>')}${svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>')}</footer>
  <div class="home-indicator" aria-hidden="true"></div>`;
  document.getElementById('statusbar').append(H.statusbar({tone:'light'}));
  // The shared preview paints the Turbo Hub chrome on every screen; an external app keeps its own surface.
  addEventListener('DOMContentLoaded',()=>screen.classList.remove('th-chrome-backdrop'));
}


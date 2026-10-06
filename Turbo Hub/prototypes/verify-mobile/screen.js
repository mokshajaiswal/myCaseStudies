// Verify your number: the only account step. PayZapp already knows Neha from Arun's invite, so it just confirms
// the number he entered. The code arrives by SMS and is filled in automatically.
const H=TurboUI;
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Verify your number',variant:'icons-only',left:{label:'Back to the invitation',icon:'navigation-back',href:'../hub-welcome/index.html'}}));
document.getElementById('heading').append(H.pageHeader({heading:'Verify your number',subtext:'Arun invited you on +91 98765 43210. Enter the code we sent there.'}));
const form=document.getElementById('form');
const code=H.otp({id:'otp',label:'6-digit code',onInput:()=>code.setError('')});
const note=document.createElement('p');note.className='setup-note';note.innerHTML='Your code can fill automatically from SMS. <strong>Resend in 0:24</strong>';
form.append(code,note,H.button({label:'Verify and join',type:'submit'}));
form.onsubmit=event=>{event.preventDefault();if(!/^\d{6}$/.test(code.control.value.trim())){code.setError('Enter the 6-digit code.');code.focus();return;}TurboStoryContext.navigate('../hub-joined/index.html');};
// Local prototype only; no SMS is sent.

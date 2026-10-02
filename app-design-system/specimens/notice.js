const preview=document.getElementById('preview');
const example=new URLSearchParams(location.search).get('example');
const message=example==='long'?'Address added successfully. Your physical card delivery details have been saved for review. Card activation is a separate step.':'Address added successfully';
const notice=TurboUI.notice({message,onDismiss:example==='plain'?undefined:()=>{notice.hidden=true;}});preview.append(notice);

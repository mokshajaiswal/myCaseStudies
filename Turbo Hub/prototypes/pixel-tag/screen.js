const H=TurboUI;
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Pixel Tag',variant:'icons-only',left:{label:'Back to Hub',icon:'navigation-back',href:'../hub-dashboard/index.html'}}));
document.getElementById('heading').append(H.pageHeader({heading:'Do you own a Pixel Tag?'}));
const node=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n};
function option(label,description,icon){const row=node('section','pixel-option'),art=node('div','pixel-illustration');art.setAttribute('aria-hidden','true');art.innerHTML=TurboIcons.render(icon,{size:40});const copy=node('div','pixel-copy');copy.append(node('h2','',label),node('p','',description),H.button({label,quiet:true,size:'compact',...(label==='Link Existing Tag'?{href:'../tag-scanner/index.html'}:{onClick:()=>{}})}));row.append(art,copy);return row;}
const link=option('Link Existing Tag','Scan your tag to connect with your hub.','tag');link.classList.add('pixel-option--link');
const purchase=node('section','pixel-purchase');purchase.setAttribute('aria-label','Buy a tag');purchase.append(option('Buy Pixel+ Tag','Offers payment and tracking. Get yours on Amazon.','location'),node('hr',''),option('Buy Pixel Tag','Offers payment features. Get yours on Amazon.','payment'));
document.getElementById('content').append(link,node('p','pixel-separator','OR'),purchase);

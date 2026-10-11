/* Editorial flow navigation. The caller owns playback and supplies checkpoint state. */
(function(root){
  root.TurboFlowCheckpoint=({number,label,last=false,state='upcoming',onSelect})=>{
    const make=(tag,cls,text)=>{const node=root.document.createElement(tag);node.className=cls;if(text)node.textContent=text;return node;};
    const button=make('button','family-story__loop-step');button.type='button';
    button.dataset.first=String(number===1);
    const track=make('span','family-story__step-track'),fill=make('span','family-story__step-fill');
    track.setAttribute('aria-hidden','true');track.hidden=last;track.append(fill);
    const text=make('span','family-story__step-text');text.append(make('strong','family-story__step-title',label));
    const marker=make('span','family-story__step-checkpoint');marker.setAttribute('aria-hidden','true');
    const numeral=make('span','family-story__step-number',String(number)),check=make('span','family-story__step-check');
    check.innerHTML=root.TurboIcons.render('success',{size:16});marker.append(numeral,check);
    button.append(track,text,marker);button.progressElement=fill;
    button.dataset.inspectorVariant=last?'last':'connected';
    button.setState=value=>{
      if(!['upcoming','current','complete'].includes(value))throw new Error('Unknown checkpoint state: '+value);
      button.dataset.state=value;button.setAttribute('aria-current',value==='current'?'step':'false');
      button.setAttribute('aria-pressed',String(value==='current'));
      button.setAttribute('aria-label',`Step ${number}: ${label}${value==='complete'?', completed':''}`);
    };
    button.addEventListener('click',()=>onSelect?.());button.setState(state);
    return button;
  };
})(window);

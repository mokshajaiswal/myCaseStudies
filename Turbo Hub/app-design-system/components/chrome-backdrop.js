// Decorative paint only; adopters own size, layout, content and text colors.
TurboUI.chromeBackdrop=({host=null}={})=>{
 const root=host||document.createElement('div');
 root.classList.add('th-chrome-backdrop');
 return root;
};

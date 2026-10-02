document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('toolbar').append(TurboUI.button({label:'Close authorization confirmation',icon:'close',quiet:true,iconOnly:true,href:'../hub-dashboard/index.html?tab=Spends'}));
document.getElementById('symbol').append(TurboUI.successIndicator());
// Static manager-side prototype outcome; no payment is submitted or completed.

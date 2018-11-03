const {app, BrowserWindow} = require('electron');
let mainWindow

app.on('ready', function(){
  var mensagem = 'Amo Voce <3';
  var numero =  '5518996562399';
  mainWindow = new BrowserWindow()
  mainWindow.loadURL('https://web.whatsapp.com/send?phone=' + numero + '&text=' + mensagem)
  mainWindow.webContents.executeJavaScript(`
    var enviado = false;
    function tempo(){
        var btsend = document.getElementsByClassName("_35EW6")[0];
        var inputSend = document.getElementsByClassName("_2S1VP")[0];
        if(typeof inputSend !== 'undefined' && inputSend.textContent && enviado == false){
            btsend.click();
            enviado = true;
        }else if(enviado){
            /* cancela */
        }
    }
    setInterval(tempo,3000)
  `)
})

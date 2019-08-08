const {app, BrowserWindow} = require('electron')
const path = require('path')
const express = require('express')
let win

const createWindow = () =>{
  var ex = express();
  ex.listen(3400);
  win = new BrowserWindow({
      center: true,
      resizable: true,
      webPreferences:{
          nodeIntegration: false,
          show: false
      }
  });

  win.loadFile('index.html')

  ex.get('/whatsapp/:numero/:mensagem', function(req,res){
    var numero = req.params.numero;
    var msg = req.params.mensagem;
    enviar(numero, msg);
    res.send("enviado");
  });

  function enviar(numero, mensagem){
    win.loadURL('https://web.whatsapp.com/send?phone=' + numero + '&text=' + mensagem, {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'})
    win.webContents.executeJavaScript(`
      var enviado = false;
      function tempo(){
        var btsend = document.getElementsByClassName("_3M-N-")[0];
        var inputSend = document.getElementsByClassName("_3u328")[0];
        
          if(typeof inputSend !== 'undefined' && inputSend.textContent && !enviado){
            document.getElementsByClassName("_3M-N-")[0].click()
            enviado = true;
          }else if(enviado){
            ipcRenderer.send("para",{status:true});
            enviado = false;
          }
      }
      setInterval(tempo,3000)
    `)
  }
}

app.on('ready', createWindow);

const {app, BrowserWindow, ipcMain, remote} = require('electron');
const express = require('express')
let mainWindow


app.on('ready', function(){
  var ex = express();
  ex.listen(3400);
  mainWindow = new BrowserWindow()
  ipcMain.on("para",(event,arg)=>{
    if(arg.status){
      mainWindow.hide();
    }
  })

  ex.get('/whatsapp/:numero/:mensagem', function(req,res){
    var numero = req.params.numero;
    var msg = req.params.mensagem;
    enviar(numero, msg);
    res.send("enviado");
  })

  function enviar(numero, mensagem){
    mainWindow.loadURL('https://web.whatsapp.com/send?phone=' + numero + '&text=' + mensagem)
    mainWindow.webContents.executeJavaScript(`
      var{ipcRenderer,remote} = require("electron");
      var enviado = false;
      function tempo(){
          var btsend = document.getElementsByClassName("_35EW6")[0];
          var inputSend = document.getElementsByClassName("_2S1VP")[0];
          if(typeof inputSend !== 'undefined' && inputSend.textContent && !enviado){
          btsend.click();
          enviado = true;
          }else if(enviado){
          /* cancela */
          ipcRenderer.send("para",{status:true});
          enviado = false;
          }
      }
      setInterval(tempo,3000)
    `)
  }

  
})

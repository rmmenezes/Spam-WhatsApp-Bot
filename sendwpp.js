var{ipcRenderer,remote} = require('electron');
    var enviado = false;
    function tempo(){
        var btsend = document.getElementsByClassName("_35EW6")[0];
        var inputSend = document.getElementsByClassName("_2S1VP")[0];
        if(typeof inputSend !== 'undefined' && inputSend.textContent && enviado == false){
        btsend.click();
        enviado = true;
        }else if(enviado){
        /* cancela */
        ipcRenderer.send("para",{status:true});
        enviado = false;
        }
    }
    setInterval(tempo,3000)
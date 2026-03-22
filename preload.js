const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('API', {
    ReadFile: (filename) =>
        ipcRenderer.invoke("ReadFile", filename),

});
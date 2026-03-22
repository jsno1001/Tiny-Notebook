const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('API', {
    ReadFile: (filename, encoding="utf-8") =>
        ipcRenderer.invoke("ReadFile", filename, encoding),
    WriteFile: (filename, data, encoding="utf=8") =>
        ipcRenderer.invoke("WriteFile", filename, data),

});
const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('API', {
    ReadFile: (filename, encoding="utf-8") =>
        ipcRenderer.invoke("ReadFile", filename, encoding),
    WriteFile: (filename, data, encoding="utf-8") =>
        ipcRenderer.invoke("WriteFile", filename, data, encoding),
    FindFile: () => 
        ipcRenderer.invoke("FindFile"),
    ipcRenderer_on: (event, callback) => { ipcRenderer.on(event, callback) },
});
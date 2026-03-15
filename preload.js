const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    // saceSettings: (settings) => ipcRenderer.send('save-settings', settings),
    // loadSettings: () => ipcRenderer.invoke('load-settings'),
});
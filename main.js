const {app, BrowserWindow} = require("electron")
const path = require("path")

const CreateWindow = () => {
    const win = new BrowserWindow({
        height:500,
        width:500,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, "gui", "index.html"));
}

app.whenReady().then(() => {
    CreateWindow();
})

app.on('window-all-closed', () => {
    app.quit();
})


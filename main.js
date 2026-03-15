const {app, BrowserWindow} = require("electron")

const CreateWindow = () => {
    const win = new BrowserWindow({
        height:500,
        width:500
    });

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    CreateWindow();
})

app.on('window-all-closed', () => {
    app.quit();
})


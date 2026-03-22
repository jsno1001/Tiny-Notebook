const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fs = require("fs");

ipcMain.handle("ReadFile", (event, filename, encoding="utf-8") => {
    try{
        const content = fs.readFileSync(filename, encoding);
        console.log("File "+"filename"+" has read");
        return content;
    }
    catch(error) {
        console.log("Error in reading file "+filename+" | "+error);
    }
})

ipcMain.handle("WriteFile", (event, filename, data, encoding="utf-8") => {
    try{
        const content = fs.writeFileSync(filename, data, encoding);
        console.log("File "+"filename"+" has write");
        return content;
    }
    catch(error) {
        console.log("Error in writting file "+filename+" | "+error);
    }
})


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
    win.webContents.openDevTools();
}


app.whenReady().then(() => {
    CreateWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});
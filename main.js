const {app, BrowserWindow, ipcMain, Menu, dialog} = require("electron");
const path = require("path");
const fs = require("fs");

ipcMain.handle("ReadFile", (event, filename, encoding="utf-8") => {
    try{
        const content = fs.readFileSync(filename, encoding);
        console.log("File "+filename+" has read");
        return content;
    }
    catch(error) {
        console.log("Error in reading file "+filename+" | "+error);
        return;
    }
});

ipcMain.handle("WriteFile", (event, filename, data, encoding="utf-8") => {
    try{
        const content = fs.writeFileSync(filename, data, encoding);
        console.log("File "+filename+" has write");
        return content;
    }
    catch(error) {
        console.log("Error in writting file "+filename+" | "+error);
        return;
    }
});

ipcMain.handle("FindFile", () => {
    try {
        let filepath;
        dialog.showOpenDialog({
        title: 'Choise file',
        properties: ['openFile'],
        filters: [
            { name: 'txt files', extensions: ['txt'] },
            { name: 'all files', extensions: ['*'] }
        ]
        }).then((path) => {
            filepath=path;
            console.log(filepath)
        });
        return filepath;
    }
    catch(error) {
        console.log("Failed FindFile | "+error);
        return;
    }
});

const CreateWindow = () => {
    const win = new BrowserWindow({
        height:800,
        width:800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true
        },
    });
    win.loadFile(path.join(__dirname, "gui", "index.html"));
    win.webContents.openDevTools();

    const MenuTemplate = [
        {
            label: "File",
            submenu: [
                {
                    label: "Open",
                    click: () => win.webContents.send('menu-file/open')
                },
                {
                    label: "Save",
                    accelerator: "Ctrl+S",
                    click: () => win.webContents.send('menu-file/save')
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(MenuTemplate);
    Menu.setApplicationMenu(menu);
}


app.whenReady().then(() => {
    CreateWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});
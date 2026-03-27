let filename;
let text = document.getElementById("text");

window.API.ipcRenderer_on("menu-file/save", () => {    
    window.API.WriteFile(filename, text.value); 
});
window.API.ipcRenderer_on("menu-file/open", () => {  
    window.API.FindFile()
    .then(result => {
        filename = result;
        window.API.ReadFile(filename)
        .then( (fcontent) => {
            text.value=fcontent;    
            document.title = filename;
        });
    });
});
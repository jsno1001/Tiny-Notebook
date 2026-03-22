window.API.ReadFile("./tests/file.txt").then(response => {
    document.body.innerHTML += "<h1>"+response+"</h1>";
})
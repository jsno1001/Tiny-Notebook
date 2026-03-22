window.API.WriteFile("./tests/file2.txt", "Hello writting");
window.API.ReadFile("./tests/file2.txt").then(response => {
    document.body.innerHTML += "<h1>"+response+"</h1>";
})

document.addEventListener("keydown", (event) =>{
    if (event.ctrlKey && event.shiftKey && event.key == "I"){
        alert("No dev tool, only devkit");
        event.preventDefault();
    }
    if (event.ctrlKey && event.shiftKey && event.key == "C"){
        alert("There isnt any element to select");
        event.preventDefault();
    }
    if (event.key == "F12"){
        alert("No dev tool, only devkit");
        event.preventDefault();
    }
});
document.addEventListener("contextmenu", (event) =>{
    alert("No right click for you");
    event.preventDefault();
});
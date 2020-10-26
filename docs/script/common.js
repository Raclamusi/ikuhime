
var header = document.getElementById("header");
var main = document.getElementById("main");

function ResizeMain() {
    main.style.height = window.innerHeight - header.clientHeight + "px";
}

window.addEventListener("load", ResizeMain);
window.addEventListener("resize", ResizeMain);


var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");

var level = parseInt(localStorage.getItem("level")) || 1;
var experience = parseInt(localStorage.getItem("experience")) || 0;

var avatar = document.getElementById("avatar");

function Resize() {
    canvas.width = window.innerWidth;
}

function Draw() {
    ctx.font = "32px serif";
    ctx.fillText("Lv. " + level, 30, 62);
    ctx.fillStyle = "#33ff66";
    ctx.fillRect(30, 70, 20 * experience, 20);
    ctx.strokeStyle = "#333399";
    ctx.lineWidth = 5;
    ctx.strokeRect(30, 70, 200, 20);
    ctx.drawImage(avatar, 0, 0, 512, 512, (canvas.width - 256) / 2, 100, 256, 256);
}

window.onload = function () {
    Resize();
    Draw();
};

window.onresize = function () {
    Resize();
    Draw();
};

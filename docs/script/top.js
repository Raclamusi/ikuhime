
var levelSpan = document.getElementById("status-level");
var expBarCanvas = document.getElementById("exp-bar");
var expBarContext = expBarCanvas.getContext("2d");
var aura = document.getElementById("aura");

var level = parseInt(localStorage.getItem("level")) || 1;
var experience = parseInt(localStorage.getItem("experience")) || 0;

function Update() {
    levelSpan.textContent = String(level);
    expBarContext.fillStyle = "#33ff66";
    expBarContext.fillRect(5, 5, 20 * experience, 20);
    expBarContext.strokeStyle = "#333399";
    expBarContext.lineWidth = 5;
    expBarContext.strokeRect(5, 5, 200, 20);
    if (level >= 100) {
        aura.style.display = "block";
    }
}

window.addEventListener("load", Update);
window.addEventListener("resize", Update);

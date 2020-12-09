
var level = parseInt(localStorage.getItem("level")) || 1;
var experience = parseInt(localStorage.getItem("experience")) || 0;

document.getElementById("I-did-my-best").onclick = function () {
    experience += Math.floor(Math.random() * 10) + 1;
    if (experience >= 10) {
        level++;
        experience -= 10;
    }
    localStorage.setItem("level", String(level));
    localStorage.setItem("experience", String(experience));
    location.href = "/ikuhime/home";
};

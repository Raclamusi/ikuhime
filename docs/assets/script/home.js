
var nameSpan = document.getElementById("avatar-name");
var levelSpan = document.getElementById("avatar-level");
var expSpan = document.getElementById("avatar-exp")
var expBar = document.getElementById("avatar-expbar");

window.addEventListener("load", function () {
    while (savedata.exp >= savedata.level * 100) {
        savedata.exp -= savedata.level * 100;
        savedata.level++;
	}

    nameSpan.textContent = savedata.name;
    levelSpan.textContent = "" + savedata.level;
    expSpan.textContent = "" + savedata.level * 100 - savedata.exp;
    expBar.style.width = savedata.exp / savedata.level + "%";
});

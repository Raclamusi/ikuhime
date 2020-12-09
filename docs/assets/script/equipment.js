
function ClickItem() {
    window.alert("装備はまだ身に着けられないよ。\nごめんね。");
}

var equipList = document.getElementsByClassName("equip-item");

window.onload = function () {
    for (var i = 0; i < equipList.length; i++) {
        equipList[i].addEventListener("click", ClickItem);
    }
};

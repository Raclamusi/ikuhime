
function ClickItem() {
    window.alert("資格･検定はまだ登録できないよ。\nごめんね。");
}

var qualifList = document.getElementById("qualif-list");

window.onload = function () {
    Object.keys(qualificationList).forEach(function (k) {
        var q = qualificationList[k];
        var li = document.createElement("li");
        var item = document.createElement("div");
        item.classList.add("qualif-item");
        item.innerHTML = q.name + "<br>&emsp;&emsp;" + q.organizer.name;
        item.addEventListener("click", ClickItem);
        li.appendChild(item);
        qualifList.appendChild(li);
    });
};

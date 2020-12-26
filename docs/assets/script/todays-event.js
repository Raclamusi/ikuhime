
var now = new Date();
var nowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

window.addEventListener("load", function () {
    if (savedata.bonusPreTime < nowTime) {
        document.getElementById("bonus").classList.remove("hidden");
    }
});

function nothingSpecial() {
    if (savedata.bonusPreTime < nowTime) {
        savedata.bonusPreTime = nowTime;
        savedata.exp += 100;
        savedata.save();
        location.href = "/ikuhime/home";
    }
}

function registration() {
    var title = document.eventRecord.title.value;
    if (title === "") {
        window.alert("タイトルを入力してください");
        return;
    }
    var content = document.eventRecord.content.value;
    if (content === "") {
        window.alert("内容を入力してください");
        return;
    }
    savedata.eventRecords.push(new EventRecord(title, content));
    savedata.exp += 100 + 3 * Math.min(content.length, 300);
    savedata.save();
    location.href = "/ikuhime/home";
}

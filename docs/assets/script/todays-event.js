
var now = new Date();
var nowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

window.addEventListener("load", function () {
    document.getElementById("bonus").remove();
});

function nothingSpecial() {
    if (userdata.bonusPreTime < nowTime) {
        userdata.bonusPreTime = nowTime;
        userdata.exp += 100;
        userdata.save("bonusPreTime", "exp");
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
    userdata.eventRecords.push(new EventRecord(title, content));
    userdata.exp += 100 + 3 * Math.min(content.length, 300);
    userdata.save("eventRecords", "exp");
    location.href = "/ikuhime/home";
}

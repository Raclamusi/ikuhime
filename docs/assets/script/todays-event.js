
const nothingSpecial = function () {
    const now = new Date();
    const nowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    userdata.bonusPreTime = nowTime;
    userdata.exp += 100;
    userdata.save("bonusPreTime", "exp");
    location.href = "/ikuhime/home";
};

const registration = function () {
    const title = document.eventRecord.title.value;
    if (title === "") {
        alert("タイトルを入力してください");
        return;
    }
    const content = document.eventRecord.content.value;
    if (content === "") {
        alert("内容を入力してください");
        return;
    }
    userdata.eventRecords.unshift(new EventRecord(title, content));
    userdata.exp += 100 + 3 * Math.min(content.length, 300);
    userdata.save("eventRecords", "exp");
    location.href = "/ikuhime/home";
};

(function () {
    const now = new Date();
    const nowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    if (userdata.bonusPreTime >= nowTime) {
        document.getElementById("bonus").remove();
    }
})();

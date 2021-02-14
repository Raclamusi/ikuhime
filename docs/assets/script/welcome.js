
const start = function () {
    const userName = document.initForm.name.value;
    if (userName === "") {
        alert("名前を入力してください");
        return;
    }
    userdata.set("name", userName);
    userdata.set("level", 1);
    userdata.set("exp", 0);
    userdata.set("eventRecords", []);
    userdata.set("bonusPreTime", 0);
    userdata.set("quals", []);
    userdata.set("avatar", 0);
    userdata.set("equips", []);
    userdata.set("enableEquip", new Array(equipList.length).fill(false));
    userdata.save();
    location.href = "/ikuhime/home";
};

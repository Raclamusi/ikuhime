
function start() {
    var name = document.initForm.name.value;
    if (name == "") {
        window.alert("名前を入力してください");
        return;
    }
    var data = ["name", "level", "exp", "eventRecords", "bonusPreTime", "quals", "avatar", "equips", "enableEquip"];
    for (var i = 0; i < data.length; i++) {
        userdata.add(data[i]);
	}
    userdata.name = name;
    userdata.level = 1;
    userdata.exp = 0;
    userdata.eventRecords = [];
    userdata.bonusPreTime = 0;
    userdata.quals = [];
    userdata.avatar = 0;
    userdata.equips = [];
    userdata.enableEquip = new Array(equipList.length);
    for (var i = 0; i < equipList.length; i++) {
        userdata.enableEquip[i] = false;
    }
    userdata.save();
    location.href = "/ikuhime/home";
}

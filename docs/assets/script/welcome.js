
function start() {
    var name = document.initForm.name.value;
    if (name == "") {
        window.alert("名前を入力してください");
        return;
    }
    savedata.name = name;
    savedata.level = 1;
    savedata.exp = 0;
    savedata.eventRecords = [];
    savedata.bonusPreTime = 0;
    savedata.quals = [];
    savedata.avatar = 0;
    savedata.equips = [];
    var ee = new Array(equipList.length);
    for (var i = 0; i < ee.length; i++) {
        ee[i] = false;
    }
    savedata.enableEquip = ee;
    location.href = "/ikuhime/home";
}

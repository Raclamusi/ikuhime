
function start() {
    var name = document.initForm.name.value;
    if (name == "") {
        window.alert("名前を入力してください");
        return;
    }
    userdata.name = name;
    userdata.level = 1;
    userdata.exp = 0;
    userdata.eventRecords = [];
    userdata.bonusPreTime = 0;
    userdata.quals = [];
    userdata.avatar = 0;
    userdata.equips = [];
    var ee = new Array(equipList.length);
    for (var i = 0; i < ee.length; i++) {
        ee[i] = false;
    }
    userdata.enableEquip = ee;
    location.href = "/ikuhime/home";
}

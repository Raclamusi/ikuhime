
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
    savedata.enableEquip = new Array(equipList.length).fill(false);
	location.href = "/ikuhime/home";
}

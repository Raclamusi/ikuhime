
document.selectForm.obtain.addEventListener("change", function () {
    document.selectForm.qualification.disabled = !document.selectForm.obtain.checked;
    document.selectForm.qualification.checked = false;
});

const deleteSelectedItems = function () {
    const itemList = [
        { name: "personal", title: "個人情報（名前、学科、学年、出席番号）" },
        { name: "avatar", title: "アバターの育成情報（レベル、経験値、装備、実績）" },
        { name: "event", title: "出来事の記録" },
        { name: "obtain", title: "取得した資格" },
        { name: "qualification", title: "資格･検定の情報（主催者、資格･検定の名前、級、各顕彰のポイント）" },
    ];
    const itemsText = itemList.reduce(function (text, item) {
        return text + (document.selectForm[item.name].checked ? "・" + item.title + "\n" : "");
    }, "");
    if (itemsText === "") {
        alert("削除する項目を選択してください");
        return;
    }
    if (confirm("以下の情報が削除されます\n\n" + itemsText + "\n削除したデータは二度と戻りません！\n本当によろしいですか？")) {
        if (document.selectForm.personal.checked) {
            userdata.name = "姫工生";
            userdata.department = "";
            userdata.schoolGrade = 0;
            userdata.studentNumber = 0;
        }
        if (document.selectForm.avatar.checked) {
            userdata.level = 1;
            userdata.exp = 0;
            userdata.avatar = 0;
            userdata.equips = [];
            userdata.enableEquip = new Array(equipList.length).fill(false);
        }
        if (document.selectForm.event.checked) {
            userdata.eventRecords = [];
        }
        if (document.selectForm.obtain.checked) {
            userdata.quals = [];
            if (document.selectForm.qualification.checked) {
                userdata.orgList = organizerList;
                userdata.qualList = qualificationList;
            }
        }
        userdata.save();
        alert("削除が完了しました");
    }
};

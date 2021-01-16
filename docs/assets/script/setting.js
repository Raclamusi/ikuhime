
function changeName() {
    var name = window.prompt("新しい名前を入力してください", userdata.name);
    if (name !== "") {
        userdata.name = name;
        window.alert("名前を変更しました");
    }
}

function removeData() {
    if (window.confirm("すべてのデータが削除されます！\nよろしいですか？")) {
        if (window.confirm("本当によろしいですか？")) {
            userdata.clear();
            window.alert("削除が完了しました");
            location.href = "/ikuhime/";
        }
    }
}

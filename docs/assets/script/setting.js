
const changeName = function () {
    const newName = prompt("新しい名前を入力してください", userdata.name);
    if (newName !== "") {
        userdata.name = newName;
        userdata.save("name");
        alert("名前を変更しました");
    }
};

const removeData = function () {
    if (confirm("すべてのデータが削除されます！\nよろしいですか？")) {
        if (confirm("本当によろしいですか？")) {
            userdata.clear();
            alert("削除が完了しました");
            location.href = "/ikuhime/";
        }
    }
};

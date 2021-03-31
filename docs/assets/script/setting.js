
const removeData = function () {
    if (confirm("すべてのデータが削除されます！\nよろしいですか？")) {
        if (confirm("本当によろしいですか？")) {
            userdata.clear();
            alert("削除が完了しました");
            location.href = "/ikuhime/";
        }
    }
};

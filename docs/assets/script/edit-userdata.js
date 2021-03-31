
const applyChanges = function () {
    const name = document.editForm.name.value;
    const department = document.editForm.department.value;
    const schoolGrade = parseInt(document.editForm.schoolGrade.value);
    const studentNumber = parseInt(document.editForm.studentNumber.value);
    if (name === "") {
        alert("名前を入力してください");
        return;
    }
    if (!isNaN(studentNumber) && studentNumber <= 0) {
        alert("出席番号には正の値を使用してください");
        return;
    }

    userdata.name = name;
    userdata.department = department === "none" ? "" : department;
    userdata.schoolGrade = schoolGrade;
    userdata.studentNumber = isNaN(studentNumber) ? 0 : studentNumber;
    userdata.save("name", "department", "schoolGrade", "studentNumber");
    alert("変更が完了しました");
};

(function () {
    document.editForm.name.value = userdata.name;
    document.editForm.department.value = userdata.department === "" ? "none" : userdata.department;
    document.editForm.schoolGrade.value = userdata.schoolGrade;
    document.editForm.studentNumber.value = userdata.studentNumber == 0 ? "" : userdata.studentNumber;
})();


const start = function () {
    const userName = document.initForm.name.value;
    const userDepartment = document.initForm.department.value;
    const userSchoolGrade = parseInt(document.initForm.schoolGrade.value);
    const userStudentNumber = parseInt(document.initForm.studentNumber.value);
    if (userName === "") {
        alert("名前を入力してください");
        return;
    }
    if (!isNaN(userStudentNumber) && userStudentNumber <= 0) {
        alert("出席番号には正の値を使用してください");
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

    userdata.set("orgList", organizerList);
    userdata.set("qualList", qualificationList);

    userdata.set("department", userDepartment === "none" ? "" : userDepartment);
    userdata.set("schoolGrade", userSchoolGrade);
    userdata.set("studentNumber", isNaN(userStudentNumber) ? 0 : userStudentNumber);
    userdata.set("lastAccessTime", new Date().getTime());

    userdata.save();
    location.href = "/ikuhime/home";
};

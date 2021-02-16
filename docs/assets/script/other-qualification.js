
const registration = function () {
    const qualName = document.addition.qualification.value;
    if (qualName === "") {
        alert("資格･検定名、または大会名を入力してください");
        return;
    }
    const organizer = document.addition.organizer.value;
    const gradeName = document.addition.grade.value;
    const yearAndMonth = document.addition.month.value;
    const jc = parseInt(document.addition.jmClass.value);
    const jr = document.addition.jmRank.value;
    const kc = parseInt(document.addition.kgkClass.value);
    const kr = document.addition.kgkRank.value;
    const kp = document.addition.kgkPoint.value;
    const comment = document.addition.comment.value;
    const year = parseInt(yearAndMonth.substr(0, 4));
    const month = parseInt(yearAndMonth.substr(5, 2));
    const jmClass = jc === NaN ? "" : jc;
    const jmRank = jr === "none" ? "" : jr;
    const kgkClass = kc === NaN ? "" : kc;
    const kgkRank = kr === "none" ? "" : kr;
    const jmPoint = jmRankList[jmRank];
    const kgkPoint = kp === "none" ? 0 : parseInt(kp);

    const obtainedQual = new ObtainedQualification(null, null, year, month, organizer, qualName, jmClass, kgkClass, new Grade(gradeName, jmRank, kgkRank, kgkPoint));
    const sameJmQuals = userdata.quals.filter(function (qual) {
        return jmClass !== "" && qual.jmClass === jmClass;
    });
    const sameKgkQuals = userdata.quals.filter(function (qual) {
        return kgkClass !== "" && qual.kgkClass === kgkClass;
    });
    sameJmQuals.filter(function (qual) {
        return qual.grade.jmPoint < jmPoint;
    }).forEach(function (qual) {
        qual.jmEnable = false;
    });
    sameKgkQuals.filter(function (qual) {
        return qual.grade.kgkPoint < kgkPoint;
    }).forEach(function (qual) {
        qual.kgkEnable = false;
    });
    if (sameJmQuals.some(function (qual) {
        return qual.grade.jmPoint >= jmPoint;
    })) {
        obtainedQual.jmEnable = false;
    }
    if (sameKgkQuals.some(function (qual) {
        return qual.grade.kgkPoint >= kgkPoint;
    })) {
        obtainedQual.kgkEnable = false;
    }
    const insertionIndex = year === 0 ? 0 : userdata.quals.findIndex(function (qual) {
        return year > qual.year || year === qual.year && month > qual.month;
    });
    userdata.quals.splice(insertionIndex, 0, obtainedQual);
    userdata.exp = 500 + Math.max(jmPoint * 100, kgkPoint * 200);
    userdata.save("quals", "exp");
    if (comment !== "") {
        userdata.eventRecords.shift(new EventRecord(qualName + " " + gradeName, comment));
        userdata.save("eventRecords");
    }
    location.href = "/ikuhime/home";
};


const updateGrade = function () {
    const clone = document.addition.grade.cloneNode(false);
    const qualId = document.addition.qualification.value;
    if (qualId !== "") {
        qualificationList[qualId].grades.forEach(function (grade, index) {
            const op = document.createElement("option");
            op.value = index;
            op.textContent = grade.name === "" ? "-" : grade.name;
            clone.appendChild(op);
        });
    }
    document.addition.grade.parentNode.replaceChild(clone, document.addition.grade);
};

const update = function () {
    const clone = document.addition.qualification.cloneNode(false);
    const searchedText = document.addition.search.value;
    const orgId = document.addition.organizer.value;
    Object.entries(qualificationList).map(function (e) {
        return { id: e[0], qual: e[1] };
    }).filter(function (e) {
        return e.qual.name.search(searchedText) !== -1 && (orgId === "none" || e.qual.organizer === organizerList[orgId]);
    }).forEach(function (e) {
        const op = document.createElement("option");
        op.value = e.id;
        op.textContent = e.qual.name;
        clone.appendChild(op);
    });
    document.addition.qualification.parentNode.replaceChild(clone, document.addition.qualification);
    document.addition.qualification.addEventListener("change", updateGrade);

    updateGrade();
};

const registration = function () {
    const qualId = document.addition.qualification.value;
    if (qualId === "") {
        alert("資格･検定を選択してください");
        return;
    }
    const gradeId = parseInt(document.addition.grade.value);
    const yearAndMonth = document.addition.month.value;
    const comment = document.addition.comment.value;
    const year = yearAndMonth === "" ? 0 : parseInt(yearAndMonth.substr(0, 4));
    const month = yearAndMonth === "" ? 0 : parseInt(yearAndMonth.substr(5, 2));
    const obtainedQual = new ObtainedQualification(qualId, gradeId, year, month);
    const sameIdQuals = userdata.quals.filter(function (qual) {
        return qual.id === obtainedQual.id;
    });
    const sameQual = sameIdQuals.find(function (qual) {
        return qual.gradeId === obtainedQual.gradeId;
    });
    const lowerGradeQuals = sameIdQuals.filter(function (qual) {
        return qual.gradeId > obtainedQual.gradeId;
    });
    const saveComment = function () {
        if (comment !== "") {
            userdata.eventRecords.push(new EventRecord(obtainedQual.name + " " + obtainedQual.grade.name, comment));
            userdata.save("eventRecords");
        }
    };
    if (sameQual !== undefined) {
        if (confirm("この検定はすでに登録されています\n情報を更新しますか？")) {
            sameQual.year = year;
            sameQual.month = month;
            userdata.save("quals");
            saveComment();
            location.href = "/ikuhime/home";
        }
        return;
    }
    switch (obtainedQual.name) {
        case "基礎製図検定":
            if (userdata.quals.some(function (qual) {
                return qual.name === "機械製図検定";
            })) {
                obtainedQual.kgkEnable = false;
            }
            break;
        case "機械製図検定":
            userdata.quals.filter(function (qual) {
                return qual.name === "基礎製図検定";
            }).forEach(function (qual) {
                qual.kgkEnable = false;
            });
            break;
        case "危険物取扱者":
            obtainedQual.jmClass = [181, 182, 183, 184, 185, 186][
                1 + ["乙種１類", "乙種２類", "乙種３類", "乙種５類", "乙種６類"].indexOf(obtainedQual.grade.name)
            ];
            switch (obtainedQual.grade.name) {
                case "甲種":
                    sameIdQuals.forEach(function (qual) {
                        qual.jmEnable = false;
                    });
                    sameIdQuals.filter(function (qual) {
                        return qual.grade.kgkPoint < 8;
                    }).forEach(function (qual) {
                        qual.kgkEnable = false;
                    });
                    break;
                case "乙種４類":
                    sameIdQuals.filter(function (qual) {
                        return qual.grade.name === "丙種";
                    }).forEach(function (qual) {
                        qual.jmEnable = false;
                    });
                    break;
                case "丙種":
                    if (sameIdQuals.length > 0) {
                        obtainedQual.jmEnable = false;
                        obtainedQual.kgkEnable = false;
                    }
                    break;
            }
            if (obtainedQual.grade.name.search(/乙種?類/) === 0) {
                if (sameIdQuals.some(function (qual) {
                    return qual.grade.name === "甲種";
                })) {
                    obtainedQual.jmEnable = false;
                }
                const otsuCount = sameIdQuals.filter(function (qual) {
                    return qual.grade.name.search(/乙種?類/) === 0;
                }).length;
                if (otsuCount >= 1) {
                    obtainedQual.grade.kgkRank = "c";
                    obtainedQual.grade.kgkPoint = 3;
                    if (otsuCount >= 2) {
                        obtainedQual.kgkEnable = false;
                    }
                }
                sameIdQuals.filter(function (qual) {
                    return qual.grade.name === "丙種";
                }).forEach(function (qual) {
                    qual.kgkEnable = false;
                });
            }
            break;
        case "電気工事士":
            lowerGradeQuals.forEach(function (qual) {
                qual.jmEnable = false;
            });
            if (lowerGradeQuals.length < sameIdQuals.length) {
                obtainedQual.jmEnable = false;
            }
            break;
        default:
            lowerGradeQuals.forEach(function (qual) {
                qual.jmEnable = false;
                qual.kgkEnable = false;
            });
            if (lowerGradeQuals.length < sameIdQuals.length) {
                obtainedQual.jmEnable = false;
                obtainedQual.kgkEnable = false;
            }
            break;
    }
    const insertionIndex = year === 0 ? 0 : userdata.quals.findIndex(function (qual) {
        return year > qual.year || year === qual.year && month > qual.month;
    });
    userdata.quals.splice(insertionIndex, 0, obtainedQual);
    userdata.exp = 500 + Math.max(obtainedQual.grade.jmPoint * 100, obtainedQual.grade.kgkPoint * 200);
    userdata.save("quals", "exp");
    saveComment();
    location.href = "/ikuhime/home";
};

(function () {
    Object.entries(organizerList).map(function (e) {
        return { id: e[0], organizer: e[1] };
    }).forEach(function (e) {
        const op = document.createElement("option");
        op.value = e.id;
        op.textContent = e.organizer.name;
        document.addition.organizer.appendChild(op);
    });
    document.addition.search.addEventListener("change", update);
    document.addition.organizer.addEventListener("change", update);
    update();
})();

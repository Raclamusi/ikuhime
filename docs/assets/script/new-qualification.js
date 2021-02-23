
const updateGrade = function () {
    const clone = document.addition.grade.cloneNode(false);
    const qualId = document.addition.qualification.value;
    if (qualId !== "") {
        userdata.qualList[qualId].grades.forEach(function (grade, index) {
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
    Object.entries(userdata.qualList).map(function (e) {
        return { id: e[0], qual: e[1] };
    }).filter(function (e) {
        return e.qual.name.search(searchedText) !== -1 && (orgId === "none" || e.qual.orgId === orgId);
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
    const qualInfo = userdata.qualList[qualId];
    const gradeInfo = qualInfo.grades[gradeId];
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
            userdata.eventRecords.unshift(new EventRecord(qualInfo.name + " " + gradeInfo.name, comment));
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
    switch (obtainedQual.id) {
        case "kisoSeizu":  // 基礎製図検定
            if (userdata.quals.some(function (qual) {
                return qual.id === "kikaiSeizu";
            })) {
                obtainedQual.kgkEnable = false;
            }
            break;
        case "kikaiSeizu":  // 機械製図検定
            userdata.quals.filter(function (qual) {
                return qual.id === "kisoSeizu";
            }).forEach(function (qual) {
                qual.kgkEnable = false;
            });
            break;
        case "kikembutsu":  // 危険物取扱者
            const otsuGrades = qualInfo.grades.filter(function (grade) {
                return grade.name.startsWith("乙種");
            });
            const bestOtsuGrade = otsuGrades.reduce(function (bestGrade, grade) {
                return grade.kgkPoint > bestGrade.kgkPoint ? grade : bestGrade;
            });
            const heiGrade = qualInfo.grades.find(function (grade) {
                return grade.name ===  "丙種";
            });
            obtainedQual.jmClass = [181, 182, 183, 184, 185, 186][
                1 + ["乙種１類", "乙種２類", "乙種３類", "乙種５類", "乙種６類"].indexOf(gradeInfo.name)
            ];
            switch (gradeInfo.name) {
                case "甲種":
                    sameIdQuals.forEach(function (qual) {
                        qual.jmEnable = false;
                    });
                    sameIdQuals.filter(function (qual) {
                        return qualInfo.grades[qual.gradeId].kgkPoint < bestOtsuGrade.kgkPoint;
                    }).forEach(function (qual) {
                        qual.kgkEnable = false;
                    });
                    break;
                case "乙種４類":
                    sameIdQuals.filter(function (qual) {
                        return qualInfo.grades[qual.gradeId].name === "丙種";
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
            if (gradeInfo.name.startsWith("乙種")) {
                if (sameIdQuals.some(function (qual) {
                    return qualInfo.grades[qual.gradeId].name === "甲種";
                })) {
                    obtainedQual.jmEnable = false;
                }
                const otsuCount = sameIdQuals.filter(function (qual) {
                    return qualInfo.grades[qual.gradeId].name.startsWith("乙種");
                }).length;
                if (otsuCount === 0) {
                    gradeInfo.kgkRank = bestOtsuGrade.kgkRank;
                    gradeInfo.kgkPoint = bestOtsuGrade.kgkPoint;
                    if (heiGrade !== undefined) {
                        otsuGrades.filter(function (grade) {
                            return grade.name !== gradeInfo.name;
                        }).forEach(function (grade) {
                            grade.kgkRank = heiGrade.kgkRank;
                            grade.kgkPoint = heiGrade.kgkPoint;
                        });
                    }
                }
                else if (otsuCount >= 2) {
                    obtainedQual.kgkEnable = false;
                }
                sameIdQuals.filter(function (qual) {
                    return qualInfo.grades[qual.gradeId].name === "丙種";
                }).forEach(function (qual) {
                    qual.kgkEnable = false;
                });
            }
            break;
        case "denkiKoji":  // 電気工事士
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
    userdata.exp = 500 + Math.max(gradeInfo.jmPoint * 100, gradeInfo.kgkPoint * 200);
    userdata.save("quals", "exp", "qualList");
    saveComment();
    location.href = "/ikuhime/home";
};

(function () {
    Object.entries(userdata.orgList).map(function (e) {
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

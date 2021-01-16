
function updateGrade() {
    var clone = document.addition.grade.cloneNode(false);
    var ql = document.addition.qualification.value;
    if (ql !== "") {
        var grades = qualificationList[ql].grades;
        for (var i = 0; i < grades.length; i++) {
            var v = grades[i];
            var op = document.createElement("option");
            op.value = i;
            if (v.name === "") {
                op.textContent = "-";
            }
            else {
                op.textContent = v.name;
            }
            clone.appendChild(op);
        }
    }
    document.addition.grade.parentNode.replaceChild(clone, document.addition.grade);
}

function update() {
    var clone = document.addition.qualification.cloneNode(false);
    var sr = document.addition.search.value;
    var og = document.addition.organizer.value;
    var k = Object.keys(qualificationList);
    for (var i = 0; i < k.length; i++) {
        var v = qualificationList[k[i]];
        if ((sr === "" || v.name.search(sr) != -1) && (og === "none" || v.organizer === organizerList[og])) {
            var op = document.createElement("option");
            op.value = k[i];
            op.textContent = v.name;
            clone.appendChild(op);
        }
    }
    document.addition.qualification.parentNode.replaceChild(clone, document.addition.qualification);
    document.addition.qualification.addEventListener("change", updateGrade);
    
    updateGrade();
}

function registration() {
    var qual = document.addition.qualification.value;
    if (qual === "") {
        window.alert("資格･検定を選択してください");
        return;
    }
    var grade = parseInt(document.addition.grade.value);
    var mon = document.addition.month.value;
    var com = document.addition.comment.value;
    var year = mon === "" ? 0 : parseInt(mon.substr(0, 4));
    var month = mon === "" ? 0 : parseInt(mon.substr(5, 2));
    var q = qualificationList[qual];
    var g = q.grades[grade];
    var nq = new ObtainedQualification(qual, grade, q.organizer.name, q.name, q.jmClass, q.kgkClass, g, year, month);
    var otsuCount = 0;
    var index = null;
    if (q.name === "危険物取扱者") {
        if (g.name === "乙種１類") nq.jmClass = 182;
        else if (g.name === "乙種２類") nq.jmClass = 183;
        else if (g.name === "乙種３類") nq.jmClass = 184;
        else if (g.name === "乙種５類") nq.jmClass = 185;
        else if (g.name === "乙種６類") nq.jmClass = 186;
    }
    for (var i = 0; i < userdata.quals.length; i++) {
        var v = userdata.quals[i];
        if (index === null) {
            if (year > v.year || (year == v.year && month > v.month)) {
                index = i;
            }
        }
        if (q.name === "基礎製図検定") {
            if (v.name === "機械製図検定") {
                nq.kgkEnable = false;
            }
        }
        else if (q.name === "機械製図検定") {
            if (v.name === "基礎製図検定") {
                userdata.quals[i].kgkEnable = false;
            }
        }
        if (v.id === qual) {
            if (v.gradeId == grade) {
                if (window.confirm("この検定はすでに登録されています\n情報を更新しますか？")) {
                    userdata.quals[i].year = year;
                    userdata.quals[i].month = month;
                    nq = null;
                    break;
                }
                else {
                    return;
                }
            }
            else if (q.name === "危険物取扱者") {
                if (g.name === "乙種４類") {
                    if (v.grade.name === "丙種") {
                        userdata.quals[i].jmEnable = false;
                    }
                }
                if (g.name === "甲種") {
                    userdata.quals[i].jmEnable = false;
                    if (v.grade.kgkPoint != 8) {
                        userdata.quals[i].kgkEnable = false;
                    }
                }
                else if (g.name.match(/乙種/) !== null) {
                    if (v.grade.name === "甲種") {
                        nq.jmEnable = false;
                    }
                    else if (v.grade.name.match(/乙種/) !== null) {
                        otsuCount++;
                        if (otsuCount == 1) {
                            nq.grade = JSON.parse(JSON.stringify(g));
                            nq.grade.kgkRank = "c";
                            nq.grade.kgkPoint = 3;
                        }
                        else if (otsuCount == 2) {
                            nq.kgkEnable = false;
                        }
                    }
                    else {
                        userdata.quals[i].kgkEnable = false;
                    }
                }
                else {
                    nq.jmEnable = false;
                    nq.kgkEnable = false;
                }
            }
            else if (v.gradeId > grade) {
                userdata.quals[i].jmEnable = false;
                if (q.name !== "電気工事士") {
                    userdata.quals[i].kgkEnable = false;
                }
            }
            else {
                nq.jmEnable = false;
                if (q.name !== "電気工事士") {
                    nq.kgkEnable = false;
                }
            }
        }
    }
    if (nq !== null) {
        if (index === null) {
            userdata.quals.push(nq);
        }
        else {
            userdata.quals.splice(index, 0, nq);
        }
    }
    if (com !== "") {
        userdata.eventRecords.push(new EventRecord(q.name + " " + g.name, com));
    }
    userdata.exp = 500 + Math.max(g.jmPoint * 100, g.kgkPoint * 200);
    userdata.save();
    location.href = "/ikuhime/home";
}

window.addEventListener("load", function () {
    var k = Object.keys(organizerList);
    for (var i = 0; i < k.length; i++) {
        var v = organizerList[k[i]];
        var op = document.createElement("option");
        op.value = k[i];
        op.textContent = v.name;
        document.addition.organizer.appendChild(op);
    }
    update();
});

document.addition.search.addEventListener("change", update);
document.addition.organizer.addEventListener("change", update);

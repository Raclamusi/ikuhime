
function registration() {
    var ql = document.addition.qualification.value;
    if (ql === "") {
        window.alert("資格･検定名、または大会名を入力してください");
        return;
    }
    var or = document.addition.organizer.value;
    var gr = document.addition.grade.value;
    var mn = document.addition.month.value;
    var jc = parseInt(document.addition.jmClass.value);
    var jr = document.addition.jmRank.value;
    var kc = parseInt(document.addition.kgkClass.value);
    var kr = document.addition.kgkRank.value;
    var kp = document.addition.kgkPoint.value;
    var cm = document.addition.comment.value;
    var year = parseInt(mn.substr(0, 4));
    var month = parseInt(mn.substr(5, 2));
    var jmClass = jc === NaN ? "" : jc;
    var jmRank = jr === "none" ? "" : jr;
    var kgkClass = kc === NaN ? "" : kc;
    var kgkRank = kr === "none" ? "" : kr;
    var jmPoint = jmRankList[jmRank];
    var kgkPoint = kp === "none" ? 0 : parseInt(kp);
    
    var nq = new ObtainedQualification(null, null, or, ql, jmClass, kgkClass, new Grade(gr, jmRank, kgkRank, kgkPoint), year, month);
    var index = null;
    for (var i = 0; i < userdata.quals.length; i++) {
        var v = userdata.quals[i];
        if (index === null) {
            if (year > v.year || year == v.year && month > v.month) {
                index = i;
            }
        }
        if (jc != NaN && v.jmClass === jc) {
            if (v.grade.jmPoint < jmPoint) {
                userdata.quals[i].jmEnable = false;
            }
            else if (v.grade.jmPoint > jmPoint) {
                nq.jmEnable = false;
            }
        }
        if (kc != NaN && v.kgkClass === kc) {
            if (v.grade.kgkPoint < kgkPoint) {
                userdata.quals[i].kgkEnable = false;
            }
            else if (v.grade.kgkPoint > kgkPoint) {
                nq.kgkEnable = false;
            }
        }
    }
    if (index === null) {
        userdata.quals.push(nq);
    }
    else {
        userdata.quals.splice(index, 0, nq);
    }
    if (cm !== "") {
        userdata.eventRecords.push(new EventRecord(ql + " " + gr, cm));
    }
    userdata.exp = 500 + Math.max(jmPoint * 100, kgkPoint * 200);
    userdata.save();
    location.href = "/ikuhime/home";
}

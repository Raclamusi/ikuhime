﻿
(function () {
    const getEraName = function (year, month) {
        const eras = [
            { name: "昭和", year: 1926, month: 12 },
            { name: "平成", year: 1989, month: 1 },
            { name: "令和", year: 2019, month: 5 },
            { name: "terminator", year: Infinity, month: Infinity }
        ];
        const era = eras[-1 + eras.findIndex(function (e) {
            return year < e.year || (year === e.year && month < e.month);
        })];
        if (era === undefined) {
            return eras[0].name + "より前には対応していません（西暦" + year + "年" + month + "月）";
        }
        const y = year - era.year + 1;
        return era.name + (y == 1 ? "元" : y) + "年" + month + "月";
    };

    document.getElementById("department").textContent = {
        M1: "機械科１組", M2: "機械科２組", E: "電気科", C: "工業化学科",
        D: "デザイン科", W: "溶接科", R: "電子機械科", "": "",
    }[userdata.department];
    document.getElementById("school-grade").textContent = [
        "", "１年生", "２年生", "３年生", "卒業生",
    ][userdata.schoolGrade];
    document.getElementById("student-number").textContent = userdata.studentNumber ? userdata.studentNumber + "番" : "";
    document.getElementById("name").textContent = userdata.name;

    document.getElementById("switch-userdata").addEventListener("click", function () {
        const profile = document.getElementById("profile");
        profile.style.display = profile.style.display === "none" ? "" : "none";
    });

    document.getElementById("print").addEventListener("click", function () {
        print();
    });

    const table = document.getElementById("table");
    const jmPointSpan = document.getElementById("jm-point");
    const jmPrizeSpan = document.getElementById("jm-prize");
    const kgkPointSpan = document.getElementById("kgk-point");
    const kgkPrizeSpan = document.getElementById("kgk-prize");
    userdata.quals.forEach(function (qual) {
        const qualInfo = userdata.qualList[qual.id];
        const gradeInfo = findGrade(qual.id, qual.gradeId);
        const orgInfo = userdata.orgList[qualInfo.orgId];
        const row = document.createElement("tr");
        const month = document.createElement("td");
        const org = document.createElement("td");
        const name = document.createElement("td");
        const jm = document.createElement("td");
        const kgk = document.createElement("td");
        const jmp = document.createElement("td");
        const kgkp = document.createElement("td");
        month.textContent = [qual.year, qual.month].some(function (e) {
            return [0, null].includes(e);
        }) ? "未設定" : getEraName(qual.year, qual.month);
        org.textContent = orgInfo.name;
        name.textContent = qualInfo.name + " " + gradeInfo.name;
        jm.textContent = qualInfo.jmClass === "" ? "未設定" : qualInfo.jmClass + gradeInfo.jmRank;
        kgk.textContent = qualInfo.kgkClass === "" ? "未設定" : qualInfo.kgkClass + gradeInfo.kgkRank;
        jmp.textContent = gradeInfo.jmPoint;
        kgkp.textContent = gradeInfo.kgkPoint;
        if (!qual.jmEnable) {
            jm.classList.add("gray-item");
            jmp.classList.add("gray-item");
        }
        if (!qual.kgkEnable) {
            kgk.classList.add("gray-item");
            kgkp.classList.add("gray-item");
        }
        row.appendChild(month);
        row.appendChild(org);
        row.appendChild(name);
        row.appendChild(jm);
        row.appendChild(kgk);
        row.appendChild(jmp);
        row.appendChild(kgkp);
        table.appendChild(row);
    });
    const jmTotal = userdata.quals.reduce(function (total, qual) {
        return total + (qual.jmEnable ? findGrade(qual.id, qual.gradeId).jmPoint : 0);
    }, 0);
    const kgkTotal = userdata.quals.reduce(function (total, qual) {
        return total + (qual.kgkEnable ? findGrade(qual.id, qual.gradeId).kgkPoint : 0);
    }, 0);
    jmPointSpan.textContent = jmTotal;
    jmPrizeSpan.textContent = jmTotal >= 45 ? "ゴールド！" : jmTotal >= 30 ? "シルバー" : jmTotal >= 20 ? "ブロンズ" : "";
    jmPrizeSpan.style.color = jmPrizeSpan.style.borderColor = jmTotal >= 45 ? "#ffbb00" : jmTotal >= 30 ? "#aaaaaa" : jmTotal >= 20 ? "#bb7733" : "#000000";
    jmPrizeSpan.style.borderWidth = jmTotal >= 20 ? "3px" : "";
    kgkPointSpan.textContent = kgkTotal;
    kgkPrizeSpan.textContent = kgkTotal >= 60 ? "金賞！" : kgkTotal >= 40 ? "銀賞" : kgkTotal >= 20 ? "顕彰" : "";
    kgkPrizeSpan.style.color = kgkPrizeSpan.style.borderColor = kgkTotal >= 60 ? "#ffbb00" : kgkTotal >= 40 ? "#aaaaaa" : kgkTotal >= 20 ? "#bb7733" : "#000000";
    kgkPrizeSpan.style.borderWidth = kgkTotal >= 20 ? "3px" : "";
})();


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

(function () {
    const table = document.getElementById("table");
    const jmPointSpan = document.getElementById("jm-point");
    const jmPrizeSpan = document.getElementById("jm-prize");
    const kgkPointSpan = document.getElementById("kgk-point");
    const kgkPrizeSpan = document.getElementById("kgk-prize");
    userdata.quals.forEach(function (qual) {
        const row = document.createElement("tr");
        const month = document.createElement("td");
        const org = document.createElement("td");
        const name = document.createElement("td");
        const jm = document.createElement("td");
        const kgk = document.createElement("td");
        const jmp = document.createElement("td");
        const kgkp = document.createElement("td");
        month.textContent = [0, null].includes(qual.month) ? "未設定" : getEraName(qual.year, qual.month);
        org.textContent = qual.organizer;
        name.textContent = qual.name + " " + qual.grade.name;
        jm.textContent = qual.jmClass === null ? "未設定" : qual.jmClass + qual.grade.jmRank;
        kgk.textContent = qual.kgkClass === null ? "未設定" : qual.kgkClass + qual.grade.kgkRank;
        jmp.textContent = qual.grade.jmPoint + "";
        kgkp.textContent = qual.grade.kgkPoint + "";
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
        return total + qual.jmEnable ? qual.grade.jmPoint : 0;
    }, 0);
    const kgkTotal = userdata.quals.reduce(function (total, qual) {
        return total + qual.kgkEnable ? qual.grade.kgkPoint : 0;
    }, 0);
    jmPointSpan.textContent = jmTotal + "";
    jmPrizeSpan.textContent = jmTotal >= 45 ? "ゴールド！" : jmTotal >= 30 ? "シルバー" : jmTotal >= 20 ? "ブロンズ" : "";
    jmPrizeSpan.style.color = jmTotal >= 45 ? "#ffbb00" : jmTotal >= 30 ? "#aaaaaa" : jmTotal >= 20 ? "#bb7733" : "#000000";
    kgkPointSpan.textContent = kgkTotal + "";
    kgkPrizeSpan.textContent = kgkTotal >= 60 ? "金賞！" : kgkTotal >= 40 ? "銀賞" : kgkTotal >= 20 ? "顕彰" : "";
    kgkPrizeSpan.style.color = kgkTotal >= 60 ? "#ffbb00" : kgkTotal >= 40 ? "#aaaaaa" : kgkTotal >= 20 ? "#bb7733" : "#000000";
})();

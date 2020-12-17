
function WtoJ(year, month) {
    if (year < 1989) {
        var y = year - 1925
        return "昭和" + (y == 1 ? "元" : y) + "年";
    }
    if (year < 2019 || (year == 2019 && month < 5)) {
        var y = year - 1988;
        return "平成" + (y == 1 ? "元" : y) + "年";
    }
    var y = year - 2018;
    return "令和" + (y == 1 ? "元" : y) + "年";
}

window.addEventListener("load", function () {
    var table = document.getElementById("table");
    var quals = savedata.quals;
    for (var i = 0; i < quals.length; i++) {
        var q = quals[i];
        var row = document.createElement("tr");
        var month = document.createElement("td");
        var org = document.createElement("td");
        var name = document.createElement("td");
        var jm = document.createElement("td");
        var kgk = document.createElement("td");
        var jmp = document.createElement("td");
        var kgkp = document.createElement("td");
        month.textContent = (q.month == 0 || q.month === null) ? "未設定" : WtoJ(q.year, q.month) + q.month + "月";
        org.textContent = q.organizer;
        name.textContent = q.name + " " + q.grade.name;
        jm.textContent = q.jmClass + q.grade.jmRank;
        kgk.textContent = q.kgkClass + q.grade.kgkRank;
        jmp.textContent = q.grade.jmPoint + "";
        kgkp.textContent = q.grade.kgkPoint + "";
        if (!q.jmEnable) {
            jm.classList.add("gray-item");
            jmp.classList.add("gray-item");
        }
        if (!q.kgkEnable) {
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
    }
});

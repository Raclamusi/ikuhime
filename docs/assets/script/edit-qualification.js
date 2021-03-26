
(function () {
    const orgTable = document.getElementById("org-table");
    const orgNameInput = document.getElementById("org-name");
    const orgAddButton = document.getElementById("org-add");

    const qualTable = document.getElementById("qual-table");
    const qualNameInput = document.getElementById("qual-name");
    const qualOrgSelect = document.getElementById("qual-org");
    const qualJmInput = document.getElementById("qual-jm-class");
    const qualKgkInput = document.getElementById("qual-kgk-class");
    const qualAddButton = document.getElementById("qual-add");
    const qualOrgElementList = [];

    const gradeSearchNameInput = document.getElementById("grade-search-name");
    const gradeSearchOrgSelect = document.getElementById("grade-search-org");
    const gradeQualSelect = document.getElementById("grade-qual");
    const gradeTable = document.getElementById("grade-table");
    const gradeNameInput = document.getElementById("grade-name");
    const gradeJmRankSelect = document.getElementById("grade-jm-rank");
    const gradeKgkRankSelect = document.getElementById("grade-kgk-rank");
    const gradeJmPointSpan = document.getElementById("grade-jm-point");
    const gradeKgkPointSelect = document.getElementById("grade-kgk-point");
    const gradeAddButton = document.getElementById("grade-add");

    const addOrgOption = function (id, org) {
        const op = document.createElement("option");
        op.value = id;
        op.textContent = org.name;
        qualOrgSelect.appendChild(op);
        gradeSearchOrgSelect.appendChild(op.cloneNode(true));
    };
    const editOrgOption = function (id, org) {
        const targetElements = qualOrgElementList.filter(function (e) {
            return userdata.qualList[e.id].orgId === id;
        });
        targetElements.filter(function (e) {
            return e.org.firstChild.nodeName === "#text";
        }).forEach(function (e) {
            e.org.textContent = org.name;
        });
        targetElements.filter(function (e) {
            return e.org.firstChild.nodeName === "SELECT";
        }).map(function (e) {
            return Array.from(e.org.firstChild.childNodes);
        }).forEach(function (options) {
            options.find(function (op) {
                return op.nodeName === "OPTION" && op.value === id;
            }).textContent = org.name;
        });
        [qualOrgSelect, gradeSearchOrgSelect].map(function (select) {
            return Array.from(select.childNodes);
        }).forEach(function (options) {
            options.find(function (op) {
                return op.nodeName === "OPTION" && op.value === id;
            }).textContent = org.name;
        });
    };
    const removeOrgOption = function (id) {
        [qualOrgSelect, gradeSearchOrgSelect].map(function (select) {
            return Array.from(select.childNodes);
        }).forEach(function (options) {
            options.find(function (op) {
                return op.nodeName === "OPTION" && op.value === id;
            }).remove();
        });
    };

    const addQualOption = function (id, qual) {
        const op = document.createElement("option");
        op.value = id;
        op.textContent = qual.name;
        gradeQualSelect.appendChild(op);
    };
    const editQualOption = function (id, qual) {
        Array.from(gradeQualSelect.childNodes).find(function (op) {
            return op.nodeName === "OPTION" && op.value === id;
        }).textContent = qual.name;
    };
    const removeQualOption = function (id) {
        Array.from(gradeQualSelect.childNodes).find(function (op) {
            return op.nodeName === "OPTION" && op.value === id;
        }).remove();
    };

   
    const addOrg = function (id, org) {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const func = document.createElement("td");
        const edit = document.createElement("button");
        const del = document.createElement("button");

        const setTextContent = function () {
            name.textContent = org.name;
        };

        setTextContent();
        edit.textContent = "編集";
        edit.addEventListener("click", function () {
            if (edit.textContent === "確定") {
                const nameInput = name.firstChild;
                if (nameInput.value === "") {
                    alert("主催の名前を入力してください");
                    return;
                }
                edit.textContent = "編集";
                org.name = nameInput.value;
                nameInput.remove();
                setTextContent();
                userdata.save("orgList");
                editOrgOption(id, org);
                return;
            }
            edit.textContent = "確定";
            const nameInput = orgNameInput.cloneNode(true);
            nameInput.value = org.name;
            name.textContent = "";
            name.appendChild(nameInput);
        });
        del.textContent = "削除";
        del.addEventListener("click", function () {
            const qualsReferringThis = Object.values(userdata.qualList).filter(function (qual) {
                return qual.orgId === id;
            });
            if (qualsReferringThis.length > 0) {
                alert(qualsReferringThis.reduce(function (msg, qual) {
                    return msg + "\n「" + qual.name + "」";
                }, "この主催情報を参照している資格･検定があるので削除できません"));
                return;
            }
            if (confirm("主催情報「" + org.name + "」を削除します")) {
                delete userdata.orgList[id];
                row.remove();
                userdata.save("orgList");
                removeOrgOption(id);
            }
        });

        func.appendChild(edit);
        func.appendChild(del);
        row.appendChild(name);
        row.appendChild(func);
        orgTable.appendChild(row);
        
        addOrgOption(id, org);
    };

    Object.entries(userdata.orgList).map(function (e) {
        return { id: e[0], org: e[1] };
    }).forEach(function (e) {
        addOrg(e.id, e.org);
    });

    orgAddButton.addEventListener("click", function () {
        if (orgNameInput.value === "") {
            alert("主催の名前を入力してください");
            return;
        }

        const ids = Object.keys(userdata.orgList).map(function (id) {
            return parseInt(id);
        }).filter(function (id) {
            return !isNaN(id);
        }).sort(function (id1, id2) {
            return id1 - id2;
        });
        ids.push(-1);
        const id = ids.findIndex(function (id, index) {
            return id !== index;
        });
        userdata.orgList[id] = new Organizer(orgNameInput.value);
        orgNameInput.value = "";
        userdata.save("orgList");
        addOrg(id + "", userdata.orgList[id]);
    });
 

    const addQual = function (id, qual) {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const organizer = document.createElement("td");
        const jmClass = document.createElement("td");
        const kgkClass = document.createElement("td");
        const func = document.createElement("td");
        const edit = document.createElement("button");
        const del = document.createElement("button");

        qualOrgElementList.push({ id: id, org: organizer });

        const setTextContent = function () {
            name.textContent = qual.name;
            organizer.textContent = userdata.orgList[qual.orgId].name;
            jmClass.textContent = qual.jmClass === "" ? "未設定" : qual.jmClass;
            kgkClass.textContent = qual.kgkClass === "" ? "未設定" : qual.kgkClass;
        };

        setTextContent();
        edit.textContent = "編集";
        edit.addEventListener("click", function () {
            if (edit.textContent === "確定") {
                const nameInput = name.firstChild;
                const orgSelect = organizer.firstChild;
                const jmInput = jmClass.firstChild;
                const kgkInput = kgkClass.firstChild;
                if (nameInput.value === "") {
                    alert("資格･検定の名前を入力してください");
                    return;
                }
                edit.textContent = "編集";
                const jm = parseInt(jmInput.value);
                const kgk = parseInt(kgkInput.value);
                qual.name = nameInput.value;
                qual.orgId = orgSelect.value;
                qual.jmClass = isNaN(jm) ? "" : jm;
                qual.kgkClass = isNaN(kgk) ? "" : kgk;
                nameInput.remove();
                organizer.removeChild(orgSelect);
                jmInput.remove();
                kgkInput.remove();
                setTextContent();
                userdata.save("qualList");
                editQualOption(id, qual);
                return;
            }
            edit.textContent = "確定";
            const nameInput = qualNameInput.cloneNode(true);
            const orgSelect = qualOrgSelect.cloneNode(true);
            const jmInput = qualJmInput.cloneNode(true);
            const kgkInput = qualKgkInput.cloneNode(true);
            Array.from(orgSelect.childNodes).find(function (op) {
                return op.nodeName === "OPTION" && op.value === "none";
            }).remove();
            nameInput.value = qual.name;
            orgSelect.value = qual.orgId;
            jmInput.value = qual.jmClass;
            kgkInput.value = qual.kgkClass;
            name.textContent = "";
            organizer.textContent = "";
            jmClass.textContent = "";
            kgkClass.textContent = "";
            name.appendChild(nameInput);
            organizer.appendChild(orgSelect);
            jmClass.appendChild(jmInput);
            kgkClass.appendChild(kgkInput);
        });
        del.textContent = "削除";
        del.addEventListener("click", function () {
            if (userdata.quals.some(function (qual) {
                return qual.id === id;
            })) {
                alert("この資格･検定を取得しているので削除できません");
                return;
            }
            if (confirm("資格･検定情報「" + qual.name + "」を削除します")) {
                delete userdata.qualList[id];
                row.remove();
                userdata.save("qualList");
                const removingIndex = qualOrgElementList.findIndex(function (e) {
                    return e.id === id;
                });
                qualOrgElementList.splice(removingIndex, 1);
                removeQualOption(id);
            }
        });

        func.appendChild(edit);
        func.appendChild(del);
        row.appendChild(name);
        row.appendChild(organizer);
        row.appendChild(jmClass);
        row.appendChild(kgkClass);
        row.appendChild(func);
        qualTable.appendChild(row);
        
        addQualOption(id, qual);
    };

    Object.entries(userdata.qualList).map(function (e) {
        return { id: e[0], qual: e[1] };
    }).forEach(function (e) {
        addQual(e.id, e.qual);
    });

    qualAddButton.addEventListener("click", function () {
        if (qualNameInput.value === "") {
            alert("資格･検定の名前を入力してください");
            return;
        }
        if (qualOrgSelect.value === "none") {
            alert("主催を選択してください");
            return;
        }

        const ids = Object.keys(userdata.qualList).map(function (id) {
            return parseInt(id);
        }).filter(function (id) {
            return !isNaN(id);
        }).sort(function (id1, id2) {
            return id1 - id2;
        });
        ids.push(-1);
        const id = ids.findIndex(function (id, index) {
            return id !== index;
        });
        const jm = parseInt(qualJmInput.value);
        const kgk = parseInt(qualKgkInput.value);
        userdata.qualList[id] = new Qualification(
            qualNameInput.value,
            qualOrgSelect.value,
            isNaN(jm) ? "" : jm,
            isNaN(kgk) ? "" : kgk,
            [new Grade("", "", "", 0)]
        );
        qualNameInput.value = "";
        qualOrgSelect.value = "none";
        qualJmInput.value = "";
        qualKgkInput.value = "";
        userdata.save("qualList");
        addQual(id + "", userdata.qualList[id]);
    });


    const addGrade = function (id, grade, index, parentQualId) {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const jmRank = document.createElement("td");
        const kgkRank = document.createElement("td");
        const jmPoint = document.createElement("td");
        const kgkPoint = document.createElement("td");
        const func = document.createElement("td");
        const up = document.createElement("button");
        const down = document.createElement("button");
        const edit = document.createElement("button");
        const del = document.createElement("button");
        
        const parentQual = userdata.qualList[parentQualId];

        const setTextContent = function () {
            name.textContent = grade.name;
            jmRank.textContent = grade.jmRank === "" ? "未設定" : grade.jmRank;
            kgkRank.textContent = grade.kgkRank === "" ? "未設定" : grade.kgkRank;
            jmPoint.textContent = grade.jmPoint;
            kgkPoint.textContent = grade.kgkPoint;
        };
        const swapGrade = function (off) {
            parentQual.grades.splice(index, 1);
            parentQual.grades.splice(index + off, 0, grade);
            userdata.save("qualList");
            updateGrades();
        };

        setTextContent();
        up.textContent = "↑";
        up.disabled = index === 0;
        if (!up.disabled) {
            up.addEventListener("click", function () {
                swapGrade(-1);
            });
        }
        down.textContent = "↓";
        down.disabled = index === parentQual.grades.length - 1;
        if (!down.disabled) {
            down.addEventListener("click", function () {
                swapGrade(1);
            });
        }
        edit.textContent = "編集";
        edit.addEventListener("click", function () {
            if (edit.textContent === "確定") {
                edit.textContent = "編集";
                const nameInput = name.firstChild;
                const jmRankSelect = jmRank.firstChild;
                const kgkRankSelect = kgkRank.firstChild;
                const jmPointSpan = jmPoint.firstChild;
                const kgkPointSelect = kgkPoint.firstChild;
                const jmr = jmRankSelect.value === "none" ? "" : jmRankSelect.value;
                const kgkr = kgkRankSelect.value === "none" ? "" : kgkRankSelect.value;
                grade.name = nameInput.value;
                grade.jmRank = jmr;
                grade.kgkRank = kgkr;
                grade.jmPoint = jmRankList[jmr];
                grade.kgkPoint = parseInt(kgkPointSelect.value);
                nameInput.remove();
                jmRank.removeChild(jmRankSelect);
                kgkRank.removeChild(kgkRankSelect);
                jmPointSpan.remove();
                kgkPoint.removeChild(kgkPointSelect);
                setTextContent();
                userdata.save("qualList");
                return;
            }
            edit.textContent = "確定";
            const nameInput = gradeNameInput.cloneNode(true);
            const jmRankSelect = gradeJmRankSelect.cloneNode(true);
            const kgkRankSelect = gradeKgkRankSelect.cloneNode(true);
            const jmPointSpan = gradeJmPointSpan.cloneNode(true);
            const kgkPointSelect = gradeKgkPointSelect.cloneNode(true);
            jmRankSelect.addEventListener("change", function () {
                const rank = jmRankSelect.value;
                jmPointSpan.textContent = rank === "none" ? "-" : jmRankList[rank];
            });
            nameInput.value = grade.name;
            jmRankSelect.value = grade.jmRank;
            kgkRankSelect.value = grade.kgkRank;
            jmPointSpan.textContent = grade.jmPoint;
            kgkPointSelect.value = grade.kgkPoint;
            name.textContent = "";
            jmRank.textContent = "";
            kgkRank.textContent = "";
            jmPoint.textContent = "";
            kgkPoint.textContent = "";
            name.appendChild(nameInput);
            jmRank.appendChild(jmRankSelect);
            kgkRank.appendChild(kgkRankSelect);
            jmPoint.appendChild(jmPointSpan);
            kgkPoint.appendChild(kgkPointSelect);
        });
        del.textContent = "削除";
        del.disabled = parentQual.grades.length === 1;
        if (!del.disabled) {
            del.addEventListener("click", function () {
                if (userdata.quals.some(function (qual) {
                    return qual.id === parentQualId && qual.gradeId === id;
                })) {
                    alert("この級を取得しているので削除できません");
                    return;
                }
                if (confirm("級情報「" + parentQual.name + " " + grade.name + "」を削除します")) {
                    parentQual.grades.splice(index, 1);
                    userdata.save("qualList");
                    updateGrades();
                }
            });
        }

        func.appendChild(up);
        func.appendChild(down);
        func.appendChild(edit);
        func.appendChild(del);
        row.appendChild(name);
        row.appendChild(jmRank);
        row.appendChild(kgkRank);
        row.appendChild(jmPoint);
        row.appendChild(kgkPoint);
        row.appendChild(func);
        gradeTable.appendChild(row);
    };

    gradeJmRankSelect.addEventListener("change", function () {
        const rank = gradeJmRankSelect.value;
        gradeJmPointSpan.textContent = rank === "none" ? "-" : jmRankList[rank];
    });

    gradeAddButton.addEventListener("click", function () {
        if (gradeQualSelect.value === "") {
            alert("検定･資格を選択してください");
            return;
        }
        if (gradeNameInput.value === "") {
            alert("級の名前を入力してください");
            return;
        }

        const qual = userdata.qualList[gradeQualSelect.value];
        const grades = qual.grades;
        const ids = grades.map(function (grade) {
            return parseInt(grade.id);
        }).filter(function (id) {
            return !isNaN(id);
        }).sort(function (id1, id2) {
            return id1 - id2;
        });
        ids.push(-1);
        const id = ids.findIndex(function (id, index) {
            return id !== index;
        });
        const jmRank = gradeJmRankSelect.value === "none" ? "" : gradeJmRankSelect.value;
        const kgkRank = gradeKgkRankSelect.value === "none" ? "" : gradeKgkRankSelect.value;
        const jmPoint = jmRankList[jmRank];
        const kgkPoint = parseInt(gradeKgkPointSelect.value);
        const index = grades.findIndex(function (grade) {
            return grade.jmPoint < jmPoint || (grade.jmPoint === jmPoint && grade.kgkPoint < kgkPoint);
        });
        grades.splice(index < 0 ? grades.length : index, 0, new Grade(
            gradeNameInput.value,
            jmRank,
            kgkRank,
            kgkPoint,
            id + ""
        ));
        gradeNameInput.value = "";
        gradeJmRankSelect.value = "none";
        gradeKgkRankSelect.value = "none";
        gradeJmPointSpan.textContent = "-";
        gradeKgkPointSelect.value = "0";
        userdata.save("qualList");
        updateGrades();
    });

    const updateGrades = function () {
        if (gradeQualSelect.value === "") {
            return;
        }
        const qual = userdata.qualList[gradeQualSelect.value];
        Array.from(gradeTable.childNodes).forEach(function (row) {
            row.remove();
        });
        qual.grades.forEach(function (grade, index) {
            addGrade(grade.id, grade, index, gradeQualSelect.value);
        });
    };

    const searchQual = function () {
        const searchedName = gradeSearchNameInput.value;
        const searchedOrgId = gradeSearchOrgSelect.value;
        const searchedRegExp = new RegExp(searchedName, "i");
        const check = function (qual) {
            return qual.name.search(searchedRegExp) !== -1 &&
                (searchedOrgId === "none" || qual.orgId === searchedOrgId);
        };
        Array.from(gradeQualSelect.childNodes).filter(function (node) {
            return node.nodeName === "OPTION";
        }).filter(function (option) {
            return !check(userdata.qualList[option.value]);
        }).forEach(function (option) {
            const wrappingSpan = document.createElement("span");
            gradeQualSelect.replaceChild(wrappingSpan, option);
            wrappingSpan.appendChild(option);
        });
        Array.from(gradeQualSelect.childNodes).filter(function (node) {
            return node.nodeName === "SPAN";
        }).filter(function (span) {
            return check(userdata.qualList[span.firstChild.value]);
        }).forEach(function (span) {
            const option = span.firstChild;
            option.remove();
            gradeQualSelect.replaceChild(option, span);
        });

        updateGrades();
    };

    gradeSearchNameInput.addEventListener("change", searchQual);
    gradeSearchOrgSelect.addEventListener("change", searchQual);
    gradeQualSelect.addEventListener("change", updateGrades);

    updateGrades();
})();

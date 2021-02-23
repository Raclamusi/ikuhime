
const EventRecord = function (title, content) {
    this.title = title;
    this.content = content;
    const now = new Date();
    this.date = now.getFullYear() + "年" + now.getMonth() + "月" + now.getDate() + "日";
};


const ObtainedQualification = function (id, gradeId, year, month) {
    this.id = id + "";
    this.gradeId = gradeId;
    this.year = year;
    this.month = month;
    this.jmEnable = true;
    this.kgkEnable = true;
};


const userdata = new StorageManager("ikuhime", localStorage);
userdata.load();
if (userdata.isEmpty() && location.pathname.search(/\/ikuhime\/welcome/) === -1) {
    location.href = "/ikuhime/welcome";
}

// for old savedata
if (!(("orgList" in userdata) && ("qualList" in userdata)) && location.pathname.search(/\/ikuhime\/welcome/) === -1) {
    userdata.set("orgList", organizerList);
    userdata.set("qualList", qualificationList);
    userdata.quals.filter(function (qual) {
        return qual.id === null || qual.gradeId === null;
    }).forEach(function (qual, index) {
        const o = Object.entries(userdata.orgList).map(function (e) {
            return { id: e[0], org: e[1] };
        }).find(function (e) {
            return e.org.name === qual.organizer;
        });
        if (o === undefined) {
            userdata.orgList[index] = new Organizer(qual.organizer);
        }
        const orgId = o === undefined ? index + "" : o.id;

        const q = Object.entries(userdata.qualList).map(function (e) {
            return { id: e[0], qual: e[1] };
        }).find(function (e) {
            return e.qual.name === qual.name &&
                userdata.orgList[e.qual.orgId].name === qual.organizer &&
                e.qual.jmClass === qual.jmClass &&
                e.qual.kgkClass === qual.kgkClass;
        });
        if (q === undefined) {
            userdata.qualList[index] = new Qualification(qual.name, orgId, qual.jmClass, qual.kgkClass, []);
        }
        qual.id = q === undefined ? index + "" : q.id;

        const grades = userdata.qualList[qual.id].grades;
        const gradeId = grades.findIndex(function (grade) {
            return grade.name === qual.grade.name &&
                grade.jmRank === qual.grade.jmRank &&
                grade.jmPoint === qual.grade.jmPoint &&
                grade.kgkRank === qual.grade.kgkRank &&
                grade.kgkPoint === qual.grade.kgkPoint;
        });
        if (gradeId < 0) {
            grades.push(qual.grade);
        }
        qual.gradeId = gradeId < 0 ? grades.length - 1 : gradeId;
    });
    Object.values(userdata.qualList).filter(function (qual) {
        return qual.jmClass === null;
    }).forEach(function (qual) {
        qual.jmClass = "";
    });
    Object.values(userdata.qualList).filter(function (qual) {
        return qual.kgkClass === null;
    }).forEach(function (qual) {
        qual.kgkClass = "";
    });
    userdata.save("quals", "orgList", "qualList");
}

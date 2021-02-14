
const EventRecord = function (title, content) {
    this.title = title;
    this.content = content;
    this.date = new Date();
};


const ObtainedQualification = function (id, gradeId, year, month, organizer, name, jmClass, kgkClass, grade) {
    this.id = id;
    this.gradeId = gradeId;
    this.year = year;
    this.month = month;
    this.jmEnable = true;
    this.kgkEnable = true;
    if (id === null || gradeId === null) {
        this.organizer = organizer;
        this.name = name;
        this.jmClass = jmClass;
        this.kgkClass = kgkClass;
        this.grade = grade;
        return;
    }
    const qual = qualificationList[id];
    this.organizer = qual.organizer.name;
    this.name = qual.name;
    this.jmClass = qual.jmClass;
    this.kgkClass = qual.kgkClass;
    this.grade = JSON.parse(JSON.stringify(qual.grades[gradeId]));
};


const userdata = new StorageManager("ikuhime", localStorage);
userdata.load();
if (userdata.isEmpty() && location.pathname.search(/\/ikuhime\/welcome/) === -1) {
    location.href = "/ikuhime/welcome";
}

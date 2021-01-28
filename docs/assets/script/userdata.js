
function EventRecord(title, content) {
    this.title = title;
    this.content = content;
    this.date = new Date();
}


function ObtainedQualification(id, gradeId, organizer, name, jmClass, kgkClass, grade, year, month) {
    this.id = id;
    this.gradeId = gradeId;
    this.organizer = organizer;
    this.name = name;
    this.jmClass = jmClass;
    this.kgkClass = kgkClass;
    this.grade = grade;
    this.year = year;
    this.month = month;
    this.jmEnable = true;
    this.kgkEnable = true;
}


var userdata = new StorageManager("ikuhime", localStorage);
userdata.load();
if (userdata.names.length == 0 && location.pathname.match(/\/ikuhime\/welcome/) === null) {
    location.href = "/ikuhime/welcome";
}

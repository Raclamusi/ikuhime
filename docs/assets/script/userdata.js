
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
var userdataNames = ["name", "level", "exp", "eventRecords", "bonusPreTime", "quals", "avatar", "equips", "enableEquip"];
for (var i = 0; i < userdataNames.length; i++) {
    if (userdata.add(userdataNames[i]) && location.pathname.match(/\/ikuhime\/welcome/) !== null) {
        location.href = "/ikuhime/welcome";
    }
}

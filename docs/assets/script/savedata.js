
function EventRecord(content) {
	this.content = content;
}


var savedata = new StorageManager("ikuhime", localStorage);
var savedataNames = ["name", "level", "exp", "eventsRecord", "bonusPreTime"];
for (var i = 0; i < savedataNames.length; i++) {
	if (savedata.add(savedataNames[i]) && !location.pathname.startsWith("/ikuhime/welcome") && !location.pathname.startsWith("/C:/ikuhime/welcome")) {
		location.href = "/ikuhime/welcome";
	}
}

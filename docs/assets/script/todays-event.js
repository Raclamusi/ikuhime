
var now = new Date();
var nowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

window.addEventListener("load", function () {
	if (savedata.bonusPreTime < nowTime) {
		document.getElementById("bonus").classList.remove("hidden");
	}
});

function nothingSpecial() {
	if (savedata.bonusPreTime < nowTime) {
		savedata.bonusPreTime = nowTime;
		savedata.exp += 100;
		location.href = "/ikuhime/home";
	}
}

function registration() {
	var content = document.eventRecord.content.value;
	if (content.length == 0) {
		window.alert("内容を入力してください");
		return;
	}
	savedata.eventsRecord.push(new EventRecord(content));
	savedata.exp += 100 + Math.min(content.length, 500);
	location.href = "/ikuhime/home";
}

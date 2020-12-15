
function start() {
	savedata.name = document.initForm.name.value;
	savedata.level = 1;
	savedata.exp = 0;
	savedata.eventsRecord = [];
	savedata.bonusPreTime = 0;
	location.href = "/ikuhime/home";
}

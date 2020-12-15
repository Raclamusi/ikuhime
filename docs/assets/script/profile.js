
window.addEventListener("load", function () {
	document.profile.name.value = savedata.name;
});

function Okey() {
	var name = document.profile.name.value;
	if (name.length == 0) {
		window.alert("–¼‘O‚ð“ü—Í‚µ‚Ä‚­‚¾‚³‚¢");
		return;
	}
	if (name.length > 10) {
		window.alert("–¼‘O‚ª’·‚·‚¬‚Ü‚·(10•¶ŽšˆÈ“à)");
		return;
	}
	savedata.name = name;
	location.href = "/ikuhime/home";
}

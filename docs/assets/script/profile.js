
window.addEventListener("load", function () {
	document.profile.name.value = savedata.name;
});

function Okey() {
	var name = document.profile.name.value;
	if (name.length == 0) {
		window.alert("名前を入力してください");
		return;
	}
	if (name.length > 10) {
		window.alert("名前が長すぎます(10文字以内)");
		return;
	}
	savedata.name = name;
	location.href = "/ikuhime/home";
}

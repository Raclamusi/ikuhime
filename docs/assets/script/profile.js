
window.addEventListener("load", function () {
	document.profile.name.value = savedata.name;
});

function Okey() {
	var name = document.profile.name.value;
	if (name.length == 0) {
		window.alert("���O����͂��Ă�������");
		return;
	}
	if (name.length > 10) {
		window.alert("���O���������܂�(10�����ȓ�)");
		return;
	}
	savedata.name = name;
	location.href = "/ikuhime/home";
}

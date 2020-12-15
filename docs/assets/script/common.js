
var menuIsOpen = false;
function OpenMenu() {
	var menu = document.getElementById("menu");
	var menuText = document.getElementById("menu-text");
	if (menuIsOpen) {
		menu.classList.remove("header-menuopen");
		menuText.textContent = "メニュー";
		menuIsOpen = false;
	}
	else {
		menu.classList.add("header-menuopen");
		menuText.textContent = "×閉じる";
		menuIsOpen = true;
	}
}

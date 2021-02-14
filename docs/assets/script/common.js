
const openMenu = function () {
    const menu = document.getElementById("menu");
    const menuText = document.getElementById("menu-text");
    if (menu.classList.contains("header-menuopen")) {
        menu.classList.remove("header-menuopen");
        menuText.textContent = "メニュー";
        return;
    }
    menu.classList.add("header-menuopen");
    menuText.textContent = "×閉じる";
};


window.addEventListener("load", function () {
    var images = document.getElementById("images");
    var avatar = document.getElementById("avatar");
    var nameSpan = document.getElementById("avatar-name");
    var levelSpan = document.getElementById("avatar-level");
    var expSpan = document.getElementById("avatar-exp")
    var expBar = document.getElementById("avatar-expbar");

    avatar.src = avatarList[savedata.avatar].url;
    for (var i = 0; i < savedata.equips.length; i++) {
        var img = document.createElement("img");
        img.src = equipList[savedata.equips[i]].url;
        images.appendChild(img);
    }

    while (savedata.exp >= savedata.level * 100 + 400) {
        savedata.exp -= savedata.level * 100 + 400;
        savedata.level++;
        setTimeout(window.alert, 500, "レベルアップしました！\nLv. " + (savedata.level - 1) + " → " + savedata.level);
	}
    nameSpan.textContent = savedata.name;
    levelSpan.textContent = savedata.level + "";
    expSpan.textContent = savedata.level * 100 + 400 - savedata.exp + "";
    expBar.style.width = savedata.exp * 100 / (savedata.level * 100 + 400) + "%";

    for (var i = 0; i < achievementList.length; i++) {
        var ac = achievementList[i];
        if (!savedata.enableEquip[ac.equip]) {
            if (ac.condition.check()) {
                savedata.enableEquip[ac.equip] = true;
                setTimeout(window.alert, 500, "実績解除！「" + ac.title + "」\n装備を獲得しました！");
			}
		}
    }
    savedata.save();
});

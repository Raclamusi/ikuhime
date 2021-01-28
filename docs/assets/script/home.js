
window.addEventListener("load", function () {
    var nameSpan = document.getElementById("avatar-name");
    var levelSpan = document.getElementById("avatar-level");
    var expSpan = document.getElementById("avatar-exp")
    var expBar = document.getElementById("avatar-expbar");
    var preLevel = userdata.level;
    while (userdata.exp >= userdata.level * 100 + 400) {
        userdata.exp -= userdata.level * 100 + 400;
        userdata.level++;
    }
    if (userdata.level > preLevel) {
        setTimeout(window.alert, 500, "レベルアップしました！\nLv. " + preLevel + " → " + userdata.level);
	}
    userdata.save("exp", "level");
    nameSpan.textContent = userdata.name;
    levelSpan.textContent = userdata.level + "";
    expSpan.textContent = userdata.level * 100 + 400 - userdata.exp + "";
    expBar.style.width = userdata.exp * 100 / (userdata.level * 100 + 400) + "%";

    var message = "実績解除！\n装備を獲得しました！\n\n";
    var released = false;
    for (var i = 0; i < achievementList.length; i++) {
        var ac = achievementList[i];
        if (!userdata.enableEquip[ac.equip]) {
            if (ac.condition.check()) {
                userdata.enableEquip[ac.equip] = true;
                message += "「" + ac.title + "」\n";
                released = true;
			}
		}
    }
    if (released) {
        setTimeout(window.alert, 500, message);
    }
    userdata.save("enableEquip");

    var downloadLink = document.getElementById("download");
    var canvas = document.getElementById("avatar");
    canvas.width = canvas.height = 256;
    var ctx = canvas.getContext("2d");
    var img = new Image();
    var i = 0;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        if (i < userdata.equips.length) {
            img.src = equipList[userdata.equips[i++]].url;
        }
        else {
            downloadLink.href = canvas.toDataURL();
		}
    };
    img.src = avatarList[userdata.avatar].url;
});

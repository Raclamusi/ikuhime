
(function () {
    const nameSpan = document.getElementById("avatar-name");
    const levelSpan = document.getElementById("avatar-level");
    const expSpan = document.getElementById("avatar-exp")
    const expBar = document.getElementById("avatar-expbar");
    const preLevel = userdata.level;
    while (userdata.exp >= userdata.level * 100 + 400) {
        userdata.exp -= userdata.level * 100 + 400;
        userdata.level++;
    }
    const levelMsg = userdata.level > preLevel ?
        "レベルアップしました！\nLv. " + preLevel + " → " + userdata.level :
        null;
    nameSpan.textContent = userdata.name;
    levelSpan.textContent = userdata.level + "";
    expSpan.textContent = userdata.level * 100 + 400 - userdata.exp + "";
    expBar.style.width = userdata.exp * 100 / (userdata.level * 100 + 400) + "%";

    const newAchiev = achievementList.filter(function (achiev) {
        return !userdata.enableEquip[achiev.equip] && achiev.condition.check();
    });
    newAchiev.forEach(function (achiev) {
        userdata.enableEquip[achiev.equip] = true;
    });
    const achievMsg = newAchiev.length > 0 ?
        newAchiev.reduce(function (msg, achiev) {
            return msg + "「" + achiev.title + "」\n";
        }, "実績解除！\n装備を獲得しました！\n\n") :
        null;

    userdata.save("exp", "level", "enableEquip");

    const canvas = document.getElementById("avatar");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const urls = userdata.equips.map(function (equipId) {
        return equipList[equipId].url;
    });
    urls.unshift(avatarList[userdata.avatar].url);
    const images = urls.map(function (url) {
        const img = new Image();
        img.src = url;
        return img;
    });
    const drawAvatar = function () {
        images.forEach(function (img) {
            while (!img.complete);
            ctx.drawImage(img, 0, 0);
        });
        document.getElementById("download").href = canvas.toDataURL();
    };

    window.addEventListener("load", function () {
        drawAvatar();
        if (levelMsg !== null) {
            alert(levelMsg);
        }
        if (achievMsg !== null) {
            alert(achievMsg);
        }
    });
})();


(function () {
    const avatarOptions = document.getElementById("avatar-list");
    const makeAvatarOnClick = function (index) {
        return function () {
            avatarOptions.childNodes[index].classList.add("equip-selected");
            avatarOptions.childNodes[userdata.avatar].classList.remove("equip-selected");
            document.getElementById("avatar").src = avatarList[index].url;
            userdata.avatar = index;
            userdata.save("avatar");
        };
    };
    avatarList.forEach(function (avatar, index) {
        const li = document.createElement("li");
        const img = new Image();
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        img.src = avatar.url;
        h3.textContent = avatar.name;
        p.innerHTML = avatar.content;
        div.appendChild(h3);
        div.appendChild(p);
        li.appendChild(img);
        li.appendChild(div);
        if (index === userdata.avatar) {
            li.classList.add("equip-selected");
        }
        li.addEventListener("click", makeAvatarOnClick(index));
        avatarOptions.appendChild(li);
    });

    const equipOptions = document.getElementById("equip-list");
    const preview = document.getElementById("images");
    const makeEquipOnClick = function (index, item) {
        return function () {
            const i = userdata.equips.indexOf(index);
            if (i >= 0) {
                userdata.equips.splice(i, 1);
                item.classList.remove("equip-selected");
                Array.from(preview.childNodes).find(function (image) {
                    return image.id === index + "";
                }).remove();
                userdata.save("equips");
                return;
            }
            if (userdata.equips.length >= userdata.level) {
                alert("装備可能上限数に達しました");
                return;
            }
            userdata.equips.push(index);
            item.classList.add("equip-selected");
            const img = new Image();
            img.src = equipList[index].url;
            img.id = index;
            preview.appendChild(img);
            userdata.save("equips");
        };
    };
    equipList.forEach(function (equip, index) {
        if (!userdata.enableEquip[index]) {
            return;
        }
        const li = document.createElement("li");
        const img = new Image();
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        img.src = equip.url;
        h3.textContent = equip.name;
        p.innerHTML = equip.content;
        div.appendChild(h3);
        div.appendChild(p);
        li.appendChild(img);
        li.appendChild(div);
        if (userdata.equips.includes(index)) {
            li.classList.add("equip-selected");
        }
        li.addEventListener("click", makeEquipOnClick(index, li));
        equipOptions.appendChild(li);
    });

    document.getElementById("avatar").src = avatarList[userdata.avatar].url;
    userdata.equips.forEach(function (equipId) {
        const img = new Image();
        img.src = equipList[equipId].url;
        img.id = equipId;
        preview.appendChild(img);
    });
})();

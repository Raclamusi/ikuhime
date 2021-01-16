
window.addEventListener("load", function () {
    var alist = document.getElementById("avatar-list");
    for (var i = 0; i < avatarList.length; i++) {
        var v = avatarList[i];
        var li = document.createElement("li");
        var img = document.createElement("img");
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        img.src = v.url;
        h3.textContent = v.name;
        p.innerHTML = v.content;
        div.appendChild(h3);
        div.appendChild(p);
        li.appendChild(img);
        li.appendChild(div);
        if (i == userdata.avatar) {
            li.classList.add("equip-selected");
		}
        (function () {
            var ai = i;
            li.addEventListener("click", function () {
                var items = alist.childNodes;
                for (var j = 0; j < items.length; j++) {
                    if (j == ai) {
                        items[j].classList.add("equip-selected");
                    }
                    else {
                        items[j].classList.remove("equip-selected");
                    }
                }
                userdata.avatar = ai;
                document.getElementById("avatar").src = avatarList[userdata.avatar].url;
                userdata.save();
            });
        })();
        alist.appendChild(li);
    }

    var elist = document.getElementById("equip-list");
    for (var i = 0; i < equipList.length; i++) {
        if (!userdata.enableEquip[i]) {
            continue;
		}
        var v = equipList[i];
        var li = document.createElement("li");
        var img = document.createElement("img");
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        img.src = v.url;
        h3.textContent = v.name;
        p.innerHTML = v.content;
        div.appendChild(h3);
        div.appendChild(p);
        li.appendChild(img);
        li.appendChild(div);
        if (userdata.equips.indexOf(i) != -1) {
            li.classList.add("equip-selected");
        }
        (function () {
            var ei = i;
            var item = li;
            li.addEventListener("click", function () {
                var items = alist.childNodes;
                var images = document.getElementById("images");
                var imgs = images.childNodes;
                if (userdata.equips.indexOf(ei) != -1) {
                    var e = userdata.equips;
                    for (var j = 0; j < e.length; j++) {
                        if (e[j] == ei) {
                            e.splice(j, 1);
                            break;
						}
					}
                    item.classList.remove("equip-selected");
                    for (var j = 0; j < imgs.length; j++) {
                        var v = imgs[j];
                        if (v.id == ei) {
                            v.remove();
                            break;
						}
					}
                }
                else {
                    if (userdata.equips.length >= userdata.level) {
                        window.alert("装備可能上限数に達しました");
                        return;
					}
                    userdata.equips.push(ei);
                    item.classList.add("equip-selected");
                    var img = document.createElement("img");
                    img.src = equipList[ei].url;
                    img.id = ei;
                    images.appendChild(img);
                }
                userdata.save();
            });
        })();
        elist.appendChild(li);
    }

    document.getElementById("avatar").src = avatarList[userdata.avatar].url;
    var images = document.getElementById("images");
    for (var i = 0; i < userdata.equips.length; i++) {
        var img = document.createElement("img");
        img.src = equipList[userdata.equips[i]].url;
        img.id = userdata.equips[i];
        images.appendChild(img);
    }
});

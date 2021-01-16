
window.addEventListener("load", function () {
    var list = document.getElementById("list");
    var events = userdata.eventRecords;
    for (var i = 0; i < events.length; i++) {
        var v = events[i];
        var li = document.createElement("li");
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        h3.textContent = v.title;
        p.textContent = v.content;
        div.appendChild(h3);
        div.appendChild(p);
        li.appendChild(div);
        list.appendChild(li);
    }
});

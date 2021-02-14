
(function () {
    const list = document.getElementById("list");
    userdata.eventRecords.forEach(function (record) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        h3.textContent = record.title;
        p.textContent = record.content;
        div.appendChild(h3);
        div.appendChild(p);
        li.appendChild(div);
        list.appendChild(li);
    });
})();

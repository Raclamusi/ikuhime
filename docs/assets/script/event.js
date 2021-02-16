
(function () {
    const list = document.getElementById("list");
    userdata.eventRecords.forEach(function (record) {
        const li = document.createElement("li");
        const section = document.createElement("section");
        const date = document.createElement("p");
        const title = document.createElement("h2");
        const content = document.createElement("p");
        date.textContent = record.date;
        date.classList.add("event-date");
        title.textContent = record.title;
        title.classList.add("event-title");
        content.textContent = record.content;
        content.classList.add("event-content");
        section.appendChild(date);
        section.appendChild(title);
        section.appendChild(content);
        li.appendChild(section);
        list.appendChild(li);
    });
})();


(function () {
    const searcher = document.getElementById("search");
    const updateList = function () {
        const searchedText = new RegExp(searcher.value, "i");
        const oldList = document.getElementById("list");
        const newList = oldList.cloneNode(false);
        userdata.eventRecords.filter(function (record) {
            return ["title", "content", "date"].some(function (key) {
                return record[key].search(searchedText) !== -1;
            });
        }).forEach(function (record) {
            const li = document.createElement("li");
            const section = document.createElement("section");
            const date = document.createElement("p");
            const title = document.createElement("h2");
            date.textContent = record.date;
            date.classList.add("event-date");
            title.textContent = record.title;
            title.classList.add("event-title");
            section.appendChild(date);
            section.appendChild(title);
            record.content.split("\n").forEach(function (para) {
                const p = document.createElement("p");
                p.textContent = para;
                p.classList.add("event-content");
                section.appendChild(p);
            });
            li.appendChild(section);
            newList.appendChild(li);
        });
        oldList.parentNode.replaceChild(newList, oldList);
    };
    searcher.addEventListener("change", updateList);
    
    updateList();
})();

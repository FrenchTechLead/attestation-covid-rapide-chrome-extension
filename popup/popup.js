function onFillClick(e) {
    const index = e.target.id;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.storage.local.get(obj => {
            users = obj.users ? Array.from(obj.users) : [];
            const user = users[index];
            user.from = "popup";
            user.subject = "fill";
            chrome.tabs.sendMessage(
                tabs[0].id,
                user,
                () => {
                    window.close();
                });
        });

    });
}

function onDeleteClick(e) {
    const index = e.target.id;
    chrome.storage.local.get(obj => {
        users = obj.users ? Array.from(obj.users) : [];
        users.splice(index, 1);
        chrome.storage.local.set({ users: users }, displayUsers);
    });
}

document.getElementById("open-site-btn").onclick = () => {
    chrome.tabs.create({ url: "https://media.interieur.gouv.fr/deplacement-covid-19/" });
}

document.getElementById("add-user-btn").onclick = () => {
    chrome.tabs.create({ url: "options/options.html" });
}



function displayUsers() {
    const btnsContainer = document.getElementById("btns");
    btnsContainer.innerHTML = "";
    chrome.storage.local.get(obj => {
        users = obj.users ? Array.from(obj.users) : [];
        users.forEach((user, index) => {
            const btnG = document.createElement("button");
            btnG.className = "fill-btn";
            btnG.innerText = user['field-lastname'].charAt(0).toUpperCase() + ". " + user['field-firstname'];
            btnG.id = index;
            btnG.onclick = onFillClick;

            const btnD = document.createElement("button");
            btnD.className = "delete-btn";
            btnD.innerText = "X";
            btnD.id = index;
            btnD.onclick = onDeleteClick;

            const div = document.createElement("div");
            div.appendChild(btnG);
            div.appendChild(btnD);
            btnsContainer.appendChild(div);
        })
    });
}

window.onload = function () {
    displayUsers();
}
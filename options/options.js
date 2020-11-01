document.getElementById("open-site-btn")
    .onclick = () => {
        chrome.tabs.create({ url: "https://media.interieur.gouv.fr/deplacement-covid-19/" });
    };



document.getElementById("form-profile")
    .onsubmit = (e) => {
        e.preventDefault();
        const inputs = document.getElementsByClassName("form-control");
        const notif = document.getElementById("notif");
        const user = {};
        Array.from(inputs).forEach(input => {
            user[input.id] = input.value;
            console.log(input.id, input.value);
        });
        chrome.storage.local.get(obj => {
            users = obj.users ? Array.from(obj.users) : [];
            users.push(user);
            console.log("users", users);
            chrome.storage.local.set({ users: users }, () => console.log('User added successfuly !'));
        });
        notif.style.display = "block";
        window.setTimeout(() => {
            notif.style.display = "none";
        }, 3000);
        return false;
    };

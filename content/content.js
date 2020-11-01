console.log("covid extension script injected !")
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if ((msg.from === 'popup') && (msg.subject === 'fill')) {
        delete msg.from;
        delete msg.subject;
        for (const [key, value] of Object.entries(msg)) {
            document.getElementById(key).value = value;
        }
        const date = new Date();
        const currentTime = date.getHours() + ':' + date.getMinutes();
        document.getElementById("field-heuresortie").value = currentTime;
        response(true);
    }
});

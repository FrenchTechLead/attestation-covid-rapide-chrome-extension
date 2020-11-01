console.log("covid extension script injected !")
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if ((msg.from === 'popup') && (msg.subject === 'fill')) {
        delete msg.from;
        delete msg.subject;
        for (const [key, value] of Object.entries(msg)) {
            document.getElementById(key).value = value;
        }
        document.getElementById("field-heuresortie").value = formattedTime();
        response(true);
    }
});

function formattedTime() {
    const date = new Date();
    let hours = date.getHours() + '';
    let minutes = date.getMinutes() + '';
    hours = hours.length == 2 ? hours : ('0' + hours);
    minutes = minutes.length == 2 ? minutes : ('0' + minutes);
    return hours + ':' + minutes;
}

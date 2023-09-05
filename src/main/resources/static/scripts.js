var stompClient = null;

$(document).ready(function () {
    console.log("Index page is ready");
});

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('response').innerHTML = '';
}

function connect() {
    let socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);

        stompClient.subscribe('/user/topic/messages', function (message) {
            showMessageOutput(JSON.parse(message.body));
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    let from = document.getElementById('from').value;
    let text = document.getElementById('text').value;
    let msg = JSON.stringify({'from': from, 'text': text});
    stompClient.send("/app/chat", {}, msg);
    showSendMessage(JSON.parse(msg));
}

function showSendMessage(message) {
    console.log(message);
    let response = document.getElementById('response');
    let p = document.createElement('p');
    let time = getTime();

    p.appendChild(document.createTextNode(message.from + ": "
        + message.text + " (" + time + ")"));
    response.appendChild(p);
}

function showMessageOutput(messageOutput) {
    let response = document.getElementById('response');
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(messageOutput.from + ": "
        + messageOutput.text + " (" + messageOutput.time + ")"));
    response.appendChild(p);
}

function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return hours + ":" + minutes + ":" + seconds;
}
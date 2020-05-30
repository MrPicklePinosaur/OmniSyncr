
console.log('EXTENSION LOADED YAYY');

var vid = document.getElementsByTagName('video')[0]; 

chrome.runtime.onMessage.addListener(recieveMessage);

function recieveMessage(message, sender, sendResponse) {
    console.log(message.msg);
    if (vid != null) {
        console.log('vid not null');
        vid.play();
    }
    else {
        console.log('vid null');
    }
}
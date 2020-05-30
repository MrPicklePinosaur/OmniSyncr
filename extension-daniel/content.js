//alert('LOADED');
console.log('EXTENSION LOADED YAYY');


chrome.runtime.onMessage.addListener(recieveMessage);

function recieveMessage(message, sender, sendResponse) {
    console.log(message.msg);
}
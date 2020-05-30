
//on installed
chrome.runtime.onInstalled.addListener(() => {
    alert('Thanks for installing =)');
})

//chrome info
chrome.identity.getProfileUserInfo({});

console.log('Background Script loaded');

chrome.browserAction.onClicked.addListener(onClicked);

function onClicked(tab) { //send message to content script
    console.log(tab);
    let payload = {
        msg: "message from background =)"
    }
    chrome.tabs.sendMessage(tab.id, payload);
}
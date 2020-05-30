

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('play-button').addEventListener('click', function() {
    
        console.log('clicked!');

        //send message to content script

        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, (tabs) => {
            let payload = {
                msg: 'Message from popup!'
            };
            chrome.tabs.sendMessage(tabs[0].id, payload);

        });

    });

});
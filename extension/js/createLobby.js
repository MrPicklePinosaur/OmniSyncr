document.getElementById("create").addEventListener("click", f);

function f(){
    chrome.tabs.create({active: false}, function(newTab) {
        alert("hello");

        // After the tab has been created, open a window to inject the tab into it.
        chrome.windows.create(
            {
                tabId:      newTab.id,
                type:       "popup",
                url:        chrome.extension.getURL('a.html'),
                focused: true
            },function(window){
                winID = newWindow.id;
            });
    });

}
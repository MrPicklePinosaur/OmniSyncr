var contextMenus = {};

contextMenus.createCounterString = 
    chrome.contextMenus.create(
        {"title":"play",
        "contexts" : ["all"]
        },
        function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
    );

chrome.contextMenus.onClicked.addListener(contextMenuHandler);

if (!String.prototype.format) { // string formatting stuff
    String.prototype.format = function(...args) {
      return this.replace(/(\{\d+\})/g, function(a) {
        return args[+(a.substr(1, a.length - 2)) || 0];
      });
    };
}

function videoFunction(order){
    var queueCode = `
        var found = false;
        var possibleClasses = ["jw-video jw-reset", "video-stream html5-main-video"];
        for (var i = 0; i < possibleClasses.length; i++){
            try{
                var possibleClass = possibleClasses[i];
                document.getElementsByClassName(possibleClass)[0]{0};
                console.log("Found from tag");
                found = true;
                break;
                
            }catch (error2){
            }
        }

        if (!found){
            try{
                document.getElementsByTagName("video")[0]{0};
                console.log("Normal video found");
            }catch(error){
                console.log("No video found");
            }
        }
    `.format(order);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: queueCode});
    });
}

function videoProperty(info){

}

function videoSetup(){

}

function contextMenuHandler(info, tab){
    
    (chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: ''})}));

    //videoFunction(".play()");
    //videoFunction(".pause()");
    //videoFunction(".currentTime = 95"); // in seconds
}

chrome.runtime.onMessage.addListener(internalMessage);
function internalMessage(info){
    console.log(info);
}
// test stuff
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

// gets to call the other functions
var alreadyReady = false;
function contextMenuHandler(info, tab){
    if (!alreadyReady){
        videoSetup();
        alreadyReady = true
    }

    //videoFunction(".load()");
    //videoFunction(".play()");
    //videoFunction(".pause()");
    //videoFunction(".currentTime = 95"); // in seconds
    
    //videoProperty(".currentTime")
}

// ======================================== global functions =======================================
if (!String.prototype.format) { 
    String.prototype.format = function(...args) {
      return this.replace(/(\{\d+\})/g, function(a) {
        return args[+(a.substr(1, a.length - 2)) || 0];
      });
    };
}

// ======================================== video functions =======================================
function videoSetup(){
    var queueCode = `
        var storedVideo = null;
        var possibleClasses = ["vjs-tech", "jw-video jw-reset", "video-stream html5-main-video"];
        for (var i = 0; i < possibleClasses.length; i++){
            try{
                var possibleClass = possibleClasses[i];
                document.getElementsByClassName(possibleClass)[0].className 
                storedVideo = document.getElementsByClassName(possibleClass)[0];
                console.log("Found video from tag, it is now stored");
                break;
                
            }catch (error2){
            }
        }

        if (!storedVideo){
            try{
                document.getElementsByTagName("video")[0].ClassName;
                storedVideo = document.getElementsByTagName("video")[0]
                console.log("Normal video found");
            }catch(error){
                console.log("No video found");
            }
        }

        if (storedVideo){
            storedVideo.onplay = function() {
                chrome.runtime.sendMessage("started");
            }
            
            storedVideo.onpause = function() {
                chrome.runtime.sendMessage("paused");
            }
        }
    `;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: queueCode});
    });

}

// sends a command to the video player
function videoFunction(order){ // .load(), .play(), .pause(), .currentTime = x seconds
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: "storedVideo{0};".format(order)});
    });
}

// posts a message for us to get later
function videoProperty(info){
    waitingOn = info;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: "chrome.runtime.sendMessage(storedVideo{0});".format(info)});
    });
}

// listens for messages sent from videoProperty()
var waitingOn = null;
chrome.runtime.onMessage.addListener(internalMessage);
function internalMessage(info){
    if (info == "started"){
        console.log("Video has been started, possibly manually");
    }else if (info == "paused"){
        console.log("Video has been ended, possibly manually");
    }else if (waitingOn){
        console.log(waitingOn, info);
        waitingOn = null;
    }
}

// ======================================== socket functions =======================================
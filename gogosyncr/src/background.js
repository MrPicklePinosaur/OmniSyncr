
var state = {
    server_url: 'http://134.209.168.108:3000',
    username: null,
    room_info: null,
    members: []
};

// test stuff
console.log("Started")
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var evt_type = request.event;

    if (evt_type == "onload") {
        //send stored state back to popup
        console.log('LOADED POPUP');
        sendResponse({"state":state});
    } else if (evt_type == "onunload") {
        console.log(request.state);
    } else if (evt_type == "createRoom") {
        console.log(request.payload.lobbyId);
        lobbyCreated(request.payload.lobbyId, request.payload.username);
    } else if (evt_type == "writeState") {
        state = request.state;
        console.log(state);
    }else {
        console.log(`invalid event type: ${evt_type}`);
    }
});


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
    
    try{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {code: queueCode});
        });

    }catch(error){}

}

// sends a command to the video player
function videoFunction(order){ // .load(), .play(), .pause(), .currentTime = x seconds
    try {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {code: "storedVideo{0};".format(order)});
        });
    }catch(error){}
}

// posts a message for us to get later
function videoProperty(info){
    try{
        waitingOn = info;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {code: "chrome.runtime.sendMessage(storedVideo{0});".format(info)});
        });
    }catch(error){}   
}

// listens for messages sent from videoProperty()
var waitingOn = null;
var waitedCommand = null;
chrome.runtime.onMessage.addListener(internalMessage);
function internalMessage(info){
    try{
        console.log("Internal message", info, isPlaying, isLeader);
        if (info == "started"){
            if (!isPlaying){
                if (isLeader){
                    console.log("Will try to tell to play");
                    waitedCommand = "Playing";
                    videoProperty(".currentTime")

                }else{
                    console.log("Forcing player to stop");
                    videoFunction(".pause()");
                }
            }
        }else if (info == "paused"){
            console.log("Video has been ended, possibly manually");
            if (isPlaying && isLeader){
                videoProperty(".currentTime")
                waitedCommand = "Paused";
                isPlaying = false;
            }

        }else if (waitingOn){
            console.log(waitingOn, info, values["ID"]);
            var room = db.collection("Rooms").doc(values["ID"].toString());

            return room.update({
                LastUpdate: new Date().getTime(),
                Status: waitedCommand,
                Watched: info
            })
            .then(function() {
                waitedCommand = null;
                waitingOn = null;
                console.log("Room successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating Room: ", error);
            });
        }
    }catch(e){
        console.log(e);
    }
    
}

// ======================================== Firebase functions =======================================
var config = {
    databaseURL: "https://masseyhacks6.firebaseio.com",
    projectId: "masseyhacks6"
};

firebase.initializeApp(config);
var db = firebase.firestore();
var values = {
    "ID" : null,
    "LastUpdate" : null,
    "PartyLeader" : null,
    "Status" : null,
    "Watched" : null,
    "Link": null
}
var isLoaded = false;
var isPlaying = false;
var isLeader = false;

function lobbyCreated(lobbyId, username){
    console.log("running?")
    try{
        db.collection("Rooms").where("ID", "==", lobbyId)
        .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    var newItems = change.doc.data();
                    console.log("Something changed")
                    for (var key in values){
                        if (values[key] != newItems[key]){
                            console.log("Changed", key, newItems[key]);
                            if (key == "Status"){ // change where we are at
                                if (newItems[key] == "Paused" && isPlaying){
                                    console.log("Video Stopped!");
                                    videoFunction(".pause()");

                                }else if (newItems[key] == "Playing"){
                                    if (!isLoaded){
                                        console.log("Starting Video!");
                                        videoSetup();
                                        isLoaded = true;
                                        videoFunction(".load()");
                                    }
                                    isPlaying = true;                                    
                                    console.log("Playing Video!");
                                    videoFunction(".currentTime = {0}".format(newItems["Watched"])); //+ ((new Date().getTime()) - newItems["LastUpdate"])/1000));
                                    videoFunction(".play()");
                                    
                                    console.log("Enjoy watching?", newItems["Watched"]); //+ ((new Date().getTime()) - newItems["LastUpdate"])/1000) ;
                                }
                            }else if (key == "Link" && !isLeader && newItems[key] != "blank"){
                                // open that link
                                console.log("Going to new url!")
                                chrome.tabs.create({"url": newItems[key]});
                            
                            }else if (key == "PartyLeader"){
                                if (username == newItems[key]){
                                    isLeader = true;
                                    console.log("You have become the Leader!");

                                    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                                        let url = tabs[0].url;
                                        var room = db.collection("Rooms").doc(newItems["ID"].toString());
                                        console.log("Making url change");
                                        room.update({
                                            Link : url
                                        });
                                        console.log("Done");
                                    });

                                    if (!isLoaded){
                                        isLoaded = true;
                                        videoSetup();
                                    }
                                }
                            }
                            values[key] = newItems[key];
                        }
                    }
                })
            })
    }catch(e){
        console.log(e);
    }

    console.log("Room has been setup")
}

// ======================================== Test Code =======================================
function make(){
    db.collection("Rooms").doc("178912012").set({        
        LastUpdate: new Date().getTime(),
        PartyLeader: "Noor",
        Status: "Paused",
        Watched: 0,
        ID: 178912012,
        Link : "blank"
    });
}

//make();

var contextMenus = {};
contextMenus.createCounterString = 
    chrome.contextMenus.create(
        {"title":"play",
        "contexts" : ["all"],
        "id": "pleaseworkman"
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
    lobbyCreated(178912012, "Other Man");
    
    

    /*if (!alreadyReady){
        videoSetup();
        alreadyReady = true
    }
    */

    //videoFunction(".load()");
    //videoFunction(".play()");
    //videoFunction(".pause()");
    //videoFunction(".currentTime = 95"); // in seconds
    
    //videoProperty(".currentTime")
}

console.log("Started");


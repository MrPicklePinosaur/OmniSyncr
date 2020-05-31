import Vue from 'vue'
import Vuex from 'vuex'
import {router} from "../popup.js"

Vue.use(Vuex);

//write current state to background.js
function writeState() {
    console.log('writing state')
    console.log(store.state)
    chrome.runtime.sendMessage({
        "event":"writeState",
        "state": store.state
    });
}

export const store = new Vuex.Store({
    state: {
        server_url: 'http://134.209.168.108:3000',
        username: null,
        room_info: null,
        members: []
    },
    getters: {

    },
    mutations: {
        readState: (state, payload) => { //read state from background.js on popup init
            console.log(`payload`);
            console.log(payload)
            state = payload;
        },
        
        setRoom: (state, payload) => {
            console.log(payload);
            state.room_info = payload; //copy the room object over
            writeState();
        },

        setMembers: (state, payload) => { //comes in {"memebers": string[]}
            var members = payload.members;
            state.members = members;
            writeState();
        },

        setUsername: (state, payload) => {
            var username = payload.username;
            state.username = username;
            console.log(username);
            writeState();
        }
    },
    actions: {

        createRoom: context => { 
            console.log(context.state.server_url+"/rooms/create");
            
            axios.post(context.state.server_url+"/rooms/create", {
                "name": context.state.username
            }) //response: room object { code: string, dbCode: string, owner: string}
            .then(response => {
                context.commit('setRoom', response.data)

                chrome.runtime.sendMessage({
                    "event": "createRoom",
                    "payload": {
                        "lobbyId": context.state.room_info.dbCode,
                        "username": context.state.username
                    }
                });

                router.push('/popup/popup.html/room');
            });

        },

        joinRoom: (context, payload) => { //payload: object: { code: string }

            //send code we entered to the server and check to see if we successfully joined room
            console.log(context.state.server_url+"/rooms/join");
            axios.post(context.state.server_url+"/rooms/join", {
                "code": payload.code
            })
            .then(response => { //response: room object OR null
                var data = response.data;

                //context.commit('setRoom', response.data);
                
                if (data != null) {
                    context.commit('setRoom', data);
                    //also redirect to room page
                    router.push('/popup/popup.html/room');

                    chrome.runtime.sendMessage({
                        "event": "createRoom",
                        "payload": {
                            "lobbyId": context.state.room_info.dbCode,
                            "username": context.state.username
                        }
                    });

                    
                } else {
                    //tell user that its an invalid room
                    console.log('invalid code');
                }
                

            });
        },

        //leaveRoom:

    }
});
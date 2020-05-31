import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        server_url: 'http://134.209.168.108:3000',
        username: 'Daniel',
        room_info: null,
        /*room_info: {
            "code": "lmaoxdcode",
            "dbCode": "123securehash", //firestore
            "owner": "melmao",
        }
        room_state: { //dont care bout room state anymore
            "members": [
                "nithin", "daniel", "noor"
            ],
            "status": "paused",
            "watched": 50.5
        }*/
        members: []
    },
    getters: {

    },
    mutations: {
        readState: (state, payload) => { //read state from background.js on popup init

        },
        
        setRoom: (state, payload) => {
            console.log(payload);
            state.room_info = payload; //copy the room object over
        },

        setMembers: (state, payload) => { //comes in {"memebers": string[]}
            var members = payload.members;
            state.members = members;
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
                } else {
                    //tell user that its an invalid room
                    console.log('invalid code');
                }
                

            });
        },

        //leaveRoom:

    }
});
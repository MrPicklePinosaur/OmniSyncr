import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        server_url: 'http:localhost:3000',
        username: 'Daniel',
        room_info: null,
        /*room_info: {
            "code": "lmaoxdcode",
            "dbCode": "123securehash", //firestore
            "owner": "melmao",
        }*/
        room_state: {
            "members": [
                "nithin", "daniel", "noor"
            ],
            "status": "paused",
            "watched": 50.5
        }
    },
    getters: {

    },
    mutations: {
        readState: (state, payload) => { //read state from background.js on popup init

        },
        
        setRoom: (state, payload) => {
            console.log(payload);
            state.room_info = payload; //copy the room object over
        }
    },
    actions: {

        createRoom: context => { 
            console.log(context.state.server_url+"/rooms/create");
            /*
            axios.get(context.state.server_url+"/rooms/create") //response: room object { code: string, dbCode: string, owner: string}
            .then(response => {
                console.log(response);
                context.commit('setRoom', response)
            });
            */
            setTimeout(function() { //dummy request for now
                context.commit('setRoom', {
                    "code": "lmaoxdcode",
                    "dbCode": "123securehash", //firestore
                    "owner": "melmao",
                });
            },100);
        },

        joinRoom: (context, payload) => { //payload: object: { code: string }

            //send code we entered to the server and check to see if we successfully joined room

            axios.get(context.server_url+"/rooms/getroom", {
                "code": payload.code
            })
            .then(response => { //response: room object OR null

                if (repsonse != null) {
                    context.commit('setRoom', response);
                    //also redirect to room page
                } else {
                    //tell user that its an invalid room
                }

            });
        },

        //leaveRoom:

    }
});
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        server_url: 'http:localhost:3000',
        username: 'Daniel',
        room: null
    },
    getters: {

    },
    mutations: {
        readState: (state, payload) => { //read state from background.js on popup init

        },
        
        setRoom: (state, payload) => {
            state.room = payload; //copy the room object over
        }
    },
    actions: {

        createRoom: (content) => { 
            axios.get(context.server_url+"/rooms/create")
                .then(response => { //response: room object { code: string, dbCode: string, owner: string, members: string[]}
                    context.commit('setRoom', response);
                });
        },

        joinRoom: (content, payload) => { //payload: object: { code: string }

            //send code we entered to the server and check to see if we successfully joined room

            axios.get(context.server_url+"/rooms/getroom")
                .then(response => { //response: room object

                });
        }

    }
});
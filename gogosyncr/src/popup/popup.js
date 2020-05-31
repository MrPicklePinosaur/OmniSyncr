import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'

import { store } from './store/store.js'

import App from './App'
import Main from './views/Main.vue'
import Test from './views/Test.vue'
import Room from './views/Room.vue'
import NotFound from './views/NotFound.vue'
import Account from './views/Account.vue'

//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueRouter);

window.axios = require('axios');

export const router = new VueRouter({
	
	routes: [
		{ path: '/popup/popup.html', component: Main},
		{ path: '/popup/popup.html/test', component: Test},
		{ path: '/popup/popup.html/room', component: Room },
		{ path: '/popup/popup.html/account', component: Account },
		{ path: '*', component: NotFound }
	],
	
	mode: 'history'
});

/* eslint-disable no-new */
new Vue({

	data: {

	},

	computed: {

	},
	router,
	store: store,
	render: h => h(App)
}).$mount('#app');

//when popup window opens, ask background.js for stored state
window.onload = function() {

	this.chrome.runtime.sendMessage({"event":"onload"}, (response) => {
		console.log("read state:");
		//response is the stored state
		
		console.log(response.state);
		store.commit('readState',response.state);

		//check if user has inputed username yet
		console.log(store.state);
		console.log(`current username ${store.state.username}`);
		if (response.state.username==null) { //push them towards account page
			router.push('/popup/popup.html/account');
		}
	});


} 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	var evt_type = request.event;
	if (evt_type == "onWriteState") {
		store.commit('readState',request.state);
	}
}

/*
//when popup window closes, save current state on background.js
window.onunload = function() {

	this.chrome.runtime.sendMessage({
		"event":"onunload",
		"state": this.$store.state
	});
}
*/

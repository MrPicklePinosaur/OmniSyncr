import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'

import { store } from './store/store.js'

import App from './App'
import Main from './views/Main.vue'
import Test from './views/Test.vue'
import Room from './views/Room.vue'
import NotFound from './views/NotFound.vue'

//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueRouter);

window.axios = require('axios');

const router = new VueRouter({
	
	routes: [
		{ path: '/popup/popup.html', component: Main},
		{ path: '/popup/popup.html/test', component: Test},
		{ path: '/popup/popup.html/room', component: Room },
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

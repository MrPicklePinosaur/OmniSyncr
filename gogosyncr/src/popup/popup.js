import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'

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

const router = new VueRouter({
	
	routes: [
		{ path: '/', component: Main},
		{ path: '/test', component: Test},
		{ path: '/room', component: Room },
		{ path: '*', component: NotFound }
	],
	
	/*
	routes: [
		{
			path: '/popup/popup.html',
			component: Main,
			children: [
				{
					path: '/test',
					component: Test
				},
				{
					path: '*',
					component: NotFound
				}
			]
		}

	],
	*/
	
	mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  
  data: {

  },

  computed: {

  },
  router,
  render: h => h(App)
}).$mount('#app');

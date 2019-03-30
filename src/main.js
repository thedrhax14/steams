import Vue from 'vue'
import App from './App'
import './assets/css/style.css'
import mapbox from 'mapbox-gl-vue'
import router from './router'
import { store } from './store.js'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import graph from './components/graph/graph.vue'

//Vue.component('graph', graph)
Vue.use(BootstrapVue)
const fb = require('./firebaseConfig.js')

Vue.config.productionTip = true

let app
fb.auth.onAuthStateChanged(user => {
	if (!app) {
		app = new Vue({
			el: '#app',
			router,
			store,
			mapbox,
			template: '<App/>',
			render: h => h(App)
		})
	}
	store.commit('setUser', user)
})

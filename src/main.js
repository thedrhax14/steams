import Vue from 'vue'
import App from './App'
import mapbox from 'mapbox-gl-vue'
import router from './router'
import { store } from './store.js'
const fb = require('./firebaseConfig.js')

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
	if (!app) {
		app = new Vue({
			el: '#app',
			router,
			store,
			mapbox,
			render: h => h(App)
		})
	}
})

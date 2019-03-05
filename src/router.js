import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import About from './views/About.vue'
import Home from './views/Home.vue'
import Bikes from './views/Bikes.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import InstalledPlugins from './views/InstalledPlugins.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'About',
			component: About
		},
		{
			path: '/bikes',
			name: 'Bikes',
			component: Bikes
		},
		{
			path: '/installedplugins',
			name: 'InstalledPlugins',
			component: InstalledPlugins
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				requiresAuth: false
			}
		}
	]
})

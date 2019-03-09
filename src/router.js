import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import About from './views/About.vue'
import Home from './views/Home.vue'
import Bikes from './views/Bikes.vue'
import PlaceReservation from './views/PlaceReservation.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import InstalledPlugins from './views/InstalledPlugins.vue'
import StationsMap from './views/StationsMap.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'StationsMap',
			component: StationsMap
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
			path: '/placeres',
			name: 'PlaceReservation',
			component: PlaceReservation
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

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
	const currentUser = firebase.auth().currentUser
	if (requiresAuth && !currentUser) {
		next('/login')
	} else if (requiresAuth && currentUser) {
		next()
	} else {
		next()
	}
})

export default router

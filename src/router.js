import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import About from './views/About.vue'
import Home from './views/Home.vue'
import Bikes from './views/Bikes.vue'
import TOS from './views/TOS.vue'
import FAQ from './views/FAQ.vue'
import License from './views/LicenseAgreement.vue'
import Recents from './views/Recents.vue'
import Report from './views/Report.vue'
import Reservations from './views/Reservations.vue'
import Payement from './views/Payement.vue'
import Safety from './views/Safety.vue'
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
			path: '/licenseagreement',
			name: 'License',
			component: License
		},
		{
			path: '/recents',
			name: 'Recents',
			component: Recents
		},
		{
			path: '/reservations',
			name: 'Reservations',
			component: Reservations
		},
		{
			path: '/report',
			name: 'Report',
			component: Report
		},
		{
			path: '/bikes',
			name: 'Bikes',
			component: Bikes
		},
		{
			path: '/payement',
			name: 'Payement',
			component: Payement
		},
		{
			path: '/reserve',
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
			path: '/termsofservice',
			name: 'TOS',
			component: TOS
		},
		{
			path: '/safety',
			name: 'Safety',
			component: Safety
		},
		{
			path: '/FAQ',
			name: 'FAQ',
			component: FAQ
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

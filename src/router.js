import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import About from './views/About.vue'
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
import Auth from './views/Auth.vue'
import InstalledPlugins from './views/InstalledPlugins.vue'
import StationsMap from './views/StationsMap.vue'
// operator
import PlaceOrders from './views/PlaceOrders.vue'
import TrackBikeLocations from './views/TrackBikeLocations.vue'
import ReviewOrders from './views/ReviewOrders.vue'
// manager
import ManagerStatistics from './views/managerStatistics.vue'
//import graph from './components/graph/graph.vue'

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
			path: '/manStats',
			name: 'manStats',
			component: ManagerStatistics
		},
		{
			path: '/trackbl',
			name: 'trackbl',
			component: TrackBikeLocations
		},
		{
			path: '/revieworders',
			name: 'revieworders',
			component: ReviewOrders
		},
		{
			path: '/placeorders',
			name: 'placeorders',
			component: PlaceOrders
		},
		{
			path: '/auth',
			name: 'Auth',
			component: Auth,
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
		next('/auth')
	} else if (requiresAuth && currentUser) {
		next()
	} else {
		next()
	}
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
// User
import About from './views/About.vue'
import Bikes from './views/Bikes.vue'
import TOS from './views/TOS.vue'
import FAQ from './views/FAQ.vue'
import License from './views/LicenseAgreement.vue'
import Recents from './views/Recents.vue'
import Report from './views/Report.vue'
import Reservations from './views/Reservations.vue'
import Payement from './views/Payement.vue'
import NewPayement from './views/NewPayement.vue'
import Safety from './views/Safety.vue'
import PlaceReservation from './views/PlaceReservation.vue'
import ConfirmOrder from './views/confirmOrder.vue'
import Profile from './views/Profile.vue'
import Auth from './views/Auth.vue'
import InstalledPlugins from './views/InstalledPlugins.vue'
import BookPage from './views/BookPage.vue'
import Dashboard from './views/Dashboard.vue'
// operator
import PlaceOrders from './views/PlaceOrders.vue'
import TrackBikeLocations from './views/TrackBikeLocations.vue'
import ReviewOrders from './views/ReviewOrders.vue'
// manager
import ManagerStatistics from './views/managerStatistics.vue'
//import graph from './components/graph/graph.vue'

import StationInterface from './views/StationInterface.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'BookPage',
			component: BookPage,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/newCard',
			name: 'NewPayement',
			component: NewPayement,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/about',
			name: 'About',
			component: About
		},
		{
			path: '/confirm',
			name: 'ConfirmOrder',
			component: ConfirmOrder,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/licenseagreement',
			name: 'License',
			component: License
		},
		{
			path: '/recents',
			name: 'Recents',
			component: Recents,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/reservations',
			name: 'Reservations',
			component: Reservations,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/report',
			name: 'Report',
			component: Report,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/bikes',
			name: 'Bikes',
			component: Bikes
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard
	  },
		{
			path: '/payement',
			name: 'Payement',
			component: Payement,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/reserve',
			name: 'PlaceReservation',
			component: PlaceReservation,
			meta: {
				requiresAuth: true
			}
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
			path: '/stationinterface',
			name: 'stationinterface',
			component: StationInterface
		},
		{
			path: '/auth',
			name: 'Auth',
			component: Auth,
			meta: {
				requiresGuest: true
			}
		}
	]
})

/* router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
	const currentUser = firebase.auth().currentUser
	if (requiresAuth && !currentUser) {
		next('/auth')
	} else if (requiresAuth && currentUser) {
		next()
	} else {
		next()
	}
}) */

router.beforeEach((to, from, next) => {
	if (to.matched.some(x => x.meta.requiresAuth)) {
		if (!firebase.auth().currentUser) {
			next({
				path: '/auth',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else if (to.matched.some(x => x.meta.requiresGuest)) {
		if (firebase.auth().currentUser) {
			next({
				path: '/',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else {
		next()
	}
})
export default router

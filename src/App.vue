<template>
	<div id="app">
		<LoadingDisplay/>
		<Push v-if='IsAvailable' width="250">
			<span><h1>Menu</h1></span>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/" class="fas fa-map">
				<span>Reserve<br>bike</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/reservations" class="fas fa-book-open">
				<span>Reservations</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/payement" class="fas fa-credit-card">
				<span>Payment methods</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/placeorders" class="fas fa-bicycle">
				<span>Place order</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/revieworders" class="fas fa-th-list">
				<span>Review orders</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/trackbl" class="fas fa-map-marked-alt">
				<span>Track bike</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/stationinterface" class="fas fa-wrench">
				<span>Setup station</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 2' to="/manStats" class="fas fa fa-chart-bar">
				<span>Statistics</span>
			</router-link>
		</Push>
		<main id="page-wrap">
			<router-view/>
		</main>
	</div>
</template>

<script>
import LoadingDisplay from '@/components/LoadingDisplay.vue'
import { Push } from 'vue-burger-menu'
import { mapState } from 'vuex'
const fb = require('./firebaseConfig.js')

export default {
	components: {
		LoadingDisplay,
		Push
	},
	computed: {
		...mapState(['user']),
		Menu() {
			var menu = [
				{
					href: '/',
					title: 'Map',
					icon: 'fa fa-map'
				}
			]
			if(this.$store.state.user) {
				menu.push({
					href: '/reservations',
					title: 'Reservations',
					icon: 'fa fa-book-open'
				})
				menu.push({
					href: '/payement',
					title: 'Payement',
					icon: 'fa fa-credit-card'
				})
				if(this.$store.state.userInfo.PermissionLevel > 0) {
					menu.push({
						href: '/placeorders',
						title: 'Place order',
						icon: 'fa fa-bicycle'
					})
					menu.push({
						href: '/revieworders',
						title: 'Review orders',
						icon: 'fa fa-th-list'
					})
					menu.push({
						href: '/trackbl',
						title: 'Track bike',
						icon: 'fa fa-map-marked-alt'
					})
					if(this.$store.state.userInfo.PermissionLevel > 1) {
						menu.push({
							href: '/manStats',
							title: 'Statistics',
							icon: 'fa fa-chart-bar'
						})
					}
					menu.push({
						href: '/stationinterface',
						title: 'Setup station',
						icon: 'fa fa-wrench'
					})
				}
			} else {
				menu.push({
					href: '/auth',
					title: 'Sign in/up',
					icon: 'fa fa-user'
				})
				menu.push({
					href: '/reservations',
					title: 'Reservations',
					icon: 'fa fa-book-open',
					disabled: true
				})
				menu.push({
					href: '/payement',
					title: 'Payement',
					icon: 'fa fa-credit-card',
					disabled: true
				})
			}
			return menu
		},
	},
	methods: {
		logout () {
			fb.auth.signOut().then(() => {
				console.log('Logged out')
				this.$router.push('/auth')
			}).catch(err => {
				console.log(err)
			})
		}
	},
	computed: {
		IsAvailable(){
			return !this.$store.state.isStationInterfaceActive
		}
	},
	created () {
		console.log('dispatch \'fetchBikeTypes\' on created in app.vue')
		this.$store.dispatch('fetchBikeTypes')
	}
}
</script>

<style>
.bm-menu {
	background-color: #E53935;
}

nav a, nav span {
	color: white;
	text-decoration: none;
}

nav a:hover {
	color: white;
	text-decoration: none;
}

.bm-cross {
    background: #fff;
}
</style>

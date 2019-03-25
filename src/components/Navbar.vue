<template>
	<sidebar-menu :menu="Menu" collapsed width='200px'/>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'

export default {
	name: 'NavBar',
	components: {
		SidebarMenu
	},
	computed: {
		userPermission () {
			// 0 = customer, 1 = operator, 2 = manager, 3 = admin
			return this.$store.state.userInfo.PermissionLevel
		},
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
		IsUserLoggedIn() {
			return this.$store.state.user != null
		}
	}
}
</script>

<template>
	<sidebar-menu :menu="menu" />
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'

export default {
	name: 'NavBar',
	data() {
		return {
			menu: [
				{
					header: true,
					title: 'Main Navigation'
				},
				{
					href: '/',
					title: 'Dashboard',
					icon: 'fa fa-user'
				},
				{
					href: '/charts',
					title: 'Charts',
					icon: 'fa fa-chart-area',
					child: [
						{
							href: '/charts/sublink',
							title: 'Sub Link'
						}
					]
				}
			]
		}
	},
	components: {
		SidebarMenu
	},
	computed: {
		userPermission () {
			// 0 = customer, 1 = operator, 2 = manager, 3 = admin
			return this.$store.state.userInfo.PermissionLevel
		}
	}
}
</script>

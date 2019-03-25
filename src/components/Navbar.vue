<template>
	<sidebar-menu :menu="menu" collapsed/>
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
					title: 'Welcome'
				},
				{
					href: '/',
					title: 'Dashboard',
					icon: 'fa fa-user'
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
		},
		
	}
}
</script>

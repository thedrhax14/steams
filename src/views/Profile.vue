<template>
	<div class="profile">
		<b-jumbotron bg-variant="light" class="sm-8 md-8">
		<b-container fluid>
		<transition name="fade">
			<div v-if="this.$store.state.performingRequest" class="loading">
				<p>..</p>
			</div>
		</transition>
		<h3>Profile</h3>
		<p>Full Name - {{ this.$store.state.user.displayName }}</p>
		<p>Change payement UserInfo.PermissionLevel }}</p>
	</b-container>
</b-jumbotron>
	</div>
</template>

<script>
export default {
	data () {
		return {
			defaultBikeData: {
				biketypeId: 'MB',
				bikeId: '00001'
			}
		}
	},
	computed: {
		myReservations () {
			return this.$store.state.history.filter(entry => entry.data.uid == this.$store.state.user.uid)
		},
		UserInfo () {
			return this.$store.state.userInfo
		}
	},
	created () {
		// console.log('dispatch \'fetchUserInfomation\' on created in Profile.vue')
		// this.$store.dispatch('fetchUserInfomation', this.$store.state.user.uid)
		// console.log('commit \'setUserHistory\' on created in Profile.vue')
		// this.$store.commit('setUserHistory', [])
		// console.log('dispatch \'fetchUserHistory\' on created in Profile.vue')
		// this.$store.dispatch('fetchUserHistory')
	}
}
</script>

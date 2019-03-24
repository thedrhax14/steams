<template>
	<div class="profile">
		<transition name="fade">
			<div v-if="this.$store.state.performingRequest" class="loading">
				<p>..</p>
			</div>
		</transition>
		<h3>Profile</h3>
		<p>UID - {{ this.$store.state.user.uid }}</p>
		<p>Name - {{ this.$store.state.user.displayName }}</p>
		<p>Permission level - {{ UserInfo.PermissionLevel }}</p>
		<h3>Payment methods</h3>
		<b-list-group>
			<b-list-group-item v-for="PaymentMethod in PaymentMethods">
				<p>{{ PaymentMethod }}</p>
			</b-list-group-item>
		</b-list-group>
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
		},
		PaymentMethods () {
			return this.$store.state.userInfo.PaymentMethods
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

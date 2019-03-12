<template>
	<div class="profile">
		<transition name="fade">
			<div v-if="this.$store.state.performingRequest" class="loading">
				<p>..</p>
			</div>
		</transition>
		<h1>Profile</h1>
		<p>UID - {{ this.$store.state.currentUser.uid }}</p>
		<p>Name - {{ this.$store.state.currentUser.displayName }}</p>
		<h1>Bike history</h1>
		<button @click='returnBike'>Return default bike</button>
	</div>
</template>

<script>
export default {
	methods: {
		returnBike () {
			this.$store.dispatch('returnBike')
		}
	},
	created () {
		this.$store.dispatch('fetchUserHistory')
	},
	beforeCompile () {
		console.log('beforeCompile', this)
	},
	compiled () {
		console.log('compiled', this)
	},
	ready () {
		console.log('ready', this)
	}
}
</script>

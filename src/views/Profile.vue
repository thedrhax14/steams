<template>
	<div class="profile">
		<transition name="fade">
			<div v-if="this.$store.state.performingRequest" class="loading">
				<p>..</p>
			</div>
		</transition>
		<h1>Profile</h1>
		<p>UID - {{ this.$store.state.user.uid }}</p>
		<p>Name - {{ this.$store.state.user.displayName }}</p>
		<p>Permission level - {{ this.$store.state.userInfo.PermissionLevel }}</p>
		<h1>Booking history</h1>
		<b-list-group>
			<b-list-group-item v-for="bike in myReservations">
				<p>{{ bike }}</p>
				<button @click='returnBike(bike)'>Return</button>
			</b-list-group-item>
		</b-list-group>
		<button @click='returnDefaultBike'>Return default bike</button>
		<button @click='bookDefaultBike'>Book default bike</button>
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
		myReservations() {
			return this.$store.state.userhistory
		}
	},
	methods: {
		returnDefaultBike () {
			this.$store.dispatch('returnBike', this.defaultBikeData)
		},
		bookDefaultBike () {
			this.$store.dispatch('bookBike', this.defaultBikeData)
		},
		returnBike (bike) {
			console.log('Returning bike ', bike)
			this.$store.dispatch('returnBike', this.defaultBikeData)
		},
	}
}
</script>

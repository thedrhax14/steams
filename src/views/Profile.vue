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
		<button @click='returnDefaultBike'>Return default bike</button>
		<button @click='bookDefaultBike'>Book default bike</button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			defaultBikeData: {
				biketypeId: 'BJUocgao1XSIYR2LnkWp',
				bikeId: 'A04OkMgvxO12QSjTD5pK'
			}
		}
	},
	methods: {
		returnDefaultBike () {
			this.$store.dispatch('returnBike', this.defaultBikeData)
		},
		bookDefaultBike () {
			this.$store.dispatch('bookBike', this.defaultBikeData)
		}
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

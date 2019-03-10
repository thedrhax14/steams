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
		<table>
			<tr>
				<th>Name</th>
				<th>Price</th>
			</tr>
			<tr v-for="bike in this.$store.state.userhistory" :key="bike.id">
				<td><a @click="returnBike(bike.id)">{{ bike.data()['Bike Type'] }}</a></td>
				<td>{{ bike.data()['Cost per hour'] }}</td>
			</tr>
			<button @click="returnBike">Return Bike</button>
		</table>
	</div>
</template>

<script>
export default {
	methods: {
		returnBike (id) {
			this.$store.dispatch('selectBike', id)
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

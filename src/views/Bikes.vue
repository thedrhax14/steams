<template>
	<div class="list_of_bikes">
		<transition name="fade">
			<div v-if="this.$store.state.performingRequest" class="loading">
				<p>Loading...</p>
			</div>
		</transition>
		<h1>Available bikes</h1>
		<table>
			<tr>
				<th>Bike Name</th>
				<th>Price</th>
			</tr>
			<tr v-for="bike in this.$store.state.bikes" :key="bike.id">
				<td><a @click="showBike(bike.id)">{{ bike.data()['Bike Type'] }}</a></td>
				<td>{{ bike.data()['Cost per hour'] }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
// const fb = require('../firebaseConfig.js')

export default {
	methods: {
		showBike (id) {
			if (this.$store.state.currentUser) {
				this.$store.dispatch('selectBike', id)
				this.$store.dispatch('rentBike')
			} else {
				alert('Login first')
			}
		}
	},
	created () {
		console.log('created', this)
		if (this.$store.state.bikes.length === 0) {
			this.$store.dispatch('fetchBikes')
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

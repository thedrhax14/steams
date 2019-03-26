<template>
	<div id="popup">
		{{ Location }} Station
		<br/>
		<b-button :disabled='!IsAvailable' variant="danger" @click="prepareForBooking">
			<div v-if='IsAvailable'>
				Book here
			</div>
			<div v-else>
				No bikes are available at the station
			</div>
		</b-button>
		<br/>
		<small> {{ message }} </small>
	</div>
</template>

<script>
export default {
	name: 'PopupContent',
	props: {
		Location: String
	},
	data () {
		return {
			message: 'click to see what bikes are available!'
		}
	},
	computed: {
		IsAvailable () {
			var result = false
			this.$store.state.bikes.forEach(bike => {
				// console.log(bike.data.Reserved + ' == false ' + '&& ' + bike.data.Location + ' == ' + this.Location + " =",bike.data.Reserved == false && bike.data.Location == this.Location)
				if (bike.data.Reserved == false && bike.data.Location == this.Location) { result |= true }
			})
			return result
		}
	},
	methods: {
		prepareForBooking () {
			this.$store.commit('setSelectedStation', this.Location)
		}
	}
}
</script>

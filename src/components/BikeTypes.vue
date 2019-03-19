<template>
	
</template>

<script>
export default {
	name: 'BikeTypes'
	data () {
		return {
			AvailableBikeTypes: Array
		}
	}
	props: {
		Location: String
	},
	methods: {
		GenerateAvailableBikeTypes() {
			this.AvailableBikeTypes = Array
			this.$store.state.bikes.forEach(bikeDoc => {
				AvailableBikeTypes[bikeDoc.TypeRef].push(bikeDoc.data)
			})
		}
	}
}
</script>
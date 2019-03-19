<template>
	<div id="bike-types">
		<b-list-group>
			<b-list-group-item v-for='bike in GenerateAvailableBikeTypesAtLocation'>
				<Bike v-bind:bike='bike' v-bind:ShowRaw='true'/>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import Bike from '@/components/Bike.vue'
export default {
	name: 'BikeTypes',
	props: {
		Location: String
	},
	components: {
		Bike
	},
	computed: {
		GenerateAvailableBikeTypesAtLocation() {
			var AvailableBikeTypes = []
			this.$store.state.bikes.forEach(bikeDoc => {
				AvailableBikeTypes.push(bikeDoc)
			})
			return AvailableBikeTypes
		}
	}
}
</script>
<template>
	<div id="bike-types" v-if='Location!="None"'>
		<h1>Bike types at {{ Location }}</h1>
		<b-list-group>
			<b-list-group-item v-for='BikeType in BikeTypesAtLocation'>
				<Bike v-bind:bike='BikeType.data'/>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import Bike from '@/components/Bike.vue'
export default {
	name: 'BikeTypes',
	components: {
		Bike
	},
	computed: {
		BikeTypesAtLocation() {
			var BikeTypes = []
			var BikeTypeIDs = []
			this.$store.state.bikes.forEach(bikeDoc => {
				if(bikeDoc.Location==this.Location)
					BikeTypeIDs.push(bikeDoc.TypeID)
			})
			BikeTypeIDs = [...new Set(BikeTypeIDs)]
			this.$store.state.bikeTypes.forEach(bikeTypeDoc => {
				if(BikeTypeIDs.includes(bikeTypeDoc.id))
					BikeTypes.push(bikeTypeDoc)
			})
			return BikeTypes
		},
		Location() {
			return this.$store.state.selectedStation
		}
	}
}
</script>
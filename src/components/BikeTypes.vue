<template>
	<div>
		<b-form
			@submit="onSubmit"
			@reset="onReset"
			v-if="Location!='None'">
			<h1>Booking</h1>
			<b-form-radio-group
				id="BikeTypesRadios"
				buttons
				stacked
				v-model="SelectedStation"
				:options="BikeTypesAtLocation"
				name="radioBtnStacked"/>
			<b-button type="submit" variant="primary">Submit</b-button>
			<b-button type="reset" variant="danger">Reset</b-button>
		</b-form>
	</div>
</template>

<script>
import BikeType from '@/components/BikeType.vue'
export default {
	name: 'BikeTypes',
	data() {
		return {
			SelectedStation: ""
		}
	},
	components: {
		BikeType
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
		},
		FormTitle() {
			return "Available book types at " + this.$store.state.selectedStation
		}
	},
	methods: {
		onSubmit(evt) {

		},
		onReset(evt) {

		}
	}
}
</script>
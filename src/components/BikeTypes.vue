<template>
	<b-container align-h="center" v-if="Location!='None'">
		<b-row align-h="center">
			<h1 class='formTitle'>Booking</h1>
		</b-row>
		<b-row align-h="center">
			<b-form-radio-group
				id="BikeTypesRadios"
				buttons
				stacked
				v-model="SelectedBikeType"
				:options="OptionsOfBikeTypesAtLocation"
				name="radioBtnStacked"/>
		</b-row>
		<b-row align-h="center">
			<b-button
				block
				variant="primary"
				@click='Submit'
				:disabled='!SelectedBikeType'>
				Submit
			</b-button>
			<b-button
				block
				variant="danger"
				@click='Reset'>
				Reset
			</b-button>
		</b-row>
	</b-container>
</template>

<script>
// import '@/styles/BikeTypes.css'
// import BFormRow from 'bootstrap-vue/es/components/form/form-row'
// import Vue from 'vue'

// Vue.component('b-form-row', BFormRow)

export default {
	name: 'BikeTypes',
	data() {
		return {
			SelectedBikeType: ''
		}
	},
	computed: {
		OptionsOfBikeTypesAtLocation() {
			var AvailableBikeTypes = []
			var BikeTypeIDs = []
			this.$store.state.bikes.forEach(bikeDoc => {
				console.log(bikeDoc.Location,'==',this.Location,'=',bikeDoc.Location==this.Location)
				console.log('bikeDoc',bikeDoc)
				if(bikeDoc.Location==this.Location)
					BikeTypeIDs.push(bikeDoc['Type name'])
				console.log('BikeTypeIDs',BikeTypeIDs)
			})
			BikeTypeIDs = [...new Set(BikeTypeIDs)]
			console.log('BikeTypeIDs',BikeTypeIDs)
			this.$store.state.bikeTypes.forEach(bikeType => {
				console.log('bikeType.id is in ',BikeTypeIDs,'?')
				if(BikeTypeIDs.includes(bikeType.id))
					AvailableBikeTypes.push({
						text: bikeType.data['Type name'] + ' ' + bikeType.data.Price + ' £/h',
						value: bikeType.id
					})
			})
			return AvailableBikeTypes
		},
		Location() {
			return this.$store.state.selectedStation
		},
		AvailableBikeAtLocationByBikeTypeID() {

		},
		FormTitle() {
			return "Available book types at " + this.$store.state.selectedStation
		}
	},
	methods: {
		Submit(evt) {
			alert(this.SelectedBikeType)
		},
		Reset(evt) {
			this.SelectedBikeType = ''
		}
	}
}
</script>
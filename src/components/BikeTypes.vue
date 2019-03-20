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
				:options="BikeTypesAtLocation"
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
					BikeTypes.push({
						text: bikeTypeDoc.data.Name + ' ' + bikeTypeDoc.data.Price + ' £/h',
						value: bikeTypeDoc.id
					})
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
		Submit(evt) {
			alert(SelectedBikeType)
		},
		Reset(evt) {
			this.SelectedBikeType = ''
		}
	}
}
</script>
<template>
	<div>
		<h1>Booking at {{ this.$store.state.selectedStation + ' Station' }}</h1>
		<b-form-group label="Bike types at the station">
			<b-form-radio
				v-model="selectedBikeTypeId"
				button
				v-for="bike in this.$store.state.bikeTypes"
				v-if="bike.AvailableBikes.length > 0"
				:value="bike.Id">
				<Bike :bikeTypeInfo='bike'/>
			</b-form-radio>
			<b-form-input v-model="startDate" type="date"/>
			<b-form-input v-model="startTime" type="time"/>
		</b-form-group>
		<div class="mt-3">
			<p>Selected: <strong>{{ selectedBikeTypeId }}</strong></p>
			<p>Start startDate: <strong>{{ startDate }}</strong></p>
			<p>Start startTime: <strong>{{ startTime }}</strong></p>
		</div>
		<b-button :disabled='!dateAndTimeState' variant="outline-success" @click='book'>
			Book
		</b-button>
	</div>
</template>

<script>
import Bike from '@/components/Bike.vue'
const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander
export default {
	computed: {
		dateAndTimeState () {
			return this.startDate && this.startTime
		}
	},
	components: {
		Bike
	},
	data () {
		return {
			selectedBikeTypeId: '',
			startDate: '',
			startTime: ''
		}
	},
	methods: {
		book () {
			// alert('Booking ' + this.selectedBikeTypeId)
			this.$store.dispatch('bookFirstAvailableBikeType', {
				bikeTypeId: this.selectedBikeTypeId,
				StartDateAndTime: this.startDate + 'T' + this.startTime + ':00'
			})
		}
	},
	created () {
		this.$store.dispatch('fetchbikeTypes')
	}
}
</script>

<style>
b-form-radio{
	background-color: #000;
}
</style>

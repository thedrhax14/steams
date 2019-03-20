<template>
	<div class="wrap">
		<h1 id="reservationTitle">Booking at {{ this.$store.state.selectedStation + ' Station' }}</h1>
		<b-form-group align="center" label="Bike types available at the station">
			<br>
			<h3> <i class="fas fa-list-ol"></i> &nbsp; How many bikes do you need? </h3>
			<div class="form-group">
			  <b-form-select v-model="selected" class="mb-3">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
				</b-form-select>
		</div>
			<b-form-radio
				v-model="selectedBikeTypeId"
				button
				v-for="bikeType in this.$store.state.bikeTypes"
				v-if="bikeType.AvailableBikes.length > 0"
				:value="bikeType.Id">
				<BikeType :bikeTypeInfo='bikeType'/>
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
import BikeType from '@/components/BikeType.vue'
const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander
export default {
	computed: {
		dateAndTimeState () {
			return this.startDate && this.startTime
		}
	},
	components: {
		BikeType
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

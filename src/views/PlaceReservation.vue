<template>
	<div class="wrap">
		<h1 id="reservationTitle">Booking at {{ this.$store.state.selectedStation + ' Station' }}</h1>
			<br>
			<h3> <i class="fas fa-list-ol"></i> &nbsp; How many bikes do you need? </h3>
			<br>
			<div class="form-group">
			  <b-form-select v-model="selected" class="mb-3">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
				</b-form-select>
		</div>
		<h3><i class="fas fa-bicycle"></i> &nbsp; What type of bike? </h3>
		<b-form-group align="center" label="Bike types available at the station:">
			<br>
			<b-form-radio
				v-model="selectedBikeTypeId"
				button
				v-for="(bike, index) in this.$store.state.bikeTypes"
				v-bind:key='index'
				:value="bike.Id">
				<BikeType v-if="bike.AvailableBikes.length > 0" :bikeTypeInfo='bike'/>
			</b-form-radio>
			<br>
		</b-form-group>
		<div>
		</div>
		<br>
		<h3><i class="fas fa-stopwatch"></i>&nbsp; What time? </h3>
		<br>
		<b-form-input v-model="startDate" type="date"/>
		<br>
		<b-form-input v-model="startTime" type="time"/>
		<div class="mt-3">
			<p>Bike: <strong>{{ selectedBikeTypeId }}</strong></p>
			<p>Quantity: <strong>{{ selected }}</strong></p>
			<p>Date: <strong>{{ startDate }}</strong></p>
			<p>Start time: <strong>{{ startTime }}</strong></p>
		</div>
		<b-button :disabled='!dateAndTimeState' block variant="outline-success" @click='book'>
			Book
		</b-button>
		<b-button block variant="outline-danger" @click='discard'>
			Discard
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
			selected: '',
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
		},
		discard () {
			this.$router.push('/')
		}
	},
	created () {
		this.$store.dispatch('fetchbikeTypes')
	}
}
</script>

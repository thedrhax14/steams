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
			<div class="custom-control custom-radio">
				 <div id="type-1">
					<input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
					<label class="custom-control-label" for="customRadio1"><h5>Standard Bike</h5></label>
					<img src="../assets/images/standard_bike1.png">
					<small v-model="selected" :options="options" plain name="plainInline"></small>
					<button href='/bikes' class="btn btn-danger">More info</button>
				</div>
			</div>
			<hr />
			<div class="custom-control custom-radio">
				 <div id="type-2">
					<input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
					<label class="custom-control-label" for="customRadio2"><h5>Road Bike</h5></label>
					<img src="../assets/images/road_bike1.png">
					<small>£3.00/hr</small>
					<button href='/bikes' class="btn btn-danger">More info</button>
				</div>
			</div>
			<hr />
			<div class="custom-control custom-radio">
				 <div id="type-3">
					<input type="radio" id="customRadio3" name="customRadio" class="custom-control-input">
					<label class="custom-control-label" for="customRadio3"><h5>Cruise Bike</h5></label>
					<img src="../assets/images/cruiser_bike.png">
					<small>£3.00/hr</small>
					<button href='/bikes'class="btn btn-danger">More info</button>
				</div>
			</div>
			<hr/>
			<div class="custom-control custom-radio">
				 <div id="type-4">
					<input type="radio" id="customRadio4" name="customRadio" class="custom-control-input">
			 <label class="custom-control-label" for="customRadio4"><h5>Mountain Bike</h5></label>
					<img src="../assets/images/mtn_bike1.png">
					<small>£3.00/hr</small>
					<button href='/bikes' class="btn btn-danger">More info</button>
				</div>
			</div>
			<hr />
			<div class="custom-control custom-radio">
				 <div id="type-5">
					<input type="radio" id="customRadio5" name="customRadio" class="custom-control-input">
					<label class="custom-control-label" for="customRadio5"><h5>Tandem Bike</h5></label>
					<img src="../assets/images/tandem_bike1.png">
					<small>£3.00/hr</small>
					<button href='/bikes'class="btn btn-danger">More info</button>
				</div>
			</div>
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

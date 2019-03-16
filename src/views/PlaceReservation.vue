<template>
	<body>
	<div class="wrap" style="margin-top: 50px;">
		<h2>Place reservation</h2>
		<hr>
		<form action="action.php">
			<h3> <i class="fas fa-list-ol"></i> &nbsp; How many bikes do you need? </h3>
			<br/>
			<div class="form-group">
			  <b-form-select v-model="selected" class="mb-3">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
				</b-form-select>
		</div>
					{{ selected }}
			<br/>
			<br/>
			<h3><i class="fas fa-bicycle"></i> &nbsp; What type of bike? </h3>
			<br/>
			<div>
				<div class="custom-control custom-radio" v-for="bikeType in this.$store.state.bikeTypes">
					<BikeType v-bind:bikeTypeInfo="bikeType"></BikeType>
						<small v-model="selected" :options="options" plain name="plainInline"></small>
				</div>
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
				 <label class="custom-control-label" for="customRadio3"><h5>Mountain Bike</h5></label>
						<img src="../assets/images/mtn_bike1.png">
						<small>£3.00/hr</small>
						<button href='/bikes' class="btn btn-danger">More info</button>
					</div>
				</div>
				<hr />
				<div class="custom-control custom-radio">
					 <div id="type-4">
						<input type="radio" id="customRadio4" name="customRadio" class="custom-control-input">
						<label class="custom-control-label" for="customRadio4"><h5>Tandem Bike</h5></label>
						<img src="../assets/images/tandem_bike1.png">
						<small>£3.00/hr</small>
						<button href='/bikes'class="btn btn-danger">More info</button>
					</div>
				</div>
	</div>
</template>

<script>
import BikeType from '../components/BikeType.vue'
const fb = require('../firebaseConfig.js')

export default {
	components: {
		BikeType
	},
	data () {
		return {
			selectedBikeTypeId: ''
		}
	},
	methods: {
		book() {
			this.$store.commit('bookFirstAvailableBikeType',this.selectedBikeTypeId)
		}
	},
	created () {
		this.$store.dispatch('fetchbikeTypes')
	}
}
</script>

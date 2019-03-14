<template>
	<body>
	<div class="wrap" style="margin-top: 50px;">
		<h2>Place reservation</h2>
		<hr>
		<form action="action.php">
			<h3> <i class="fas fa-list-ol"></i> &nbsp; How many bikes do you need? </h3>
			<br/>
			<div class="form-group">
		 <select class="form-control" id="exampleFormControlSelect1">
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		 </select>
		</div>
			<br/>
			<br/>
			<h3><i class="fas fa-bicycle"></i> &nbsp; What type of bike? </h3>
			<br/>
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
			<br/>
			<br/>
			<br/>
			<h3><i class="fas fa-stopwatch"></i>&nbsp; What time? </h3>
			<br/>
			<span>
				<h4 style="font-size:20px;">From: &nbsp;</h4>
				<input class="form-control form-control-sm" style="width: 120px;" type="time" name="usr_time" required></span>
			</form>
			<br/>
			<br/>
			<hr>
			<br/>
				<div class="checkoutOption">
				<div id="discard">
					<a href='/'>
						<button style="width:200px;" type="button" class="btn btn-danger">
					Discard
						</button>
				</a>
				</div>
				<div id="makepayement">
					<a href='/payement'>
						<button style=" width:200px;" type="button" class="btn btn-success">
					Make payement
						&nbsp;<i class="fas fa-check fa-sm"></i>
						</button>
					</a>
				</div>
			</div>
			<br/>
			<br/>
		</div>
	 </body>
	</template>

<script>
const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander
export default {
	data () {
		return {
			selected: 'first',
			options: [
				{ text: 'First radio', value: 'first' },
				{ text: 'Second radio', value: 'second' },
				{ text: 'Third radio', value: 'third' }
			]
		}
	},
	created () {
		if (this.$store.state.bikeTypes.length === 0) {
			this.$store.dispatch('fetchbikeTypes')
		}
	}
}
</script>

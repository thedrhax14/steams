<template>
	<div class="wrap" style="margin-top: 50px;">
		<h2>Place reservation</h2>
		<hr>
		<form action="action.php">
			<h3> <i class="fas fa-list-ol"></i> &nbsp; How many bikes do you need? </h3>
			<br/>
			<input class="form-control" pattern="[0-9]{2}" id="inputNumber5" type="number" name="bikecount" placeholder="e.g. 1,2,4" required> <br>
			<h3><i class="fas fa-bicycle"></i> &nbsp; What type of bike? </h3>
			<br/>
			<div class="list-group">
				<li style="cursor:pointer;" class="list-group-item list-group-item-action">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Standard Bike</h5>
						<small style="font-size:20px; font-weight:bold;">£3.00/hr</small>
					</div>
					<button href="bikes.html" style="float:right; margin-top:30px;" class="btn btn-danger">More info</button>
					<img src="../assets/images/standard_bike1.png" style="width:95.75px; height:54.25px; margin-left: -5px;">
				</li>
				<li style="cursor:pointer;" class="list-group-item list-group-item-action">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Road Bike</h5>
						<small style="font-size:20px; font-weight:bold;">£7.50/hr</small>
					</div>
					<button href="bikes.html" style="float:right; margin-top:30px;" class="btn btn-danger">More info</button>
					<img src="../assets/images/road_bike1.png" style="width:96px; height:55.75px; margin-left: -5px;">
				</li>
				<li style="cursor:pointer;" class="list-group-item list-group-item-action">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Mountain Bike</h5>
						<small style="font-size:20px; font-weight:bold;">£10.00/hr</small>
					</div>
					<button href="bikes.html" style="float:right; margin-top:30px;" class="btn btn-danger">More info</button>
					<img src="../assets/images/mtn_bike1.png" style="width:95.75px; height:53px; margin-left: -5px;">
				</li>
				<li style="cursor:pointer;" class="list-group-item list-group-item-action">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Tandem Bike</h5>
						<small style="font-size:20px; font-weight:bold;">£5.00/hr</small>
					</div>
					<a href="bikes.html"><button style="float:right; margin-top:30px;" class="btn btn-danger">More info</button></a>
					<img src="../assets/images/tandem_bike1.png" style="width:84.5px; height:36.75px; margin-left: -5px;">
				</li>
			</div>
			<br/>
			<h3><i class="fas fa-stopwatch"></i>&nbsp; What time? </h3>
			<br/>
			<span><h4 style="font-size:20px; float: left;">From: &nbsp;</h4> <input class="form-control form-control-sm" style="width: 120px; float:left;" type="time" name="usr_time" required>
				<h4 style="font-size: 20px; float: left; margin-left: 60px;">Till: </h4><input class="form-control form-control-sm" style="width:120px; float: right; margin-right:90px;" type="time" name="usr_time" required></span>
			</form>
			<br/>
			<br/>
			<hr>
			<br/>
			<a href="reservebike.html">
				<button style="margin-left: 490px; width:100px;" type="button" class="btn btn-danger">
					Discard
				</button>
			</a>
			<a href="makepayement.html">
				<button style=" width:200px;" type="button" class="btn btn-success">
					Make payement
					<i class="fas fa-check fa-sm"></i>
				</button>
			</a>
			<br/>
			<br/>
		</div>
	</template>

<script>
const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander

export default {
	created () {
		if(this.$store.state.bikeTypes.length===0){
			this.$store.dispatch('fetchbikeTypes')
		}
	}
}
</script>

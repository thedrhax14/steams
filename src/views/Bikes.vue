<template>
	<body>
	<div class="wrap" style="margin-top: 50px;">
	<div class="list_of_bikes">
		<transition name="fade">
			<div v-if="this.$store.state.performingRequest" class="loading">
				<p>Loading...</p>
			</div>
		</transition>
		<h1>Available bikes</h1>
		<table>
			<tr>
				<th>Bike Name</th>
				<th>Price</th>
			</tr>
			<tr v-for="bike in this.$store.state.bikes" :key="bike.id">
				<td><a @click="showBike(bike.id)">{{ bike.data()['Bike Type'] }}</a></td>
				<td>{{ bike.data()['Cost per hour'] }}</td>
			</tr>
		</table>
		<h2 class="bike-header">Bike options</h2>
    <p> These are the bike options the company currently offers</p>
    <hr>
		<div class="card-deck" style="width:240%; margin-left: -69%;">
      <div class="card">
        <img src="../assets/images/road_bike1.png" class="card-img-top" alt="..."style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Road bike</h5>
          <p class="card-text">Road bikes are simply just bikes that dominate the roads with a design that favors the conditions on the road and introduces great efficiency and speed on the road with very little effort.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
      <div class="card">
        <img src="../assets/images/mtn_bike1.png" class="card-img-top" alt="..."style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Mountaint bike</h5>
          <p class="card-text">The purpose of Montaint bikes is to focus mostly on being used in off-road trails but it can also be usedd on the road. Mountain bikes have suspension on both wheels to help navigate incoming obstacles along the way and they are also build with a mechanism called bicycle gearing that allows ease of cycling during up and down hills.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
      <div class="card">
        <img src="../assets/images/tandem_bike1.png" class="card-img-top" alt="..."style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Tandem bike</h5>
          <p class="card-text">A Tandem bike is a 2 person bike that includes 2 seats, 2 handle bars and 2 pedals. There is no skill needed to ride a Tandem bike other than being able to ride a bike and coordination, overall it is a new experience for riding a bike.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
      <div class="card">
        <img src="../assets/images/standard_bike1.png" class="card-img-top" alt="..." style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Standard bike</h5>
          <p class="card-text">Any bike is considered as a communting bike. However, the commuting bike we provide consists of additional features such as front and rear lights, racks and fenders. These make a perfect bike for commuting within a city.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
    </div>
	</div>
</div>
<footer class="page-footer font-small mdb-color pt-4">

	<!-- Footer Links -->
	<div class="container text-center text-md-left">

		<!-- Footer links -->
		<div class="row text-center text-md-left mt-3 pb-3">

			<!-- Grid column -->

			<hr class="w-100 clearfix d-md-none">



			<!-- Grid column -->
			<div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
				<h6 class="text-uppercase mb-4 font-weight-bold">Useful links</h6>
				<p>
					<a href='/profile'>Your Account</a>
				</p>
				<p>
					<a href='/'>Help</a>
				</p>
				<p>
					<a href='/Licenseagreement'>License Agreement</a>
				</p>
				<p>
					<a href='/Termsofservice'>Terms of Service</a>
				</p>
			</div>
			<!-- Grid column -->


			<!-- Grid column -->
			<div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
				<h6 class="text-uppercase mb-4 font-weight-bold">Support</h6>
				<p>
					<a href='/FAQ'>FAQ</a>
				</p>
				<p>
					<a href='/safety'>Safety</a>
				</p>
				<p>
					<a href='/Licenseagreement'>License Agreement</a>
				</p>

			</div>
			<!-- Grid column -->
			<div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
				<h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
				<p>
					<i class="fas fa-envelope mr-3"></i> spin@gmail.com</p>
				<p>
					<i class="fas fa-phone mr-3"></i> 04 74 567 88</p>
				<p>
					 <i class="fas fa-calendar mr-3"></i>Friday – Thursday: 8am to 10pm</p>
				<p>
						<i class="fas fa-map-marker-alt mr-3"></i>Edinburgh, United Kingdom</p>
			</div>
		<!-- Grid column -->
		<div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
			<h6 class="text-uppercase mb-4 font-weight-bold">Company</h6>

			<p>
				<a href='/about'>About Us</a>
			</p>
		</div>
		</div>
		<!-- Grid row -->
		<div class="row d-flex align-items-center">

			<!-- Grid column -->
			<div class="col-md-7 col-lg-8">

				<!--Copyright-->
				<p class="text-center text-md-left">&copy; 2019 Copyright:
					<a href="https://mdbootstrap.com/education/bootstrap/">
						<strong> Spin.com</strong>
					</a>
				</p>

			</div>
			<!-- Grid column -->

			<!-- Grid column -->
			<div class="col-md-5 col-lg-4 ml-lg-0">

				<!-- Social buttons -->
				<div class="text-center text-md-right">
					<ul class="list-unstyled list-inline">
						<li class="list-inline-item">
							<a class="btn-floating btn-sm rgba-white-slight mx-1">
								<i class="fab fa-facebook-f"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a class="btn-floating btn-sm rgba-white-slight mx-1">
								<i class="fab fa-twitter"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a class="btn-floating btn-sm rgba-white-slight mx-1">
								<i class="fab fa-google-plus-g"></i>
							</a>
						</li>
						<li class="list-inline-item">
							<a class="btn-floating btn-sm rgba-white-slight mx-1">
								<i class="fab fa-linkedin-in"></i>
							</a>
						</li>
					</ul>
				</div>

			</div>
			<!-- Grid column -->

		</div>
		<!-- Grid row -->

	</div>
	<!-- Footer Links -->

</footer>
</body>
</template>

<script>
// const fb = require('../firebaseConfig.js')

export default {
	methods: {
		showBike (id) {
			if (this.$store.state.currentUser) {
				this.$store.dispatch('selectBike', id)
				this.$store.dispatch('rentBike')
			} else {
				alert('Login first')
			}
		}
	},
	created () {
		console.log('created', this)
		if (this.$store.state.bikes.length === 0) {
			this.$store.dispatch('fetchBikes')
		}
	},
	beforeCompile () {
		console.log('beforeCompile', this)
	},
	compiled () {
		console.log('compiled', this)
	},
	ready () {
		console.log('ready', this)
	}
}
</script>

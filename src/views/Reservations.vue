<template>
		<body>
   		<div class="wrap" style="margin-top: 50px;">
    		<h2> My reservations</h2>
    		<hr>
    		<br/>
    		<div class="card text-center">
  				<div class="card-header" style="font-weight:bold;">
    					Bike ID: 01256
  				</div>
  				<div class="card-body">
    				<p class="card-text">
      			<ul class="card-list-reservation">
        			<li>PIN: ***33 </li>
        			<li>Going to: Edinburgh Park</li>
        			<li>Start time: 7:25pm</li>
        			<li>Status: Reserved</li>
        			<li>End time: 9:30pm</li>
      			</ul>
    			</p>
  			</div>
			</div>

			<br/>
			<div class="card text-center">
				<div class="card-header" style="font-weight:bold;">
						Bike ID: 04231
				</div>
				<div class="card-body">
					<p class="card-text">
		  			<ul class="card-list-reservation">
						    <li v-for="item in items">{{ item }} </li>
		  			</ul>
					</p>
				</div>
			</div>
		</div>

		<br/>
		<br/>

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
const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander
export default {
	data () {
	 items: [
		 { message: 'PIN' },
		 { message: 'Going to:' },
		 { message: 'Start time:'},
		 { message: 'Status:' }
	 ]
 },
	created () {
		if (this.$store.state.bikeTypes.length === 0) {
			this.$store.dispatch('fetchbikeTypes')
		}
	}
}
</script>

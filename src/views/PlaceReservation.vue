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
			<span><h4 style="font-size:20px; float: left;">From: &nbsp;</h4> <input class="form-control form-control-sm" style="width: 120px; float:left;" type="time" name="usr_time" required></span>
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
  export default {
    data() {
      return {
        selected: 'first',
        options: [
          { text: 'First radio', value: 'first' },
          { text: 'Second radio', value: 'second' },
          { text: 'Third radio', value: 'third' }
        ]
      }
    }
  }
</script>

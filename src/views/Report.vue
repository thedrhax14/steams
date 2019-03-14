<template>
  <body>
    <div class="wrap" style="margin-top: 50px;">
    <h2> Report an issue</h2>
    <hr>
    <br/>
    <form method="POST" enctype="multipart/form-data">
        <label for="inputEmail4"><h3> Please enter you Bike ID: </h3></label>
        <input type="text" pattern="[A-Z]{2}[0-9]{5}" class="form-control" size = "7" id="inputNumber4"  name="bikecount"  placeholder="XX12345" required>
        <small class="text-muted" style="font-size: 11px;">
          The BikeID of the format XX12345 (Two uppercase letters followed by 5 numbers).
        </small>
       <br>
       <h3> What would you like to report about? </h3>
       <div class="input-group">
         <input type="text" class="form-control" placeholder="Other">
         <div class="selection-list">
           <select class="form-control" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <div class="dropdown-menu">
               <option>Bike Damage</option>
               <option>Lock pin timeout</option>
               <option>Connection problem</option>
             </div>
           </select>
         </div>
       </div>
       <br/>
       <h3> What issue did you face with your bike? </h3>
       <div class="form-group">
          <label class="custom-file-upload">
            <input type="file" name="file">
              <i class="fas fa-plus"></i>Add an image</button>
          </label>
       </div>
       <button type="submit" name="submit">UPLOAD</button>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us more about your issue..."></textarea>
        <br/>
        <hr>
       <button id="my_button" type="button" class="btn btn-danger" style="margin-left:140px; width:200px;">Report</button>
       <div id="my_modal" class="modall">
      </div>
    </form>
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

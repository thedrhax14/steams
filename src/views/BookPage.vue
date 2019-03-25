<template>
	<div id="BookPage">
		<div v-if='Location=="None"'>
			<div class="sicky-top">
				<h2 class="res-message"> Welcome {{ this.$store.state.user.displayName }}!</h2>
				<h3 class="res-lead"> These are the nearest stations to you: </h3>
				<mapbox
					access-token="pk.eyJ1IjoidGhlbW9mcm8iLCJhIjoiY2pxbzZ2M3d1MGR3MjQ0cGpic2FpMWh5MCJ9.0PPnnUqzrWMkFfzFb7m3rQ"
					:map-options="{
						style: 'mapbox://styles/themofro/cjrd1lqa40o5m2sp3bdkdtxdo',
						center: [-3.1917758, 55.9517872],
						zoom: 17
					}"
					:geolocate-control="{
						show: true,
						position: 'top-left'
					}"
					:fullscreen-control="{
						show: true,
						position: 'top-left'
					}"
					@map-click="mapClicked"
					@map-load="mapLoaded"
					@geolocate-geolocate="geolocate"
					@geolocate-error="geolocateError">
				</mapbox>
			</div>
		</div>
		<BikeTypes/>
		<footer style="margin-top:600px;" class="page-footer font-small mdb-color pt-4">
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
	</div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import Vue from 'vue'
import PopupContent from '@/components/PopupContent.vue'
import BikeTypes from '@/components/BikeTypes.vue'

export default {
	components: {
		Mapbox,
		BikeTypes
	},
	data () {
		return {
			PopupVue: Vue.extend(PopupContent),
			message: "Let's reserve a bike!"
		}
	},
	computed: {
		isLoading () {
			return this.$store.state.performingRequest
		},
		Location () {
			return this.$store.state.selectedStation
		}
	},
	methods: {
		mapLoaded (map) {
			console.log('Map is loaded')
		},
		mapClicked (map, e) {
			this.addPopUp(map, e)
		},
		geolocateError (control, positionError) {
			console.log(positionError)
		},
		geolocate (control, position) {
			console.log('User position: ' +
				position.coords.latitude +
				' ' +
				position.coords.longitude)
		},
		addPopUp (map, e) {
			const features = map.queryRenderedFeatures(e.point, { layers: ['markers'] })
			if (!features.length ||
				!features[0].properties ||
				!features[0].properties.stationName) {
				return
			}
			const Popup = new window.mapboxgl.Popup()
			Popup.setLngLat(features[0].geometry.coordinates).setHTML('<div id="vue-popup-content"></div>').addTo(map)
			const pv = new this.PopupVue({
				parent: this,
				propsData: {
					Location: features[0].properties.stationName
				}
			})
			pv.$mount('#vue-popup-content')
		}
	}
}
</script>

<template>
	<div id="BookPage">
		<div v-if='Location=="None"'>
			<div class="sicky-top">
				<h2 class="res-message"> Welcome back{{ this.$store.state.user.id }}!</h2>
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

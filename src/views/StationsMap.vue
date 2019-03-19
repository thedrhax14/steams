<template>
	<div id="map">
		<h2>Nearest Docking Stations</h2>
		<div class="sicky-top">
			<mapbox
				access-token="pk.eyJ1IjoidGhlbW9mcm8iLCJhIjoiY2pxbzZ2M3d1MGR3MjQ0cGpic2FpMWh5MCJ9.0PPnnUqzrWMkFfzFb7m3rQ"
				:map-options="{
					style: 'mapbox://styles/themofro/cjrd1lqa40o5m2sp3bdkdtxdo',
					zoom: 13
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
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import Vue from 'vue'
import PopupContent from '../components/PopupContent.vue'

export default {
	components: {
		Mapbox
	},
	data () {
		return {
			stationName: 'Select station',
			PopupVue: Vue.extend(PopupContent)
		}
	},
	computed: {
		isLoading () {
			return this.$store.state.performingRequest
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
			this.$store.commit('setSelectedStation', features[0].properties.stationName)
			const Popup = new window.mapboxgl.Popup()
			const pv = new this.PopupVue({
				parent: this,
				propsData: {
					locName: features[0].properties.stationName
				}
			})
			pv.$mount('#vue-popup-content')
			Popup.setLngLat(features[0].geometry.coordinates).setHTML('<div id="vue-popup-content"></div>').addTo(map)
		}
	}
}
</script>

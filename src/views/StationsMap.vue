<template>
	<body>
	<div id="map">
		<transition name="fade">
			<div v-if="this.$store.state.performingRequest" class="loading">
				<p>Loading...</p>
			</div>
		</transition>
		<div>
		<mapbox
		access-token="pk.eyJ1IjoidGhlbW9mcm8iLCJhIjoiY2pxbzZ2M3d1MGR3MjQ0cGpic2FpMWh5MCJ9.0PPnnUqzrWMkFfzFb7m3rQ"
		:map-options="{
			style: 'mapbox://styles/themofro/cjrd1lqa40o5m2sp3bdkdtxdo',
			center: [-3.188452, 55.952065],
			zoom: 13
		}"
		:geolocate-control="{
			show: true,
			position: 'top-left'
		}"
		:scale-control="{
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
</body>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import Vue from 'vue'
import PopupContent from '../components/PopupContent.vue'

export default {
	components: {
		Mapbox,
		PopupContent
	},
	data () {
		return {
			stations: [
				{
					name: 'station name 0',
					Lat: -3.188452,
					Long: 55.952065
				},
				{
					name: 'station name 1',
					Lat: -3.188450,
					Long: 55.952063
				}
			],
			stationName: 'Select station',
			PopupVue: Vue.extend(PopupContent)
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
			console.log('User position: ' + position.coords.latitude + ' ' + position.coords.longitude)
		},
		addPopUp (map, e) {
			const features = map.queryRenderedFeatures(e.point, { layers: ['markers'] })
			if (!features.length || !features[0].properties || !features[0].properties.stationName) {
				return
			}
			this.$store.commit('selectLocation', features[0].properties.stationName)
			const Popup = new window.mapboxgl.Popup()
			Popup.setLngLat(features[0].geometry.coordinates).setHTML('<div id="vue-popup-content"></div>').addTo(map)
			const pv = new this.PopupVue({ 
				parent: this, 
				propsData: { 
					locName:features[0].properties.stationName
				}
			})
			pv._data.selectedLocation = features[0].properties.stationName
			pv.$mount('#vue-popup-content')
		}
	},
	created () {
		console.log('created', this.$store)
	},
	beforeCompile () {
		console.log('beforeCompile')
	},
	compiled () {
		console.log('compiled')
	},
	ready () {
		console.log('ready')
	}
}
</script>

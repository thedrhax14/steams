<template>
	<div>
		<h1>Booking at {{ this.$store.state.selectedStation }}</h1>
		<b-form-group label="Individual radios">
			<b-form-radio v-for="bikeType in this.$store.state.bikeTypes" :value="bikeType.Id" v-model="selectedBikeTypeId" name="some-radios">
				<BikeType :bikeTypeInfo='bikeType'></BikeType>
			</b-form-radio>
		</b-form-group>
		<div class="mt-3">Selected: <strong>{{ selectedBikeTypeId }}</strong></div>
		<b-button variant="outline-success" @click='book'>Book</b-button>
	</div>
</template>

<script>
import BikeType from '../components/BikeType.vue'
const fb = require('../firebaseConfig.js')

export default {
	components: {
		BikeType
	},
	data () {
		return {
			selectedBikeTypeId: ''
		}
	},
	methods: {
		book() {
			alert('Booking ', this.selectedBikeTypeId)
			// this.$store.commit('bookFirstAvailableBikeType',this.selectedBikeTypeId)
		}
	},
	created () {
		this.$store.dispatch('fetchbikeTypes')
	}
}
</script>

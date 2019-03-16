<template>
	<div>
		<b-form-group label="Individual radios">
			<b-form-radio v-for="bikes in this.$store.state.bikeTypes" :value="{{ bikes.Id }}" v-model="selectedBikeTypeId" name="some-radios">{{ bikes.Name }}</b-form-radio>
		</b-form-group>
		<div class="mt-3">Selected: <strong>{{ selectedBikeTypeId }}</strong></div>
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
			this.$store.commit('bookFirstAvailableBikeType',this.selectedBikeTypeId)
		}
	},
	created () {
		this.$store.dispatch('fetchbikeTypes')
	}
}
</script>

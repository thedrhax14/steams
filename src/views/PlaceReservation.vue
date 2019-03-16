<template>
	<div>
		<h1>Booking at {{ this.$store.state.selectedStation }}</h1>
		<b-form-group label="Bike types at the station">
			<b-form-radio
				v-model="selectedBikeTypeId"
				button
				v-for="bikeType in this.$store.state.bikeTypes"
				:value="bikeType.Id">
				<BikeType :bikeTypeInfo='bikeType'/>
			</b-form-radio>
			<b-form-input v-model="startDate" type="date"/>
			<b-form-input v-model="startTime" type="time"/>
		</b-form-group>
		<div class="mt-3">
			<p>Selected: <strong>{{ selectedBikeTypeId }}</strong></p>
			<p>Start startDate: <strong>{{ startDate }}</strong></p>
			<p>Start startTime: <strong>{{ startTime }}</strong></p>
		</div>
		<b-button :disabled='!dateAndTimeState' variant="outline-success" @click='book'>
			Book
		</b-button>
	</div>
</template>

<script>
import BikeType from '@/components/BikeType.vue'
const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander
export default {
	computed: {
		dateAndTimeState () {
			return this.startDate && this.startTime
		}
	},
	components: {
		BikeType
	},
	data () {
		return {
			selectedBikeTypeId: '',
			startDate,
			startTime
		}
	},
	methods: {
		book () {
			alert('Booking ' + this.selectedBikeTypeId)
			// this.$store.commit('bookFirstAvailableBikeType',this.selectedBikeTypeId)
		}
	},
	created () {
		if (this.$store.state.bikeTypes.length === 0) {
			this.$store.dispatch('fetchbikeTypes')
		}
	}
}
</script>

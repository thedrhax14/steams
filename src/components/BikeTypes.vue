<template>
	<div v-if="Location!='None'">
	<div class="wrap">
			<h1>Booking at {{ Location }} Station</h1>
			<br>
			<h3>What type of bike?</h3>
		<b-form-group label-align="center" label="Bike types avilable at the station">
			<b-row>
				<b-list-group>
						<b-list-group-item
							v-for='BikeType in OptionsOfBikeTypesAtLocation'
							button
							@click='Select(BikeType.id)'>
							{{ BikeType.data['Type name'] }}
							{{ BikeType.data.Price }} $/hr
						</b-list-group-item>
				</b-list-group>
			</b-row>
			<b-row>
				<b-form-input type="date" v-model='StartDate'/>
			</b-row>
			<b-row>
				<b-form-input type="time" v-model='StartTime'/>
			</b-row>
			<b-row>
				<b-button
					variant="primary"
					@click='Submit'
					:disabled='!IsFormComplete'>
					Submit
				</b-button>
				<b-button
					variant="danger"
					@click='Reset'>
					Reset
				</b-button>
			</b-row>
		</b-form-group>
		<p v-if='AvailableBikeAtLocationByBikeTypeID'>
			RAW ID {{ AvailableBikeAtLocationByBikeTypeID.id }}
		</p>
		<p v-if='StartDate'>
			StartDate {{ StartDate }}
		</p>
		<p v-if='StartTime'>
			StartTime {{ StartTime }}
		</p>
	</div>
</div>
</template>

<script>
// import '@/styles/BikeTypes.css'
// import BFormRow from 'bootstrap-vue/es/components/form/form-row'
// import Vue from 'vue'

// Vue.component('b-form-row', BFormRow)

export default {
	name: 'BikeTypes',
	data() {
		return {
			StartDate: '',
			StartTime: ''
		}
	},
	computed: {
		OptionsOfBikeTypesAtLocation () {
			var AvailableBikeTypes = []
			var BikeTypeIDs = []
			// console.log('bikes', this.$store.state.bikes)
			this.$store.state.bikes.forEach(bikeDoc => {
				// console.log(bikeDoc.data.Location,'==',this.Location,'=',bikeDoc.data.Location==this.Location)
				// console.log('bikeDoc.data',bikeDoc.data)
				if (bikeDoc.data.Location == this.Location && !bikeDoc.data.Reserved) {
					BikeTypeIDs.push(bikeDoc.data['Type name'])
				}
				// console.log('BikeTypeIDs',BikeTypeIDs)
			})
			BikeTypeIDs = [...new Set(BikeTypeIDs)]
			// console.log('BikeTypeIDs',BikeTypeIDs)
			this.$store.state.bikeTypes.forEach(bikeType => {
				// console.log('bikeType.id is in ',BikeTypeIDs,'?')
				if (BikeTypeIDs.includes(bikeType.id)) {
					AvailableBikeTypes.push(bikeType)
				}
			})
			return AvailableBikeTypes
		},
		Location () {
			return this.$store.state.selectedStation
		},
		AvailableBikeAtLocationByBikeTypeID () {
			return this.$store.state.bikes.filter(bike =>
					bike.data['Type name'] == this.$store.state.selectedBikeTypeId
				&& bike.data.Location == this.Location
				&& bike.data.Reserved == false)[0]
		},
		IsFormComplete() {
			return this.$store.state.selectedBikeTypeId
				&& this.$store.state.selectedBikeTypeId != ''
				&& this.StartDate != ''
				&& this.StartTime != ''
		},
		FormTitle () {
			return 'Available book types at ' + this.$store.state.selectedStation
		}
	},
	methods: {
		Submit (evt) {
			var bikeid = this.AvailableBikeAtLocationByBikeTypeID.id
			alert('Add plz booking:)' + bikeid)
			this.$store.dispatch('addEntryToHistory',{
				BikeID: bikeid,
				PIN: Math.floor((Math.random() * 9999) + 1000),
				"Start location": this.Location,
				"Start time & date": new Date(this.StartDate + 'T' + this.StartTime + 'Z'),
				uid: this.$store.state.user.uid,
				Status: 'Reserved'
			})
		},
		Select(id) {
			console.log('commit setSelectedBikeTypeId',id)
			this.$store.commit('setSelectedBikeTypeId',id)
		},
		Reset (evt) {
			this.$store.commit('setSelectedBikeTypeId','')
			this.$store.commit('setSelectedStation', 'None')
			this.StartDate = ''
			this.StartTime = ''
		}
	}
}
</script>

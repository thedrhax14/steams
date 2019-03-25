<template>
	<div v-if="Location!='None'">
		<b-jumbotron bg-variant="light" class="sm-8 md-8">
		<b-container fluid>
				<b-row class="justify-content-md-center">
			<h1>Booking at {{ Location }} Station</h1>
		</b-row>
			<br>
			<b-row class="justify-content-md-center">
			<h3><i class="fas fa-bicycle"></i> &nbsp;What type of bike?</h3>
		</b-row>
		<b-form-group label-align="center" size="sm" label="Bike types avilable at the station">
			<b-row>
				<b-list-group class="active">
						<b-list-group-item
							v-for='BikeType in OptionsOfBikeTypesAtLocation'
							button
							@click='Select(BikeType.id)'>
							<div id="type-5">
							 <img src="../assets/images/tandem_bike1.png">
							<h5>{{ BikeType.data['Type name'] }}</h5>
							<small>{{ BikeType.data.Price }} €/hr</small>
							</div>
						</b-list-group-item>
				</b-list-group>
			</b-row>
			<br/>
			<h3><i class="fas fa-stopwatch"></i>&nbsp; What time?</h3>
			<b-row>
				<strong> Date: </strong>
				<b-form-input type="date" min="2019-03-25" v-model='StartDate'/>
			</b-row>
			<b-row>
				<strong> Start time: </strong>
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

			<b-row class="mobile-res">
				<b-button
				  block
					variant="primary"
					@click='Submit'
					:disabled='!IsFormComplete'>
					Submit
				</b-button>
				<b-button
				  block
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
	</b-container>
	</b-jumbotron>
</div>
</template>

<script>
// import '@/styles/BikeTypes.css'
// import BFormRow from 'bootstrap-vue/es/components/form/form-row'
// import Vue from 'vue'

// Vue.component('b-form-row', BFormRow)

export default {
	name: 'BikeTypes',
	data () {
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
				bike.data['Type name'] == this.$store.state.selectedBikeTypeId &&
				bike.data.Location == this.Location &&
				bike.data.Reserved == false)[0]
		},
		IsFormComplete () {
			return this.$store.state.selectedBikeTypeId &&
				this.$store.state.selectedBikeTypeId != '' &&
				this.StartDate != '' &&
				this.StartTime != ''
		},
		FormTitle () {
			return 'Available book types at ' + this.$store.state.selectedStation
		}
	},
	methods: {
		Submit (evt) {
			var bikeid = this.AvailableBikeAtLocationByBikeTypeID.id
			this.$store.dispatch('addEntryToHistory', {
				BikeID: bikeid,
				PIN: Math.floor((Math.random() * 9999) + 1000),
				'Start location': this.Location,
				'Start time & date': new Date(this.StartDate + 'T' + this.StartTime + 'Z'),
				'End location': null,
				'End time & date': null,
				Status: 'Reserved',
				uid: this.$store.state.user.uid
			})
			this.$router.push('/reservations')
		},
		Select (id) {
			console.log('commit setSelectedBikeTypeId', id)
			this.$store.commit('setSelectedBikeTypeId', id)
		},
		Reset (evt) {
			this.$store.commit('setSelectedBikeTypeId', '')
			this.$store.commit('setSelectedStation', 'None')
			this.StartDate = ''
			this.StartTime = ''
		}
	}
}
</script>

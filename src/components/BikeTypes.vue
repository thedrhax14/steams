<template>
	<div v-if="Location!='None'">
		<b-jumbotron bg-variant="light" fluid>
		<b-container fluid>
				<b-row class="justify-content-md-center">
			<h1>Booking at {{ Location }} Station</h1>
		</b-row>
			<br>
			<b-row class="justify-content-sm-center">
			<h3><i class="fas fa-bicycle"></i>&nbsp;What type of bike?</h3>
		</b-row>
		<b-row  class="justify-content-md-center">
		<b-form-group label-align="center" size="sm">
			<b-row>
				<b-list-group class="active text-center">
						<b-list-group-item
							v-for='BikeType in OptionsOfBikeTypesAtLocation'
							button
							@click='Select(BikeType.id)'>
							<div id="type" v-on:click="selected = !selected" v-bind:class="{selected: selected}">
							<img :src='GetImage(BikeType.id)' style="width:60%">
							<h5>{{ BikeType.data['Type name'] }}</h5>
							<strong>{{ BikeType.data.Price }} €/hr</strong>
							</div>
						</b-list-group-item>
				</b-list-group>
			</b-row>
			<br/>
			<b-row class="justify-content-sm-center">
			<h3><i class="fas fa-stopwatch"></i>&nbsp; What time?</h3>
		</b-row>
			<b-row>
				<strong> Date: </strong>
				<b-form-input type="date" min="2019-03-26" max="2019-03-28" v-model='StartDate'/>
			</b-row>
			<b-row>
				<strong> Start time: </strong>
				<b-form-input type="time" v-model='StartTime'/>
			</b-row>
			<div style="text-align:center;" class="booking-summary">
				 <h4>Booking summary:</h4>
				<p v-if='AvailableBikeAtLocationByBikeTypeID'>
					Bike ID: {{ AvailableBikeAtLocationByBikeTypeID.id }}
				</p>
				<p v-if='StartDate'>
					Date: {{ StartDate }}
				</p>
				<p v-if='StartTime'>
					Time: {{ StartTime }}
				</p>
				<hr>
				<!--<p> TOTAL: {{ BikeType.data.Price }} €</p>-->
			</div>
			<b-row align="center">
				<b-button
				style="margin-top:7px;"
					variant="success"
					block
					@click='Submit'
					:disabled='!IsFormComplete'>
					Make payement &nbsp;
					<i class="fas fa-check fa-sm"></i>
				</b-button>
				<b-button
				style="margin-top:7px;"
					variant="danger"
					block
					@click='Reset'>
					Discard
				</b-button>
			</b-row>
		</b-form-group>
	</b-row>
	</b-container>
	</b-jumbotron>
</div>
</template>

<script>
export default {
	name: 'BikeTypes',
	data () {
		return {
			StartDate: '',
			StartTime: '',
			selected:true
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
		GetImage(BikTypeID){
			return 'https://thedrhax14eng.files.wordpress.com/2019/03/' + BikTypeID.toLowerCase() + '.png'
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

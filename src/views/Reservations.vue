<template>
	<div class="wrap">
		<h2> My reservations</h2>
		<b-card-group v-if='UserReservations.length>0'>
			<b-card 
				v-for="(reservation, index) in UserReservations"
				v-bind:key='index'
				:title="reservation.data.BikeID" >
				<b-list-group v-if='reservation.data.Status != "Cancelled"'>
					<b-list-group-item>
						PIN: {{ reservation.data.PIN }} 
					</b-list-group-item>
					<b-list-group-item>
						Start location: {{ reservation.data['Start location'] }} Station
					</b-list-group-item>
					<b-list-group-item>
						Start Date: {{ SecondsToLocalDate(reservation.data['Start time & date'].seconds) }}
					</b-list-group-item>
					<b-list-group-item>
						Start Time: {{ NanosecondsToTime(reservation.data['Start time & date'].nanoseconds) }}
					</b-list-group-item>
				</b-list-group>
				<b-list-group v-else>
					<b-list-group-item>
						Reservation is cancelled by user
					</b-list-group-item>
					<b-list-group-item>
						Cancel Date: {{ SecondsToLocalDate(reservation.data['End time & date'].seconds) }}
					</b-list-group-item>
					<b-list-group-item>
						Cancel Time: {{ NanosecondsToTime(reservation.data['End time & date'].nanoseconds) }}
					</b-list-group-item>
				</b-list-group>
				<b-button variant="info">Edit reservation</b-button>
				<b-button variant="danger" @click="deleteReservation(index)">Delete</b-button>
				<b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
 			</b-card>
		</b-card-group>
		<div v-else>
			<h2 class="alt-message">No reservations yet!</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Reservations',
	computed: {
		UserReservations () {
			return this.$store.state.history.filter(entry => entry.data.uid == this.$store.state.user.uid)
		}
	},
	methods: {
		SecondsToLocalDate(secs) {
			var d = new Date(1970, 0, 1);
			d.setSeconds(secs);
			return d.toLocaleDateString();
		},
		NanosecondsToTime(nanosecs){
			var seconds = nanosecs/10000
			var hour = Math.floor(seconds/3600) % 24
			var min = Math.floor(seconds/60) % 60
			var hourString = ""
			var minString = ""
			if(hour<10) hourString = "0" + hour
			else hourString = hour
			if(min<10) minString = "0" + min
			else minString = min
			return hourString + ":" + minString
		},
		deleteReservation (index) {
			var reservation = this.UserReservations[index]
			console.log('Deleting',reservation[index])
			this.$store.dispatch('updateHistory',{
				id: reservation.id,
				doc: {
					BikeID: reservation.data.BikeID,
					PIN: reservation.data.PIN,
					'Start location': null,
					'Start time & date': null,
					'End location': "",
					'End time & date': new Date(),
					Status: "Cancelled",
					uid: this.$store.state.user.uid
				}
			})
		}
	}
}
</script>

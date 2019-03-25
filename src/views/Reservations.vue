<template>
	<b-jumbotron bg-variant="light" fluid>
	<b-container>
		<b-row>
			<h2 class="page-title">My reservations</h2>
		</b-row>
		<b-row class="justify-content-md-center">
			<b-card-group v-if='UserReservations.length>0'>
				<b-container>
					<b-row
						v-for="(reservation, index) in UserReservations"
						v-bind:key='index'
						align="center">
						<b-card :title="reservation.data.BikeID" >
							<b-list-group>
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
								<b-button variant="info">Edit reservation</b-button>
								<b-button variant="danger" @click="deleteReservation(index)">Delete</b-button>
							</b-list-group>
			 			</b-card>
			 		</b-row>
		 		</b-container>
			</b-card-group>
			<div style="width:100%" v-else>
				<b-alert show variant="light" style="width:100%">No reservations yet</b-alert>
			</div>
		</b-row>
	</b-container>
</b-jumbotron>
</template>

<script>
export default {
	data () {
		return {
			fluid: true
		}
	},
	name: 'Reservations',
	computed: {
		UserReservations () {
			return this.$store.state.history.filter(entry => entry.data.uid == this.$store.state.user.uid && entry.data.Status != "Cancelled")
		}
	},
	methods: {
		SecondsToLocalDate (secs) {
			var d = new Date(1970, 0, 1)
			d.setSeconds(secs)
			return d.toLocaleDateString()
		},
		NanosecondsToTime (nanosecs) {
			var seconds = nanosecs / 10000
			var hour = Math.floor(seconds / 3600) % 24
			var min = Math.floor(seconds / 60) % 60
			var hourString = ''
			var minString = ''
			if (hour < 10) hourString = '0' + hour
			else hourString = hour
			if (min < 10) minString = '0' + min
			else minString = min
			return hourString + ':' + minString
		},
		deleteReservation (index) {
			var reservation = this.UserReservations[index]
			console.log('Deleting', reservation[index])
			this.$store.dispatch('updateHistory', {
				id: reservation.id,
				doc: {
					BikeID: reservation.data.BikeID,
					PIN: reservation.data.PIN,
					'Start location': reservation.data['Start location'],
					'Start time & date': reservation.data['Start time & date'],
					'End location': '',
					'End time & date': new Date(),
					Status: 'Cancelled',
					uid: this.$store.state.user.uid
				}
			})
		}
	}
}
</script>

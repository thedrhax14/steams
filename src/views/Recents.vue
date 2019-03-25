<template>
	<b-jumbotron bg-variant="light" fluid>
	<b-container>
		<b-row>
			<h2 class="page-title">Recent trips</h2>
		</b-row>
		<b-row class="justify-content-md-center">
			<b-card-group v-if='RecentReservations.length>0'>
				<b-container>
					<b-row
						v-for="(reservation, index) in RecentReservations"
						v-bind:key='index'
						align="center">
						<b-card
							:header="Title(reservation.data.BikeID)"
							:border-variant='CardVariant(reservation.data.Status)'
							:header-bg-variant='CardVariant(reservation.data.Status)'
							header-text-variant="white">
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
								<b-list-group-item>
									End Date: {{ SecondsToLocalDate(reservation.data['End time & date'].seconds) }}
								</b-list-group-item>
								<b-list-group-item>
									End Time: {{ NanosecondsToTime(reservation.data['End time & date'].nanoseconds) }}
								</b-list-group-item>
							</b-list-group>
			 			</b-card>
			 		</b-row>
		 		</b-container>
			</b-card-group>
			<div style="width:100%" v-else>
				<b-alert show variant="light" style="width:100%">No recent trips yet</b-alert>
			</div>
		</b-row>
	</b-container>
</b-jumbotron>
</template>

<script>
export default {
	name: 'Reservations',
	computed: {
		RecentReservations () {
			var Recent = []
			Recent = this.$store.state.history.filter(entry => entry.data.uid == this.$store.state.user.uid && entry.data.Status == 'Completed')
			Recent.sort((a, b) => b.data['Start time & date'].seconds - a.data['Start time & date'].seconds)
			return Recent.slice(0, 3)
		}
	},
	methods: {
		Title (BikeID) {
			return 'Bike ID: ' + BikeID
		},
		CardVariant (Status) {
			if (Status == 'Cancelled') { return 'danger' } else if (Status == 'Reserved') { return 'primary' } else if (Status == 'Completed') { return 'success' }
		},
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
		}
	}
}
</script>

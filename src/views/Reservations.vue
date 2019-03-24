<template>
		<div class="wrap">
			<h2> My reservations</h2>
			<hr>
			<br>
			<div v-if='myReservations.length>0'>
			<div class="card text-center">
					<div
						class="card-header"
						style="font-weight:bold;"
						v-for="(bike, index) in myReservations"
						v-bind:key='index'>
						Bike ID: {{ bike.data.BikeID }}
						<div class="card-body">
							<p class="card-text">
								<ul class="card-list-reservation">
									<li>PIN: {{ bike.data.PIN }} </li>
									<li>Start location: {{ bike.data['Start location'] }} Station</li>
									<li>Date: {{ bike.data['Start time & date'].seconds }}</li>
									<li>Start time: {{ bike.data['Start time & date'].seconds }}</li>
								</ul>
							</p>
						</div>
						<b-button variant="info">Edit reservation</b-button>
						<b-button variant="danger" @Click="deleteReservation">Delete</b-button>
					</div>
				</div>
		</div>
		<div v-else>
			<h2 class="alt-message">No reservations yet!</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Reservations',
	computed: {
		myReservations () {
			return this.$store.state.history.filter(entry => entry.data.uid == this.$store.state.user.uid)
		}
	},
	methods: {
		deleteReservation () {
			return this.$store.state.historyChange.filter(entry => entry.data.BikeID == this.$store.state.user.BikeID)
		}
	}
}
</script>

<template>
		<div class="wrap">
			<h2> My reservations</h2>
			<hr>
			<br>
			<div class="card text-center">
				<div
					class="card-header"
					style="font-weight:bold;"
					v-if='myReservations'
					v-for="(bike, index) in myReservations"
					v-bind:key='index'>
					Bike ID: {{ bike.data.BikeID }}
					<div class="card-body">
						<p class="card-text">
							<ul class="card-list-reservation">
								<li>PIN: {{ bike.data.PIN }} </li>
								<li>Start location: {{ bike.data['Start location'] }}</li>
								<li>Date: {{ bike.data['Start time & date'].seconds }}</li>
								<li>Start time: {{ bike.data['Start time & date'].seconds }}</li>
							</ul>
						</p>
					</div>
			</div>
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
	}
}
</script>

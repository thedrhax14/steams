<template>
	<div>
		<div class="wrap" style="margin-top: 50px;">
			<h2> My reservations</h2>
			<hr>
			<br/>
			<div class="card text-center">
				<div class="card-header" style="font-weight:bold;" v-if='myReservations' v-for="bike in myReservations">
					{{ bike }}
					<br/>
					Bike ID: {{ bike.BikeID }}
				</div>
				<div class="card-body">
					<p class="card-text">
						<ul class="card-list-reservation">
							<li>PIN: {{ bike.PIN }} </li>
							<li>Going to: Edinburgh Park</li>
							<li>Start time: {{ bike.StartDate }}</li>
							<li>Status: Reserved</li>
							<li>End time: {{ bike.EndDate }}</li>
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
			return this.$store.state.userhistory
		}
	}
}
</script>

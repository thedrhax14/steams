<template>

			<div class="wrap">
			<h2> Recent trips </h2>
			<hr>
			<br>
      <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Edinburgh Park</h5>
        <p class="card-text">
        <ul class="card-list">
          <li>Status: {{ }} </li>
          <li>Returned at: {{ bike.data['Start location'] }} </li>
          <li>Date: </li>
        </ul>
        <p class="card-text"><small class="text-muted">{{ + 'hours ago' }}</small></p>
      </div>
     </div>
			<!--<div class="card text-center">
				<div class="card-header" style="font-weight:bold;">
						Bike ID:
				</div>
				<div class="card-body">
					<p class="card-text">
		  			<ul class="card-list-reservation">
						    <li v-for="item in items">{{ item.message }} </li>
		  			</ul>
					</p>
          <p class="card-text"> <small class="text-muted">{{  + 'hours ago' }}</small></p>
				</div>
			</div>-->
		</div>
</template>

<script>
// const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander
export default {
		name: 'Recents',
		computed: {
			recentTrips () {
				return this.$store.state.history.filter(entry => entry.data.uid == this.$store.state.user.uid)
		}
	}
}
</script>

<template>
			<div class="wrap" style="margin-top: 50px;">
			<h2> My reservations</h2>
			<hr>
			<br/>
			<div class="card text-center">
				<div class="card-header" style="font-weight:bold;">
						Bike ID:
				</div>
				<div class="card-body">
					<p class="card-text">
		  			<ul class="card-list-reservation">
						    <li v-for="item in items">{{ item.message }} </li>
		  			</ul>
					</p>
				</div>
			</div>
		</div>
</template>

<script>
// const fb = require('../firebaseConfig.js')

// Make selection of timestamp from valid input element like celander
export default {
	data () {
		return{
	 items: [
		 { message: 'PIN:' },
		 { message: 'Bike type:' },
		 { message: 'Start time:' },
		 { message: 'Start date:' },
		 { message: 'Status:' }
	 ]
 }
},
	created () {
		if (this.$store.state.bikeTypes.length === 0) {
			this.$store.dispatch('fetchbikeTypes')
		}
	}
}
</script>

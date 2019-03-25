<template>
	<div class="wrap">
		<b-jumbotron bg-variant="light" class="sm-5 md-8">
		<b-container fluid>
		<h1>Start your trip with our bikes!</h1>
		<small>Not all bikes are available at every stations</small>
		<h2 class="bike-header">Bike options</h2>
    <p> These are the bike options the company currently offers</p>
    <hr>
		<div class="card-deck" style="width:240%; margin-left: -69%;">
      <div class="card">
        <img src="../assets/images/road_bike1.png" class="card-img-top" alt="..."style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Road bike</h5>
          <p class="card-text">Road bikes are simply just bikes that dominate the roads with a design that favors the conditions on the road and introduces great efficiency and speed on the road with very little effort.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
      <div class="card">
        <img src="../assets/images/mtn_bike1.png" class="card-img-top" alt="..."style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Mountaint bike</h5>
          <p class="card-text">The purpose of Montaint bikes is to focus mostly on being used in off-road trails but it can also be usedd on the road. Mountain bikes have suspension on both wheels to help navigate incoming obstacles along the way and they are also build with a mechanism called bicycle gearing that allows ease of cycling during up and down hills.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
      <div class="card">
        <img src="../assets/images/tandem_bike1.png" class="card-img-top" alt="..."style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Tandem bike</h5>
          <p class="card-text">A Tandem bike is a 2 person bike that includes 2 seats, 2 handle bars and 2 pedals. There is no skill needed to ride a Tandem bike other than being able to ride a bike and coordination, overall it is a new experience for riding a bike.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
      <div class="card">
        <img src="../assets/images/standard_bike1.png" class="card-img-top" alt="..." style="margin-left:10px;">
        <div class="card-body">
          <h5 class="card-title">Standard bike</h5>
          <p class="card-text">Any bike is considered as a communting bike. However, the commuting bike we provide consists of additional features such as front and rear lights, racks and fenders. These make a perfect bike for commuting within a city.</p>
					<button class="readmore"><a href="/bikes">Learn More</a></button>
				</div>
      </div>
    </div>
	</b-container>
</b-jumbotron>
</div>
</template>

<script>
// const fb = require('../firebaseConfig.js')

export default {
	methods: {
		showBike (id) {
			if (this.$store.state.currentUser) {
				this.$store.dispatch('selectBike', id)
				this.$store.dispatch('rentBike')
			} else {
				alert('Login first')
			}
		}
	},
	created () {
		console.log('created', this)
		if (this.$store.state.bikes.length === 0) {
			this.$store.dispatch('fetchBikes')
		}
	},
	beforeCompile () {
		console.log('beforeCompile', this)
	},
	compiled () {
		console.log('compiled', this)
	},
	ready () {
		console.log('ready', this)
	}
}
</script>

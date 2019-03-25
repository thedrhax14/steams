<template id="">
	<div class="revieworders">
		<b-jumbotron bg-variant="light" >
			<div class="page-header">
				<h1>Orders Summary</h1>
			</div>
			<hr>
			<div
				class="card-header"
				style="font-weight:bold;"
				v-if='ReviewOrders && ReviewOrders.length>0'
				v-for="(order, index) in ReviewOrders"
				v-bind:key='index'>
				Order ID: {{ ParseIndex(index) }}
				<div class="card-body">
					<p class="card-text">
						<ul class="card-list-reservation">
							<li>Order Type: {{ order['Order Type'] }}</li>
							<li v-if="order['Bike ID'] " >Bike ID: {{ order['Bike ID'] }} </li>
							<li v-if="order.NumberOfBikes !== null"> Qty: {{ order['NumberOfBikes'] }}</li>
							<li v-if="order.BikeType"> Bike Type: {{ order['BikeType'] }}</li>
							<li>New location: {{ order.Location }} </li>
							<li>Status: {{ order.Status }}</li>
						</ul>
					</p>
				</div>
			</div>
			<div v-else>
				<b-alert show variant="dark">You have not yet placed any orders.</b-alert>
			</div>
		</b-jumbotron>
	</div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	name: 'ReviewOrders',
	computed: {
		ReviewOrders () {
			return this.$store.state.orders
		}
	},
	methods: {
		ParseIndex(index){
			if(index<10)
				return "00" + index
			if(index<100)
				return "0" + index
			return index
		}
	}
}

</script>

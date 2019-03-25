<template id="">
  <div class="revieworders">
    <b-jumbotron bg-variant="light" >
      <div class="page-header">
      <h1>Orders Summary</h1>
    </div>
    <hr>
    <div v-show="noOrders">
    <b-alert show variant="dark">You have not yet placed any orders.</b-alert>
    </div>
    <div
      class="card-header"
      style="font-weight:bold;"
      v-if='ReviewOrders'
      v-for="(order, index) in ReviewOrders"
      v-bind:key='index'>
      Order ID: 00{{ index }}
      <div class="card-body">
        <p class="card-text">
          <ul class="card-list-reservation">
          <li>Order Type: {{ order.data['Order Type'] }}</li>
          <li v-if="order.data['Bike ID'] " >Bike ID: {{ order.data['Bike ID'] }} </li>
          <li v-if="order.data.NumberOfBikes !== null"> Qty: {{ order.data['NumberOfBikes'] }}</li>
            <li v-if="order.data.BikeType"> Bike Type: {{ order.data['BikeType'] }}</li>
            <li>New location: {{ order.data.Location }} </li>
          <li>Status: {{ order.data.Status }}</li>
          </ul>
        </p>
      </div>
  </div>
</b-jumbotron>
  </div>

</template>

<script>

export default {
	data () {
		return {
			orders: [],
			hover: true,
			dark: true,
			fluid: true,
			noOrders: false
		}
	},
	name: 'ReviewOrders',
	computed: {
		ReviewOrders () {
			if (this.$store.state.orders.filter(entry => entry.data.uid == this.$store.state.user.uid).length === 0) { this.noOrders = true }
			return this.$store.state.orders.filter(entry => entry.data.uid == this.$store.state.user.uid)
		}
	},
	created () {
		this.$store.dispatch('fetchOrders')
	}
}

</script>

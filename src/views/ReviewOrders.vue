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
  <div v-else>
  <b-alert show variant="dark">You have not yet placed any orders.</b-alert>
  </div>
</b-jumbotron>
  </div>

</template>

<script>

export default {
	data () {
		return {
		orders: 78
		}
	},
  name: 'ReviewOrders',
 computed: {
   ReviewOrders() {

       return this.$store.state.orders.filter(entry => entry.data.uid == this.$store.state.user.uid)

   }
 },
 created(){
   this.$store.dispatch('fetchOrders');
   this.orders =  this.$store.state.orders.filter(entry => entry.data.uid == this.$store.state.user.uid).length
   console.log('length is '+ this.$store.state.orders.filter(entry => entry.data.uid == this.$store.state.user.uid).length)
   console.log('orders are '+ this.orders)
   console.log('UID'+this.$store.state.user.uid)
 }
}

</script>

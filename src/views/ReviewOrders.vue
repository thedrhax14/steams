<template id="">
  <div class="revieworders">
    <div class="jumbotron">
      <div class="page-header">
      <h1>Orders Summary</h1>
    </div>
    <hr>
    <b-table  :hover="hover"  :dark="dark"  :items="orderHistory"  :fields="fields"    />
  </div>
   </div>

  </div>
</template>

<script>

export default {
	data () {
		return {
			fields: ['orderID', 'orderType', 'bikeID', 'bikeType', 'location', 'status'], // this helps choose which varibales from the orderHistory object do you want to display
			orderHistory: [
				{ orderID: '001', orderType: 'Bike Repair', bikeID: 'CR73957', bikeType: 'Cruiser Bike', location: 'Holyrood Park', status: 'Repairing' },
				{ orderID: '002', orderType: 'Bike Repair', bikeID: 'XT78957', bikeType: 'Tandem Bike', location: ' Edinburgh Zoo', status: 'Pending' },
				{ orderID: '003', orderType: 'Replace', bikeID: 'VG66780', bikeType: ' Track Bike', location: 'Scott Mountain', status: 'Repairing' },
				{ orderID: '004', orderType: 'Redistribute', bikeID: 'OK09880', bikeType: ' Mountain Bike', location: 'Edinburgh Lake', status: 'Repairing' }
			],
			hover: true,
			dark: true
		}
	},
	created () {

	}
}

</script>

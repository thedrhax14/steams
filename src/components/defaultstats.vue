<template>
	<div>
		<p>Default Stats</p>
		<div @click="ReviewData">Default Review</div>
	</div>
</template>

<script>
export default {
	name: 'Stats',
	props: {
		bikeTypeInfo: Object
	},
	data () {
		return {
			fields: ['orderID', 'orderType', 'bikeID', 'bikeType', 'location', 'status'], // this helps choose which varibales from the orderHistory object do you want to display
			orderHistory: [
				{ orderID: '001', orderType: 'Bike Repair', bikeID: 'CR73957', bikeType: 'Cruiser Bike', location: 'Holyrood Park', status: 'Repairing' },
			],
			hover: true,
			dark: true
		}
	}
//	methods: {
//		UpdateDate () {
//			console.log(this.msg.userdata.permission)
//		},
//		BookingHistory () {
//			console.log(this.orderHistory)
//		}
//	}
}
</script>
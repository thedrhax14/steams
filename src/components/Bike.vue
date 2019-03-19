<template>
	<div>
		<h1>{{ bikeTypeInfo.BikeTypeName }}</h1>
		<p>£{{ bikeTypeInfo.Price }}.00/hr</p>
	</div>
</template>

<script>
export default {
	name: 'Bike',
	props: {
		bikeTypeInfo: Object,
		showSettings: {
			ButtonEdit: false,
			ButtonBook: false,
			ButtonSelect: false
		}
	},
	created () {
		console.log('bikeTypeInfo ', this.bikeTypeInfo)
	}
}
</script>

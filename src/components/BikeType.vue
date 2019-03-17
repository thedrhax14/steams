<template>
	<div>
		<h1>{{ bikeTypeInfo.Name }}</h1>
		<p>£{{ bikeTypeInfo.Price }}.00/hr</p>
	</div>
</template>

<script>
export default {
	name: 'BikeType',
	props: {
		bikeTypeInfo: Object
	},
	created() {
		console.log('bikeTypeInfo ', this.bikeTypeInfo)
	}
}
</script>

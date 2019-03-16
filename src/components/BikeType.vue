<template>
	<div class="bike" v-if="bikeTypeInfo.AvailableBikes.length > 0">
		<h3>{{ bikeTypeInfo.Name }} ({{ bikeTypeInfo.AvailableBikes.length }})</h3>
		<img src="" alt="bikeimage">
		<p>£{{ bikeTypeInfo.Price }}/hr</p>
		<button @click='selectBike(bikeTypeInfo.Id)'>Select</button>
	</div>
</template>

<script>
export default {
	name: 'BikeType',
	props: {
		bikeTypeInfo: Object
	}
}
</script>

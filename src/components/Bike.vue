<template>
	<div class="bike">
		<h3>{{ bikeinfo.type }}</h3>
		<img src="" alt="bikeimage">
		<p>£{{ bikeinfo.price }}/hr</p>
		<button @click='selectBike(bikeinfo.id)'>Select</button>
	</div>
</template>

<script>
export default {
	name: 'Bike',
	props: {
		bikeinfo: Object
	}
}
</script>

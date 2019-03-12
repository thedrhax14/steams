<template>
	<div>
		<h3>{{ bikeinfo.type }}</h3>
		<img src="" alt="bikeimage">
		<button @click='selectBike(bikeinfo.id)'>Select</button>
	</div>
</template>

<script>
export default {
	name: 'Login',
	props: {
		bikeinfo: Object
	}
}
</script>
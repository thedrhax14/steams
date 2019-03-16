<template v-if="bikeTypeInfo.AvailableBikes.length > 0">
	<div class="bike">
		<input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
		<label class="custom-control-label" for="customRadio2"><h5>{{ bikeTypeInfo.Name }} ({{ bikeTypeInfo.AvailableBikes.length }})</h5></label>
		<img src="../assets/images/cruiser_bike.png">
		<small>£{{ bikeTypeInfo.Price }}.00/hr</small>
		<button @click='selectBikeType' class="btn btn-danger">Select</button>
	</div>
</template>

<script>
export default {
	name: 'BikeType',
	props: {
		bikeTypeInfo: Object
	},
	methods: {
		selectBikeType(){
			this.$store.commit("selectBikeTypeId",this.bikeTypeInfo.Id)
		}
	}
}
</script>

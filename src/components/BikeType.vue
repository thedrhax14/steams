<template v-if="bikeTypeInfo.AvailableBikes.length > 0">
	<b-card
	:title="bikeTypeInfo.Name"
	img-src="../assets/images/road_bike1.png"
	img-top
	style="max-width: 20rem;"
	class="mb-2"
	>
	<b-card-text>
		£{{ bikeTypeInfo.Price }}.00/hr
	</b-card-text>
</b-card>
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

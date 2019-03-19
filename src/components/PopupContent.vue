<template>
	<div id="popup">
		{{ Location + ' Station' }}
		<br/>
		<button @click="prepareForBooking">Book here</button>
	</div>
</template>

<script>
export default {
	name: 'PopupContent',
	props: {
		Location: String
	},
	methods: {
		prepareForBooking () {
			this.$store.commit('setSelectedStation',this.Location)
		}
	}
}
</script>

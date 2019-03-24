<template>
	<div id="popup">
		{{ Location }} Station
		<br/>
		<b-button variant="danger" @click="prepareForBooking">Book here</b-button>
		<br/>
		<small> {{ message }} </small>
	</div>
</template>

<script>
export default {
	name: 'PopupContent',
	props: {
		Location: String
	},
	data () {
		return {
			message: 'click to see what bikes are available!'
		}
	},
	methods: {
		prepareForBooking () {
			this.$store.commit('setSelectedStation', this.Location)
		}
	}
}
</script>

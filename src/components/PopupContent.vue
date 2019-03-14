<template>
	<div id="popup">
		{{ locName }}
		<br/>
		<button @click="prepareForBooking">Book here</button>
	</div>
</template>

<script>
export default {
	name: 'PopupContent',
	props: {
		locName: String
	},
	methods: {
		prepareForBooking () {
			this.$router.push('/reserve')
		}
	}
}
</script>

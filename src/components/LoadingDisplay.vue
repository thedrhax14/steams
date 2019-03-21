<template>
	<transition name="fade">
		<div v-if="isLoading" class="loading">
			Loading...
		</div>
	</transition>
</template>

<script>
export default {
	name: 'LoadingDisplay',
	computed: {
		isLoading () {
			return this.$store.state.loading
		}
	}
}
</script>

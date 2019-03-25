<template>
	<loading :active.sync="isLoading" is-full-page></loading>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	name: 'LoadingDisplay',
	components: {
		Loading
	},
	computed: {
		isLoading () {
			return this.$store.state.loading
		}
	}
}
</script>

<template>
	<div id="app">
		<LoadingDisplay/>
		<navbar v-if='IsAvailable'/>
		<router-view/>
	</div>
</template>

<script>
import LoadingDisplay from '@/components/LoadingDisplay.vue'
import navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'
const fb = require('./firebaseConfig.js')

export default {
	components: {
		LoadingDisplay,
		navbar
	},
	computed: {
		...mapState(['user'])
	},
	methods: {
		logout () {
			fb.auth.signOut().then(() => {
				console.log('Logged out')
				this.$router.push('/auth')
			}).catch(err => {
				console.log(err)
			})
		}
	},
	computed: {
		IsAvailable(){
			return !this.$store.state.isStationInterfaceActive
		}
	},
	created () {
		// console.log('dispatch \'fetchBikes\' on created in app.vue')
		// this.$store.dispatch('fetchBikes')
		console.log('dispatch \'fetchBikeTypes\' on created in app.vue')
		this.$store.dispatch('fetchBikeTypes')
		// console.log('dispatch \'fetchHistory\' on created in app.vue')
		// this.$store.dispatch('fetchHistory')
	}
}
</script>

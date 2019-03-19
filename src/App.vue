<template>
  <div id="app">
    <navbar></navbar>
    <LoadingDisplay/>
    <div id="nav">
      <router-link to="/installedplugins">Installed Plugins</router-link>
      <a v-if="currentUser" @click="logout"> | Logout</a>
    </div>
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
		...mapState(['currentUser'])
	},
	methods: {
		logout () {
			fb.auth.signOut().then(() => {
				console.log('Logged our')
			}).catch(err => {
				console.log(err)
			})
		}
	},
	created () {
		console.log('dispatch \'fetchBikes\' on created in app.vue')
		this.$store.dispatch('fetchBikes')
	}
}
</script>

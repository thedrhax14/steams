<template>
  <div id="app">
    <navbar ></navbar>
    <div id="nav">
      <router-link to="/installedplugins">Installed Plugins</router-link>
      <a v-if="currentUser" @click="logout"> | Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'
const fb = require('./firebaseConfig.js')

export default {
	computed: {
		...mapState(['currentUser'])
	},
	methods: {
		logout () {
			fb.auth.signOut().then(() => {
				this.$store.dispatch('clearData')
				this.$router.push('/login')
			}).catch(err => {
				console.log(err)
			})
		}
	},
	components: {
		navbar
	}
}
</script>

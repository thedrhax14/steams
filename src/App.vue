<template>
  <div id="app">
    <navbar></navbar>
    <LoadingDisplay/>
    <div id="nav">
        <a class="user-info-btn">
          <router-link to='/profile'><i class="fas fa-user-circle"></i>
            My Account </router-link>
        </a>
      <a v-if="user" @click="logout"> | Logout</a>
    </div>
    <div class="dropdown">
    <a class="mobile-show">
        <b-dropdown variant="link" no-caret>
          <template slot="button-content"><i class="far fa-user"></i></span></template>
          <b-dropdown-item style="font-size:10px;" href="/profile">Profile</b-dropdown-item>
          <br/>
          <b-dropdown-item @click="logout" style="font-size:10px;" href="#">Logout</b-dropdown-item>
        </b-dropdown>
    </a>
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

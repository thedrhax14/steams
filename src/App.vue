<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/bikes">Bikes</router-link> |
      <router-link v-if="currentUser" to="/profile">Profile |</router-link>
      <router-link to="/installedplugins">Installed Plugins</router-link>
      <a v-if="currentUser" @click="logout"> | Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
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
  }
}
</script>

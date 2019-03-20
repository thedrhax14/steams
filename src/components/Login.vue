<template>
	<div>
		<h1>Welcome Back</h1>
		<label for="email1">Email</label>
		<input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
		<label for="password1">Password</label>
		<input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
		<button @click="login" class="button">Log In</button>
	</div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	name: 'Login',
	data () {
		return {
			loginForm: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		login () {
			this.$store.state.loading = true
			fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
				this.$store.commit('setUser', user.user)
				this.$store.dispatch('fetchUserInfomation', user.user.uid)
				console.log('commit \'setUserHistory\' onlogin in Login.vue')
				this.$store.commit('setUserHistory',[])
				console.log('dispatch \'fetchUserHistory\' onlogin in Login.vue')
				this.$store.dispatch('fetchUserHistory')
				this.$router.push('/profile')
				this.$store.state.loading = false
			}).catch(err => {
				this.$store.state.loading = false
				this.errorMsg = err.message
			})
		}
	}
}
</script>

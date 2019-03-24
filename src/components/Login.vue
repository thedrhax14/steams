<template>
	<div class="sign-in-wrap">
		<img src="../assets/images/SPINlogotext.png" alt="logo">
		<div class="sign-in-window">
		<h1> Sign In </h1>
		<br/>
		<div class="form-group">
			<label for="email1">Email address</label>
			<br>
			<input v-model.trim="loginForm.email" required type="text" class="form-group" placeholder="you@email.com" id="email1" />
		</div>
		<div class="form-group">
			<label for="password1">Password</label>
			<br>
			<input v-model.trim="loginForm.password" type="password" class="form-group" placeholder="******" id="password1" />
		</div>
		<b-button @click="login" class="button">Log In</b-button>
	</div>
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

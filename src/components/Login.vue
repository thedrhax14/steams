<template>
	<div class="sign-in-wrap">
		<img src="../assets/images/SPINlogotext.png" alt="logo">
		<h2> Sign In </h2>
		<div class="sign-in-window">
		<br/>
		<h1>Welcome Back</h1>
		<div class="form-group">
			<label for="email1">Email</label>
			<br>
			<input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
		</div>
		<div class="form-group">
			<label for="password1">Password</label>
			<br>
			<input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
		</div>
		<button @click="login" class="button">Log In</button>
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

<template>
	<div class="sign-in-wrap">
		<h1>Let's get you started!</h1>
		<label for="name">Name</label>
		<input v-model.trim="signupForm.name" type="text" placeholder="user name" id="name" />
		<label for="email2">Email</label>
		<input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
		<label for="password2">Password</label>
		<input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
		<button @click="signup" class="button">Sign Up</button>
	</div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	name: 'Register',
	data () {
		return {
			signupForm: {
				name: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		signup () {
			this.$store.state.loading = true
			fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
				this.$store.commit('updateUserProfile', {
					displayName: this.signupForm.name
				})
				this.$store.commit('setCurrentUser', user.user)
				fb.usersCollection.doc(user.user.uid).set({
					PermissionLevel: 0,
					Type: 'Customer',
					PaymentMethods: []
				}).then(() => {
					this.$router.push('/profile')
					this.$store.state.loading = false
				}).catch(err => {
					this.errorMsg = err.message
					this.$store.state.loading = false
				})
			}).catch(err => {
				this.errorMsg = err.message
				this.$store.state.loading = false
			})
		}
	}
}
</script>

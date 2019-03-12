<template>
	<div>
		<h1>Reset Password</h1>
		<label for="email3">Email</label>
		<input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />
		<p>We will send you an email to reset your password</p>
		<button @click="resetPassword" class="button">Submit</button>
	</div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	name: 'RestorePass',
	data () {
		return {
			passwordForm: {
				email: ''
			},
			passwordResetSuccess: false
		}
	},
	methods: {
		resetPassword () {
			this.$store.state.performingRequest = true

			fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
				this.$store.state.performingRequest = false
				this.passwordResetSuccess = true
				this.passwordForm.email = ''
			}).catch(err => {
				console.log(err)
				this.$store.state.performingRequest = false
				this.errorMsg = err.message
			})
		}
	}
}
</script>

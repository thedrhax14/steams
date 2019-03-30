<template>
	<div>
		<b-jumbotron fluid>
			<b-container>
				<h1>
					Reset Password
				</h1>
			</b-container>
			<b-container>
				<br/>
				<div clasaas="form-group">
					<div role="group">
		 				<label for="inputLive">Email:</label>
						<b-form-input
							id="inputLive"
							v-model="passwordForm.email"
							trim
							type="text"
							:state="emailState"
							aria-describedby="inputLiveHelp inputLiveFeedback"
							placeholder="you@email.com"/>
						<p>We will send you an email to reset your password!</p>
						<b-button @click="resetPassword" class="button">Submit</b-button>
					</div>
				</div>
			</b-container>
		</b-jumbotron>
	</div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	computed: {
		emailState () {
			return this.passwordForm.email.length > 5 ? true : null
		}
	},
	name: 'RestorePass',
	data () {
		return {
			name: '',
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

<template>
	<div class="login">
		<transition name="fade">
			<div v-if="performingRequest" class="loading">
				<p>Loading...</p>
			</div>
		</transition>
		<section>
			<div class="col1">
				<h1>Login</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
			<div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
				<form v-if="showLoginForm" @submit.prevent>
					<Login/>
					<div class="extras">
						<a @click="togglePasswordReset">Forgot Password</a>
						<br>
						<a @click="toggleForm">Create an Account</a>
					</div>
				</form>
				<form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
					<Register/>
					<div class="extras">
						<a @click="toggleForm">Back to Log In</a>
					</div>
				</form>
				<form v-if="showForgotPassword" @submit.prevent class="password-reset">
					<div v-if="!passwordResetSuccess">
						<h1>Reset Password</h1>
						<p>We will send you an email to reset your password</p>
						<label for="email3">Email</label>
						<input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />
						<button @click="resetPassword" class="button">Submit</button>
						<div class="extras">
							<a @click="togglePasswordReset">Back to Log In</a>
						</div>
					</div>
					<div v-else>
						<h1>Email Sent</h1>
						<p>check your email for a link to reset your password</p>
						<button @click="togglePasswordReset" class="button">Back to login</button>
					</div>
				</form>
				<transition name="fade">
					<div v-if="errorMsg !== ''" class="error-msg">
						<p>{{ errorMsg }}</p>
					</div>
				</transition>
			</div>
		</section>
	</div>
</template>
<script>
const fb = require('../firebaseConfig.js')
import Login from '@/components/Auth components/Login.vue'
import Register from '@/components/Auth components/Register.vue'

export default {
	components: {
		Login,
		Register
	},
	data () {
		return {
			signupForm: {
				name: '',
				email: '',
				password: ''
			},
			passwordForm: {
				email: ''
			},
			showLoginForm: true,
			showForgotPassword: false,
			passwordResetSuccess: false,
			performingRequest: false,
			errorMsg: ''
		}
	},
	methods: {
		toggleForm () {
			this.showLoginForm = !this.showLoginForm
		},
		togglePasswordReset () {
			console.log('Toggle password reset')
			if (this.showForgotPassword) {
				this.showLoginForm = true
				this.showForgotPassword = false
				this.passwordResetSuccess = false
			} else {
				this.showLoginForm = false
				this.showForgotPassword = true
			}
		},
		resetPassword () {
			this.performingRequest = true

			fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
				this.performingRequest = false
				this.passwordResetSuccess = true
				this.passwordForm.email = ''
			}).catch(err => {
				console.log(err)
				this.performingRequest = false
				this.errorMsg = err.message
			})
		}
	}
}
</script>

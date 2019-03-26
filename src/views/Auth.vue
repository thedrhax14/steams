<template>
	<div class="">
		<b-jumbotron bg-variant="light" class="sm-8 md-8">
			<b-container fluid>
				<section>
					<div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
						<form v-if="showLoginForm" @submit.prevent>
							<Login/>
							<br/>
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
								<RestorePass/>
								<div class="extras">
									<a @click="togglePasswordReset">Back to Log In</a>
								</div>
							</div>
							<div v-else>
								<h1>Email Sent</h1>
								<p>The email conatins a link to reset your passoword.</p>
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
			</b-container>
		</b-jumbotron>
	</div>
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import RestorePass from '@/components/RestorePass.vue'

export default {
	components: {
		Login,
		Register,
		RestorePass
	},
	data () {
		return {
			showLoginForm: true,
			showForgotPassword: false,
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
		}
	}
}
</script>

<template>
		<div>
			<b-jumbotron fluid>
				<b-container>
				  <h1>Let's get you started!</h1>
				</b-container>
				<b-container>
				<br/>
				<div class="form-group">
					<div role="group">
						<label for="inputLive">Full Name:</label>
						<b-form-input
							id="inputLive"
							v-model.trim="signupForm.name"
							trim
							required
							type="text"
							:state="nameState"
							aria-describedby="inputLiveHelp inputLiveFeedback"
							placeholder="Full name"
						/>
						<label for="inputLive">Email address:</label>
						<b-form-input
							id="inputLive"
							v-model.trim="signupForm.email"
							trim
							required
							type="text"
							:state="emailState"
							aria-describedby="inputLiveHelp inputLiveFeedback"
							placeholder="you@email.com"
						/>
						<label for="inputLive">Password:</label>
						<b-form-input
							id="inputLive"
							v-model.trim="signupForm.password"
							trim
							required
							type="password"
							:state="emailState"
							aria-describedby="inputLiveHelp inputLiveFeedback"
							placeholder="******"
						/>
					</div>
				</div>
				<b-button @click="signup" class="button">Sign up</b-button>
	</b-container>
</b-jumbotron>
</div>
</template>

<script>
const fb = require('../firebaseConfig.js')
export default {
	computed: {
		nameState () {
			return this.signupForm.name.length > 5 ? true : null
		},
		emailState () {
			return this.signupForm.email.length > 5 ? true : null
		},
		passState () {
			return this.signupForm.password.length > 5 ? true : null
		}
	},
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
					displayName: this.signupForm.name,
					data: {
						PermissionLevel: 0,
						Type: 'Customer'
					}
				})
				this.$store.commit('setCurrentUser', user.user)
				fb.usersCollection.doc(user.user.uid).set({
					Type: 'Customer'
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

<template>
		<div>
			<b-jumbotron fluid>
				<b-container>
				  <h1>Let's get you started!</h1>
				</b-container>
				<b-container>
				<br/>
				<div clasaas="form-group">
					<div role="group">
    <label for="inputLive">Fulll Name:</label>
    <b-form-input
      id="inputLive"
      v-model="signupForm.fname"
      trim
      type="text"
      :state="nameState"
      aria-describedby="inputLiveHelp inputLiveFeedback"
      placeholder="Enter your name"
    />

    <!-- This is a form text block (formerly known as help block) -->
    <b-form-text id="inputLiveHelp">Your full name.</b-form-text>

		<label for="inputLive">Email address:</label>
    <b-form-input
      id="inputLive"
      v-model="signupForm.email"
      trim
      type="text"
      :state="emailState"
      aria-describedby="inputLiveHelp inputLiveFeedback"
      placeholder="you@email.com"
    />

		<b-form-text id="inputLiveHelp">Provide a valid email address.</b-form-text>

	<label for="inputLive"> Password:</label>
	<b-form-input
		id="inputLive"
		v-model="signupForm.password"
		trim
		type="password"
		:state="passState"
		aria-describedby="inputLiveHelp inputLiveFeedback"
		placeholder="*****"
	/>
			<b-form-invalid-feedback id="inputLiveFeedback">
      	Enter at least 5 characters
    	</b-form-invalid-feedback>
			</div>
		</div>
		<br/>
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
			return this.SignupForm.email.length > 5 ? true : null
		},
		passState () {
			return this.SignupForm.password.length > 5 ? true : null
		}
	},
	name: 'Register',
	data () {
		return {
			name:'',
			signupForm: {
				fname:'',
				email: '',
				password: '',
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
					this.$router.push('/')
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

<template>
	<!--<template>
		<div class="sign-in-wrap">
			<img src="../assets/images/SPINlogotext.png" alt="logo">
			<div class="sign-in-window">
			<h1> Sign In </h1>
			<br/>
			<div class="form-group">
				<div role="group">
		    <label for="inputLive">Email address:</label>
		    <b-form-input
		      id="email1"
		      v-model.trim="loginForm.email"
		      trim
					required="true"
		      type="email"
		      :state="emailState"
		      aria-describedby="inputLiveHelp inputLiveFeedback"
		      placeholder="you@email.com"
		    />

		    <label for="inputLive">Passsword:</label>
		    <b-form-input
		      id="email1"
					v-model.trim="loginForm.password"
		      trim
					required="true"
		      type="password"
		      :state="passState"
		      aria-describedby="inputLiveHelp inputLiveFeedback"
		      placeholder="******"
		    />

		    <b-form-invalid-feedback id="inputLiveFeedback">
		      Enter at least 8 letters
		    </b-form-invalid-feedback>
		  </div>
			</div>
			<b-button @click="login" class="button">Log In</b-button>

		</div>
	</div>
	</template>
-->
	<div class="sign-in-wrap">
		<label for="name">Full Name</label>
		<input v-model.trim="signupForm.name" type="text" placeholder="user name" id="name" />
		<label for="email2">Email</label>
		<input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
		<label for="password2">Password</label>
		<input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
		<button @click="signup" class="button">Sign Up</button>
		<b-row>
		<h1>Let's get you started!</h1>
	</b-row>
	<div role="group">
	<label for="inputLive">Full Name:</label>
	<b-form-input
		id="email1"
		v-model.trim="signupForm.name"
		trim
		required="true"
		type="name"
		:state="null"
		aria-describedby="inputLiveHelp inputLiveFeedback"
		placeholder="you@email.com"
	/>

	<label for="inputLive">Email:</label>
	<b-form-input
		id="email1"
		v-model.trim="signupForm.email"
		trim
		required="true"
		type="password"
		:state="emailState"
		aria-describedby="inputLiveHelp inputLiveFeedback"
		placeholder="you@email.com"
	/>

	<label for="inputLive">Passsword:</label>
	<b-form-input
		id="email1"
		v-model.trim="signupForm.password"
		trim
		required="true"
		type="password"
		:state="passState"
		aria-describedby="inputLiveHelp inputLiveFeedback"
		placeholder="******"
	/>

	<b-form-invalid-feedback id="inputLiveFeedback">
		Enter at least 8 letters
	</b-form-invalid-feedback>
</div>
	</div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	name: 'Register',
	data () {
		return {
			name:'',
			signupForm: {
				name: '',
				email: '',
				password: ''
			}
		}
	},
	computed:{
		emailState() {
			return this.loginForm.email.length > 5? true : null
		},passState() {
			return this.loginForm.password.length > 7? true : false
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

<template>
	<div >
		<b-jumbotron  fluid>
			<b-container>
			<img src="../assets/images/SPINlogotext.png" alt="logo"style="width:200px;">
		</b-container>
			<b-container>
			<h1> Sign In </h1	>
			<br/>
			<div class="form-group">
				<div role="group">
				<label for="inputLive">Email address:</label>
				<b-form-input
					id="inputLive"
					v-model.trim="loginForm.email"
					trim
					required="true"
					type="email"
					:state="emailState"
					aria-describedby="inputLiveHelp inputLiveFeedback"
					placeholder="you@email.com"
				/>
				<!-- This will only be shown if the preceeding input has an invalid state -->

				<label for="inputLive">Passsword:</label>
				<b-form-input
					id="inputLive"
					v-model.trim="loginForm.password"
					trim
					required="true"
					type="password"
					:state="passState"
					aria-describedby="inputLiveHelp inputLiveFeedback"
					placeholder="******"
				/>
			</div>
			</div>
			<b-button @click="login" class="button">Log In</b-button>

		</b-container>
	</b-jumbotron>
</div>
</template>

<script>
const fb = require('../firebaseConfig.js')
export default {
	computed:{
		emailState() {
			return this.loginForm.email.length > 5? true : null
		},passState() {
			return this.loginForm.password.length > 7? true : false
		}
	},
	name: 'Login',
	data () {
		return {
			name: '',
			loginForm: {
				email: '',
				password: '',
			}
		}
	},
	methods: {
		login () {
			this.$store.state.loading = true
			fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
				this.$store.commit('setUser', user.user)
				this.$router.push('/')
				this.$store.state.loading = false
			}).catch(err => {
				this.$store.state.loading = false
				this.errorMsg = err.message
			})
		}
	}
}
</script>

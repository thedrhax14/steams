<template>
	<div class="wrap">
		<b-jumbotron bg-variant="light" class="sm-5 md-8">
		<b-container fluid>
		<h2 class="page-title">New Payment method</h2>
	<b-row class="justify-content-sm-center">
	</b-row>
		<hr>
		<br>
			<b-container>
			<br/>
			<div class="form-group">
				<div role="group">
					<label for="inputLive">Card holder:</label>
					<b-form-input
						id="inputLive"
						v-model='NewCardData["Card holder"]'
						trim
						required
						type="name"
						aria-describedby="inputLiveHelp inputLiveFeedback"
						placeholder="Full name"
					/>
					<b-form-text id="input-live-help">Full card holder name.</b-form-text>

					<label for="inputLive">Card number:</label>
					<b-form-input
						id="inputLive"
						v-model.trim='NewCardData["Card number"]'
						trim
						required
						type="text"
						:state="cNumberState"
						aria-describedby="inputLiveHelp inputLiveFeedback"
						placeholder="XXXXXXXXXXXXXXXX"
					/>
					<b-form-invalid-feedback id="input-live-feedback">
      			Please provide the full 16-digit number.
    			</b-form-invalid-feedback>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="inputLive">Expiry date:</label>
							<b-form-input
								id="inputLive"
								v-model.trim='NewCardData["Expire date"]'
								trim
								required
								type="month"
								:state="expDate"
								aria-describedby="inputLiveHelp inputLiveFeedback"
								placeholder="e.g. 06/23"
							/>
							<b-form-text id="input-live-help">in Month-YYYY format</b-form-text>
						</div>
						<div class="form-group col-md-6">
							<label for="inputLive">CVV</label>
							<b-form-input
								id="inputLive"
								v-model.trim='NewCardData.cvv'
								trim
								required
								type="password"
								:state="expDate"
								aria-describedby="inputLiveHelp inputLiveFeedback"
								placeholder="CVV"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="cardHolderName">Card holder </label>
				<input v-model='NewCardData["Card holder"]' required="true" type="name" class="form-control" id="cardHolderName" placeholder="Name">
				<b-form-text id="input-live-help">Full card holder name.</b-form-text>
			</div>
			<div class="form-group">
				<label for="inputCardNumber">Card number </label>
				<input v-model='NewCardData["Card number"]' :state="cNumberState" type="text" required="true" class="form-control" id="inputCardNumber" placeholder="Card number">
				<b-form-text id="input-live-help">Please provide the full 16-digit number.</b-form-text>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="inputDate">Expiry date</label>
					<input v-model='ExpireDate' type="month" class="form-control" required="true" id="inputDate" placeholder="e.g. 06/23">
					<b-form-text id="input-live-help">in Month-YYYY format</b-form-text>
				</div>
				<div class="form-group col-md-6">
					<label for="inputPassword">CVV</label>
					<input v-model='NewCardData.cvv' type="password" required="true" class="form-control" id="inputPassword" placeholder="CVV">
				</div>
			</div>
			<br>
			<hr>
			<b-button :disabled='!IsFormComplete' @click="addNewCard" block variant="info"><i class="fas fa-save">
				</i>&nbsp;Save card
			</b-button>
			</b-container>
		</b-container>
	</b-jumbotron>
  </div>
</template>

<script>
export default {
	data () {
		return {
			ExpireDate: '',
			NewCardData: {
				'Card holder': '',
				'Card number': '',
				'Expire date': null,
				cvv: ''
			}
		}
	},
	computed: {
		IsFormComplete () {
			this.NewCardData['Expire date'] = new Date(this.ExpireDate + 'T00:00:00Z')
			return this.NewCardData['Card holder'].length > 5 &&
			this.NewCardData['Card number'].length == 16 &&
			this.NewCardData['Expire date'] != null &&
			this.NewCardData.cvv.length == 3
		}
	},
	cNumberState () {
		return this.NewCardData['Card number'].length == 16 ? true : false
	},
	expDate () {
		return this.ExpireDate.length > 5 ? true : null
	},
	methods: {
		addNewCard () {
			this.$store.commit('addUserPaymentMethod', this.NewCardData)
			this.$store.dispatch('updateUserInformation', {
				uid: this.$store.state.user.uid,
				doc: {
					PaymentMethods: this.$store.state.userInfo.PaymentMethods
				}
			})
			this.$router.push('/payement')
		}
	}
}
</script>

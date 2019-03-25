<template>
	<div class="wrap">
		<b-jumbotron bg-variant="light" class="sm-5 md-8">
		<b-container fluid>
		<h2 class="page-title">New Payment method</h2>
	<b-row class="justify-content-sm-center">
	</b-row>
		<br>
		<div class="form-group">
			<div role="group">
	    <label for="cardHolderName">Card holder:</label>
	    <b-form-input
	      id="cardHolderName"
	      v-model.trim='NewCardData["Card holder"]'
	      trim
				required="true"
	      type="name"
	      :state="cHolderState"
	      aria-describedby="inputLiveHelp inputLiveFeedback"
	      placeholder="Name"
	    />
			<b-form-invalid-feedback id="inputLiveFeedback">
		 Enter at least 3 letters
	 		</b-form-invalid-feedback>
	    <!-- This will only be shown if the preceeding input has an invalid state -->
	    <label for="inputCardNumber">Card Number:</label>
	    <b-form-input
	      id="inputCardNumber"
				v-model.trim='NewCardData["Card number"]'
	      trim
				required="true"
	      type="text"
	      :state="cNumberState"
	      aria-describedby="inputLiveHelp inputLiveFeedback"
	      placeholder="Card number"
	    />
			<b-form-invalid-feedback id="inputCardNumber">
		 	Enter at least 3 letters
	 		</b-form-invalid-feedback>
			<label for="inputDate">Expiry date:</label>
	    <b-form-input
	      id="inputDate"
				v-model.trim='ExpireDate'
	      trim
				required="true"
	      type="date"
	      :state="expDate"
	      aria-describedby="inputLiveHelp inputLiveFeedback"
	      placeholder="e.g. 06/23"
	    />
			<b-form-invalid-feedback id="inputLiveFeedback">
		 		Enter at least 3 letters
	 		</b-form-invalid-feedback>
	  </div>
	</div>
			<div class="form-group">
				<label for="cardHolderName">Card holder </label>
				<input v-model='NewCardData["Card holder"]' required="true" type="name" class="form-control" id="cardHolderName" placeholder="Name">
			</div>
			<div class="form-group">
				<label for="inputCardNumber">Card number </label>
				<input v-model='NewCardData["Card number"]' type="text" required="true" class="form-control" id="inputCardNumber" placeholder="Card number">
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="inputDate">Expiry date</label>
					<input v-model='ExpireDate' type="date" class="form-control" required="true" id="inputDate" placeholder="e.g. 06/23">
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
		</form>
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
	cHolderState () {
		return this.NewCardData['Card holder'].length > 5 ? true : null
	},
	cNumberState () {
		return this.NewCardData['Card number'].length > 5 ? true : null
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

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
						:state="nameState"
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
						placeholder="XXXX-XXXX-XXXX-XXXX"
					/>
					<b-form-invalid-feedback id="input-live-feedback">
      			Please provide the full 16-digit number.
    			</b-form-invalid-feedback>
					<br/>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="inputDate">Expiry date</label>
							<input v-model='ExpireDate'
							 type="date"
							 class="form-control"
							 required
							 id="inputDate"
							 placeholder="e.g. 06/23">
							 <small class="text-muted">in DD-MMM-YYYY format</small>
						</div>
						<div class="form-group col-md-6">
							<label for="inputLive">CVV</label>
							<b-form-input
								id="inputLive"
								v-model.trim='NewCardData.cvv'
								trim
								required
								type="password"
								:state="cvvState"
								aria-describedby="inputLiveHelp inputLiveFeedback"
								placeholder="CVV"
							/>
						</div>
					</div>
					<b-button :disabled='!IsFormComplete' @click="addNewCard" block variant="info"><i class="fas fa-save">
						</i>&nbsp;Save card
					</b-button>
				</div>
			</div>
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
			this.ExpireDate != null &&
			this.NewCardData.cvv.length == 3
		},
		nameState () {
			return this.NewCardData['Card holder'].length > 5 ? true : null
		},
		cNumberState () {
			return this.NewCardData['Card number'].length == 16 ? true : false
		},
	  cvvState (){
			return this.NewCardData.cvv.length == 3 ? true : false
		},
		expState (){
			return this.ExpireDate!= null? true : false
		}
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

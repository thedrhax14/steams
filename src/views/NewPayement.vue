<template>
	<div class="wrap">
		<h2> Payement methods</h2>
		<hr>
		<br>
		<form>
			<div class="form-group">
				<label for="cardHolderName">Card holder </label>
				<input v-model='NewCardData["Card holder"]' type="name" class="form-control" id="cardHolderName" placeholder="Name">
			</div>
			<div class="form-group">
				<label for="inputCardNumber">Card number </label>
				<input v-model='NewCardData["Card number"]' type="text" class="form-control" id="inputCardNumber" placeholder="Card number">
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="inputDate">Expiry date</label>
					<input v-model='ExpireDate' type="date" class="form-control" id="inputDate" placeholder="e.g. 06/23">
				</div>
				<div class="form-group col-md-6">
					<label for="inputPassword">CVV</label>
					<input v-model='NewCardData.cvv' type="password" class="form-control" id="inputPassword" placeholder="CVV">
				</div>
			</div>
			<br>
			<hr>
			<b-button :disabled='!IsFormComplete' @click="addNewCard" block variant="info"><i class="fas fa-save">
				</i>&nbsp;Save card
			</b-button></a>
		</form>
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

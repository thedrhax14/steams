<template>
	<b-container fluid>
		<h1>Payement methods</h1>
		<b-list-group v-if='PaymentMethods && PaymentMethods.length>0'>
			<b-list-group-item
				v-for='(PaymentMethod, index) in PaymentMethods'
				:key='index'
				button
				:active='CurrentPaymentMethod == index'
				@click='SelectedCard(index)'>
				<h5>
					<i class="fas fa-credit-card"></i>&nbsp;
					Card ending in **{{ PaymentMethod['Card number'].slice(14, 16) }}
				</h5>
			</b-list-group-item>
		</b-list-group>
		<p v-else>
			You haven't added a payment method yet
		</p>
		<br/>
		<b-button @click="$router.push('/newCard')" block variant="danger">
			<i class="fas fa-plus"></i> &nbsp;
			Add a payement method
		</b-button>
	</b-container>
</template>

<script>

export default {
	name: 'addCard',
	computed: {
		PaymentMethods () {
			return this.$store.state.userInfo.PaymentMethods
		},
		CurrentPaymentMethod () {
			var result = -1
			if (this.$store.state.userInfo.SelectedPaymentMethod != null) { result = this.$store.state.userInfo.SelectedPaymentMethod }
			return result
		}
	},
	methods: {
		SelectedCard (index) {
			console.log('SelectedCard', index)
			this.$store.dispatch('updateUserInformation', {
				uid: this.$store.state.user.uid,
				doc: {
					SelectedPaymentMethod: index
				}
			})
		}
	}
}
</script>

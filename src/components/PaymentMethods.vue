<template>
	<b-container fluid>
		<h2 class="page-title">Payment methods</h2>
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
			<br/>
			<b-alert show variant="light" style="font-size: 15px; width:100%">You haven't added a payement method yet</b-alert>
		</p>
		<br/>
		<b-button v-if='DisplayAddButton == true' @click="$router.push('/newCard')" block variant="danger">
			<i class="fas fa-plus"></i>
			Add a payement method
		</b-button>
	</b-container>
</template>

<script>
export default {
	name: 'PaymentMethods',
	props: {
		DisplayAddButton: Boolean
	},
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

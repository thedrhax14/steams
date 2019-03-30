<template>
	<b-jumbotron bg-variant="light" class="sm-8 md-8">
		<PaymentMethods :DisplayAddButton='true'/>
	</b-jumbotron>
</template>

<script>
import PaymentMethods from '@/components/PaymentMethods.vue'

export default {
	name: 'PaymentInfo',
	components: {
		PaymentMethods
	}
}
</script>

<template>
	<div>
		<h1>{{ bike['Type name'] }}</h1>
		<p>£{{ bike.Price }}.00/hr</p>
		<p v-if='ShowRaw==true'>Raw {{ bike }}</p>
	</div>
</template>

<script>
export default {
	name: 'Bike',
	props: {
		bike: Object,
		ButtonEdit: false,
		ButtonBook: false,
		ButtonSelect: false,
		ShowRaw: false
	}
}
</script>

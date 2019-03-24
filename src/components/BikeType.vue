<template>
	<div>
		<h1>{{ bike.Name }}</h1>
		<p>£{{ bike.Price }}.00/hr</p>
	</div>
</template>

<script>
export default {
	name: 'Bike',
	props: {
		bike: Object,
		ButtonEdit: Boolean,
		ButtonBook: Boolean,
		ButtonSelect: Boolean,
		ShowRefType: Boolean
	}
}
</script>

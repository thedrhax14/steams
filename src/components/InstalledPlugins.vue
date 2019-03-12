<template>
	<div>
		<p>Your permission level {{ biketypeid }}</p>
		<div @click="UpdateDate">Udpate data</div>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		biketypeid: String,
		bikeid: String,
		bikename: String,
		bikelocation: Object
	},
	methods: {
		UpdateDate () {
			console.log(this.msg.userdata.permission)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>

<template>
	<div>
		<b-container align-h="center" fluid class="text-center">
			<b-row align-h="center" no-gutters>
				<h1>Welcome to {{ StationName }}</h1>
			</b-row>
			<b-card border-variant="light" header="Type a 4 digit pin to unlock your booked bike" class="text-center">
				<b-row align-h="center" no-gutters>
					<h1 v-for='Num in PIN'>
						<div v-if='Num>=0'>
							{{ Num }}
						</div>
						<div v-else>
							*
						</div>
					</h1>
				</b-row>
				<b-row no-gutters>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">1</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">2</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">3</b-button>
					</b-col>
				</b-row>
				<b-row no-gutters>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">4</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">5</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">6</b-button>
					</b-col>
				</b-row>
				<b-row no-gutters>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">7</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">8</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button class="PincodeButton" block variant="outline-primary">9</b-button>
					</b-col>
				</b-row>
				<br>
				<b-row align-h="center" no-gutters>
					<b-button block variant="outline-success">Submit</b-button>
				</b-row>
			</b-card>
		</b-container>
	</div>
</template>

<style type="text/css">
.PincodeButton.btn-block {
    display: block;
    min-width: 100%;
    padding-top: 50%;
    padding-bottom: 50%;
}
</style>

<script>
export default {
	name: 'StationInterface',
	data () {
		return {
			StationName: 'None',
			PIN: [-1, -1, -1, -1]
		}
	},
	created () {
		this.$store.commit('SetIsStationInterfaceActive', true)
	}
}
</script>

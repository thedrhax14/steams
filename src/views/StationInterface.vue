<template>
	<div>
		<b-container v-if='StationIsActive' align-h="center" fluid class="text-center">
			<b-row align-h="center" no-gutters>
				<h1>Welcome to {{ StationName }}</h1>
			</b-row>
			<b-card border-variant="light" header="Type a 4 digit pin to unlock your booked bike" class="text-center">
				<b-row align-h="center" no-gutters>
					<h1 v-for='Num in TypedPIN'>
						<div v-if='Num>=0'>
							{{ Num }}
						</div>
						<div v-else>
							-
						</div>
					</h1>
				</b-row>
				<b-row no-gutters>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(1)' class="PincodeButton" block variant="outline-primary">1</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(2)' class="PincodeButton" block variant="outline-primary">2</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(3)' class="PincodeButton" block variant="outline-primary">3</b-button>
					</b-col>
				</b-row>
				<b-row no-gutters>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(4)' class="PincodeButton" block variant="outline-primary">4</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(5)' class="PincodeButton" block variant="outline-primary">5</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(6)' class="PincodeButton" block variant="outline-primary">6</b-button>
					</b-col>
				</b-row>
				<b-row no-gutters>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(7)' class="PincodeButton" block variant="outline-primary">7</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(8)' class="PincodeButton" block variant="outline-primary">8</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(9)' class="PincodeButton" block variant="outline-primary">9</b-button>
					</b-col>
				</b-row>
				<b-row no-gutters>
					<b-col no-gutters>
						<b-button @click='Reset' class="PincodeButton" block variant="outline-danger">Reset</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button :disabled='Index>3' @click='TypeInput(0)' class="PincodeButton" block variant="outline-primary">0</b-button>
					</b-col>
					<b-col no-gutters>
						<b-button disabled class="PincodeButton" block variant="outline-primary">_</b-button>
					</b-col>
				</b-row>
			</b-card>
		</b-container>
		<b-container v-else align-h="center" fluid class="text-center">
			<b-row align-h="center" no-gutters>
				<h1>Station setup</h1>
				<b-card border-variant="light" header="Choose location name from the drop down" class="text-center">
					<b-row align-h="center" no-gutters>
						<b-dropdown
							split
							split-variant="outline-primary"
							variant="primary"
							:text="StationName"
							class="m-2">
							<b-dropdown-item 
								v-for='Location in AvailableLocations' 
								@click='SetStationName(Location)'>
								{{ Location }}
							</b-dropdown-item>
						</b-dropdown>
					</b-row>
					<b-row align-h="center" no-gutters>
						<b-button block variant="outline-success" @click='FinishSetup'>Setup</b-button>
					</b-row>
				</b-card>
			</b-row>
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
			StationIsActive: false,
			Index: 0,
			PIN: [-1, -1, -1, -1]
		}
	},
	computed: {
		AvailableLocations() {
			var locations = []
			this.$store.state.bikes.forEach(bike => {
				locations.push(bike.data.Location)
			})
			locations = [...new Set(locations)]
			return locations
		},
		TypedPIN() {
			return this.PIN
		},
		BikesAtStation() {
			return this.$store.state.bikes.filter(bike => bike.data.Location == this.StationName)
		},
		PINToString() {
			return this.PIN[0].toString() + this.PIN[1].toString() + this.PIN[2].toString() + this.PIN[3].toString()
		}
	},
	methods: {
		SetStationName(StationName){
			this.StationName = StationName
		},
		Reset() {
			this.PIN = [-1, -1, -1, -1]
			this.Index = 0
		},
		FinishSetup() {
			this.$store.commit('SetIsStationInterfaceActive', true)
			this.StationIsActive = true
		},
		TypeInput(val) {
			this.PIN[this.Index] = val
			this.Index++
			if(this.Index>3) {
				var history = this.$store.state.history.filter(entry => entry.data.Status == "Reserved")
				for (var i = 0; i < history.length; i++) {
					// console.log(history[i].data.PIN)
					if(history[i].data.PIN.toString() == this.PINToString){
						alert("Bike " + history[i].data.BikeID + " is unlocked")
						break;
					}
				}
				this.PIN = [-1, -1, -1, -1]
				this.Index = 0
			}
		}
	}
}
</script>

<template>
  <div class="placeorder">
    <b-jumbotron bg-variant="light">
      <div class="page-header">
      <h1>Place Orders</h1>
    </div>
    <hr>
    <div class="card">
      <div class="card-header">
        <div class="orders btn-group" role="group" aria-label="First group">
      <button type="button" class="btn btn-danger btn-lg  btn-danger mt-2"  @click="value = 'Repair'">Repair Bikes</button>
      <button type="button" class="btn btn-danger btn-lg btn-danger mt-2"  @click="value = 'Redistribute'">Redistribute Bikes</button>
      <button type="button" class="btn btn-danger btn-lg btn-danger mt-2" @click=" value ='New Bikes' ">Order New Bikes</button>
      </div>
      </div>
      <div class="card-body">

        <div class="container-fluid" v-show="value ==='Repair'">
          <i class="fas fa-info">&nbsp;&nbsp; Report faulty bikes, if it  unrepairable it will be replaced.</i>
          <br>
          <br>
          <form action="">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Bike ID</label>
                <input v-model="repairBID" type="text" pattern="[A-Z]{2}[0-9]{5}" size ="7"class="form-control" id="inputNumber4"  placeholder="MB00987" required>
                <small class="text-muted">
               The BikeID of the format XX12345 (Two uppercase letters followed by 5 numbers).
             </small>
           </div>
            </div>
            <div class="form-row">
            <div class="form-group  col-md-6">
             <label for="inputAddress">Location (Docking Station)</label>
             <input v-model="address" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" required>
           </div>
           </div >
             <div class="form-row">
            <button type="submit" class="btn btn-danger mt-2" @click='submit'>Confirm</button>
         </div>
         </form>
           </div>
           <div class="container-fluid" v-show="value ==='Redistribute'">
             <i class="fas fa-info">&nbsp;&nbsp; Send a bike to a different location.</i>
             <br>
             <br>
             <form action="">
               <div class="form-row">
                 <div class="form-group col-md-6">
                   <label for="inputEmail4">Bike ID</label>
                   <input v-model="repairBID" type="text" pattern="[A-Z]{2}[0-9]{5}" size ="7"class="form-control" id="inputNumber4"  placeholder="MB00987" required>
                   <small class="text-muted">
                  The BikeID of the format XX12345 (Two uppercase letters followed by 5 numbers).
                </small>
              </div>
               </div>
               <div class="form-row">
               <div class="form-group  col-md-6">
                <label for="inputAddress">New Location (Docking Station)</label>
                <input v-model="address" type="text" class="form-control" id="inputAddress" placeholder="Queen St." required>
              </div>
              </div >
                <div class="form-row">
              <button type="submit" class="btn btn-danger mt-2" @click='submit'>Confirm</button>
            </div>
            </form>

              </div>
           <div class="container-fluid"  v-show="value === 'New Bikes'">
             <i class="fas fa-info">&nbsp;&nbsp; Order new bikes to be delivered to a specific docking station .</i>
             <br>
             <br>
             <form action="">
               <div class="form-row">
                 <div class="form-group col-md-6">
                   <label for="inputEmail4">Number of Bikes</label>
                   <input v-model="number" type="number" class="form-control" id="inputNumber4"  placeholder="2" min="1" required>
                 </div>
               </div>
               <b-form-group label="Type of Bike:">
                 <b-form-radio :value="Btype.type"  v-model="selected" name="some-radios" v-for="Btype in biketypes" :key="biketypes.id"> {{ Btype.type }}</b-form-radio>
               </b-form-group>
       <div class="form-row">
       <div class="form-group  col-md-6">
        <label for="inputAddress">Location (Docking Station)</label>
        <input v-model="address" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" required>
      </div>
      </div >
      <button type="submit" class="btn btn-danger mt-2" @click='submit' 	:disabled='!IsFormComplete'>Confirm</button>
            </form>

              </div>

        </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
	data () {
		return {
      fluid: true,
			value: 'Repair', // to display the appropriate div
			number: 0, // number of bikes to order
			address: '',
			repairBID: 'xxxxxxx',
			bikes: [
				{ bikeID: 'CX89078', location: 'Circus Lane ', currentState: 'Good', reserved: 'true' }, // when it is resereved , make sure it is not available to be booked once returned by some other user
				{ bikeID: 'BV12783', location: 'Holyrood Park ', currentState: 'Good', reserved: 'false' } // can't set a bike which is already under-repair/being moved to a new location
			],
			biketypes: [
				{ id: 1, type: 'Tandem Bike' },
				{ id: 2, type: 'Mountain Bike' },
				{ id: 3, type: 'Road Bike' }, // later we could use the firebase IDS as keys
				{ id: 4, type: 'Cruiser Bike' }
			],
			selected: '', // has the value of the BikeType to order (incase a new bike is being ordered)
			required: 'true'

		}
	},
  computed: {
    IsFormComplete() {
			return  this.address != ''

		},
  },
  methods: {
    submit(evt) {
      var rbid = null
      var numberBikes = null
      if (this.repairBID != 'xxxxxxx') {
        rbid = this.repairBID
      }
      if(this.number != 0){
        numberBikes = this.number
      }
      console.log('chekcinf')
        if(this.value == 'New Bikes'){
          this.$store.dispatch('addEntryToOrders',{
            "Bike ID": rbid,
            "Location": this.address,
            "Order Type": this.value,
            NumberOfBikes: numberBikesr,
            uid: this.$store.state.user.uid,
            Status: 'Pending',
            BikeType: this.selected
          })
        }

    }
  }

}
</script>

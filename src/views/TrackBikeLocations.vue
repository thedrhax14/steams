<template>
  <div class="trackbl">
    <b-jumbotron>
      <div class="page-header">
      <h1>Bike Tracking</h1>
    </div>
    <hr>
    <form  action="">
      <div class="form-row" >
        <div class="form-group col-md-6">
          <label for="inputEmail4">Bike ID</label>
          <b-form-input v-model="trackBID" id="inputNumber4" pattern="[A-Z]{2}[0-9]{5}"  type="text" class="form-control" size ="7"placeholder=" XX12345" required/>
          <small class="text-muted">
         The BikeID of the format XX12345 (Two uppercase letters followed by 5 numbers).
       </small>
         <div class="mt-2">Value(checking BID read): {{ trackBID }}</div>
        </div>
      </div>
        <div class="form-row" >
      <b-form-checkbox  id="checkbox1"    name="checkbox1" v-model="user_info"  value="include_user_info"    unchecked-value="exclude_user_info"  >
      Get more user details
    </b-form-checkbox>
    <div>State: <strong>{{ user_info }}</strong></div>
  </div>
  <div class="form-row">
      <button type="submit" class="btn btn-danger mt-2" @click="showBikeLocation(trackBID)">Track</button>
      <div>
        {{ location }}
       </div>
  </div>
    </form>
    <br>

  </b-jumbotron>

  </div>
</template>
<script>
export default {
	data () {
		return {
			trackBID: ' ', // store the ID to be tracked
			user_info: 'exclude_user_info',
			bikes: [
				{ bikeID: 'BX1234', location: 'CircusLane' }
			],
			location: ''
		}
	},
	methods: {
		showUserDetails (value) {

		},
		showBikeLocation (bikeID) {
			alert('bla bla ' + bikeID)
			var loc = this.bikes[0].location
			this.location = loc
		}
	}
}
</script>

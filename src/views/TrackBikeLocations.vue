<template>
  <div class="trackbl">
    <b-jumbotron bg-variant="light">
      <div class="page-header">
      <h1>Bike Tracking</h1>
    </div>
    <hr>
    <b-container fluid>
      <b-row>
        <b-col>
          <form  action="">
            <div class="form-row" >
              <div class="form-group col-md-6">
                <label for="inputEmail4">Bike ID</label>
                <b-form-input v-model="trackBID" id="inputNumber4" pattern="[A-Z]{2}[0-9]{5}"  type="text" class="form-control" size ="7"placeholder=" XX12345" required/>
                <small class="text-muted">
               The BikeID of the format XX12345 (Two uppercase letters followed by 5 numbers).
             </small>
              </div>
            </div>
          <div class="form-row">
            <button type="submit" class="btn btn-danger mt-2" @click="submit" 	:disabled='!IsFormComplete'>Track</button>
          </div>
          </form>
        </b-col>
        <b-col>
          <div >
            <b-card bg-variant="danger" header="Location" class="text-center">
                <b-card-text text-variant="black" >Currently at: <p v-if="check">{{ location }}</p><p v-else>(Please enter BikeID)</p></b-card-text>
              </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <br>
  </b-jumbotron>

  </div>
</template>
<script>
import Mapbox from 'mapbox-gl-vue'
import Vue from 'vue'

export default {

	data () {
		return {
			trackBID: '' ,// store the ID to be tracked
      location: 'Queen St',
      check: 0

	}
},
computed: {
  IsFormComplete() {
    return this.trackBID != ''
  }
},
methods: {
  submit(evt){
    this.check = 1;
  }
}
}
</script>

<template>
    <div class="wrap">
      <b-jumbotron bg-variant="light" class="sm-8 md-8">
    	<b-container fluid>
        <b-row>
    			 <h2 class="page-title">Report an issue</h2>
    		</b-row>
        <hr>
        <br>
        <form method="POST" enctype="multipart/form-data">
        <label for="inputEmail4"><h3> Please enter your Bike ID: </h3></label>
        <input type="text" pattern="[A-Z]{2}[0-9]{5}" class="form-control" size = "7" id="inputNumber4"  name="bikecount"  placeholder="XX12345" required>
        <small class="text-muted" style="font-size: 11px;">
          The BikeID of the format XX12345 (Two uppercase letters followed by 5 numbers).
        </small>
       <br>
       <h3> What would you like to report about? </h3>
       <div class="input-group">
         <input type="text" class="form-control" placeholder="Other">
          <div class="selection-list">
            <b-form-select v-model="selected" class="mb-3">
    						<option value="BD">Bike Damage</option>
    						<option value="LP">Lock pin timeout</option>
    						<option value="CP">Connection problem</option>
    				</b-form-select>
         </div>
       </div>
       <br>
       <h3> What issue did you face with your bike? </h3>
       <a href="mailto:name@email.com">Link text</a>
       <br>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us more about your issue..."></textarea>
        <br>
      </form>
      <div>
        <b-button v-b-modal.modal-center block variant="danger">Report</b-button>
        <!-- Modal Component -->
        <b-modal id="modal-center" style="height:100px;" centered title="Thank you!">
          <p class="my-4">Your feedback has been received.</p>
        </b-modal>
      </div>
    </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
	data () {
		return {
			file: null,
			file2: null
		}
	}
}
</script>

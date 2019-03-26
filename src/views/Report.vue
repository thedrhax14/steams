<template>
      <b-jumbotron bg-variant="light" class="sm-8 md-8">
    	<b-container fluid>
        <b-row>
    			 <h2 class="page-title">Report an issue</h2>
    		</b-row>
        <hr>
        <br>
        <div role="group">
          <label for="inputLive">Please enter your Bike ID:</label>
    <b-form-input
      id="inputLive"
      v-model="reportForm.bikeIdInput"
      trim
      type="text"
      pattern="[A-Z]{2}[0-9]{5}"
      size = "7"
      :state="IdInputState"
      aria-describedby="inputLiveHelp inputLiveFeedback"
      placeholder="XX12345"
    />
    <b-form-invalid-feedback id="inputLiveFeedback">
          Enter at least 7 characters
    </b-form-invalid-feedback>
    <br>
    <h3> What would you like to report about? </h3>

    <b-form-select
     v-model="reportForm.selected"
     class="mb-3"
     placeholder="Other"
     type="text"
     >
        <option value="BD">Bike Damage</option>
        <option value="LP">Lock pin timeout</option>
        <option value="CP">Connection problem</option>
    </b-form-select>
    <br>
    <h3> What issue did you face with your bike? </h3>
    <br>
    <b-form-textarea
      id="textarea"
      v-model="reportFrom.messageInput"
      placeholder="Tell us more about your issue..."
      rows="3"
      max-rows="6"
      />
      <pre class="mt-3 mb-0">{{ text }}</pre>
</div>
        <form method="POST" enctype="multipart/form-data">
        <label for="inputNumber4"><h3> Please enter your Bike ID: </h3></label>
        <input type="text" pattern="[A-Z]{2}[0-9]{5}" class="form-control" size = "7" id="inputNumber4" v-model="bikeIdInput" name="bikecount"  placeholder="XX12345" required>
        <small class="text-muted" style="font-size: 11px;">
          The Bike ID of the format XX12345 (Two uppercase letters followed by 5 numbers).
        </small>
       <br>
       <h3> What would you like to report about? </h3>
       <div class="input-group">
         <input type="text" class="form-control" required placeholder="Other">
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
       <br>
        <textarea class="form-control" id="exampleFormControlTextarea1" v-model="messageInput" rows="3" required placeholder="Tell us more about your issue..."></textarea>
        <br>
        <div>
          <b-button v-b-modal.modal-center
          block
          variant="danger"
          >Report</b-button>
          <!-- Modal Component -->
          <b-modal id="modal-center" style="height:100px;" centered title="Thank you!">
            <p class="my-4">Your feedback has been received.</p>

          </b-modal>
        </div>
      </form>
    </b-container>
    </b-jumbotron>
</template>

<script>
export default {
  name:'Report',
	data () {
		return {
      text:'',
      name:'',
      reportForm:{
        bikeIdInput: '',
        selected: null,
        messageInput: ''
      }
		}
	},
  computed:{
    IdInputState (){
      this.reportForm.bikeIdInput.length == 7? true:false
    },
    IsFormComplete () {
			return this.reportForm.bikeIdInput != '' &&
        this.reportForm.selected != null &&
        this.reportForm.messageInput != ''
		}
  }
}
</script>

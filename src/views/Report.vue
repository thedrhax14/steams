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
    <label for="inputLive">What would you like to report about?</label>
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
    <label for="inputLive"> What issue did you face with your bike?</label>
    <br>
    <b-form-textarea
      id="textarea"
      v-model="reportForm.messageInput"
      placeholder="Tell us more about your issue..."
      rows="3"
      max-rows="6"
      />
      <pre class="mt-3 mb-0">{{ text }}</pre>
    </div>
    <div>
  <b-button v-b-modal.modal-center
  block
  variant="danger"
  >Report</b-button>
  <b-modal id="modal-center" style="height:100px;" centered title="Thank you!">
    <p class="my-4">Your feedback has been received.</p>
  </b-modal>
</div>
<b-button block style="text-align:center;" href="/">Return to book a bike</b-button>
</b-container>
</b-jumbotron>
</template>

<!--<div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      Thank you! Your feedback has been received.
      you will be redirected to the homepage in {{ dismissCountDown }} seconds...
    </b-alert>
    <b-button @click="showAlert" variant="danger" class="m-1">
      Report
    </b-button>
  </div>-->

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
  methods:{
    okButton(){
      this.$router.push('/')
    }
  },
  computed:{
    IdInputState (){
      this.reportForm.bikeIdInput.length == 7? true : false
    },
    IsFormComplete () {
			return this.reportForm.bikeIdInput != '' &&
        this.reportForm.selected != null &&
        this.reportForm.messageInput != ''
		}
  }
}
</script>

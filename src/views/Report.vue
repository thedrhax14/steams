<template>
  <body>
    <div class="wrap">
    <h2> Report an issue</h2>
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
    						<option value="1">1</option>
    						<option value="2">2</option>
    						<option value="3">3</option>
    						<option value="4">4</option>
    						<option value="5">5</option>
    				</b-form-select>
         </div>
       </div>
       <br>
   <!--<div>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file..."
      drop-placeholder="Drop file here..."
    />
    <div class="mt-3">{{ file ? file.name : '' }}</div>
  </div>-->
       <br>
       <h3> What issue did you face with your bike? </h3>
       <div class="form-group">
          <label class="custom-file-upload">
            <i class="fas fa-plus"></i> &nbsp;Add an image
          </label>
       </div>
       <button type="submit" name="submit">UPLOAD</button>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us more about your issue..."></textarea>
        <br>
        <hr>
      </form>
      <div>
        <b-button v-b-modal.modal-center variant="danger"> Report </b-button>
        <!-- Modal Component -->
        <b-modal id="modal-center" style="height:100px;" centered title="Thank you!">
          <p class="my-4">Your feedback has been received.</p>
        </b-modal>
      </div>
      </div>
  </body>
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

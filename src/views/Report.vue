<template>
  <body>
    <div class="wrap" style="margin-top: 50px;">
    <h2> Report an issue</h2>
    <hr>
    <br/>
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
           <select class="form-control" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <div class="dropdown-menu">
               <option>Bike Damage</option>
               <option>Lock pin timeout</option>
               <option>Connection problem</option>
             </div>
           </select>
         </div>
       </div>
       <br/>
       <div>
    <!-- Styled -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file..."
      drop-placeholder="Drop file here..."
    />
    <div class="mt-3">{{ file ? file.name : '' }}</div>
  </div>
  <br/>
       <h3> What issue did you face with your bike? </h3>
       <div class="form-group">
          <label class="custom-file-upload">
            <i class="fas fa-plus"></i>Add an image
          </label>
       </div>
       <button type="submit" name="submit">UPLOAD</button>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us more about your issue..."></textarea>
        <br/>
        <hr>
       <button id="my_button" type="button" class="btn btn-danger" style="margin-left:140px; width:200px;">Report</button>
       <div id="my_modal" class="modall">
      </div>
    </form>
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

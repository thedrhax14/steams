<template>
  <div class="wrap">
    <h2> Payement methods</h2>
    <hr>
    <br>
    <form>
      <div class="form-group">
        <label for="inputAddress2">Card number </label>
        <input type="text" class="form-control" id="inputAddress2" placeholder="Card number">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Expiry date</label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="e.g. 06/23">
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">CVV</label>
          <input type="password" class="form-control" id="inputPassword4" placeholder="CVV">
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress2">Country </label>
        <input type="text" class="form-control" id="inputAddress2" placeholder="Enter your country">
      </div>
      <div class="form-group">
        <label for="inputAddress2">Postal code </label>
        <input type="number" class="form-control" id="inputAddress2" placeholder="e.g. 971">
      </div>
      <br>
      <hr>
      <b-button @click="addNewCard" block variant="info"><i class="fas fa-save"></i>&nbsp;Save card</b-button></a>
     </form>
    </div>
</template>
<script>
  export default{
    data (){
      return{

      }
    },
    methods:{
      addNewCard(){
        this.$router.push('/')
      }
    }
  }
</script>

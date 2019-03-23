<template>
  <body>
  <div class="wrap">
    <h2> Payement methods</h2>
    <hr>
    <br/>
    <div class="custom-control custom-radio">
       <div id="pmethod-1">
        <input type="radio" id="pradio1" name="pradio" class="custom-control-input">
        <label class="custom-control-label" for="pradio1"><h5><i class="fas fa-credit-card"></i>&nbsp;Credit Card: ending in **39</h5></label>
        <br><small>Visa</small>
      </div>
    </div>
    <div class="custom-control custom-radio">
       <div id="pmethod-2">
        <input type="radio" id="pradio2" name="pradio" class="custom-control-input">
        <label class="custom-control-label" for="pradio2"><h5><i class="fas fa-credit-card"></i>&nbsp;Credit/Debit Card: ending in **52</h5></label>
        <br><small>Mastercard</small>
      </div>
    </div>
    <hr>
    <b-button @click=" " block variant="info">Save selection</b-button></a>
    <b-button @click="addPayement" block variant="danger"><i class="fas fa-plus"></i> &nbsp;Add a payement method</b-button></a>
   </div>

<br/>
<br/>

</body>
</template>

<script>

export default{
  name:'addCard',
  data (){
    return{

    }
  },
  methods: { addPayement (){
    this.$router.push('/newCard')
   }
  }
}
</script>

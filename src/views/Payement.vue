<template>
  <body>
  <div class="wrap" style="margin-top: 50px;">
    <h2> Payement methods</h2>
    <hr>
    <br/>
    <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action ">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1"><i class="fas fa-credit-card"></i> &nbsp;Credit Card: ending in **39</h5>
      <small>Mastercard</small>
    </div>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1"><i class="fas fa-credit-card"></i> &nbsp;Credit/Debit Card: ending in **52</h5>
      <small class="text-muted">Visa</small>
    </div>
  </a>
</div>
    <hr>
    <button @click="addPayement" variant="danger"><i class="fas fa-plus"></i> &nbsp;Add a payement method</button></a>
   </div>

<br/>
<br/>

</body>
</template>

<script>

export default {
	name: 'addCard',
	methods: { addPayement () {
		this.$route.push('/reserve')
	}
	}
}
</script>

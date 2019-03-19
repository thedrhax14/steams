<template>
    <div class="wrap">
    <h2> Thank you! </h2>
    <hr>
    <p>
      Your reservation has been made successfully. This is your reservation summary:
    </p>
    <br/>
    <div>
  <b-card-group deck>
    <b-card
      header="Order ID: 0123785539"
      header-tag="header"
      style="font-weight:bold;"
      footer="Card Footer"
      footer-tag="footer"
      align="center"
    >
    <b-card-text>
      <ul>
        <li
        style="list-style: none;"
        v-for="item in items">
          {{ item.message }}
        </li>
      </ul>
    </b-card-text>
    </b-card>
  </b-card-group>
   <b-button @click="confirmBooking" block variant="danger">OK</b-button>
  </div>
</div>
</template>

<script>
export default {
data() {
  return {
    items: [
      { message: 'PIN' },
      { message: 'Date' },
      { message: 'Start time' }
    ]
  }
},
	name: 'confirmOrder',
	methods: {
		confirmBooking () {
			this.$router.push('/')
		}
	}
}
</script>

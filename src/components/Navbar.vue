<template >
  <div class="">
    <nav class="navbar">
      <span class="open-slide">
        <a href="#" onclick="openSlideMenu()" @click="setUserType() ">
          <i class="fas fa-bars fa-2x"></i>
        </a>
      </span>
      <div class="logo" style="position: absolute; margin-left: 100px;" >
          <img src="@/../public/SPINlogowhite.png">
      </div>
    </nav>
    <div id="side-menu" class="side-nav">
      <a href="#" class="btn-close" onclick="closeSlideMenu()">&times;</a>
      <div id="accountpic">
        <a href='/profile'><img src="@/../public/danny-pej.png"></a>
      </div>
      <section>
      </section>
      <div v-if="userPermission === 1">
          <router-link to='/placeorders' ><i class="fas fa-bicycle fa-sm"></i>&nbsp;&nbsp;Place Orders</router-link>
          <router-link to='/trackbl' ><i class="fas fa-bicycle fa-sm"></i>&nbsp;&nbsp;Track Bike Locations</router-link>
          <router-link to='/revieworders' class="current"><i class="far fa-clock fa-sm"></i>&nbsp;&nbsp;Review Orders</router-link>
      </div>
      <div v-else-if="userPermission === 2">
        <router-link to='manStats/' class="current"><i class="fas fa-chart-line"></i>&nbsp;&nbsp;View Statistics</router-link>
      </div>
      <div v-else>
        <router-link to='/' class="current"><i class="fas fa-bicycle fa-sm"></i>&nbsp;&nbsp;Reserve a bike</router-link>
        <router-link to='/reservations'><i class="fas fa-bell fa-sm"></i>&nbsp;&nbsp;My reservations</router-link>
        <router-link to='/Recents'><i class="far fa-clock fa-sm"></i>&nbsp;&nbsp;Recent trips</router-link>
        <router-link to='/Payement'><i class="fas fa-credit-card fa-sm"></i>&nbsp;&nbsp;Payement</router-link>
        <router-link to='/Report'><i class="fas fa-exclamation fa-sm"></i>&nbsp;&nbsp;Report an issue</router-link>
      </div>
        <br/>
        <router-link to='./profile'>My Account</router-link>
        <router-link to='/'><i class="fas fa-question-circle fa-sm"></i>&nbsp;&nbsp;Help tour</router-link>
    </div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			userPermission: 'check'
		}
	},
	methods: {
		setUserType (int) {
			this.userPermission = this.$store.state.userInfo.PermissionLevel // undefined = member, 1 = operator, 2 = manager, 3 = admin
		}
	}
}

</script>

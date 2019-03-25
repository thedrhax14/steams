<template>
  <header>
       <div class="container"></div>
        <div id="mySidebar" class="sidebar">
          <a href="#" class="closebtn" onclick="closeNav()">&times;</a>
          <div id="accountpic">
            <a  v-if="userPermission === 0" href='/profile'><img src="@/../public/danny-pej.png"></a>
            <a  v-if="userPermission === 1" href='/profile'><img src="@/../public/operator.png" style="height:120px; margin-left: 50px;"></a>
            <a  v-if="userPermission === 2" href='/profile'><img src="@/../public/manager.png"  style="height:120px; margin-left: 50px;"></a>
          </div>
          <hr>
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
            <router-link to='/Payement'><i class="fas fa-credit-card fa-sm"></i>&nbsp;&nbsp;Payment</router-link>
            <router-link to='/Report'><i class="fas fa-exclamation fa-sm"></i>&nbsp;&nbsp;Report an issue</router-link>
          </div>
            <hr>
            <router-link to='/'><i class="fas fa-question-circle fa-sm"></i>&nbsp;&nbsp;Help tour</router-link>
        </div>
  </header>
</template>

<script>
export default {
	name: 'NavBar',
	computed: {
		userPermission () {
			// 0 = customer, 1 = operator, 2 = manager, 3 = admin
			return this.$store.state.userInfo.PermissionLevel
		}
	}
}
</script>

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
        <router-link to='/' class="current"><i class="fas fa-bicycle fa-sm"></i>&nbsp;&nbsp;Reserve a bike</router-link>
        <router-link to='/reservations'><i class="fas fa-bell fa-sm"></i>&nbsp;&nbsp;My reservations</router-link>
        <router-link to='/Recents'><i class="far fa-clock fa-sm"></i>&nbsp;&nbsp;Recent trips</router-link>
        <router-link to='/Payement'><i class="fas fa-credit-card fa-sm"></i>&nbsp;&nbsp;Payement</router-link>
        <router-link to='/Report'><i class="fas fa-exclamation fa-sm"></i>&nbsp;&nbsp;Report an issue</router-link>
        <br/>
        <router-link to='./profile'>My Account</router-link>
        <router-link to='/Bikes'><i class="fas fa-question-circle fa-sm"></i>&nbsp;&nbsp;Help</router-link>
        <router-link to="settings.html"><i class="fas fa-cog fa-sm"></i>&nbsp;&nbsp;Settings</router-link>
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
			if (!this.userPermission || this.userPermission.length === 0) { console.log('member') } // this means member
			if (this.userPermission == '1') { console.log('operator') }
		},
		setRouterLinks (userPermission) {
			alert('check')
		}
	}
}

</script>

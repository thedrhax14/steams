<template>
	<div id="app">
		<LoadingDisplay/>
		<Push v-if='IsAvailable' width="250">
			<span>
			<a  v-if="this.$store.state.userInfo.PermissionLevel == 0"><img src="@/../public/danny-pej.png"></a>
			<a  v-if="this.$store.state.userInfo.PermissionLevel == 1"><img src="@/../public/operator.png" style="height:120px; margin-left: 50px;"></a>
			<a  v-if="this.$store.state.userInfo.PermissionLevel == 2"><img src="@/../public/manager.png"  style="height:120px; margin-left: 50px;"></a>
		</span>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/" class="fas fa-bicycle fa-sm">
				<span>Reserve bike</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/reservations" class="fas fa-bell fa-sm">
				<span>Reservations</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/recents" class="far fa-clock fa-sm">
				<span>Recent trips</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/payement" class="fas fa-credit-card fa-sm">
				<span>Payment<br>methods</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 0' to="/report" class="fas fa-exclamation fa-sm">
				<span>Report<br>an issue</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/placeorders" class="fas fa-bicycle">
				<span>Place order</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/revieworders" class="fas fa-th-list">
				<span>Review<br>orders</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/trackbl" class="fas fa-map-marked-alt">
				<span>Track bike</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 1' to="/stationinterface">
				<span>Setup station</span>
			</router-link>
			<router-link v-if='this.$store.state.userInfo.PermissionLevel == 2' to="/manStats" class="fas fa fa-chart-bar">
				<span>Statistics</span>
			</router-link>
			<br/>
			<hr>
			<a id="logout" class="fas fa-sign-out-alt"><span @click='logout'>Log out</span></a>
		</Push>
		<main id="page-wrap">
			<router-view/>
		</main>
	</div>
</template>

<script>
import LoadingDisplay from '@/components/LoadingDisplay.vue'
import { Push } from 'vue-burger-menu'
const fb = require('./firebaseConfig.js')

export default {
	components: {
		LoadingDisplay,
		Push
	},
	methods: {
		logout () {
			fb.auth.signOut().then(() => {
				console.log('Logged out')
				this.$router.push('/auth')
			}).catch(err => {
				console.log(err)
			})
		}
	},
	computed: {
		IsAvailable () {
			return !this.$store.state.isStationInterfaceActive && this.$store.state.user && this.$store.state.userInfo
		},
		IsLoggedIn () {
			return this.$store.state.user
		}
	},
	created () {
		console.log('dispatch \'fetchBikeTypes\' on created in app.vue')
		this.$store.dispatch('fetchBikeTypes')
	}
}
</script>

<style>
.bm-menu {
	background-color: #E53935;
}

nav a, nav span {
	color: white;
	text-decoration: none;
}

nav a:hover {
	color: white;
	text-decoration: none;
}

.bm-cross {
    background: #fff;
}
</style>

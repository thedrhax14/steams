import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('setUser', user)
	}
})

export const store = new Vuex.Store({
	state: {
		selectedBikeTypeId: String,
		selectedStation: String,
		selectedBikeId: String,
		user: Object,
		userInfo: Object,
		userhistory: [],
		bikeTypes: [],
		stations: [],
		bikes: [],
		performingRequest: false
	},
	actions: {
		fetchBikes ({ state, commit }, data) {

		},
		fetchHistory ({ state, commit }, data) {

		},
		fetchBikeTypes ({ state, commit }, data) {

		},
		fetchUserHistory ({ state, commit }, data) {

		},
		fetchUserInfomation ({ state, commit }, data) {

		},
		addBikeToBikes ({ state, commit }, data) {

		},
		addEntryToHistory ({ state, commit }, data) {

		},
		addBikeTypeToBikeTypes ({ state, commit }, data) {

		},
		updateBikeInBikes ({ state, commit }, data) {

		},
		updateUserInformation ({ state, commit }, data) {

		},
		updateUserProfile ({ state, commit }, newDisplayName) {
			console.log('Updating user profile. Displayed name will be ' + newDisplayName)
			fb.auth.user.updateProfile({
				displayName: newDisplayName,
				photoURL: 'https://example.com/jane-q-user/profile.jpg'
			}).then(function () {
				commit('setUser', fb.auth.user)
				console.log('Userprofile updated. Displayed name is ' + fb.auth.user.displayName)
			}).catch(function (error) {
				alert(error)
			})
		}
	},
	mutations: {
		setSelectedBikeTypeId (state, val) {
			state.selectedBikeTypeId = val
		},
		setSelectedStation (state, val) {
			state.selectedStation = val
		},
		setSelectedBikeId (state, val) {
			state.selectedBikeId = val
		},
		setUser (state, val) {
			state.user = val
		},
		setUserInfo (state, val) {
			state.userInfo = val
		},
		setUserhistory (state, val) {
			state.userhistory = val
		},
		addUserHistory (state, val) {
			state.userhistory.push(val)
		},
		setBikeTypes (state, val) {
			state.bikeTypes = val
		},
		addBikeType (state, val) {
			state.bikeTypes.push(val)
		},
		setStations (state, val) {
			state.stations = val
		},
		addStation (state, val) {
			state.stations.push(val)
		},
		setBikes (state, val) {
			state.bikes = val
		},
		addBike (state, val) {
			state.bikes.push(val)
		},
		setPerformingRequest (state, val) {
			state.performingRequest = val
		},
		flipPerformingRequest (state) {
			state.performingRequest = !state.performingRequest
		}
	}
})

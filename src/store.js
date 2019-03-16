import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('setCurrentUser', user)
	}
})

export const store = new Vuex.Store({
	state: {
		performingRequest: false,
		currentUser: null,
		userInfo: Object,
		selectedBikeId: String,
		bikeTypes: [], // The structure should be almost the same as collection in the firestore
		bikes: [],
		stations: [],
		userhistory: []
	},
	actions: {
		clearData ({ commit }) {
			commit('setCurrentUser', null)
		},
		fetchbikeTypes ({ dispatch, commit, state }) {
			commit('clearBikesData')
			state.performingRequest = true
			fb.bikeTypesCollection.get().then(bikeTypesSnapshot => {
				bikeTypesSnapshot.forEach(bikeTypeDoc => {
					// console.log(bikeTypeDoc.id, ' => ', bikeTypeDoc.data())
					commit('addBikeType', bikeTypeDoc)
					dispatch('fetchBikes', bikeTypeDoc.id)
				})
			})
		},
		fetchBikes ({ commit, state }, bikeTypeId) {
			fb.bikeTypesCollection.doc(bikeTypeId).collection('Bikes').get().then(bikesSnapshot => {
				bikesSnapshot.forEach(bikeDoc => {
					// console.log(bikeDoc.id, ' => ', bikeDoc.data())
					commit('addBike', bikeDoc)
				})
				state.performingRequest = false
			})
		},
		fetchUserByUserId({ commit, state }) {
			state.performingRequest = true
			fb.usersCollection.doc(state.currentUser.uid).get().then(userDocSnapshot => {
				console.log('Got user info ' + userDocSnapshot.data())
				commit('setUserInfo',userDocSnapshot.data())
				state.performingRequest = false
			})
		},
		selectBike ({ commit }, bid) {
			commit('setSelectBike', bid)
		},
		returnBike ({ state }, bikeData) {
			fb.db.collection('Bike Types').doc(bikeData.biketypeId).collection('Bikes').doc(bikeData.bikeId).update({ Reserved: null })
		},
		bookBike ({ state }, bikeData) {
			fb.db.collection('Bike Types').doc(bikeData.biketypeId).collection('Bikes').doc(bikeData.bikeId).update({ Reserved: state.currentUser.uid })
		}
	},
	mutations: {
		setCurrentUser (state, val) {
			state.currentUser = val
		},
		setUserInfo(state, val) {
			state.userInfo = val
		},
		selectLocation (state, val) {
			state.selectedBikeId = val
		},
		updateUserProfile (state, displayNameval) {
			console.log('Updating user profile. Displayed name will be ' + displayNameval)
			fb.auth.currentUser.updateProfile({
				displayName: displayNameval,
				photoURL: 'https://example.com/jane-q-user/profile.jpg'
			}).then(function () {
				console.log('Userprofile updated. Displayed name is ' + fb.auth.currentUser.displayName)
			}).catch(function (error) {
				alert(error)
			})
		},
		clearBikesData (state) {
			state.bikeTypes = []
			state.bikes = []
		},
		addBikeType (state, val) {
			state.bikeTypes.push(val)
		},
		addHistory (state, val) {
			state.userhistory.push(val)
		},
		setSelectBike (state, val) {
			state.selectedBikeId = val
		},
		addBike (state, val) {
			state.bikes.push(val)
		}
	}
})

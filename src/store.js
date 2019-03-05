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
		selectedBikeId: '',
		bikes: [],
		stations: [],
		userhistory: []
	},
	actions: {
		clearData ({ commit }) {
			commit('setCurrentUser', null)
		},
		fetchBikes ({ commit, state }) {
			commit('setBikes', [])
			state.performingRequest = true
			fb.bikesCollection.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					commit('addBike', doc)
					console.log(doc.id, ' => ', doc.data())
				})
				state.performingRequest = false
			})
		},
		fetchUserHistory ({ commit, state }) {
			state.performingRequest = true
			state.userhistory = []
			fb.bikeHistoryCollection.where('User', '==', state.currentUser.uid).get().then(querySnapshot => {
				state.performingRequest = false
				querySnapshot.forEach(function (doc) {
					console.log('adding history of ' + doc.id)
					fb.bikesCollection.doc(doc.id).get().then(snapShot => {
						commit('addHistory', snapShot)
						console.log(snapShot.id, ' => ', snapShot.data())
					})
				})
			})
		},
		selectBike ({ commit }, bid) {
			commit('setSelectBike', bid)
		},
		rentBike ({ state }) {
			state.performingRequest = true
			var bikeTypeRef = fb.bikesCollection.doc(state.selectedBikeId)
			var bikes = bikeTypeRef.collection('Bikes')
			bikes.where('Reserved', '==', null).limit(1).get().then(querySnapshot => {
				querySnapshot.forEach(function (doc) {
					console.log('Booking ', doc)
					bikes.doc(doc.id).update({ Reserved: state.currentUser.uid })
				})
			})
		},
		returnBike ({ dispatch, state }) {
			state.performingRequest = true
			fb.bikeHistoryCollection.doc(state.selectedBikeId).delete().then(function () {
				alert('Returned ' + state.selectedBikeId)
				console.log('Document successfully deleted!')
				state.performingRequest = false
				dispatch('fetchUserHistory')
			})
		}
	},
	mutations: {
		setCurrentUser (state, val) {
			state.currentUser = val
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
		setBikes (state, val) {
			state.bikes = val
		},
		addBike (state, val) {
			state.bikes.push(val)
		},
		addHistory (state, val) {
			state.userhistory.push(val)
		},
		setSelectBike (state, val) {
			state.selectedBikeId = val
		}
	}
})

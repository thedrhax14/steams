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
		bikeTypes: [],
		bikes: [],
		stations: [],
		userhistory: []
	},
	actions: {
		clearData ({ commit }) {
			commit('setCurrentUser', null)
		},
		fetchbikeTypes ({ dispatch, commit, state }) {
			commit('setbikeTypes', [])
			state.performingRequest = true
			fb.bikeTypesCollection.get().then(bikeTypesSnapshot => {
				bikeTypesSnapshot.forEach(bikeTypeDoc => {
					console.log(bikeTypeDoc.id, ' => ', bikeTypeDoc.data())
					commit('addBikeType', bikeTypeDoc)
					dispatch('fetchBikes', bikeTypeDoc.id)
				})
				state.performingRequest = false
			})
		},
		fetchBikes ({ commit, state }, bikeTypeId) {
			fb.bikeTypesCollection.doc(bikeTypeId).collection('Bikes').get().then(bikesSnapshot => {
				bikesSnapshot.foreach(bikeDoc => {
					console.log(bikeDoc.id, ' => ', bikeDoc.data())
					commit('addBike', bikeDoc)
				})
			})
		},
		fetchUserHistory ({ commit, state }) {
			state.performingRequest = true
			state.userhistory = []
			fb.bikeHistoryCollection.where('User', '==', state.currentUser.uid).get().then(querySnapshot => {
				state.performingRequest = false
				querySnapshot.forEach(function (doc) {
					console.log('adding history of ' + doc.id)
					fb.bikeTypesCollection.doc(doc.id).get().then(snapShot => {
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
			var bikeTypeRef = fb.bikeTypesCollection.doc(state.selectedBikeId)
			var bikeTypes = bikeTypeRef.collection('bikeTypes')
			bikeTypes.where('Reserved', '==', null).limit(1).get().then(querySnapshot => {
				querySnapshot.forEach(function (doc) {
					console.log('Booking ', doc)
					bikeTypes.doc(doc.id).update({ Reserved: state.currentUser.uid })
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
		setbikeTypes (state, val) {
			state.bikeTypes = val
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

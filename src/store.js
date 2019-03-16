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
		selectedStation: String,
		bikeTypes: [],
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
					dispatch('fetchBikes', {
						Id: bikeTypeDoc.id,
						Name: bikeTypeDoc.data()['Type name'],
						Price: bikeTypeDoc.data().Price,
						AvailableBikes: []
					})
				})
			})
		},
		fetchBikes ({ commit, state }, data) {
			fb.bikeTypesCollection.doc(data.Id).collection('Bikes').get().then(bikesSnapshot => {
				bikesSnapshot.forEach(bikeDoc => {
					if(bikeDoc.data()['Current User'] === null && (this.state.selectedStation === "" || this.state.selectedStation === bikeDoc.data()['Station name'])) {
						data.AvailableBikes.push({Id: bikeDoc.id, Info: bikeDoc.data()})
					}
				})
				commit('addBikeType', data)
				state.performingRequest = false
			})
		},
		fetchUserByUserId ({ commit, state }) {
			state.performingRequest = true
			fb.usersCollection.doc(state.currentUser.uid).get().then(userDocSnapshot => {
				console.log('Got user info ' + userDocSnapshot.data())
				commit('setUserInfo', userDocSnapshot.data())
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
		setUserInfo (state, val) {
			state.userInfo = val
		},
		selectLocation (state, val) {
			state.selectedStation = val
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
		},
		addBikeType (state, val) {
			state.bikeTypes.push(val)
		},
		addHistory (state, val) {
			state.userhistory.push(val)
		},
		setSelectBike (state, val) {
			state.selectedBikeId = val
		}
	}
})

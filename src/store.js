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
		selectedBikeTypeId: null,
		selectedStation: null,
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
			commit('clearUserhistory')
			state.performingRequest = true
			fb.bikeTypesCollection.get().then(bikeTypesSnapshot => {
				bikeTypesSnapshot.forEach(bikeTypeDoc => {
					dispatch('fetchBikes', {
						bikeTypeId: bikeTypeDoc.id,
						BikeTypeName: bikeTypeDoc.data()['Type name'],
						Price: bikeTypeDoc.data().Price,
						AvailableBikes: []
					})
				})
			})
		},
		fetchBikes ({ commit, dispatch, state }, data) {
			fb.bikeTypesCollection.doc(data.bikeTypeId).collection('Bikes').get().then(bikesSnapshot => {
				bikesSnapshot.forEach(bikeDoc => {
					// console.log('Reserved', bikeDoc.data()['Reserved'])
					// console.log('selectedStation', this.state.selectedStation)
					// This needs to be separated from each other
					if ((bikeDoc.data()['Reserved'] === null || bikeDoc.data()['Reserved'] === state.currentUser.uid) && (this.state.selectedStation === null || this.state.selectedStation === '' || this.state.selectedStation === bikeDoc.data()['Station name'])) {
						data.AvailableBikes.push({ Id: bikeDoc.id, Info: bikeDoc.data() })
					}
					if(state.currentUser.uid){
						dispatch('fetchBikeHistory',{
							bikeTypeId: data.bikeTypeId,
							BikeId: bikeDoc.id,
							BikeTypeName: data.BikeTypeName
						})
					}
				})
				commit('addBikeType', data)
				state.performingRequest = false
			})
		},
		fetchBikeHistory({ commit, state }, data) {
			fb.bikeTypesCollection
			.doc(data.bikeTypeId)
			.collection('Bikes')
			.doc(data.BikeId)
			.collection('Usage History')
			.where('uid','==',state.currentUser.uid)
			.get().then(entries => {
				entries.forEach(entry => {
					// console.log('entry', entry.data())
					var t = new Date(1970, 0, 1)
    				t.setSeconds(entry.data().StartDateAndTime.seconds)
					commit('addHistory',{
						StartDateAndTime: t,
						BikeType: data.BikeTypeName,
						biketypeId: data.bikeTypeId,
						bikeId: data.BikeId
					})
				})
			})
		},
		fetchUserByUserId ({ commit, state }) {
			state.performingRequest = true
			fb.usersCollection.doc(state.currentUser.uid).get().then(userDocSnapshot => {
				// console.log('Got user info ' + userDocSnapshot.data())
				commit('setUserInfo', userDocSnapshot.data())
				state.performingRequest = false
			})
		},
		selectBike ({ commit }, bid) {
			commit('setSelectBike', bid)
		},
		returnBike ({ state }, bikeData) {
			state.performingRequest = true
			fb.db.collection('Bike Types').doc(bikeData.biketypeId).collection('Bikes').doc(bikeData.bikeId).update({ Reserved: null })
			state.performingRequest = false
		},
		bookBike ({ state }, bookingData) {
			// console.log('Booking ', bookingData)
			var str = bookingData.StartDateAndTime
			var dt = new Date(str + "Z")
			fb.db.collection('Bike Types').doc(bookingData.biketypeId).collection('Bikes').doc(bookingData.bikeId).update({ Reserved: state.currentUser.uid })
			fb.db.collection('Bike Types').doc(bookingData.biketypeId).collection('Bikes').doc(bookingData.bikeId).collection('Usage History').doc().set({
				StartDateAndTime: dt,
				uid: state.currentUser.uid
			})
		},
		bookFirstAvailableBikeType ({ state, dispatch }, data) {
			var found = false
			// console.log('Start booking ', data)
			state.bikeTypes.forEach(element => {
				// console.log(element.Id, ' === ', data.bikeTypeId,' = ', element.Id === data.bikeTypeId,', found = ', found)
				// console.log('element ', element)
				if (element.Id === data.bikeTypeId && found === false) {
					dispatch('bookBike', {
						biketypeId: data.bikeTypeId,
						bikeId: element.AvailableBikes[0].Id,
						StartDateAndTime: data.StartDateAndTime
					})
					found = true
				}
			})
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
		selectBikeTypeId (state, val) {
			state.selectedBikeTypeId = val
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
		clearUserhistory (state) {
			state.userhistory = []
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

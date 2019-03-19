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
		userInfo: Object,
		user: Object,
		update: {
			user: 0,
			type: 1,
			price: 2,
			status: 3,
			location: 4
		},
		userhistory: [],
		bikeTypes: [],
		history: [],
		bikes: [],
		loading: false
	},
	actions: {
		fetchBikes ({ commit }) {
			commit('setLoading', true)
			fb.bikesCollection.get().then(bikesDoc => {
				bikesDoc.forEach(bike => {
					commit('addBike', bike.data())
				})
				commit('setLoading', false)
			}).catch(err => {
				console.err('Error getting bikesDoc', err)
			})
		},
		fetchHistory ({ commit }) {
			commit('setLoading', true)
			fb.historyCollection.get().then(historyDoc => {
				commit('setHistory', historyDoc.data())
				commit('setLoading', false)
			}).catch(err => {
				console.err('Error getting historyDoc', err)
			})
		},
		fetchBikeTypes ({ commit }) {
			commit('setLoading', true)
			fb.bikeTypesCollection.get().then(bikeTypeDoc => {
				commit('setBikeTypes', bikeTypeDoc.data())
				commit('setLoading', false)
			}).catch(err => {
				console.err('Error getting bikeTypeDoc', err)
			})
		},
		fetchUserHistory ({ state, commit }) {
			commit('setLoading', true)
			fb.historyCollection.where('User', '==', state.user.id).get().then(historyDoc => {
				commit('setUserhistory', historyDoc.data())
				commit('setLoading', false)
			}).catch(err => {
				console.err('Error getting historyDoc of ' + state.user.id, err)
			})
		},
		fetchUserInfomation ({ commit }) {
			commit('setLoading', true)
			fb.usersCollection.get().then(userInfoDoc => {
				commit('setUserInfo', userInfoDoc.data())
				commit('setLoading', false)
			}).catch(err => {
				console.err('Error getting userInfoDoc', err)
			})
		},
		addBikeToBikes ({ commit }, data) {
			fb.bikesCollection.doc(data.bid).set(data.doc)
			/*
				expected data structure:
				{
					bid: "xxxxx",
					doc: {
						CurrentUser: "InsrestUIDHere",
						GPSLocation: [0,0], // geopoint
						Location: "InsertLocationHere",
						Type: "/Bike Types/InsertTimeHere"
					}
				}
			*/
		},
		addEntryToHistory ({ commit }, data) {
			commit('setLoading', true)
			fb.historyCollection.add(data).then(newHistoryDoc => {
				commit('addHistory', newHistoryDoc.data())
				commit('setLoading', false)
			})
			/*
				expected data structure to add new booking:
				{
					CurrentUser: "InsrestUIDHere",
					GPSLocation: [0,0], // geopoint
					Location: "InsertLocationHere",
					Type: "/Bike Types/InsertTimeHere"
				}
			*/
		},
		addBikeTypeToBikeTypes ({ commit }, data) {
			commit('setLoading', true)
			fb.bikeTypesCollection.doc(data.btid).set(data.doc).then(newBikeType => {
				commit('addBikeTypeToBikeTypes', newHistoryDoc.data())
				commit('setLoading', false)
			})
			/*
				expected data structure to add new bike type:
				{
					btid: "xxxxx",
					doc: {
						Price: InsertBikePriceHere, // int
						Name: "InsertBikeTypeNameHere", // geopoint
					}
				}
			*/
		},
		updateBikeInBikes ({ state, commit }, data) {
			fb.bikesCollection.doc(data.bid).set(data.doc)
			/*
				expected data structure to change bike:
				{
					bid: "xxxxx"
					doc: {
						CurrentUser: "InsrestUIDHere",
						GPSLocation: [0,0], // geopoint
						Location: "InsertLocationHere",
						Type: "/Bike Types/InsertTimeHere"
					}
				}
			*/
		},
		updateUserInformation ({ state, commit }, data) {
			fb.usersCollection.doc(data.uid).set(data.doc)
			/*
				expected data structure to change user info:
				{
					uid: "this.$store.state.user.uid"
					doc: {
						CurrentUser: "InsrestUIDHere",
						GPSLocation: [0,0], // geopoint
					}
				}
			*/
		},
		updateUserProfile ({ state, commit }, newDisplayName) {
			commit('setLoading', true)
			console.log('Updating user profile. Displayed name will be ' + newDisplayName)
			fb.auth.user.updateProfile({
				displayName: newDisplayName,
				photoURL: 'https://example.com/jane-q-user/profile.jpg'
			}).then(() => {
				commit('setUser', fb.auth.user)
				console.log('Userprofile updated. Displayed name is ' + fb.auth.user.displayName)
				commit('setLoading', false)
			}).catch(error => {
				console.err(error)
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
			console.log('TypeRef = ', val.TypeRef)
		},
		addBikeType (state, val) {
			state.bikeTypes.push(val)
		},
		setHistory (state, val) {
			state.history = val
		},
		addHistory (state, val) {
			state.history.push(val)
		},
		setBikes (state, val) {
			state.bikes = val
		},
		addBike (state, val) {
			console.log('addBike',val)
			state.bikes.push(val)
		},
		setLoading (state, val) {
			state.loading = val
		},
		flipLoading (state) {
			state.loading = !state.loading
		}
	}
})

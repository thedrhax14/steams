import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('setUser', user)
	}
})

fb.historyCollection.onSnapshot((historySnapshot) => {
	historySnapshot.docChanges().forEach(historyChange => {
		if (historyChange.type === 'added') {
			console.log('New history: ', historyChange.doc.data());
			store.commit('addHistory', historyChange.doc.data())
		}
		if (historyChange.type === 'modified') {
			console.log('Modified history: ', historyChange.doc.data());
		}
		if (historyChange.type === 'removed') {
			console.log('Removed history: ', historyChange.doc.data());
		}
	})
}, (error) => {
	console.log('historyCollection listener failed. Here is error:',error)
})

export const store = new Vuex.Store({
	state: {
		selectedBikeTypeId: String,
		selectedStation: 'None',
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
				bikesDoc.forEach(bikeDoc => {
					commit('addBike', bikeDoc.data())
				})
				commit('setLoading', false)
			}).catch(err => {
				console.log('Error getting bikesDoc', err)
			})
		},
		fetchHistory ({ commit }) {
			commit('setLoading', true)
			fb.historyCollection.get().then(history => {
				history.forEach(historyDoc => {
					commit('addHistory', historyDoc.data())
				})
				commit('setLoading', false)
			}).catch(err => {
				console.log('Error getting historyDoc', err)
			})
		},
		fetchBikeTypes ({ commit }) {
			commit('setLoading', true)
			fb.bikeTypesCollection.get().then(bikeTypesDoc => {
				bikeTypesDoc.forEach(bikeTypeDoc => {
					commit('addBikeType', {
						id: bikeTypeDoc.id, 
						data: bikeTypeDoc.data()
					})
				})
				commit('setLoading', false)
			}).catch(err => {
				console.log('Error getting bikeTypesDoc', err)
			})
		},
		fetchUserHistory ({ state, commit }) {
			commit('setLoading', true)
			fb.historyCollection.where('User', '==', state.user.uid).get().then(history => {
				history.forEach(historyDoc => {
					commit('addUserHistory', historyDoc.data())
				})
				commit('setLoading', false)
			}).catch(err => {
				console.log('Error getting historyDoc of ' + state.user.id, err)
			})
		},
		fetchUserInfomation ({ commit }, uid) {
			commit('setLoading', true)
			fb.usersCollection.doc(uid).get().then(userInfoDoc => {
				commit('setUserInfo', userInfoDoc.data())
				commit('setLoading', false)
			}).catch(err => {
				console.log('Error getting userInfoDoc', err)
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
			fb.usersCollection.doc(data.uid).update(data.doc)
			/*
				expected data structure to change user info:
				{
					uid: "this.$store.state.user.uid"
					doc: {
						PermissionLevel: x,
						Type: "InsertNameOfPermissionHere"
					}
				}
			*/
		},
		updateHistory ({ state, commit }, data) {
			fb.historyCollection.doc(data.uid).update(data.doc)
			/*
				expected data structure to change user info:
				{
					// You can find this info from history table. Look for entry where uid == this.$store.state.user.uid && ['Ending time & date'] == null
					// This may me unavailable, because listener to a history collection is not added yet
					historyid: "InsestHistoryIDHere"
					doc: {
						PermissionLevel: x,
						Type: "InsertNameOfPermissionHere"
					}
				}
			*/
		},
		updateUserProfile ({ commit, dispatch }, val) {
			commit('setLoading', true)
			console.log('Updating user profile. Displayed name will be ' + val.displayName)
			fb.auth.user.updateProfile({
				displayName: val.displayName,
				photoURL: 'https://example.com/jane-q-user/profile.jpg'
			}).then(() => {
				commit('setUser', fb.auth.user)
				console.log('Userprofile updated. Displayed name is ' + fb.auth.user.displayName)
				commit('setLoading', false)
				dispatch('updateUserInformation',{
					uid: fb.auth.user.uid,
					doc: val.data
				})
				commit('setUserInfo', val.data)
			}).catch(error => {
				console.log(error)
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
		setUserHistory (state, val) {
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

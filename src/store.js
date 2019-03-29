import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

var UnsubFromUserCollection
var UnsubFromOrdersCollection

fb.auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('setUser', user)
		UnsubFromUserCollection = fb.usersCollection.doc(user.uid).onSnapshot((userSnapshot) => {
			console.log('userSnapshot', userSnapshot.data())
			store.commit('setUserInfo', userSnapshot.data())
			if (userSnapshot.data().PermissionLevel === 1) {
				// console.log('subscribing to ordersCollection',user.uid)
				UnsubFromOrdersCollection = fb.ordersCollection.onSnapshot(ordersSnapshot => {
					// console.log('ordersSnapshot', ordersSnapshot)
					ordersSnapshot.docChanges().forEach(ordersChange => {
						if (ordersChange.type === 'added') {
							// console.log('New order: ', ordersChange.doc.id)
							store.commit('addOrder', ordersChange.doc)
						}
						if (ordersChange.type === 'modified') {
							// console.log('Modified order: ', ordersChange.doc.id)
							store.commit('updateOrder', ordersChange.doc)
						}
					})
				}, (error) => {
					console.log('ordersCollection listener failed. Here is error:', error)
				})
			} else if (UnsubFromOrdersCollection) {
				UnsubFromOrdersCollection()
			}
		}, (error) => {
			console.log('usersCollection listener failed. Here is error:', error)
		})
	} else {
		if (UnsubFromUserCollection) { UnsubFromUserCollection() }
		if (UnsubFromOrdersCollection) { UnsubFromOrdersCollection() }
	}
})

fb.historyCollection.onSnapshot((historySnapshot) => {
	historySnapshot.docChanges().forEach(historyChange => {
		// console.log('historyChange', historyChange)
		if (historyChange.type === 'added') {
			// console.log('New history: ', historyChange.doc.id)
			store.commit('addHistory', historyChange.doc)
		}
		if (historyChange.type === 'modified') {
			// console.log('Modified history: ', historyChange.doc.id)
			store.commit('updateHistory', historyChange.doc)
		}
		if (historyChange.type === 'removed') {
			// console.log('Removed history: ', historyChange.doc.id)
		}
	})
}, (error) => {
	console.log('historyCollection listener failed. Here is error:', error)
})

fb.bikesCollection.onSnapshot((bikesSnapshot) => {
	bikesSnapshot.docChanges().forEach(bikeChange => {
		if (bikeChange.type === 'added') {
			console.log('New bike: ', bikeChange.doc.id)
			store.commit('addBike', bikeChange.doc)
		}
		if (bikeChange.type === 'modified') {
			// console.log('Modified bike: ', bikeChange.doc.id)
			store.commit('updateBike', bikeChange.doc)
		}
		if (bikeChange.type === 'removed') {
			// console.log('Removed bike: ', bikeChange.doc.id)
		}
	})
}, (error) => {
	console.log('bikesCollection listener failed. Here is error:', error)
})

export const store = new Vuex.Store({
	state: {
		selectedBikeTypeId: '',
		selectedStation: 'None',
		selectedBikeId: '',
		selectedCard: Object,
		userInfo: Object,
		user: Object,
		bikeTypes: [],
		history: [],
		bikes: [],
		orders: [],
		loading: false,
		isStationInterfaceActive: false
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
		fetchUserInfomation ({ commit }, uid) {
			commit('setLoading', true)
			fb.usersCollection.doc(uid).get().then(userInfoDoc => {
				commit('setUserInfo', userInfoDoc.data())
				commit('setLoading', false)
			}).catch(err => {
				console.log('Error getting userInfoDoc', err)
			})
		},
		fetchOrders ({ commit, state }) {
			commit('setLoading', true)
			commit('setOrders', [])
			fb.ordersCollection.where('uid', '==', state.user.uid).get().then(ordersSnapshot => {
				ordersSnapshot.forEach(orderDoc => {
					commit('addOrder', orderDoc)
				})
				commit('setLoading', false)
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
		addEntryToHistory ({ commit, dispatch }, data) {
			console.log('addEntryToHistory', data)
			commit('setLoading', true)
			fb.historyCollection.add(data).then(newHistoryDoc => {
				commit('setLoading', false)
				dispatch('updateBikeInBikes', {
					bid: data.BikeID,
					doc: {
						Reserved: true
					}
				})
			})
			/*
				expected data structure to add new booking:
				{
					BikeID: yyxxxxx,
					PIN: xxxx,
					"Start location": "InsertLocationHere",
					"Start time & date": xxxxxxxxxxxx, // seconds
					uid: state.state.user.uid
					Status: "Reserved"
				}
			*/
		},
		addBikeTypeToBikeTypes ({ commit }, data) {
			commit('setLoading', true)
			fb.bikeTypesCollection.doc(data.btid).set(data.doc).then(newBikeType => {
				commit('addBikeTypeToBikeTypes', newBikeType.data())
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
		updateBikeInBikes ({ state }, data) {
			console.log(data.bid, ' is updating ', data.doc)
			fb.bikesCollection.doc(data.bid).update(data.doc)
			/*
				if any of the following properties gets changed the
				db updates the fields respectively
				expected data structure to change bike:
				{
					bid: "xxxxx"
					doc: {
						"Bike condition": "InsrestConditionHere",
						Location: "InsrestLocationHere",
						"Lock ID": "InsertLockRefHere",
						Reserved: Boolean,
						"Type name": "InsertBikeTypeID"
					}
				}
			*/
		},
		updateOrderInOrders ({ state }, data) {
			console.log(data.oid, ' is updating ', data.doc)
			fb.ordersCollection.doc(data.oid.toString()).set(data.doc)
			/*
				if any of the following properties gets changed the
				db updates the fields respectively
				expected data structure to change bike:
				{
					oid: "xxx"
					doc: {
						BikeID: "YYXXXXX",
						"Bike Type": "InsrestBikeTypeHere",
						Location: "InsertLocationNameHere,
						NumberOfBikes: xx,
						"Order type": "InsertOrderTypeHere",
						Status: "InsertStatusHere",
						uid: this.$store.state.user.uid
					}
				}
			*/
		},
		updateUserInformation ({ state }, data) {
			fb.usersCollection.doc(data.uid).update(data.doc)
			/*
				if any of the following properties gets changed the
				db updates the fields respectively
				expected data structure to change user info:
				{
					uid: this.$store.state.user.uid
					doc: {
						PermissionLevel: x,
						Type: "InsertNameOfPermissionHere"
						PaymentMethods: [
							{
								"Card number":"xxxxxxxxxxxxxxxx",
								"Expire date": xxxxxxxxxxxx, // seconds
								cvv: "xxx",
								"Card holder": "FirstName LastName"
							},
							{
								"Card number":"xxxxxxxxxxxxxxxx",
								"Expire date": xxxxxxxxxxxx, // seconds
								cvv: "xxx",
								"Card holder": "FirstName LastName"
							},
							{...}
						]
					}
				}
			*/
		},
		updateHistory ({ dispatch, commit }, data) {
			fb.historyCollection.doc(data.id).update(data.doc)
			/*
				if any of the following properties gets changed the
				db updates the fields respectively
				expected data structure to update booking:
				{
					id: "InsertHistoryIDHere",
					doc: {
						BikeID: yyxxxxx,
						PIN: xxxx,
						"Start location": "InsertLocationHere",
						"Start time & date": xxxxxxxxxxxx, // seconds
						"End location": "InsertLocationHere",
						"End time & date": xxxxxxxxxxxx, // seconds
						Status: "InsertStatusHere"
						uid: state.state.user.uid
					}
				}
			*/
			if (data.doc['End location'] == '') {
				dispatch('updateBikeInBikes', {
					bid: data.doc.BikeID,
					doc: {
						Reserved: data.doc.Status !== 'Cancelled'
					}
				})
			}
		},
		updateUserProfile ({ commit, state }, val) {
			commit('setLoading', true)
			console.log('Updating user profile. Displayed name will be ' + val.displayName)
			state.user.updateProfile({
				displayName: val.displayName,
				photoURL: 'https://example.com/jane-q-user/profile.jpg'
			}).then(() => {
				console.log('Userprofile updated. Displayed name is ' + state.user.displayName)
				commit('setLoading', false)
			}).catch(error => {
				console.log(error)
			})
		},
		unlockBike ({ commit, dispatch }, val) {
			commit('setLoading', true)
			console.log('unlocking', val)
			fb.bikesCollection.doc(val.BikeID).get().then(bike => {
				bike.data()['Lock ID'].update({
					'Lock State': 'unlocked'
				})
				dispatch('updateBikeInBikes', {
					bid: val.BikeID,
					doc: {
						Location: null,
						'Lock ID': null
					}
				})
				commit('setLoading', false)
			})
			/*
			Expected data structure:
			{
				BikeID: "InsertBikeIDHere"
			}
			*/
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
		setSelectedCard (state, val) {
			state.selectedCard = val.data().PaymentInfo
		},
		setUser (state, val) {
			state.user = val
		},
		setUserInfo (state, val) {
			state.userInfo = val
		},
		addUserPaymentMethod (state, val) {
			state.userInfo.PaymentMethods.push(val)
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
			state.history.push({
				id: val.id,
				data: val.data()
			})
		},
		updateHistory (state, val) {
			for (var i = 0; i < state.history.length; i++) {
				if (state.history[i].id === val.id) {
					state.history[i].data = val.data()
					break
				}
			}
		},
		setBikes (state, val) {
			state.bikes = val
		},
		addBike (state, val) {
			state.bikes.push({
				id: val.id,
				data: val.data()
			})
		},
		updateBike (state, val) {
			for (var i = 0; i < state.bikes.length; i++) {
				if (state.bikes[i].id === val.id) {
					state.bikes[i].data = val.data()
					break
				}
			}
		},
		setOrders (state, val) {
			state.orders = val
		},
		addOrder (state, val) {
			state.orders.push({
				id: val.id,
				data: val.data()
			})
		},
		updateOrder (state, val) {
			for (var i = 0; i < state.order.length; i++) {
				if (state.order[i].id === val.id) {
					state.order[i].data = val.data()
					break
				}
			}
		},
		setLoading (state, val) {
			state.loading = val
		},
		flipLoading (state) {
			state.loading = !state.loading
		},
		SetIsStationInterfaceActive (state, val) {
			state.isStationInterfaceActive = val
		}
	}
})

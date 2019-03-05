import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

const config = {
	apiKey: 'AIzaSyCAiApPY5IgItylBxhL-KF9K6KJ10x9IhE',
	authDomain: 'steams-f6541.firebaseapp.com',
	databaseURL: 'https://steams-f6541.firebaseio.com',
	projectId: 'steams-f6541',
	storageBucket: 'steams-f6541.appspot.com',
	messagingSenderId: '188644592401'
}

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

const settings = {
	timestampsInSnapshots: true
}

db.settings(settings)

const bikesCollection = db.collection('Bike Types')
const usersCollection = db.collection('User Information')

export {
	db,
	auth,
	currentUser,
	bikesCollection,
	usersCollection
}

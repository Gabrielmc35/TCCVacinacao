import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: "AIzaSyB14TdL8ASc3epyukK532aXzoKXs7o23SE",
    authDomain: "net-ninja-marioplan-a0eb1.firebaseapp.com",
    databaseURL: "https://net-ninja-marioplan-a0eb1.firebaseio.com",
    projectId: "net-ninja-marioplan-a0eb1",
    storageBucket: "net-ninja-marioplan-a0eb1.appspot.com",
    messagingSenderId: "693151837758",
    appId: "1:693151837758:web:3f47c9bd7deb9f60"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots:true})

  const storage= firebase.storage();

  export {
    storage,firebase as default
  }
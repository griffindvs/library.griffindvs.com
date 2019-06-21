import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDJ-aTaaAwoNoUaMhHCwWrm9zLvJ20iyBc",
    authDomain: "library-griffindvs.firebaseapp.com",
    databaseURL: "https://library-griffindvs.firebaseio.com",
    projectId: "library-griffindvs",
    storageBucket: "library-griffindvs.appspot.com",
    messagingSenderId: "348466458243",
    appId: "1:348466458243:web:5c000e54f472a4a3"
  };

  class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.provider = new firebase.auth.GoogleAuthProvider();
  }
}

export default Firebase;

/*'use strict';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKmJokqea-Yaic2em3feTnNknu1PdVZiw",
    authDomain: "reactfirstproject-703cf.firebaseapp.com",
    databaseURL: "https://reactfirstproject-703cf.firebaseio.com",
    projectId: "reactfirstproject-703cf",
    storageBucket: "reactfirstproject-703cf.appspot.com",
    messagingSenderId: "941121292830"
  };
  firebase.initializeApp(config);


class ApiRequest {
  constructor() {

  }

  signup(data) {
    return new Promise((next, error) => {
      firebase.createUser(data)
        .then((authData) => {
          let userRef = this.firebase.child('profiles').child(authData.uid);
          userRef.set({ email: data.email })
            .then(() => next(data))
            .catch((err) => error(err));
        })
        .catch((err) => error(err));
    });
  }

  login(data) {
    return new Promise((next, error) => {
      let callback = function (err, authData) {
        if (err) {
          error(err);
        } else {
          next(authData);
        }
      };

      if (data && data.email && data.password) {
        this.firebase.authWithPassword(data, callback);
      } else {
        this.firebase.authWithCustomToken(data, callback);
      }
    });
  }

  logout() {
    this.firebase.unauth();
  }

  loadUser(uid) {
    return new Promise((next, error) => {
      this.firebase.child('profiles').child(uid).once('value')
        .then((snapshot) => next(snapshot.val()))
        .catch((err) => error(err));
    });
  }

  updateUser(uid, payload) {
    return new Promise((next, error) => {
      let userRef = this.firebase.child('profiles').child(uid);
      userRef.update(payload)
        .then(() => next(payload))
        .catch((err) => error(err))
    });
  }
}

export default new ApiRequest();
*/
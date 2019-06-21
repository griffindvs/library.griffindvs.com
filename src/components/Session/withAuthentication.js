import React, {useState, useEffect} from 'react';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

/* Function that takes in a component, and returns a version
 of that component wrapped in the AuthUserContext.Provider */
const withAuthentication = Component => {
  function WithAuthentication(props) {
    const [authUser, setAuthUser] = useState(null); // Stores the Firebase auth user
    const [authAdmin, setAuthAdmin] = useState(false); // Stores the user's admin status

    // Called on component mount & unmount
    useEffect(() => {
      // Creates listener for auth state
      const listener = props.firebase.auth.onAuthStateChanged(user => {
        if(user) {
          setAuthUser(user); // Update state
          const userDoc = props.firebase.db.collection("users").doc(user.uid);
          userDoc.get().then((doc) => {
            // Updates existing users
            if (doc.exists) {
              userDoc.update({
                timestamp: new Date(),
                name: user.displayName,
                picture: user.photoURL
              }).then(function() {
                console.log("User updated.");
              }).catch(function(error) {
                console.log("Error updating user: ", error);
              });
            // Creates new users
            } else {
              userDoc.set({
                timestamp: new Date(),
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                picture: user.photoURL,
                admin: false
              }).then(function() {
                console.log("User added to database.");
              }).catch(function(error) {
                console.log("Error adding user to database: ", error);
              });
            }
          });

          userDoc.onSnapshot((doc) => {
            if(doc.exists) {
              if(doc.data().admin) {
                console.log("Given admin permissions.");
                setAuthAdmin(true);
              }
            }
          })
        } else {
          // If the user has logged out, reset state
          setAuthUser(null);
          setAuthAdmin(false);
        }
      });

      // Returns on unmount
      return function cleanup() {
        listener(); // Calling this removes the listener
      };
    });

    const contextVal = {
      authUser: authUser,
      authAdmin: authAdmin
    };

    return (
      // Gives component access to the AuthUserContext
      <AuthUserContext.Provider value={contextVal}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  }

  return withFirebase(WithAuthentication);
}

export default withAuthentication;

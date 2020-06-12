import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCoS494Jg7CFCjHcBz514eFwsD8bY-vkho",
  authDomain: "shoppingwebsitereact.firebaseapp.com",
  databaseURL: "https://shoppingwebsitereact.firebaseio.com",
  projectId: "shoppingwebsitereact",
  storageBucket: "shoppingwebsitereact.appspot.com",
  messagingSenderId: "238779094048",
  appId: "1:238779094048:web:992330f6ec44b21ac79845",
  measurementId: "G-RG3KE9W4CJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

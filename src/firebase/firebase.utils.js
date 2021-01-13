import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCwZ-JpfrE-6NH2fCiPXvYi3G2g_QvIlF0",
    authDomain: "crwn-clothing-ebwjr.firebaseapp.com",
    projectId: "crwn-clothing-ebwjr",
    storageBucket: "crwn-clothing-ebwjr.appspot.com",
    messagingSenderId: "694248204599",
    appId: "1:694248204599:web:a5099889f1ac7966d0d2b2",
    measurementId: "G-HVL93GC7XK"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


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
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}
export default firebase;

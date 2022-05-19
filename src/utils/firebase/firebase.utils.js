import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore, 
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfDQQOTv9fMSphzKG8n9e9ptZvzbh3Fzs",
    authDomain: "zoe-clothing-db.firebaseapp.com",
    projectId: "zoe-clothing-db",
    storageBucket: "zoe-clothing-db.appspot.com",
    messagingSenderId: "697973643147",
    appId: "1:697973643147:web:5904031bf303b0722b018e"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
      if(!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid)

      const userSnapshot = await getDoc(userDocRef);

      if(!userSnapshot.exists()) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try 
            {
                await setDoc(userDocRef, {
                    displayName, 
                    email,
                    createdAt,
                    ...additionalInformation
                });
            } catch (error) {
                console.log('error creating the user', error.message);
        }
      }

      return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword (auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword (auth, email, password)
  }
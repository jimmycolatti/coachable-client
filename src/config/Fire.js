import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBpDJ65rJ0nShrhcda-KyZleHXbVpcO63c",
  authDomain: "coachable-app-3d9ee.firebaseapp.com",
  projectId: "coachable-app-3d9ee",
  storageBucket: "coachable-app-3d9ee.appspot.com",
  messagingSenderId: "545621069325",
  appId: "1:545621069325:web:a2aa1e34e3266616138f44",
  measurementId: "G-0LTJL94FMY",
}

const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

export const auth = getAuth()

export const signInWithGoogle = () => {
  signInWithRedirect(auth, provider)
}

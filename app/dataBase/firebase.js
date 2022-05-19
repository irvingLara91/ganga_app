import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD8xQMShOSVlnyXDBIqGiHMAUhdFnf9Mts",

  authDomain: "ganga1-347814.firebaseapp.com",

  projectId: "ganga1-347814",

  storageBucket: "ganga1-347814.appspot.com",

  messagingSenderId: "925319202462",

  appId: "1:925319202462:web:73a0220b20846332f09d8f",
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);
const auth = getAuth();
const googleAuth = new GoogleAuthProvider();
const functions = getFunctions();

export { firebase, auth, googleAuth, db, storage, functions, analytics };

export default firebaseConfig;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var Config = {
  apiKey: "AIzaSyCietPAYnYTJfmryvoKFsqnjxX4NiRE_LU",
  authDomain: "login-5410d.firebaseapp.com",
  projectId: "login-5410d",
  storageBucket: "login-5410d.appspot.com",
  messagingSenderId: "459541023916",
  appId: "1:459541023916:web:9f3b2844fc04a861c36309",
  measurementId: "G-23N8SPP39Y"
};

// Initialize Firebase
firebase.initializeApp(Config);
const analytics = firebase.analytics();
firebase.analytics().logEvent('notification_received');
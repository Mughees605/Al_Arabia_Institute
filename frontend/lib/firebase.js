import firebase from "firebase";

const config = {
    apiKey: "AIzaSyC5YwyD2OA77jl7GTwkdiH48lzD-8dkiIU",
    authDomain: "al-arabia-90d4c.firebaseapp.com",
    databaseURL: "https://al-arabia-90d4c.firebaseio.com",
    projectId: "al-arabia-90d4c",
    storageBucket: "al-arabia-90d4c.appspot.com",
    messagingSenderId: "834916547452"
};

let storage;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
    storage = firebase.storage()
}

export default storage
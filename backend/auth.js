const {initializeApp} = require("firebase/app");
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyAydK4kw4ZIK-TdXWHqG-dVe2PcfneNNGg",
    authDomain: "cs498rk-finalproject.firebaseapp.com",
    projectId: "cs498rk-finalproject",
    storageBucket: "cs498rk-finalproject.appspot.com",
    messagingSenderId: "694065876172",
    appId: "1:694065876172:web:e094474a6f96c943e60669"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

async function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

async function logOut() {
    return signOut(auth);
}

function getCurrentUser() {
    return auth.currentUser;
}

module.exports = {signUp, logIn, logOut, getCurrentUser};

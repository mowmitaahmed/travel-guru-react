import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase/firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.app.length) {
        firebase.initializeApp(firebaseConfig);
    }
}





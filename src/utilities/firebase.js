import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../utilities/firebaseConfig';
import {signInAnonymously, getAuth} from 'firebase/auth'

export let app = undefined;
export let auth = undefined;
export let userId = undefined;
export const dburl = 'https://scuffed-chess-default-rtdb.firebaseio.com/'

export function initializeFirebase() {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    signInAnonymously(auth).catch((error) => {
        console.log(error);
    });

    auth.onAuthStateChanged((user) => {
        if(user) {
            userId = user.uid;
        } else {
            console.log('issue signing in')
        }
    });
}

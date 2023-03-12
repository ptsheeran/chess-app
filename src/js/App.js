import '../css/App.css';
import Board from './Board.js'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../utilities/firebaseConfig';
import {signInAnonymously, getAuth} from 'firebase/auth'

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  let playerId;

  signInAnonymously(auth).catch((error) => {
    console.log(error);
  });

  auth.onAuthStateChanged((user) => {
    if(user) {
      playerId = user.uid;
      console.log(playerId)
    } else {
      //logged out
    }
  });

  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;

import '../css/SideMenu.css';
import {ref, getDatabase, set} from 'firebase/database'
import {userId} from '../utilities/firebase'
import { v4 as uuidv4 } from 'uuid';

function SideMenu() {
  function assignPlayers() {
    const num = Math.random();
    if(num <= 0.5) {
      return {
        white: userId,
        black: null,
      };
    } else {
      return {
        white: null,
        black: userId,
      }
    }
  }

  function createNewGame() {
    const db = getDatabase();
    const newGameId = uuidv4();
    let newGameRef = ref(db, `active-games/${newGameId}`);
    const players = assignPlayers();
    let newGame = {
      id: newGameId,
      players
    }
    console.log(newGame)
    set(newGameRef, newGame);
  }

  return (
    <button onClick={createNewGame}>New Game</button>
  );
}

export default SideMenu;
import '../css/SideMenu.css';
import {getDatabase, ref, set, remove} from 'firebase/database'
import {userId} from '../utilities/firebase'
import { v4 as uuidv4 } from 'uuid';

function SideMenu({gameId, onGameIdChange, onColorChange}) {
  function assignPlayers() {
    const num = Math.random();
    if(num < 0.5) {
      onColorChange('white');
      return {
        white: userId,
        black: null,
      };
    } else {
      onColorChange('black');
      return {
        white: null,
        black: userId,
      }
    }
  }

  function createNewGame() {
    const db = getDatabase();
    const newGameId = uuidv4();
    onGameIdChange(newGameId);
    const newGameRef = ref(db, `active-games/${newGameId}`);
    const players = assignPlayers();
    const newGame = {
      id: newGameId,
      players
    }
    set(newGameRef, newGame);
    initializeGameState(db, newGameId);
  }

  function initializeGameState(db, gameId) {
    const newGameStateRef = ref(db, `game-states/${gameId}`);
    const newGameState = {
      a: {
        1: 'wr',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'br'
      },
      b: {
        1: 'wn',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'bn'
      },
      c: {
        1: 'wb',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'bb'
      },
      d: {
        1: 'wq',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'bq'
      },
      e: {
        1: 'wk',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'bk'
      },
      f: {
        1: 'wb',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'bb'
      },
      g: {
        1: 'wn',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'bn'
      },
      h: {
        1: 'wr',
        2: 'wp',
        3: 'e',
        4: 'e',
        5: 'e',
        6: 'e',
        7: 'bp',
        8: 'br'
      },
    };
    set(newGameStateRef, newGameState); 
  }

  function endGame() {
    const db = getDatabase();
    const activeGameRef = ref(db, `active-games/${gameId}`);
    const gameStateRef = ref(db, `game-states/${gameId}`);
    remove(activeGameRef);
    remove(gameStateRef);
    onGameIdChange(null);
    onColorChange(null);
  }

  return (
    <>
      <button onClick={createNewGame}>New Game</button>
      <button onClick={endGame}>End Game</button>
    </>
  );
}

export default SideMenu;
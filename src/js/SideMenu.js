import '../css/SideMenu.css';
import {getDatabase, ref, set, remove} from 'firebase/database'
import {userId} from '../utilities/firebase'
import { v4 as uuidv4 } from 'uuid';

import { newGameBoardState } from '../utilities/newGameBoardState';
import { createNewPieces } from '../utilities/createPieces';

function SideMenu({gameId, onGameIdChange, onColorChange}) {
  const db = getDatabase();

  function assignPlayers() {
    const num = Math.random();
    if(num < 0.5) {
      onColorChange('w');
      return {
        w: userId,
        b: null,
      };
    } else {
      onColorChange('b');
      return {
        w: null,
        b: userId,
      }
    }
  }

  function addNewActiveGame(gameId) {
    const newGameRef = ref(db, `active-games/${gameId}`);
    const players = assignPlayers();
    const newGame = {
      id: gameId,
      players
    }
    set(newGameRef, newGame);
  }

  function initializePieceStatesAndBoardState(gameId) {
    const [newPieces, newBoardState] = createNewPieces(newGameBoardState);
    const newBoardStateRef = ref(db, `game-states/${gameId}/board-state`);
    const newPieceStatesRef = ref(db, `game-states/${gameId}/piece-states`);
    set(newBoardStateRef, newBoardState);
    set(newPieceStatesRef, newPieces);
  }

  function createNewGame() {
    const newGameId = uuidv4();
    onGameIdChange(newGameId);
    addNewActiveGame(newGameId);
    initializePieceStatesAndBoardState(newGameId);
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
import '../css/Square.css';
import {ref, getDatabase, onValue} from 'firebase/database';
import { useState } from 'react';
import { gameStatesEqual } from '../utilities/gameStateUtils';
import { getPieceImg } from '../utilities/pieceImageUtils';
import { getPotentiallyMoveableSquares} from '../utilities/pieceMovementUtils';

function Square({row, col, gameId}) {
  const db = getDatabase();
  const gameStateRef = ref(db, `game-states/${gameId}`);
  let [gameState, setGameState] = useState();

  function onSquareClick() {
    let potentiallyMoveableSquares = [];
    const pieceCode = gameState[col][row];
    potentiallyMoveableSquares = getPotentiallyMoveableSquares(row, col, pieceCode, gameState);
    console.log(potentiallyMoveableSquares);
  }

  onValue(gameStateRef, (snapshot) => {
    const data = snapshot.val();
    if(!gameStatesEqual(data, gameState)) {
      setGameState(data)
    }
  });

  return (
    <td onClick={onSquareClick}>{gameState?getPieceImg(gameState[col][row]):''}</td>
  );
}

export default Square;
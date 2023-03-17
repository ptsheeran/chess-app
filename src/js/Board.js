import '../css/Board.css';
import File from './File';
import { useState } from 'react';

import { getDatabase, ref, onValue } from 'firebase/database';

import { getMoveableSquares } from '../utilities/pieceMovementUtils';
import { boardStatesEqual } from '../utilities/gameStateUtils';
import { fileMapping } from '../utilities/fileMapping';

function Board({gameId, color}) {
  const db = getDatabase();
  const boardStateRef = ref(db, `game-states/${gameId}/board-state`);

  let [moveableSquares, setMoveableSquares] = useState([]);
  // let [clickedPiece, setClickedPiece] = useState();
  let [boardState, setBoardState] = useState();

  onValue(boardStateRef, (snapshot) => {
    const data = snapshot.val();
    if(!boardStatesEqual(data, boardState)) {
      console.log(data, boardState)
      setBoardState(data)
    }
  });

  function onSquareClick(rank, file) {
    setMoveableSquares(getMoveableSquares(rank, file, boardState));
    // setClickedPiece(boardState[col][row]);
  }

  function getFileFromArrayIndex(i) {
    return fileMapping[color === 'black' ? 8 - i - 1 : i];
  }

  return (
    <div className="board">
      {[...Array(8)].map((e,i) => {
        const file = getFileFromArrayIndex(i);
        return (
          <File 
            key={i} 
            file={file} 
            color={color} 
            moveableSquares={moveableSquares} 
            pieces={boardState?boardState[file]:''}
            onSquareClick={onSquareClick}/>
        )
      })}
    </div>
  );
}

export default Board;
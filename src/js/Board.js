import '../css/Board.css';
import File from './File';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { boardStatesEqual, pieceStatesEqual } from '../utilities/gameStateUtils';
import { fileMapping } from '../utilities/fileMapping';
import { getMoveableSquares } from '../utilities/pieceMovementUtils';

function Board({gameId, color}) {
  const db = getDatabase();
  const boardStateRef = ref(db, `game-states/${gameId}/board-state`);
  const pieceStatesRef = ref(db, `game-states/${gameId}/piece-states`);

  let [moveableSquares, setMoveableSquares] = useState([]);
  // let [clickedPiece, setClickedPiece] = useState();
  let [boardState, setBoardState] = useState();
  let pieceStates;

  onValue(boardStateRef, (snapshot) => {
    const data = snapshot.val();
    if(!boardStatesEqual(data, boardState)) {
      setBoardState(data)
    }
  });

  onValue(pieceStatesRef, (snapshot) => {
    let pieces = snapshot.val();
    if(pieces && boardState) {
      if(!pieceStatesEqual(pieceStates, pieces)) {
        const myPieces = pieces[color];
        for(let i = 0; i < myPieces.length; i++) {
          let [moveableSquares, freeSquares, takeableSquares] = getMoveableSquares(myPieces[i], boardState);
          myPieces[i].moveableSquares = moveableSquares;
          myPieces[i].freeSquares = freeSquares;
          myPieces[i].takeableSquares = takeableSquares;
        }
        pieces[color] = myPieces;
        pieceStates = Object.assign({}, pieces);
        set(pieceStatesRef, pieceStates);
      }
    }
  })

  useEffect(() => {
    if(!gameId) {
      setMoveableSquares([]);
    } 
  }, [gameId]);

  function onSquareClick(piece) {
    const id = piece.id;
    const pieceToCheck = pieceStates[color].filter((pieceState) => {
      return pieceState.id === id;
    })[0];
    setMoveableSquares(pieceToCheck.moveableSquares);
    // setClickedPiece(boardState[col][row]);
  }

  function getFileFromArrayIndex(i) {
    return fileMapping[color === 'b' ? 8 - i - 1 : i];
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
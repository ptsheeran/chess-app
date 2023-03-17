import '../css/Square.css';
import { useEffect, useState } from 'react';
import { getPieceImg } from '../utilities/pieceImageUtils';

function Square({rank, file, moveableSquares, piece, onSquareClick}) {
  let [moveable, setMoveable] = useState(false);

  useEffect(() => {
    if(moveableSquares && moveableSquares.includes(file+rank)) {
      setMoveable(true);
    } else {
      setMoveable(false);
    }
  }, [moveableSquares, file, rank]);

  if(moveable) {
    return (
      <div className='square' onClick={() => {onSquareClick(rank,file)}}><span className='moveable'></span></div>
    )
  } else if(piece) {
    return (
      <div className='square' onClick={() => {onSquareClick(rank,file)}}>{piece['type']==='e'?'':getPieceImg(piece)}</div>
    );
  } else {
    return <div className='square'></div>
  }
}

export default Square;
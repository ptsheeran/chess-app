import '../css/Board.css'
import Row from './Row'

function Board({gameId, color}) {
  if(color === 'black') {
    return (
      <table className="table">
        <tbody>
          {[...Array(8)].map((e,i) => <Row key={i} row={i+1} gameId={gameId} color={color}/>)}
        </tbody>
      </table>
    );
  } else {
    return (
      <table className="table">
        <tbody>
          {[...Array(8)].map((e,i) => <Row key={i} row={8-i} gameId={gameId} color={color}/>)}
        </tbody>
      </table>
    );
  }
}

export default Board;
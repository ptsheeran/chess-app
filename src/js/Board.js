import '../css/Board.css'
import Row from './Row'

const size = [8, 8];

function Board() {
  return (
    <table className="table">
      <tbody>
        {[...Array(size[0])].map((e,i) => <Row key={i} numCols={size[1]} />)}
      </tbody>
    </table>
  );
}

export default Board;
import '../css/Board.css'
import Row from './Row'

const size = [8, 8];

function Board() {
  return (
    <table class="table">
        {[...Array(size[0])].map(() => <Row numCols={size[1]} />)}
    </table>
  );
}

export default Board;
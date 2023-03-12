import '../css/Board.css'
import Row from './Row'

function Board() {
  return (
    <table class="table">
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
    </table>
  );
}

export default Board;
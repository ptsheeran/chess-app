import "../css/Row.css";
import Square from "./Square";
import { colMapping } from "../utilities/columnMapping";

function Row( {row, gameId, color} ) {
  if(color === 'black') {
    return (
      <tr>
        {[...Array(8)].map((e,i) => <Square key={i} row={row} col={colMapping[8-i-1]} gameId={gameId}/>)}
      </tr>
    );
  } else {
    return (
      <tr>
        {[...Array(8)].map((e,i) => <Square key={i} row={row} col={colMapping[i]} gameId={gameId}/>)}
      </tr>
    );
  }
}

export default Row;
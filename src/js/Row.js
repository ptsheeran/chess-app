import "../css/Row.css";
import Square from "./Square";

function Row( {numCols} ) {
  return (
    <tr>
      {[...Array(numCols)].map((e,i) => <Square key={i} />)}
    </tr>
  );
}

export default Row;
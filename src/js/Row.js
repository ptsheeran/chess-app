import "../css/Row.css";
import Square from "./Square";

function Row( {numCols} ) {
  console.log(numCols)
  return (
    <tr>
      {[...Array(numCols)].map(() => <Square />)}
    </tr>
  );
}

export default Row;
import "../css/File.css";
import Square from "./Square";

function File( {file, color, moveableSquares, pieces, onSquareClick} ) {
  function getFileFromArrayIndex(i) {
    return color === 'b' ? i + 1 : 8 - i;
  }

  return (
    <div className="file">
      {[...Array(8)].map((e,i) => {
        return (
          <Square 
            key={i} 
            rank={getFileFromArrayIndex(i)} 
            file={file} 
            moveableSquares={moveableSquares} 
            piece={pieces[getFileFromArrayIndex(i)]}
            onSquareClick={onSquareClick}/>
        )
      })}
    </div>
  );
}

export default File;
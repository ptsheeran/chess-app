import { fileMapping } from "./fileMapping";

const oppositecolor = {
    "black": "white",
    "white": "black",
}

function getSquaresInPositiveY(rank, file, boardState, numSquares=8, color) {
    let free = [];
    let takeable;
    let squaresCounted = 0;
    while(rank < 8 && squaresCounted < numSquares) {
        rank++;
        if(isColorPieceOnSquare(boardState[file][rank], oppositecolor[color])) {
            takeable = file + rank;
            break;
        } else if(isColorPieceOnSquare(boardState[file][rank], oppositecolor[color])) {
            break;
        } else {
            free.push(file + rank);
            squaresCounted++;
        }
    }
    return [free, takeable];
}

function getDiagonalPlusXPlusY(rank, file, numSquares=8) {
    let output = [];
    let squaresCounted = 0;
    while(rank < 8 && file!== 'h' && squaresCounted < numSquares) {
        rank++;
        file = fileMapping[fileMapping.indexOf(file) + 1];
        output.push(file + rank);
        squaresCounted++;
    }
    return output;
}

function getDiagonalMinusXPlusY(rank, file, numSquares=8) {
    let output = [];
    let squaresCounted = 0;
    while(rank < 8 && file!== 'a' && squaresCounted < numSquares) {
        rank++;
        file = fileMapping[fileMapping.indexOf(file) - 1];
        output.push(file + rank);
        squaresCounted++;
    }
    return output;
}

function isColorPieceOnSquare(pieceColor, color) {
    if(color === 'black') {
        return pieceColor === 'b';
    } else {
        return pieceColor === 'w';
    }    
}

export function getMoveableSquares(rank, file, boardState) {
    if(boardState) {
        const piece = boardState[file][rank]
        const pieceCode = piece['color'] + piece['type'];
        let moveableSquares = [];
        switch(pieceCode) {
            case 'wp':
                //TODO: in other piece movement cases (not pawns or kings) need to check if any pinned pieces and add that to some sort of pinned pieces array
                //Check if on starting square
                if(rank === 2) {
                    [moveableSquares, ] = getSquaresInPositiveY(rank, file, boardState, 2, 'white');
                } else {
                    [moveableSquares, ] = getSquaresInPositiveY(rank, file, boardState, 1, 'white');
                }
                //Check if can take
                const diagonals = [...getDiagonalPlusXPlusY(rank, file, 1), ...getDiagonalMinusXPlusY(rank, file, 1)];
                diagonals.forEach(square => {
                    const squarefile = square.substring(0,1);
                    const squarerank = square.substring(1)
                    const piece = boardState[squarefile][squarerank];
                    const pieceColor = piece['color'];
                    if(isColorPieceOnSquare(pieceColor, 'black')) {
                        moveableSquares.push(square);
                    }
                });
                break;
            default:
                break;
        }
        return moveableSquares;
    }
}

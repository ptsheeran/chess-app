import { colMapping } from "./columnMapping";

export function getSquaresInPositiveY(row, col, numSquares=8) {
    let output = [];
    let squaresCounted = 0;
    while(row < 8 && squaresCounted < numSquares) {
        row++;
        output.push(col + row);
        squaresCounted++;
    }
    return output;
}

export function getDiagonalPlusXPlusY(row, col, numSquares=8) {
    let output = [];
    let squaresCounted = 0;
    while(row < 8 && col!== 'h' && squaresCounted < numSquares) {
        row++;
        col = colMapping[colMapping.indexOf(col) + 1];
        output.push(col + row);
        squaresCounted++;
    }
    return output;
}

export function getDiagonalMinusXPlusY(row, col, numSquares=8) {
    let output = [];
    let squaresCounted = 0;
    while(row < 8 && col!== 'a' && squaresCounted < numSquares) {
        row++;
        col = colMapping[colMapping.indexOf(col) - 1];
        output.push(col + row);
        squaresCounted++;
    }
    return output;
}

export function getPotentiallyMoveableSquares(row, col, pieceCode, gameState) {
    let allMoveableSquares = [];
    switch(pieceCode) {
        case 'wp':
            //Check if on starting square
            if(row === 2) {
                allMoveableSquares = getSquaresInPositiveY(row, col, 2);
            } else {
                allMoveableSquares = getSquaresInPositiveY(row, col, 1);
            }
            //Check if can take
            const diagonals = [...getDiagonalPlusXPlusY(row, col, 1), ...getDiagonalMinusXPlusY(row, col, 1)];
            diagonals.forEach(square => {
                if(isColorPieceOnSquare(square.substring(1), square.substring(0,1), 'black', gameState)) {
                    allMoveableSquares.push(square);
                }
            });
            break;
        default:
            break;
    }
    return allMoveableSquares;
}

export function isColorPieceOnSquare(row, col, color, gameState) {
    const pieceColor = gameState[col][row].substring(0,1);
    if(color === 'black') {
        return pieceColor === 'b';
    } else {
        return pieceColor === 'w';
    }    
}
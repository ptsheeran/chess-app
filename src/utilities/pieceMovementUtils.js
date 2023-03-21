import { fileMapping } from "./fileMapping";

const oppositecolor = {
    "b": "w",
    "w": "b",
}

function getSquaresInForwardY(piece, boardState, numSquares=8, direction=1) {
    let free = [];
    let takeable = [];
    let squaresCounted = 0;
    let rank = piece.rank;
    const file = piece.file;
    const color = piece.color;
    const rankChange = direction;
    const rankEndCond = direction===-1 ? 1 : 8;

    while(rank !== rankEndCond && squaresCounted < numSquares) {
        rank += rankChange;
        if(isColorPieceOnSquare(boardState[file][rank], oppositecolor[color])) {
            takeable.push(file + rank);
            break;
        } else if(isColorPieceOnSquare(boardState[file][rank], color)) {
            break;
        } else {
            free.push(file + rank);
            squaresCounted++;
        }
    }
    return [free, takeable];
}

function getDiagonals(piece, boardState, rankDirection, fileDirection, numSquares=8) {
    let free = [];
    let takeable = [];
    let squaresCounted = 0;
    let rank = piece.rank;
    let file = piece.file;
    const color = piece.color;
    const rankEndCond = rankDirection===-1 ? 1 : 8;
    const fileEndCond = fileDirection===-1 ? 'a' : 'h';

    while(rank !== rankEndCond && file !== fileEndCond && squaresCounted < numSquares) {
        rank += rankDirection;
        if(piece.id === '101b4a04-af51-4019-b4b5-16738661dd6c') {
            console.log('1', file)
        }
        file = fileMapping[fileMapping.indexOf(file) + fileDirection];
        if(piece.id === '101b4a04-af51-4019-b4b5-16738661dd6c') {
            console.log(file)
            console.log(isColorPieceOnSquare(boardState[file][rank], oppositecolor[color]))
        }
        if(isColorPieceOnSquare(boardState[file][rank], oppositecolor[color])) {
            takeable.push(file + rank);
            break;
        } else if(isColorPieceOnSquare(boardState[file][rank], color)) {
            break;
        } else {
            free.push(file + rank);
            squaresCounted++;
        }
    }
    if(piece.id === '101b4a04-af51-4019-b4b5-16738661dd6c') {
        console.log(takeable)
    }
    return [free, takeable];
}

function getKnightMoveableSquares(piece, boardState) {
    let free = [];
    let takeable = [];
    let rank = piece.rank;
    let file = piece.file;
    const color = piece.color;
    const potentiallyMoveableSquares = getKnightPotentiallyMoveableSquares(rank, file);
    if(potentiallyMoveableSquares) {
        potentiallyMoveableSquares.forEach(square => {
            let squareFile = square.substring(0,1);
            let squareRank = square.substring(1,2);
            if(isColorPieceOnSquare(boardState[squareFile][squareRank], oppositecolor[color])) {
                takeable.push(square);
            } else if (boardState[squareFile][squareRank].type === 'e') {
                free.push(square);
            }
        });
    }
    return [free, takeable]
}

function getKnightPotentiallyMoveableSquares(rank, file) {
    let squares = [];
    for(let i = 1; i < 3; i++) {
        let newFileIndices = [fileMapping.indexOf(file) - i, fileMapping.indexOf(file) + i];
        let newRanks = [rank + (3-i), rank - (3-i)];
        for(let newFileIndex of newFileIndices) {
            for(let newRank of newRanks) {
                if(newFileIndex < 8 && newFileIndex > -1 && newRank < 9 && newRank > 0) {
                    squares.push(fileMapping[newFileIndex] + newRank);
                }
            }
        }
    }
    return squares;
}

function isColorPieceOnSquare(piece, color) {
    return piece.color ? piece.color === color : false;
}

function pawnInStartingSpot(piece) {
    return piece.color === 'b' ? piece.rank === 7 : piece.rank === 2;
}

export function getMoveableSquares(piece, boardState) {
    let freeSquares = [];
    let takeableSquares = [];
    let moveableSquares = [];

    if(!piece.isPinned) {
        switch(piece.type) {
            case 'p':
                const numSquares = pawnInStartingSpot(piece)?2:1;
                const rankDirection = piece.color==='b' ? -1 : 1;
                [freeSquares,] = getSquaresInForwardY(piece, boardState, numSquares, rankDirection);
                let [,takeableSquares1] = getDiagonals(piece, boardState, rankDirection, 1, 1);
                let [,takeableSquares2] = getDiagonals(piece, boardState, rankDirection, -1, 1);
                takeableSquares = [...takeableSquares1, ...takeableSquares2];
                break;
            case 'n':
                [freeSquares, takeableSquares] = getKnightMoveableSquares(piece, boardState);
                break;
            default:
                break;
        }
    } else {
        
    }

    if(freeSquares) {
        moveableSquares = [...moveableSquares, ...freeSquares]
    }
    if(takeableSquares) {
        moveableSquares = [...moveableSquares, ...takeableSquares];
    }

    return [moveableSquares, freeSquares, takeableSquares];
}

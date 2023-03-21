import { v4 as uuidv4 } from "uuid";
import { fileMapping } from "./fileMapping";
import { getMoveableSquares } from "./pieceMovementUtils";

const ranksAtColors = {
    'b': {
        '1': 8,
        '2': 7,
    },
    'w': {
        '1': 1,
        '2': 2,
    }
}

export function createNewPieces(boardState) {
    const colors = ['b', 'w'];
    let pieces = {
        'b': [],
        'w': []
    };
    let newBoardState = Object.assign({}, boardState);
    for(const color of colors) {
        //kings
        let piece = {
            id: uuidv4(),
            rank: ranksAtColors[color]['1'],
            file: 'e',
            type: 'k',
            color: color,
            moveableSquares: [],
            takeableSquares: [],
            freeSquares: [],
            hasMoved: false,
            isChecked: false,
        }
        pieces[color].push(piece);
        newBoardState[piece.file][piece.rank] = piece;

        //queens
        piece = {
            id: uuidv4(),
            rank: ranksAtColors[color]['1'],
            file: 'd',
            type: 'q',
            color: color,
            moveableSquares: [],
            takeableSquares: [],
            freeSquares: [],
            isPinned: false,
            isChecking: false,
            isProtected: true,
        }
        pieces[color].push(piece);
        newBoardState[piece.file][piece.rank] = piece;

        //rooks
        let files = ['a', 'h'];
        for(const file of files) {
            piece = {
                id: uuidv4(),
                rank: ranksAtColors[color]['1'],
                file: file,
                type: 'r',
                color: color,
                moveableSquares: [],
                takeableSquares: [],
                freeSquares: [],
                isPinned: false,
                isChecking: false,
                isProtected: false,
                hasMoved: false,
            }
            pieces[color].push(piece);
            newBoardState[piece.file][piece.rank] = piece;
        }
        
        //bishops
        files = ['c', 'f'];
        for(const file of files) {
            piece = {
                id: uuidv4(),
                rank: ranksAtColors[color]['1'],
                file: file,
                type: 'b',
                color: color,
                moveableSquares: [],
                takeableSquares: [],
                freeSquares: [],
                isPinned: false,
                isChecking: false,
                isProtected: true,
            }
            pieces[color].push(piece);
            newBoardState[piece.file][piece.rank] = piece;
        }

        //pawns
        files = fileMapping;
        for(const file of files) {
            const rank = ranksAtColors[color]['2'];
            piece = {
                id: uuidv4(),
                rank: rank,
                file: file,
                type: 'p',
                color: color,
                moveableSquares: [],
                takeableSquares: [],
                freeSquares: [],
                isPinned: false,
                isChecking: false,
                isProtected: true,
            }
            let [moveableSquares, freeSquares, takeableSquares] = getMoveableSquares(piece, boardState);
            piece.moveableSquares = moveableSquares;
            piece.freeSquares = freeSquares;
            piece.takeableSquares = takeableSquares;
            pieces[color].push(piece);
            newBoardState[piece.file][piece.rank] = piece;
        }

        //knights
        files = ['b', 'g'];
        for(const file of files) {
            piece = {
                id: uuidv4(),
                rank: ranksAtColors[color]['1'],
                file: file,
                type: 'n',
                color: color,
                moveableSquares: [], //TODO
                takeableSquares: [],
                freeSquares: [],
                isPinned: false,
                isChecking: false,
                isProtected: true,
            }
            let [moveableSquares, freeSquares, takeableSquares] = getMoveableSquares(piece, boardState);
            piece.moveableSquares = moveableSquares;
            piece.freeSquares = freeSquares;
            piece.takeableSquares = takeableSquares;
            pieces[color].push(piece);
            newBoardState[piece.file][piece.rank] = piece;
        }
    }

    return [pieces, boardState];
}

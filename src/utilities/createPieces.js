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
        const kingPiece = {
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
        pieces[color].push(kingPiece);
        newBoardState[kingPiece.file][kingPiece.rank] = kingPiece;

        //queens
        const queenPiece = {
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
        pieces[color].push(queenPiece);
        newBoardState[queenPiece.file][queenPiece.rank] = queenPiece;

        //rooks
        let files = ['a', 'h'];
        for(const file of files) {
            const rookPiece = {
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
            pieces[color].push(rookPiece);
            newBoardState[rookPiece.file][rookPiece.rank] = rookPiece;
        }
        
        //bishops
        files = ['c', 'f'];
        for(const file of files) {
            const bishopPiece = {
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
            pieces[color].push(bishopPiece);
            newBoardState[bishopPiece.file][bishopPiece.rank] = bishopPiece;
        }

        //pawns
        files = fileMapping;
        for(const file of files) {
            const rank = ranksAtColors[color]['2'];
            const pawnPiece = {
                id: uuidv4(),
                rank: rank,
                file: file,
                type: 'p',
                color: color,
                moveableSquares: getMoveableSquares(rank, file, boardState), 
                takeableSquares: [],
                freeSquares: [],
                isPinned: false,
                isChecking: false,
                isProtected: true,
            }
            pieces[color].push(pawnPiece);
            newBoardState[pawnPiece.file][pawnPiece.rank] = pawnPiece;
        }

        //knights
        files = ['b', 'g'];
        for(const file of files) {
            const knightPiece = {
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
            pieces[color].push(knightPiece);
            newBoardState[knightPiece.file][knightPiece.rank] = knightPiece;
        }
    }
    

    return [pieces, boardState];
}

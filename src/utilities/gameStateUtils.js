import isEqual from 'lodash.isequal';

export function boardStatesEqual(boardState1, boardState2) {
    return isEqual(boardState1, boardState2);
}

export function pieceStatesEqual(pieceState1, pieceState2) {
    if(pieceState1 && pieceState2) {
        const colors = ['b', 'w'];
        for(let color of colors) {
            const set1 = pieceState1[color];
            const set2 = pieceState2[color];
            for(let piece1 of set1) {
                let index = set1.indexOf(piece1);
                let piece2 = set2[index];
                for(let key of Object.keys(piece1)) {
                    const val1 = piece1[key];
                    const val2 = piece2[key]
                    if(val1 !== val2) {
                        if((val1.length === 0 && val2 === undefined) || (val1 === undefined && val2.length === 0)) {
                            return true;
                        } else if(Array.isArray(val1) && Array.isArray(val2)) {
                            if (val1.length === val2.length){
                                for(let i = 0; i < val1.length; i++) {
                                    if(val1[i] !== val2[i]) {
                                        console.log('array vals not equal: ', val1[i], val2[i]);
                                        return false;
                                    }
                                }
                            } else {
                                console.log('lengths weren\'t equal: ', piece1, piece2, key);
                                return false;
                            }
                        } else {
                            console.log('weren\'t arrays and weren\'t equal: ', val1, val2);
                            return false;
                        }
                    }
                }
            }
        }
    } else if ((pieceState1 && !pieceState2) || (!pieceState1 && pieceState2)) {
        console.log('one was defined, one wasn\'t: ', pieceState1, pieceState2);
        return false;
    } 
    return true;
}

export function gameStatesEqual(gameState1, gameState2) {
    if(gameState1 && gameState2) {
        const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for(const key of keys) {
            if(!arraysEqual(gameState1[key], gameState2[key])) {
                return false;
            }
        }
        return true;
    } else if (!gameState1 && !gameState2){
        return true;
    } else {
        return false;
    }
}

function arraysEqual(array1, array2) {
    return array1.every((value, index) => value === array2[index]);
}
import isEqual from 'lodash.isequal';

export function boardStatesEqual(boardState1, boardState2) {
    return isEqual(boardState1, boardState2);
}

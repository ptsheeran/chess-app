export function getPieceImg(pieceCode) {
    let url;
    switch(pieceCode) {
        case 'bk':
            url = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
            break;
        case 'bq':
            url = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg';
            break;
        case 'br':
            url = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';
            break;
        case 'bb':
            url = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';
            break;
        case 'bn':
            url = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg';
            break;
        case 'bp':
            url = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';
            break;
        case 'wk':
            url = 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg';
            break;
        case 'wq':
            url = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg';
            break;
        case 'wr':
            url = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg';
            break;
        case 'wb':
            url = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg';
            break;
        case 'wn':
            url = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg';
            break;
        case 'wp':
            url = 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg';
            break;
        default:
            break;
    }
    if(url) {
        return (
            <img className="piece" alt={pieceCode} src={url}></img>
        )
    }
}
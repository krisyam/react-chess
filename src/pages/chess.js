import React, { useEffect, useState } from 'react'
import '../css/chessboard.css'

const initialChessFormation = {
    8: ['rook-b', 'knight-b', 'bishop-b', 'queen-b', 'king-b', 'bishop-b', 'knight-b', 'rook-b'],
    7: ['pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b'],
    6: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    5: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    4: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    3: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    2: ['pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w'],
    1: ['rook-w', 'knight-w', 'bishop-w', 'queen-w', 'king-w', 'bishop-w', 'knight-w', 'rook-w']
}

const testFormation = {
    8: ['none', 'knight-b', 'none', 'none', 'none', 'queen-b', 'none', 'bishop-b'],
    7: ['pawn-b', 'pawn-b', 'none', 'knight-b', 'none', 'none', 'none', 'none'],
    6: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    5: ['none', 'none', 'none', 'rook-b', 'none', 'none', 'none', 'none'],
    4: ['none', 'none', 'none', 'none', 'none', 'none', 'queen-w', 'none'],
    3: ['none', 'none', 'knight-w', 'none', 'none', 'none', 'none', 'none'],
    2: ['pawn-w', 'rook-w', 'none', 'none', 'none', 'none', 'none', 'none'],
    1: ['none', 'none', 'none', 'bishop-w', 'none', 'none', 'king-w', 'none']
}

function Chess() {
    const [selectedPiece, setSelectedPiece] = useState('')
    const [possibleMoves, setPossibleMoves] = useState([])
    const [player, setPlayer] = useState('w')
    const [location, setLocation] = useState(testFormation)
    const [history, setHistory] = useState([])
    const handleSelection= (char, rowNum, index) => {
        const piece = location[rowNum][index].split('-')[0];
        const color = location[rowNum][index].split('-')[1];
        const isWhite = player === 'w'
        const selected = `${rowNum}${char}`
        if (selectedPiece!=='' && selectedPiece !== selected) {    
            // if there is a selected piece and it is not the same as the clicked piece then try to move the piece
            handleMovePiece(selected)
            return;
        };
        if (player !== color) return;    // if player is not the same as the piece color, return
        if (location[rowNum][index] === 'none') return; // if there is no piece, return
        if (selectedPiece === selected) {
            setPossibleMoves([])
            setSelectedPiece('')
            return
        }
        else {
            setSelectedPiece(selected)
            let moves = [];
            switch (piece) {
                case 'pawn': { // pawn movement
                    // pawns in the 2nd or 7th row can move 2 squares
                    // if pawn isnt in the 2nd or 7th row, it can only move 1 square
                    if (isWhite){
                        if(rowNum === 2) {
                            moves = [checkPawnMove(rowNum+1, index, selected, location, player), checkPawnMove(rowNum+2, index, selected, location, player)]
                        }
                        else moves = [checkPawnMove(rowNum+1, index, selected, location, player)]
                        // pawns can move diagonally to capture
                        moves = [...moves, checkPawnMove(rowNum+1, index+1, selected, location, player), checkPawnMove(rowNum+1, index-1, selected, location, player)]
                    } else {
                        if(rowNum === 7) {
                            moves = [checkPawnMove(rowNum-1, index, selected, location, player), checkPawnMove(rowNum-2, index, selected, location, player)]
                        }
                        else moves = [checkPawnMove(rowNum-1, index, selected, location, player)]
                        // pawns can move diagonally to capture
                        moves = [...moves, checkPawnMove(rowNum-1, index+1, selected, location, player), checkPawnMove(rowNum-1, index-1, selected, location, player)]
                    }
                    setPossibleMoves(moves)
                    return;
                }
                case 'rook': { // rook movement
                    // rooks can move horizontally and vertically
                    // rooks can move any number of squares
                    // should not be able to move through other pieces
                    setPossibleMoves(checkRookMove(selected, location, player))
                    return;
                }
                case 'bishop': { // bishop movement
                    // bishops move diagonally
                    // bishops can move any number of squares
                    // should not be able to move through other pieces
                    return;
                }
                case 'queen': { // queen movement
                    // queens can move horizontally, vertically, and diagonally
                    // queens can move any number of squares
                    // should not be able to move through other pieces
                    moves = checkRookMove(selected, location, player)
                    setPossibleMoves(moves)
                    return;
                }
                case 'king': { // king movement
                    // kings can move horizontally, vertically, and diagonally
                    // kings can only move 1 square
                    // should not be able to move into check
                    return;
                }
                case 'knight': { // knight movement
                    // knights move in an L shape
                    // knights can jump over other pieces
                    // knights can move 2 squares in one direction and 1 square in the other
                    return;
                }
            }
        }
    }
    const handleMovePiece = (to) => {
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const notation = ['K', 'Q', 'R', 'B', 'N']
        const col = arr.indexOf(selectedPiece[1]);
        const toCol = arr.indexOf(to[1]);
        const chessboard = location
        const pieceName = chessboard[selectedPiece[0]][col];
        console.log('to', to)
        if(possibleMoves.includes(to)) {
            chessboard[selectedPiece[0]][col] = 'none';
            chessboard[to[0]][toCol] = pieceName;

            setLocation(chessboard)
            setSelectedPiece('');
            setPlayer(player === 'w' ? 'b' : 'w');
            setPossibleMoves([]);
            // const isCheck = pieceName.split('-')[0] === 'pawn' ? '+' : '';
            const historyMove = `${pieceName.split('-')[0] === 'pawn' ? '' : pieceName[0].toUpperCase()}${to[1]}${to[0]}`;
            setHistory([...history, historyMove])
        }
    }
    useEffect(()=>{
        console.log('possibleMoves', possibleMoves)
    },[possibleMoves])
return (
    <div className='container'>
        <div className="left-container">
            <div className="left"></div>
        </div>
        <div className="chessboard">
            <ChessRow 
                rowNum={8} 
                location={location[8]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <ChessRow 
                rowNum={7} 
                location={location[7]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <ChessRow 
                rowNum={6} 
                location={location[6]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <ChessRow 
                rowNum={5} 
                location={location[5]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <ChessRow 
                rowNum={4} 
                location={location[4]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <ChessRow 
                rowNum={3} 
                location={location[3]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <ChessRow 
                rowNum={2} 
                location={location[2]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <ChessRow 
                rowNum={1} 
                location={location[1]}
                selectedPiece={selectedPiece} 
                possibleMoves={possibleMoves}
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
        </div>
        <div className='right-container'>
            <div className='right'>
                <grid className='history-container'>
                    {history.map((move, index) => {
                        if(index % 2 === 0) 
                            return <div className='history' key={index}>
                                {index / 2 + 1}. {move}
                            </div>
                        else return <div className='history' key={index}>
                            {move}
                        </div>
                    })}
                </grid>
            </div>
        </div>
    </div>
);
}

export default Chess

function ChessRow({rowNum,
    location,
    selectedPiece,
    possibleMoves,
    handleSelection,
}) {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const colors = ['white', 'gray'];
    return (
        <>
            <div className="row" id={rowNum}>
                {arr.map((char, index) => {
                    return <div
                        className="square"
                        style={{
                            backgroundColor: selectedPiece === `${rowNum}${char}` ? 'antiquewhite' : colors[(arr.indexOf(char) + rowNum) % 2]
                        }}
                        key={char+rowNum}
                        onClick={()=>handleSelection(char,rowNum, index)}
                    >
                        {char === 'a' ? <p className='numbering label'>{rowNum}</p> : ''}
                        {rowNum === 1 ? <p className='lettering label'>{char}</p> : ''}
                        <img
                            className='piece'
                            style={{cursor: location[index] === 'none' ? 'initial' : 'grab'}}
                            draggable="false" 
                            src={
                                possibleMoves.includes(`${rowNum}${char}`) ? 
                                    location[index] === 'none' ? 
                                        require(`../images/movable.png`) 
                                        : require(`../images/${location[index]}-selected.png`) :
                                    require(`../images/${location[index]}.png`)
                            }   //${selectedPiece === rowNum+char ? '-selected' : ''}.png
                            alt={char+rowNum} 
                        />
                        {/* <img
                            className='piece'
                            style={{cursor: location[index] === 'none' ? 'initial' : 'grab'}}
                            draggable="true"
                            src={require(`../images/movable.png`)}
                        /> */}
                    </div>
                })}
            </div>
        </>
    )
}

const checkPawnMove = (row, col, selected, location, player) => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    // check if its our own piece
    // check if its an enemy piece
    // check if empty square
    if (col >= 0 && col <= 7 && row >= 1 && row <= 8){
        if (location[row][col] === 'none') {  // if empty square or enemy piece
            if (arr.indexOf(selected[1])===col) return `${row+arr[col]}`; 
            return null;
        }
        else if (location[row][col].split('-')[1] !== player) { 
            if (arr.indexOf(selected[1])===col) return null;
            return `${row+arr[col]}`;
        };
    }
    return null ;
}
const checkRookMove = (selected, location, player) => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let moves = [];
    let bottom = 0, top = 9, left = -1, right = 8;
    const xpos = selected[0], ypos = Number(arr.indexOf(selected[1]))
    for (let x = Number(ypos)-1; left === -1 && x > -1; x--){ // left side of the piece
        console.log('leftx', x)
        if (location[xpos][x] === 'none') continue;
        else if (location[xpos][x].split('-')[1] !== player) { // if enemy found
            left = x;
            break;
        }
        else if (location[xpos][x].split('-')[1] === player){    // if friendly
            left = x+1;
            break;
        }
    }
    for (let x = Number(ypos)+1; right === 8 && x < 8; x++){ // right side of the piece
        console.log('rightx', x)
        if (location[xpos][x] === 'none') continue;
        else if (location[xpos][x].split('-')[1] !== player) {    // if enemy found
            right = x+1;
            break;
        }
        else if (location[xpos][x].split('-')[1] === player){    // if friendly
            right = x;
            break;
        }
    }
    for (let y = Number(xpos)-1; bottom === 0 && y > 0; y--){ // bottom side of the piece
        console.log('bottomy', y)
        if (location[y][ypos] === 'none') continue;
        else if (location[y][ypos].split('-')[1] !== player) { // if enemy found
            bottom = y;
            break;
        }
        else if (location[y][ypos].split('-')[1] === player) {  // if friendly
            bottom = y+1;
            break;
        }
    }
    console.log(xpos+1)
    for (let y = Number(xpos)+1; top === 9 && y < 9; y++){ // top side of the piece
        console.log('topy', y)
        if (location[y][ypos] === 'none') continue;
        else if (location[y][ypos].split('-')[1] !== player) {    // if enemy found
            top = y+1;
            break;
        }
        else if (location[y][ypos].split('-')[1] === player){   // if friendly
            top = y;
            break;
        }
    }
    console.log('bottom top left right', bottom, top, left, right)
    for (let x = left === -1 ? 0 : left; x < right; x++){
        moves.push(`${xpos+arr[x]}`)
    }
    for (let y = bottom === 0 ? 1 : bottom; y < top; y++){
        moves.push(`${y}${arr[ypos]}`)
    }
    moves = moves.filter(item => item !== selected)
    // console.log('moves', xpos+arr[ypos], moves)
    return moves;
}
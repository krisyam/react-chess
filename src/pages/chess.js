import React, { useEffect, useState } from 'react'
import '../css/chessboard.css'

function Chess() {
    const [selectedPiece, setSelectedPiece] = useState('')
    const [player, setPlayer] = useState('w')
    const [location, setLocation] = useState({
        8: ['rook-b', 'knight-b', 'bishop-b', 'queen-b', 'king-b', 'bishop-b', 'knight-b', 'rook-b'],
        7: ['pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b'],
        6: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        5: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        4: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        3: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
        2: ['pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w'],
        1: ['rook-w', 'knight-w', 'bishop-w', 'queen-w', 'king-w', 'bishop-w', 'knight-w', 'rook-w']
    })
    const handleSelection= (char, rowNum, index) => {
        if(selectedPiece!=='' && selectedPiece !== `${rowNum}${char}`) {
            handleMovePiece(`${rowNum}${char}`)
            return;
        };
        if(player === location[rowNum][index].split('-')[1]) {
            setSelectedPiece(selectedPiece === '' ? `${rowNum}${char}` : 
                selectedPiece === `${rowNum}${char}` ? '' : `${rowNum}${char}`);
        }
    }
    const handleMovePiece = (to) => {
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const col = arr.indexOf(selectedPiece[1]);
        const toCol = arr.indexOf(to[1]);
        const chessboard = location

        const pieceName = chessboard[selectedPiece[0]][col];
        chessboard[selectedPiece[0]][col] = 'none';
        chessboard[to[0]][toCol] = pieceName;
        
        console.log('chessboard', chessboard)
        setLocation(chessboard)
        setSelectedPiece('');
        setPlayer(player === 'w' ? 'b' : 'w');
    }
return (
    <div className='container'>
        <div className="left-container">
            <div className="left"></div>
        </div>
        <div className="chessboard">
            <Row 
                rowNum={8} 
                location={location[8]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <Row 
                rowNum={7} 
                location={location[7]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <Row 
                rowNum={6} 
                location={location[6]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <Row 
                rowNum={5} 
                location={location[5]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <Row 
                rowNum={4} 
                location={location[4]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <Row 
                rowNum={3} 
                location={location[3]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <Row 
                rowNum={2} 
                location={location[2]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
            <Row 
                rowNum={1} 
                location={location[1]}
                selectedPiece={selectedPiece} 
                handleSelection={handleSelection} 
                handleMovePiece={handleMovePiece} 
            />
        </div>
        <div className='right-container'>
            <div className='right'></div>
        </div>
    </div>
);
}

export default Chess

function Row({rowNum,
    location,
    selectedPiece,
    handleSelection,
    handleMovePiece
}) {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const colors = ['white', 'gray'];
    return (
        <>
            <div className="row" id={rowNum}>
                {arr.map((char, index) => {
                    return <div
                        className="square"
                        style={{backgroundColor: colors[(arr.indexOf(char) + rowNum) % 2]}}
                        key={char+rowNum}
                        onClick={()=>handleSelection(char,rowNum, index)}
                    >
                        <img 
                            className='piece'
                            style={{cursor: location[index] === 'none' ? 'initial' : 'grab'}}
                            draggable="false" 
                            src={require(`../images/${location[index]}${selectedPiece === rowNum+char ? '-selected' : ''}.png`)}
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
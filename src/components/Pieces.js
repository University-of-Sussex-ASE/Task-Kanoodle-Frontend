import React, { useEffect, useRef, useState } from 'react';
import './Pieces.scss';

function Piece({ key, index, piece }) {
    const gridSize = 50;
    const pieceRef = useRef();
    const rotateStyle = {
        ROTATION_0: 'rotate(0deg)',
        ROTATION_90: 'rotate(90deg)',
        ROTATION_180: 'rotate(180deg)',
        ROTATION_270: 'rotate(270deg)',
    };
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        pieceRef.current.style.transform = `${rotateStyle[piece.rotation] || rotateStyle.ROTATION_0} ${piece.flipState ? 'scaleX(-1)' : ''}`;

        const width = piece.dimensions.col * gridSize;
        const height = piece.dimensions.row * gridSize;

        pieceRef.current.style.width = width + 'px';
        pieceRef.current.style.height = height + 'px';

        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [piece]);

    return (
        <div className='piece' ref={pieceRef} style={{
            visibility: loading ? 'hidden' : 'visible',
        }}>
            {piece.originalTiles.map((tile, index) => (
                <div
                    className="tile"
                    key={index}
                    style={{
                        width: gridSize + 'px',
                        height: gridSize + 'px',
                        backgroundColor: piece.color, 
                        position: 'absolute',
                        left: tile.col * gridSize + 'px',
                        top: tile.row * gridSize + 'px',
                    }}
                >
                </div>
            ))}
        </div>
    );
}

export default Piece;

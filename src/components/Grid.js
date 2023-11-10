import React, { useState } from "react";
import "./Grid.scss";
import { PieceDescriptions } from "../common/pieces";
import { isTileAt, getWidth, getHeight } from "../common/handlePiece";
import { Button } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons'

function Grid({
  setSolution,
  setCurrentSolution,
  setSolutionCount,
  currentSolution,
  slider,
  selectedPiece,
  setSelectedPiece,
  setPieces,
  setInitialPiecePlacement,
  initialPiecePlacement,
}) {
  const numRows = 5;
  const numCols = 11;
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [occupiedCells, setOccupiedCells] = useState([]);

  // Function to handle mouse enter event and highlight cells
  const handleCellMouseEnter = (row, col) => {
    if (currentSolution.length > 0) return;
    for (let tile of selectedPiece.tiles) {
      const hightlightedRow = row + tile.row;
      const hightlightedCol = col + tile.col;
      const cellId = `${row + tile.row}-${col + tile.col}`;

      //check if tile is out of bounds
      if (
        hightlightedRow < 0 ||
        hightlightedRow >= numRows ||
        hightlightedCol < 0 ||
        hightlightedCol >= numCols ||
        occupiedCells.some(
          (cell) => cell.row === hightlightedRow && cell.col === hightlightedCol
        ) || 
        currentSolution.length > 0
      ) {
        setHighlightedCells([]);
        return;
      }

      setHighlightedCells((highlightedCells) => [
        ...highlightedCells,
        {
          row: row + tile.row,
          col: col + tile.col,
          cellId: cellId,
          ...selectedPiece,
        },
      ]);
    }
  };

  // Function to handle mouse leave event and clear highlights
  const handleCellMouseLeave = () => {
    if (currentSolution.length > 0) return;
    setHighlightedCells([]);
  };

  // Function to handle cell click and change the cell's color
  const handleCellClick = (row, col) => {
    if (currentSolution.length > 0) return;
    //remove piece from pieces
    setPieces((pieces) => {
      return pieces.filter((piece) => piece.symbol !== selectedPiece.symbol);
    });

    //set color of highlighted cells
    const coloredCells = document.querySelectorAll(".highlight");
    coloredCells.forEach((cell) => {
      cell.style.backgroundColor = selectedPiece.color;
    });

    //set initial piece placement
    if (
      initialPiecePlacement.some((cell) => cell.symbol === selectedPiece.symbol)
    ) {
      return;
    }
    setInitialPiecePlacement([
      ...initialPiecePlacement,
      {
        row: row,
        col: col,
        ...selectedPiece,
      },
    ]);

    //set occupied cells
    for (let tile of selectedPiece.tiles) {
      const occupiedRow = row + tile.row;
      const occupiedCol = col + tile.col;
      const cellId = `${occupiedRow}-${occupiedCol}`;
      setOccupiedCells((occupiedCells) => [
        ...occupiedCells,
        {
          row: occupiedRow,
          col: occupiedCol,
          cellId: cellId,
          ...selectedPiece,
        },
      ]);
    }
    setHighlightedCells([]);
  };

  const handleReset = () => {
    setPieces(PieceDescriptions);
    setSelectedPiece(PieceDescriptions[0]);
    setInitialPiecePlacement([]);
    setOccupiedCells([]);
    setHighlightedCells([]);
    setSolution([]);
    setSolutionCount(0);
    setCurrentSolution([]);
    slider.current.goTo(0);
    const coloredCells = document.querySelectorAll(".grid-cell");
    coloredCells.forEach((cell) => {
      cell.style.backgroundColor = "white";
    });
  };

  const generateGrid = () => {
    const grid = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cellId = `${row}-${col}`;
        const isHighlighted = highlightedCells.some(
          (cell) => cell.cellId === cellId
        );
        const cellClassName = isHighlighted
          ? "grid-cell highlight"
          : "grid-cell";
        grid.push(
          <div
            id={cellId}
            key={cellId}
            className={cellClassName}
            onMouseEnter={() => handleCellMouseEnter(row, col)}
            onMouseLeave={handleCellMouseLeave}
            onClick={() => handleCellClick(row, col)}
          ></div>
        );
      }
    }

    if (currentSolution?.length > 0) {
      for (const row of currentSolution) {
        const h = getHeight(row.piece, row.rotation);
        const w = getWidth(row.piece, row.rotation);

        for (let r = 0; r < h; r++) {
          for (let c = 0; c < w; c++) {
            if (isTileAt(row.piece, c, r, row.rotation, row.flipped)) {
              const cellId = `${row.row + r}-${row.col + c}`;
              const cell = document.getElementById(cellId);
              cell.style.backgroundColor = row.piece.color;
            }
          }
        }
      }
    }
    return grid;
  };

  const grid = generateGrid();
  return (
    <div>
      <div className="grid">{grid}</div>
      <div style={{marginTop:"1%"}}>
      <Button type="primary" style={{ background: "red" }} onClick={() => handleReset()} icon={<CloseCircleOutlined />}> Reset </Button>
      </div>
    </div>
  );
}

export default Grid;

import React, { useState, useRef } from "react";
import axios from 'axios';
import Grid from "./Grid";
import { PieceDescriptions, Rotation } from "../common/pieces";
import { handlePieceTiles } from "../common/handlePiece";
import { Carousel } from 'antd';
import Piece from "./Pieces";
import './KanoodleSolver.scss';

function KanoodleSolver() {
  const [pieces, setPieces] = useState(PieceDescriptions);
  const [selectedPiece, setSelectedPiece] = useState(pieces[0]);
  const [initialPiecePlacement, setInitialPiecePlacement] = useState([]);
  const [solution, setSolution] = useState([]);
  const [solutionCount, setSolutionCount] = useState(0);
  const [currentSolution, setCurrentSolution] = useState([]);

  const handleRotate = () => {
    const rotationValues = Object.values(Rotation);
    const currentIndex = rotationValues.indexOf(selectedPiece.rotation);
    const newRotationIndex = (currentIndex + 1) % rotationValues.length;
    const newRotation = rotationValues[newRotationIndex];
    const newPiece = handlePieceTiles({ ...selectedPiece, rotation: newRotation });
    setSelectedPiece(newPiece);
    setPieces(pieces.map((piece) => {
      if (piece.symbol === newPiece.symbol) {
        return newPiece
      }
      return piece;
    }));
  }

  const handleFlip = () => {
    const newPiece = handlePieceTiles({ ...selectedPiece, flipState: !selectedPiece.flipState });
    setSelectedPiece(newPiece);
    setPieces(pieces.map((piece) => {
      if (piece.symbol === newPiece.symbol) {
        return newPiece
      }
      return piece;
    }));
  }

  const handleSolve = () => {
    //handle API call to solve  
    axios.post('https://task3.ase2023group4.rocks/kanoodle', initialPiecePlacement)
      .then((response) => {
        const { solutions, count } = response.data.data;
        setSolution(solutions);
        setSolutionCount(count);
        setCurrentSolution(solutions[0] || []);
      })
      .catch((error) => {
        console.log(error);
      })

  };

  const onChange = (index) => {
    setSelectedPiece(pieces[index]);
  }

  const slider = useRef();

  return (
    <div>
      <Carousel afterChange={onChange} ref={ref => {
        slider.current = ref;
      }} >
        {pieces.map((piece, index) => (
          <Piece
            key={index}
            index={index}
            piece={piece}
          />
        ))}
      </Carousel>,
      <button onClick={handleRotate}> Rotate </button>
      <button onClick={handleFlip}> Flip </button>
      <Grid
        currentSolution={currentSolution}
        setSolution={setSolution}
        setSolutionCount={setSolutionCount}
        setCurrentSolution={setCurrentSolution}
        slider={slider}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        setPieces={setPieces}
        initialPiecePlacement={initialPiecePlacement}
        setInitialPiecePlacement={setInitialPiecePlacement}
      />
      <p> {solutionCount} solutions </p>
      <button
        onClick={() => {
          if (currentSolution) {
            const currentIndex = solution.indexOf(currentSolution);
            const newIndex = currentIndex === 0 ? solution.length - 1 : currentIndex - 1;
            setCurrentSolution(solution[newIndex]);
          }
        }}
      > Previous Solution </button>
      <button
        onClick={() => {
          if (currentSolution) {
            const currentIndex = solution.indexOf(currentSolution);
            const newIndex = (currentIndex + 1) % solution.length;
            setCurrentSolution(solution[newIndex]);
          }
        }}
      > Next Solution </button>
      <button onClick={handleSolve}> Solve </button>
    </div>
  );
}

export default KanoodleSolver;

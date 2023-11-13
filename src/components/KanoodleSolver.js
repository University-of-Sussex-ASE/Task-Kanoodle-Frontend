import React, { useState, useRef } from "react";
import axios from "axios";
import Grid from "./Grid";
import { PieceDescriptions, Rotation } from "../common/pieces";
import { handlePieceTiles } from "../common/handlePiece";
import { Carousel } from "antd";
import Piece from "./Pieces";
import "./KanoodleSolver.scss";
import { Typography, Button, Row, Col } from "antd";
import { SwapOutlined, RotateRightOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import Spinner from "../common/spinner";


function KanoodleSolver() {
  const [pieces, setPieces] = useState(PieceDescriptions);
  const [selectedPiece, setSelectedPiece] = useState(pieces[0]);
  const [initialPiecePlacement, setInitialPiecePlacement] = useState([]);
  const [solution, setSolution] = useState([]);
  const [solutionCount, setSolutionCount] = useState(null);
  const [currentSolution, setCurrentSolution] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    //handle API call to solve  
    axios.post('https://task3.ase2023group4.rocks/kanoodle', { initialPieces: initialPiecePlacement, limit: 1000 })
      .then((response) => {
        const { solutions, count } = response.data.data;
        setSolution(solutions);
        setCurrentSolution(solutions[0] || []);
        if (count < 1000) {
          setSolutionCount(count);
          setIsLoading(false);
        }else{
          setSolutionCount(-1);
          axios.post('https://task3.ase2023group4.rocks/kanoodle', { initialPieces: initialPiecePlacement })
          .then((response) => {
            const { solutions, count } = response.data.data;
            setSolution(solutions);
            setSolutionCount(count);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (index) => {
    setSelectedPiece(pieces[index]);
  };

  const slider = useRef();

  const handleNext = () => slider.current.next();

  const handlePrev = () => slider.current.prev();

  const { Title } = Typography;

  return (
    <>
      <Row>
        <Col>
          <Carousel
            afterChange={onChange}
            ref={(ref) => {
              slider.current = ref;
            }}
          >
            {pieces.map((piece, index) => (
              <Piece key={index} index={index} piece={piece} />
            ))}
          </Carousel>

          <div style={{ paddingLeft: "48%" }}>
            <Button onClick={handlePrev} size="30%" icon={<StepBackwardOutlined />}></Button>
            <Button onClick={handleNext} icon={<StepForwardOutlined />}></Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div
            style={{
              marginBottom: "3%",
              marginTop: "3%",
            }}
          >
            <Button
              type="primary"
              onClick={handleRotate}
              icon={<RotateRightOutlined />}
            >
              {" "}
              Rotate{" "}
            </Button>
            {"  "}
            <Button onClick={handleFlip} icon={<SwapOutlined />}>
              {" "}
              Flip{" "}
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={18}>
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
        </Col>
        <Col span={6}>
          <div style={{ marginLeft: "10%" }}>
            {solutionCount == null || solutionCount < 0  ?
              "" :
              <Title level={5}>
                {solutionCount.toLocaleString()} Solutions Generated
              </Title>
            }
            {solutionCount ?
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    if (currentSolution) {
                      const currentIndex = solution.indexOf(currentSolution);
                      const newIndex =
                        currentIndex === 0
                          ? solution.length - 1
                          : currentIndex - 1;
                      setCurrentSolution(solution[newIndex]);
                    }
                  }}
                >
                  {" "}
                  Previous Solution{" "}
                </Button>{" "}
                <Button
                  style={{
                    background: "#494D5F",
                    color: "white",
                    borderColor: "gray",
                  }}
                  onClick={() => {
                    if (currentSolution) {
                      const currentIndex = solution.indexOf(currentSolution);
                      const newIndex = (currentIndex + 1) % solution.length;
                      setCurrentSolution(solution[newIndex]);
                    }
                  }}
                >
                  {" "}
                  Next Solution{" "}
                </Button>
              </div>
              : ""}

            <Row>
              <div style={{ marginTop: "5%" }}>
                <Button
                  style={{ background: "green", color: "white" }}
                  onClick={handleSolve}
                >
                  Solve Puzzle
                </Button>
              </div>
            </Row>
            <Row>
              <div style={{ marginTop: "20%", marginLeft: "35%" }}>
                {isLoading ? <Spinner /> : ""}
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default KanoodleSolver;
